import { StarIcon, PuzzleIcon, ApertureIcon, MonitorPlayIcon } from "@/components/icons";
import type { ComponentType } from "react";

export type Reason = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  desc: string;
};

export const WHY_WIZ_REASONS: Reason[] = [
  { icon: StarIcon, title: "20+ YEARS", subtitle: "Experience", desc: "20년 이상의 제작 경험과 노하우" },
  { icon: PuzzleIcon, title: "ONE-STOP", subtitle: "Production", desc: "기획부터 후반까지 원스톱 제작 시스템" },
  { icon: ApertureIcon, title: "CINEMATIC", subtitle: "Quality", desc: "영화적 감성의 퀄리티 높은 결과물" },
  { icon: MonitorPlayIcon, title: "LIVE + MEDIA", subtitle: "Technology", desc: "라이브와 미디어 기술의 융합" },
];
