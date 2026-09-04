import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import OneStopDiagram from "@/components/OneStopDiagram";
import { StarIcon } from "@/components/icons";
import {
  ABOUT_STATS,
  ABOUT_QUALITY_CARDS,
  ABOUT_LIVE_HIGHLIGHTS,
  ABOUT_LIVE_TRACK_RECORD,
} from "@/data/about";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="ABOUT"
          title="스튜디오 소개"
          description="영상의 기획부터 제작, 라이브, 디지털 미디어 기술까지. 콘텐츠가 경험이 되는 순간을 만듭니다."
        />

        <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>CREATIVE MEDIA PRODUCTION &amp; TECHNOLOGY</SectionLabel>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
              WE CREATE THE WHOLE EXPERIENCE.
            </h2>
            <p className="mt-2 text-lg font-bold text-ink/80">영상에서 경험까지.</p>

            <p className="mt-8 text-sm leading-relaxed text-muted md:text-base">
              위즈씨엔아이는 2002년부터 영상의 기획, 연출, 촬영, 편집, CG·모션그래픽과
              라이브 프로덕션까지 콘텐츠 제작의 전 과정을 직접 수행해 온 Creative
              Media Production입니다.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              우리는 단순히 영상을 제작하지 않습니다. 브랜드가 무엇을 말해야 하는지
              고민하고, 어떻게 보여야 하는지를 설계하며, 가장 적합한 기술을 통해
              하나의 경험으로 완성합니다.
            </p>
            <p className="mt-6 text-base font-black text-ink">
              Film. Motion. Live. Media Technology.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.title} className="border-t border-line pt-4">
                <p className="text-sm font-black text-ink">{stat.title}</p>
                <p className="mt-1 text-xs font-medium text-muted">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
              우리는 영상을 만드는 회사가 아니라,
              <br />
              영상으로 경험을 설계하는 회사입니다.
            </p>
          </div>
        </section>

        <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <OneStopDiagram />
              </Reveal>

              <Reveal delay={120}>
                <SectionLabel tone="muted">PRODUCTION PROCESS</SectionLabel>
                <p className="mt-4 text-lg font-bold text-ink/70">One-stop Solutions</p>
                <p className="mt-1 bg-gradient-to-r from-accent to-[#5ec8f0] bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                  #1 Rated Production Team
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  위즈씨엔아이는 콘텐츠 제작부터 광고대행, 프로모션까지 영상 광고의 전
                  분야를 원스톱으로 서비스합니다. 하드웨어, 소프트웨어, 제작 인력 모든
                  면에서 최고의 역량과 최적의 제작 환경을 갖추고, 이 모든 프로세스를
                  외주 없이 직접 수행합니다.
                </p>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-base font-black text-ink md:text-lg">
                    결과물의 책임은 온전히 제작자의 몫입니다.
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    외주 제작 없는 One-stop Production은 책임 있는 제작자의 필수
                    덕목입니다.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-ink px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>EQUIPMENT &amp; QUALITY</SectionLabel>
              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl md:text-4xl">
                Why Choose Us?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                가장 최신화된 기술을 도입하여 영상의 품질을 높입니다. 세련된 비주얼과
                완성된 스토리가 결합되어 감각적이고 트렌디한 영상을 만들어냅니다.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {ABOUT_QUALITY_CARDS.map((card, i) => (
                <Reveal key={card.image} delay={i * 100}>
                  <div className="overflow-hidden rounded-md bg-paper">
                    <div className="relative aspect-[37/20] w-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-accent">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-3 text-sm font-black text-ink">{card.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{card.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel tone="muted">LIVE BROADCASTING</SectionLabel>
              <h2 className="mt-4 text-2xl font-black text-ink sm:text-3xl md:text-4xl">
                4K Live Streaming
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <Reveal>
                <div className="relative aspect-[65/42] w-full overflow-hidden rounded-md bg-mist">
                  <Image
                    src="/about/live-broadcast.jpg"
                    alt="4K UHD 라이브 중계 카메라"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <h3 className="text-lg font-black text-ink">4K UHD 생방송 시스템</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {ABOUT_LIVE_HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-muted">
                  주요실적
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ABOUT_LIVE_TRACK_RECORD.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist text-accent">
              <StarIcon />
            </span>
            <h2 className="mt-5 text-xl font-black text-ink md:text-2xl">
              ONE TEAM. ONE VISION. ONE PRODUCTION.
            </h2>
            <p className="mt-3 text-sm text-muted">
              하나의 팀이 기획부터 최종 결과물까지 책임집니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
