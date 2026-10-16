"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ProjectThumb from "@/components/work/ProjectThumb";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategoryId,
} from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { play } from "@/lib/sfx";

/**
 * Project listing with sliding category tabs + staggered card motion.
 */
export default function ProjectListing() {
  const [cat, setCat] = useState<ProjectCategoryId>("all");
  const listRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = useMemo(
    () => (cat === "all" ? projects : projects.filter((p) => p.category === cat)),
    [cat],
  );

  const placePill = (animate: boolean) => {
    const i = projectCategories.findIndex((c) => c.id === cat);
    const btn = btnRefs.current[i];
    const pill = pillRef.current;
    const rail = tabsRef.current;
    if (!btn || !pill || !rail) return;
    const r = rail.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    gsap.to(pill, {
      x: b.left - r.left,
      width: b.width,
      duration: animate ? 0.45 : 0,
      ease: "power3.out",
      overwrite: true,
    });
  };

  useLayoutEffect(() => {
    const pill = pillRef.current;
    const first = !pill?.dataset.ready;
    placePill(!first);
    if (pill) pill.dataset.ready = "1";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  useEffect(() => {
    const onResize = () => placePill(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>(".pl-card");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(cards, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { y: 36, opacity: 0, scale: 0.985 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: "power3.out", overwrite: true },
    );
  }, [filtered]);

  return (
    <div>
      {/* Category tabs — pill rail with sliding active marker */}
      <div className="mt-12 flex justify-start md:mt-16 md:justify-center">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Project categories"
          className="relative flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/15 p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="pointer-events-none absolute top-1.5 left-0 z-0 h-[calc(100%-12px)] rounded-full bg-paper"
            style={{ width: 64 }}
          />
          {projectCategories.map((c, i) => {
            const on = cat === c.id;
            const count =
              c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  if (c.id === cat) return;
                  play("tick");
                  setCat(c.id);
                }}
                className={`relative z-10 shrink-0 rounded-full px-4 py-2.5 label transition-colors duration-300 sm:px-5 ${
                  on ? "text-ink" : "text-dim hover:text-paper"
                }`}
              >
                {c.label}
                <span className={`ml-1.5 tabular ${on ? "text-ink/55" : "text-faint"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={listRef} className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ListingCard key={p.slug} project={p} index={projects.findIndex((x) => x.slug === p.slug)} visibleIndex={i} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-[15px] text-dim">No projects in this category yet.</p>
        )}
      </div>
    </div>
  );
}

function ListingCard({
  project: p,
  index,
  visibleIndex,
}: {
  project: Project;
  index: number;
  visibleIndex: number;
}) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="pl-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-ink-2/30 transition-[border-color,background,transform] duration-500 hover:-translate-y-1 hover:border-code/45 hover:bg-ink-2/55"
      style={{ transitionDelay: `${visibleIndex * 20}ms` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `${p.coverAccent}40` }}
      />

      <div className="relative p-3 pb-0 md:p-3.5 md:pb-0">
        <ProjectThumb
          src={p.thumb}
          alt={`${p.name} thumbnail`}
          accent={p.coverAccent}
          index={index}
          aspectClass="aspect-[4/3]"
          className="rounded-[18px]"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
        <p className="label text-code">
          {p.status ?? p.year}
          {p.featured ? " · Featured" : ""}
        </p>
        <h2 className="mt-2 flex-1 text-[clamp(20px,2vw,26px)] font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-code">
          {p.name}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/12 bg-ink/40 px-2.5 py-1 text-[10px] text-dim transition-colors duration-500 group-hover:border-code/30"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="label mt-5 inline-flex items-center gap-2 text-paper/70 transition duration-500 group-hover:translate-x-1 group-hover:text-code">
          View case <span className="arr">→</span>
        </span>
      </div>
    </Link>
  );
}
