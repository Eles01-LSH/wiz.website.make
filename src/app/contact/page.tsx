"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NaverMap from "@/components/NaverMap";
import { PaperclipIcon, XIcon } from "@/components/icons";
import {
  CONTACT_INFO,
  NAVER_PLACE_URL,
  PROJECT_TYPES,
  BUDGET_RANGES,
  ALLOWED_ATTACHMENT_EXTENSIONS,
  MAX_ATTACHMENT_SIZE_MB,
} from "@/data/contact";

const ADDRESS = CONTACT_INFO.find((info) => info.label === "ADDRESS")?.value ?? "";
const MAX_ATTACHMENT_BYTES = MAX_ATTACHMENT_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function isAllowedFile(file: File) {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  return ALLOWED_ATTACHMENT_EXTENSIONS.includes(ext);
}

function fileToBase64(file: File): Promise<{ filename: string; content: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve({ filename: file.name, content: result.split(",")[1] ?? "" });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;

    const accepted: File[] = [];
    let error: string | null = null;

    Array.from(list).forEach((file) => {
      if (!isAllowedFile(file)) {
        error = `지원하지 않는 파일 형식입니다: ${file.name}`;
        return;
      }
      if (file.size > MAX_ATTACHMENT_BYTES) {
        error = `파일 용량이 ${MAX_ATTACHMENT_SIZE_MB}MB를 초과합니다: ${file.name}`;
        return;
      }
      accepted.push(file);
    });

    if (accepted.length > 0) {
      setFiles((prev) => [...prev, ...accepted]);
    }
    setFileError(error);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setSending(true);

    const form = new FormData(e.currentTarget);

    try {
      const attachments = await Promise.all(files.map(fileToBase64));

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.get("company"),
          contactName: form.get("contactName"),
          phone: form.get("phone"),
          email: form.get("email"),
          projectType: form.get("projectType"),
          budget: form.get("budget"),
          timeline: form.get("timeline"),
          message: form.get("message"),
          attachments,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("문의 전송에 실패했습니다. 잠시 후 다시 시도해주시거나 전화로 연락해주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          label="PROJECT INQUIRY"
          title="제작 문의"
          description="프로젝트의 목적과 방향을 알려주시면, WIZ CNI가 가장 적합한 제작 방식을 제안합니다."
        />

        <section className="px-6 pt-16 pb-10 md:px-10 md:pt-20 md:pb-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col gap-8">
              <NaverMap address={ADDRESS} fallbackHref={NAVER_PLACE_URL} />

              <div className="flex flex-col gap-6 border-t border-line pt-6">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label}>
                    <p className="text-xs font-semibold tracking-[0.3em] text-muted">
                      {info.label}
                    </p>
                    <p className="mt-2 text-base font-medium text-ink">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-md bg-mist text-center">
                  <p className="text-2xl font-black text-ink">Thank you</p>
                  <p className="mt-3 text-sm text-muted">
                    문의가 접수되었습니다. 영업일 기준 1~2일 이내에 담당자가 연락드리겠습니다.
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
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="이메일"
                      className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <select
                      required
                      name="projectType"
                      defaultValue=""
                      className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    >
                      <option value="" disabled>
                        프로젝트 종류
                      </option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type.en} value={type.en}>
                          {type.ko} / {type.en}
                        </option>
                      ))}
                    </select>

                    <select
                      name="budget"
                      defaultValue=""
                      className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                    >
                      <option value="" disabled>
                        예상 예산 (선택)
                      </option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    name="timeline"
                    placeholder="희망 제작 일정 (선택, 예: 2026년 3월 초 촬영 희망)"
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />

                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="프로젝트의 목적과 방향, 참고할 만한 레퍼런스가 있다면 자유롭게 남겨주세요."
                    className="rounded-md border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
                  />

                  <div>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-6 text-center transition-colors ${
                        dragActive
                          ? "border-accent bg-accent/5"
                          : "border-line hover:border-accent"
                      }`}
                    >
                      <PaperclipIcon className="h-5 w-5 text-muted" />
                      <p className="text-sm font-medium text-ink">
                        참고 자료 첨부{" "}
                        <span className="text-muted">(선택, 클릭 또는 드래그하여 업로드)</span>
                      </p>
                      <p className="text-xs text-muted">
                        PDF, PPT, DOC, JPG, PNG, ZIP · 파일당 최대 {MAX_ATTACHMENT_SIZE_MB}MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ALLOWED_ATTACHMENT_EXTENSIONS.join(",")}
                        onChange={(e) => addFiles(e.target.files)}
                        className="hidden"
                      />
                    </div>

                    {fileError && (
                      <p className="mt-2 text-xs font-medium text-red-500">{fileError}</p>
                    )}

                    {files.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {files.map((file, i) => (
                          <li
                            key={`${file.name}-${i}`}
                            className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-xs"
                          >
                            <span className="truncate text-ink">{file.name}</span>
                            <span className="flex shrink-0 items-center gap-3 text-muted">
                              {formatFileSize(file.size)}
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                aria-label={`${file.name} 제거`}
                                className="text-muted transition-colors hover:text-accent"
                              >
                                <XIcon />
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {submitError && (
                      <p className="self-end text-xs font-medium text-red-500">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-fit items-center gap-2 self-end rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? "전송 중..." : "프로젝트 상담 시작하기"}
                      {!sending && <span aria-hidden>→</span>}
                    </button>
                    <p className="text-xs text-muted">
                      영업일 기준 1~2일 이내에 담당자가 연락드립니다.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
