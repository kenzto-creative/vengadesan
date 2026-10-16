/**
 * Search: page metadata and structured data (schema.org JSON-LD).
 *
 * One Person entity, #person, is defined on every page (by the root layout)
 * and referenced by @id everywhere else, so every page describes the same
 * human: the name, the real photo, the two occupations and the profiles that
 * confirm them. That entity is what name searches ("Vengadesan product designer")
 * and AI answer engines resolve to.
 *
 * Shared by server and client components — keep this file free of "use client".
 */
import type { Metadata } from "next";
import { editFaq, education, profile, projects, reels, services, site, type Project, type Reel } from "./content";
import { asset } from "./media";

export const abs = (path: string) => (/^https?:/.test(path) ? path : `${site.url}${path}`);

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  headshot: `${site.url}/#headshot`,
  service: `${site.url}/edit#service`,
};

const sameAs = [
  profile.links.linkedin,
  profile.links.behance,
  profile.links.dribbble,
  profile.links.portfolio,
  profile.links.github,
  profile.links.instagram,
  profile.links.youtube,
].filter(Boolean);

// ──────────────────────────────────────────────────────────────── copy

export const copy = {
  home: {
    title: `${profile.name} — Product Designer (UX/UI)`,
    description:
      "Vengat is a Product Designer (UX/UI) in Chennai, India: end-to-end SaaS and enterprise product design, design systems, and accessible responsive experiences.",
  },
  edit: {
    title: `About — ${profile.name}`,
    description:
      "About Vengadesan R. — Product Designer (UX/UI) in Chennai. Experience, skills, certifications, and how he works.",
  },
  code: {
    title: `Projects — ${profile.name}`,
    description:
      "Selected projects by Vengadesan R. — SaaS dashboards, brand sites, mobile apps, and identity systems.",
  },
} as const;

/** Trim to a search-snippet length: at the last full sentence if that keeps most of it, else at a word. */
export function clamp(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence >= max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:—–-]+$/, "")}…`;
}

export const reelCopy = (r: Reel) => ({
  title: `${r.title} — ${profile.name}`,
  description: clamp(`${r.formatLabel} by ${profile.name}. ${r.did.join(" ")}`),
});

/**
 * Everything a page's <head> needs. Next replaces (not merges) a parent's
 * openGraph/twitter objects, so each page states them in full.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  video,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  video?: { url: string; type: string; width: number; height: number };
  type?: "website" | "video.other";
}): Metadata {
  const images = image ? [{ ...image, url: abs(image.url) }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: profile.name,
      locale: "en_IN",
      ...(images ? { images } : {}),
      ...(video ? { videos: [{ ...video, url: abs(video.url) }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
  };
}

// ──────────────────────────────────────────────────────── the entity

const school = (s: string) => {
  const i = s.lastIndexOf(",");
  return i === -1 ? { name: s } : { name: s.slice(0, i).trim(), city: s.slice(i + 1).trim() };
};

export function person() {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: profile.name,
    givenName: "Vengadesan",
    familyName: "R.",
    url: `${site.url}/`,
    image: {
      "@type": "ImageObject",
      "@id": ids.headshot,
      url: abs("/media/hero/avatar-neutral-864.webp"),
      contentUrl: abs("/media/hero/avatar-neutral-864.webp"),
      width: 864,
      height: 1298,
      caption: profile.name,
    },
    description:
      "Product Designer (UX/UI) in Chennai, India. Leads end-to-end SaaS and enterprise product design — discovery, design systems, dashboards, workflows, and accessible responsive UI.",
    jobTitle: ["Product Designer", "UX/UI Designer"],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Product Designer (UX/UI)",
        occupationalCategory: "27-1024.00",
        occupationLocation: { "@type": "City", name: "Chennai" },
        skills: "Product design, UX strategy, user research, design systems, SaaS UX, accessibility, Figma",
      },
      {
        "@type": "Occupation",
        name: "UX Designer",
        occupationalCategory: "15-1255.00",
        occupationLocation: { "@type": "City", name: "Chennai" },
        skills: "User research, information architecture, wireframing, prototyping, usability testing, journey mapping",
      },
    ],
    knowsAbout: [
      "Product design",
      "UX design",
      "UI design",
      "SaaS design",
      "Enterprise UX",
      "Design systems",
      "User research",
      "Information architecture",
      "Wireframing",
      "Prototyping",
      "Accessibility",
      "Figma",
      "Responsive design",
      "AI-assisted product design",
    ],
    knowsLanguage: ["Tamil", "English"],
    email: `mailto:${profile.email}`,
    telephone: `+${profile.whatsapp}`,
    address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
    alumniOf: education.map((e) => {
      const s = school(e.school);
      return { "@type": "CollegeOrUniversity", name: s.name, ...(s.city ? { address: { "@type": "PostalAddress", addressLocality: s.city, addressCountry: "IN" } } : {}) };
    }),
    hasCredential: education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: e.degree,
      recognizedBy: { "@type": "CollegeOrUniversity", name: school(e.school).name },
    })),
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product design (UX/UI) for SaaS and enterprise", url: abs("/about") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "End-to-end product design engagements", url: abs("/work") } },
    ],
    sameAs,
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${site.url}/`,
    name: profile.name,
    alternateName: ["Vengadesan R. — Product Designer (UX/UI)", "vengadesan.design"],
    description: copy.home.description,
    inLanguage: "en",
    publisher: { "@id": ids.person },
    author: { "@id": ids.person },
  };
}

