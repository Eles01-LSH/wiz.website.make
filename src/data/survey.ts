export const ORG_TYPE_OPTIONS = [
  { value: "administration", label: "행정기관" },
  { value: "health_center", label: "보건기관(보건소·보건지소 등)" },
  { value: "medical_institution", label: "의료기관" },
  { value: "designated_center", label: "정부·지자체 지정센터/지원조직" },
  { value: "academic", label: "대학·연구기관" },
  { value: "etc", label: "기타" },
] as const;

export const JOB_TYPE_OPTIONS = [
  { value: "doctor", label: "의사" },
  { value: "nurse", label: "간호사" },
  { value: "social_worker", label: "사회복지사" },
  { value: "admin", label: "행정직" },
  { value: "health_tech", label: "보건직/의료기사 등" },
  { value: "research_education", label: "연구·교육직" },
  { value: "etc", label: "기타" },
] as const;

export type SurveyOrgType = (typeof ORG_TYPE_OPTIONS)[number]["value"];
export type SurveyJobType = (typeof JOB_TYPE_OPTIONS)[number]["value"];

/** 5점 척도. 점수는 1~5, 라벨 표시 순서는 설문지 표기 순서(①~⑤)를 따른다. */
export const SATISFACTION_SCALE = [
  { value: 5, label: "매우 만족" },
  { value: 4, label: "만족" },
  { value: 3, label: "보통" },
  { value: 2, label: "불만족" },
  { value: 1, label: "매우 불만족" },
] as const;

export const AGREEMENT_SCALE = [
  { value: 5, label: "매우 그렇다" },
  { value: 4, label: "그렇다" },
  { value: 3, label: "보통" },
  { value: 2, label: "그렇지 않다" },
  { value: 1, label: "전혀 그렇지 않다" },
] as const;

export type ScaleQuestionId =
  | "overall"
  | "relevance"
  | "policyUnderstanding"
  | "fieldPresentation"
  | "panelDiscussion"
  | "operation";

export const SYMPOSIUM_QUESTIONS: {
  id: ScaleQuestionId;
  label: string;
  scale: "satisfaction" | "agreement";
}[] = [
  {
    id: "overall",
    label: "심포지엄의 전반적인 만족도에 대해 평가해 주십시오.",
    scale: "satisfaction",
  },
  {
    id: "relevance",
    label:
      "이번 심포지엄의 주제와 내용은 필수의료 및 공공보건의료 관련 업무에 필요한 내용이었습니까?",
    scale: "agreement",
  },
  {
    id: "policyUnderstanding",
    label:
      "이번 심포지엄을 통해 지역완결적 필수의료체계의 정책 방향과 현안을 이해하는 데 도움이 되었습니까?",
    scale: "agreement",
  },
  {
    id: "fieldPresentation",
    label:
      "분야별 발표가 광주·전남 필수의료의 현황과 발전방향을 이해하는 데 도움이 되었습니까?",
    scale: "agreement",
  },
  {
    id: "panelDiscussion",
    label:
      "패널 토론이 지역 내 기관 간 협력과 필수의료 발전방향을 생각하는 데 도움이 되었습니까?",
    scale: "agreement",
  },
  {
    id: "operation",
    label: "행사 운영(진행, 시간 구성, 장소 및 안내 등)은 전반적으로 적절하였습니까?",
    scale: "agreement",
  },
];

/** Q9. 프로그램별 만족도(행렬형) — 순서 고정, 8개 항목. */
export const PROGRAM_ITEMS: { title: string; presenter: string }[] = [
  {
    title: "지역 필수의료 강화를 위한 국가 정책방향",
    presenter: "신지명 보건복지부 지역필수의료총괄과장",
  },
  {
    title: "3차 공공보건의료 기본계획 방향",
    presenter: "유원섭 국립중앙의료원 공공보건의료본부장",
  },
  {
    title: "[응급·중증 분야] 초광역단위 중증응급의료체계 구축을 위한 전략",
    presenter: "조용수 전남대학교병원 광주응급의료지원단장",
  },
  {
    title: "[암 분야] 지역완결적 암 치료 인프라 구축, 현황과 미래",
    presenter: "정승일 화순전남대학교병원 기획조정실장",
  },
  {
    title: "[심뇌혈관 분야] 심뇌혈관센터 중심 신속대응체계의 발전방향",
    presenter: "안준호 전남대학교병원 순환기내과 교수",
  },
  {
    title: "[분만·모성 분야] 지역완결적 모자의료 안전망 구축을 위한 실행과제",
    presenter: "김종운 전남대학교병원 권역모자의료센터장",
  },
  {
    title: "[일차의료 분야] 보건기관 기능개편을 통한 일차의료 공백 해소",
    presenter: "김진환 경희의대 예방의학교실 교수",
  },
  {
    title: "패널 토론: 함께 만드는 광주·전남 필수의료의 미래",
    presenter: "",
  },
];

export const WILLINGNESS_QUESTION =
  "향후 유사한 공공보건의료·필수의료 심포지엄이 개최될 경우 참여할 의향이 있습니까?";

export const FREE_TEXT_QUESTIONS = [
  {
    id: "topicRequest",
    label: "향후 심포지엄에서 더 다루었으면 하는 주제나 분야가 있다면 작성해 주십시오.",
  },
  {
    id: "mostHelpful",
    label: "이번 심포지엄에서 가장 도움이 되었던 내용 또는 인상 깊었던 점을 작성해 주십시오.",
  },
  {
    id: "improvement",
    label: "심포지엄 운영과 관련하여 개선이 필요한 점이나 기타 건의사항을 자유롭게 작성해 주십시오.",
  },
] as const;

export const ORG_TYPE_LABELS: Record<SurveyOrgType, string> = Object.fromEntries(
  ORG_TYPE_OPTIONS.map((o) => [o.value, o.label])
) as Record<SurveyOrgType, string>;

export const JOB_TYPE_LABELS: Record<SurveyJobType, string> = Object.fromEntries(
  JOB_TYPE_OPTIONS.map((o) => [o.value, o.label])
) as Record<SurveyJobType, string>;
