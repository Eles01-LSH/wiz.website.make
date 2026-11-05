import type { ComponentType } from "react";
import {
  LoopIcon,
  SlidersIcon,
  ClapperboardIcon,
  ShieldCheckIcon,
} from "@/components/icons";

type Icon = ComponentType<{ className?: string }>;

export const STUDIO_HERO = {
  title: "HORIZON STUDIO",
  subCopy: "경계 없는 공간, 무한한 가능성.",
  description: [
    "위즈씨엔아이의 새로운 호리존 스튜디오.",
    "광고, 인터뷰, 브랜드 영상부터 다양한 디지털 콘텐츠까지.",
    "창의적인 아이디어를 영상으로 완성하는 전문 촬영 공간입니다.",
  ],
  // 실제 스튜디오 전경 사진이 준비되면 이 경로를 채워주세요 (예: "/studio/hero.jpg").
  image: null as string | null,
};

export type StudioFeature = { icon: Icon; title: string; desc: string };

export const STUDIO_FEATURES: StudioFeature[] = [
  { icon: LoopIcon, title: "SEAMLESS BACKGROUND", desc: "경계가 없는 자연스러운 배경" },
  { icon: SlidersIcon, title: "FLEXIBLE LIGHTING", desc: "목적에 맞는 다양한 조명 연출" },
  { icon: ClapperboardIcon, title: "CREATIVE PRODUCTION", desc: "폭넓은 영상 콘텐츠 제작" },
  { icon: ShieldCheckIcon, title: "PROFESSIONAL WORKFLOW", desc: "전문 촬영 제작 서비스와 연계" },
];

/**
 * Section 03 — 공간 제원/장비 정보. value가 빈 문자열이면 화면에 표시되지 않는다.
 * 확정되는 대로 값만 채우면 된다(수치·장비를 임의로 추정해 넣지 않음).
 */
export type StudioSpecItem = { label: string; value: string };

export const STUDIO_SPECS: StudioSpecItem[] = [
  { label: "호리존 가로 폭", value: "" },
  { label: "호리존 깊이", value: "" },
  { label: "호리존 높이", value: "" },
  { label: "전체 스튜디오 면적", value: "" },
  { label: "조명 및 촬영 장비", value: "" },
  { label: "편의시설", value: "" },
  { label: "주차 및 접근성", value: "" },
];

/** 모든 STUDIO_SPECS 값이 비어 있을 때 Section 03에 보여줄 안내 문구. */
export const STUDIO_SPECS_PENDING_NOTICE = "공간 제원 및 보유 장비 정보는 확정 후 업데이트됩니다.";

export type StudioGalleryImage = { src: string | null; alt: string };

/**
 * Section 03 갤러리. src가 null이면 플레이스홀더로 표시되고,
 * 실제 사진 경로를 넣으면 자동으로 실사진으로 바뀐다.
 */
export const STUDIO_GALLERY: StudioGalleryImage[] = [
  { src: null, alt: "호리존 스튜디오 전체 전경" },
  { src: null, alt: "호리존 정면" },
  { src: null, alt: "측면 및 공간 구조" },
  { src: null, alt: "조명 및 촬영 장비" },
  { src: null, alt: "실제 촬영 현장" },
];

export type StudioProductionCategory = {
  index: string;
  title: string;
  desc: string;
  image: string | null;
};

export const STUDIO_PRODUCTION: StudioProductionCategory[] = [
  { index: "01", title: "COMMERCIAL & PRODUCT", desc: "광고 및 제품 촬영", image: null },
  { index: "02", title: "INTERVIEW & CORPORATE", desc: "인터뷰 및 기업 홍보영상", image: null },
  { index: "03", title: "PORTRAIT & PROFILE", desc: "프로필 및 인물 촬영", image: null },
  { index: "04", title: "DIGITAL CONTENT", desc: "유튜브 및 SNS 콘텐츠", image: null },
];

export type StudioService = {
  index: string;
  title: string;
  englishTitle: string;
  desc: string;
  items: string[];
};

/**
 * 대관/제작 서비스 — 운영 방식이 확정되기 전까지 "제안 단계"로 둔다.
 * 특정 서비스를 숨기고 싶으면 배열에서 빼면 된다.
 */
export const STUDIO_SERVICES: StudioService[] = [
  {
    index: "01",
    title: "STUDIO RENTAL",
    englishTitle: "공간 대관 서비스",
    desc: "고객이 직접 촬영 장비와 인력을 준비하여 호리존 스튜디오를 이용하는 방식입니다.",
    items: ["호리존 스튜디오 공간 이용", "촬영 목적에 따른 공간 활용", "이용 일정 및 조건 사전 협의"],
  },
  {
    index: "02",
    title: "PRODUCTION SERVICE",
    englishTitle: "전문 촬영 제작 서비스",
    desc: "위즈씨엔아이의 영상 제작 경험과 전문 인력을 활용하여 촬영부터 후반 제작까지 연계하는 방식입니다.",
    items: ["촬영 기획 및 진행", "전문 촬영 인력 지원", "촬영 장비 활용 협의", "편집 및 후반 제작 연계"],
  },
];

export const STUDIO_SERVICES_NOTICE =
  "위 서비스는 제안 단계이며, 실제 운영 방식은 협의 후 확정됩니다.";

export type StudioRentalGuideItem = { label: string; value: string };

const TBD = "별도 문의";

/** Section 06 — 대관 요금·규정이 확정되기 전까지의 기본값. 확정되면 value만 교체. */
export const STUDIO_RENTAL_GUIDE: StudioRentalGuideItem[] = [
  { label: "운영 시간", value: TBD },
  { label: "최소 이용 시간", value: TBD },
  { label: "대관 요금", value: TBD },
  { label: "기본 이용 인원", value: TBD },
  { label: "추가 인원 안내", value: TBD },
  { label: "장비 사용 조건", value: TBD },
  { label: "예약 및 취소 규정", value: TBD },
];

export const STUDIO_FLOOR_CARE_NOTICE =
  "호리존 바닥은 오염에 취약합니다. 지정된 신발 및 소품 사용 등 세부 이용 수칙은 대관 확정 시 안내해 드립니다.";

export const STUDIO_RENTAL_NOTICE =
  "대관 요금 및 이용 조건은 아직 확정되지 않았습니다. 정확한 안내는 아래 문의를 통해 확인해 주세요.";

/**
 * Section 07 — 스튜디오 주소가 회사 주소와 다를 수 있어 별도로 둔다.
 * 확정되기 전까지는 null로 두고, 회사 주소를 임의로 대입하지 않는다.
 */
export const STUDIO_ADDRESS: string | null = null;
export const STUDIO_ADDRESS_PENDING_NOTICE = "스튜디오 주소는 확정 후 안내해 드립니다.";

export const STUDIO_PROJECT_TYPE = "STUDIO RENTAL";
