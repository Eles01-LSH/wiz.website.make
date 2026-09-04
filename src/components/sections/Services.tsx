import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { DETAILED_SERVICES } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="border-b border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel tone="muted">WHAT WE DO</SectionLabel>
            <h2 className="mt-4 text-2xl font-black text-ink sm:text-3xl md:text-4xl">
              ONE PRODUCTION. MULTIPLE POSSIBILITIES.
            </h2>
          </div>
          <a
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            VIEW ALL SERVICES
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {DETAILED_SERVICES.map((service, i) => (
            <Reveal key={service.index} delay={i * 80} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-accent">
                <service.icon className="h-7 w-7" />
              </span>
              <span className="mt-4 text-xs font-black text-muted">{service.index}</span>
              <h3 className="mt-1 text-base font-black text-ink">{service.title}</h3>
              <p className="mt-1 text-[11px] font-semibold tracking-wide text-accent">
                {service.englishTitle}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{service.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
