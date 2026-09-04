"use client";

import { useMemo, useState } from "react";
import type { Registration } from "@/lib/registrations";
import {
  CATEGORY_LABELS,
  DEFAULT_FILTERS,
  filterRegistrations,
  type CategoryFilter,
  type CheckinFilter,
  type SmsFilter,
} from "@/lib/registration-filters";

const SMS_STATUS_LABELS: Record<Registration["smsStatus"], string> = {
  pending: "대기",
  sent: "성공",
  failed: "실패",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RegistrationsTable({
  initialRegistrations,
}: {
  initialRegistrations: Registration[];
}) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(
    () => filterRegistrations(registrations, filters),
    [registrations, filters]
  );

  const exportHref = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.q.trim()) params.set("q", filters.q.trim());
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.checkin !== "all") params.set("checkin", filters.checkin);
    if (filters.sms !== "all") params.set("sms", filters.sms);
    const qs = params.toString();
    return qs ? `/api/admin/export?${qs}` : "/api/admin/export";
  }, [filters]);

  async function toggleCheckin(id: string, current: boolean) {
    const next = !current;
    setPendingId(id);
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checkin: next } : r))
    );

    try {
      const res = await fetch(`/api/admin/registrations/${id}/checkin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkin: next }),
      });

      if (!res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, checkin: current } : r))
        );
      }
    } catch {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, checkin: current } : r))
      );
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          placeholder="이름 · 소속기관 · 휴대전화 검색"
          className="w-full max-w-xs rounded-md border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value as CategoryFilter }))
          }
          className="rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="all">참가구분: 전체</option>
          <option value="medical">의료기관</option>
          <option value="public">공공기관</option>
          <option value="etc">기타</option>
        </select>

        <select
          value={filters.checkin}
          onChange={(e) =>
            setFilters((f) => ({ ...f, checkin: e.target.value as CheckinFilter }))
          }
          className="rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="all">체크인: 전체</option>
          <option value="done">체크인 완료</option>
          <option value="pending">미체크인</option>
        </select>

        <select
          value={filters.sms}
          onChange={(e) => setFilters((f) => ({ ...f, sms: e.target.value as SmsFilter }))}
          className="rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="all">SMS: 전체</option>
          <option value="sent">발송 성공</option>
          <option value="failed">발송 실패</option>
        </select>

        <a
          href={exportHref}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          Excel 다운로드
        </a>
      </div>

      <p className="text-xs text-muted">
        {filtered.length.toLocaleString("ko-KR")}명 표시 중 (전체 {registrations.length.toLocaleString("ko-KR")}명)
      </p>

      <div className="overflow-x-auto rounded-md border border-line bg-paper">
        <table className="w-full min-w-[1180px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-mist text-left text-xs font-semibold text-muted">
              <th className="px-3 py-3">No</th>
              <th className="px-3 py-3">이름</th>
              <th className="px-3 py-3">소속기관</th>
              <th className="px-3 py-3">부서</th>
              <th className="px-3 py-3">직위</th>
              <th className="px-3 py-3">휴대전화</th>
              <th className="px-3 py-3">이메일</th>
              <th className="px-3 py-3">참가구분</th>
              <th className="px-3 py-3">식사여부</th>
              <th className="px-3 py-3">등록일</th>
              <th className="px-3 py-3">문자발송</th>
              <th className="px-3 py-3">체크인</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-10 text-center text-muted">
                  조건에 맞는 참가자가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={r.id} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3 text-muted">{i + 1}</td>
                  <td className="px-3 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-3 py-3 text-ink">{r.organization || "-"}</td>
                  <td className="px-3 py-3 text-ink">{r.department || "-"}</td>
                  <td className="px-3 py-3 text-ink">{r.position || "-"}</td>
                  <td className="px-3 py-3 text-ink">{r.phone}</td>
                  <td className="px-3 py-3 text-ink">{r.email || "-"}</td>
                  <td className="px-3 py-3 text-ink">{CATEGORY_LABELS[r.category]}</td>
                  <td className="px-3 py-3 text-ink">{r.meal ? "신청" : "미신청"}</td>
                  <td className="px-3 py-3 text-muted">{formatDate(r.createdAt)}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        r.smsStatus === "sent"
                          ? "bg-accent/10 text-accent"
                          : r.smsStatus === "failed"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-mist text-muted"
                      }`}
                    >
                      {SMS_STATUS_LABELS[r.smsStatus]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      disabled={pendingId === r.id}
                      onClick={() => toggleCheckin(r.id, r.checkin)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        r.checkin
                          ? "bg-accent text-white hover:bg-ink"
                          : "bg-mist text-muted hover:bg-line"
                      }`}
                    >
                      {r.checkin ? "체크인" : "미체크인"}
                    </button>
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
