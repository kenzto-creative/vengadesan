"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { softSkills } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { play } from "@/lib/sfx";

/** Soft skills — ProjectListing-style tabs + skill cards for the active category. */
export default function SoftSkills() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const group = softSkills[active] ?? softSkills[0];

  const placePill = (animate: boolean) => {
    const btn = btnRefs.current[active];
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
  }, [active]);

  useEffect(() => {
    const onResize = () => placePill(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-skill]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(cards, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out", overwrite: true },
    );
  }, [active]);

  return (
    <div className="mt-10 md:mt-12">
      {/* Tabs — same language as /work listing */}
      <div className="flex justify-start md:justify-center">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Soft skill categories"
          className="relative flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/15 p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="pointer-events-none absolute top-1.5 left-0 z-0 h-[calc(100%-12px)] rounded-full bg-paper"
            style={{ width: 72 }}
          />
          {softSkills.map((g, i) => {
            const on = i === active;
            return (
              <button
                key={g.label}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                id={`soft-tab-${i}`}
                aria-controls={`soft-panel-${i}`}
                onClick={() => {
                  if (i === active) return;
                  play("tick");
                  setActive(i);
                }}
                className={`relative z-10 shrink-0 rounded-full px-4 py-2.5 label transition-colors duration-300 sm:px-5 ${
                  on ? "text-ink" : "text-dim hover:text-paper"
                }`}
              >
                {g.label}
                <span className={`ml-1.5 tabular ${on ? "text-ink/55" : "text-faint"}`}>
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active category */}
      <div
        id={`soft-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`soft-tab-${active}`}
        className="mt-10 md:mt-14"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-8">
          <div>
            <p className="label text-faint">Category</p>
            <p className="mt-1 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em] text-paper">
              {group.label}
            </p>
          </div>
          <p className="mono text-[11px] tracking-[0.1em] text-faint">
            {String(group.items.length).padStart(2, "0")} / {String(softSkills.reduce((n, g) => n + g.items.length, 0)).padStart(2, "0")} craft
          </p>
        </div>

        <div ref={listRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {group.items.map((item, i) => (
            <article
              key={item.name}
              data-skill
              className="group flex h-full flex-col rounded-[20px] border border-white/10 bg-ink-2/40 p-5 transition-colors duration-500 hover:border-edit/35 hover:bg-ink-2/60 md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="mono text-[10px] tracking-[0.14em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-edit/70 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-5 text-[clamp(17px,1.7vw,20px)] font-medium tracking-[-0.025em] text-paper transition-colors group-hover:text-edit">
                {item.name}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-snug text-dim md:text-[14px]">{item.where}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
