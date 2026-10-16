"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { certifications } from "@/lib/content";
import { asset } from "@/lib/media";
import { play } from "@/lib/sfx";

/** Always learning — compact certificate rows + lightbox. */
export default function CertLearning() {
  const [open, setOpen] = useState<number | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % certifications.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + certifications.length) % certifications.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = open !== null ? certifications[open] : null;

  return (
    <>
      <RevealPanel>
        <ul className="divide-y divide-white/10">
          {certifications.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                onClick={() => {
                  play("tick");
                  setOpen(i);
                }}
                className="group grid w-full grid-cols-[96px_1fr] items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/[0.03] sm:grid-cols-[140px_1fr_auto] sm:gap-6 sm:px-5 sm:py-5 md:px-6"
                aria-label={`View ${c.title} full size`}
              >
                <span className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-white/10 bg-ink-2 sm:rounded-[14px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(c.thumb)}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className="min-w-0">
                  <span className="label text-edit">{c.status}</span>
                  <span className="mt-1.5 block truncate text-[15px] font-medium tracking-[-0.02em] text-paper transition-colors group-hover:text-edit sm:text-[17px] md:whitespace-normal">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-[12px] text-faint sm:text-[13px]">
                    {c.issuer} · {c.period}
                  </span>
                </span>

                <span className="hidden items-center gap-3 sm:flex">
                  <span className="display text-[28px] text-faint/50 transition-colors group-hover:text-edit/70" style={{ fontStretch: "48%" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label text-faint transition-colors group-hover:text-paper">
                    View <span className="arr">↗</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </RevealPanel>

      {active && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md md:p-8"
          onClick={() => setOpen(null)}
        >
          <p id={titleId} className="sr-only">
            {active.title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-[var(--gutter)] top-5 z-10 label rounded-full border border-white/20 bg-ink/60 px-4 py-2 text-paper transition hover:border-edit/50 hover:text-edit"
          >
            Close <span aria-hidden>×</span>
          </button>

          <div className="relative w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(active.thumb)}
              alt={active.title}
              className="mx-auto max-h-[min(78svh,820px)] w-auto max-w-full rounded-[20px] border border-white/12 object-contain shadow-[0_40px_120px_rgb(0_0_0_/_0.55)]"
            />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4 px-1">
              <div>
                <p className="label text-edit">{active.status}</p>
                <p className="mt-2 font-medium text-paper">{active.title}</p>
                <p className="mt-1 text-[14px] text-dim">
                  {active.issuer} · {active.period}
                </p>
              </div>
              {certifications.length > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="label rounded-full border border-white/15 px-4 py-2 text-dim transition hover:border-edit/40 hover:text-edit"
                    onClick={() =>
                      setOpen((i) => (i === null ? 0 : (i - 1 + certifications.length) % certifications.length))
                    }
                  >
                    ← Prev
                  </button>
                  <p className="label text-faint">
                    {String(open + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
                  </p>
                  <button
                    type="button"
                    className="label rounded-full border border-white/15 px-4 py-2 text-dim transition hover:border-edit/40 hover:text-edit"
                    onClick={() => setOpen((i) => (i === null ? 0 : (i + 1) % certifications.length))}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RevealPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[22px] border border-white/12 bg-ink-2/45 md:mt-10">
      <div className="flex items-center justify-between border-b border-white/10 bg-ink/50 px-4 py-2.5 md:px-5">
        <p className="mono text-[11px] tracking-[0.08em] text-dim">certificates.log</p>
        <p className="mono text-[10px] tracking-[0.06em] text-faint">
          {String(certifications.length).padStart(2, "0")} entries
        </p>
      </div>
      {children}
    </div>
  );
}
