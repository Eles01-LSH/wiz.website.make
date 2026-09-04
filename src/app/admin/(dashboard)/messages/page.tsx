export const dynamic = "force-dynamic";

export default function AdminMessagesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-black text-ink">문자 발송 관리</h1>
        <p className="mt-1 text-sm text-muted">SOLAPI 연동 예정 — 현재는 준비 중입니다.</p>
      </div>

      <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper text-center">
        <p className="text-sm font-semibold text-ink">문자 발송 기능은 아직 연결되지 않았습니다.</p>
        <p className="max-w-md text-xs text-muted">
          SOLAPI API 연동이 완료되면 이 화면에서 참가자에게 안내 문자를 발송하고,
          발송 성공/실패 상태(registrations.sms_status)를 확인할 수 있게 됩니다.
        </p>
      </div>
    </div>
  );
}
