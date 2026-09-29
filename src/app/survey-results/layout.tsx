import type { Metadata } from "next";

const TITLE = "2026년 전남권역책임의료기관 화순전남대학교병원 심포지엄";
const DESCRIPTION = "화순전남대학교병원 심포지엄 만족도 조사 결과";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/survey-results",
    images: [],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [],
  },
};

export default function SurveyResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
