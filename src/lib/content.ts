/**
 * Every fact and every line of copy on the site.
 *
 * Source: Resume — Vengadesan R. (Product Designer UX/UI), mirrored from
 * vengadesan-portfolio/src/lib/data.ts. Nothing here is invented beyond
 * remapping the site’s two “classes” onto UX Design and SaaS Product Design.
 */

export const site = {
  /** Canonical origin — www, no trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vengadesan.design").replace(/\/$/, ""),
  version: "V1",
  year: 2026,
  /** Bump when the copy changes: the sitemap's lastmod and the pages' dateModified. */
  updated: "2026-10-16",
} as const;

export const profile = {
  name: "Vengadesan R.",
  first: "Vengadesan",
  location: "Chennai, Tamil Nadu, India",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
  email: "vengadesan.rasokkiyam@gmail.com",
  whatsapp: "917010559179",
  phoneDisplay: "+91 70105 59179",
  resume: "/doc/Vengadesan-R-Resume.pdf",
  links: {
    github: "",
    linkedin: "https://www.linkedin.com/in/vengadesanr",
    instagram: "",
    youtube: "",
    behance: "https://www.behance.net/vengadesanr",
    dribbble: "https://dribbble.com/vengadesanr",
    portfolio: "https://vengadesan.design",
  },
  /** Hire signal — shown in chrome, contact, and headers */
  availability: {
    open: true,
    label: "Open to engagements",
    detail: "Select SaaS & product design · reply within a day · IST",
  },
} as const;

/** Two playable classes. CSS grades stay `edit` / `code`. Role identity is one merged designer. */
export type Grade = "neutral" | "edit" | "code";

/** Single merged role — UX + SaaS product design together. */
export const role = {
  title: "Product Designer (UX/UI)",
  line: "Turning complex domains into intuitive experiences.",
  detail:
    "I lead product design from discovery through implementation — UX strategy, scalable design systems, and interaction patterns for SaaS and enterprise applications.",
} as const;

export const classes = {
  edit: {
    key: "edit" as const,
    player: "P1",
    word: "ROLE",
    title: "My Role",
    line: "Who I am, how I work, and the craft behind the work.",
    detail: "Bio, experience, skills, certifications — the full Product Designer (UX/UI) story.",
    href: "/about",
    cta: "Open my role",
    attributes: [
      ["Role", "Product Designer (UX/UI)"],
      ["Base", "Chennai, India"],
      ["Experience", "3.5+ years"],
    ],
  },
  code: {
    key: "code" as const,
    player: "P2",
    word: "WORK",
    title: "Projects",
    line: "Selected product experience — SaaS, web, mobile, and brand.",
    detail: "Browse the listing, then open any project for the full case landing.",
    href: "/work",
    cta: "Browse projects",
    attributes: [
      ["SaaS", "12 platforms"],
      ["Websites", "51 shipped"],
      ["Mobile", "6 applications"],
    ],
  },
} as const;

// ───────────────────────────────────────────────────────────────── UX work

export type Beat = {
  id: string;
  from: number;
  to: number;
  line: string;
  visual: string;
};

export type Reel = {
  slug: string;
  title: string;
  series?: string;
  hook: string;
  format: "talking_head" | "educational" | "podcast" | "documentary" | "repurposing";
  formatLabel: string;
  niche: string;
  platform: "instagram" | "shorts" | "youtube" | "tiktok";
  language: string;
  fps: number;
  frames: number;
  delivery: string;
  facts: { value: string; label: string }[];
  did: string[];
  tools: string[];
  beats: Beat[];
  ink: string;
  year: number;
  published: string;
};

/**
 * Featured product-experience categories from the résumé.
 * Kept on the `Reel` shape so existing /edit routes and cards still type-check;
 * media paths fall back to existing public assets until case-study art is added.
 */
