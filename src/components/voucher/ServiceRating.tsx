import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { VOUCHER_RATINGS } from "@/data/voucher";

export default function ServiceRating() {
  return (
    <section className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionLabel tone="muted">EXPORT VOUCHER SERVICE</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {VOUCHER_RATINGS.map((rating, i) => (
            <Reveal
              key={rating.label}
              delay={i * 80}
              className="flex flex-col items-center gap-1 px-6 py-6"
            >
              <span className="text-3xl font-black text-accent sm:text-4xl">
                {rating.value}
              </span>
              <span className="text-xs font-medium text-muted">{rating.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
