import React from "react";
import { Settings, Search } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  totalTools: number;
  totalDomains: number;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  viewMode: "Reactor" | "Grid" | "Evidence";
  setViewMode: (v: "Reactor" | "Grid" | "Evidence") => void;
}

export function ForgeHeader({
  totalTools,
  totalDomains,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}: Props) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-[var(--border-strong)] pb-8">
      <div className="max-w-4xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-3 text-[var(--museum-brown)]">
          <Settings className="w-4 h-4" /> System Online
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tight text-[var(--museum-ink)] mb-4">
          CAPABILITY FORGE
        </h1>
        <p className="text-[var(--ink-soft)] font-medium text-lg leading-relaxed max-w-3xl mb-6">
          A technical reactor for interface systems, AI tools, spatial
          experiments, and production workflows.
        </p>
        <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--museum-brown)]">
          <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">
            [{totalTools} Tools Indexed]
          </span>
          <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">
            [{totalDomains} Domains]
          </span>
          <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">
            [Active Build Stack]
          </span>
          <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">
            [Production-Ready]
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 min-w-[300px]">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, systems, evidence..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full pl-9 pr-4 py-2.5 bg-white/60 border border-[var(--border-strong)] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--museum-brown)] focus:bg-white transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-1 bg-[rgba(62,39,35,0.06)] p-1 rounded-lg border border-[rgba(62,39,35,0.08)]">
          {(["Reactor", "Grid", "Evidence"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "flex-1 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md transition-all shadow-sm",
                viewMode === mode
                  ? "bg-white text-[var(--museum-brown)] shadow-sm"
                  : "text-[var(--ink-muted)] hover:text-[var(--museum-ink)] hover:bg-white/40",
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
