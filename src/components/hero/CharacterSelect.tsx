"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { classes, profile, type Grade } from "@/lib/content";
import { setGrade } from "@/lib/grade";
import { finePointer, scrollToTarget } from "@/lib/motion";
import { play } from "@/lib/sfx";
import AlphaVideo from "./AlphaVideo";
import GiantWord from "./GiantWord";

const WORDS = [
  { key: "neutral" as Grade, text: "VENGAT", color: "var(--color-paper)" },
  { key: "edit" as Grade, text: classes.edit.word, color: "var(--color-edit)" },
  { key: "code" as Grade, text: classes.code.word, color: "var(--color-code)" },
];

/** One look: WebP (src/srcSet) plus an AVIF srcset that browsers which can decode it prefer. */
export type Look = { src: string; srcSet?: string; avif?: string };

export type Portrait = {
  /** One cut-out per class, or one source graded three ways with SVG filters. */
  neutral: Look;
  edit?: Look;
  code?: Look;
  /** Neutral-state idle loop: stacked alpha, colour above the matte. `base` is the path without extension. */
  idle?: { base: string; w: number; h: number };
  /** The frame every look is cropped to. */
  w: number;
  h: number;
  alt: string;
};

/**
 * The opening screen: one human, two playable classes. Hover a side (or use
 * ← → and Enter) and the whole page re-grades — tungsten for the editor, teal
 * for the engineer. Scroll instead, and you get both.
 */
