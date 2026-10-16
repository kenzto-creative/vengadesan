import Link from "next/link";

/** Legacy `/edit` route — About now lives at `/about`. */
export default function LegacyEditRedirect() {
  return (
    <main id="main" className="grid min-h-[70svh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <p className="label">Moved</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-medium tracking-[-0.03em]">About is now here</h1>
        <Link href="/about" className="btn mt-8">
          Go to About <span className="arr">→</span>
        </Link>
      </div>
    </main>
  );
}
