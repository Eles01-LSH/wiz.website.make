import { EVENT_NAME, EVENT_DATE, EVENT_TIME, EVENT_LOCATION } from "@/data/event";

export type BulkSmsKind = "reminder" | "dday" | "etc";

/** 관리자 화면에서 "기본 문구 불러오기"에 쓰이는 기본 템플릿. {이름}은 발송 시 각자 이름으로 치환된다. */
export function buildDefaultBulkMessage(kind: BulkSmsKind): string {
  if (kind === "reminder") {
    return `[WIZ CNI] {이름}님, 내일(${EVENT_DATE}) ${EVENT_TIME} ${EVENT_NAME}이 진행됩니다.\n장소: ${EVENT_LOCATION}\n참석에 참고 부탁드립니다.`;
  }
  if (kind === "dday") {
    return `[WIZ CNI] {이름}님, 오늘 ${EVENT_TIME} ${EVENT_NAME}이 진행됩니다.\n장소: ${EVENT_LOCATION}\n즐거운 시간 되시길 바랍니다.`;
  }
  return "";
}

export function renderSmsMessage(template: string, name: string): string {
  return template.replaceAll("{이름}", name);
}