export default function CharacterSelect({ portrait }: { portrait: Portrait }) {
  const [active, setActive] = useState<Grade>("neutral");
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const graded = !portrait.edit; // single photo → grade it with filters

  // The editor and engineer looks are only seen on hover — a tap on a phone
  // goes straight to that class's page — so phones never download them, and
  // desktops fetch them once the page is idle (or on the first hover, if sooner).
  const [looksWanted, setLooksWanted] = useState(false);
  useEffect(() => {
    if (!finePointer()) return;
    const id = (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200)))(() => setLooksWanted(true));
    return () => (window.cancelIdleCallback ?? clearTimeout)(id as number);
  }, []);

  const current = useRef<Grade>("neutral");
  const choose = useCallback((g: Grade) => {
    if (g !== "neutral") setLooksWanted(true);
    if (current.current === g) return;
    current.current = g;
    play("tick");
    setActive(g);
  }, []);

  useEffect(() => {
    setGrade(active);
  }, [active]);

  // keyboard, only while the hero is the thing on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = true;
    const io = new IntersectionObserver(([e]) => (inView = e.intersectionRatio > 0.55), { threshold: [0, 0.55, 1] });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") choose("edit");
      else if (e.key === "ArrowRight") choose("code");
      else if (e.key === "Escape") choose("neutral");
      else if (e.key === "Enter" && t === document.body && current.current !== "neutral") {
        play("select");
        router.push(classes[current.current].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [router, choose]);

  // Entrance. The start states are held by CSS (html.intro, set by an inline
  // script before first paint) so nothing flashes. The figure rises on CSS from
  // first paint (globals.css, cutout-in); the word's wipe, the cards and the
  // fades start once the word has been fitted to the screen. Web Animations,
  // so the home page needs no animation library.
  const [fitted, setFitted] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!fitted || !el || !html.classList.contains("intro")) return;
    html.classList.add("intro-run");
    const expoOut = "cubic-bezier(0.16, 1, 0.3, 1)";
    const expoInOut = "cubic-bezier(0.87, 0, 0.13, 1)";
    const run: Animation[] = [];
    el.querySelectorAll<HTMLElement>(".gw").forEach((w) =>
      run.push(w.animate([{ clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }], { duration: 1250, delay: 50, easing: expoInOut, fill: "both" })),
    );
    el.querySelectorAll<HTMLElement>(".hero-card-in").forEach((c, i) =>
      run.push(
        c.animate([{ opacity: 0, transform: `translateX(${i ? 36 : -36}px)` }, { opacity: 1, transform: "none" }], {
          duration: 1100,
          delay: 700 + i * 80,
          easing: expoOut,
          fill: "both",
        }),
      ),
    );
    el.querySelectorAll<HTMLElement>(".hero-fade").forEach((f, i) =>
      run.push(f.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 900, delay: 850 + i * 60, easing: expoOut, fill: "both" })),
    );
    // html.intro must outlive every animation, the CSS figure's included, or
    // dropping it would cut one short; then the fills go and plain styles take over
    const figure = el.querySelector(".cutout")?.getAnimations() ?? [];
    let live = true;
    void Promise.allSettled([...run, ...figure].map((a) => a.finished)).then(() => {
      if (!live) return;
      html.classList.remove("intro", "intro-run");
      run.forEach((a) => a.cancel());
    });
    return () => {
      live = false;
    };
  }, [fitted]);

  const onMove = (e: React.PointerEvent) => {
    if (!finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    if (x < 0.4) choose("edit");
    else if (x > 0.6) choose("code");
  };

  const [idleReady, setIdleReady] = useState(false);
  const look = (g: Grade): Look => (g === "edit" ? portrait.edit : g === "code" ? portrait.code : undefined) ?? portrait.neutral;
  const sizes = `(max-width: 640px) ${Math.round((portrait.w / portrait.h) * 68)}vh, ${Math.round((portrait.w / portrait.h) * 88)}vh`;

  return (
    <section
      ref={root}
      id="select"
      onPointerMove={onMove}
      onPointerLeave={() => finePointer() && choose("neutral")}
      className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-ink"
      data-active={active}
    >
      {graded && <DuotoneFilters />}

      {/* stage light: one pool per class, the chosen one comes up */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-[20%] top-[10%] h-[110%] w-[75%] rounded-full blur-[90px] transition-opacity duration-700"
          style={{ background: "radial-gradient(closest-side, rgb(255 106 61 / .32), transparent)", opacity: active === "edit" ? 1 : active === "neutral" ? 0.35 : 0.08 }}
        />
        <div
          className="absolute -right-[20%] top-[10%] h-[110%] w-[75%] rounded-full blur-[90px] transition-opacity duration-700"
          style={{ background: "radial-gradient(closest-side, rgb(63 216 201 / .26), transparent)", opacity: active === "code" ? 1 : active === "neutral" ? 0.32 : 0.08 }}
        />
      </div>

      {/* the word, behind the subject — nudged down so VENGAT / ABOUT / WORK sit lower */}
      <div className="absolute inset-x-[var(--gutter)] top-[17svh] text-[min(58svh,40vw)] max-sm:top-[23svh] max-sm:text-[40vw]">
        <GiantWord words={WORDS} active={active} onFit={() => setFitted(true)} />
      </div>

      {/* subject */}
      <figure
        className="cutout pointer-events-none absolute bottom-0 left-1/2 h-[86svh] -translate-x-1/2 max-sm:bottom-[9svh] max-sm:h-[66svh]"
        style={{ aspectRatio: `${portrait.w} / ${portrait.h}` }}
      >
        {(["neutral", "edit", "code"] as Grade[]).map((g) => {
          const l = look(g);
          const load = g === "neutral" || looksWanted;
          return (
            <picture key={g}>
              {load && l.avif && <source type="image/avif" srcSet={l.avif} sizes={l.srcSet ? sizes : undefined} />}
              <img
                src={load ? l.src : undefined}
                srcSet={load ? l.srcSet : undefined}
                sizes={l.srcSet ? sizes : undefined}
                alt={g === "neutral" ? portrait.alt : ""}
                aria-hidden={g !== "neutral"}
                width={portrait.w}
                height={portrait.h}
                fetchPriority={g === "neutral" ? "high" : "low"}
                decoding="async"
                data-on={active === g}
                className={`${graded ? "" : "look "}absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-500`}
                style={
                  {
                    // once the idle loop is drawing, the neutral poster steps aside
                    opacity: active === g && !(g === "neutral" && idleReady) ? 1 : 0,
                    // no mask here: a mask would clip the rim-light glow into a box.
                    // The stage floor below fades the lower body instead.
                    filter: graded ? FILTER[g] : VARIANT_FILTER(g),
                    "--pick": PICK_FROM(g),
                  } as React.CSSProperties
                }
              />
            </picture>
          );
        })}
        {portrait.idle && (
          <AlphaVideo
            base={portrait.idle.base}
            width={portrait.idle.w}
            height={portrait.idle.h}
            load={fitted}
            playing={active === "neutral"}
            picked={active === "neutral"}
            onReady={() => setIdleReady(true)}
            className="look absolute inset-0 h-full w-full transition-opacity duration-500"
            style={{ opacity: active === "neutral" ? 1 : 0, filter: VARIANT_FILTER("neutral"), "--pick": PICK_FROM("neutral") } as React.CSSProperties}
          />
        )}
      </figure>

      {/* floor: letters and subject sink into the stage — soft fade only, no solid black slab */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
      />

      {/* class overlays */}
      <Letterbox on={active === "edit"} />
      <Scanlines on={active === "code"} />

      {/* top line */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+2svh)] flex justify-center px-[var(--gutter)]">
        <p className="label flex items-center gap-3 text-center">
          <span className="hidden h-px w-10 bg-white/20 sm:block" />
          <span>
            Choose your path · <span className="text-paper">My Role</span> or <span className="text-paper">Projects</span>
          </span>
          <span className="hidden h-px w-10 bg-white/20 sm:block" />
        </p>
      </div>

      {/* class cards */}
      <ClassCard side="edit" active={active} onFocus={() => choose("edit")} />
      <ClassCard side="code" active={active} onFocus={() => choose("code")} />

      {/* mobile stack: identity above the two chooser cards — no overlap */}
      <div className="hero-fade absolute inset-x-[var(--gutter)] bottom-[max(18px,env(safe-area-inset-bottom))] z-20 flex flex-col gap-3 sm:hidden">
        <div className="px-1 text-center">
          <h1 className="text-[12px] font-normal leading-snug text-dim">
            <span className="text-paper">
              {profile.name} — product designer (UX/UI).
            </span>
            <br />
            {profile.location} — working worldwide.
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {(["edit", "code"] as const).map((k) => (
            <Link
              key={k}
              href={classes[k].href}
              onPointerDown={() => choose(k)}
              className="flex flex-col rounded-2xl border border-white/10 bg-ink/70 p-3.5 backdrop-blur"
              style={{ borderColor: active === k ? `var(--color-${k})` : undefined }}
            >
              <span className="label-sm" style={{ color: `var(--color-${k})` }}>
                {classes[k].player} · select
              </span>
              <span className="display mt-1 text-[34px]" style={{ fontStretch: "48%" }}>
                {classes[k].title}
              </span>
              <span className="mt-1 text-[12px] leading-snug text-dim">{classes[k].line}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* desktop identity + keys — bottom-center between the About / Projects CTAs */}
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-[max(28px,4.5svh)] z-20 hidden flex-col items-center justify-end gap-2.5 px-[var(--gutter)] text-center sm:flex">
        <h1 className="max-w-[28ch] text-[13px] font-normal leading-snug text-dim lg:max-w-[40ch]">
          <span className="text-paper">
            {profile.name} — product designer (UX/UI).
          </span>
          <br />
          {profile.location} — working worldwide.
        </h1>
        <p className="label hidden items-center gap-2 md:flex">
          <span className="kbd">←</span>
          <span className="kbd">→</span>
          choose
          <span className="kbd ml-1">↵</span>
          enter
          <span className="mx-1 text-faint">·</span>
          <button type="button" onClick={() => scrollToTarget("#both", -10)} className="pointer-events-auto transition-colors hover:text-paper">
            scroll for both ↓
          </button>
        </p>
      </div>
    </section>
  );
}

const FILTER: Record<Grade, string> = {
  neutral:
    "grayscale(1) contrast(1.12) brightness(.94) drop-shadow(-12px 0 20px rgb(255 106 61 / .15)) drop-shadow(12px 0 20px rgb(63 216 201 / .13))",
  edit: "url(#ks-duo-edit) contrast(1.06) drop-shadow(-16px -4px 30px rgb(255 106 61 / .45))",
  code: "url(#ks-duo-code) contrast(1.06) drop-shadow(16px -4px 30px rgb(63 216 201 / .4))",
};

// With one image per class (the 3D character), each look carries its own
// lighting; the stage only adds rim light — both colours at rest, one per class.
const RIM: Record<Grade, string> = {
  neutral: "drop-shadow(-14px 0 24px rgb(255 106 61 / .2)) drop-shadow(14px 0 24px rgb(63 216 201 / .18))",
  edit: "drop-shadow(-16px -4px 30px rgb(255 106 61 / .42))",
  code: "drop-shadow(16px -4px 30px rgb(63 216 201 / .38))",
};
// brightness(1) first, so the pick flash (brightness 1.45 → 1) interpolates
// against an identical function list and the rims never drop out mid-flash.
const VARIANT_FILTER = (g: Grade) => `brightness(1) ${RIM[g]}`;
const PICK_FROM = (g: Grade) => `brightness(1.45) ${RIM[g]}`;

/** Two duotones, mapped from luminance: the grade, literally. */
function DuotoneFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <filter id="ks-duo-edit" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.035 0.55 1" />
          <feFuncG type="table" tableValues="0.02 0.2 0.78" />
          <feFuncB type="table" tableValues="0.03 0.1 0.58" />
        </feComponentTransfer>
      </filter>
      <filter id="ks-duo-code" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.015 0.08 0.72" />
          <feFuncG type="table" tableValues="0.035 0.42 1" />
          <feFuncB type="table" tableValues="0.04 0.4 0.94" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

function ClassCard({ side, active, onFocus }: { side: "edit" | "code"; active: Grade; onFocus: () => void }) {
  const c = classes[side];
  const on = active === side;
  const off = active !== "neutral" && !on;
  const left = side === "edit";
  return (
    <div
      className={`hero-card absolute bottom-[max(28px,4.5svh)] z-20 hidden w-[min(330px,27vw)] sm:block ${left ? "left-[var(--gutter)]" : "right-[var(--gutter)] text-right"}`}
      style={{ opacity: off ? 0.32 : 1, transition: "opacity .5s" }}
    >
      <div className="hero-card-in">
      <p className={`label-sm flex items-center gap-2 ${left ? "" : "justify-end"}`} style={{ color: `var(--color-${side})` }}>
        {!left && <span className="opacity-70">select ▸</span>}
        <span className="rounded-[4px] px-1.5 py-0.5 text-ink" style={{ background: `var(--color-${side})` }}>
          {c.player}
        </span>
        {left && <span className="opacity-70">◂ select</span>}
      </p>
      <h2 className="display mt-3 text-[clamp(40px,4vw,64px)]" style={{ fontStretch: "46%" }}>
        {c.title}
      </h2>
      <p className="mt-3 text-[14px] leading-snug text-paper/85">{c.line}</p>

      <div className={`mt-4 flex items-end gap-3 [@media(max-height:860px)]:hidden ${left ? "" : "flex-row-reverse"}`}>
        {left ? <MiniReel playing={on} /> : <MiniTerminal typing={on} />}
        <dl className={`grid flex-1 gap-1.5 ${left ? "" : "text-right"}`}>
          {c.attributes.map(([k, v]) => (
            <div key={k} className="leading-tight">
              <dt className="label-sm text-faint">{k}</dt>
              <dd className="text-[12.5px] text-paper/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Link
        href={c.href}
        onFocus={onFocus}
        onClick={() => play("select")}
        className={`btn mt-5 ${on ? "" : "btn-ghost"}`}
        style={on ? { background: `var(--color-${side})` } : undefined}
        transitionTypes={["cut"]}
      >
        {c.cta} <span className="arr">→</span>
      </Link>
      </div>
    </div>
  );
}

function MiniReel({ playing }: { playing: boolean }) {
  return (
    <div
      className="flex w-[78px] shrink-0 flex-col justify-between rounded-[12px] border border-white/10 bg-black/60 p-2.5 text-left transition-colors"
      style={{ borderColor: playing ? "var(--color-edit)" : undefined }}
    >
      <p className="label-sm text-edit">ID</p>
      <p className="display text-[22px] leading-none text-paper" style={{ fontStretch: "48%" }}>
        VR
      </p>
      <p className="text-[9px] leading-snug text-dim">My Role · bio & craft</p>
    </div>
  );
}

const SHIPPED = ["educraft/", "kenso/", "fresh-market/", "the-stay/"];

function MiniTerminal({ typing }: { typing: boolean }) {
  return (
    <div className="w-[132px] shrink-0 rounded-[12px] border border-white/10 bg-black/60 p-2.5 text-left font-mono text-[10px] leading-[1.55]">
      <p className="text-faint">
        <span className="text-code">~</span> ls shipped
      </p>
      {SHIPPED.map((s, i) => (
        <p
          key={s}
          className="text-paper/85 transition-all duration-500"
          style={{ opacity: typing ? 1 : 0.35, transitionDelay: typing ? `${i * 110}ms` : "0ms" }}
        >
          {s}
        </p>
      ))}
      <p className="text-faint">
        <span className="text-code">~</span> <span className={typing ? "caret" : ""} />
      </p>
    </div>
  );
}

function Letterbox({ on }: { on: boolean }) {
  // Top letterbox only — viewfinder corners / REC chrome removed.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
      <div
        className="absolute inset-x-0 top-0 h-[6svh] bg-black transition-transform duration-700 ease-[var(--ease-in-out-cut)]"
        style={{ transform: on ? "none" : "translateY(-101%)" }}
      />
    </div>
  );
}

function Scanlines({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
      style={{
        opacity: on ? 1 : 0,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgb(63 216 201 / .045) 0 1px, transparent 1px 4px), linear-gradient(90deg, rgb(63 216 201 / .05) 1px, transparent 1px)",
        backgroundSize: "100% 4px, 80px 100%",
      }}
    />
  );
}
