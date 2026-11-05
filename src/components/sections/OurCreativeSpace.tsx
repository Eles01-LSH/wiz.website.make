import Link from "next/link";
import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import StudioPlaceholder from "@/components/StudioPlaceholder";
import { STUDIO_HERO } from "@/data/studio";

export default function OurCreativeSpace() {
  return (
    <section className="border-b border-line bg-ink px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionLabel>OUR CREATIVE SPACE</SectionLabel>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              BEYOND THE FRAME.
            </h2>
            <p className="mt-2 text-lg font-bold text-white/70">
              경계 없는 공간, 무한한 가능성.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
              위즈씨엔아이의 새로운 호리존 스튜디오. 광고, 인터뷰, 브랜드 영상부터 다양한
              디지털 콘텐츠까지 — 창의적인 아이디어를 영상으로 완성하는 전문 촬영 공간입니다.
            </p>
            <Link
              href="/studio"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              EXPLORE OUR STUDIO
              <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
              <StudioPlaceholder src={STUDIO_HERO.image} alt="호리존 스튜디오 전경" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