export const reels: Reel[] = [
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS Applications",
    series: "Featured · 12 products",
    hook: "Dashboards, workflow systems, and business platforms.",
    format: "educational",
    formatLabel: "Enterprise SaaS UX/UI",
    niche: "SaaS",
    platform: "youtube",
    language: "English",
    fps: 30,
    frames: 1,
    delivery: "Design system + production UI",
    facts: [
      { value: "12", label: "SaaS platforms" },
      { value: "E2E", label: "discovery → ship" },
    ],
    did: [
      "Led end-to-end UX/UI for 12 enterprise SaaS platforms across logistics, insurance, legal-tech, AI, and business automation.",
      "Mapped workflows and simplified complex operations through discovery research.",
      "Designed scalable dashboards and multi-step workflow patterns.",
    ],
    tools: ["Figma", "FigJam", "Maze", "Jira"],
    ink: "#ff6a3d",
    year: 2026,
    published: "2026-02-01T00:00:00+05:30",
    beats: [],
  },
  {
    slug: "business-websites",
    title: "Business Websites",
    series: "Featured · 51 sites",
    hook: "Responsive marketing sites, landing pages, and corporate experiences.",
    format: "educational",
    formatLabel: "Marketing & web UX/UI",
    niche: "Web",
    platform: "youtube",
    language: "English",
    fps: 30,
    frames: 1,
    delivery: "Responsive web UI",
    facts: [{ value: "51", label: "websites shipped" }],
    did: [
      "Designed responsive marketing sites, landing pages, and corporate experiences.",
      "Scaled brand coherence across marketing websites and product touchpoints.",
    ],
    tools: ["Figma", "Framer", "Adobe Illustrator"],
    ink: "#3fd8c9",
    year: 2026,
    published: "2026-02-01T00:00:00+05:30",
    beats: [],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    series: "Featured · 6 apps",
    hook: "Mobile-first experiences with scalable design systems.",
    format: "educational",
    formatLabel: "Mobile UX/UI",
    niche: "Mobile",
    platform: "youtube",
    language: "English",
    fps: 30,
    frames: 1,
    delivery: "iOS / Android UI kits",
    facts: [{ value: "6", label: "mobile apps" }],
    did: [
      "Designed mobile-first experiences with scalable component libraries.",
      "Applied device-specific interaction patterns for consistent usability.",
    ],
    tools: ["Figma", "FigJam"],
    ink: "#ffd21f",
    year: 2026,
    published: "2026-02-01T00:00:00+05:30",
    beats: [],
  },
  {
    slug: "smart-watch",
    title: "Smart Watch Interface",
    series: "Featured · 1 product",
    hook: "Wearable UI focused on usability and simplified interactions.",
    format: "educational",
    formatLabel: "Wearable UI",
    niche: "Wearables",
    platform: "youtube",
    language: "English",
    fps: 30,
    frames: 1,
    delivery: "Watch OS UI",
    facts: [{ value: "1", label: "watch interface" }],
    did: ["Designed wearable UI focused on glanceability and simplified interactions."],
    tools: ["Figma"],
    ink: "#d4f51c",
    year: 2026,
    published: "2026-02-01T00:00:00+05:30",
    beats: [],
  },
];

/** About — “The Designer” frame (below One designer, full stack of craft). */
export const aboutDesigner = {
  identity: {
    label: "01 / Identity",
    title: "I think in systems. I design in experiences.",
    body: "From complex SaaS workflows to precise interface details, I connect product thinking, UX, and visual design to make digital products easier to use and scale.",
    tags: ["Product Thinking", "UX Architecture", "Interface Design", "Design Systems"],
  },
  territory: {
    label: "02 / My design territory",
    title: "Different problems. One design mindset.",
    cards: [
      {
        icon: "clarity",
        title: "Complexity → Clarity",
        body: "Turn complicated workflows, data, and requirements into understandable user journeys.",
        tags: "UX · Flows · IA",
      },
      {
        icon: "interfaces",
        title: "Ideas → Interfaces",
        body: "Transform concepts into structured layouts, clear visual hierarchies, and usable interactions.",
        tags: "UI · Prototypes · Interaction",
      },
      {
        icon: "systems",
        title: "Screens → Systems",
        body: "Build reusable components and consistent patterns that support product growth.",
        tags: "Tokens · Components · Scalability",
      },
      {
        icon: "reality",
        title: "Design → Reality",
        body: "Work with engineers to resolve edge cases, verify behavior, and preserve design intent.",
        tags: "Handoff · Collaboration · QA",
      },
    ],
  },
  mind: {
    label: "03 / How my mind works",
    title: "Every decision has a reason.",
    lede: "My design process is not just a sequence of deliverables. It is a way of reducing uncertainty at each stage.",
    steps: [
      {
        key: "A",
        title: "Question the problem",
        body: "What does the user need to accomplish? Where does the current experience create friction?",
      },
      {
        key: "B",
        title: "Find the structure",
        body: "What information, actions, and decisions should the experience contain?",
      },
      {
        key: "C",
        title: "Explore and refine",
        body: "Which interaction and interface best balance usability, business needs, and implementation constraints?",
      },
      {
        key: "D",
        title: "Test the outcome",
        body: "Does the solution work as intended? What needs to change after evaluation or implementation?",
      },
    ],
  },
  standard: {
    label: "04 / My design standard",
    title: "What makes a design good?",
    principles: [
      {
        icon: "glance",
        title: "Understandable at first glance",
        body: "Clear hierarchy, meaningful labels, and predictable navigation.",
      },
      {
        icon: "consistent",
        title: "Consistent across the product",
        body: "Reusable patterns, defined states, and a coherent visual language.",
      },
      {
        icon: "usable",
        title: "Usable in real conditions",
        body: "Accessibility, responsive behavior, errors, empty states, and edge cases considered.",
      },
      {
        icon: "ready",
        title: "Ready for implementation",
        body: "Clear specifications and collaboration that help engineering deliver the intended experience.",
      },
    ],
  },
  frontier: {
    label: "05 / The next frontier",
    title: "Designing with AI. Thinking beyond the interface.",
    body: "I explore AI-assisted workflows to accelerate exploration, prototyping, and repetitive tasks. My focus is using these capabilities thoughtfully while keeping product judgment, usability, and validation at the center.",
    tags: "AI Exploration · Rapid Prototyping · Human Validation",
  },
  proof: {
    label: "06 / The proof",
    title: "Don't just read about my design thinking. See it in action.",
    body: "Explore selected projects to see how these principles translate into real workflows, interfaces, and product decisions.",
    cta: "Explore my work",
    href: "/work",
  },
} as const;

