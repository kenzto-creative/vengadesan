"use client";

import { useId, useMemo, useState } from "react";

type Mode = "design" | "prototype" | "inspect";
type StageId = "problem" | "wireframe" | "ui" | "prototype" | "validation";
type LayerId =
  | "dashboard"
  | "analytics"
  | "users"
  | "system"
  | "components"
  | "buttons"
  | "inputs"
  | "tables"
  | "cards";

type Layer = {
  id: LayerId;
  label: string;
  kind: "page" | "frame" | "component";
  depth?: number;
};

type Stage = {
  id: StageId;
  label: string;
  short: string;
  blurb: string;
};

const LAYERS: Layer[] = [
  { id: "dashboard", label: "Dashboard", kind: "page" },
  { id: "analytics", label: "Analytics", kind: "page" },
  { id: "users", label: "User Management", kind: "page" },
  { id: "system", label: "Design System", kind: "frame" },
  { id: "components", label: "Components", kind: "frame" },
  { id: "buttons", label: "Buttons", kind: "component", depth: 1 },
  { id: "inputs", label: "Inputs", kind: "component", depth: 1 },
  { id: "tables", label: "Tables", kind: "component", depth: 1 },
  { id: "cards", label: "Cards", kind: "component", depth: 1 },
];

const STAGES: Stage[] = [
  {
    id: "problem",
    label: "Problem",
    short: "01",
    blurb: "Frame the operator job-to-be-done and where friction costs time or errors.",
  },
  {
    id: "wireframe",
    label: "Wireframe",
    short: "02",
    blurb: "Structure information architecture and primary flows before visual polish.",
  },
  {
    id: "ui",
    label: "UI Exploration",
    short: "03",
    blurb: "Explore hierarchy, density, and component patterns on a realistic SaaS surface.",
  },
  {
    id: "prototype",
    label: "Prototype",
    short: "04",
    blurb: "Connect states and interactions so stakeholders can feel the product path.",
  },
  {
    id: "validation",
    label: "Validation",
    short: "05",
    blurb: "Pressure-test usability, edge cases, and handoff readiness with the team.",
  },
];

const MODES: { id: Mode; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "prototype", label: "Prototype" },
  { id: "inspect", label: "Inspect" },
];

function inspectorFor(layer: Layer, stage: Stage, mode: Mode) {
  const base = {
    name: layer.label,
    type: layer.kind === "page" ? "Screen / Frame" : layer.kind === "frame" ? "Page" : "Component",
  };

  const intents: Record<LayerId, string> = {
    dashboard: "Give operators a scannable home for KPIs, alerts, and next actions.",
    analytics: "Surface trends without burying the question the chart should answer.",
    users: "Make roles, access, and status obvious in dense admin tables.",
    system: "Hold tokens, type, and spacing so product UI stays coherent as it scales.",
    components: "Reusable building blocks with defined states and documented usage.",
    buttons: "Primary / secondary / ghost hierarchy with clear affordance and focus.",
    inputs: "Form fields with labels, helper text, error, and disabled states.",
    tables: "Sortable rows, sticky headers, and readable numeric alignment.",
    cards: "Metric and content cards with consistent padding and elevation.",
  };

  const typeSpecs: Record<LayerId, string> = {
    dashboard: "Display 28/34 · Body 14/22 · Label 11/ caps",
    analytics: "Title 20/28 · Axis 11 · Value 16/mono",
    users: "Row 14/20 · Meta 12 · Badge 10/caps",
    system: "Scale: 11 · 12 · 14 · 16 · 20 · 28",
    components: "Auto-layout · 8px grid · 4px radius tokens",
    buttons: "14 medium · px-16 py-10 · radius 999",
    inputs: "Label 12 · Field 14 · Helper 12 dim",
    tables: "Header 11 medium · Cell 13 · Row h 44",
    cards: "Title 13 · Value 28 display · Pad 16–20",
  };

  const colors =
    layer.id === "system" || layer.id === "components"
      ? "ink · ink-2 · paper · edit #FF6A3D · code #3FD8C9"
      : "Surface ink-2 · Border white/10 · Accent edit · Text paper/dim";

  const interaction: Record<Mode, string> = {
    design: "Selection outlines, spacing guides, and component bounds for refinement.",
    prototype: "Click paths from nav → detail; hover and focus states wired for review.",
    inspect: "Tokens and spacing exposed for engineering handoff and design QA.",
  };

  const responsive =
    layer.kind === "page"
      ? "Desktop primary · tablet collapses side nav · mobile stacks KPI row"
      : "Scales with auto-layout; min touch 44px on interactive parts";

  return {
    ...base,
    intent: intents[layer.id],
    typography: typeSpecs[layer.id],
    colors,
    interaction: `${interaction[mode]} Stage focus: ${stage.blurb}`,
    responsive,
    stageNote: stage.blurb,
  };
}

