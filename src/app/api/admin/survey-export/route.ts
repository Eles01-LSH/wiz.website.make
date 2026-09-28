import * as XLSX from "xlsx";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { getSurveyResponses } from "@/lib/survey";
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

export async function GET() {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  let responses;
  try {
    responses = await getSurveyResponses();
  } catch {
    return NextResponse.json(
      { error: "설문 응답을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

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

  const legendRows = [
    { 번호: "①", 발표: "지역 필수의료 강화를 위한 국가 정책방향", 발표자: "신지명 보건복지부 지역필수의료총괄과장" },
    { 번호: "②", 발표: "3차 공공보건의료 기본계획 방향", 발표자: "유원섭 국립중앙의료원 공공보건의료본부장" },
    { 번호: "③", 발표: "[응급·중증 분야] 초광역단위 중증응급의료체계 구축을 위한 전략", 발표자: "조용수 전남대학교병원 광주응급의료지원단장" },
    { 번호: "④", 발표: "[암 분야] 지역완결적 암 치료 인프라 구축, 현황과 미래", 발표자: "정승일 화순전남대학교병원 기획조정실장" },
    { 번호: "⑤", 발표: "[심뇌혈관 분야] 심뇌혈관센터 중심 신속대응체계의 발전방향", 발표자: "안준호 전남대학교병원 순환기내과 교수" },
    { 번호: "⑥", 발표: "[분만·모성 분야] 지역완결적 모자의료 안전망 구축을 위한 실행과제", 발표자: "김종운 전남대학교병원 권역모자의료센터장" },
    { 번호: "⑦", 발표: "[일차의료 분야] 보건기관 기능개편을 통한 일차의료 공백 해소", 발표자: "김진환 경희의대 예방의학교실 교수" },
    { 번호: "⑧", 발표: "패널 토론: 함께 만드는 광주·전남 필수의료의 미래", 발표자: "" },
  ];
  const legendSheet = XLSX.utils.json_to_sheet(legendRows);
  legendSheet["!cols"] = [{ wch: 4 }, { wch: 50 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(workbook, legendSheet, "프로그램목록");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `${EVENT_EXPORT_LABEL}_설문응답_${dateStamp}.xlsx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="survey.xlsx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
