const SHOWREEL_YOUTUBE_ID = "JLW7iSbjB60";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[85vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[178vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${SHOWREEL_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${SHOWREEL_YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
          title="WIZ CNI Showreel"
          allow="autoplay; encrypted-media"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
        <h1 className="max-w-2xl text-4xl font-black leading-[1.15] text-white sm:text-5xl md:text-6xl">
          WE CREATE
          <br />
          THE WHOLE EXPERIENCE.
        </h1>

        <p className="mt-5 text-xl font-bold text-white sm:text-2xl">
          영상에서 경험까지.
        </p>

        <p className="mt-3 text-sm font-medium tracking-wide text-white/70 md:text-base">
          Creative Media Production &amp; Technology
        </p>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
        >
          START A PROJECT
        </a>
      </div>
    </section>
  );
}