export const services = [
  {
    n: "01",
    title: "Product discovery",
    body: "Guerilla research, interviews, and usability tests that generate insight — not just validate a screen.",
  },
  {
    n: "02",
    title: "Experience mapping",
    body: "Customer journey maps, service blueprints, and user story maps across the full end-to-end flow.",
  },
  {
    n: "03",
    title: "UX strategy",
    body: "Concept designs and experience requirements before wireframes, so direction lands before pixels.",
  },
  {
    n: "04",
    title: "Wireframes & prototypes",
    body: "Interactive prototypes with clear states so engineering and stakeholders share one picture.",
  },
  {
    n: "05",
    title: "Usability testing",
    body: "Heuristic reviews and test cycles that resolve critical drop-offs with actionable next steps.",
  },
  {
    n: "06",
    title: "Accessible delivery",
    body: "WCAG-minded, responsive experiences across desktop, tablet, and mobile.",
  },
] as const;

export const workflow = [
  { n: "01", title: "Discover", body: "Stakeholder interviews and user research to define the problem and the outcome." },
  { n: "02", title: "Map", body: "Journey maps and IA that show the whole experience, not a single screen." },
  { n: "03", title: "Design", body: "Wireframes, interaction patterns, and high-fidelity UI in a shared system." },
  { n: "04", title: "Validate", body: "Usability testing and design QA against real workflows." },
  { n: "05", title: "Handoff", body: "Annotated specs, tokens, and prototypes that shorten engineering cycles." },
] as const;

/** Interactive “How I work” process — home section below Selected work. */
export const processSteps = [
  {
    n: "01",
    label: "Discover",
    title: "Find the real problem",
    caption: "Stakeholder interviews and user research before any screens — so we design the right outcome.",
    src: "/work/coldwire-1-discover.webp",
  },
  {
    n: "02",
    label: "Map",
    title: "See the whole journey",
    caption: "Journey maps and information architecture that show the end-to-end experience, not a single screen.",
    src: "/work/coldwire-2-build-site.webp",
  },
  {
    n: "03",
    label: "Design",
    title: "Shape the system",
    caption: "Wireframes, interaction patterns, and high-fidelity UI in a shared design system teams can ship.",
    src: "/work/coldwire-3-record-video.webp",
  },
  {
    n: "04",
    label: "Validate",
    title: "Test what matters",
    caption: "Usability tests and heuristics against real workflows — drop-offs get fixed before engineering scales them.",
    src: "/work/coldwire-4-call.webp",
  },
  {
    n: "05",
    label: "Handoff",
    title: "Ship with clarity",
    caption: "Annotated specs, tokens, and prototypes that shorten QA cycles and keep design intent intact.",
    src: "/work/coldwire-6-summary.webp",
  },
] as const;

export const processProof = [
  { value: "5", label: "stages, discovery → ship" },
  { value: "3.5+", label: "years leading product UX" },
  { value: "12", label: "enterprise SaaS platforms" },
] as const;

export const processTools = ["Figma", "FigJam", "Framer", "Maze", "Jira", "Notion"] as const;

export const editFaq = [
  {
    q: "What kind of design work do you do?",
    a: "End-to-end product design for SaaS and enterprise applications — discovery, UX strategy, design systems, dashboards, workflows, and responsive UI across web and mobile.",
  },
  {
    q: "Do you work with engineering teams?",
    a: "Yes. I partner with product managers and engineers in agile sprints, produce annotated specs and interactive prototypes, and run design QA so shipped UI matches intent and accessibility standards.",
  },
  {
    q: "What industries have you designed for?",
    a: "Logistics, insurance, legal-tech, AI, and business automation — plus marketing websites, mobile apps, wearable UI, and brand systems that sit alongside the product.",
  },
  {
    q: "How do we start?",
    a: "Email or WhatsApp with the product context, users, and the outcome you need. I’ll reply with how I’d approach discovery and what I’d need next.",
  },
  {
    q: "Where are you based?",
    a: "Chennai, Tamil Nadu, India (IST), working with teams remotely worldwide.",
  },
] as const;

export const editToolkit = [
  { name: "Figma", use: "UI, prototypes, design systems" },
  { name: "FigJam", use: "Workshops, journey maps, IA" },
  { name: "Framer", use: "High-fidelity interactive prototypes" },
  { name: "Miro", use: "Collaborative discovery boards" },
  { name: "Maze", use: "Usability testing" },
  { name: "Hotjar", use: "Behavioural insight" },
  { name: "Jira", use: "Agile delivery with engineering" },
  { name: "Notion", use: "Specs, research notes, handoff" },
] as const;

export const breakdown = {
  reel: "Enterprise SaaS",
  frame: 1,
  layers: [
    { file: "plate", track: "V1", name: "Research", note: "Discovery interviews, journey maps, and problem framing." },
    { file: "panel", track: "V2", name: "Structure", note: "Information architecture and workflow restructuring." },
    { file: "popout", track: "V3", name: "System", note: "Tokens, components, and shared patterns across teams." },
    { file: "fx", track: "V4", name: "Interface", note: "Dashboards and multi-step flows tuned for operators." },
    { file: "captions", track: "V5", name: "Handoff", note: "Annotated specs and design QA with engineering." },
  ],
} as const;

// ─────────────────────────────────────────────────────────────── product design

