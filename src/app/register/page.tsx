"use client";

import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATEGORY_OPTIONS = [
  { value: "medical", label: "의료기관" },
  { value: "public", label: "공공기관" },
  { value: "etc", label: "기타" },
] as const;

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validate(formData: FormData): string | null {
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const consent = formData.get("consent") === "on";

    if (!name) return "이름을 입력해 주세요.";
    if (!phone) return "연락처를 입력해 주세요.";
    if (email && !EMAIL_REGEX.test(email)) return "이메일 형식이 올바르지 않습니다.";
    if (!consent) return "개인정보 수집 및 이용에 동의해 주세요.";
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const clientError = validate(formData);
    if (clientError) {
      setErrorMessage(clientError);
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      department: String(formData.get("department") ?? "").trim(),
      position: String(formData.get("position") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      category: String(formData.get("category") ?? "etc"),
      meal: formData.get("meal") === "on",
      consent: formData.get("consent") === "on",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error ?? "등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setErrorMessage("네트워크 오류로 등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          label="EVENT PRE-REGISTRATION"
          title="행사 사전등록"
          description="아래 정보를 남겨주시면 행사 관련 안내를 순차적으로 전달드립니다."
        />

        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-xl">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-md bg-mist px-6 text-center">
                <p className="text-2xl font-black text-ink">사전등록 완료</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  사전등록이 완료되었습니다.
                  <br />
                  행사 관련 안내는 입력하신 연락처를 통해 전달될 예정입니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-muted">
                    이름 <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="홍길동"
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="mb-1.5 block text-xs font-semibold text-muted">
                    소속 또는 회사명
                  </label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    placeholder="WIZ CNI"
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="department" className="mb-1.5 block text-xs font-semibold text-muted">
                      부서
                    </label>
                    <input
                      id="department"
                      type="text"
                      name="department"
                      placeholder="예: 홍보팀"
                      className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="mb-1.5 block text-xs font-semibold text-muted">
                      직위
                    </label>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      placeholder="예: 팀장"
                      className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-muted">
                    연락처 <span className="text-accent">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="010-0000-0000"
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-muted">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="mb-1.5 block text-xs font-semibold text-muted">
                      참가구분
                    </label>
                    <select
                      id="category"
                      name="category"
                      defaultValue="etc"
                      className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2.5 self-end rounded-md border border-line px-4 py-3 text-sm text-ink">
                    <input
                      type="checkbox"
                      name="meal"
                      className="h-4 w-4 shrink-0 rounded border-line accent-accent"
                    />
                    식사를 신청합니다
                  </label>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-accent"
                  />
                  <span>
                    (필수) 개인정보 수집 및 이용에 동의합니다. 수집 항목: 이름, 소속, 연락처, 이메일.
                    수집 목적: 행사 사전등록 및 안내. 보유 기간: 행사 종료 후 파기.
                  </span>
                </label>

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
                  {submitting ? "등록 중..." : "사전등록 하기"}
                  <span aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
