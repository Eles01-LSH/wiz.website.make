"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import Reveal from "@/components/Reveal";
import { PlayIcon } from "@/components/icons";
import { PROJECTS, type Project } from "@/data/projects";

const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export default function SelectedProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="border-b border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-ink md:text-3xl">
              SELECTED PROJECTS
            </h2>
            <p className="mt-2 text-sm text-muted">OUR WORK SPEAKS FIRST.</p>
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            VIEW ALL PORTFOLIO
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 100}>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-mist">
                  <Image
                    src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                      <PlayIcon className="h-6 w-6" />
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink">{project.title}</h3>
                  <span className="text-xs font-medium text-muted">{project.year}</span>
                </div>
                <span className="mt-1 block text-xs font-semibold text-accent">
                  {project.category}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
