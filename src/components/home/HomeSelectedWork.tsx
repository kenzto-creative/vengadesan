"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { projects, type Project } from "@/lib/content";
import { asset } from "@/lib/media";
import { gsap, loadScrollTrigger } from "@/lib/gsap";
import { play } from "@/lib/sfx";
import { GradeZone, Reveal, Rise, SectionHead } from "@/components/ui";

const featured = projects.filter((p) => p.featured);
const lead = featured[0];
const rest = featured.slice(1);

/**
 * Home “Selected work” — cinematic lead case + horizontal reel.
 * Scroll-driven motion, not the old row list.
 */
export default function HomeSelectedWork() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let killed = false;
      let mm: gsap.MatchMedia | null = null;

      void loadScrollTrigger().then((ScrollTrigger) => {
        if (killed || !root.current) return;
        mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const leadEl = root.current!.querySelector<HTMLElement>(".sw-lead");
          const leadImg = root.current!.querySelector<HTMLElement>(".sw-lead-img");
          const leadMeta = root.current!.querySelectorAll<HTMLElement>(".sw-lead-meta > .sw-lead-block");
          const cards = gsap.utils.toArray<HTMLElement>(".sw-card");

          if (leadEl && leadImg) {
            gsap.set(leadImg, { clipPath: "inset(12% 8% 12% 8% round 24px)", scale: 1.08 });
            gsap.set(leadMeta, { y: 28, opacity: 0 });
            const tl = gsap.timeline({
              scrollTrigger: { trigger: leadEl, start: "top 78%", toggleActions: "play none none none" },
            });
            tl.to(leadImg, { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, duration: 1.05, ease: "power3.out" }, 0).to(
              leadMeta,
              { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out" },
              0.25,
            );
          }

          if (cards.length) {
            gsap.set(cards, { y: 48, opacity: 0, rotate: 1.2 });
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: rail.current, start: "top 82%", toggleActions: "play none none none" },
            });
          }

          // desktop: scrub the reel sideways while the section scrolls past
          if (rail.current && cards.length > 1 && window.matchMedia("(min-width: 768px)").matches) {
            gsap.to(rail.current, {
              x: () => Math.min(0, window.innerWidth - rail.current!.scrollWidth - 64),
              ease: "none",
              scrollTrigger: {
                trigger: rail.current.parentElement,
                start: "top 65%",
                end: "bottom 25%",
                scrub: 1.2,
              },
            });
          }

          return () => ScrollTrigger.getAll().forEach((t) => t.kill());
        });
      });

      return () => {
        killed = true;
        mm?.revert();
      };
    },
    { scope: root },
  );

  if (!lead) return null;

  return (
    <GradeZone grade="code" id="projects" className="relative overflow-x-clip px-[var(--gutter)] py-16 md:py-24">
      <div ref={root} className="mx-auto max-w-[1440px]">
        <SectionHead
          index="03"
          kicker="P2 · Projects"
          title="Selected work"
          lede="A lead case, then the reel — open any frame for the full landing."
        />

        {/* Lead case */}
        <Link
          href={`/work/${lead.slug}`}
          onClick={() => play("select")}
          className="sw-lead group relative mt-10 block md:mt-14"
        >
          <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 lg:col-span-7">
              <div className="sw-lead-img relative aspect-[16/11] w-full lg:aspect-[5/4] lg:min-h-[460px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(lead.thumb)}
                  alt=""
                  className="h-full w-full object-cover transition duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  loading="eager"
                  decoding="async"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply transition duration-700 group-hover:opacity-40"
                  style={{ background: `linear-gradient(145deg, ${lead.coverAccent}55, transparent 55%)` }}
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
                {/* scan line */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-code transition duration-700 group-hover:scale-x-100"
                />
                <span className="absolute bottom-5 left-5 display text-[clamp(56px,8vw,96px)] text-paper md:bottom-7 md:left-7" style={{ fontStretch: "46%" }}>
                  01
                </span>
              </div>
            </div>

            <div className="sw-lead-meta relative flex flex-col justify-between gap-6 overflow-hidden rounded-[28px] border border-white/10 bg-ink-2/35 p-6 md:p-8 lg:col-span-5 lg:min-h-[460px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition duration-700 group-hover:opacity-70"
                style={{ background: lead.coverAccent }}
              />

              <div className="sw-lead-block relative space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="label text-code">
                    {lead.status ?? lead.year}
                    {lead.featured ? " · Featured" : ""}
                  </p>
                  <span className="label rounded-full border border-white/12 bg-ink/40 px-2.5 py-1 text-faint">
                    Case 01 / {String(featured.length).padStart(2, "0")}
                  </span>
                </div>

                {lead.proof && lead.proof.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10">
                    {lead.proof.slice(0, 2).map((f) => (
                      <li key={f.label} className="bg-ink-2/80 p-4 md:p-5">
                        <p
                          className="display text-[clamp(36px,4vw,48px)] leading-none"
                          style={{ fontStretch: "48%", color: lead.coverAccent }}
                        >
                          {f.value}
                        </p>
                        <p className="mt-2 max-w-[14ch] text-[12px] leading-snug text-dim">{f.label}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-[18px] border border-white/10 bg-ink/30 p-4 md:p-5">
                    <p className="label text-faint">Outcome</p>
                    <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-dim">{lead.outcome}</p>
                  </div>
                )}
              </div>

              <div className="sw-lead-block relative space-y-4">
                <Rise
                  as="h3"
                  text={lead.name}
                  className="max-w-[14ch] text-[clamp(32px,4vw,52px)] font-medium leading-[1.02] tracking-[-0.04em]"
                />
                <p className="max-w-[36ch] text-[15px] leading-relaxed text-dim">{lead.tagline}</p>
                <ul className="flex flex-wrap gap-2">
                  {lead.stack.slice(0, 4).map((t) => (
                    <li key={t} className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] text-dim">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="label inline-flex items-center gap-2 pt-1 text-paper/80 transition group-hover:translate-x-1 group-hover:text-code">
                  Open case study <span className="arr">→</span>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Horizontal reel */}
        {rest.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="mb-5 flex items-end justify-between gap-4">
              <p className="label text-faint">More frames</p>
              <p className="label text-dim">Scroll the reel →</p>
            </div>
            <div className="relative -mx-[var(--gutter)] overflow-x-auto overflow-y-hidden px-[var(--gutter)] [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-hidden [&::-webkit-scrollbar]:hidden">
              <div ref={rail} className="flex w-max gap-4 will-change-transform md:gap-5">
                {rest.map((p, i) => (
                  <ReelCard key={p.slug} project={p} index={i + 2} />
                ))}
              </div>
            </div>
          </div>
        )}

        <Reveal className="mt-12 md:mt-14">
          <Link href="/work" className="btn" onClick={() => play("select")}>
            Full project listing <span className="arr">→</span>
          </Link>
        </Reveal>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sw-lead-img, .sw-lead-block, .sw-card { opacity: 1 !important; transform: none !important; clip-path: none !important; }
        }
      `}</style>
    </GradeZone>
  );
}

function ReelCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      onClick={() => play("tick")}
      className="sw-card group relative flex w-[min(78vw,300px)] shrink-0 flex-col self-start overflow-hidden rounded-[24px] border border-white/10 bg-ink-2/40 transition-[border-color,background] duration-500 hover:border-code/45 hover:bg-ink-2/60 md:w-[340px]"
    >
      <div className="relative p-3 pb-0">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-white/10 bg-ink-2"
          style={{ background: `linear-gradient(145deg, ${p.coverAccent}28, #111113 55%)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(p.thumb)}
            alt=""
            className="h-full w-full object-cover opacity-90 transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-100"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 display text-[32px] text-paper md:text-[36px]" style={{ fontStretch: "48%" }}>
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative flex flex-col px-5 pb-4 pt-4">
        <p className="label text-code">
          {p.status ?? p.year}
          {p.featured ? " · Featured" : ""}
        </p>
        <h3 className="mt-2 text-[clamp(20px,2vw,26px)] font-medium tracking-[-0.03em] text-paper transition-colors duration-500 group-hover:text-code">
          {p.name}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/12 bg-ink/40 px-2.5 py-1 text-[10px] text-dim transition-colors duration-500 group-hover:border-code/30"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="label mt-4 inline-flex items-center gap-2 text-paper/70 transition duration-500 group-hover:translate-x-1 group-hover:text-code">
          View case <span className="arr">→</span>
        </span>
      </div>
    </Link>
  );
}
