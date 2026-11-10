import type { ComponentType } from "react";
import {
  LoopIcon,
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


export type StudioRuleGroup = { index: string; title: string; items: string[] };

export const STUDIO_RULES_INTRO =
  "위즈씨엔아이 호리존 스튜디오는 모든 이용객에게 쾌적하고 안전한 촬영 환경을 제공하기 위해 다음과 같은 이용 수칙을 운영합니다.";

export const STUDIO_RULES: StudioRuleGroup[] = [
  {
    index: "01",
    title: "이용 시간 및 출입",
    items: [
      "예약된 시간에 입실 및 퇴실해 주시기 바랍니다.",
      "이용 시간에는 촬영 준비, 장비 설치, 촬영, 정리 및 철수 시간이 모두 포함됩니다.",
      "이용 시간 연장이 필요한 경우 사전에 담당자에게 문의해 주세요.",
      "사전 협의되지 않은 추가 인원의 출입은 제한될 수 있습니다.",
    ],
  },
  {
    index: "02",
    title: "호리존 바닥 및 벽면 보호",
    items: [
      "호리존 내부에서는 깨끗한 실내화를 착용하거나 신발 밑창을 테이핑해 주세요.",
      "외부에서 착용한 신발을 보호 조치 없이 사용하는 것은 금지합니다.",
      "벽과 바닥이 연결되는 곡면 부분을 밟거나, 앉거나, 기대는 행위는 금지합니다.",
      "호리존 벽면에 못을 박거나 테이프 및 접착물을 부착할 경우 사전 승인이 필요합니다.",
      "바닥과 벽면에 흠집이나 오염이 발생하지 않도록 주의해 주세요.",
    ],
  },
  {
    index: "03",
    title: "촬영 장비 및 소품 사용",
    items: [
      "삼각대, 조명 스탠드, 가구 등 무거운 장비를 설치할 때에는 바닥 보호 조치를 해주세요.",
      "촬영 장비나 소품을 호리존 벽면에 기대거나 끌어서 이동하지 마세요.",
      "스튜디오 내 장비 및 비품은 안내된 사용 범위 내에서 이용해 주세요.",
      "장비와 시설물을 임의로 분해하거나 개조하는 행위는 금지합니다.",
    ],
  },
  {
    index: "04",
    title: "음식물 및 특수 촬영",
    items: [
      "호리존 촬영 구역 내 음식물 및 음료 반입과 취식은 금지합니다.",
      "지정된 휴게 공간에서의 취식 가능 여부는 담당자의 안내에 따라주세요.",
      "물, 분말, 색소, 연기, 불꽃 등 시설 오염이나 안전사고를 유발할 수 있는 촬영은 반드시 사전 승인이 필요합니다.",
      "반려동물 동반 촬영 및 대형 소품 반입은 사전에 협의해 주세요.",
      "스튜디오 내 흡연 및 음주는 금지합니다.",
    ],
  },
  {
    index: "05",
    title: "시설 관리 및 원상복구",
    items: [
      "이용한 가구, 장비, 소품 등은 퇴실 전 원래 위치로 정리해 주세요.",
      "촬영 중 발생한 쓰레기는 분리수거하고, 음식물 쓰레기와 대형 폐기물은 직접 수거해 주세요.",
      "시설이나 장비의 파손 또는 오염을 발견한 경우 즉시 담당자에게 알려주세요.",
      "이용 종료 시 담당자의 안내에 따라 정리 상태를 확인할 수 있습니다.",
    ],
  },
  {
    index: "06",
    title: "시설 오염 및 파손",
    items: [
      "정상적인 이용 범위를 벗어난 오염이나 파손이 발생한 경우 청소, 수리 또는 재도색 비용이 발생할 수 있습니다.",
      "비용은 손상 상태와 실제 복구에 필요한 범위를 확인하여 산정합니다.",
      "시설 오염이나 파손이 발생한 경우 이용자와 담당자가 현장 상태를 확인하고 필요한 조치를 협의합니다.",
    ],
  },
  {
    index: "07",
    title: "안전 및 공용 공간",
    items: [
      "촬영 중 전선, 조명 및 장비로 인한 안전사고가 발생하지 않도록 주의해 주세요.",
      "비상구와 공용 통로를 촬영 장비나 소품으로 막지 마세요.",
      "다른 입주사 및 시설 이용객에게 불편을 줄 수 있는 큰 소음은 자제해 주세요.",
      "안전사고나 시설 이상이 발생한 경우 즉시 담당자에게 알려주세요.",
    ],
  },
];

export const STUDIO_RULES_CLOSING =
  "모든 이용객이 쾌적하게 촬영할 수 있도록 이용 수칙 준수를 부탁드립니다.";

export type StudioRentalGuideItem = { label: string; value: string };

const TBD = "별도 문의";

/** Section 06 — 대관 요금·규정이 확정되기 전까지의 기본값. 확정되면 value만 교체. */
export const STUDIO_RENTAL_GUIDE: StudioRentalGuideItem[] = [
  { label: "운영 시간", value: "평일 09:00 ~ 18:00" },
  { label: "최소 이용 시간", value: "2시간" },
  { label: "대관 요금", value: "시간당 30,000원" },
  { label: "기본 이용 인원", value: "3명" },
  { label: "추가 인원 안내", value: "1명당 1시간 10,000원 추가" },
  { label: "장비 사용 조건", value: TBD },
  {
    label: "예약 및 취소 규정",
    value: "7일 전 전액, 5일 전 50%, 3일 전 30%, 1일 전 10% 환불",
  },
];

export const STUDIO_FLOOR_CARE_NOTICE =
  "호리존 바닥 및 시설 이용 관련 세부 수칙은 위 “이용 수칙”을 참고해 주세요.";

export const STUDIO_RENTAL_NOTICE =
  "아래 기본 요금 외 장비 사용 조건 등 세부 사항은 문의를 통해 안내해 드립니다.";

/**
 * Section 07 — 스튜디오 주소가 회사 주소와 다를 수 있어 별도로 둔다.
 * 확정되기 전까지는 null로 두고, 회사 주소를 임의로 대입하지 않는다.
 */
export const STUDIO_ADDRESS: string | null = "전남광주통합특별시 북구 첨단연신로 45 A동 6층";
export const STUDIO_ADDRESS_PENDING_NOTICE = "스튜디오 주소는 확정 후 안내해 드립니다.";
