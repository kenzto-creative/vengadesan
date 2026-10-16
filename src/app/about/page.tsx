import type { Metadata } from "next";
import Link from "next/link";
import AboutDesigner from "@/components/about/AboutDesigner";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import JsonLd from "@/components/JsonLd";
import { GradeZone, Reveal, SectionHead } from "@/components/ui";
import WorldHeader from "@/components/WorldHeader";
import {
  achievements,
  profile,
  quote,
  resumeSummary,
  role,
  whatsappLink,
} from "@/lib/content";
import { asset } from "@/lib/media";
import { abs, pageMeta, person, website } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `About — ${profile.name}`,
  description: `${resumeSummary.slice(0, 155)}…`,
  path: "/about",
  image: {
    url: asset("/og/edit.jpg"),
    width: 1200,
    height: 630,
    alt: `${profile.name} — ${role.title}`,
  },
});

export default function AboutPage() {
  return (
    <main id="main" data-grade="edit">
      <WorldHeader
        grade="edit"
        word="ABOUT"
        altWord="DESIGNER"
        kicker="P1 · About me"
        title={`${role.title}.`}
        lede={resumeSummary}
        facts={[
          ["Based", profile.location],
          ["Experience", "3.5+ years · Vyssr Solutions Pvt Ltd"],
          ["Status", profile.availability.open ? profile.availability.label : "Limited"],
        ]}
        actions={
          <>
            <a
              href={whatsappLink("Hi Vengadesan — I'd like to talk about working together: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Say hello <span className="arr">→</span>
            </a>
            <Link href="/work" className="btn btn-ghost">
              See projects <span className="arr">→</span>
            </Link>
          </>
        }
      />

      <GradeZone grade="edit" className="px-[var(--gutter)] pt-28 md:pt-36">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead index="01" kicker="Identity" title="One designer, full stack of craft" />
          <Reveal className="mt-12 grid gap-10 lg:grid-cols-12">
            <p className="text-[clamp(22px,2.8vw,36px)] font-medium leading-[1.15] tracking-[-0.03em] lg:col-span-7">
              {role.detail}
            </p>
            <blockquote className="border-l-2 border-edit pl-5 text-[18px] italic leading-relaxed text-dim lg:col-span-4 lg:col-start-9">
              “{quote}”
            </blockquote>
          </Reveal>
        </div>
      </GradeZone>

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <AboutDesigner />
      </GradeZone>

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead index="07" kicker="Achievements" title="What I've achieved" />
          <Reveal className="mt-10 overflow-hidden rounded-[28px] border border-white/10 md:mt-14">
            <ul className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((a, i) => (
                <li key={a.label} className="bg-ink p-7 md:min-h-[280px] md:p-9">
                  <p className="label text-faint">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-10 text-[clamp(20px,2.2vw,28px)] font-medium tracking-[-0.025em] md:mt-14">
                    {a.label}
                  </h3>
                  <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-dim">{a.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-14 flex flex-wrap gap-3">
            <Link href="/#both" className="btn">
              Back to home <span className="arr">→</span>
            </Link>
            <Link href="/work" className="btn btn-ghost">
              Browse projects <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </GradeZone>

      <Contact initial="edit" />
      <Credits />
      <JsonLd
        graph={[
          person(),
          website(),
          {
            "@type": "AboutPage",
            "@id": `${abs("/about")}#webpage`,
            url: abs("/about"),
            name: `About — ${profile.name}`,
            description: resumeSummary,
            isPartOf: { "@id": `${abs("/")}#website` },
            about: { "@id": `${abs("/")}#person` },
          },
        ]}
      />
    </main>
  );
}
