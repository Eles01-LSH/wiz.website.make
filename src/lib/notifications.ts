import "server-only";
import { SolapiMessageService } from "solapi";
import type { Registration } from "@/lib/registrations";
import { updateSmsStatus } from "@/lib/registrations";
import { EVENT_NAME, EVENT_DATE, EVENT_TIME, EVENT_LOCATION } from "@/data/event";

const API_KEY = process.env.SOLAPI_API_KEY;
const API_SECRET = process.env.SOLAPI_API_SECRET;
const SENDER_NUMBER = process.env.SOLAPI_SENDER_NUMBER;

function getMessageService() {
  if (!API_KEY || !API_SECRET || !SENDER_NUMBER) return null;
  return new SolapiMessageService(API_KEY, API_SECRET);
}

/**
 * 사전등록 완료 직후 확인 문자를 발송하고, 발송 결과를
 * registrations.sms_status / sms_sent_at / sms_error에 기록한다.
 * SOLAPI 환경변수가 없으면(미설정) 조용히 건너뛴다 — 등록 자체는 이미 성공한 상태이므로
 * 문자 발송 실패/미설정이 사전등록 성공 응답을 막아서는 안 된다.
 */
export async function notifyRegistrationCreated(registration: Registration): Promise<void> {
  const messageService = getMessageService();
  if (!messageService) return;

  try {
    await messageService.send({
      to: registration.phone,
      from: SENDER_NUMBER!,
      text: `[WIZ CNI] ${registration.name}님, 사전등록이 완료되었습니다. 행사 관련 안내를 순차적으로 보내드리겠습니다.`,
    });
    await updateSmsStatus("registration", registration.id, "sent");
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error("SOLAPI 문자 발송 실패:", err);
    await updateSmsStatus("registration", registration.id, "failed", message);
  }
}

export type BulkSmsKind = "reminder" | "dday";

function buildBulkMessage(kind: BulkSmsKind, name: string): string {
  if (kind === "reminder") {
    return `[WIZ CNI] ${name}님, 내일(${EVENT_DATE}) ${EVENT_TIME} ${EVENT_NAME}이 진행됩니다.\n장소: ${EVENT_LOCATION}\n참석에 참고 부탁드립니다.`;
  }
  return `[WIZ CNI] ${name}님, 오늘 ${EVENT_TIME} ${EVENT_NAME}이 진행됩니다.\n장소: ${EVENT_LOCATION}\n즐거운 시간 되시길 바랍니다.`;
}

/**
 * 관리자가 선택한 참가자들에게 하루전날/당일 안내 문자를 일괄 발송한다.
 * 한 명씩 순차 발송하며, 각자의 성공/실패를 개별적으로 기록한다
 * (일부만 실패해도 나머지 발송·기록에 영향이 없도록).
 */
export async function sendBulkNotification(
  kind: BulkSmsKind,
  registrations: Registration[]
): Promise<{ sent: number; failed: number }> {
  const messageService = getMessageService();
  if (!messageService) {
    throw new Error("SOLAPI_API_KEY / SOLAPI_API_SECRET / SOLAPI_SENDER_NUMBER가 설정되지 않았습니다.");
  }

  let sent = 0;
  let failed = 0;

  for (const registration of registrations) {
    try {
      await messageService.send({
        to: registration.phone,
        from: SENDER_NUMBER!,
        text: buildBulkMessage(kind, registration.name),
      });
      await updateSmsStatus(kind, registration.id, "sent");
      sent += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "알 수 없는 오류";
      console.error(`${kind} 문자 발송 실패 (${registration.id}):`, err);
      await updateSmsStatus(kind, registration.id, "failed", message);
      failed += 1;
    }
  }

  return { sent, failed };
}
