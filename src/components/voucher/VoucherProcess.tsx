import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { VOUCHER_PROCESS } from "@/data/voucher";

export default function VoucherProcess() {
  return (
    <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel tone="muted">OUR PROCESS</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
            From Brief
            <br />
            to Final Content.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {VOUCHER_PROCESS.map((step, i) => (
            <Reveal key={step.index} delay={i * 80} className="border-t border-line pt-5">
              <span className="text-xs font-black text-accent">{step.index}</span>
              <h3 className="mt-2 text-sm font-black text-ink">{step.title}</h3>
              <p className="text-xs font-semibold text-muted">{step.subtitle}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
