"use client";

import { useEffect, useState } from "react";
import type { Grade } from "@/lib/content";
import GiantWord from "./GiantWord";

/**
 * Shows `from` on mount, then wipes to `to` after a short beat.
 * Uses edit → code keys so GiantWord’s wipe direction is consistent.
 */
export default function AutoGiantWord({
  from,
  to,
  color,
  delay = 1200,
  className = "",
}: {
  from: string;
  to: string;
  color: string;
  delay?: number;
  className?: string;
}) {
  const [active, setActive] = useState<Grade>("edit");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive("code");
      return;
    }
    const id = window.setTimeout(() => setActive("code"), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  return (
    <GiantWord
      className={className}
      active={active}
      words={[
        { key: "edit", text: from, color },
        { key: "code", text: to, color },
      ]}
    />
  );
}
