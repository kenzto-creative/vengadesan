import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: site.updated,
      changeFrequency: "monthly",
      priority: 1,
      images: [abs("/media/hero/avatar-neutral-864.webp")],
    },
    { url: `${site.url}/about`, lastModified: site.updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/work`, lastModified: site.updated, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: site.updated,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
  ];
}
