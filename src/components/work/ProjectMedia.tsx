"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { asset } from "@/lib/media";
import Sources from "@/components/Sources";
import { Reveal } from "@/components/ui";

type Lightbox = { kind: "video" } | { kind: "image"; index: number } | null;

function LightboxShell({
  project,
  gallery,
  open,
  onClose,
  onImageNav,
}: {
  project: Project;
  gallery: string[];
  open: Lightbox;
  onClose: () => void;
  onImageNav: (dir: number) => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (open.kind === "image") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onImageNav(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onImageNav(-1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onImageNav]);

  useEffect(() => {
    if (open?.kind === "video") {
      void videoRef.current?.play().catch(() => {});
    }
  }, [open]);

  if (!open) return null;

  const imageIndex = open.kind === "image" ? open.index : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {open.kind === "video" ? `${project.name} video` : `${project.name} frame ${imageIndex + 1}`}
      </p>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-[var(--gutter)] top-5 z-10 label rounded-full border border-white/20 bg-ink/60 px-4 py-2 text-paper transition hover:border-code/50 hover:text-code"
      >
        Close <span aria-hidden>×</span>
      </button>

      <div
        className="relative max-h-[min(90svh,920px)] w-full max-w-[1280px]"
        onClick={(e) => e.stopPropagation()}
      >
        {open.kind === "video" && project.video ? (
          <div className="overflow-hidden rounded-[20px] border border-white/12 bg-ink-2 shadow-[0_40px_120px_rgb(0_0_0_/_0.55)]">
            <video
              ref={videoRef}
              className="aspect-video max-h-[min(82svh,860px)] w-full bg-black object-contain"
              controls
              playsInline
              autoPlay
              loop
              preload="metadata"
              poster={asset(project.video.poster)}
            >
              <Sources base={project.video.base} />
            </video>
          </div>
        ) : open.kind === "image" ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(gallery[imageIndex])}
              alt=""
              className="mx-auto max-h-[min(82svh,860px)] w-auto max-w-full rounded-[20px] border border-white/12 object-contain shadow-[0_40px_120px_rgb(0_0_0_/_0.55)]"
            />
            {gallery.length > 1 && (
              <div className="mt-5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  className="label rounded-full border border-white/15 px-4 py-2 text-dim transition hover:border-code/40 hover:text-code"
                  onClick={() => onImageNav(-1)}
                >
                  ← Prev
                </button>
                <p className="label text-faint">
                  {String(imageIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </p>
                <button
                  type="button"
                  className="label rounded-full border border-white/15 px-4 py-2 text-dim transition hover:border-code/40 hover:text-code"
                  onClick={() => onImageNav(1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Contained motion reel — matches studio panel language. */
export function ProjectMotion({ project }: { project: Project }) {
  const [open, setOpen] = useState<Lightbox>(null);

  if (!project.video) return null;

  return (
    <section className="px-[var(--gutter)] py-10 md:py-14">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-code">Motion</p>
              <h2 className="mt-2 text-[clamp(22px,2.6vw,32px)] font-medium tracking-[-0.03em]">In motion</h2>
            </div>
            <p className="max-w-[36ch] text-[14px] text-dim">Click the reel to open a full preview.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen({ kind: "video" })}
            className="group relative mt-6 block w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-ink-2 text-left md:mt-8 md:rounded-[24px]"
            aria-label={`Open ${project.name} video`}
          >
            <div className="relative aspect-video w-full md:aspect-[21/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(project.video.poster)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />
              <video
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={asset(project.video.poster)}
                aria-hidden
                tabIndex={-1}
              >
                <Sources base={project.video.base} />
              </video>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20 transition duration-500 group-hover:from-ink/35"
              />
              <span className="absolute left-5 top-5 label flex items-center gap-2 text-paper/80 md:left-6 md:top-6">
                <span className="rec !h-1.5 !w-1.5" /> LIVE PREVIEW
              </span>
              <span className="absolute bottom-5 left-5 label rounded-full border border-white/20 bg-ink/50 px-3 py-1.5 text-paper/85 backdrop-blur-sm transition group-hover:border-code/50 group-hover:text-code md:bottom-6 md:left-6">
                Expand <span className="arr">↗</span>
              </span>
            </div>
          </button>
        </Reveal>
      </div>

      <LightboxShell project={project} gallery={[]} open={open} onClose={() => setOpen(null)} onImageNav={() => {}} />
    </section>
  );
}

/** Selected frames — static grid gallery with lightbox. */
export function ProjectFrames({ project }: { project: Project }) {
  const [open, setOpen] = useState<Lightbox>(null);
  const gallery = project.gallery?.length ? project.gallery : [project.thumb];

  return (
    <section className="px-[var(--gutter)] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="label text-code">Frames</p>
          <h2 className="mt-3 text-[clamp(26px,3vw,40px)] font-medium tracking-[-0.035em]">Selected frames</h2>
          <p className="mt-3 max-w-[48ch] text-[15px] text-dim">Click any frame to expand.</p>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <li key={`${src}-${i}`} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setOpen({ kind: "image", index: i })}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[18px] bg-ink-2 text-left md:rounded-[20px]"
                aria-label={`Open frame ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(src)}
                  alt=""
                  className={`w-full object-cover transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${
                    i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute bottom-3 left-3 label rounded-full border border-white/15 bg-ink/55 px-2.5 py-1 text-paper/80 backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <LightboxShell
        project={project}
        gallery={gallery}
        open={open}
        onClose={() => setOpen(null)}
        onImageNav={(dir) => {
          setOpen((cur) => {
            if (!cur || cur.kind !== "image") return cur;
            return { kind: "image", index: (cur.index + dir + gallery.length) % gallery.length };
          });
        }}
      />
    </section>
  );
}
