import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, reels } from "@/lib/content";

export const dynamicParams = false;

/** Map old case slugs onto `/work/[slug]`. */
export function generateStaticParams() {
  const fromReels = reels.map((r) => ({ slug: r.slug }));
  const fromProjects = projects.map((p) => ({ slug: p.slug }));
  const seen = new Set<string>();
  return [...fromReels, ...fromProjects].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export default async function LegacyCaseRedirect({ params }: PageProps<"/edit/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="grid min-h-[70svh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <p className="label">Moved</p>
        <h1 className="mt-4 text-[clamp(28px,4vw,48px)] font-medium tracking-[-0.03em]">{project.name}</h1>
        <p className="mt-3 text-dim">This case now lives under Projects.</p>
        <Link href={`/work/${project.slug}`} className="btn mt-8">
          Open project <span className="arr">→</span>
        </Link>
      </div>
    </main>
  );
}
