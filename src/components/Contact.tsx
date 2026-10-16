"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { mailLink, profile, whatsappLink } from "@/lib/content";
import { play } from "@/lib/sfx";
import { Reveal, Rise } from "./ui";

type Choice = "edit" | "code" | "both";

const CHOICES: Record<Choice, { tag: string; title: string; ask: string; wa: string; subject: string; color: string }> = {
  edit: {
    tag: "P1",
    title: "About / intro chat",
    ask: "Want to know how I work? Ask anything about craft, process, or fit — then we can open a project brief.",
    wa: "Hi Vengadesan — I'd like to learn more about working with you: ",
    subject: "About — ",
    color: "var(--color-edit)",
  },
  code: {
    tag: "P2",
    title: "Project inquiry",
    ask: "Tell me about the product surface, the users, and what friction costs you today.",
    wa: "Hi Vengadesan — I have a project in mind: ",
    subject: "Project — ",
    color: "var(--color-code)",
  },
  both: {
    tag: "FULL",
    title: "Full design engagement",
    ask: "Shipping a product? I'll lead UX from discovery through a design system your engineers can ship.",
    wa: "Hi Vengadesan — I need end-to-end product design for: ",
    subject: "Product design engagement — ",
    color: "linear-gradient(90deg, var(--color-edit), var(--color-code))",
  },
};

/** Fired by any "hire" link elsewhere on the page to preselect a choice. */
export const HIRE_EVENT = "ks:hire";

const noSubscribe = () => () => {};
const hireFromUrl = (): Choice | null => {
  const h = new URLSearchParams(window.location.search).get("hire");
  return h && h in CHOICES ? (h as Choice) : null;
};

export default function Contact({ initial = "edit" }: { initial?: Choice }) {
  const fromUrl = useSyncExternalStore(noSubscribe, hireFromUrl, () => null);
  const [picked, setPicked] = useState<Choice | null>(null);
  const [copied, setCopied] = useState(false);
  const choice = picked ?? fromUrl ?? initial;
  const c = CHOICES[choice];

  useEffect(() => {
    const on = (e: Event) => setPicked((e as CustomEvent<Choice>).detail);
    window.addEventListener(HIRE_EVENT, on);
    return () => window.removeEventListener(HIRE_EVENT, on);
  }, []);

  const pick = (k: Choice) => {
    setPicked(k);
    play("select");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      play("tick");
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-white/10 px-[var(--gutter)] pb-24 pt-28 md:pt-36" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="mono rounded-[4px] bg-paper px-1.5 py-0.5 text-[10px] text-ink">05</span>
            Continue?
          </p>
        </Reveal>
        <Rise
          as="h2"
          text="Ready, player?"
          className="display mt-6 text-[clamp(72px,15vw,260px)]"
          style={{ fontStretch: "40%" }}
        />
        <span id="contact-title" className="sr-only">
          Contact
        </span>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <div role="radiogroup" aria-label="What do you need?" className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(CHOICES) as Choice[]).map((k) => {
                const on = choice === k;
                return (
                  <button
                    key={k}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => pick(k)}
                    className="group relative overflow-hidden rounded-2xl border p-5 text-left transition-colors"
                    style={{ borderColor: on ? "transparent" : "rgb(255 255 255 / .1)", background: on ? "rgb(255 255 255 / .05)" : "transparent" }}
                  >
                    {on && <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: CHOICES[k].color }} />}
                    <span className="label-sm" style={{ color: k === "both" ? "var(--color-paper)" : CHOICES[k].color }}>
                      {CHOICES[k].tag}
                    </span>
                    <span className="mt-6 block text-[19px] font-semibold leading-tight tracking-[-0.02em]">{CHOICES[k].title}</span>
                    <span
                      className="mt-3 block h-4 w-4 rounded-full border border-white/25 transition-all"
                      style={{ background: on ? "var(--color-paper)" : "transparent", boxShadow: on ? "inset 0 0 0 4px var(--color-ink)" : undefined }}
                    />
                  </button>
                );
              })}
            </div>

            <p key={choice} className="lede mt-8 max-w-[40ch] animate-[fadeUp_.5s_var(--ease-out-expo)]">
              {c.ask}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink(c.wa)} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#25d366" }} onClick={() => play("select")}>
                WhatsApp me <span className="arr">→</span>
              </a>
              <a href={mailLink(c.subject)} className="btn btn-ghost" onClick={() => play("select")}>
                Email me <span className="arr">→</span>
              </a>
            </div>
          </div>

          <dl className="grid min-w-0 content-start gap-6 border-white/10 lg:border-l lg:pl-10 xl:pl-12">
            <div>
              <dt className="label">Email</dt>
              <dd className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-[17px] underline decoration-white/20 underline-offset-4 hover:decoration-[var(--accent)]"
                >
                  {profile.email}
                </a>
                <button type="button" onClick={copy} className="label-sm shrink-0 text-faint transition-colors hover:text-paper">
                  {copied ? "copied ✓" : "copy"}
                </button>
              </dd>
            </div>
            <div>
              <dt className="label">WhatsApp / phone</dt>
              <dd className="mt-1.5 text-[17px]">
                <a href={`tel:+${profile.whatsapp}`}>{profile.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd className="mt-1.5 text-[17px]">{profile.location} · working worldwide</dd>
            </div>
            {profile.availability.open ? (
              <div>
                <dt className="label">Availability</dt>
                <dd className="mt-1.5 flex items-center gap-2 text-[17px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-code opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-code" />
                  </span>
                  {profile.availability.label}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="label">Elsewhere</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-dim">
                <a className="hover:text-paper" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
                <a className="hover:text-paper" href={profile.links.behance} target="_blank" rel="noopener noreferrer">
                  Behance ↗
                </a>
                <a className="hover:text-paper" href={profile.links.dribbble} target="_blank" rel="noopener noreferrer">
                  Dribbble ↗
                </a>
                <a className="hover:text-paper" href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">
                  Portfolio ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
