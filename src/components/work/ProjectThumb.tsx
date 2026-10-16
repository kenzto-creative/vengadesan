import { asset } from "@/lib/media";

/** Shared project thumbnail used on home + /work listing. */
export default function ProjectThumb({
  src,
  alt,
  accent,
  index,
  className = "",
  aspectClass = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  accent: string;
  index: number;
  className?: string;
  aspectClass?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border border-white/10 bg-ink-2 ${aspectClass} ${className}`}
      style={{ background: `linear-gradient(145deg, ${accent}28, #111113 55%)` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        width={640}
        height={480}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-90 transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:opacity-100"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 display text-[28px] text-paper md:text-[34px]" style={{ fontStretch: "48%" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
