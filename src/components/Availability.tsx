import { profile } from "@/lib/content";

/** Open-to-work signal — compact for chrome / headers / contact. */
export default function Availability({ className = "" }: { className?: string }) {
  const a = profile.availability;
  if (!a.open) return null;

  return (
    <p className={`label flex flex-wrap items-center gap-2 text-dim ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-code opacity-40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-code" />
      </span>
      <span className="text-paper/90">{a.label}</span>
      <span className="text-faint">·</span>
      <span>{a.detail}</span>
    </p>
  );
}
