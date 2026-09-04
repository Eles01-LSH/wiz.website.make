import Link from "next/link";
import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

export default function VoucherCTA() {
  return (
    <section className="bg-ink px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionLabel>START YOUR EXPORT PROJECT</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            수출을 위한 콘텐츠,
            <br />
            WIZ CNI와 시작하세요.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            홍보영상부터 SNS 콘텐츠, CF · 바이럴 영상까지
            <br />
            기업의 목적과 시장에 맞는 제작 방향을 제안합니다.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
          >
            수출바우처 상담 시작하기
            <span aria-hidden>→</span>
          </Link>

          <p className="mt-4 text-xs text-white/50">
            영업일 기준 1일 이내 담당자가 연락드립니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
