"use client";

import { useEffect, useId, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { play } from "@/lib/sfx";

/** Opens a readable full-page resume dialog with download. */
export default function ResumePreview({ className = "btn btn-ghost" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const href = profile.resume;
  const fileName = href.split("/").pop() ?? "Vengadesan-R-Resume.pdf";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          play("select");
          setOpen(true);
        }}
      >
        Resume <span className="arr">↓</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-3 backdrop-blur-md md:p-6"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-[var(--gutter)] top-4 z-10 label rounded-full border border-white/20 bg-ink/60 px-4 py-2 text-paper transition hover:border-code/50 hover:text-code md:top-5"
          >
            Close <span aria-hidden>×</span>
          </button>

          <div
            className="relative flex h-[min(92svh,960px)] w-full max-w-[980px] flex-col overflow-hidden rounded-[20px] border border-white/12 bg-ink-2 shadow-[0_40px_120px_rgb(0_0_0_/_0.55)] md:rounded-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p id={titleId} className="label text-code">
                  Resume
                </p>
                <p className="mt-1 truncate text-[14px] text-paper/90">{profile.name}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-full border border-white/15 px-3.5 py-2 text-dim transition hover:border-code/40 hover:text-code"
                >
                  Open tab <span className="arr">↗</span>
                </a>
                <a
                  href={href}
                  download={fileName}
                  className="btn"
                  style={{ background: "var(--color-paper)", padding: "0.55rem 1.1rem", fontSize: "12px" }}
                >
                  Download <span className="arr">↓</span>
                </a>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-[#1a1a1c]">
              <iframe
                title={`${profile.name} resume`}
                src={`${href}#view=FitH`}
                className="h-full w-full border-0 bg-paper"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
