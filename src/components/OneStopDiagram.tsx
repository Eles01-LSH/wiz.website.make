"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Step = {
  title: string[];
  subtitle: string;
  x: number;
  y: number;
  size: number;
  gradient: string;
};

const STEPS: Step[] = [
  {
    title: ["PRE", "PRODUCTION"],
    subtitle: "기획·연출",
    x: 27,
    y: 15,
    size: 34,
    gradient: "from-[#6fd0f5] to-[#2f6fe0]",
  },
  {
    title: ["PRODUCTION"],
    subtitle: "촬영·편집",
    x: 71,
    y: 34,
    size: 30,
    gradient: "from-[#5a6ef0] to-[#2436b0]",
  },
  {
    title: ["POST", "PRODUCTION"],
    subtitle: "CG·합성·mixing",
    x: 32,
    y: 68,
    size: 34,
    gradient: "from-[#12163a] to-[#0b0b0c]",
  },
  {
    title: ["ADVERTISING", "AGENT"],
    subtitle: "광고대행·프로모션",
    x: 77,
    y: 86,
    size: 31,
    gradient: "from-[#7fe3f2] to-[#2f9fe0]",
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function OneStopDiagram() {
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
    <div ref={ref} className="relative mx-auto aspect-[6/7] w-full max-w-sm">
      <div
        aria-hidden
        className="absolute rounded-full border border-line transition-opacity duration-700 ease-out"
        style={{
          left: "52%",
          top: "50%",
          width: "92%",
          height: "92%",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full border border-line transition-opacity duration-700 ease-out"
        style={{
          left: "52%",
          top: "50%",
          width: "68%",
          height: "68%",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transitionDelay: "120ms",
        }}
      />

      <div
        className="absolute flex flex-col items-center gap-1 transition-opacity duration-700 ease-out"
        style={{
          left: "52%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <Image src="/wiz-icon.png" alt="WIZ CNI" width={135} height={59} className="h-6 w-auto" />
        <span className="text-[11px] font-black tracking-wide text-ink">WIZ CNI</span>
      </div>

      {STEPS.map((step, i) => (
        <div
          key={step.title.join(" ")}
          className={`absolute flex aspect-square flex-col items-center justify-center rounded-full bg-gradient-to-br px-2 text-center text-white shadow-lg transition-all duration-500 ${step.gradient}`}
          style={{
            left: `${step.x}%`,
            top: `${step.y}%`,
            width: `${step.size}%`,
            transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.3})`,
            opacity: visible ? 1 : 0,
            transitionDelay: `${300 + i * 180}ms`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {step.title.map((line) => (
            <span key={line} className="text-[10px] font-black leading-tight sm:text-xs">
              {line}
            </span>
          ))}
          <span className="mt-0.5 text-[9px] font-medium leading-tight text-white/85 sm:text-[10px]">
            {step.subtitle}
          </span>
        </div>
      ))}
    </div>
  );
}
