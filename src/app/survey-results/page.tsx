import { getSurveyResponsesPublic } from "@/lib/survey";
import SurveyResultsView from "@/components/SurveyResultsView";
import SurveyQrCode from "@/components/SurveyQrCode";

export const dynamic = "force-dynamic";

export default async function SurveyResultsPage() {
  const responses = await getSurveyResponsesPublic();
  const total = responses.length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-accent">
            2026년 전남권역책임의료기관
          </p>
          <h1 className="mt-3 text-2xl font-black text-ink sm:text-3xl">
            화순전남대학교병원 심포지엄 설문 결과
          </h1>
          <p className="mt-2 text-sm text-muted">
            총 {total.toLocaleString("ko-KR")}건 응답이 집계되었습니다.
          </p>
        </div>
        {total > 0 && (
          <a
            href="/api/survey-export"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Excel 다운로드
          </a>
        )}
      </div>

      <SurveyResultsView responses={responses} />

      <div className="mt-10">
        <SurveyQrCode />
      </div>
    </main>
  );
}
