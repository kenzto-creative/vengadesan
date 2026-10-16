import type { ReactNode } from "react";

/** Compact brand marks for tool skills. */

const icons: Record<string, ReactNode> = {
  figma: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#F24E1E" d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" />
      <path fill="#FF7262" d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" />
      <path fill="#A259FF" d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" />
      <path fill="#1ABCFE" d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" />
      <path fill="#0ACF83" d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" />
    </svg>
  ),
  figjam: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#A259FF" />
      <path fill="#fff" d="M7 7h4v4H7zm6 0h4v4h-4zM7 13h4v4H7zm6 2.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M4 0h16v8H12L4 0zm0 8h8l8 8H4V8zm0 8h8v8l-8-8z" />
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#31A8FF" />
      <path fill="#001E36" d="M6.5 17.5V6.8h3.4c1.9 0 3.2 1.1 3.2 2.9 0 1.5-.9 2.5-2.2 2.8l2.6 5h-2.3l-2.3-4.6H8.5v4.6H6.5zm2-6.4h1.3c.9 0 1.4-.5 1.4-1.2S10.7 8.6 9.8 8.6H8.5v2.5z" />
    </svg>
  ),
  illustrator: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#FF9A00" />
      <path fill="#330000" d="M10.1 17.5 7 6.8h2.3l2 7.2 2-7.2H15l-3.1 10.7h-1.8zm7.2 0v-8.2h1.9v8.2h-1.9zm0-9.4V6.5h1.9v1.6h-1.9z" />
    </svg>
  ),
  miro: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#FFD02F" />
      <path fill="#050038" d="M6 18V6h2.2l2.6 7.4L13.4 6H16v12h-2.1V9.6L11.5 18H9.7l-2.6-8.4V18H6z" />
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#2684FF" d="M12 2 3.5 10.4c-.7.7-.7 1.8 0 2.5L12 21.5 22.8 10.7a1.2 1.2 0 0 0 0-1.7L12 2zm0 5.2 4.3 4.3L12 15.8l-4.3-4.3L12 7.2z" />
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M4.5 3.5 18 2l1.5 1.2v16.6L18 21.5 6.2 22.5 4.5 20.8V3.5zm3.2 3.2c.3-.2.7-.3 1.3-.4l7.2-.6v11.6c0 .4-.1.6-.3.8-.2.2-.5.3-1 .2l-6.4.5c-.6 0-.9-.3-.9-.8V7.4c0-.3.1-.5.1-.7zm1.5 1.5v8.8l5.1-.3V8l-5.1.4z"
      />
    </svg>
  ),
  maze: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#000" />
      <path fill="#fff" d="M7 7h4v4H7zm6 0h4v2h-4zm0 4h4v6h-4zm-6 2h4v4H7z" />
    </svg>
  ),
  hotjar: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#FF3C00" />
      <path fill="#fff" d="M8 17c0-2.5 1.3-3.8 2.6-4.8C9.3 11 8 9.7 8 7.5 8 5.6 9.4 4 12 4s4 1.6 4 3.5c0 2.2-1.3 3.5-2.6 4.7C14.7 13.2 16 14.5 16 17c0 2.2-1.6 3.5-4 3.5S8 19.2 8 17z" />
    </svg>
  ),
};

export default function ToolIcon({ id }: { id: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-ink-2 text-paper">
      {icons[id] ?? <span className="label text-faint">{id.slice(0, 2).toUpperCase()}</span>}
    </span>
  );
}
