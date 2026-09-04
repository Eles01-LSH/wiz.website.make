import {
  CameraIcon,
  MotionIcon,
  LiveIcon,
  MediaIcon,
  ClapperboardIcon,
  PlayIcon,
  MegaphoneIcon,
  MicIcon,
  LayersIcon,
  DisplayIcon,
  TypeIcon,
  LoopIcon,
  MonitorPlayIcon,
  SlidersIcon,
  SpeakerIcon,
  SignalIcon,
  SwitchIcon,
  CpuIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

type Icon = ComponentType<{ className?: string }>;

export type ServiceTag = { label: string; icon: Icon };

export type DetailedService = {
  index: string;
  title: string;
  englishTitle: string;
  icon: Icon;
  image: string;
  desc: string;
  tags: ServiceTag[];
};

export const DETAILED_SERVICES: DetailedService[] = [
  {
    index: "01",
    title: "영상제작",
    englishTitle: "FILM PRODUCTION",
    icon: CameraIcon,
    image: "/services/film-production.jpg",
    desc: "기획과 연출, 시네마틱 촬영을 통해 브랜드와 기관의 메시지를 완성도 높은 영상 콘텐츠로 제작합니다.",
    tags: [
      { label: "브랜드필름", icon: ClapperboardIcon },
      { label: "홍보영상", icon: PlayIcon },
      { label: "광고", icon: MegaphoneIcon },
      { label: "인터뷰", icon: MicIcon },
    ],
  },
  {
    index: "02",
    title: "모션",
    englishTitle: "MOTION GRAPHICS",
    icon: MotionIcon,
    image: "/services/motion-graphics.jpg",
    desc: "아이디어를 시각적으로 움직여 메시지를 더 효과적으로 전달하는 모션그래픽을 만듭니다.",
    tags: [
      { label: "2D / 3D 모션", icon: LayersIcon },
      { label: "인포그래픽", icon: DisplayIcon },
      { label: "타이틀 디자인", icon: TypeIcon },
      { label: "애니메이션", icon: LoopIcon },
    ],
  },
  {
    index: "03",
    title: "편집",
    englishTitle: "EDITING",
    icon: MonitorPlayIcon,
    image: "/services/editing.jpg",
    desc: "촬영된 영상을 선별·구성하여 스토리와 감정을 완성도 높게 만들어냅니다.",
    tags: [
      { label: "영상 편집", icon: MonitorPlayIcon },
      { label: "색보정(DI)", icon: SlidersIcon },
      { label: "사운드 믹싱", icon: SpeakerIcon },
      { label: "자막 / 타이틀", icon: TypeIcon },
    ],
  },
  {
    index: "04",
    title: "라이브 중계",
    englishTitle: "LIVE PRODUCTION",
    icon: LiveIcon,
    image: "/services/live-production.jpg",
    desc: "행사, 공연, 컨퍼런스 등 다양한 현장을 실시간으로 연결하고 안정적으로 생중계합니다.",
    tags: [
      { label: "멀티캠 중계", icon: SignalIcon },
      { label: "실시간 스트리밍", icon: LiveIcon },
      { label: "스위처 운영", icon: SwitchIcon },
      { label: "음향 운영", icon: SpeakerIcon },
    ],
  },
  {
    index: "05",
    title: "공간 미디어",
    englishTitle: "INTERIOR MEDIA",
    icon: DisplayIcon,
    image: "/services/interior-media.jpg",
    desc: "LED, XR, 프로젝션 등 다양한 미디어를 공간에 최적화하여 새로운 경험을 구현합니다.",
    tags: [
      { label: "LED / 전광판", icon: DisplayIcon },
      { label: "XR / 프로젝션", icon: MediaIcon },
      { label: "시스템 구축", icon: CpuIcon },
    ],
  },
];
