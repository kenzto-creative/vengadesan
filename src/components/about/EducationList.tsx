import { education } from "@/lib/content";

/** Education as a matching index row list — separate from Experience. */
export default function EducationList() {
  return (
    <ol className="mt-10 border-t border-white/10 md:mt-14">
      {education.map((e) => (
        <li key={e.degree} className="border-b border-white/10">
          <div className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 py-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.35fr)_auto] md:gap-x-8 md:py-9">
            <p className="text-[clamp(22px,2.4vw,34px)] font-medium tracking-[-0.03em]">{e.degree}</p>
            <p className="max-w-[44ch] text-[15px] leading-snug text-dim">{e.school}</p>
            <p className="flex items-center gap-2 tabular text-[14px] text-dim md:justify-self-end">
              {e.period}
              <span aria-hidden className="text-lg text-faint">
                →
              </span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
