import Link from "next/link";

/** Legacy `/code` route — Projects now live at `/work`. */
export default function LegacyCodeRedirect() {
  return (
    <main id="main" className="grid min-h-[70svh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <p className="label">Moved</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-medium tracking-[-0.03em]">Projects are now here</h1>
        <Link href="/work" className="btn mt-8">
          Go to Projects <span className="arr">→</span>
        </Link>
      </div>
    </main>
  );
}
