"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { aboutDesigner } from "@/lib/content";
import { gsap, loadScrollTrigger } from "@/lib/gsap";

const TRACKS = aboutDesigner.territory.cards.map((c, i) => ({
  ...c,
  track: `V${i + 1}` as const,
}));

const OUT = {
  track: "OUT",
  title: "One mindset",
  body: "All four tracks held together — clarity, interface, system, and delivery as one practice.",
  tags: "PRODUCT DESIGN",
  icon: "clarity" as const,
};

function LayerFace({
  track,
  title,
  tags,
  active,
}: {
  track: string;
  title: string;
  tags: string;
  active?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[14px] border bg-ink-2/90 ${
        active ? "border-edit" : "border-edit/45"
      }`}
      style={{ boxShadow: active ? "0 0 40px -8px rgb(255 106 61 / .45)" : "0 24px 60px -28px rgb(0 0 0 / .75)" }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="mono rounded px-1.5 py-0.5 text-[10px] text-ink" style={{ background: "var(--color-edit)" }}>
          {track}
        </span>
        <span className="mono text-[9px] tracking-[0.12em] text-faint">{tags.split("·")[0]?.trim()}</span>
      </div>
      <div className="relative flex flex-1 flex-col p-3">
        <div className="mb-2 grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((n) => (
            <span key={n} className="h-8 rounded-md border border-white/10 bg-white/[0.03]" />
          ))}
        </div>
        <div className="mb-2 h-16 rounded-md border border-white/10 bg-gradient-to-br from-edit/20 via-transparent to-code/15" />
        <div className="mt-auto space-y-1">
          <span className="block h-1.5 w-3/4 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
        <p className="mt-3 text-[12px] font-medium leading-tight tracking-[-0.02em] text-paper">{title}</p>
      </div>
    </div>
  );
}

/**
 * My Design Territory — exploded tracks layout (same structure as the
 * “one frame, five tracks” reference), adapted for product-design craft.
 */
export default function TerritoryExploded() {
  const root = useRef<HTMLDivElement>(null);
  const { territory } = aboutDesigner;
  const n = TRACKS.length;
  const [solo, setSolo] = useState<number | null>(null);

  useGSAP(
    () => {
      let mm: gsap.MatchMedia | null = null;
      let gone = false;
      void loadScrollTrigger().then(() => {
        if (gone) return;
        mm = gsap.matchMedia(root.current ?? undefined);
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const layers = gsap.utils.toArray<HTMLElement>(".tr-layer");
          const items = gsap.utils.toArray<HTMLElement>(".tr-item");
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: { trigger: ".tr-pin", start: "top top", end: "+=260%", scrub: 0.8, pin: true },
          });
          tl.to(".tr-final", { opacity: 0, duration: 0.15 }, 0.08)
            .to(".tr-deck", { rotateY: -30, rotateX: 9, duration: 0.4 }, 0.06)
            .to(
              layers,
              {
                z: (i: number) => (i - (n - 1) / 2) * 110,
                x: (i: number) => (i - (n - 1) / 2) * 36,
                duration: 0.4,
              },
              0.06,
            )
            .fromTo(".tr-list", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.15 }, 0.3);

          const step = 0.18;
          layers.forEach((_, i) => {
            const at = 0.48 + i * step;
            tl.to(items, { opacity: (k: number) => (k === i ? 1 : 0.32), duration: 0.05 }, at).to(
              layers,
              { opacity: (k: number) => (k === i || k === 0 ? 1 : 0.38), duration: 0.05 },
              at,
            );
          });
          const close = 0.48 + n * step + 0.06;
          tl.to(items, { opacity: 1, duration: 0.05 }, close)
            .to(layers, { opacity: 1, z: 0, x: 0, duration: 0.28 }, close)
            .to(".tr-deck", { rotateY: 0, rotateX: 0, duration: 0.28 }, close)
            .to(".tr-list", { opacity: 0, duration: 0.12 }, close + 0.06)
            .to(".tr-final", { opacity: 1, duration: 0.1 }, close + 0.22);
          return () => tl.scrollTrigger?.kill();
        });
      });
      return () => {
        gone = true;
        mm?.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* desktop: pinned 3D */}
      <div className="tr-pin relative hidden h-[100svh] items-center lg:flex">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 items-center gap-6">
          <div className="col-span-3">
            <p className="label text-faint">{territory.label}</p>
            <h2 className="display mt-4 text-[clamp(44px,4.8vw,84px)] uppercase leading-[0.92]" style={{ fontStretch: "44%" }}>
              Different problems. One design mindset.
            </h2>
            <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-dim md:text-[16px]">
              Keep scrolling. Four design tracks pulled apart — from clarifying complex workflows to shipping with engineering — so you can see how the craft stacks.
            </p>
            <p className="mt-10 flex items-center gap-2 mono text-[10px] tracking-[0.12em] text-faint">
              <span className="rec !h-1.5 !w-1.5" />
              00:00:05:08 REC · 30 FPS
            </p>
          </div>

          <div className="col-span-6 flex justify-center" style={{ perspective: "1700px" }}>
            <div className="tr-deck relative aspect-[9/16] h-[min(70svh,640px)]" style={{ transformStyle: "preserve-3d" }}>
              {TRACKS.map((l, i) => (
                <figure
                  key={l.track}
                  className="tr-layer absolute inset-0"
                  style={{ zIndex: i, transform: `translateZ(${i * 2}px)` }}
                >
                  <LayerFace track={l.track} title={l.title} tags={l.tags} />
                </figure>
              ))}
              <figure className="tr-final absolute inset-0" style={{ transform: `translateZ(${n * 2}px)` }}>
                <LayerFace track={OUT.track} title={OUT.title} tags={OUT.tags} active />
              </figure>
            </div>
          </div>

          <ol className="tr-list col-span-3 space-y-5 opacity-0">
            {TRACKS.map((l) => (
              <li key={l.track} className="tr-item">
                <p className="flex items-center gap-2">
                  <span className="mono rounded px-1.5 py-0.5 text-[10px] text-ink" style={{ background: "var(--color-edit)" }}>
                    {l.track}
                  </span>
                  <span className="text-[15px] font-semibold text-paper">{l.title}</span>
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-dim">{l.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* tablet / mobile */}
      <div className="lg:hidden">
        <p className="label text-faint">{territory.label}</p>
        <h2 className="display mt-4 text-[clamp(40px,11vw,72px)] uppercase leading-[0.92]" style={{ fontStretch: "46%" }}>
          Different problems. One design mindset.
        </h2>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-dim">
          Four design tracks — swipe to solo each one, then see how they hold as one mindset.
        </p>

        <div className="mt-8 flex justify-center" style={{ perspective: "900px" }}>
          <div
            className="relative aspect-[9/16] w-[min(70vw,280px)]"
            style={{
              transformStyle: "preserve-3d",
              transform: solo === null ? "rotateY(-22deg) rotateX(8deg)" : "none",
              transition: "transform 0.5s var(--ease-out-expo)",
            }}
          >
            {(solo === null ? TRACKS : [TRACKS[solo]]).map((l, i) => (
              <figure
                key={l.track}
                className="absolute inset-0"
                style={{
                  transform: solo === null ? `translate3d(${i * 18}px, ${-i * 14}px, ${i * 28}px)` : undefined,
                  zIndex: solo === null ? i : 1,
                }}
              >
                <LayerFace track={l.track} title={l.title} tags={l.tags} active={solo === i} />
              </figure>
            ))}
          </div>
        </div>

        <ol className="mt-8 space-y-2">
          {TRACKS.map((l, i) => {
            const on = solo === i;
            return (
              <li key={l.track}>
                <button
                  type="button"
                  onClick={() => setSolo(on ? null : i)}
                  className={`w-full rounded-[14px] border px-4 py-3.5 text-left transition-colors ${
                    on ? "border-edit/50 bg-edit/10" : "border-white/10 bg-ink-2/40 hover:border-white/20"
                  }`}
                >
                  <p className="flex items-center gap-2">
                    <span className="mono rounded px-1.5 py-0.5 text-[10px] text-ink" style={{ background: "var(--color-edit)" }}>
                      {l.track}
                    </span>
                    <span className="text-[15px] font-semibold text-paper">{l.title}</span>
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-dim">{l.body}</p>
                </button>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 flex items-center gap-2 mono text-[10px] tracking-[0.12em] text-faint">
          <span className="rec !h-1.5 !w-1.5" />
          00:00:05:08 REC · 30 FPS
        </p>
      </div>
    </div>
  );
}
