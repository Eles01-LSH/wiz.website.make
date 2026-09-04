"use client";

import { useEffect, useRef, useState } from "react";
import { EXPERIENCE_STATS, type ExperienceStat } from "@/data/stats";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useCountUp(target: number, start: boolean, duration = 1000) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;

    let raf = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function StatItem({ stat, visible, delay }: { stat: ExperienceStat; visible: boolean; delay: number }) {
  const value = useCountUp(stat.value, visible);

  return (
    <div
      className="flex flex-col items-center gap-2 px-6 py-10 text-center transition-all duration-700 ease-out sm:py-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="flex flex-col items-center leading-none">
        <span className="text-5xl font-black text-accent sm:text-6xl md:text-7xl">
          {value}
          {stat.suffix}
        </span>
        <span className="mt-2 text-xl font-black text-ink sm:text-2xl md:text-3xl">{stat.label}</span>
      </p>
      <p className="text-sm text-muted">{stat.desc}</p>
    </div>
  );
}

export default function ExperienceStats() {
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section ref={ref} className="border-b border-line px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2
          className="text-center text-2xl font-black text-ink transition-all duration-700 ease-out md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          EXPERIENCE IN NUMBERS
        </h2>

        <div className="mt-12 grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {EXPERIENCE_STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} visible={visible} delay={150 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
