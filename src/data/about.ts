import type { ComponentType } from "react";
import {
  StarIcon,
  PuzzleIcon,
  ApertureIcon,
  ShieldCheckIcon,
  LayersIcon,
  CpuIcon,
  CameraIcon,
  BookIcon,
  MotionIcon,
  LiveIcon,
  SmartphoneIcon,
  DisplayIcon,
  MegaphoneIcon,
  SlidersIcon,
} from "@/components/icons";

type Icon = ComponentType<{ className?: string }>;

export type Stat = { title: string; desc: string };

export const ABOUT_STATS: Stat[] = [
  { title: "SINCE 2002", desc: "20+ YEARS EXPERIENCE" },
  { title: "ONE-STOP", desc: "PRE → PRODUCTION → POST → LIVE" },
  { title: "4K / CINEMA", desc: "CINEMATIC PRODUCTION" },
  { title: "MOTION & CGI", desc: "2D · 3D · VFX" },
  { title: "LIVE", desc: "BROADCAST · EVENT · PERFORMANCE" },
  { title: "MEDIA TECH", desc: "LED · DISPLAY · MEDIA SPACE" },
];

export type Capability = {
  index: string;
  icon: Icon;
  title: string;
  subtitle: string;
  desc: string;
};

export const ABOUT_CAPABILITIES: Capability[] = [
  {
    index: "01",
    icon: CameraIcon,
    title: "BRAND FILM",
    subtitle: "Brand Film & Commercial",
    desc: "기업·기관 홍보영상, 브랜드필름, TV-CF와 캠페인 영상을 기획부터 완성까지 제작합니다.",
  },
  {
    index: "02",
    icon: BookIcon,
    title: "STORY CONTENTS",
    subtitle: "Documentary & Storytelling",
    desc: "다큐멘터리, 기록영상, 드라마타이즈 등 이야기의 무게를 담은 콘텐츠를 만듭니다.",
  },
  {
    index: "03",
    icon: MotionIcon,
    title: "MOTION DESIGN",
    subtitle: "Motion Design & CGI",
    desc: "2D·3D 모션그래픽, CG, 합성, 인포그래픽과 타이틀 시퀀스로 메시지를 설계합니다.",
  },
  {
    index: "04",
    icon: LiveIcon,
    title: "LIVE PRODUCTION",
    subtitle: "Broadcasting & Live",
    desc: "공연·행사·포럼·콘퍼런스·축제의 4K 라이브 중계를 안정적으로 운영합니다.",
  },
  {
    index: "05",
    icon: SmartphoneIcon,
    title: "DIGITAL CONTENTS",
    subtitle: "Digital & Social Contents",
    desc: "유튜브, SNS, 숏폼 등 디지털 채널에 맞춘 콘텐츠를 기획하고 제작합니다.",
  },
  {
    index: "06",
    icon: DisplayIcon,
    title: "MEDIA TECHNOLOGY",
    subtitle: "Media Space & Technology",
    desc: "LED, 미디어월, 미디어파사드 등 디스플레이·송출 시스템으로 공간을 확장합니다.",
  },
];

export type Strength = { icon: Icon; title: string; desc: string };

export const ABOUT_STRENGTHS: Strength[] = [
  {
    icon: StarIcon,
    title: "20+ YEARS OF PRODUCTION KNOW-HOW",
    desc: "20년 이상 축적된 제작 판단력. 무엇을 찍고, 무엇을 버리고, 무엇을 남길지 아는 능력입니다.",
  },
  {
    icon: PuzzleIcon,
    title: "TRUE ONE-STOP PRODUCTION",
    desc: "기획부터 촬영, 편집, CG, 믹싱, 중계, 송출까지 — 외주 없이 한 팀이 책임집니다.",
  },
  {
    icon: ApertureIcon,
    title: "CINEMATIC QUALITY",
    desc: "Cinematography · Color · Motion. 영화적 완성도를 기준으로 만듭니다.",
  },
  {
    icon: LayersIcon,
    title: "FILM QUALITY × LIVE TECHNOLOGY",
    desc: "영상 연출력과 중계 기술을 동시에 갖춘 몇 안 되는 프로덕션입니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "TRUSTED PARTNER",
    desc: "공공기관과 기업이 반복해서 선택한 제작 파트너입니다.",
  },
  {
    icon: CpuIcon,
    title: "PRODUCTION + TECHNOLOGY",
    desc: "20년 이상의 제작 노하우에 새로운 크리에이티브 테크놀로지를 결합합니다.",
  },
];

export type ProcessStep = {
  index: string;
  icon: Icon;
  title: string;
  subtitle: string;
};

export const ABOUT_PROCESS_STEPS: ProcessStep[] = [
  { index: "01", icon: BookIcon, title: "PRE-PRODUCTION", subtitle: "기획·연출" },
  { index: "02", icon: CameraIcon, title: "PRODUCTION", subtitle: "촬영·편집" },
  { index: "03", icon: LayersIcon, title: "POST-PRODUCTION", subtitle: "CG·합성·믹싱" },
  { index: "04", icon: MegaphoneIcon, title: "ADVERTISING", subtitle: "광고대행·프로모션" },
];

export type QualityCard = {
  image: string;
  title: string;
  icon: Icon;
  desc: string;
};

export const ABOUT_QUALITY_CARDS: QualityCard[] = [
  {
    image: "/about/cinema-camera.jpg",
    title: "시네마 카메라 & 렌즈",
    icon: ApertureIcon,
    desc: "상업영화 및 CF 촬영에 쓰이는 6K 이상의 시네마 카메라를 콘텐츠 제작 전반에 도입해 깨끗한 화질과 다양한 색감을 구현합니다.",
  },
  {
    image: "/about/color-grading.jpg",
    title: "DI 색보정",
    icon: SlidersIcon,
    desc: "영상의 색감, 밝기, 톤을 정교하게 보정해 컨셉과 내용을 분위기 있게 전달하고 아름답고 트렌디한 영상미를 완성합니다.",
  },
  {
    image: "/about/motion-graphic.jpg",
    title: "2D · 3D 모션그래픽",
    icon: LayersIcon,
    desc: "전문 그래픽 디자이너의 역량으로 2D·3D 정보를 시각적으로 전달하고, 실사 영상과의 협업 시스템으로 새로운 이미지를 만듭니다.",
  },
];

export const ABOUT_LIVE_HIGHLIGHTS: string[] = [
  "웨비나, 포럼, 토크콘서트 등 비대면 온라인 생중계",
  "오케스트라, 뮤지컬, 공연 등 최대 실적과 Know-How",
  "HD부터 4K UHD 중계까지 환경에 맞는 최고의 장비와 퀄리티",
];

export const ABOUT_LIVE_TRACK_RECORD: string[] = [
  "정율성국제음악제",
  "광주성악콩쿠르",
  "광주국제음악제",
  "남도국제음악제",
  "전남도립국악단",
  "광주시립오케스트라",
  "광주시립오페라단 정기공연",
];

export type Milestone = { year: string; desc: string };

export const ABOUT_MILESTONES: Milestone[] = [
  { year: "2002", desc: "위즈미디어로 영상 제작을 시작하다" },
  { year: "20XX", desc: "주요 이력을 입력해주세요" },
  { year: "20XX", desc: "주요 이력을 입력해주세요" },
  { year: "20XX", desc: "주요 이력을 입력해주세요" },
];
