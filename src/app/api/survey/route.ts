import { NextResponse } from "next/server";
import { addSurveyResponse } from "@/lib/survey";
import {
  ORG_TYPE_OPTIONS,
  REGION_OPTIONS,
  FUTURE_FORMAT_OPTIONS,
  type SurveyOrgType,
  type SurveyRegion,
  type SurveyFutureFormat,
} from "@/data/survey";

const ORG_TYPE_VALUES: SurveyOrgType[] = ORG_TYPE_OPTIONS.map((o) => o.value);
const REGION_VALUES: SurveyRegion[] = REGION_OPTIONS.map((o) => o.value);
const FUTURE_FORMAT_VALUES: SurveyFutureFormat[] = FUTURE_FORMAT_OPTIONS.map((o) => o.value);

type SurveyBody = {
  orgType?: unknown;
  region?: unknown;
  policyQuestion?: unknown;
  priorityTask?: unknown;
  futureFormat?: unknown;
  additionalTopics?: unknown;
  operationFeedback?: unknown;
};

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
  const region = asTrimmedString(body.region);
  const futureFormat = asTrimmedString(body.futureFormat);

  if (!ORG_TYPE_VALUES.includes(orgType as SurveyOrgType)) {
    return NextResponse.json({ error: "소속기관 유형을 선택해 주세요." }, { status: 400 });
  }
  if (!REGION_VALUES.includes(region as SurveyRegion)) {
    return NextResponse.json({ error: "주요 활동지역을 선택해 주세요." }, { status: 400 });
  }
  if (!FUTURE_FORMAT_VALUES.includes(futureFormat as SurveyFutureFormat)) {
    return NextResponse.json(
      { error: "향후 운영방식을 선택해 주세요." },
      { status: 400 }
    );
  }

  const policyQuestion = asTrimmedString(body.policyQuestion).slice(0, 1000);
  const priorityTask = asTrimmedString(body.priorityTask).slice(0, 1000);
  const additionalTopics = asTrimmedString(body.additionalTopics).slice(0, 1000);
  const operationFeedback = asTrimmedString(body.operationFeedback).slice(0, 1000);

  try {
    await addSurveyResponse({
      orgType: orgType as SurveyOrgType,
      region: region as SurveyRegion,
      futureFormat: futureFormat as SurveyFutureFormat,
      policyQuestion,
      priorityTask,
      additionalTopics,
      operationFeedback,
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