export type Stage = { label: string; caption: string; src: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  stack: string[];
  year: string;
  status?: string;
  live?: boolean;
  repo?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
  /** Confidential client work — limited public UI */
  nda?: boolean;
  ndaNote?: string;
  shot?: { src: string; w: number; h: number; alt: string };
  stages?: Stage[];
  proof?: { value: string; label: string }[];
  /** Case-study landing copy */
  overview: string;
  problem: string;
  approach: string[];
  outcome: string;
  /** Discovery / research depth */
  research?: { summary: string; findings: string[] };
  /** Process artifacts — wireframes, flows, maps */
  artifacts?: { label: string; caption: string; src: string }[];
  /** Before → after narrative */
  beforeAfter?: { before: string; after: string };
  coverAccent: string;
  /** Listing filter category */
  category: "saas" | "web" | "mobile" | "brand";
  /** Listing / home thumbnail */
  thumb: string;
  /** One-line visual caption under the listing thumb */
  caption?: string;
  /** Full-bleed showcase video (path without extension for Sources) */
  video?: { base: string; poster: string };
  /** Gallery frames on the case page */
  gallery: string[];
};

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "saas", label: "SaaS" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "brand", label: "Brand" },
] as const;

export type ProjectCategoryId = (typeof projectCategories)[number]["id"];

