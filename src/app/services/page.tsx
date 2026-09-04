import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { DETAILED_SERVICES } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="SERVICES"
          title="서비스"
          description="기획부터 공간 연출까지, 모든 제작·운영을 원스톱으로 제공합니다."
        />

        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col divide-y divide-line">
            {DETAILED_SERVICES.map((service) => (
              <Reveal
                key={service.index}
                className="grid grid-cols-1 items-center gap-10 py-14 first:pt-0 last:pb-0 md:grid-cols-2 md:gap-16"
              >
                <div>
                  <span className="text-2xl font-black text-accent">{service.index}.</span>
                  <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-1 text-sm font-bold tracking-wide text-accent">
                    {service.englishTitle}
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
                    {service.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                    {service.tags.map((tag) => (
                      <div key={tag.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-accent">
                          <tag.icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-medium text-muted">{tag.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-mist">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
