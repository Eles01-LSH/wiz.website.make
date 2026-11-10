import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/Eyebrow";
import StudioPlaceholder from "@/components/StudioPlaceholder";
import StudioGallery from "@/components/studio/StudioGallery";
import { CONTACT_INFO } from "@/data/contact";
import {
  STUDIO_HERO,
  STUDIO_FEATURES,
  STUDIO_SPECS,
  STUDIO_SPECS_PENDING_NOTICE,
  STUDIO_GALLERY,
  STUDIO_RULES_INTRO,
  STUDIO_RULES,
  STUDIO_RULES_CLOSING,
  STUDIO_RENTAL_GUIDE,
  STUDIO_RENTAL_NOTICE,
  STUDIO_FLOOR_CARE_NOTICE,
  STUDIO_ADDRESS,
  STUDIO_ADDRESS_PENDING_NOTICE,
} from "@/data/studio";

const TITLE = "호리존 스튜디오 | HORIZON STUDIO - WIZ CNI";
const DESCRIPTION =
  "위즈씨엔아이 호리존 스튜디오. 광주 촬영 스튜디오에서 광고, 인터뷰, 브랜드 영상, 디지털 콘텐츠까지 — 경계 없는 영상 촬영 공간을 대관하고, 전문 촬영 제작 서비스와 함께 이용할 수 있습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "위즈씨엔아이 호리존 스튜디오",
    "호리존 스튜디오",
    "광주 호리존 스튜디오",
    "광주 촬영 스튜디오",
    "영상 촬영 스튜디오",
    "스튜디오 대관",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/studio",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const INQUIRY_HREF = "/contact?category=studio";
const TEL = CONTACT_INFO.find((i) => i.label === "TEL")?.value ?? "";
const EMAIL = CONTACT_INFO.find((i) => i.label === "EMAIL")?.value ?? "";

const visibleSpecs = STUDIO_SPECS.filter((s) => s.value.trim());

