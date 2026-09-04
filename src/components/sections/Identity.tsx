import SectionLabel from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

const CAPABILITIES = ["FILM", "MOTION", "LIVE", "MEDIA"];

export default function Identity() {
  return (
    <section id="identity" className="border-b border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionLabel>STORY × IMAGE × TECHNOLOGY</SectionLabel>
            <h2 className="mt-5 text-3xl font-black leading-[1.3] text-ink sm:text-4xl md:text-[2.6rem]">
              이야기를 이미지로,
              <br />
              이미지를 경험으로.
            </h2>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-center gap-6">
            <p className="text-sm leading-relaxed text-muted md:text-base">
              WIZ CNI는 기획, 연출, 촬영, 후반 제작, 모션 그래픽, 라이브
              프로덕션과 미디어 기술을 하나로 연결해 브랜드와 사람에게
              새로운 시각적 경험을 만듭니다.
            </p>
            <div className="flex flex-wrap gap-3">
              {CAPABILITIES.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-accent/40 px-4 py-1.5 text-xs font-bold tracking-wide text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
