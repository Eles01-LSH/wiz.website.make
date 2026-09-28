import { getSurveyResponses, type SurveyResponse } from "@/lib/survey";
import {
  ORG_TYPE_OPTIONS,
  JOB_TYPE_OPTIONS,
  SYMPOSIUM_QUESTIONS,
  PROGRAM_ITEMS,
  WILLINGNESS_QUESTION,
  FREE_TEXT_QUESTIONS,
  type ScaleQuestionId,
} from "@/data/survey";

export const dynamic = "force-dynamic";

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function getScaleScore(response: SurveyResponse, id: ScaleQuestionId): number {
  switch (id) {
    case "overall":
      return response.overallScore;
    case "relevance":
      return response.relevanceScore;
    case "policyUnderstanding":
      return response.policyUnderstandingScore;
    case "fieldPresentation":
      return response.fieldPresentationScore;
    case "panelDiscussion":
      return response.panelDiscussionScore;
    case "operation":
      return response.operationScore;
  }
}

function getFreeText(
  response: SurveyResponse,
  id: "topicRequest" | "mostHelpful" | "improvement"
): string {
  if (id === "topicRequest") return response.topicRequest;
  if (id === "mostHelpful") return response.mostHelpful;
  return response.improvement;
}

function DistributionBar({
  count,
  total,
  label,
}: {
  count: number;
  total: number;
  label: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="w-10 shrink-0">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right">{count}건</span>
    </div>
  );
}

function ScoreCard({
  label,
  values,
}: {
  label: string;
  values: number[];
}) {
  const total = values.length;
  const avg = average(values);
  const counts = [0, 0, 0, 0, 0];
  for (const v of values) counts[v - 1] += 1;

  return (
    <div className="rounded-md border border-line bg-paper p-5">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">
        {avg.toFixed(1)}
        <span className="ml-1 text-sm font-medium text-muted">/ 5.0</span>
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        {counts.map((count, idx) => (
          <DistributionBar key={idx} count={count} total={total} label={`${idx + 1}점`} />
        ))}
      </div>
    </div>
  );
}

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

      {total === 0 ? (
        <div className="rounded-md border border-line bg-paper p-10 text-center text-sm text-muted">
          아직 제출된 설문 응답이 없습니다.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-line bg-paper p-5">
              <p className="text-xs font-semibold text-muted">Ⅰ-1. 근무 기관 분포</p>
              <div className="mt-4 flex flex-col gap-1.5">
                {ORG_TYPE_OPTIONS.map((opt) => (
                  <DistributionBar
                    key={opt.value}
                    label={opt.label}
                    total={total}
                    count={responses.filter((r) => r.orgType === opt.value).length}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-md border border-line bg-paper p-5">
              <p className="text-xs font-semibold text-muted">Ⅰ-2. 직종 분포</p>
              <div className="mt-4 flex flex-col gap-1.5">
                {JOB_TYPE_OPTIONS.map((opt) => (
                  <DistributionBar
                    key={opt.value}
                    label={opt.label}
                    total={total}
                    count={responses.filter((r) => r.jobType === opt.value).length}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-black text-ink">Ⅱ. 심포지엄 만족도</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SYMPOSIUM_QUESTIONS.map((q) => (
                <ScoreCard
                  key={q.id}
                  label={q.label}
                  values={responses.map((r) => getScaleScore(r, q.id))}
                />
              ))}
              <ScoreCard
                label={WILLINGNESS_QUESTION}
                values={responses.map((r) => r.willingnessScore)}
              />
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-black text-ink">Ⅲ. 프로그램별 만족도</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {PROGRAM_ITEMS.map((item, idx) => (
                <ScoreCard
                  key={item.title}
                  label={item.presenter ? `${item.title} — ${item.presenter}` : item.title}
                  values={responses.map((r) => r.programScores[idx])}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-black text-ink">Ⅳ. 서술형 의견</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {FREE_TEXT_QUESTIONS.map((q) => {
                const items = responses
                  .map((r) => getFreeText(r, q.id))
                  .filter((text) => text.trim());
                return (
                  <div key={q.id} className="rounded-md border border-line bg-paper p-5">
                    <h3 className="text-sm font-black text-ink">
                      {q.label} ({items.length}건)
                    </h3>
                    <ul className="mt-3 flex max-h-96 flex-col gap-3 overflow-y-auto">
                      {items.length === 0 ? (
                        <li className="text-xs text-muted">등록된 의견이 없습니다.</li>
                      ) : (
                        items.map((text, idx) => (
                          <li
                            key={idx}
                            className="rounded-md bg-mist px-3 py-2.5 text-xs leading-relaxed text-ink"
                          >
                            {text}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
