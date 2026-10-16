"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/PageHero";
import {
  SURVEY_TITLE,
  SURVEY_SUBTITLE,
  SURVEY_INTRO_PARAGRAPHS,
  SURVEY_INTRO_FACTS,
  SURVEY_INTRO_NOTICE,
  SURVEY_CLOSING_TITLE,
  SURVEY_CLOSING_BODY,
  SURVEY_CLOSING_SIGNATURE,
  ORG_TYPE_OPTIONS,
  REGION_OPTIONS,
  FUTURE_FORMAT_OPTIONS,
  FREE_TEXT_QUESTIONS,
  type FreeTextQuestionId,
} from "@/data/survey";

type FreeTextAnswers = Record<FreeTextQuestionId, string>;

function autoResize(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

export default function SurveyPage() {
  const [orgType, setOrgType] = useState("");
  const [region, setRegion] = useState("");
  const [futureFormat, setFutureFormat] = useState("");

  const [freeText, setFreeText] = useState<FreeTextAnswers>({
    policyQuestion: "",
    priorityTask: "",
    additionalTopics: "",
    operationFeedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!orgType) {
      setErrorMessage("소속기관 유형을 선택해 주세요.");
      return;
    }
    if (!region) {
      setErrorMessage("주요 활동지역을 선택해 주세요.");
      return;
    }
    if (!futureFormat) {
      setErrorMessage("향후 운영방식을 선택해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgType,
          region,
          futureFormat,
          ...freeText,
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
      <PageHero label={SURVEY_TITLE} title={SURVEY_SUBTITLE} />

      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md bg-mist px-6 text-center">
              <p className="break-keep text-2xl font-black text-ink">{SURVEY_CLOSING_TITLE}</p>
              <p className="mt-3 break-keep text-sm leading-relaxed text-muted">
                {SURVEY_CLOSING_BODY}
              </p>
              <p className="mt-4 break-keep text-xs font-semibold text-muted">
                {SURVEY_CLOSING_SIGNATURE}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex break-keep flex-col gap-10">
              <div className="break-keep rounded-md bg-mist px-5 py-4 text-sm leading-relaxed text-ink">
                <p className="font-semibold">조사 안내</p>
                {SURVEY_INTRO_PARAGRAPHS.map((p, idx) => (
                  <p key={idx} className="mt-2 text-muted">
                    {p}
                  </p>
                ))}
                <ul className="mt-3 flex flex-col gap-1 text-muted">
                  {SURVEY_INTRO_FACTS.map((fact) => (
                    <li key={fact.label}>
                      <span className="font-semibold text-ink">· {fact.label}</span>: {fact.value}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">※ {SURVEY_INTRO_NOTICE}</p>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-black text-ink">Ⅰ. 응답자 기본현황</h2>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted">
                    1. 귀하의 소속기관 유형은 무엇입니까?{" "}
                    <span className="text-accent">*</span>
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
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted">
                    2. 귀하의 주요 활동지역은 어디입니까?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled>
                      선택해 주세요
                    </option>
                    {REGION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-black text-ink">Ⅱ. 심포지엄 관련 질문 및 현장 의견</h2>

                {FREE_TEXT_QUESTIONS.filter((q) => q.number <= 4).map((q) => (
                  <div key={q.id}>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      {q.number}. {q.label}
                    </label>
                    {q.notes.map((note, idx) => (
                      <p key={idx} className="mb-1.5 text-xs text-muted/80">
                        ※ {note}
                      </p>
                    ))}
                    <textarea
                      rows={3}
                      value={freeText[q.id]}
                      onChange={(e) =>
                        setFreeText((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      onInput={autoResize}
                      placeholder="자유롭게 작성해 주세요. (선택)"
                      className="w-full resize-none overflow-hidden rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-black text-ink">Ⅲ. 향후 심포지엄 및 협력사업 운영 방향</h2>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted">
                    5. 향후 지역필수의료 현안과 협력방안을 논의하기 위해 가장 적절하다고 생각하는
                    운영방식은 무엇입니까?{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <select
                    value={futureFormat}
                    onChange={(e) => setFutureFormat(e.target.value)}
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled>
                      선택해 주세요
                    </option>
                    {FUTURE_FORMAT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {FREE_TEXT_QUESTIONS.filter((q) => q.number >= 6).map((q) => (
                  <div key={q.id}>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      {q.number}. {q.label}
                    </label>
                    {q.notes.map((note, idx) => (
                      <p key={idx} className="mb-1.5 text-xs text-muted/80">
                        ※ {note}
                      </p>
                    ))}
                    <textarea
                      rows={3}
                      value={freeText[q.id]}
                      onChange={(e) =>
                        setFreeText((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      onInput={autoResize}
                      placeholder="자유롭게 작성해 주세요. (선택)"
                      className="w-full resize-none overflow-hidden rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                ))}
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
