import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Credits from "@/components/Credits";
import GiantWord from "@/components/hero/GiantWord";
import JsonLd from "@/components/JsonLd";
import { GradeZone, Reveal } from "@/components/ui";
import { ProjectFrames, ProjectMotion } from "@/components/work/ProjectMedia";
import { mailLink, profile, projects, whatsappLink } from "@/lib/content";
import { asset } from "@/lib/media";
import { abs, clamp, pageMeta, person } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta({
    title: `${project.name} — ${profile.name}`,
    description: clamp(project.overview),
    path: `/work/${project.slug}`,
    image: {
      url: asset(project.thumb),
      width: 1200,
      height: 630,
      alt: `${project.name} — case study by ${profile.name}`,
    },
  });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  return (
    <main id="main" data-grade="code" className="overflow-x-clip">
      {/* Hero — same open as WorldHeader */}
      <header className="relative px-[var(--gutter)] pt-[calc(var(--nav-h)+5svh)] pb-16 md:pb-20" data-grade="code">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90svh]"
          style={{
            background: `radial-gradient(60% 50% at 50% 0%, ${project.coverAccent}28, transparent)`,
          }}
        />

        <Link href="/work#listing" className="label inline-flex items-center gap-2 text-dim transition hover:text-paper">
          ← All projects
        </Link>

        <p className="label mt-8 flex flex-wrap items-center gap-3">
          <span className="mono rounded-[4px] bg-code px-1.5 py-0.5 text-[10px] text-ink">P2</span>
          {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          {project.status ? ` · ${project.status}` : ""}
          {project.featured ? " · Featured" : ""}
        </p>

        <div className="mt-6 text-[min(28svh,18vw)]">
          <GiantWord
            words={[{ key: "code", text: project.name.toUpperCase(), color: project.coverAccent }]}
            active="code"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-[1440px] gap-10 border-t border-white/10 pt-10 md:grid-cols-12 md:pt-14">
          <div className="enter md:col-span-7">
            <h1 className="max-w-[22ch] text-[clamp(28px,3.4vw,48px)] font-medium leading-[1.06] tracking-[-0.035em]">
              {project.tagline}
            </h1>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.nda ? (
                <span className="rounded-full border border-code/35 bg-code/10 px-3 py-1.5 text-[12px] text-code">
                  NDA · limited UI
                </span>
              ) : null}
              {project.stack.map((t) => (
                <span key={t} className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[12px] text-dim">
                  {t}
                </span>
              ))}
            </div>
            {project.ndaNote ? (
              <p className="mt-5 max-w-[48ch] text-[14px] leading-relaxed text-faint">{project.ndaNote}</p>
            ) : null}
            {project.live && project.demo ? (
              <div className="mt-8">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: "var(--color-paper)" }}
                >
                  {project.demoLabel ?? "Open live"} <span className="arr">↗</span>
                </a>
              </div>
            ) : null}
          </div>

          <dl className="enter grid content-start gap-5 sm:grid-cols-2 md:col-span-4 md:col-start-9 md:grid-cols-1" style={{ "--d": "120ms" } as CSSProperties}>
            <div className="border-b border-white/10 pb-4">
              <dt className="label">Year</dt>
              <dd className="mt-1.5 text-[15px] text-paper/90">{project.year}</dd>
            </div>
            <div className="border-b border-white/10 pb-4">
              <dt className="label">Category</dt>
              <dd className="mt-1.5 text-[15px] capitalize text-paper/90">{project.category}</dd>
            </div>
            <div className="border-b border-white/10 pb-4">
              <dt className="label">Focus</dt>
              <dd className="mt-1.5 text-[15px] text-paper/90">{project.stack.slice(0, 2).join(" · ")}</dd>
            </div>
            <div className="border-b border-white/10 pb-4">
              <dt className="label">Role</dt>
              <dd className="mt-1.5 text-[15px] text-paper/90">Product design</dd>
            </div>
          </dl>
        </div>

        <Reveal className="mx-auto mt-12 max-w-[1440px] md:mt-16">
          <figure>
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-ink-2 md:rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(project.thumb)}
                alt={`${project.name} cover`}
                className="aspect-[16/10] w-full object-cover md:aspect-[21/9]"
                loading="eager"
                decoding="async"
              />
            </div>
            {project.caption ? (
              <figcaption className="mt-3 text-[13px] text-faint">{project.caption}</figcaption>
            ) : null}
          </figure>
        </Reveal>
      </header>

      {/* Proof — same strip language as home stats */}
      {project.proof && project.proof.length > 0 && (
        <GradeZone grade="code" className="px-[var(--gutter)] pb-8 md:pb-12">
          <ul
            className={`mx-auto grid max-w-[1440px] border-y border-white/10 ${
              project.proof.length >= 4
                ? "grid-cols-2 md:grid-cols-4"
                : project.proof.length === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-2"
            }`}
          >
            {project.proof.map((f, i) => {
              const n = project.proof!.length;
              const divide =
                n >= 4
                  ? `${i ? "md:border-l md:border-white/10 md:pl-6" : ""} ${i % 2 ? "border-l border-white/10 pl-6 md:pl-6" : ""}`
                  : n === 3
                    ? i
                      ? "sm:border-l sm:border-white/10 sm:pl-6"
                      : ""
                    : i
                      ? "border-l border-white/10 pl-6"
                      : "";
              return (
                <li key={f.label} className={`py-7 pr-6 ${divide}`}>
                  <p className="display text-[clamp(52px,6vw,96px)]" style={{ fontStretch: "46%" }}>
                    {f.value}
                  </p>
                  <p className="mt-3 max-w-[22ch] text-[14px] leading-snug text-dim">{f.label}</p>
                </li>
              );
            })}
          </ul>
        </GradeZone>
      )}

      <ProjectMotion project={project} />

      {/* Case narrative */}
      <GradeZone grade="code" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] space-y-16 md:space-y-20">
          <Reveal className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10 md:pt-12">
            <div className="md:col-span-4 lg:col-span-3">
              <p className="label text-code">01 — Overview</p>
              <h2 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em]">The brief</h2>
            </div>
            <div className="space-y-4 md:col-span-8 lg:col-span-9">
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{project.overview}</p>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{project.body}</p>
            </div>
          </Reveal>

          <Reveal className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10 md:pt-12">
            <div className="md:col-span-4 lg:col-span-3">
              <p className="label text-code">02 — Problem</p>
              <h2 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em]">What was broken</h2>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{project.problem}</p>
            </div>
          </Reveal>

          <Reveal className="border-t border-white/10 pt-10 md:pt-12">
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4 lg:col-span-3">
                <p className="label text-code">03 — Approach</p>
                <h2 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em]">How I worked it</h2>
                <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed text-dim">
                  {project.approach.length} moves from discovery to a shippable pattern.
                </p>
              </div>

              <ol className="relative md:col-span-8 lg:col-span-9">
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-6 left-[15px] top-6 w-px bg-white/10 md:left-[19px]"
                />
                {project.approach.map((step, idx) => (
                  <li key={step} className="relative flex gap-5 pb-8 last:pb-0 md:gap-7 md:pb-10">
                    <span
                      className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-code/40 bg-ink text-[11px] font-semibold text-code md:h-10 md:w-10 md:text-[12px]"
                      style={{ boxShadow: "0 0 0 6px var(--color-ink)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 rounded-[14px] border border-white/10 bg-ink-2/35 px-5 py-4 transition-colors hover:border-code/35 md:rounded-[16px] md:px-6 md:py-5">
                      <p className="label text-faint">
                        Step {String(idx + 1).padStart(2, "0")}
                        <span className="text-white/20"> / </span>
                        {String(project.approach.length).padStart(2, "0")}
                      </p>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-paper/90 md:text-[16px]">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {project.research ? (
            <Reveal className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10 md:pt-12">
              <div className="md:col-span-4 lg:col-span-3">
                <p className="label text-code">04 — Research</p>
                <h2 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em]">What we learned</h2>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{project.research.summary}</p>
                <ul className="mt-6 space-y-3">
                  {project.research.findings.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-code" />
                      <span className="max-w-[58ch]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          {project.beforeAfter ? (
            <Reveal className="border-t border-white/10 pt-10 md:pt-12">
              <p className="label text-code">05 — Before / after</p>
              <h2 className="mt-3 text-[clamp(26px,3vw,40px)] font-medium tracking-[-0.035em]">The shift</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
                <div className="rounded-[14px] border border-white/10 bg-ink-2/30 p-6 md:rounded-[16px] md:p-8">
                  <p className="label text-faint">Before</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-dim md:text-[16px]">{project.beforeAfter.before}</p>
                </div>
                <div className="rounded-[14px] border border-code/25 bg-code/5 p-6 md:rounded-[16px] md:p-8">
                  <p className="label text-code">After</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-paper/85 md:text-[16px]">{project.beforeAfter.after}</p>
                </div>
              </div>
            </Reveal>
          ) : null}

          {project.artifacts && project.artifacts.length > 0 ? (
            <Reveal className="border-t border-white/10 pt-10 md:pt-12">
              <p className="label text-code">06 — Artifacts</p>
              <h2 className="mt-3 text-[clamp(26px,3vw,40px)] font-medium tracking-[-0.035em]">Process frames</h2>
              <p className="mt-3 max-w-[48ch] text-[15px] text-dim">Wireframes, maps, and validation — the work behind the UI.</p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.artifacts.map((a) => (
                  <li key={a.label} className="overflow-hidden rounded-[16px] bg-ink-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(a.src)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                    <div className="border-t border-white/10 p-4">
                      <p className="label text-code">{a.label}</p>
                      <p className="mt-2 text-[13px] leading-snug text-dim">{a.caption}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </GradeZone>

      <ProjectFrames project={project} />

      {/* Outcome + CTA */}
      <GradeZone grade="code" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] space-y-14 md:space-y-16">
          <Reveal className="grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-10 md:pt-12">
            <div className="md:col-span-4 lg:col-span-3">
              <p className="label text-code">07 — Outcome</p>
              <h2 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em]">What landed</h2>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-dim md:text-[17px]">{project.outcome}</p>
            </div>
          </Reveal>

          <Reveal>
            <article
              className="relative grid overflow-hidden rounded-[14px] border border-white/12 md:grid-cols-12 md:rounded-[16px]"
              style={{
                background: `radial-gradient(ellipse 55% 80% at 92% 8%, ${project.coverAccent}22, transparent 55%), #111113`,
              }}
            >
              <div className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 md:col-span-7 md:border-b-0 md:border-r md:p-8 lg:p-10">
                <div>
                  <p className="label text-faint">Next step</p>
                  <h2
                    className="display mt-4 max-w-[14ch] text-[clamp(32px,4.5vw,56px)] uppercase leading-[0.92]"
                    style={{ fontStretch: "44%" }}
                  >
                    Have a similar surface?
                  </h2>
                  <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-dim md:text-[16px]">
                    Let&apos;s map the problem together — discovery through a system your engineers can ship.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(`Hi Vengadesan — I saw "${project.name}" and want something like it: `)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ background: "var(--color-paper)" }}
                  >
                    WhatsApp me <span className="arr">→</span>
                  </a>
                  <a href={mailLink(`Regarding ${project.name}`)} className="btn btn-ghost">
                    Email me <span className="arr">→</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-0 md:col-span-5">
                <div className="border-b border-white/10 p-6 md:p-7">
                  <p className="label text-code">Engagement</p>
                  <ul className="mt-4 space-y-3">
                    {[
                      ["Kickoff", "Discovery call · 30 min"],
                      ["Shape", "Problem map + UX brief"],
                      ["Ship", "System + annotated handoff"],
                    ].map(([k, v]) => (
                      <li key={k} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <span className="text-[13px] text-faint">{k}</span>
                        <span className="text-right text-[13px] text-paper/85">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-[#111113] p-5 md:p-6">
                    <p className="display text-[clamp(28px,3vw,36px)]" style={{ fontStretch: "48%", color: project.coverAccent }}>
                      {project.year}
                    </p>
                    <p className="mt-1.5 text-[12px] text-dim">Case year</p>
                  </div>
                  <div className="bg-[#111113] p-5 md:p-6">
                    <p className="display text-[clamp(28px,3vw,36px)] capitalize" style={{ fontStretch: "48%" }}>
                      {project.category}
                    </p>
                    <p className="mt-1.5 text-[12px] text-dim">Surface type</p>
                  </div>
                </div>

                <div className="mt-auto flex flex-1 flex-col justify-end gap-3 p-6 md:p-7">
                  <p className="label text-faint">Usually replies</p>
                  <p className="text-[15px] text-paper/90">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-code align-middle" />
                    Within a day · {profile.tzLabel}
                  </p>
                  <a
                    href={mailLink(`Regarding ${project.name}`, `Hi Vengadesan,\n\nI saw ${project.name} and…`)}
                    className="text-[13px] text-dim transition hover:text-code"
                  >
                    {profile.email} <span className="arr">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </GradeZone>

      {/* Prev / next */}
      <nav className="border-t border-white/10 px-[var(--gutter)] py-14 md:py-20" aria-label="Project pagination">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-2 md:gap-10">
          <Link href={`/work/${prev.slug}`} className="group flex gap-4 md:gap-5">
            <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[14px] bg-ink-2 md:h-24 md:w-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(prev.thumb)} alt="" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]" />
            </span>
            <span className="flex min-w-0 flex-col justify-center py-1">
              <span className="label text-faint">Previous</span>
              <span className="mt-1 truncate text-[17px] font-medium tracking-[-0.02em] text-paper group-hover:text-code md:text-[19px]">
                {prev.name}
              </span>
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex gap-4 md:flex-row-reverse md:gap-5 md:text-right">
            <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[14px] bg-ink-2 md:h-24 md:w-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(next.thumb)} alt="" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]" />
            </span>
            <span className="flex min-w-0 flex-col justify-center py-1">
              <span className="label text-faint">Next</span>
              <span className="mt-1 truncate text-[17px] font-medium tracking-[-0.02em] text-paper group-hover:text-code md:text-[19px]">
                {next.name} <span className="arr">→</span>
              </span>
            </span>
          </Link>
        </div>
      </nav>

      <Credits />
      <JsonLd
        graph={[
          person(),
          {
            "@type": "CreativeWork",
            "@id": `${abs(`/work/${project.slug}`)}#work`,
            name: project.name,
            description: project.overview,
            url: abs(`/work/${project.slug}`),
            keywords: project.stack.join(", "),
            dateCreated: project.year,
            author: { "@id": `${abs("/")}#person` },
          },
        ]}
      />
    </main>
  );
}
