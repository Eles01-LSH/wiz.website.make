import { getRegistrations } from "@/lib/registrations";
import RegistrationsTable from "@/components/admin/RegistrationsTable";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-ink">참가자 명단</h1>
        <p className="mt-1 text-sm text-muted">
          총 {registrations.length.toLocaleString("ko-KR")}명 등록. 최신 등록자가 위에 표시됩니다.
        </p>
      </div>

      <RegistrationsTable initialRegistrations={registrations} />
    </div>
  );
}
