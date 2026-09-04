import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { VOUCHER_SERVICES } from "@/data/voucher";

function WaveGraphicOne() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-36 w-full transition-transform duration-500 ease-out group-hover:scale-105"
    >
      <path
        d="M0,140 C80,90 140,180 220,130 C300,80 340,150 400,110 L400,200 L0,200 Z"
        fill="currentColor"
        className="text-accent/22"
      />
      <path
        d="M0,165 C100,130 180,190 260,150 C320,122 360,160 400,140 L400,200 L0,200 Z"
        fill="currentColor"
        className="text-accent/10"
      />
    </svg>
  );
}

function WaveGraphicTwo() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-40 w-full transition-transform duration-500 ease-out group-hover:scale-105"
    >
      <path
        d="M0,120 C90,60 160,160 260,100 C320,64 360,110 400,80 L400,200 L0,200 Z"
        fill="currentColor"
        className="text-accent/20"
      />
      <path
        d="M0,150 C110,100 200,180 300,130 C340,110 370,140 400,120 L400,200 L0,200 Z"
        fill="currentColor"
        className="text-accent/10"
      />
    </svg>
  );
}

function WaveGraphicThree() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-44 w-full transition-transform duration-500 ease-out group-hover:scale-105"
    >
      <path
        d="M0,110 C60,150 130,70 200,105 C270,140 330,90 400,120 L400,200 L0,200 Z"
        fill="currentColor"
        className="text-accent/24"
      />
      <path
        d="M0,145 C70,175 150,120 230,145 C300,168 350,130 400,150 L400,200 L0,200 Z"
        fill="currentColor"
        style={{ color: "#5ec8f0" }}
        opacity={0.22}
      />
    </svg>
  );
}

const CARD_GRAPHICS = [WaveGraphicOne, WaveGraphicTwo, WaveGraphicThree];

export default function OfficialServices() {
  return (
    <section className="border-b border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>OFFICIAL SERVICES</SectionLabel>
          <h2 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
            수출을 위한 콘텐츠,
            <br />
            목적에 맞게 제작합니다.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            WIZ CNI는 수출바우처 공식 서비스 메뉴를 통해
            <br />
            홍보영상제작, SNS콘텐츠제작, CF바이럴 영상제작 서비스를 제공합니다.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {VOUCHER_SERVICES.map((service, i) => {
            const Graphic = CARD_GRAPHICS[i % CARD_GRAPHICS.length];
            return (
              <Reveal key={service.index} delay={i * 100}>
                <div
                  className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-2xl bg-[#f3f6fb] p-7 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-8"
                >
                  <div aria-hidden className="absolute inset-0 overflow-hidden">
                    <Graphic />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent">
                      {service.index} / {service.englishTitle}
                    </span>
                    <h3 className="mt-3 text-2xl font-black leading-tight text-ink sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                      {service.desc}
                    </p>
                    <p className="mt-6 border-t border-ink/10 pt-4 text-xs font-medium leading-relaxed text-ink/50">
                      {service.keywords.join(" · ")}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
