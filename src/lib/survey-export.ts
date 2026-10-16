import "server-only";
import * as XLSX from "xlsx";
import type { SurveyResponse } from "@/lib/survey";
import { ORG_TYPE_LABELS, REGION_LABELS, FUTURE_FORMAT_LABELS } from "@/data/survey";
import { EVENT_EXPORT_LABEL } from "@/data/event";

function withEtc(label: string, isEtc: boolean, etc: string) {
  return isEtc && etc ? `${label}(${etc})` : label;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  });
}

/** 설문 응답을 엑셀 워크북(버퍼)으로 만든다. 관리자용/공개용 다운로드 라우트가 공유한다. */
export function buildSurveyWorkbook(responses: SurveyResponse[]): { buffer: Buffer; filename: string } {
  const rows = responses.map((r, i) => ({
    No: i + 1,
    소속기관유형: withEtc(ORG_TYPE_LABELS[r.orgType], r.orgType === "etc", r.orgTypeEtc),
    주요활동지역: withEtc(REGION_LABELS[r.region], r.region === "etc", r.regionEtc),
    "국가정책/현안 관련 질문·의견": r.policyQuestion,
    "소속기관·지역 우선 추진과제": r.priorityTask,
    향후선호운영방식: FUTURE_FORMAT_LABELS[r.futureFormat],
    "향후 추가로 다루었으면 하는 주제": r.additionalTopics,
    "운영 개선·보완 의견": r.operationFeedback,
    응답일시: formatDate(r.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 5 }, // No
    { wch: 22 }, // 소속기관유형
    { wch: 16 }, // 주요활동지역
    { wch: 40 },
    { wch: 40 },
    { wch: 26 },
    { wch: 40 },
    { wch: 40 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "설문응답");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `${EVENT_EXPORT_LABEL}_설문응답_${dateStamp}.xlsx`;

  return { buffer, filename };
}

export function surveyWorkbookResponse(responses: SurveyResponse[]): Response {
  const { buffer, filename } = buildSurveyWorkbook(responses);
  return new Response(buffer as BodyInit, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="survey.xlsx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
