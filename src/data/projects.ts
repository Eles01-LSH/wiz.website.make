export const PROJECT_CATEGORIES = [
  { value: "brand-film", label: "Brand Film", description: "브랜드 이미지, 기업·기관 홍보영상" },
  { value: "corporate-film", label: "Corporate Film", description: "회사소개, 기관소개, 사업소개" },
  { value: "commercial", label: "Commercial", description: "광고, CF, 바이럴" },
  { value: "documentary", label: "Documentary", description: "다큐멘터리, 인터뷰 중심 콘텐츠" },
  { value: "live-production", label: "Live Production", description: "공연·행사·컨퍼런스 중계" },
  { value: "media-experience", label: "Media Experience", description: "LED, 미디어파사드, XR, 공간미디어" },
  { value: "campaign-sns", label: "Campaign & SNS", description: "캠페인, 숏폼, SNS 콘텐츠" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["value"];

export const PROJECT_ROLES = [
  { value: "full-production", label: "Full Production", description: "기획부터 촬영·후반까지 전체 제작" },
  { value: "film-production", label: "Film Production", description: "영상 제작 중심" },
  { value: "creative-direction", label: "Creative Direction", description: "콘셉트·비주얼 방향 중심" },
  { value: "motion-cg", label: "Motion & CG", description: "2D·3D 모션그래픽, CG, 합성 중심" },
  { value: "post-production", label: "Post Production", description: "편집·색보정·후반 중심" },
  { value: "live-broadcast", label: "Live Production", description: "현장 중계·스위칭·송출 중심" },
  { value: "media-production", label: "Media Production", description: "LED·공간미디어 콘텐츠 제작 중심" },
  { value: "content-production", label: "Content Production", description: "SNS·캠페인 콘텐츠 제작 중심" },
] as const;

export type ProjectRole = (typeof PROJECT_ROLES)[number]["value"];

export function getCategoryLabel(category: ProjectCategory | ""): string {
  return PROJECT_CATEGORIES.find((c) => c.value === category)?.label ?? "-";
}

export function getRoleLabel(role: ProjectRole | ""): string {
  return PROJECT_ROLES.find((r) => r.value === role)?.label ?? "-";
}

/** 연도가 높은(최신) 프로젝트가 위로 오도록 정렬한다. */
export function sortByYearDesc(list: Project[]): Project[] {
  return [...list].sort((a, b) => parseFloat(b.year) - parseFloat(a.year));
}

export type Project = {
  title: string;
  category: ProjectCategory | "";
  role: ProjectRole | "";
  year: string;
  youtubeId: string;
  client: string;
  duration: string;
  description: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "전남대학교병원 112주년 PR",
    category: "brand-film",
    role: "full-production",
    year: "2022",
    youtubeId: "9k0PkHy7308",
    client: "전남대학교 병원",
    duration: "4:36",
    description:
      "전남대학교병원의 112년 역사와 지역 거점 의료기관으로서의 가치를 담아, 과거의 축적된 신뢰와 미래 스마트병원의 비전을 하나의 흐름으로 연결한 브랜드 필름입니다. 의료현장의 사람과 공간, 그리고 새로운 병원의 미래 이미지를 통해 전남대학교병원이 걸어온 시간과 앞으로 나아갈 방향을 시각적으로 표현했습니다.",
    featured: true,
  },
  {
    title: "광주은행 54주년 홍보영상",
    category: "brand-film",
    role: "full-production",
    year: "2022",
    youtubeId: "NxJiSvwaNkE",
    client: "광주은행",
    duration: "07:11",
    description:
      "광주은행의 창립 54주년을 기념해, 지역과 함께 성장해온 시간과 앞으로의 100년 비전을 담아낸 브랜드 필름입니다. 지역민과 고객의 일상 속에서 함께해온 광주은행의 역할을 중심으로, 신뢰와 상생이라는 브랜드 가치를 현재와 미래의 이미지로 연결했습니다.",
    featured: true,
  },
  {
    title: "소통콘텐츠 공모전",
    category: "campaign-sns",
    role: "motion-cg",
    year: "2022",
    youtubeId: "2IJCe1VG0d4",
    client: "광주광역시",
    duration: "02:17",
    description:
      "MBTI라는 친숙한 키워드를 활용해 '광주다움'을 쉽고 직관적으로 전달한 공모전 프로모션 영상입니다. 공모 주제와 참여 정보를 그래픽과 모션 중심으로 구성해 짧은 시간 안에 메시지를 명확하게 전달하고, 시민의 관심과 참여를 유도하는 데 초점을 맞췄습니다.",
    featured: true,
  },
  {
    title: "광주전남 지역혁신본부 홍보영상",
    category: "corporate-film",
    role: "motion-cg",
    year: "2022",
    youtubeId: "6SGuCjcOWEk",
    client: "광주전남지역사회혁신본부",
    duration: "00:47",
    description:
      "지역사회와 기관을 연결하는 혁신 플랫폼의 역할을 중심으로, 주요 사업과 현장의 모습을 하나의 흐름으로 구성한 홍보영상입니다. 다양한 참여 주체와 사업 사례를 통해 지역사회혁신본부가 만들어가는 변화와 가치를 직관적으로 보여주고, 기관의 역할과 미래 방향성을 명확하게 전달했습니다.",
    featured: true,
  },
  {
    title: "전남대학교병원 공공보건의료 협력체계 구축사업",
    category: "brand-film",
    role: "full-production",
    year: "2021",
    youtubeId: "YoUi42Z_qSw",
    client: "전남대학교 병원",
    duration: "04:02",
    description:
      "지역 필수의료 문제를 해결하기 위해 전남대학교병원이 추진하는 공공보건의료 협력체계 구축사업을 소개한 영상입니다. 퇴원환자 지역사회 연계, 중증응급 이송·전원, 감염 및 환자안전관리 등 주요 사업을 중심으로 의료기관과 지역사회가 연결되는 협력체계의 역할과 필요성을 이해하기 쉽게 구성했습니다.",
    featured: true,
  },
  {
    title: "ACC 아시아문학포럼 하이라이트",
    category: "live-production",
    role: "live-broadcast",
    year: "2021",
    youtubeId: "0BDiKEoteuc",
    client: "국립아시아문화전당",
    duration: "04:52",
    description:
      "아시아문학페스티벌의 주요 프로그램을 실시간 중계하고, 현장의 핵심 장면을 중심으로 재구성한 하이라이트 영상입니다. 행사 진행과 무대, 출연자, 관객의 반응을 안정적인 멀티카메라 중계 시스템으로 기록하고, 주요 순간을 압축해 페스티벌의 흐름과 현장감을 효과적으로 전달했습니다.",
    featured: true,
  },
  {
    title: "중앙전파관리소 애니메이션 홍보영상",
    category: "corporate-film",
    role: "motion-cg",
    year: "2019",
    youtubeId: "MTZY7U-JhWA",
    client: "중앙전파관리소",
    duration: "06:27",
    description:
      "중앙전파관리소의 역할과 주요 업무를 보다 쉽고 친근하게 전달하기 위해 제작한 애니메이션 홍보영상입니다. 복잡할 수 있는 전파 관리와 관련 제도를 캐릭터와 그래픽, 모션을 활용해 직관적으로 구성하고, 기관의 기능과 공공적 역할을 누구나 쉽게 이해할 수 있도록 표현했습니다.",
    featured: false,
  },
  {
    title: "목포 관광수용태세",
    category: "corporate-film",
    role: "motion-cg",
    year: "2020",
    youtubeId: "HhS2J8T_MG4",
    client: "목포시",
    duration: "01:49",
    description:
      "목포를 찾는 관광객에게 보다 나은 여행 경험을 제공하기 위한 관광수용태세의 중요성을 전달한 홍보영상입니다. 관광 서비스와 편의환경, 친절·위생·안전 등 관광객을 맞이하는 다양한 요소를 중심으로, 지역 관광의 경쟁력을 높이기 위한 변화와 실천의 메시지를 이해하기 쉽게 구성했습니다.",
    featured: false,
  },
  {
    title: "신안대파 김장축제 하이라이트",
    category: "live-production",
    role: "live-broadcast",
    year: "2020",
    youtubeId: "JqUbscNGhSE",
    client: "신안군",
    duration: "01:17",
    description:
      "신안 대파의 우수성과 지역 농산물의 가치를 알리기 위해 진행된 온라인 김장축제를 실시간 중계한 라이브 프로덕션입니다. 행사 진행과 체험 프로그램, 출연자와 현장의 주요 장면을 멀티카메라 구성으로 전달해 온라인에서도 축제의 분위기와 현장감을 느낄 수 있도록 제작했습니다.",
    featured: false,
  },
  {
    title: "정율성과 쇼스타코비치 하이라이트",
    category: "live-production",
    role: "live-broadcast",
    year: "2020",
    youtubeId: "5MYwEu8dE3o",
    client: "광주문화재단",
    duration: "03:20",
    description:
      "정율성과 쇼스타코비치를 주제로 한 공연 프로그램을 멀티카메라 중계로 기록하고, 무대의 흐름과 연주자의 움직임, 관객이 느끼는 현장감을 안정적으로 전달한 라이브 프로덕션입니다. 공연의 음악적 분위기와 무대 연출을 살리면서 주요 장면을 효과적으로 구성해 현장의 몰입감을 영상으로 담았습니다.",
    featured: false,
  },
  {
    title: "5.18 진실과 거짓",
    category: "campaign-sns",
    role: "full-production",
    year: "2021",
    youtubeId: "_OzHoW4v22w",
    client: "광주광역시",
    duration: "04:39",
    description:
      "5·18민주화운동을 둘러싼 역사왜곡과 허위정보에 대응하기 위해 제작한 공익 캠페인 영상입니다. '진실과 거짓'이라는 명확한 대비 구조를 통해 왜곡된 주장과 역사적 사실을 구분하고, 시청자가 5·18의 의미와 진실을 쉽게 이해할 수 있도록 구성했습니다.",
    featured: false,
  },
  {
    title: "국제차문화전시회 홍보",
    category: "commercial",
    role: "full-production",
    year: "2022",
    youtubeId: "hQcFfMneBwI",
    client: "김대중컨벤션센터",
    duration: "00:20",
    description:
      "국제차문화전시회의 핵심 이미지와 행사 분위기를 20초 안에 압축해 전달한 프로모션 영상입니다. 짧은 러닝타임 안에서 전시회의 정체성과 주요 볼거리를 빠르게 인지할 수 있도록 구성하고, 리듬감 있는 편집과 시각적 임팩트를 통해 행사에 대한 관심과 방문을 유도했습니다.",
    featured: false,
  },
];
