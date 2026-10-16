import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — 404 · Vengadesan R." },
  description: "This page isn't on the site.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[100svh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <p className="label">Error 404</p>
        <h1 className="display mt-6 text-[clamp(96px,22vw,320px)]" style={{ fontStretch: "40%" }}>
          Lost
        </h1>
        <p className="mx-auto mt-6 max-w-[36ch] text-dim">This page isn&apos;t here. It may have moved, or the link has a typo.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn" style={{ background: "var(--color-paper)" }}>
            Back to home <span className="arr">→</span>
          </Link>
          <Link href="/about" className="btn btn-ghost">
            About
          </Link>
          <Link href="/work" className="btn btn-ghost">
            Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
