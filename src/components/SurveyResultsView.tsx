import { type SurveyResponse } from "@/lib/survey";
import {
  ORG_TYPE_OPTIONS,
  REGION_OPTIONS,
  FUTURE_FORMAT_OPTIONS,
  FREE_TEXT_QUESTIONS,
  type FreeTextQuestionId,
} from "@/data/survey";

function getFreeText(response: SurveyResponse, id: FreeTextQuestionId): string {
  switch (id) {
    case "policyQuestion":
      return response.policyQuestion;
    case "priorityTask":
      return response.priorityTask;
    case "additionalTopics":
      return response.additionalTopics;
    case "operationFeedback":
      return response.operationFeedback;
  }
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
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <div className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right">{count}건</span>
    </div>
  );
}

function DistributionCard({
  title,
  options,
  total,
  countFor,
}: {
  title: string;
  options: readonly { value: string; label: string }[];
  total: number;
  countFor: (value: string) => number;
}) {
  return (
    <div className="rounded-md border border-line bg-paper p-5">
      <p className="text-xs font-semibold text-muted">{title}</p>
      <div className="mt-4 flex flex-col gap-1.5">
        {options.map((opt) => (
          <DistributionBar
            key={opt.value}
            label={opt.label}
            total={total}
            count={countFor(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

/** 설문 응답 집계 화면. 관리자 대시보드(/admin/survey)와 공개 결과 페이지(/survey-results)가 공유한다. */
export default function SurveyResultsView({ responses }: { responses: SurveyResponse[] }) {
  const total = responses.length;

  if (total === 0) {
    return (
      <div className="rounded-md border border-line bg-paper p-10 text-center text-sm text-muted">
        아직 제출된 설문 응답이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex break-keep flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DistributionCard
          title="Ⅰ-1. 소속기관 유형 분포"
          options={ORG_TYPE_OPTIONS}
          total={total}
          countFor={(v) => responses.filter((r) => r.orgType === v).length}
        />
        <DistributionCard
          title="Ⅰ-2. 주요 활동지역 분포"
          options={REGION_OPTIONS}
          total={total}
          countFor={(v) => responses.filter((r) => r.region === v).length}
        />
      </div>

      <DistributionCard
        title="Ⅲ-5. 향후 선호하는 운영방식"
        options={FUTURE_FORMAT_OPTIONS}
        total={total}
        countFor={(v) => responses.filter((r) => r.futureFormat === v).length}
      />

      <div>
        <h2 className="mb-3 text-sm font-black text-ink">현장 의견 (자유서술)</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {FREE_TEXT_QUESTIONS.map((q) => {
            const items = responses
              .map((r) => getFreeText(r, q.id))
              .filter((text) => text.trim());
            return (
              <div key={q.id} className="rounded-md border border-line bg-paper p-5">
                <h3 className="text-sm font-black text-ink">
                  {q.number}. {q.label} ({items.length}건)
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
    </div>
  );
}
