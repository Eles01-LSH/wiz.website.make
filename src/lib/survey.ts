import "server-only";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SurveyOrgType, SurveyRegion, SurveyFutureFormat } from "@/data/survey";

export type SurveyResponse = {
  id: string;
  orgType: SurveyOrgType;
  region: SurveyRegion;
  policyQuestion: string;
  priorityTask: string;
  futureFormat: SurveyFutureFormat;
  additionalTopics: string;
  operationFeedback: string;
  createdAt: string;
};

export type SurveyResponseInput = {
  orgType: SurveyOrgType;
  region: SurveyRegion;
  policyQuestion?: string;
  priorityTask?: string;
  futureFormat: SurveyFutureFormat;
  additionalTopics?: string;
  operationFeedback?: string;
};

type SurveyResponseRow = {
  id: string;
  org_type: SurveyOrgType;
  region: SurveyRegion;
  policy_question: string;
  priority_task: string;
  future_format: SurveyFutureFormat;
  additional_topics: string;
  operation_feedback: string;
  created_at: string;
};

const SELECT_COLUMNS =
  "id, org_type, region, policy_question, priority_task, future_format, additional_topics, operation_feedback, created_at";

function toSurveyResponse(row: SurveyResponseRow): SurveyResponse {
  return {
    id: row.id,
    orgType: row.org_type,
    region: row.region,
    policyQuestion: row.policy_question,
    priorityTask: row.priority_task,
    futureFormat: row.future_format,
    additionalTopics: row.additional_topics,
    operationFeedback: row.operation_feedback,
    createdAt: row.created_at,
  };
}

/** 관리자 세션(RLS: is_admin())으로만 성공한다. */
export async function getSurveyResponses(): Promise<SurveyResponse[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("survey_responses")
    .select(SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as SurveyResponseRow[]).map(toSurveyResponse);
}

/**
 * 로그인 없이 접근 가능한 공개 결과 페이지(/survey-results)에서 호출.
 * 관리자 세션이 없어 RLS(is_admin())를 통과할 수 없으므로, RLS를 우회하는
 * service-role 클라이언트로 조회한다.
 */
export async function getSurveyResponsesPublic(): Promise<SurveyResponse[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("survey_responses")
    .select(SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as SurveyResponseRow[]).map(toSurveyResponse);
}

/**
 * 공개 설문 폼에서 호출. 익명 제출자는 SELECT 권한이 없으므로
 * id를 미리 생성해 넣은 뒤 입력값 그대로 조합해 반환한다.
 */
export async function addSurveyResponse(input: SurveyResponseInput): Promise<SurveyResponse> {
  const supabase = await createClient();

  const id = randomUUID();
  const row = {
    id,
    org_type: input.orgType,
    region: input.region,
    policy_question: input.policyQuestion?.trim() ?? "",
    priority_task: input.priorityTask?.trim() ?? "",
    future_format: input.futureFormat,
    additional_topics: input.additionalTopics?.trim() ?? "",
    operation_feedback: input.operationFeedback?.trim() ?? "",
  };

  const { error } = await supabase.from("survey_responses").insert(row);
  if (error) throw new Error(error.message);

  return {
    id,
    orgType: row.org_type,
    region: row.region,
    policyQuestion: row.policy_question,
    priorityTask: row.priority_task,
    futureFormat: row.future_format,
    additionalTopics: row.additional_topics,
    operationFeedback: row.operation_feedback,
    createdAt: new Date().toISOString(),
  };
}
