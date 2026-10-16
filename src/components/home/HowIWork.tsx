"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/content";
import { asset } from "@/lib/media";
import { play } from "@/lib/sfx";
import { GradeZone, Reveal, Rise } from "@/components/ui";

/**
 * How I work — heading/body left, stage image + taps right.
 */
export default function HowIWork() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const step = processSteps[i];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const id = setInterval(() => {
      if (auto && visible.current) setI((n) => (n + 1) % processSteps.length);
    }, 3800);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [auto]);

  return (
    <GradeZone grade="code" id="process" className="relative px-[var(--gutter)] py-16 md:py-24">
      <div ref={root} className="mx-auto grid max-w-[1440px] items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left — index badge + title + lede */}
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
          <Reveal>
            <p className="label flex items-center gap-3">
              <span
                className="mono rounded-[4px] px-1.5 py-0.5 text-[10px] text-ink"
                style={{ background: "var(--accent)" }}
              >
                04
              </span>
              Process
            </p>
          </Reveal>
          <Rise
            as="h2"
            text="HOW I WORK"
            className="display mt-5 max-w-[10ch] text-[clamp(48px,7vw,96px)] leading-[0.92] text-paper"
            style={{ fontStretch: "46%" }}
          />
          <Reveal delay={80}>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-dim md:text-[16px]">
              A clear path from discovery to handoff — click a stage or let it play.
            </p>
          </Reveal>
        </div>

        {/* Right — image + stage taps */}
        <Reveal className="lg:col-span-7" delay={100}>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-ink-2/40">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
              <p className="label flex items-center gap-2 text-paper/80">
                <span className="rec !h-1.5 !w-1.5" />
                PRODUCT DESIGN PROCESS
              </p>
              <span className="label flex items-center gap-2 text-code">
                <span className="h-1.5 w-1.5 rounded-full bg-code" />
                LIVE
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
              {processSteps.map((s, n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={asset(s.src)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-700"
                  style={{
                    opacity: n === i ? 1 : 0,
                    transform: n === i ? "scale(1)" : "scale(1.03)",
                  }}
                  aria-hidden={n !== i}
                />
              ))}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="label text-code">
                  STEP {step.n} OF {String(processSteps.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[clamp(22px,3vw,34px)] font-medium tracking-[-0.03em] text-paper">
                  {step.title}
                </p>
              </div>
            </div>
          </div>

          <ol className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5" aria-label="Design process stages">
            {processSteps.map((s, n) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => {
                    setI(n);
                    setAuto(false);
                    play("tick");
                  }}
                  aria-current={n === i ? "step" : undefined}
                  className="relative w-full overflow-hidden rounded-[12px] border px-2.5 py-2.5 text-left transition-colors"
                  style={{
                    borderColor: n === i ? "var(--color-code)" : "rgb(255 255 255 / .1)",
                    background: n === i ? "rgb(63 216 201 / .08)" : "transparent",
                  }}
                >
                  <span className="mono block text-[10px] text-faint">{s.n}</span>
                  <span
                    className="mt-0.5 block truncate text-[12.5px]"
                    style={{ color: n === i ? "var(--color-paper)" : "var(--color-dim)" }}
                  >
                    {s.label}
                  </span>
                  {n === i && auto && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-code"
                      style={{ animation: "howBar 3.8s linear forwards" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <style>{`
        @keyframes howBar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      `}</style>
    </GradeZone>
  );
}