function CanvasArt({
  layer,
  stage,
  mode,
  selectedLabel,
}: {
  layer: LayerId;
  stage: StageId;
  mode: Mode;
  selectedLabel: string;
}) {
  const wire = stage === "wireframe" || stage === "problem";
  const showFlow = mode === "prototype" || stage === "prototype";
  const showGuides = mode === "design" || mode === "inspect" || stage === "ui";

  return (
    <div
      className={`relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[14px] border transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none ${
        wire ? "border-dashed border-white/25 bg-ink/80" : "border-white/12 bg-ink-2 shadow-[0_24px_80px_rgb(0_0_0_/_0.45)]"
      }`}
    >
      {/* App chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-edit/80" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate mono text-[10px] tracking-[0.12em] text-faint">
          {wire ? "LOW-FI · STRUCTURE" : "SAAS · DASHBOARD EXPLORATION"}
        </span>
      </div>

      <div className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr]">
        {/* Side nav */}
        <aside className={`border-r border-white/10 p-2 ${wire ? "opacity-50" : ""}`}>
          {["D", "A", "U", "S"].map((n, i) => (
            <div
              key={n}
              className={`mb-1.5 flex h-8 items-center justify-center rounded-md text-[10px] mono ${
                (layer === "dashboard" && i === 0) ||
                (layer === "analytics" && i === 1) ||
                (layer === "users" && i === 2) ||
                ((layer === "system" || layer === "components") && i === 3)
                  ? "bg-edit/20 text-edit"
                  : "bg-white/[0.03] text-faint"
              }`}
            >
              {n}
            </div>
          ))}
        </aside>

        {/* Main surface */}
        <div className="relative min-h-[280px] p-3 md:min-h-[320px] md:p-4">
          {showGuides && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-lg border border-edit/50 md:inset-4"
              style={{ boxShadow: "0 0 0 1px rgb(255 106 61 / .15)" }}
            />
          )}

          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="label text-faint">{selectedLabel}</p>
              <p className={`mt-1 font-medium tracking-[-0.03em] ${wire ? "text-dim" : "text-paper"} text-[15px] md:text-[17px]`}>
                {layer === "analytics"
                  ? "Revenue & retention"
                  : layer === "users"
                    ? "Team access"
                    : layer === "system" || layer === "components"
                      ? "Token library"
                      : "Operations overview"}
              </p>
            </div>
            {!wire && (
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[10px] text-dim">
                {stage === "validation" ? "In review" : "Exploring"}
              </span>
            )}
          </div>

          {/* KPI / component row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Active", v: "1,284" },
              { k: "Conversion", v: "4.6%" },
              { k: "NPS", v: "62" },
            ].map((m, i) => (
              <div
                key={m.k}
                className={`rounded-[10px] border p-2.5 ${
                  (layer === "cards" || layer === "dashboard") && i === 0 && showGuides
                    ? "border-edit/60 bg-edit/10"
                    : wire
                      ? "border-dashed border-white/20 bg-transparent"
                      : "border-white/10 bg-ink/50"
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-faint">{m.k}</p>
                <p className={`mt-1 mono text-[13px] ${wire ? "text-dim" : "text-paper"}`}>{wire ? "——" : m.v}</p>
              </div>
            ))}
          </div>

          {/* Chart / table block */}
          <div
            className={`mt-2.5 rounded-[10px] border p-3 ${
              (layer === "analytics" || layer === "tables") && showGuides
                ? "border-edit/55 bg-edit/[0.07]"
                : wire
                  ? "border-dashed border-white/20"
                  : "border-white/10 bg-ink/40"
            }`}
          >
            {layer === "tables" || layer === "users" ? (
              <div className="space-y-1.5">
                {["Name", "Role", "Status"].map((h) => (
                  <div key={h} className="grid grid-cols-3 gap-2 border-b border-white/8 pb-1.5 text-[10px] text-faint">
                    <span>{h}</span>
                    <span className="opacity-70">·</span>
                    <span className="opacity-70">·</span>
                  </div>
                ))}
                {["Asha · Admin · Active", "Leo · Editor · Invite", "Mia · Viewer · Active"].map((row) => (
                  <p key={row} className={`truncate text-[11px] ${wire ? "text-dim/70" : "text-dim"}`}>
                    {wire ? "████  ·  ████" : row}
                  </p>
                ))}
              </div>
            ) : layer === "buttons" || layer === "inputs" ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1.5 text-[11px] ${wire ? "border border-dashed border-white/25 text-dim" : "bg-edit text-ink"}`}>
                  Primary
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-dim">Secondary</span>
                <span className={`h-8 min-w-[120px] rounded-md border px-2 text-[11px] leading-8 text-faint ${wire ? "border-dashed border-white/25" : "border-white/15 bg-ink"}`}>
                  Search users…
                </span>
              </div>
            ) : (
              <div className="flex h-[88px] items-end gap-1.5 px-1">
                {[40, 58, 46, 72, 64, 80, 55, 68, 90, 74, 62, 78].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-sm ${wire ? "bg-white/15" : i === 8 ? "bg-edit" : "bg-code/55"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            )}
          </div>

          {showFlow && (
            <div className="pointer-events-none absolute right-4 top-16 hidden items-center gap-1 md:flex" aria-hidden>
              <span className="rounded border border-code/40 bg-ink/80 px-1.5 py-0.5 text-[9px] text-code">Nav</span>
              <span className="h-px w-6 bg-code/50" />
              <span className="rounded border border-code/40 bg-ink/80 px-1.5 py-0.5 text-[9px] text-code">Detail</span>
            </div>
          )}

          {mode === "inspect" && (
            <p className="mt-3 mono text-[9px] tracking-[0.1em] text-edit/90">
              PAD 16 · GAP 8 · RADIUS 10 · BORDER white/10
            </p>
          )}
        </div>
      </div>

      {/* Annotation chip */}
      <div className="border-t border-white/10 px-3 py-2">
        <p className="text-[11px] text-dim">
          <span className="text-edit">Note</span> ·{" "}
          {stage === "problem"
            ? "Operators lose time jumping between tools for the same decision."
            : stage === "wireframe"
              ? "Prioritize KPI scan path before chart ornament."
              : stage === "validation"
                ? "Check empty states, errors, and keyboard focus order."
                : "Tighten hierarchy so the primary action reads in under 2 seconds."}
        </p>
      </div>
    </div>
  );
}

/** Interactive Figma-inspired design workspace for the About page. */
export default function DesignWorkspace() {
  const baseId = useId();
  const [mode, setMode] = useState<Mode>("design");
  const [layerId, setLayerId] = useState<LayerId>("dashboard");
  const [stageId, setStageId] = useState<StageId>("ui");
  const zoom = 100;

  const layer = LAYERS.find((l) => l.id === layerId)!;
  const stage = STAGES.find((s) => s.id === stageId)!;
  const inspector = useMemo(() => inspectorFor(layer, stage, mode), [layer, stage, mode]);

  return (
    <section aria-labelledby={`${baseId}-title`} className="scroll-mt-24">
      <div className="mb-8 md:mb-10">
        <p className="label text-faint">Inside the studio</p>
        <h2
          id={`${baseId}-title`}
          className="mt-3 max-w-[22ch] text-[clamp(26px,3.4vw,42px)] font-medium leading-[1.08] tracking-[-0.035em]"
        >
          Inside my design workspace
        </h2>
        <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-dim md:text-[16px]">
          A product-design studio view — layers, canvas, inspector, and iteration stages — so you can see how I explore SaaS interfaces.
        </p>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-white/12 bg-[#0e0e10] shadow-[0_30px_100px_rgb(0_0_0_/_0.5)]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 px-3 py-2.5 md:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="rec !h-1.5 !w-1.5" />
            <p className="truncate mono text-[10px] tracking-[0.14em] text-paper/85">
              DESIGN STUDIO · <span className="text-dim">SaaS Dashboard Exploration</span>
            </p>
          </div>

          <div role="tablist" aria-label="Workspace mode" className="flex rounded-full border border-white/10 bg-ink/60 p-0.5">
            {MODES.map((m) => {
              const on = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setMode(m.id)}
                  className={`rounded-full px-3 py-1 text-[11px] transition-colors ${
                    on ? "bg-edit text-ink" : "text-dim hover:text-paper"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          <p className="mono text-[10px] tracking-[0.12em] text-faint">{zoom}%</p>
        </div>

        {/* Desktop / tablet grid */}
        <div className="hidden grid-cols-[200px_minmax(0,1fr)_220px] lg:grid-cols-[220px_minmax(0,1fr)_240px] md:grid">
          {/* Layers */}
          <nav aria-label="Layers and pages" className="border-r border-white/10 bg-ink/40">
            <p className="border-b border-white/10 px-3 py-2 label text-faint">Layers & pages</p>
            <ul className="max-h-[420px] overflow-y-auto p-1.5">
              {LAYERS.map((l) => {
                const on = l.id === layerId;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setLayerId(l.id)}
                      aria-current={on ? "true" : undefined}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] transition-colors ${
                        on ? "bg-edit/15 text-paper" : "text-dim hover:bg-white/[0.04] hover:text-paper"
                      }`}
                      style={{ paddingLeft: `${8 + (l.depth ?? 0) * 12}px` }}
                    >
                      <span className={`mono text-[9px] ${on ? "text-edit" : "text-faint"}`}>
                        {l.kind === "page" ? "PG" : l.kind === "frame" ? "FR" : "CP"}
                      </span>
                      <span className="truncate">{l.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Canvas */}
          <div className="relative min-h-[460px] bg-[radial-gradient(ellipse_at_center,rgb(255_255_255_/_.03),transparent_55%)] p-5 lg:p-7">
            <p className="mb-4 text-center mono text-[9px] tracking-[0.16em] text-faint">
              CANVAS · {mode.toUpperCase()} · {stage.label.toUpperCase()}
            </p>
            <CanvasArt layer={layerId} stage={stageId} mode={mode} selectedLabel={layer.label} />
          </div>

          {/* Inspector */}
          <aside aria-label="Design inspector" className="border-l border-white/10 bg-ink/40">
            <p className="border-b border-white/10 px-3 py-2 label text-faint">Inspector</p>
            <dl className="space-y-4 overflow-y-auto p-3 text-[12px]">
              <div>
                <dt className="label text-faint">Name</dt>
                <dd className="mt-1 font-medium text-paper">{inspector.name}</dd>
                <dd className="mt-0.5 text-dim">{inspector.type}</dd>
              </div>
              <div>
                <dt className="label text-faint">Intent</dt>
                <dd className="mt-1 leading-relaxed text-dim">{inspector.intent}</dd>
              </div>
              <div>
                <dt className="label text-faint">Typography</dt>
                <dd className="mt-1 mono text-[11px] leading-relaxed text-dim">{inspector.typography}</dd>
              </div>
              <div>
                <dt className="label text-faint">Color tokens</dt>
                <dd className="mt-1 leading-relaxed text-dim">{inspector.colors}</dd>
              </div>
              <div>
                <dt className="label text-faint">Interaction</dt>
                <dd className="mt-1 leading-relaxed text-dim">{inspector.interaction}</dd>
              </div>
              <div>
                <dt className="label text-faint">Responsive</dt>
                <dd className="mt-1 leading-relaxed text-dim">{inspector.responsive}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Mobile / small tablet stack */}
        <div className="md:hidden">
          <div className="border-b border-white/10 p-3">
            <p className="label mb-2 text-faint">Layers</p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {LAYERS.map((l) => {
                const on = l.id === layerId;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLayerId(l.id)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] ${
                      on ? "border-edit/50 bg-edit/15 text-paper" : "border-white/12 text-dim"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="bg-[radial-gradient(ellipse_at_center,rgb(255_255_255_/_.03),transparent_55%)] p-4">
            <CanvasArt layer={layerId} stage={stageId} mode={mode} selectedLabel={layer.label} />
          </div>
          <div className="border-t border-white/10 p-3">
            <p className="label text-faint">Inspector</p>
            <p className="mt-2 text-[13px] font-medium">{inspector.name}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-dim">{inspector.intent}</p>
            <p className="mt-2 mono text-[10px] text-faint">{inspector.typography}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-white/10 bg-ink/55">
          <div className="flex items-center justify-between gap-3 px-3 pt-2.5 md:px-4">
            <p className="label text-faint">Design iterations</p>
            <p className="hidden text-[11px] text-dim sm:block">{stage.blurb}</p>
          </div>
          <div
            role="tablist"
            aria-label="Design iteration stages"
            className="flex gap-2 overflow-x-auto px-3 py-3 md:grid md:grid-cols-5 md:overflow-visible md:px-4"
          >
            {STAGES.map((s, i) => {
              const on = s.id === stageId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStageId(s.id)}
                  className={`min-w-[132px] shrink-0 rounded-[12px] border px-3 py-2.5 text-left transition-colors md:min-w-0 ${
                    on ? "border-edit/55 bg-edit/12" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <span className={`mono text-[9px] tracking-[0.14em] ${on ? "text-edit" : "text-faint"}`}>
                    {s.short}
                    {i < STAGES.length - 1 ? " →" : ""}
                  </span>
                  <span className="mt-1 block text-[12px] font-medium tracking-[-0.02em] text-paper">{s.label}</span>
                </button>
              );
            })}
          </div>
          <p className="px-3 pb-3 text-[12px] text-dim sm:hidden">{stage.blurb}</p>
        </div>
      </div>
    </section>
  );
}
