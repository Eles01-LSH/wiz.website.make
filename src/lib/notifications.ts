import "server-only";
import { SolapiMessageService } from "solapi";
import type { Registration } from "@/lib/registrations";
import { updateSmsStatus } from "@/lib/registrations";

const API_KEY = process.env.SOLAPI_API_KEY;
const API_SECRET = process.env.SOLAPI_API_SECRET;
const SENDER_NUMBER = process.env.SOLAPI_SENDER_NUMBER;

/**
 * 사전등록 완료 직후 확인 문자를 발송하고, 발송 결과를
 * registrations.sms_status / sms_sent_at / sms_error에 기록한다.
 * SOLAPI 환경변수가 없으면(미설정) 조용히 건너뛴다 — 등록 자체는 이미 성공한 상태이므로
 * 문자 발송 실패/미설정이 사전등록 성공 응답을 막아서는 안 된다.
 */
export async function notifyRegistrationCreated(registration: Registration): Promise<void> {
  if (!API_KEY || !API_SECRET || !SENDER_NUMBER) return;

  try {
    const messageService = new SolapiMessageService(API_KEY, API_SECRET);
    await messageService.send({
      to: registration.phone,
      from: SENDER_NUMBER,
      text: `[WIZ CNI] ${registration.name}님, 사전등록이 완료되었습니다. 행사 관련 안내를 순차적으로 보내드리겠습니다.`,
    });
    await updateSmsStatus(registration.id, "sent");
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error("SOLAPI 문자 발송 실패:", err);
    await updateSmsStatus(registration.id, "failed", message);
  }
}
