"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/PageHero";
import {
  ORG_TYPE_OPTIONS,
  JOB_TYPE_OPTIONS,
  SATISFACTION_SCALE,
  AGREEMENT_SCALE,
  SYMPOSIUM_QUESTIONS,
  PROGRAM_ITEMS,
  WILLINGNESS_QUESTION,
  FREE_TEXT_QUESTIONS,
  type ScaleQuestionId,
} from "@/data/survey";

type ScaleAnswers = Record<ScaleQuestionId, string>;

function ScaleField({
  label,
  scale,
  value,
  onChange,
  name,
}: {
  label: React.ReactNode;
  scale: readonly { value: number; label: string }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <div className="rounded-md border border-line bg-paper p-5">
      <p className="mb-3 text-sm font-semibold text-ink">{label}</p>
      <div className="flex flex-wrap gap-3">
        {scale.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5 text-xs text-muted">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === String(opt.value)}
              onChange={() => onChange(String(opt.value))}
              className="h-4 w-4 accent-accent"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function SurveyPage() {
  const [orgType, setOrgType] = useState("");
  const [orgTypeEtc, setOrgTypeEtc] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTypeEtc, setJobTypeEtc] = useState("");

  const [scaleAnswers, setScaleAnswers] = useState<ScaleAnswers>({
    overall: "",
    relevance: "",
    policyUnderstanding: "",
    fieldPresentation: "",
    panelDiscussion: "",
    operation: "",
  });

  const [programScores, setProgramScores] = useState<string[]>(Array(8).fill(""));
  const [willingness, setWillingness] = useState("");

  const [topicRequest, setTopicRequest] = useState("");
  const [mostHelpful, setMostHelpful] = useState("");
  const [improvement, setImprovement] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!orgType) {
      setErrorMessage("현재 근무 기관을 선택해 주세요.");
      return;
    }
    if (orgType === "etc" && !orgTypeEtc.trim()) {
      setErrorMessage("근무 기관을 직접 입력해 주세요.");
      return;
    }
    if (!jobType) {
      setErrorMessage("직종을 선택해 주세요.");
      return;
    }
    if (jobType === "etc" && !jobTypeEtc.trim()) {
      setErrorMessage("직종을 직접 입력해 주세요.");
      return;
    }
    if (SYMPOSIUM_QUESTIONS.some((q) => !scaleAnswers[q.id])) {
      setErrorMessage("심포지엄 만족도(3~8번) 문항에 모두 응답해 주세요.");
      return;
    }
    if (programScores.some((v) => !v)) {
      setErrorMessage("프로그램별 만족도(9번) 문항에 모두 응답해 주세요.");
      return;
    }
    if (!willingness) {
      setErrorMessage("향후 참여 의향(10번) 문항에 응답해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgType,
          orgTypeEtc,
          jobType,
          jobTypeEtc,
          overallScore: Number(scaleAnswers.overall),
          relevanceScore: Number(scaleAnswers.relevance),
          policyUnderstandingScore: Number(scaleAnswers.policyUnderstanding),
          fieldPresentationScore: Number(scaleAnswers.fieldPresentation),
          panelDiscussionScore: Number(scaleAnswers.panelDiscussion),
          operationScore: Number(scaleAnswers.operation),
          programScores: programScores.map(Number),
          willingnessScore: Number(willingness),
          topicRequest,
          mostHelpful,
          improvement,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error ?? "제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage("네트워크 오류로 제출에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
        <PageHero
          label="2026년 전남권역책임의료기관"
          title="화순전남대학교병원 심포지엄 만족도 조사"
          description="지역완결적 필수의료체계 구축, 현황과 과제 그리고 도전"
        />

        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md bg-mist px-6 text-center">
                <p className="text-2xl font-black text-ink">설문 제출 완료</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  소중한 의견 감사합니다.
                  <br />
                  더 나은 행사를 만드는 데 참고하겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
                <div className="rounded-md bg-mist px-5 py-4 text-sm leading-relaxed text-ink">
                  <p className="font-semibold">안녕하십니까?</p>
                  <p className="mt-2 text-muted">
                    본 설문은 2026년 전남권역책임의료기관 화순전남대학교병원 심포지엄에 참석하신
                    분들의 의견을 수렴하여 향후 행사 운영과 프로그램 개선에 반영하고자
                    실시합니다. 응답 내용은 통계적 분석 목적으로만 활용되며 익명으로
                    처리됩니다. 바쁘시더라도 소중한 의견을 부탁드립니다.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-black text-ink">Ⅰ. 응답자 일반사항</h2>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      1. 귀하의 현재 근무 기관은 어디입니까? <span className="text-accent">*</span>
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    >
                      <option value="" disabled>
                        선택해 주세요
                      </option>
                      {ORG_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {orgType === "etc" && (
                      <input
                        type="text"
                        value={orgTypeEtc}
                        onChange={(e) => setOrgTypeEtc(e.target.value)}
                        placeholder="근무 기관을 직접 입력해 주세요."
                        className="mt-2 w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                      />
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      2. 귀하의 직종은 무엇입니까? <span className="text-accent">*</span>
                    </label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    >
                      <option value="" disabled>
                        선택해 주세요
                      </option>
                      {JOB_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {jobType === "etc" && (
                      <input
                        type="text"
                        value={jobTypeEtc}
                        onChange={(e) => setJobTypeEtc(e.target.value)}
                        placeholder="직종을 직접 입력해 주세요."
                        className="mt-2 w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-lg font-black text-ink">Ⅱ. 심포지엄 만족도</h2>
                    <p className="mt-1 text-xs text-muted">
                      문항 3~8은 5점 척도로 응답합니다. (5점=매우 만족/매우 그렇다, 1점=매우
                      불만족/전혀 그렇지 않다)
                    </p>
                  </div>

                  {SYMPOSIUM_QUESTIONS.map((q, idx) => (
                    <ScaleField
                      key={q.id}
                      name={q.id}
                      label={`${idx + 3}. ${q.label}`}
                      scale={q.scale === "satisfaction" ? SATISFACTION_SCALE : AGREEMENT_SCALE}
                      value={scaleAnswers[q.id]}
                      onChange={(v) => setScaleAnswers((prev) => ({ ...prev, [q.id]: v }))}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-lg font-black text-ink">Ⅲ. 프로그램별 만족도</h2>
                    <p className="mt-1 text-xs text-muted">
                      9. 다음 발표 및 토론에 대한 만족도를 평가해 주십시오.
                    </p>
                  </div>

                  {PROGRAM_ITEMS.map((item, idx) => (
                    <ScaleField
                      key={item.title}
                      name={`program-${idx}`}
                      label={
                        <>
                          ⑨-{idx + 1}. {item.title}
                          {item.presenter && (
                            <span className="block text-xs font-normal text-muted">
                              — {item.presenter}
                            </span>
                          )}
                        </>
                      }
                      scale={SATISFACTION_SCALE}
                      value={programScores[idx]}
                      onChange={(v) =>
                        setProgramScores((prev) => {
                          const next = [...prev];
                          next[idx] = v;
                          return next;
                        })
                      }
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-black text-ink">Ⅳ. 향후 운영 및 개선의견</h2>

                  <ScaleField
                    name="willingness"
                    label={`10. ${WILLINGNESS_QUESTION}`}
                    scale={AGREEMENT_SCALE}
                    value={willingness}
                    onChange={setWillingness}
                  />

                  {FREE_TEXT_QUESTIONS.map((q, idx) => {
                    const value =
                      q.id === "topicRequest"
                        ? topicRequest
                        : q.id === "mostHelpful"
                          ? mostHelpful
                          : improvement;
                    const setValue =
                      q.id === "topicRequest"
                        ? setTopicRequest
                        : q.id === "mostHelpful"
                          ? setMostHelpful
                          : setImprovement;
                    return (
                      <div key={q.id}>
                        <label className="mb-1.5 block text-xs font-semibold text-muted">
                          {idx + 11}. {q.label}
                        </label>
                        <textarea
                          rows={3}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="자유롭게 작성해 주세요. (선택)"
                          className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                        />
                      </div>
                    );
                  })}
                </div>

                {errorMessage && (
                  <p className="text-xs font-medium text-red-500" role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-fit items-center gap-2 self-end rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "제출 중..." : "설문 제출하기"}
                  <span aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>
        </section>
    </main>
  );
}
