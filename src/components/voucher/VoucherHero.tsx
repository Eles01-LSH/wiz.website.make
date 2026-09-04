import Link from "next/link";
import SectionLabel from "@/components/Eyebrow";

export default function VoucherHero() {
  return (
    <section className="border-b border-line bg-mist px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>EXPORT VOUCHER</SectionLabel>
        <h1 className="mt-4 text-4xl font-black leading-[1.15] text-ink sm:text-5xl md:text-6xl">
          GLOBAL CONTENT
          <br />
          PRODUCTION
        </h1>
        <p className="mt-5 text-xl font-bold text-ink/80 sm:text-2xl">
          수출바우처 공식 수행기관
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          해외 시장을 향한 기업의 메시지를
          <br />
          더 선명하고 더 강력한 콘텐츠로 만듭니다.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          홍보영상 · SNS 콘텐츠 · CF 바이럴 영상
          <br />
          기획부터 촬영, 편집, 모션그래픽, 최종 제작까지
          <br />
          WIZ CNI가 하나의 프로덕션에서 완성합니다.
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          수출바우처 상담하기
          <span aria-hidden>→</span>
        </Link>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-3xl font-black text-accent sm:text-4xl">2023</p>
            <p className="mt-1 text-sm font-bold text-ink">
              수출바우처 수행기관 선정
            </p>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted">
            PROMOTIONAL FILM · SNS CONTENT · CF &amp; VIRAL
          </p>
        </div>
      </div>
    </section>
  );
}