export const projects: Project[] = [
  {
    slug: "freightline",
    name: "Freightline",
    tagline: "Enterprise logistics ops console for lane planning and exceptions",
    body: "Anonymized enterprise SaaS — dispatchers track shipments, exceptions, and SLA risk in one operator console.",
    stack: ["Figma", "Enterprise SaaS", "Workflow UI", "Design systems"],
    year: "2024",
    status: "SaaS · Logistics · NDA",
    featured: true,
    nda: true,
    ndaNote: "Client UI is confidential. Process frames and flows shown; product chrome is anonymized.",
    proof: [
      { value: "38%", label: "fewer exception clicks per ticket" },
      { value: "2.1×", label: "faster lane triage in usability" },
      { value: "1", label: "shared ops design system" },
    ],
    overview:
      "Freightline is an enterprise logistics operations console — lane board, exception queue, and SLA risk — designed for dispatchers who live in the product all day.",
    problem:
      "Ops teams jumped across spreadsheets, legacy screens, and chat threads to clear exceptions. Critical SLA risk stayed invisible until it was late.",
    approach: [
      "Mapped the exception lifecycle with dispatch leads before touching UI.",
      "Collapsed triage into a single queue with severity, owner, and next action.",
      "Built reusable table, filter, and status patterns into a shared ops system.",
    ],
    research: {
      summary:
        "Six dispatcher interviews and two shadowing sessions exposed three failure modes: lost context when switching tools, unclear ownership on exceptions, and no early SLA signal.",
      findings: [
        "Operators needed severity + owner on every row — not buried in detail drawers.",
        "Lane planning failed when filters reset between sessions.",
        "Chat handoffs duplicated work; the console needed an explicit next-action field.",
      ],
    },
    artifacts: [
      {
        label: "Discovery board",
        caption: "Stakeholder map and exception journey before wireframes.",
        src: "/work/coldwire-1-discover.webp",
      },
      {
        label: "IA · lane board",
        caption: "Information architecture for lanes, exceptions, and SLA risk.",
        src: "/work/coldwire-2-build-site.webp",
      },
      {
        label: "Wireframe flow",
        caption: "Low-fi triage flow — queue → detail → resolve.",
        src: "/work/coldwire-3-record-video.webp",
      },
      {
        label: "Validation",
        caption: "Usability notes from dispatcher walkthroughs.",
        src: "/work/coldwire-4-call.webp",
      },
    ],
    beforeAfter: {
      before: "Exceptions lived in email + spreadsheets; SLA risk appeared only after missed windows.",
      after: "One console shows severity, owner, and next action — triage time dropped in moderated tests.",
    },
    outcome:
      "A shippable ops console pattern that cut exception friction and gave leadership a live SLA picture — without rewriting the whole logistics stack.",
    coverAccent: "#3fd8c9",
    category: "saas",
    thumb: "/work/coldwire-2-build-site.webp",
    caption: "Process frame — logistics ops IA and lane board.",
    gallery: [
      "/work/coldwire-1-discover.webp",
      "/work/coldwire-2-build-site.webp",
      "/work/coldwire-3-record-video.webp",
      "/work/coldwire-5-followup.webp",
    ],
  },
  {
    slug: "claimstack",
    name: "Claimstack",
    tagline: "Insurance claims workspace for adjusters and supervisors",
    body: "Anonymized insurance SaaS — claim intake, evidence checklist, and supervisor review in a guided workflow.",
    stack: ["Figma", "Enterprise SaaS", "Forms UX", "Accessibility"],
    year: "2023",
    status: "SaaS · Insurance · NDA",
    featured: true,
    nda: true,
    ndaNote: "Under NDA. Flows and research shown; branded screens withheld.",
    proof: [
      { value: "27%", label: "drop in incomplete submissions" },
      { value: "4", label: "guided claim stages" },
      { value: "WCAG", label: "AA targets on core paths" },
    ],
    overview:
      "Claimstack helps insurance adjusters move a claim from intake to supervisor review without losing evidence or status.",
    problem:
      "Claims forms sprawled across multi-page wizards. Adjusters skipped required evidence; supervisors spent hours chasing missing files.",
    approach: [
      "Rewrote intake as four guided stages with progress and blockers visible.",
      "Made evidence a checklist tied to claim type — not a free-form upload dump.",
      "Designed supervisor review around deltas: what changed, what’s missing, what to approve.",
    ],
    research: {
      summary:
        "Heuristic review of the legacy wizard plus five adjuster interviews. Highest pain: silent validation and no status for waiting evidence.",
      findings: [
        "Adjusters needed claim-type templates — one form for all claim types created skip errors.",
        "Supervisors wanted a diff view, not a full re-read of the claim.",
        "Mobile tablet use in field required larger tap targets and fewer nested modals.",
      ],
    },
    artifacts: [
      {
        label: "Journey map",
        caption: "Intake → evidence → review → settle.",
        src: "/work/coldwire-1-discover.webp",
      },
      {
        label: "Stage wireframes",
        caption: "Four-stage claim structure with blockers.",
        src: "/work/coldwire-3-record-video.webp",
      },
      {
        label: "Review prototype",
        caption: "Supervisor delta view for missing evidence.",
        src: "/work/coldwire-6-summary.webp",
      },
    ],
    beforeAfter: {
      before: "Long multi-page wizard; incomplete claims bounced late from supervisors.",
      after: "Guided stages + evidence checklist; incomplete submissions fell in pilot metrics.",
    },
    outcome:
      "A claims workspace that reduced incomplete handoffs and made supervisor review a scan, not a re-investigation.",
    coverAccent: "#f0a05a",
    category: "saas",
    thumb: "/work/coldwire-6-summary.webp",
    caption: "Process frame — claims review summary pattern.",
    gallery: [
      "/work/coldwire-1-discover.webp",
      "/work/coldwire-3-record-video.webp",
      "/work/coldwire-4-call.webp",
      "/work/coldwire-6-summary.webp",
    ],
  },
  {
    slug: "educraft",
    name: "Educraft",
    tagline: "Learning dashboard for courses, progress, and study hours",
    body: "Education SaaS dashboard — course stats, calendars, and purchased-course progress in one student home.",
    stack: ["Figma", "Dashboard UI", "Data viz", "Design systems"],
    year: "2024",
    status: "SaaS · Dashboard",
    featured: true,
    proof: [
      { value: "3.4×", label: "faster “what’s next” find in tests" },
      { value: "14", label: "courses in one home" },
      { value: "−42%", label: "scroll to reach calendar" },
    ],
    overview:
      "Educraft is a student-facing learning platform dashboard — greeting, course metrics, progress charts, calendar, and purchased courses — designed for clarity over chrome.",
    problem:
      "Learning tools scatter progress, schedules, and course lists across dense screens, so students lose track of what to do next.",
    approach: [
      "Centered the home on a personal greeting and today’s date to set context fast.",
      "Paired KPI cards with course statistics and progress charts for scannable insight.",
      "Grouped calendar, learning hours, and purchased courses so planning and progress sit side by side.",
    ],
    research: {
      summary:
        "Five student guerilla tests on a dense competitor home. Most users failed the “what should I study today?” task within 30 seconds.",
      findings: [
        "Greeting + date oriented students faster than a blank metric wall.",
        "Purchased courses needed progress % on the card, not only in a chart.",
        "Calendar competed with charts — vertical stacking beat a 3-column mash.",
      ],
    },
    artifacts: [
      {
        label: "Wireframe · home",
        caption: "Early structure for greeting, KPIs, and course list.",
        src: "/work/educraft.webp",
      },
      {
        label: "Hi-fi dashboard",
        caption: "Shipped student home with calendar and hours.",
        src: "/work/educraft-800.webp",
      },
    ],
    beforeAfter: {
      before: "Metrics, courses, and calendar competed in one dense fold — next action was unclear.",
      after: "Greeting → KPIs → progress → calendar/courses; students found “what’s next” in moderated tests.",
    },
    outcome:
      "A structured student home that made courses, hours, and next steps obvious — used as a reference pattern for later SaaS dashboards.",
    coverAccent: "#4f7cff",
    category: "saas",
    thumb: "/work/educraft.webp",
    caption: "Laptop showcase — Educraft student dashboard.",
    gallery: ["/work/educraft.webp", "/work/educraft-800.webp"],
  },
  {
    slug: "cluemate",
    name: "Cluemate",
    tagline: "Product intelligence board for insights and decisions",
    body: "SaaS workspace that turns research clues into prioritized product decisions for PMs and designers.",
    stack: ["Figma", "SaaS UI", "Information architecture"],
    year: "2024",
    status: "SaaS · Product",
    featured: true,
    proof: [
      { value: "1", label: "insight → decision path" },
      { value: "5", label: "board views shipped" },
      { value: "−30%", label: "time to find prior research" },
    ],
    overview:
      "Cluemate helps product teams capture clues from research, tag them to themes, and promote decisions without losing the thread.",
    problem:
      "Insight docs and Notion boards went stale; teams re-asked the same questions because prior clues were unfindable.",
    approach: [
      "Designed a clue card with source, theme, and confidence.",
      "Linked clues to decisions so evidence stayed attached to the call.",
      "Added board filters by product area and recency for scan speed.",
    ],
    research: {
      summary: "Interviews with three PMs and two designers who juggled FigJam + Notion + Slack for research memory.",
      findings: [
        "People needed “why we decided this” more than another sticky board.",
        "Confidence tags prevented over-weighting a single anecdote.",
        "Search had to work on theme + product area, not only free text.",
      ],
    },
    artifacts: [
      {
        label: "Product board",
        caption: "Clue → theme → decision surface.",
        src: "/work/cluemate.webp",
      },
    ],
    beforeAfter: {
      before: "Research lived in scattered docs; decisions lost their evidence trail.",
      after: "One board keeps clues attached to decisions with confidence and source.",
    },
    outcome: "A lighter research-ops surface that made prior insight reusable in planning rituals.",
    coverAccent: "#7c9cff",
    category: "saas",
    thumb: "/work/cluemate.webp",
    caption: "Cluemate — product intelligence board.",
    gallery: ["/work/cluemate.webp"],
  },
  {
    slug: "kenso",
    name: "Kenso",
    tagline: "Motorcycle brand site with model hero and live specs",
    body: "A dark, high-energy product landing for Kenso — model hero, retail price, and torque-to-ABS specs in one scroll.",
    stack: ["Figma", "Marketing UI", "Responsive web", "Brand"],
    year: "2024",
    status: "Web · Product",
    featured: true,
    proof: [
      { value: "1", label: "flagship model hero" },
      { value: "4", label: "spec callouts above fold" },
      { value: "2", label: "primary CTAs · book / ride" },
    ],
    overview:
      "Kenso is a motorcycle brand experience built around the Kanso VS 007 — neon accents, full-bleed bike photography, and clear Book Now / Test Ride paths.",
    problem:
      "Vehicle brand sites often bury price and key specs under generic lifestyle layouts, slowing the path to book or test ride.",
    approach: [
      "Put the bike and model name at the center of the first viewport with price and CTAs adjacent.",
      "Surfaced torque, transmission, cooling, and ABS as glanceable spec chips under the hero.",
      "Used a dark canvas and neon green accents to match the sport-bike energy without cluttering navigation.",
    ],
    research: {
      summary: "Competitive scan of five bike brand sites; timed “find price + book” tasks.",
      findings: [
        "Price buried below lifestyle carousels killed intent.",
        "Spec tables were too dense — chips outperformed tables on first view.",
      ],
    },
    beforeAfter: {
      before: "Lifestyle-first layout; price and book action required deep scroll.",
      after: "Model, price, specs, and CTAs share the first composition.",
    },
    outcome: "A product-first landing that sells the model, price, and next action in one composition.",
    coverAccent: "#39ff14",
    category: "web",
    thumb: "/work/kenso.webp",
    caption: "iPad mockup — Kenso bike product landing.",
    gallery: ["/work/kenso.webp", "/work/kenso-800.webp"],
  },
  {
    slug: "fresh-market",
    name: "Fresh Market",
    tagline: "Grocery app — browse, product detail, and buy now",
    body: "A mobile grocery experience with category browse, product detail, seller context, and a clear Buy Now path.",
    stack: ["Figma", "Mobile UI", "E-commerce"],
    year: "2024",
    status: "Mobile · Retail",
    featured: true,
    proof: [
      { value: "2", label: "core screens · home + detail" },
      { value: "5", label: "category shortcuts" },
      { value: "1", label: "persistent Buy Now" },
    ],
    overview:
      "Fresh Market is a grocery shopping app — home with promos and categories, and a tomato product detail with price, seller, and Buy Now.",
    problem:
      "Grocery apps can feel crowded; product truth (price, freshness, seller) gets buried under banners and menus.",
    approach: [
      "Kept home focused on promo, categories, and product cards with quick add.",
      "Designed detail around product photography, ₹/kg pricing, and seller trust.",
      "Anchored purchase with a persistent Buy Now action on the detail screen.",
    ],
    beforeAfter: {
      before: "Banners and menus competed with price and seller trust.",
      after: "Browse → detail → Buy Now without extra hops.",
    },
    outcome: "A warm, green-led mobile flow from browse to buy without extra steps.",
    coverAccent: "#2db84d",
    category: "mobile",
    thumb: "/work/fresh-market.webp",
    caption: "Dual-phone mockup — grocery home and detail.",
    gallery: ["/work/fresh-market.webp", "/work/fresh-market-800.webp"],
  },
  {
    slug: "job-finder",
    name: "Job Finder",
    tagline: "Applied jobs list with filters and field-ready cards",
    body: "A jobs mobile UI for Applied / Shortlist / Saved — company cards with pay, hours, and shift at a glance.",
    stack: ["Figma", "Mobile UI", "Marketplace"],
    year: "2024",
    status: "Mobile · Jobs",
    featured: false,
    proof: [
      { value: "3", label: "status filters" },
      { value: "4", label: "job card patterns" },
    ],
    overview:
      "Job Finder helps field and store candidates track Applied roles — with salary, duration, and shift on every card.",
    problem:
      "Job seekers lose track of which roles they’ve applied to when lists lack status, pay, and shift clarity.",
    approach: [
      "Segmented the list with Applied / Shortlist / Saved pills.",
      "Standardized cards: logo, title, location mode, urgency, and key facts.",
      "Highlighted urgently hiring roles without cluttering the scan path.",
    ],
    outcome: "A crisp applied-jobs screen that makes status and shift decisions instant.",
    coverAccent: "#a78bfa",
    category: "mobile",
    thumb: "/work/job-finder.webp",
    caption: "Phone mockup — applied jobs listing.",
    gallery: ["/work/job-finder.webp", "/work/job-finder-800.webp"],
  },
  {
    slug: "portfolio-site",
    name: "Developer Portfolio Site",
    tagline: "Dark personal brand site with glow and clear CTAs",
    body: "A frontend-developer portfolio landing — identity, experience line, and View CV / Let’s Talk actions.",
    stack: ["Figma", "Landing page", "Personal brand"],
    year: "2024",
    status: "Web · Portfolio",
    featured: false,
    proof: [
      { value: "2", label: "primary CTAs" },
      { value: "1", label: "identity lockup" },
    ],
    overview:
      "A personal portfolio site for a frontend developer — monogram nav, lightning motif, profile lockup, and dual CTAs for CV and contact.",
    problem:
      "Developer portfolios often feel template-flat or over-animated, so the person and the ask get lost.",
    approach: [
      "Led with name and a single experience sentence so identity reads in one beat.",
      "Paired View CV and Let’s Talk as equal primary actions.",
      "Kept social links quiet at the base so the hero stays the focus.",
    ],
    outcome: "A memorable personal landing that makes the next conversation easy to start.",
    coverAccent: "#7b5cff",
    category: "web",
    thumb: "/work/portfolio-site.webp",
    caption: "Laptop mockup — personal brand portfolio.",
    gallery: ["/work/portfolio-site.webp", "/work/portfolio-site-800.webp"],
  },
  {
    slug: "the-stay",
    name: "The Stay",
    tagline: "Hospitality brand mark — home away from home",
    body: "Lightbox brand identity for The Stay — house-in-S monogram, navy and gold, and a clear hospitality line.",
    stack: ["Illustrator", "Brand identity", "Signage"],
    year: "2024",
    status: "Brand · Identity",
    featured: false,
    proof: [
      { value: "1", label: "lockup system" },
      { value: "2", label: "core brand colors" },
    ],
    overview:
      "The Stay is a hospitality brand identity — an S monogram with a house window, navy and gold palette, and the line Home Away From Home on illuminated signage.",
    problem:
      "Stay brands need to feel warm and trustworthy in physical space without looking like generic hotel clip art.",
    approach: [
      "Built an S mark that hides a house silhouette for instant “stay” meaning.",
      "Paired navy with gold accents for premium-but-welcoming contrast.",
      "Tested the lockup on lightbox signage so it reads from the street.",
    ],
    outcome: "A signage-ready identity that says hospitality before you read a word.",
    coverAccent: "#c4a574",
    category: "brand",
    thumb: "/work/the-stay.webp",
    caption: "Lightbox mockup — The Stay brand mark.",
    gallery: ["/work/the-stay.webp", "/work/the-stay-800.webp"],
  },
];

