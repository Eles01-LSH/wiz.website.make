import {
  ClapperboardIcon,
  SmartphoneIcon,
  MegaphoneIcon,
  BookIcon,
  LayersIcon,
  DisplayIcon,
  TypeIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

type Icon = ComponentType<{ className?: string }>;

export type VoucherService = {
  index: string;
  title: string;
  englishTitle: string;
  icon: Icon;
  desc: string;
  keywords: string[];
};

export const VOUCHER_SERVICES: VoucherService[] = [
  {
    index: "01",
    title: "홍보영상제작",
    englishTitle: "PROMOTIONAL FILM",
    icon: ClapperboardIcon,
    desc: "기업과 제품, 기술의 경쟁력을 해외 고객과 바이어에게 효과적으로 전달하는 홍보영상을 제작합니다.",
    keywords: ["기업홍보", "제품소개", "기술영상", "인터뷰", "브랜드 콘텐츠"],
  },
  {
    index: "02",
    title: "SNS콘텐츠제작",
    englishTitle: "SNS CONTENT",
    icon: SmartphoneIcon,
    desc: "플랫폼과 타깃에 맞는 콘텐츠 기획을 통해 짧은 시간 안에 기업과 제품의 메시지를 전달하는 디지털 콘텐츠를 제작합니다.",
    keywords: ["YouTube", "Short-form", "Reels", "Social Contents"],
  },
  {
    index: "03",
    title: "CF · 바이럴 영상제작",
    englishTitle: "CF & VIRAL CONTENT",
    icon: MegaphoneIcon,
    desc: "브랜드와 제품의 핵심 메시지를 강한 콘셉트와 비주얼로 전달하는 방송·온라인 광고 콘텐츠를 제작합니다.",
    keywords: ["Commercial", "Online AD", "Campaign", "Viral"],
  },
];

export type VoucherReason = {
  title: string;
  subtitle: string;
  desc: string;
  icon: Icon;
};

export const VOUCHER_WHY: VoucherReason[] = [
  {
    title: "20+ YEARS",
    subtitle: "Production Experience",
    desc: "20년 이상의 제작 경험을 기반으로 기업과 제품의 메시지를 영상 언어로 설계합니다.",
    icon: BookIcon,
  },
  {
    title: "ONE-STOP",
    subtitle: "Production System",
    desc: "기획 · 촬영 · 편집 · DI · CG · 모션그래픽까지 프로젝트 전 과정을 일관된 퀄리티로 제작합니다.",
    icon: LayersIcon,
  },
  {
    title: "MULTI CONTENT",
    subtitle: "Film · SNS · CF",
    desc: "하나의 프로젝트에서 홍보영상뿐 아니라 SNS와 광고 콘텐츠까지 확장할 수 있습니다.",
    icon: DisplayIcon,
  },
  {
    title: "GLOBAL VERSION",
    subtitle: "Multi Language Content",
    desc: "해외시장과 타깃에 맞춰 외국어 기반 콘텐츠 제작이 가능합니다.",
    icon: TypeIcon,
  },
];

export const VOUCHER_INTRO_STEPS = [
  "서비스 선택",
  "WIZ CNI 상담",
  "프로젝트 진행",
  "콘텐츠 제작 · 납품",
];

export type VoucherProcessStep = {
  index: string;
  title: string;
  subtitle: string;
  desc: string;
};

export const VOUCHER_PROCESS: VoucherProcessStep[] = [
  {
    index: "01",
    title: "CONSULTING",
    subtitle: "상담",
    desc: "기업, 제품, 목표시장과 필요한 콘텐츠를 파악합니다.",
  },
  {
    index: "02",
    title: "PLANNING",
    subtitle: "기획",
    desc: "콘셉트 · 구성 · 시나리오 · 제작 방향을 설계합니다.",
  },
  {
    index: "03",
    title: "PRODUCTION",
    subtitle: "촬영 · 제작",
    desc: "시네마 카메라 촬영과 필요한 제작 과정을 진행합니다.",
  },
  {
    index: "04",
    title: "POST PRODUCTION",
    subtitle: "편집 · 모션 · 후반제작",
    desc: "Editing · DI · CG · Motion Graphics · Sound로 콘텐츠를 완성합니다.",
  },
  {
    index: "05",
    title: "GLOBAL CONTENT",
    subtitle: "외국어 콘텐츠 제작",
    desc: "목표시장에 맞는 자막 · 나레이션 · 그래픽 등을 적용합니다.",
  },
  {
    index: "06",
    title: "DELIVERY",
    subtitle: "검수 · 납품",
    desc: "활용 매체와 플랫폼에 맞는 최종 포맷으로 제공합니다.",
  },
];

export type VoucherRating = {
  value: string;
  label: string;
};

export const VOUCHER_RATINGS: VoucherRating[] = [
  { value: "9.2 / 10", label: "Overall Satisfaction" },
  { value: "9.5 / 10", label: "Utilization" },
  { value: "9.5 / 10", label: "Trust" },
];

export const VOUCHER_LINK =
  "https://www.exportvoucher.com/pto/svm/serviceMenuDetail?svcInfoSeq=27849";
