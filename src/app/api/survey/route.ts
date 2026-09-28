import { NextResponse } from "next/server";
import { addSurveyResponse } from "@/lib/survey";
import {
  ORG_TYPE_OPTIONS,
  JOB_TYPE_OPTIONS,
  type SurveyOrgType,
  type SurveyJobType,
} from "@/data/survey";

const ORG_TYPE_VALUES: SurveyOrgType[] = ORG_TYPE_OPTIONS.map((o) => o.value);
const JOB_TYPE_VALUES: SurveyJobType[] = JOB_TYPE_OPTIONS.map((o) => o.value);

type SurveyBody = {
  orgType?: unknown;
  orgTypeEtc?: unknown;
  jobType?: unknown;
  jobTypeEtc?: unknown;
  overallScore?: unknown;
  relevanceScore?: unknown;
  policyUnderstandingScore?: unknown;
  fieldPresentationScore?: unknown;
  panelDiscussionScore?: unknown;
  operationScore?: unknown;
  programScores?: unknown;
  willingnessScore?: unknown;
  topicRequest?: unknown;
  mostHelpful?: unknown;
  improvement?: unknown;
};

function asScore(value: unknown): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: SurveyBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const orgType = asTrimmedString(body.orgType);
  const jobType = asTrimmedString(body.jobType);
  const orgTypeEtc = asTrimmedString(body.orgTypeEtc).slice(0, 200);
  const jobTypeEtc = asTrimmedString(body.jobTypeEtc).slice(0, 200);

  if (!ORG_TYPE_VALUES.includes(orgType as SurveyOrgType)) {
    return NextResponse.json({ error: "근무 기관을 선택해 주세요." }, { status: 400 });
  }
  if (orgType === "etc" && !orgTypeEtc) {
    return NextResponse.json({ error: "근무 기관을 직접 입력해 주세요." }, { status: 400 });
  }
  if (!JOB_TYPE_VALUES.includes(jobType as SurveyJobType)) {
    return NextResponse.json({ error: "직종을 선택해 주세요." }, { status: 400 });
  }
  if (jobType === "etc" && !jobTypeEtc) {
    return NextResponse.json({ error: "직종을 직접 입력해 주세요." }, { status: 400 });
  }

  const overallScore = asScore(body.overallScore);
  const relevanceScore = asScore(body.relevanceScore);
  const policyUnderstandingScore = asScore(body.policyUnderstandingScore);
  const fieldPresentationScore = asScore(body.fieldPresentationScore);
  const panelDiscussionScore = asScore(body.panelDiscussionScore);
  const operationScore = asScore(body.operationScore);
  const willingnessScore = asScore(body.willingnessScore);

  if (
    !overallScore ||
    !relevanceScore ||
    !policyUnderstandingScore ||
    !fieldPresentationScore ||
    !panelDiscussionScore ||
    !operationScore ||
    !willingnessScore
  ) {
    return NextResponse.json(
      { error: "모든 만족도 항목에 응답해 주세요." },
      { status: 400 }
    );
  }

  const rawProgramScores = Array.isArray(body.programScores) ? body.programScores : [];
  const programScores = rawProgramScores.map(asScore);
  if (programScores.length !== 8 || programScores.some((s) => s === null)) {
    return NextResponse.json(
      { error: "프로그램별 만족도 8개 항목에 모두 응답해 주세요." },
      { status: 400 }
    );
  }

  const topicRequest = asTrimmedString(body.topicRequest).slice(0, 1000);
  const mostHelpful = asTrimmedString(body.mostHelpful).slice(0, 1000);
  const improvement = asTrimmedString(body.improvement).slice(0, 1000);

  try {
    await addSurveyResponse({
      orgType: orgType as SurveyOrgType,
      orgTypeEtc,
      jobType: jobType as SurveyJobType,
      jobTypeEtc,
      overallScore,
      relevanceScore,
      policyUnderstandingScore,
      fieldPresentationScore,
      panelDiscussionScore,
      operationScore,
      programScores: programScores as number[],
      willingnessScore,
      topicRequest,
      mostHelpful,
      improvement,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("survey submit failed:", err);
    return NextResponse.json(
      { error: "제출 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
