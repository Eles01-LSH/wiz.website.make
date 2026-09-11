"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import VideoModal from "@/components/VideoModal";
import { ChevronDownIcon, PlayIcon } from "@/components/icons";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_ROLES,
  getCategoryLabel,
  sortByYearDesc,
  type Project,
  type ProjectCategory,
  type ProjectRole,
} from "@/data/projects";

const ALL = "ALL" as const;
const PAGE_SIZE = 12;

const CATEGORY_OPTIONS: { value: ProjectCategory | typeof ALL; label: string }[] = [
  { value: ALL, label: "전체" },
  ...PROJECT_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
];

const ROLE_OPTIONS: { value: ProjectRole | typeof ALL; label: string }[] = [
  { value: ALL, label: "전체" },
  ...PROJECT_ROLES.map((r) => ({ value: r.value, label: r.label })),
];

function FilterDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-xs font-bold tracking-wide transition-colors ${
          value !== ALL
            ? "border-accent text-accent"
            : "border-line text-ink hover:border-accent hover:text-accent"
        }`}
      >
        <span className="text-muted">{label}</span>
        <span>{selected?.label ?? "전체"}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-80 w-64 overflow-y-auto rounded-md border border-line bg-paper py-2 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                value === opt.value ? "text-accent" : "text-ink hover:bg-mist"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const [category, setCategory] = useState<ProjectCategory | typeof ALL>(ALL);
  const [role, setRole] = useState<ProjectRole | typeof ALL>(ALL);
  const [page, setPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({ category, role });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  if (appliedFilters.category !== category || appliedFilters.role !== role) {
    setAppliedFilters({ category, role });
    setPage(1);
  }

  const filtered = useMemo(
    () =>
      sortByYearDesc(
        PROJECTS.filter(
          (p) =>
            (category === ALL || p.category === category) && (role === ALL || p.role === role)
        )
      ),
    [category, role]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              <FilterDropdown
                label="CATEGORY"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={setCategory}
              />
              <FilterDropdown label="ROLE" options={ROLE_OPTIONS} value={role} onChange={setRole} />
            </div>

            {filtered.length === 0 ? (
              <p className="mt-16 text-center text-sm text-muted">
                조건에 맞는 프로젝트가 없습니다.
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((project) => (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="group block text-left"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-mist">
                      <ProjectThumbnail youtubeId={project.youtubeId} alt={project.title} />
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
                    {project.category && (
                      <span className="mt-1 block text-xs font-semibold text-accent">
                        {getCategoryLabel(project.category)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-md border border-line px-3 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                      p === page
                        ? "bg-accent text-white"
                        : "border border-line text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md border border-line px-3 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
