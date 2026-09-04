import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { WHY_WIZ_REASONS } from "@/data/whyWiz";

export default function WhyWiz() {
  return (
    <section id="why-wiz" className="border-b border-line bg-mist px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <SectionLabel tone="muted">WHY WIZ CNI</SectionLabel>
          <h2 className="mt-4 text-2xl font-black text-ink sm:text-3xl md:text-4xl">
            BUILT ON EXPERIENCE.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_WIZ_REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 100} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-accent">
                <reason.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-black text-ink">{reason.title}</h3>
              <p className="mt-1 text-xs font-semibold tracking-wide text-muted">
                {reason.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{reason.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl border-t border-ink/10 pt-12 text-center">
          <p className="text-xl font-black text-ink sm:text-2xl">
            ONE TEAM. ONE VISION. ONE PRODUCTION.
          </p>
          <p className="mt-3 text-sm text-muted">
            하나의 팀이 기획부터 최종 결과물까지 책임집니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
