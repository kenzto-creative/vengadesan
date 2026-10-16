import Link from "next/link";
import CertLearning from "@/components/about/CertLearning";
import EducationList from "@/components/about/EducationList";
import ExperienceList from "@/components/about/ExperienceList";
import SoftSkills from "@/components/about/SoftSkills";
import ToolSkills from "@/components/about/ToolSkills";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import CharacterSelect from "@/components/hero/CharacterSelect";
import HumanCard from "@/components/HumanCard";
import JsonLd from "@/components/JsonLd";
import HomeSelectedWork from "@/components/home/HomeSelectedWork";
import HowIWork from "@/components/home/HowIWork";
import { GradeZone, Reveal, Rise, SectionHead } from "@/components/ui";
import Availability from "@/components/Availability";
import ResumePreview from "@/components/ResumePreview";
import { quote, resumeSummary, role } from "@/lib/content";
import { asset, srcSet } from "@/lib/media";
import { homeGraph } from "@/lib/seo";

const STATS = [
  { value: "3.5+", label: "years in product design" },
  { value: "12", label: "enterprise SaaS platforms" },
  { value: "51", label: "business websites" },
  { value: "6", label: "mobile applications" },
];

export default function Home() {
  return (
    <main id="main">
      <CharacterSelect
        portrait={{
          neutral: {
            src: asset("/media/hero/avatar-neutral-864.webp"),
            avif: srcSet([["/media/hero/avatar-neutral-864.avif", 864]]),
          },
          edit: {
            src: asset("/media/hero/avatar-edit-1532.webp"),
            srcSet: srcSet([
              ["/media/hero/avatar-edit-766.webp", 766],
              ["/media/hero/avatar-edit-1532.webp", 1532],
            ]),
            avif: srcSet([
              ["/media/hero/avatar-edit-766.avif", 766],
              ["/media/hero/avatar-edit-1532.avif", 1532],
            ]),
          },
          code: {
            src: asset("/media/hero/avatar-code-1532.webp"),
            srcSet: srcSet([
              ["/media/hero/avatar-code-766.webp", 766],
              ["/media/hero/avatar-code-1532.webp", 1532],
            ]),
            avif: srcSet([
              ["/media/hero/avatar-code-766.avif", 766],
              ["/media/hero/avatar-code-1532.avif", 1532],
            ]),
          },
          idle: { base: "/media/hero/avatar-idle", w: 864, h: 1298 },
          w: 1532,
          h: 2300,
          alt: "Vengat — Product Designer (UX/UI).",
        }}
      />

      <GradeZone grade="neutral" id="both" className="relative scroll-mt-16 px-[var(--gutter)] pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="mx-auto w-full max-w-[400px] md:col-span-5 md:max-w-none lg:col-span-4">
            <HumanCard
              src={asset("/media/hero/krishna-1259.webp")}
              srcSet={srcSet([
                ["/media/hero/krishna-630.webp", 630],
                ["/media/hero/krishna-1259.webp", 1259],
              ])}
              avif={srcSet([
                ["/media/hero/krishna-630.avif", 630],
                ["/media/hero/krishna-1259.avif", 1259],
              ])}
              w={1259}
              h={2300}
              alt="Vengadesan R. — Product Designer (UX/UI) based in Chennai."
            />
          </Reveal>
          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="label mb-8 flex items-center gap-3">
                <span className="mono rounded-[4px] bg-paper px-1.5 py-0.5 text-[10px] text-ink">00</span>
                {role.title}
              </p>
            </Reveal>
            <Rise
              as="p"
              text={role.line}
              className="max-w-[18ch] text-[clamp(34px,4.2vw,66px)] font-medium leading-[1.02] tracking-[-0.035em]"
              stagger={35}
            />
            <Reveal delay={200} className="mt-10 max-w-[64ch] space-y-5 text-[17px] leading-relaxed text-dim">
              <p>{resumeSummary}</p>
              <p className="text-paper/90 italic">“{quote}”</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/about" className="btn">
                  My Role <span className="arr">→</span>
                </Link>
                <ResumePreview />
              </div>
              <Availability className="pt-4" />
            </Reveal>
          </div>
        </div>

        <Reveal delay={150} className="mx-auto mt-14 grid max-w-[1440px] grid-cols-2 border-t border-white/10 md:mt-20 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-7 pr-6 ${i ? "md:border-l md:border-white/10 md:pl-6" : ""} ${i % 2 ? "border-l border-white/10 pl-6 md:pl-6" : ""}`}>
              <p className="display text-[clamp(52px,6vw,96px)]" style={{ fontStretch: "46%" }}>
                {s.value}
              </p>
              <p className="mt-3 max-w-[22ch] text-[14px] leading-snug text-dim">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </GradeZone>

      <GradeZone grade="edit" id="experience" className="scroll-mt-20 px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            index="01"
            kicker="Experience"
            title="Where I've worked"
            lede="Click a role to expand the work — outcomes and craft, as bullets."
          />
          <ExperienceList />
        </div>
      </GradeZone>

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead index="02" kicker="Education" title="Where I studied" />
          <EducationList />
        </div>
      </GradeZone>

      <HomeSelectedWork />

      <HowIWork />

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            index="05"
            kicker="Tools"
            title="Tool skills"
            lede="The apps I open every day — design, research, and delivery."
          />
          <ToolSkills />
        </div>
      </GradeZone>

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            index="06"
            kicker="Craft"
            title="Soft skills"
            lede="How I think and ship — product craft across discovery, systems, and delivery."
          />
          <SoftSkills />
        </div>
      </GradeZone>

      <GradeZone grade="edit" className="px-[var(--gutter)] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead index="07" kicker="Learning" title="Always learning" />
          <CertLearning />
        </div>
      </GradeZone>

      <Contact />
      <Credits />
      <JsonLd graph={homeGraph()} />
    </main>
  );
}
