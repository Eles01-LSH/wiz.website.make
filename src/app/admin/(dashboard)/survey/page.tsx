import { getSurveyResponses } from "@/lib/survey";
import SurveyResultsView from "@/components/SurveyResultsView";

export const dynamic = "force-dynamic";

export default async function AdminSurveyPage() {
  const responses = await getSurveyResponses();
  const total = responses.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-ink">설문 결과</h1>
          <p className="mt-1 text-sm text-muted">
            총 {total.toLocaleString("ko-KR")}건 응답. 심포지엄 만족도 조사(/survey) 응답을 종합해서 보여줍니다.
          </p>
        </div>
        {total > 0 && (
          <a
            href="/api/admin/survey-export"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Excel 다운로드
          </a>
        )}
      </div>

      <SurveyResultsView responses={responses} />
    </div>
  );
}
