import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { VOUCHER_WHY } from "@/data/voucher";

export default function WhyWizVoucher() {
  return (
    <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <SectionLabel>WHY WIZ CNI</SectionLabel>
          <h2 className="mt-4 text-2xl font-black text-ink sm:text-3xl md:text-4xl">
            ONE PRODUCTION.
            <br />
            ONE QUALITY.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            여러 제작사를 거치지 않고
            <br />
            기획부터 최종 콘텐츠까지 하나의 제작 시스템으로 관리합니다.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VOUCHER_WHY.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 100}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-accent">
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
      </div>
    </section>
  );
}
