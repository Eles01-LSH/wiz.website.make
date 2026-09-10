"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Registration } from "@/lib/registrations";
import { CATEGORY_LABELS } from "@/lib/registration-filters";

const SMS_STATUS_LABELS: Record<Registration["smsStatus"], string> = {
  pending: "대기",
  sent: "발송완료",
  failed: "실패",
};

function statusBadgeClass(status: Registration["smsStatus"]) {
  if (status === "sent") return "bg-accent/10 text-accent";
  if (status === "failed") return "bg-red-500/10 text-red-500";
  return "bg-mist text-muted";
}

export default function BulkMessagePanel({
  initialRegistrations,
}: {
  initialRegistrations: Registration[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState<"reminder" | "dday" | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allSelected =
    initialRegistrations.length > 0 && selected.size === initialRegistrations.length;

  const selectedCount = selected.size;

  const orderedRegistrations = useMemo(
    () => [...initialRegistrations].sort((a, b) => a.name.localeCompare(b.name, "ko")),
    [initialRegistrations]
  );

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

  async function handleSend(kind: "reminder" | "dday") {
    if (selected.size === 0) return;
    setSending(kind);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ids: Array.from(selected) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "문자 발송에 실패했습니다.");
        return;
      }

      const label = kind === "reminder" ? "하루전날 안내" : "당일 안내";
      setResult(`${label} 문자 발송 완료 — 성공 ${data.sent}건 / 실패 ${data.failed}건`);
      setSelected(new Set());
      router.refresh();
    } catch {
      setError("네트워크 오류로 발송에 실패했습니다.");
    } finally {
      setSending(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-paper px-4 py-3">
        <p className="text-sm text-ink">
          <span className="font-black text-accent">{selectedCount}</span>명 선택됨
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={selectedCount === 0 || sending !== null}
            onClick={() => handleSend("reminder")}
            className="rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending === "reminder" ? "발송 중..." : "하루 전날 안내 발송"}
          </button>
          <button
            type="button"
            disabled={selectedCount === 0 || sending !== null}
            onClick={() => handleSend("dday")}
            className="rounded-md border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending === "dday" ? "발송 중..." : "당일 안내 발송"}
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
        <table className="w-full min-w-[820px] border-collapse text-sm">
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
              <th className="px-3 py-3">이름</th>
              <th className="px-3 py-3">휴대전화</th>
              <th className="px-3 py-3">참가구분</th>
              <th className="px-3 py-3">사전예약 확인</th>
              <th className="px-3 py-3">하루전날 안내</th>
              <th className="px-3 py-3">당일 안내</th>
            </tr>
          </thead>
          <tbody>
            {orderedRegistrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
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