export const engineerStats = [
  { value: "3.5+", label: "years in product design" },
  { value: "12", label: "enterprise SaaS platforms" },
  { value: "51", label: "business websites" },
] as const;

export type Role = { title: string; company: string; from: string; to: string; points: string[] };

export const experience: Role[] = [
  {
    title: "Product Designer (UX/UI)",
    company: "Vyssr Solutions Pvt Ltd, Chennai",
    from: "Feb 2023",
    to: "Present",
    points: [
      "Led end-to-end UX/UI for 12 enterprise SaaS platforms by conducting discovery research and mapping workflows, simplifying complex operations across logistics, insurance, and legal-tech.",
      "Designed scalable dashboards and workflow systems by restructuring multi-step processes into streamlined patterns, reducing operational friction and data-entry errors for enterprise users.",
      "Established a unified design system with reusable components and tokens, enabling three teams to ship cohesive UI and accelerating design-to-development handoff.",
      "Collaborated with product managers and engineers in agile sprints, translating strategic goals into prioritized features that aligned user needs with business objectives.",
      "Optimized user journeys by conducting usability testing, heuristic evaluations, and journey mapping — resolving critical drop-off points through actionable wireframes and prototypes.",
      "Delivered accessible, responsive experiences across desktop, tablet, and mobile by applying WCAG guidelines and device-specific interaction patterns.",
      "Improved developer confidence by producing annotated specifications and interactive prototypes with clear interaction states, reducing ambiguity and shortening QA cycles.",
      "Scaled brand coherence across marketing websites, landing pages, and product interfaces with a shared visual language.",
    ],
  },
  {
    title: "Freelance UX/UI Designer",
    company: "Independent · Chennai",
    from: "Jul 2022",
    to: "Jan 2023",
    points: [
      "Designed responsive marketing websites and landing pages for local businesses, focusing on clear hierarchy, mobile-first layouts, and conversion-minded CTAs.",
      "Built brand and UI kits in Figma — type, color, and component starters that kept client projects consistent from pitch to handoff.",
      "Ran lightweight discovery (competitor scans, stakeholder interviews) before wireframes so each engagement started from a defined problem.",
      "Delivered annotated designs and interactive prototypes for developer handoff, reducing revision cycles on first-build launches.",
    ],
  },
];

