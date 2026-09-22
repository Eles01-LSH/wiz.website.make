import type { ReactNode } from "react";
import Image from "next/image";
import SectionLabel from "@/components/Eyebrow";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description?: string;
  backgroundImage?: string;
};

export default function PageHero({ label, title, description, backgroundImage }: PageHeroProps) {
  if (backgroundImage) {
    return (
      <section className="relative overflow-hidden border-b border-line px-6 py-20 md:px-10 md:py-28">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="text-white/80">{label}</SectionLabel>
          <h1 className="mt-4 text-3xl font-black text-white drop-shadow-md sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow md:text-base">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-mist px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-4 text-3xl font-black text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
