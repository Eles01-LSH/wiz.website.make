import { getRegistrations } from "@/lib/registrations";
import BulkMessagePanel from "@/components/admin/BulkMessagePanel";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const registrations = await getRegistrations();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-black text-ink">문자 발송 관리</h1>
        <p className="mt-1 text-sm text-muted">
          체크박스로 대상을 선택한 뒤 하루전날/당일 안내 문자를 발송합니다. 사전예약 확인
          문자는 등록 즉시 자동으로 발송됩니다.
        </p>
      </div>

      <BulkMessagePanel initialRegistrations={registrations} />
    </div>
  );
}