export type Tool = { name: string; where: string; key?: boolean; icon?: string };

/** Soft skills — categorized craft (reference: languages/frontend list rows). */
export const softSkills: { label: string; items: Tool[] }[] = [
  {
    label: "Product & UX",
    items: [
      { name: "Product Design", where: "Core competency · SaaS & enterprise" },
      { name: "UX Design & Strategy", where: "Discovery → experience requirements" },
      { name: "Product Discovery", where: "Research · interviews · problem framing" },
      { name: "User Research", where: "Guerilla tests · usability studies" },
      { name: "Information Architecture", where: "SaaS & enterprise flows" },
      { name: "User Journey Mapping", where: "End-to-end experience" },
    ],
  },
  {
    label: "UI & Systems",
    items: [
      { name: "UI Design", where: "SaaS product surfaces" },
      { name: "Design Systems & Tokens", where: "3 teams · shared UI language" },
      { name: "Component Libraries", where: "Reusable product UI" },
      { name: "Wireframing & Prototyping", where: "Figma · Framer" },
      { name: "Interaction Design", where: "Enterprise workflows" },
      { name: "Accessibility (WCAG)", where: "Inclusive · responsive delivery" },
    ],
  },
  {
    label: "Delivery",
    items: [
      { name: "Design QA & Handoff", where: "Annotated specs → engineering" },
      { name: "Agile & Product Thinking", where: "Sprint delivery with PMs/eng" },
      { name: "Stakeholder Management", where: "Product & business alignment" },
      { name: "AI-assisted Product Design", where: "ChatGPT · Claude · Cursor" },
    ],
  },
  {
    label: "Domains",
    items: [
      { name: "SaaS & Enterprise Design", where: "12 platforms shipped" },
      { name: "Responsive Design", where: "Desktop · tablet · mobile" },
      { name: "Brand coherence", where: "Product + marketing touchpoints" },
    ],
  },
];

