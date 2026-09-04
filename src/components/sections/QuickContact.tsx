"use client";

import { useState, type FormEvent } from "react";
import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { CONTACT_INFO, NAVER_PLACE_URL } from "@/data/contact";

const PROJECT_TYPES = ["FILM", "MOTION", "LIVE", "MEDIA", "기타"];

export default function QuickContact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSending(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.get("company"),
          contactName: form.get("contactName"),
          phone: form.get("phone"),
          projectType: form.get("projectType"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="border-b border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          <Reveal>
            <SectionLabel>PROJECT INQUIRY</SectionLabel>
            <h2 className="mt-4 text-3xl font-black text-ink sm:text-4xl">
              빠른 상담문의
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              프로젝트를 준비하고 계신가요?
              <br />
              간단한 정보만 남겨주시면 빠르게 상담해드립니다.
            </p>

            <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
              {CONTACT_INFO.map((info) => (
                <div key={info.label}>
                  <p className="text-xs font-semibold tracking-[0.3em] text-muted">
                    {info.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-ink">{info.value}</p>
                </div>
              ))}
              <a
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
              >
                네이버 플레이스에서 보기
                <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md bg-mist text-center">
                <p className="text-2xl font-black text-ink">Thank you</p>
                <p className="mt-3 text-sm text-muted">
                  문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    required
                    type="text"
                    name="company"
                    placeholder="회사/기관명"
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                  <input
                    required
                    type="text"
                    name="contactName"
                    placeholder="담당자명"
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="연락처"
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                  <select
                    name="projectType"
                    defaultValue=""
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled>
                      프로젝트 종류
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="간단한 문의내용"
                  className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                />

                {submitError && (
                  <p className="self-end text-xs font-medium text-red-500">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-fit items-center gap-2 self-end rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "전송 중..." : "빠른 상담 요청"}
                  {!sending && <span aria-hidden>→</span>}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
