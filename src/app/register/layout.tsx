import type { Metadata } from "next";

const TITLE = "2026년 전남권역책임의료기관 화순전남대학교병원 심포지엄";
const DESCRIPTION = "지역완결적 필수의료체계 구축, 현황과 과제 그리고 도전 — 심포지엄 사전등록";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/register",
    images: [],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [],
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