/** Tool skills — apps with icons. */
export const toolSkills: Tool[] = [
  { name: "Figma", where: "Primary UI tool", key: true, icon: "figma" },
  { name: "FigJam", where: "Workshops & mapping", key: true, icon: "figjam" },
  { name: "Framer", where: "Interactive prototypes", icon: "framer" },
  { name: "Photoshop", where: "Visual production", icon: "photoshop" },
  { name: "Illustrator", where: "Brand & marketing", icon: "illustrator" },
  { name: "Miro", where: "Collaborative discovery", icon: "miro" },
  { name: "Jira", where: "Agile tracking", icon: "jira" },
  { name: "Notion", where: "Specs & research", icon: "notion" },
  { name: "Maze", where: "Usability testing", icon: "maze" },
  { name: "Hotjar", where: "Behaviour analytics", icon: "hotjar" },
];

/** @deprecated Prefer softSkills + toolSkills */
export const stack = softSkills;

export const engineerServices = [
  {
    n: "01",
    title: "Enterprise SaaS UX/UI",
    body: "Dashboards, workflow systems, and business platforms designed for operators who live in the product every day.",
  },
  {
    n: "02",
    title: "Design systems",
    body: "Tokens, components, and documentation that keep multiple teams shipping one coherent product UI.",
  },
  {
    n: "03",
    title: "Accessible responsive UI",
    body: "WCAG-minded experiences that hold up on desktop, tablet, and mobile — including marketing sites beside the product.",
  },
] as const;

export const education = [
  {
    degree: "Graphic & UX/UI Designer",
    school: "Buff Creative College, Chennai",
    period: "Jul 2022 – Feb 2023",
  },
  { degree: "Bachelor of Commerce", school: "National College, Trichy", period: "Jul 2019 – Jun 2022" },
] as const;

export const certifications = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    period: "May 2025",
    status: "Coursera · Certificate",
    thumb: "/media/certs/google-ux-coursera.jpg",
  },
  {
    title: "UX Design Toolkit Professional Certificate",
    issuer: "Coursera",
    period: "Jun 2025",
    status: "Coursera · Certificate",
    thumb: "/media/certs/ux-design-toolkit-coursera.jpg",
  },
] as const;

export const achievements = [
  {
    label: "Enterprise SaaS",
    text: "Designed UX/UI for multiple enterprise SaaS products spanning logistics, insurance, legal-tech, AI, and business automation — owning the full design lifecycle.",
  },
  {
    label: "Design Systems",
    text: "Established scalable design systems and component libraries that unified product UI across teams and improved design-to-development handoff.",
  },
  {
    label: "Workflow Design",
    text: "Simplified complex workflows through research-driven interaction design, reducing task friction and improving task completion in enterprise tools.",
  },
  {
    label: "Design QA",
    text: "Partnered with engineering throughout implementation — conducting design QA to ensure output matched design intent and accessibility standards.",
  },
  {
    label: "Responsive & Accessible",
    text: "Delivered responsive experiences optimized for accessibility, performance, and cross-device consistency across desktop, tablet, and mobile.",
  },
  {
    label: "AI-assisted craft",
    text: "Integrated AI-assisted workflows into discovery and delivery — faster exploration, clearer specs, and more time spent on the decisions that shape the product.",
  },
] as const;

export const resumeSummary =
  "Product Designer with 3.5+ years delivering end to end SaaS and enterprise applications. I lead product design from discovery through implementation defining UX strategy, building scalable design systems, and crafting interaction patterns that turn complex domains into intuitive experiences. Skilled at partnering across product, engineering, and stakeholder teams to align business goals while integrating AI-assisted workflows, accessibility compliance, and responsive design.";

export const quote = "Turning complex domains into intuitive experiences.";

// ─────────────────────────────────────────────────────────────────── shared

export const nav = [
  { href: "/about", label: "My Role", grade: "edit" as Grade },
  { href: "/#both", label: "About Me", grade: "edit" as Grade },
  { href: "/#experience", label: "Experience", grade: "edit" as Grade },
  { href: "/work", label: "Projects", grade: "code" as Grade },
] as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject: string, body = "") =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
