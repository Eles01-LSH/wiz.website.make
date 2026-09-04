"use client";

import { useEffect } from "react";
import type { Project } from "@/data/projects";

type VideoModalProps = {
  project: Project | null;
  onClose: () => void;
};

const FIELDS: { label: string; key: keyof Project }[] = [
  { label: "CLIENT", key: "client" },
  { label: "YEAR", key: "year" },
  { label: "CATEGORY", key: "categoryLabel" },
  { label: "DURATION", key: "duration" },
  { label: "ROLE", key: "role" },
];

export default function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!project) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
      >
        ×
      </button>

      <div
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video w-full bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
            title={project.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-xl font-black text-ink md:text-2xl">{project.title}</h3>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-5">
            {FIELDS.map((field) => (
              <div key={field.label}>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted">
                  {field.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">
                  {project[field.key]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted">
              PROJECT DESCRIPTION
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
