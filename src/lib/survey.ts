import "server-only";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import type { SurveyOrgType, SurveyJobType } from "@/data/survey";

export type SurveyResponse = {
  id: string;
  orgType: SurveyOrgType;
  orgTypeEtc: string;
  jobType: SurveyJobType;
  jobTypeEtc: string;
  overallScore: number;
  relevanceScore: number;
  policyUnderstandingScore: number;
  fieldPresentationScore: number;
  panelDiscussionScore: number;
  operationScore: number;
  programScores: number[];
  willingnessScore: number;
  topicRequest: string;
  mostHelpful: string;
  improvement: string;
  createdAt: string;
};

export type SurveyResponseInput = {
  orgType: SurveyOrgType;
  orgTypeEtc?: string;
  jobType: SurveyJobType;
  jobTypeEtc?: string;
  overallScore: number;
  relevanceScore: number;
  policyUnderstandingScore: number;
  fieldPresentationScore: number;
  panelDiscussionScore: number;
  operationScore: number;
  programScores: number[];
  willingnessScore: number;
  topicRequest?: string;
  mostHelpful?: string;
  improvement?: string;
};

type SurveyResponseRow = {
  id: string;
  org_type: SurveyOrgType;
  org_type_etc: string;
  job_type: SurveyJobType;
  job_type_etc: string;
  overall_score: number;
  relevance_score: number;
  policy_understanding_score: number;
  field_presentation_score: number;
  panel_discussion_score: number;
  operation_score: number;
  program_scores: number[];
  willingness_score: number;
  topic_request: string;
  most_helpful: string;
  improvement: string;
  created_at: string;
};

const SELECT_COLUMNS =
  "id, org_type, org_type_etc, job_type, job_type_etc, overall_score, relevance_score, policy_understanding_score, field_presentation_score, panel_discussion_score, operation_score, program_scores, willingness_score, topic_request, most_helpful, improvement, created_at";

function toSurveyResponse(row: SurveyResponseRow): SurveyResponse {
  return {
    id: row.id,
    orgType: row.org_type,
    orgTypeEtc: row.org_type_etc,
    jobType: row.job_type,
    jobTypeEtc: row.job_type_etc,
    overallScore: row.overall_score,
    relevanceScore: row.relevance_score,
    policyUnderstandingScore: row.policy_understanding_score,
    fieldPresentationScore: row.field_presentation_score,
    panelDiscussionScore: row.panel_discussion_score,
    operationScore: row.operation_score,
    programScores: row.program_scores,
    willingnessScore: row.willingness_score,
    topicRequest: row.topic_request,
    mostHelpful: row.most_helpful,
    improvement: row.improvement,
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
 * 공개 설문 폼에서 호출. 익명 제출자는 SELECT 권한이 없으므로
 * (registrations.ts의 addRegistration과 동일한 이유로) id를 미리 생성해
 * 넣은 뒤 입력값 그대로 조합해 반환한다.
 */
export async function addSurveyResponse(input: SurveyResponseInput): Promise<SurveyResponse> {
  const supabase = await createClient();

  const id = randomUUID();
  const row = {
    id,
    org_type: input.orgType,
    org_type_etc: input.orgTypeEtc?.trim() ?? "",
    job_type: input.jobType,
    job_type_etc: input.jobTypeEtc?.trim() ?? "",
    overall_score: input.overallScore,
    relevance_score: input.relevanceScore,
    policy_understanding_score: input.policyUnderstandingScore,
    field_presentation_score: input.fieldPresentationScore,
    panel_discussion_score: input.panelDiscussionScore,
    operation_score: input.operationScore,
    program_scores: input.programScores,
    willingness_score: input.willingnessScore,
    topic_request: input.topicRequest?.trim() ?? "",
    most_helpful: input.mostHelpful?.trim() ?? "",
    improvement: input.improvement?.trim() ?? "",
  };

  const { error } = await supabase.from("survey_responses").insert(row);
  if (error) throw new Error(error.message);

  return {
    id,
    orgType: row.org_type,
    orgTypeEtc: row.org_type_etc,
    jobType: row.job_type,
    jobTypeEtc: row.job_type_etc,
    overallScore: row.overall_score,
    relevanceScore: row.relevance_score,
    policyUnderstandingScore: row.policy_understanding_score,
    fieldPresentationScore: row.field_presentation_score,
    panelDiscussionScore: row.panel_discussion_score,
    operationScore: row.operation_score,
    programScores: row.program_scores,
    willingnessScore: row.willingness_score,
    topicRequest: row.topic_request,
    mostHelpful: row.most_helpful,
    improvement: row.improvement,
    createdAt: new Date().toISOString(),
  };
}
