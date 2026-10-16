export const SURVEY_TITLE = "2026년 지역필수의료 현장 의견수렴";
export const SURVEY_SUBTITLE = "2026년 전남권역책임의료기관 화순전남대학교병원 심포지엄";

export const SURVEY_INTRO_PARAGRAPHS = [
  "본 조사는 전남광주통합특별시의 지역완결적 필수의료체계 구축을 위해 지역 의료현장의 의견과 기관 간 협력 필요사항을 파악하고, 향후 공공보건의료 협력사업 및 차년도 심포지엄 운영 방향을 검토하기 위해 실시합니다.",
  "응답해 주신 의견은 지역 필수의료의 주요 현안과 향후 실행과제를 발굴하기 위한 기초자료로 활용됩니다.",
];

export const SURVEY_INTRO_FACTS = [
  { label: "조사대상", value: "2026년 심포지엄 참석자" },
  { label: "소요시간", value: "약 2~3분" },
  { label: "응답방식", value: "익명·자율 참여" },
  { label: "결과 활용", value: "현장 의견 분석, 협력과제 발굴, 차년도 운영계획 수립" },
];

export const SURVEY_INTRO_NOTICE =
  "성명과 연락처는 수집하지 않습니다. 자유서술 시 환자나 개인을 식별할 수 있는 정보는 기재하지 말아 주십시오.";

export const SURVEY_CLOSING_TITLE = "응답해 주셔서 감사합니다.";
export const SURVEY_CLOSING_BODY =
  "여러분의 소중한 의견은 지역 필수의료 현장의 어려움을 이해하고, 의료기관 간 협력방안과 향후 실행과제를 검토하는 데 참고하겠습니다.";
export const SURVEY_CLOSING_SIGNATURE = "전남권역책임의료기관 화순전남대학교병원";

export const ORG_TYPE_OPTIONS = [
  { value: "tertiary_general", label: "상급종합병원" },
  { value: "general_hospital", label: "종합병원·병원·요양병원" },
  { value: "regional_medical_center", label: "지방의료원" },
  { value: "clinic", label: "의원급 의료기관" },
  { value: "health_center", label: "보건소·보건의료원·보건지소·보건진료소" },
  { value: "government", label: "중앙·지방정부 및 공공기관" },
  { value: "academic", label: "학계·연구기관" },
  { value: "etc", label: "기타" },
] as const;

export const REGION_OPTIONS = [
  { value: "gwangju", label: "광주지역" },
  { value: "jeonnam", label: "전남지역" },
  { value: "gwangju_jeonnam", label: "광주·전남 전역" },
  { value: "etc", label: "기타 지역 또는 전국 단위" },
] as const;

export const FUTURE_FORMAT_OPTIONS = [
  { value: "regional_symposium", label: "올해와 같은 권역 단위 종합 심포지엄" },
  { value: "field_small_symposium", label: "필수의료 분야별 소규모 심포지엄·간담회" },
  { value: "practice_workshop", label: "실제 협력사례 중심의 실무 워크숍" },
  { value: "joint_discussion", label: "정책 담당자와 의료현장 간 공동토론회" },
  { value: "online_hybrid", label: "온라인을 병행한 정보공유 및 토론" },
  { value: "existing_council", label: "기존 실무협의체를 활용한 정기적 논의" },
  { value: "etc", label: "기타" },
] as const;

export type SurveyOrgType = (typeof ORG_TYPE_OPTIONS)[number]["value"];
export type SurveyRegion = (typeof REGION_OPTIONS)[number]["value"];
export type SurveyFutureFormat = (typeof FUTURE_FORMAT_OPTIONS)[number]["value"];

export const ORG_TYPE_LABELS: Record<SurveyOrgType, string> = Object.fromEntries(
  ORG_TYPE_OPTIONS.map((o) => [o.value, o.label])
) as Record<SurveyOrgType, string>;

export const REGION_LABELS: Record<SurveyRegion, string> = Object.fromEntries(
  REGION_OPTIONS.map((o) => [o.value, o.label])
) as Record<SurveyRegion, string>;

export const FUTURE_FORMAT_LABELS: Record<SurveyFutureFormat, string> = Object.fromEntries(
  FUTURE_FORMAT_OPTIONS.map((o) => [o.value, o.label])
) as Record<SurveyFutureFormat, string>;

export const FREE_TEXT_QUESTIONS = [
  {
    id: "policyQuestion",
    number: 3,
    label:
      "오늘 발표된 국가정책이나 필수의료 분야별 현안과 관련하여 궁금한 사항 또는 추가로 논의하고 싶은 내용이 있으십니까?",
    notes: [
      "국가 정책 및 제도, 국립대병원과 책임의료기관의 역할, 의료인력·시설 확충, 기관 간 진료협력 등과 관련된 질문이나 현장 의견을 자유롭게 작성해 주십시오.",
      "행사 중 접수된 질문은 패널토론에서 참고할 수 있으며, 시간 관계상 모든 질문에 답변하지 못할 수 있습니다.",
    ],
  },
  {
    id: "priorityTask",
    number: 4,
    label:
      "전남광주통합특별시의 지역완결적 필수의료체계 구축을 위해 소속기관 또는 지역에서 가장 먼저 개선하거나 공동으로 추진해야 할 과제는 무엇이라고 생각하십니까?",
    notes: [
      "실제 의료현장에서 경험하는 어려움, 개선이 필요한 제도, 의료기관 간 협력이 필요한 사항, 우선 실행과제 등을 자유롭게 작성해 주십시오.",
    ],
  },
  {
    id: "additionalTopics",
    number: 6,
    label:
      "향후 심포지엄이나 공공보건의료 협력사업에서 추가로 다루었으면 하는 주제나 논의과제가 있다면 자유롭게 작성해 주십시오.",
    notes: [
      "지역 필수의료 정책, 의료취약지 지원, 의료인력 확보, 진료협력 우수사례, 기관 간 공동사업 등 향후 논의가 필요하다고 생각하는 내용을 작성해 주십시오.",
    ],
  },
  {
    id: "operationFeedback",
    number: 7,
    label: "향후 심포지엄의 효율적인 운영을 위해 개선하거나 보완할 사항이 있다면 자유롭게 의견을 작성해 주십시오.",
    notes: [
      "행사 일정 및 진행시간, 발표·토론 구성, 행사장 시설과 접근성, 사전 안내 및 등록, 자료 제공 등 운영 전반에 관한 의견을 자유롭게 작성해 주십시오.",
    ],
  },
] as const;

export type FreeTextQuestionId = (typeof FREE_TEXT_QUESTIONS)[number]["id"];
