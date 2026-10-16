import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import JsonLd from "@/components/JsonLd";
import { GradeZone, SectionHead } from "@/components/ui";
import ProjectListing from "@/components/work/ProjectListing";
import WorldHeader from "@/components/WorldHeader";
import { engineerStats, profile, projects, whatsappLink } from "@/lib/content";
import { asset } from "@/lib/media";
import { abs, pageMeta, person, website } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Projects — ${profile.name}`,
  description:
    "Selected product experience by Vengadesan R. — SaaS dashboards, brand sites, mobile apps, and identity systems.",
  path: "/work",
  image: {
    url: asset("/og/code.jpg"),
    width: 1200,
    height: 630,
    alt: `${profile.name} — selected projects`,
  },
});

export default function WorkPage() {
  return (
    <main id="main" data-grade="code">
      <WorldHeader
        grade="code"
        word="WORK"
        kicker="P2 · Projects"
        title="Selected product experience."
        lede="Enterprise SaaS (incl. NDA process cases), education dashboards, brand landings, and mobile — open any card for research, artifacts, and outcomes."
        facts={[
          ["Track", engineerStats.map((s) => `${s.value} ${s.label}`).join(" · ")],
          ["Focus", "SaaS UX/UI · Design systems · Responsive product"],
          ["Status", profile.availability.open ? profile.availability.label : "Limited"],
        ]}
        actions={
          <>
            <a href="#listing" className="btn">
              Browse listing ↓
            </a>
            <a
              href={whatsappLink("Hi Vengadesan — I saw your projects and want to talk about: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Start a project <span className="arr">→</span>
            </a>
          </>
        }
      />

      <GradeZone grade="code" id="listing" className="scroll-mt-20 px-[var(--gutter)] pb-28 pt-20 md:pb-40 md:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            index="01"
            kicker="Listing"
            title="All projects"
            lede="Filter by category, then open a case for overview, problem, approach, and outcome."
          />
          <ProjectListing />
        </div>
      </GradeZone>

      <Contact initial="code" />
      <Credits />
      <JsonLd
        graph={[
          person(),
          website(),
          {
            "@type": "CollectionPage",
            "@id": `${abs("/work")}#webpage`,
            url: abs("/work"),
            name: `Projects — ${profile.name}`,
            about: { "@id": `${abs("/")}#person` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/work/${p.slug}`),
                name: p.name,
              })),
            },
          },
        ]}
      />
    </main>
  );
}
