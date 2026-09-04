import type { Registration } from "@/lib/registrations";

/**
 * 사전등록 완료 후 알림 발송 지점.
 * 향후 SOLAPI 연동 시 이 함수 내부에서 서버 전용 환경변수(NEXT_PUBLIC_ 접두사 없음)로
 * 발급받은 SOLAPI API 키를 사용해 문자를 발송하고, registrations.sms_status를
 * 'sent' | 'failed'로 업데이트한다 (관리자 화면의 /admin/messages, 통계 카드와 연동).
 * 프론트엔드에는 절대 키를 노출하지 않는다. 지금 단계에서는 아무 동작도 하지 않는다.
 */
export async function notifyRegistrationCreated(
  registration: Registration
): Promise<void> {
  void registration;
}
