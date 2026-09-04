import * as XLSX from "xlsx";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { getRegistrations } from "@/lib/registrations";
import {
  CATEGORY_LABELS,
  DEFAULT_FILTERS,
  filterRegistrations,
  type CategoryFilter,
  type CheckinFilter,
  type SmsFilter,
} from "@/lib/registration-filters";
import { EVENT_EXPORT_LABEL } from "@/data/event";

const SMS_STATUS_LABELS = { pending: "대기", sent: "성공", failed: "실패" } as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  const url = new URL(request.url);
  const filters = {
    q: url.searchParams.get("q") ?? DEFAULT_FILTERS.q,
    category: (url.searchParams.get("category") as CategoryFilter | null) ?? DEFAULT_FILTERS.category,
    checkin: (url.searchParams.get("checkin") as CheckinFilter | null) ?? DEFAULT_FILTERS.checkin,
    sms: (url.searchParams.get("sms") as SmsFilter | null) ?? DEFAULT_FILTERS.sms,
  };

  let registrations;
  try {
    registrations = filterRegistrations(await getRegistrations(), filters);
  } catch {
    return NextResponse.json(
      { error: "명단을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  const rows = registrations.map((r, i) => ({
    No: i + 1,
    이름: r.name,
    소속기관: r.organization,
    부서: r.department,
    직위: r.position,
    휴대전화: r.phone,
    이메일: r.email,
    참가구분: CATEGORY_LABELS[r.category],
    식사여부: r.meal ? "신청" : "미신청",
    등록일: formatDate(r.createdAt),
    체크인여부: r.checkin ? "완료" : "미체크인",
    문자발송상태: SMS_STATUS_LABELS[r.smsStatus],
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 휴대전화 앞자리 0이 사라지지 않도록 해당 열을 텍스트 서식으로 고정한다.
  const phoneColIndex = Object.keys(rows[0] ?? {}).indexOf("휴대전화");
  if (phoneColIndex >= 0) {
    for (let row = 0; row < rows.length; row++) {
      const cellRef = XLSX.utils.encode_cell({ r: row + 1, c: phoneColIndex });
      const cell = worksheet[cellRef];
      if (cell) {
        cell.t = "s";
        cell.z = "@";
      }
    }
  }

  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 18 },
    { wch: 12 },
    { wch: 10 },
    { wch: 16 },
    { wch: 24 },
    { wch: 10 },
    { wch: 8 },
    { wch: 18 },
    { wch: 10 },
    { wch: 10 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "사전등록명단");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `${EVENT_EXPORT_LABEL}_사전등록명단_${dateStamp}.xlsx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="registrations.xlsx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
