"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import VideoModal from "@/components/VideoModal";
import { PlayIcon } from "@/components/icons";
import { PROJECTS, type Project, type ProjectCategory } from "@/data/projects";

const CATEGORIES: ("ALL" | ProjectCategory)[] = ["ALL", "FILM", "MOTION", "LIVE", "MEDIA"];

export default function PortfolioPage() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered =
    active === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Header />
      <main>
        <PageHero
          label="PORTFOLIO"
          title="포트폴리오"
          description="WIZ CNI가 만든 프로젝트를 확인해보세요."
        />

        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-md border px-4 py-2 text-xs font-bold tracking-wide transition-colors ${
                    active === cat
                      ? "border-accent bg-accent text-white"
                      : "border-line text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="group block text-left"
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
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