export default function StudioPage() {
  return (
    <>
      <Header />
      <main>
        {/* SECTION 01 — HERO */}
        <section className="border-b border-line bg-ink px-6 pb-14 pt-20 text-center md:px-10 md:pb-20 md:pt-28">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>STUDIO</SectionLabel>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
              {STUDIO_HERO.title}
            </h1>
            <p className="mt-5 break-keep text-lg font-bold text-white/80 md:text-xl">
              {STUDIO_HERO.subCopy}
            </p>
            <div className="mt-6 flex flex-col gap-1 break-keep text-sm leading-relaxed text-white/60 md:text-base">
              {STUDIO_HERO.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#about-studio"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                스튜디오 소개
                <span aria-hidden>↓</span>
              </a>
              <Link
                href={INQUIRY_HREF}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              >
                스튜디오 예약
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
              <StudioPlaceholder src={STUDIO_HERO.image} alt="호리존 스튜디오 전경" />
            </div>
          </div>
        </section>

        {/* SECTION 02 — ABOUT THE STUDIO */}
        <section id="about-studio" className="border-b border-line px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <SectionLabel>ABOUT THE STUDIO</SectionLabel>
              <h2 className="mt-4 break-keep text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                촬영의 경계를 허무는 공간.
              </h2>
              <p className="mt-6 break-keep text-sm leading-relaxed text-muted md:text-base">
                호리존 스튜디오는 벽과 바닥이 만나는 부분을 곡면으로 연결하여 공간의 경계가
                자연스럽게 사라지는 효과를 구현한 전문 촬영 공간입니다.
              </p>
              <p className="mt-4 break-keep text-sm leading-relaxed text-muted md:text-base">
                불필요한 배경 요소를 최소화하여 피사체에 집중할 수 있으며, 조명과 촬영
                구도에 따라 다양한 분위기를 연출할 수 있습니다.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {STUDIO_FEATURES.map((feature, i) => (
                <Reveal
                  key={feature.title}
                  delay={i * 100}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-accent">
                    <feature.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-sm font-black text-ink">{feature.title}</h3>
                  <p className="mt-2 break-keep text-xs leading-relaxed text-muted">{feature.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03 — SPACE & FACILITIES */}
        <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel tone="muted">SPACE &amp; FACILITIES</SectionLabel>
              <h2 className="mt-4 break-keep text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                공간 및 시설 정보
              </h2>
            </Reveal>

            <Reveal delay={80} className="mt-10 rounded-md border border-line bg-paper p-6 md:p-8">
              {visibleSpecs.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {visibleSpecs.map((spec) => (
                    <div key={spec.label}>
                      <p className="break-keep text-[10px] font-bold tracking-[0.2em] text-muted">
                        {spec.label.toUpperCase()}
                      </p>
                      <p className="mt-1.5 break-keep text-sm font-semibold text-ink">{spec.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="break-keep text-center text-sm text-muted">{STUDIO_SPECS_PENDING_NOTICE}</p>
              )}
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <StudioGallery images={STUDIO_GALLERY} />
            </Reveal>
          </div>
        </section>

        {/* SECTION 04 — STUDIO RULES */}
        <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel tone="muted">STUDIO RULES</SectionLabel>
              <h2 className="mt-4 break-keep text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                이용 수칙
              </h2>
              <p className="mt-4 max-w-2xl break-keep text-sm leading-relaxed text-muted md:text-base">
                {STUDIO_RULES_INTRO}
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {STUDIO_RULES.map((rule, i) => (
                <Reveal
                  key={rule.index}
                  delay={i * 60}
                  className="rounded-md border border-line bg-paper p-6 md:p-8"
                >
                  <span className="text-2xl font-black text-accent">{rule.index}.</span>
                  <h3 className="mt-2 break-keep text-lg font-black text-ink">{rule.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
                    {rule.items.map((item) => (
                      <li key={item} className="flex gap-3 break-keep text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 break-keep text-center text-xs font-semibold text-ink">
              {STUDIO_RULES_CLOSING}
            </p>
          </div>
        </section>

        {/* SECTION 05 — RENTAL GUIDE */}
        <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>RENTAL GUIDE</SectionLabel>
              <h2 className="mt-4 break-keep text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                대관 안내
              </h2>
              <p className="mt-4 max-w-2xl break-keep text-sm leading-relaxed text-muted md:text-base">
                {STUDIO_RENTAL_NOTICE}
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 rounded-md border border-line bg-mist p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-4">
              {STUDIO_RENTAL_GUIDE.map((item) => (
                <div key={item.label}>
                  <p className="break-keep text-[10px] font-bold tracking-[0.2em] text-muted">
                    {item.label.toUpperCase()}
                  </p>
                  <p className="mt-1.5 break-keep text-sm font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={120} className="mt-6 rounded-md border border-line px-6 py-5">
              <p className="break-keep text-xs leading-relaxed text-muted">{STUDIO_FLOOR_CARE_NOTICE}</p>
            </Reveal>
          </div>
        </section>

        {/* SECTION 06 — LOCATION & CONTACT */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal className="text-center">
              <SectionLabel>VISIT OUR STUDIO</SectionLabel>
              <h2 className="mt-4 break-keep text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                예약 및 대관 문의
              </h2>
            </Reveal>

            <Reveal
              delay={80}
              className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 rounded-md border border-line bg-mist p-6 text-center sm:grid-cols-3 md:p-8"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted">ADDRESS</p>
                <p className="mt-2 break-keep text-sm font-medium text-ink">
                  {STUDIO_ADDRESS ?? STUDIO_ADDRESS_PENDING_NOTICE}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted">TEL</p>
                <p className="mt-2 text-sm font-medium text-ink">{TEL}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted">EMAIL</p>
                <p className="mt-2 text-sm font-medium text-ink">{EMAIL}</p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10 flex justify-center">
              <Link
                href={INQUIRY_HREF}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                스튜디오 예약
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
