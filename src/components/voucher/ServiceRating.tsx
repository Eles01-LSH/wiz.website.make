"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { VOUCHER_RATING_CARDS, VOUCHER_RATING_METRICS } from "@/data/voucher";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;

    let raf = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function RatingCard({
  card,
  visible,
  delay,
}: {
  card: (typeof VOUCHER_RATING_CARDS)[number];
  visible: boolean;
  delay: number;
}) {
  const value = useCountUp(card.value, visible);

  return (
    <Reveal
      delay={delay}
      className="flex flex-col items-center gap-3 rounded-2xl border border-line px-6 py-8"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
        <card.icon className="h-7 w-7" />
      </span>
      <span className="text-3xl font-black text-accent sm:text-4xl">
        {value.toFixed(1)} / 10
      </span>
      <span className="text-base font-bold text-ink">{card.labelKo}</span>
      <span className="text-xs font-semibold tracking-wide text-muted">{card.labelEn}</span>
    </Reveal>
  );
}

function RatingMetric({
  metric,
  visible,
}: {
  metric: (typeof VOUCHER_RATING_METRICS)[number];
  visible: boolean;
}) {
  const value = useCountUp(metric.value, visible, 900);

  return (
    <span className="flex items-center gap-1.5 text-sm text-ink">
      {metric.label}
      <span className="font-black text-accent">{value.toFixed(1)}</span>
    </span>
  );
}

export default function ServiceRating() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section ref={ref} className="border-b border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-line" aria-hidden />
          <span className="text-xs font-bold tracking-[0.25em] text-muted">
            EXPORT VOUCHER SERVICE
          </span>
          <span className="h-px w-10 bg-line" aria-hidden />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-4 text-2xl font-black leading-tight text-ink sm:text-3xl">
            검증된 만족도, 믿을 수 있는 파트너 WIZ CNI
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VOUCHER_RATING_CARDS.map((card, i) => (
            <RatingCard key={card.labelEn} card={card} visible={visible} delay={120 + i * 80} />
          ))}
        </div>

        <Reveal
          delay={360}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-line px-6 py-5"
        >
          {VOUCHER_RATING_METRICS.map((metric, i) => (
            <span key={metric.label} className="flex items-center gap-x-6">
              {i > 0 && (
                <span className="text-line" aria-hidden>
                  |
                </span>
              )}
              <RatingMetric metric={metric} visible={visible} />
            </span>
          ))}
        </Reveal>

        <p className="mt-4 text-right text-xs text-muted">
          * 수출바우처 이용기업 만족도 평가 결과 기준
        </p>
      </div>
    </section>
  );
}
