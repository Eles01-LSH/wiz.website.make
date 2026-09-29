import "server-only";
import * as XLSX from "xlsx";
import type { SurveyResponse } from "@/lib/survey";
import { ORG_TYPE_LABELS, JOB_TYPE_LABELS, PROGRAM_SHORT_LABELS } from "@/data/survey";
import { EVENT_EXPORT_LABEL } from "@/data/event";

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

function orgTypeLabel(orgType: keyof typeof ORG_TYPE_LABELS, etc: string) {
  const label = ORG_TYPE_LABELS[orgType];
  return orgType === "etc" && etc ? `${label}(${etc})` : label;
}

function jobTypeLabel(jobType: keyof typeof JOB_TYPE_LABELS, etc: string) {
  const label = JOB_TYPE_LABELS[jobType];
  return jobType === "etc" && etc ? `${label}(${etc})` : label;
}

/** 설문 응답을 엑셀 워크북(버퍼)으로 만든다. 관리자용/공개용 다운로드 라우트가 공유한다. */
export function buildSurveyWorkbook(responses: SurveyResponse[]): { buffer: Buffer; filename: string } {
  const rows = responses.map((r, i) => ({
    No: i + 1,
    근무기관: orgTypeLabel(r.orgType, r.orgTypeEtc),
    직종: jobTypeLabel(r.jobType, r.jobTypeEtc),
    "전반적 만족도": r.overallScore,
    "주제/내용 필요성": r.relevanceScore,
    "정책방향 이해도움": r.policyUnderstandingScore,
    "분야별발표 이해도움": r.fieldPresentationScore,
    "패널토론 도움": r.panelDiscussionScore,
    "행사운영 적절성": r.operationScore,
    [PROGRAM_SHORT_LABELS[0]]: r.programScores[0],
    [PROGRAM_SHORT_LABELS[1]]: r.programScores[1],
    [PROGRAM_SHORT_LABELS[2]]: r.programScores[2],
    [PROGRAM_SHORT_LABELS[3]]: r.programScores[3],
    [PROGRAM_SHORT_LABELS[4]]: r.programScores[4],
    [PROGRAM_SHORT_LABELS[5]]: r.programScores[5],
    [PROGRAM_SHORT_LABELS[6]]: r.programScores[6],
    [PROGRAM_SHORT_LABELS[7]]: r.programScores[7],
    "향후 참여의향": r.willingnessScore,
    "더 다뤘으면 하는 주제": r.topicRequest,
    "가장 도움된 점": r.mostHelpful,
    "개선 필요한 점": r.improvement,
    응답일시: formatDate(r.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 5 }, // No
    { wch: 20 }, // 근무기관
    { wch: 16 }, // 직종
    { wch: 10 },
    { wch: 12 },
    { wch: 14 },
    { wch: 14 },
    { wch: 12 },
    { wch: 12 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 12 },
    { wch: 12 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
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
