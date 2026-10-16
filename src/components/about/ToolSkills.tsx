import ToolIcon from "@/components/about/ToolIcon";
import { toolSkills } from "@/lib/content";
import { Reveal } from "@/components/ui";

/** Tool skills — icon + name + use, site-standard grid. */
export default function ToolSkills() {
  return (
    <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 xl:grid-cols-5">
      {toolSkills.map((tool, i) => (
        <Reveal key={tool.name} delay={i * 40}>
          <li
            className={`flex h-full items-start gap-3.5 rounded-[20px] border px-4 py-4 transition-colors md:px-5 md:py-5 ${
              tool.key
                ? "border-edit/35 bg-edit/[0.06]"
                : "border-white/10 bg-ink-2/25 hover:border-edit/25"
            }`}
          >
            <ToolIcon id={tool.icon ?? tool.name.toLowerCase()} />
            <div className="min-w-0">
              <p className="text-[15px] font-medium tracking-[-0.015em] text-paper">{tool.name}</p>
              <p className="mt-1 text-[12px] leading-snug text-dim">{tool.where}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