export const breadcrumbs = (trail: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

const webpage = (path: string, name: string, description: string, extra: Record<string, unknown> = {}) => ({
  "@type": "WebPage",
  "@id": `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  isPartOf: { "@id": ids.website },
  inLanguage: "en",
  ...extra,
});

// ──────────────────────────────────────────────────────── per page

export function homeGraph() {
  return [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: copy.home.title,
      description: copy.home.description,
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": ids.person },
      about: { "@id": ids.person },
      primaryImageOfPage: { "@id": ids.headshot },
      dateModified: site.updated,
      inLanguage: "en",
    },
  ];
}

export function editGraph() {
  return [
    webpage("/edit", copy.edit.title, copy.edit.description, {
      about: { "@id": ids.service },
      mainEntity: { "@id": ids.service },
      primaryImageOfPage: abs(asset("/og/edit.jpg")),
      dateModified: site.updated,
    }),
    {
      "@type": "Service",
      "@id": ids.service,
      name: "UX design for SaaS and enterprise products",
      serviceType: "UX/UI design",
      description:
        "End-to-end product design: discovery research, journey mapping, information architecture, wireframes, prototypes, design systems, and accessible responsive UI.",
      url: abs("/edit"),
      provider: { "@id": ids.person },
      areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
      audience: { "@type": "Audience", audienceType: "SaaS founders, product managers and enterprise teams" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "What the UX engagement includes",
        itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
      },
      subjectOf: reels.map((r) => ({ "@id": `${abs(`/edit/${r.slug}`)}#work` })),
    },
    {
      "@type": "ItemList",
      name: `Work by ${profile.name}`,
      itemListElement: reels.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/edit/${r.slug}`), name: r.title })),
    },
    {
      "@type": "FAQPage",
      "@id": `${abs("/edit")}#faq`,
      mainEntity: editFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    breadcrumbs([
      [profile.name, "/"],
      ["UX design", "/edit"],
    ]),
  ];
}

export function reelGraph(r: Reel) {
  const c = reelCopy(r);
  const path = `/edit/${r.slug}`;
  return [
    webpage(path, c.title, c.description, {
      primaryImageOfPage: abs(asset("/og/edit.jpg")),
      datePublished: r.published,
      author: { "@id": ids.person },
    }),
    {
      "@type": "CreativeWork",
      "@id": `${abs(path)}#work`,
      name: r.title,
      description: clamp(`${r.formatLabel}. ${r.hook} ${r.did.join(" ")}`, 480),
      url: abs(path),
      keywords: [r.formatLabel, r.niche, ...r.tools].join(", "),
      dateCreated: r.year,
      author: { "@id": ids.person },
    },
    breadcrumbs([
      [profile.name, "/"],
      ["UX design", "/edit"],
      [r.title, path],
    ]),
  ];
}

export const projectSlug = (p: Project) => p.slug;

function project(p: Project) {
  return {
    "@type": p.repo ? "SoftwareSourceCode" : "CreativeWork",
    name: p.name,
    headline: p.tagline,
    description: p.body,
    url: p.demo ?? p.repo ?? `${abs("/code")}#${projectSlug(p)}`,
    ...(p.repo ? { codeRepository: p.repo } : {}),
    ...(p.shot ? { image: abs(asset(p.shot.src)) } : {}),
    keywords: p.stack.join(", "),
    dateCreated: p.year,
    author: { "@id": ids.person },
  };
}

export function codeGraph() {
  return [
    webpage("/code", copy.code.title, copy.code.description, {
      "@type": "CollectionPage",
      about: { "@id": ids.person },
      primaryImageOfPage: abs(asset("/og/code.jpg")),
      dateModified: site.updated,
      mainEntity: {
        "@type": "ItemList",
        name: `Product work by ${profile.name}`,
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: project(p) })),
      },
    }),
    breadcrumbs([
      [profile.name, "/"],
      ["Product design", "/code"],
    ]),
  ];
}
