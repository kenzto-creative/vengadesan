import { classes, profile, projects, role, site } from "@/lib/content";
import { copy } from "@/lib/seo";

export const dynamic = "force-static";

/** /llms.txt — plain-text site summary for AI assistants. */
export function GET() {
  const u = (path: string) => `${site.url}${path}`;
  const links = [profile.links.linkedin, profile.links.behance, profile.links.dribbble, profile.links.portfolio].filter(Boolean);
  const body = `# ${profile.name} (Vengat)

> ${role.title} in ${profile.location}. ${role.line} ${role.detail}

## Hire
- Email: ${profile.email}
- WhatsApp / phone: ${profile.phoneDisplay}
- Based in ${profile.location} (${profile.tzLabel})

## Pages
- [${copy.home.title}](${u("/")}): ${copy.home.description}
- [${copy.edit.title}](${u("/about")}): ${classes.edit.line}
- [${copy.code.title}](${u("/work")}): ${classes.code.line}
${projects.map((p) => `- [${p.name}](${u(`/work/${p.slug}`)}): ${p.tagline}`).join("\n")}

## Profiles
${links.map((l) => `- ${l}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
