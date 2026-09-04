import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { VOUCHER_INTRO_STEPS, VOUCHER_LINK } from "@/data/voucher";

export default function AboutExportVoucher() {
  return (
    <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionLabel tone="muted">ABOUT EXPORT VOUCHER</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
            수출바우처로
            <br />
            글로벌 콘텐츠를 시작하세요.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            수출바우처는 기업의 해외시장 진출에 필요한 다양한 서비스를 바우처
            방식으로 활용할 수 있도록 지원하는 수출지원사업입니다.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            참여기업은 필요한 서비스를 선택하고 등록된 수행기관을 통해
            프로젝트를 진행할 수 있습니다.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-6"
        >
          {VOUCHER_INTRO_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-black text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold text-ink">{step}</span>
              </div>
              {i < VOUCHER_INTRO_STEPS.length - 1 && (
                <span className="text-muted" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal delay={200}>
          <a
            href={VOUCHER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            수출바우처 공식 서비스 확인하기
            <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
