export type ProjectCategory = "FILM" | "MOTION" | "LIVE" | "MEDIA";

export type Project = {
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  youtubeId: string;
  client: string;
  duration: string;
  role: string;
  description: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "전남대학교병원 112주년 PR",
    category: "FILM",
    categoryLabel: "Brand Film",
    year: "2022",
    youtubeId: "9k0PkHy7308",
    client: "전남대학교 병원",
    duration: "4:36",
    role: "Production Company",
    description:
      "112년의 역사와 지역거점병원으로서의 신뢰를 바탕으로, 미래형 스마트병원을 향한 전남대학교병원의 새로운 비전과 도약을 담아낸 기념 브랜드 필름.",
    featured: true,
  },
  {
    title: "광주은행 54주년 홍보영상",
    category: "FILM",
    categoryLabel: "Brand Film",
    year: "2022",
    youtubeId: "NxJiSvwaNkE",
    client: "광주은행",
    duration: "07:11",
    role: "Production Company",
    description:
      "창립 54주년을 맞은 광주은행의 역사와 지역과 함께 성장해온 시간을 중심으로, 신뢰와 미래 비전을 안정감 있는 서사와 이미지로 담아낸 브랜드 필름.",
    featured: true,
  },
  {
    title: "소통콘텐츠 공모전",
    category: "MOTION",
    categoryLabel: "Public Campaign",
    year: "2022",
    youtubeId: "2IJCe1VG0d4",
    client: "광주광역시",
    duration: "02:17",
    role: "Motion Graphics Production",
    description:
      "광주의 정체성과 시민 소통을 주제로, 핵심 메시지를 직관적인 그래픽과 리듬감 있는 모션으로 풀어낸 공공 캠페인 콘텐츠.",
    featured: true,
  },
  {
    title: "광주전남 지역혁신본부 홍보영상",
    category: "FILM",
    categoryLabel: "Institutional Film",
    year: "2022",
    youtubeId: "6SGuCjcOWEk",
    client: "광주전남지역사회혁신본부",
    duration: "00:47",
    role: "Production Company",
    description:
      "지역사회혁신본부의 역할과 지역문제 해결 비전을 다양한 활동 사례와 시각적 정보 설계로 풀어낸 기관 홍보 콘텐츠.",
    featured: true,
  },
  {
    title: "전남대학교병원 공공보건의료 협력체계 구축사업",
    category: "FILM",
    categoryLabel: "Public Information",
    year: "2021.10",
    youtubeId: "YoUi42Z_qSw",
    client: "전남대학교 병원",
    duration: "04:02",
    role: "Production Company",
    description:
      "퇴원 이후에도 의료와 복지가 이어지는 지역연계 과정을 이해하기 쉽게 구조화해 환자와 관계자에게 전달한 공공의료 안내 콘텐츠.",
    featured: true,
  },
  {
    title: "ACC 아시아문학포럼 하이라이트",
    category: "LIVE",
    categoryLabel: "Event Film",
    year: "2021",
    youtubeId: "0BDiKEoteuc",
    client: "국립아시아문화전당",
    duration: "04:52",
    role: "Event Production & Highlight Film",
    description:
      "아시아 각국 문학인들이 나눈 삶과 상처, 경계에 대한 담론을 현장의 표정과 주요 순간을 중심으로 재구성해 국제 문화행사의 의미와 분위기를 담아낸 하이라이트 필름.",
    featured: true,
  },
  {
    title: "Motion Graphic Design",
    category: "MOTION",
    categoryLabel: "Motion Design",
    year: "2024",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
  {
    title: "Performance Live",
    category: "LIVE",
    categoryLabel: "Live Production",
    year: "2024",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
  {
    title: "Media Experience",
    category: "MEDIA",
    categoryLabel: "Media Technology",
    year: "2023",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
  {
    title: "Product Launch Film",
    category: "FILM",
    categoryLabel: "Brand Film",
    year: "2023",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
  {
    title: "Title Sequence",
    category: "MOTION",
    categoryLabel: "Motion Design",
    year: "2023",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
  {
    title: "Conference Broadcasting",
    category: "LIVE",
    categoryLabel: "Live Production",
    year: "2022",
    youtubeId: "aqz-KE-bpKQ",
    client: "-",
    duration: "-",
    role: "Production Company",
    description: "프로젝트 설명 준비 중입니다.",
    featured: false,
  },
];
