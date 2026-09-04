import Link from "next/link";
import { getRegistrationStats } from "@/lib/registrations";

export const dynamic = "force-dynamic";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-line bg-paper p-6">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-2 text-4xl font-black text-ink">{value.toLocaleString("ko-KR")}명</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getRegistrationStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-ink">대시보드</h1>
        <p className="mt-1 text-sm text-muted">행사 사전등록 현황을 한눈에 확인합니다.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="사전등록" value={stats.total} />
        <StatCard label="실제 참석" value={stats.checkedIn} />
        <StatCard label="문자 발송 성공" value={stats.smsSent} />
        <StatCard label="문자 발송 실패" value={stats.smsFailed} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Link
          href="/admin/registrations"
          className="rounded-md bg-accent px-4 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          참가자 관리
        </Link>
        <a
          href="/api/admin/export"
          className="rounded-md border border-line bg-paper px-4 py-4 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Excel 다운로드
        </a>
        <Link
          href="/admin/messages"
          className="rounded-md border border-line bg-paper px-4 py-4 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          문자 발송
        </Link>
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-md border border-line bg-paper px-4 py-4 text-center text-sm font-semibold text-muted"
        >
          QR 체크인
          <span className="mt-0.5 block text-[10px] font-normal">준비 중</span>
        </button>
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-md border border-line bg-paper px-4 py-4 text-center text-sm font-semibold text-muted"
        >
          행사 설정
          <span className="mt-0.5 block text-[10px] font-normal">준비 중</span>
        </button>
      </div>
    </div>
  );
}
