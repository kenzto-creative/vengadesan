"use client";

import { useState } from "react";
import { experience, profile, type Role } from "@/lib/content";
import { play } from "@/lib/sfx";

const yearRange = (role: Role) => {
  const yFrom = role.from.match(/\d{4}/)?.[0] ?? role.from;
  const yTo = role.to.toLowerCase() === "present" ? "Present" : (role.to.match(/\d{4}/)?.[0] ?? role.to);
  return `${yFrom}…${yTo}`;
};

/**
 * Experience as a git-log terminal — each commit expands / collapses.
 */
export default function ExperienceList() {
  const [open, setOpen] = useState<number | null>(0);
  const commits = experience.length;

  return (
    <div className="mt-10 overflow-hidden rounded-[22px] border border-white/12 bg-ink-2/50 shadow-[0_0_0_1px_rgb(255_255_255_/_0.03),0_24px_80px_rgb(0_0_0_/_0.35)] md:mt-14">
      {/* Terminal header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-ink/60 px-4 py-3 md:px-5">
        <p className="mono text-[11px] tracking-[0.02em] text-dim sm:text-[12px]">
          <span className="text-faint">~/vengat</span>
          <span className="text-paper/70"> $ </span>
          <span className="text-paper">git log --career --reverse=false</span>
        </p>
        <p className="mono text-[11px] text-faint">
          {commits} commit{commits === 1 ? "" : "s"}
        </p>
      </div>

      <ol className="divide-y divide-white/8">
        {experience.map((role, i) => {
          const expanded = open === i;
          const id = `exp-${i}`;
          const isHead = i === 0;

          return (
            <li key={`${role.company}-${role.from}`}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => {
                  play("tick");
                  setOpen(expanded ? null : i);
                }}
                className="group grid w-full gap-4 px-4 py-6 text-left transition-colors hover:bg-white/[0.02] md:grid-cols-[minmax(180px,240px)_1fr] md:gap-8 md:px-6 md:py-7"
              >
                {/* Git metadata */}
                <div className="mono min-w-0 text-[12px] leading-relaxed">
                  <p>
                    <span className="text-faint">commit </span>
                    <span className="text-[#f0c14a]">{yearRange(role)}</span>
                  </p>
                  <p className="mt-1">
                    {isHead ? (
                      <span className="text-code">(HEAD → main)</span>
                    ) : (
                      <span className="text-faint">(history)</span>
                    )}
                  </p>
                  <p className="mt-1 text-dim">
                    Author: <span className="text-paper/80">{profile.name}</span>
                  </p>
                  <p className="mt-3 label text-faint transition-colors group-hover:text-edit">
                    {expanded ? "collapse −" : "expand +"}
                  </p>
                </div>

                {/* Role summary */}
                <div className="min-w-0">
                  <p className="text-[clamp(17px,2vw,22px)] font-medium tracking-[-0.02em] text-paper transition-colors group-hover:text-edit">
                    {role.title}
                    <span className="text-dim"> · {role.company}</span>
                  </p>
                  <p className="mt-1.5 mono text-[11px] text-faint">
                    {role.from} — {role.to}
                  </p>

                  <div
                    id={id}
                    role="region"
                    className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]"
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-5 space-y-2.5 pb-1">
                        {role.points.map((point) => (
                          <li
                            key={point}
                            className="grid grid-cols-[auto_1fr] gap-2.5 text-[14px] leading-relaxed text-dim md:text-[15px]"
                          >
                            <span aria-hidden className="mono pt-0.5 text-code">
                              +
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/10 bg-ink/50 px-4 py-2.5 md:px-5">
        <p className="mono text-[10px] tracking-[0.06em] text-faint">
          Ln {160 + commits}, Col 1 · UTF-8 · TSX
        </p>
        <p className="mono text-[10px] tracking-[0.06em] text-faint">career.log</p>
      </div>
    </div>
  );
}
