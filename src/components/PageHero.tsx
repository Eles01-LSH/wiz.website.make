import SectionLabel from "@/components/Eyebrow";

type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
};

export default function PageHero({ label, title, description }: PageHeroProps) {
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
