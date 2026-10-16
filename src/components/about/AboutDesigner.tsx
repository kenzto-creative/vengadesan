import Link from "next/link";
import DesignWorkspace from "@/components/about/DesignWorkspace";
import TerritoryExploded from "@/components/about/TerritoryExploded";
import { aboutDesigner, projects } from "@/lib/content";
import { asset } from "@/lib/media";
import { Reveal } from "@/components/ui";

const proofCases = projects.filter((p) => p.featured).slice(0, 3);

function Icon({ name }: { name: string }) {
  const common = "h-5 w-5 shrink-0 text-edit";
  switch (name) {
    case "glance":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "consistent":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 8h14M5 12h10M5 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="8" r="1.5" fill="currentColor" />
          <circle cx="14" cy="12" r="1.5" fill="currentColor" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        </svg>
      );
    case "usable":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 18.5c.6-3 2.4-4.5 4.5-4.5s3.9 1.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15.5 11.5h4.5M17.75 9.25v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "ready":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="m8.5 12.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/** Frame 1000017115 — The Designer sections for About. */
export default function AboutDesigner() {
  const { identity, mind, standard, frontier, proof } = aboutDesigner;

  return (
    <div className="mx-auto max-w-[1440px] space-y-20 md:space-y-28">
      {/* 01 / Identity — copy + craft stack */}
      <Reveal>
        <article className="overflow-hidden rounded-[28px] border border-white/10 bg-ink-2/50">
          <div className="grid lg:grid-cols-12">
            <div className="p-7 md:p-10 lg:col-span-7 lg:p-12">
              <p className="label text-faint">{identity.label}</p>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(28px,4vw,52px)] font-medium uppercase leading-[1.02] tracking-[-0.04em]">
                {identity.title}
              </h2>
              <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{identity.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {identity.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] tracking-[0.02em] text-dim"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="mt-10 flex items-center gap-2 mono text-[10px] tracking-[0.14em] text-faint">
                <span className="rec !h-1.5 !w-1.5" />
                P1 · PRODUCT DESIGNER · CHENNAI
              </p>
            </div>

            <div className="relative border-t border-white/10 bg-ink/40 p-6 md:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 70% at 70% 30%, rgb(255 106 61 / .12), transparent 55%), radial-gradient(ellipse 60% 50% at 20% 90%, rgb(63 216 201 / .08), transparent 50%)",
                }}
              />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <p className="label text-faint">Craft stack</p>
                  <p className="mono text-[10px] tracking-[0.14em] text-edit">LIVE</p>
                </div>

                {/* Stacked craft layers */}
                <div className="relative mx-auto h-[240px] w-full max-w-[320px]" style={{ perspective: "900px" }}>
                  <div
                    className="absolute inset-x-0 top-0 mx-auto h-full max-w-[280px]"
                    style={{ transformStyle: "preserve-3d", transform: "rotateY(-18deg) rotateX(8deg)" }}
                  >
                    {identity.tags.map((tag, i) => (
                      <div
                        key={tag}
                        className="absolute inset-x-0 rounded-[16px] border border-edit/40 bg-[#161618]/95 p-4 shadow-[0_20px_50px_-24px_rgb(0_0_0_/_0.9)] backdrop-blur-sm"
                        style={{
                          top: `${i * 28}px`,
                          transform: `translateZ(${i * 18}px)`,
                          zIndex: i,
                          opacity: 0.55 + i * 0.12,
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="mono rounded-[4px] bg-edit px-1.5 py-0.5 text-[10px] text-ink">L{i + 1}</span>
                          <span className="mono text-[9px] tracking-[0.12em] text-faint">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="mt-3 text-[14px] font-medium tracking-[-0.02em] text-paper">{tag}</p>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                          <span
                            className="block h-full rounded-full bg-edit"
                            style={{ width: `${72 + i * 7}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signal strip */}
                <dl className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
                  {[
                    { v: "3.5+", l: "Years" },
                    { v: "12", l: "SaaS" },
                    { v: "E2E", l: "Craft" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-[14px] border border-white/10 bg-ink/50 px-3 py-3 text-center">
                      <dt className="display text-[clamp(22px,2.4vw,28px)] text-paper" style={{ fontStretch: "48%" }}>
                        {s.v}
                      </dt>
                      <dd className="mt-1 mono text-[9px] tracking-[0.14em] text-faint">{s.l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {/* 02 / Territory */}
      <section className="relative">
        <TerritoryExploded />
      </section>

      <Reveal>
        <DesignWorkspace />
      </Reveal>

      {/* 03 / Mind — process studio rail */}
      <section>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="label text-faint">{mind.label}</p>
            <h2 className="display mt-4 text-[clamp(40px,5vw,72px)] uppercase leading-[0.92]" style={{ fontStretch: "46%" }}>
              {mind.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{mind.lede}</p>
          </Reveal>
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-ink-2/40 md:mt-14">
          <ol className="grid divide-y divide-white/10 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4">
            {mind.steps.map((step, i) => (
              <li
                key={step.key}
                className={`relative flex min-h-[260px] flex-col p-6 md:min-h-[300px] md:p-7 ${
                  i % 2 === 1 ? "md:border-l md:border-white/10" : ""
                } ${i >= 2 ? "md:border-t md:border-white/10" : ""} ${i > 0 ? "lg:border-l lg:border-t-0 lg:border-white/10" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="display text-[clamp(48px,6vw,72px)] leading-none text-edit/90"
                    style={{ fontStretch: "42%" }}
                  >
                    {step.key}
                  </span>
                  <span className="mono text-[10px] tracking-[0.14em] text-faint">
                    {String(i + 1).padStart(2, "0")} / {String(mind.steps.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-[clamp(18px,1.8vw,22px)] font-medium tracking-[-0.025em] text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-dim md:text-[15px]">{step.body}</p>
                {i < mind.steps.length - 1 && (
                  <span aria-hidden className="pointer-events-none absolute right-3 top-7 hidden text-edit/50 lg:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* 04 / Standard — principle cards */}
      <section>
        <Reveal className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-faint">{standard.label}</p>
            <h2 className="display mt-4 max-w-[14ch] text-[clamp(40px,5vw,72px)] uppercase leading-[0.92]" style={{ fontStretch: "46%" }}>
              {standard.title}
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-dim lg:col-span-4 lg:col-start-9 md:text-[16px]">
            Four checks I run on every product surface — before it leaves the studio.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5">
          {standard.principles.map((p, i) => (
            <Reveal key={p.title} as="li">
              <article className="group flex h-full flex-col rounded-[24px] border border-white/10 bg-ink-2/45 p-6 transition-colors duration-500 hover:border-edit/40 hover:bg-ink-2/65 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/12 bg-ink/50">
                    <Icon name={p.icon} />
                  </span>
                  <span className="mono text-[10px] tracking-[0.14em] text-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-[clamp(20px,2.1vw,26px)] font-medium tracking-[-0.03em] text-paper transition-colors group-hover:text-edit">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[40ch] flex-1 text-[15px] leading-relaxed text-dim">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 05 / Frontier — split studio panel */}
      <Reveal>
        <article className="overflow-hidden rounded-[28px] border border-white/10">
          <div className="grid lg:grid-cols-12">
            <div className="relative bg-ink-2/70 px-7 py-10 md:px-10 md:py-12 lg:col-span-5">
              <p className="label text-faint">{frontier.label}</p>
              <p className="mt-8 mono text-[11px] tracking-[0.16em] text-edit">AI · STUDIO PRACTICE</p>
              <div className="mt-10 flex flex-wrap gap-2">
                {frontier.tags.split("·").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.04em] text-dim"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <span
                aria-hidden
                className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/70"
              >
                ↓
              </span>
            </div>
            <div className="bg-paper px-7 py-10 text-ink md:px-10 md:py-12 lg:col-span-7">
              <h2 className="max-w-[18ch] text-[clamp(28px,3.6vw,48px)] font-medium leading-[1.06] tracking-[-0.035em]">
                {frontier.title}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink/65 md:text-[17px]">{frontier.body}</p>
            </div>
          </div>
        </article>
      </Reveal>

      {/* 06 / Proof — cinematic CTA + live case stack */}
      <Reveal>
        <article
          className="relative overflow-hidden rounded-[28px] border border-white/10"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 85% 20%, rgb(255 106 61 / .14), transparent 55%), radial-gradient(ellipse 50% 60% at 10% 90%, rgb(63 216 201 / .1), transparent 50%), #111113",
          }}
        >
          <div className="relative grid lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-10 border-b border-white/10 px-7 py-12 md:px-10 md:py-14 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
              <div>
                <p className="label text-faint">{proof.label}</p>
                <h2
                  className="display mt-5 max-w-[14ch] text-[clamp(36px,5vw,72px)] uppercase leading-[0.9]"
                  style={{ fontStretch: "44%" }}
                >
                  {proof.title}
                </h2>
                <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{proof.body}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={proof.href} className="btn" style={{ background: "var(--color-paper)" }}>
                  {proof.cta} <span className="arr">↗</span>
                </Link>
                <Link href="/#contact" className="btn btn-ghost">
                  Start a brief <span className="arr">→</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col lg:col-span-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4 md:px-7">
                <p className="label flex items-center gap-2 text-code">
                  <span className="rec !h-1.5 !w-1.5" />
                  Live cases
                </p>
                <p className="label text-faint">
                  {String(proofCases.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </p>
              </div>

              <ul className="flex flex-1 flex-col">
                {proofCases.map((p, idx) => (
                  <li key={p.slug} className={idx ? "border-t border-white/10" : ""}>
                    <Link
                      href={`/work/${p.slug}`}
                      className="group flex gap-4 px-6 py-4 transition-colors hover:bg-white/[0.03] md:px-7 md:py-5"
                    >
                      <span
                        className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[12px] border border-white/10 bg-ink-2 md:h-[72px] md:w-[104px]"
                        style={{ background: `linear-gradient(145deg, ${p.coverAccent}33, #111113 60%)` }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset(p.thumb)}
                          alt=""
                          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.05]"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="flex min-w-0 flex-col justify-center">
                        <span className="label text-faint">
                          {String(idx + 1).padStart(2, "0")}
                          {p.nda ? " · NDA" : ""} · {p.category}
                        </span>
                        <span className="mt-1 truncate text-[16px] font-medium tracking-[-0.02em] text-paper transition-colors group-hover:text-code md:text-[17px]">
                          {p.name}
                        </span>
                        <span className="mt-1 truncate text-[12px] text-dim">{p.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
                {[
                  { v: String(projects.filter((p) => p.category === "saas").length), l: "SaaS" },
                  { v: String(projects.filter((p) => p.nda).length), l: "NDA" },
                  { v: String(projects.length), l: "Total" },
                ].map((s) => (
                  <div key={s.l} className="bg-[#111113] px-4 py-4 text-center md:py-5">
                    <p className="display text-[clamp(22px,2.5vw,28px)]" style={{ fontStretch: "48%" }}>
                      {s.v}
                    </p>
                    <p className="mt-1 text-[11px] text-dim">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
