import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "600"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
});

const TITLE = "WIZ CNI | We Create The Whole Experience";
const DESCRIPTION =
  "WIZ CNI는 기획, 연출, 촬영, 후반 제작, 모션 그래픽, 라이브 프로덕션과 미디어 기술을 하나로 연결해 브랜드와 사람에게 새로운 시각적 경험을 만듭니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://home-seven-rust.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "WIZ CNI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WIZ CNI" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
