"use client";

import { useEffect, useState } from "react";
import StudioPlaceholder from "@/components/StudioPlaceholder";
import { XIcon } from "@/components/icons";
import type { StudioGalleryImage } from "@/data/studio";

export default function StudioGallery({ images }: { images: StudioGalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (!active) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((img, i) => (
          <button
            key={img.alt}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-md bg-mist text-left"
          >
            <StudioPlaceholder
              src={img.src}
              alt={img.alt}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-8"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="닫기"
            className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <XIcon className="h-5 w-5" />
          </button>

          <div
            className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-md bg-mist"
            onClick={(e) => e.stopPropagation()}
          >
            <StudioPlaceholder src={active.src} alt={active.alt} />
          </div>
        </div>
      )}
    </>
  );
}
