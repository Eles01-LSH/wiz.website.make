"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Registration } from "@/lib/registrations";
import { CATEGORY_LABELS } from "@/lib/registration-filters";
import { buildDefaultBulkMessage, type BulkSmsKind } from "@/lib/sms-templates";

const SMS_STATUS_LABELS: Record<Registration["smsStatus"], string> = {
  pending: "대기",
  sent: "발송완료",
  failed: "실패",
};

const STATUS_ORDER: Record<Registration["smsStatus"], number> = {
  pending: 0,
  sent: 1,
  failed: 2,
};

function statusBadgeClass(status: Registration["smsStatus"]) {
  if (status === "sent") return "bg-accent/10 text-accent";
  if (status === "failed") return "bg-red-500/10 text-red-500";
  return "bg-mist text-muted";
}

type SortKey =
  | "name"
  | "phone"
  | "category"
  | "createdAt"
  | "smsStatus"
  | "reminderSmsStatus"
  | "ddaySmsStatus";

type SortState = { key: SortKey; direction: "asc" | "desc" };

const SORT_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "이름" },
  { key: "phone", label: "휴대전화" },
  { key: "category", label: "참가구분" },
  { key: "createdAt", label: "등록일" },
  { key: "smsStatus", label: "사전예약 확인" },
  { key: "reminderSmsStatus", label: "하루전날 안내" },
  { key: "ddaySmsStatus", label: "당일 안내" },
];

function compareRegistrations(a: Registration, b: Registration, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name, "ko");
    case "phone":
      return a.phone.localeCompare(b.phone);
    case "category":
      return CATEGORY_LABELS[a.category].localeCompare(CATEGORY_LABELS[b.category], "ko");
    case "createdAt":
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    case "smsStatus":
      return STATUS_ORDER[a.smsStatus] - STATUS_ORDER[b.smsStatus];
    case "reminderSmsStatus":
      return STATUS_ORDER[a.reminderSmsStatus] - STATUS_ORDER[b.reminderSmsStatus];
    case "ddaySmsStatus":
      return STATUS_ORDER[a.ddaySmsStatus] - STATUS_ORDER[b.ddaySmsStatus];
  }
}

export default function BulkMessagePanel({
  initialRegistrations,
}: {
  initialRegistrations: Registration[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [kind, setKind] = useState<BulkSmsKind>("reminder");
  const [message, setMessage] = useState(() => buildDefaultBulkMessage("reminder"));
  const [sort, setSort] = useState<SortState>({ key: "name", direction: "asc" });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allSelected =
    initialRegistrations.length > 0 && selected.size === initialRegistrations.length;

  const selectedCount = selected.size;

  const orderedRegistrations = useMemo(() => {
    const sorted = [...initialRegistrations].sort((a, b) =>
      compareRegistrations(a, b, sort.key)
    );
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [initialRegistrations, sort]);

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(initialRegistrations.map((r) => r.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  function loadDefaultMessage() {
    setMessage(buildDefaultBulkMessage(kind));
  }

  async function handleSend() {
    if (selected.size === 0 || !message.trim() || sending) return;
    setSending(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ids: Array.from(selected), message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "문자 발송에 실패했습니다.");
        return;
      }

      const label = kind === "reminder" ? "하루전날 안내" : kind === "dday" ? "당일 안내" : "기타안내";
      setResult(`${label} 문자 발송 완료 — 성공 ${data.sent}건 / 실패 ${data.failed}건`);
      setSelected(new Set());
      router.refresh();
    } catch {
      setError("네트워크 오류로 발송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-paper p-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-muted">발송 종류(상태 기록용)</span>
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input
              type="radio"
              name="bulk-sms-kind"
              checked={kind === "reminder"}
              onChange={() => setKind("reminder")}
              className="h-4 w-4 accent-accent"
            />
            하루전날 안내
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input
              type="radio"
              name="bulk-sms-kind"
              checked={kind === "dday"}
              onChange={() => setKind("dday")}
              className="h-4 w-4 accent-accent"
            />
            당일 안내
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input
              type="radio"
              name="bulk-sms-kind"
              checked={kind === "etc"}
              onChange={() => setKind("etc")}
              className="h-4 w-4 accent-accent"
            />
            기타안내
          </label>
        </div>
        {kind === "etc" && (
          <p className="text-xs text-muted">
            기타안내는 참가자 명단 아래 표(사전예약 확인 / 하루전날 안내 / 당일 안내)에 발송 여부가
            표시되지 않습니다.
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="bulk-sms-message" className="text-xs font-semibold text-muted">
              문자 내용
            </label>
            <button
              type="button"
              onClick={loadDefaultMessage}
              className="text-xs font-semibold text-accent hover:underline"
            >
              기본 문구 불러오기
            </button>
          </div>
          <textarea
            id="bulk-sms-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
            rows={4}
            placeholder="발송할 문자 내용을 입력하세요."
            className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
          />
          <p className="text-xs text-muted">
            {"{이름}"}을 넣으면 발송 시 각 수신자 이름으로 자동 치환됩니다. ({message.length}/2000자)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink">
            <span className="font-black text-accent">{selectedCount}</span>명 선택됨
          </p>
          <button
            type="button"
            disabled={selectedCount === 0 || !message.trim() || sending}
            onClick={handleSend}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "발송 중..." : "문자 발송"}
          </button>
        </div>
      </div>

      {result && (
        <p className="rounded-md bg-accent/10 px-4 py-2.5 text-xs font-semibold text-accent">
          {result}
        </p>
      )}
      {error && (
        <p className="rounded-md bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-500">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-mist text-left text-xs font-semibold text-muted">
              <th className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-accent"
                  aria-label="전체 선택"
                />
              </th>
              {SORT_COLUMNS.map((col) => (
                <th key={col.key} className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-ink"
                  >
                    {col.label}
                    <span className="text-[10px]">
                      {sort.key === col.key ? (sort.direction === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderedRegistrations.length === 0 ? (
              <tr>
                <td colSpan={SORT_COLUMNS.length + 1} className="px-4 py-10 text-center text-muted">
                  등록된 참가자가 없습니다.
                </td>
              </tr>
            ) : (
              orderedRegistrations.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                      className="h-4 w-4 accent-accent"
                      aria-label={`${r.name} 선택`}
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-3 py-3 text-ink">{r.phone}</td>
                  <td className="px-3 py-3 text-ink">{CATEGORY_LABELS[r.category]}</td>
                  <td className="px-3 py-3 text-muted">
                    {new Date(r.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Asia/Seoul",
                    })}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${statusBadgeClass(r.smsStatus)}`}
                    >
                      {SMS_STATUS_LABELS[r.smsStatus]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${statusBadgeClass(r.reminderSmsStatus)}`}
                    >
                      {SMS_STATUS_LABELS[r.reminderSmsStatus]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${statusBadgeClass(r.ddaySmsStatus)}`}
                    >
                      {SMS_STATUS_LABELS[r.ddaySmsStatus]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
