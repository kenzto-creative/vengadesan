import Link from "next/link";
import { profile, site } from "@/lib/content";
import Mark from "./Mark";

/** Site footer — copyright and navigation only. */
export default function Credits() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-[var(--gutter)] pb-10 pt-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 text-[13px] text-dim md:flex-row">
        <p className="flex items-center gap-3">
          <Mark size={16} />
          <span>
            © {site.year} vengadesan. All rights reserved.
          </span>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-paper">
            My Role
          </Link>
          <Link href="/#both" className="hover:text-paper">
            About Me
          </Link>
          <Link href="/#experience" className="hover:text-paper">
            Experience
          </Link>
          <Link href="/work" className="hover:text-paper">
            Projects
          </Link>
          <a href={`mailto:${profile.email}`} className="hover:text-paper">
            Email
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            LinkedIn
          </a>
          <a href={profile.links.behance} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            Behance
          </a>
        </nav>
        <Link href="/#select" className="label flex items-center gap-2 transition-colors hover:text-paper">
          Back to top <span>↑</span>
        </Link>
      </div>
    </footer>
  );
}
