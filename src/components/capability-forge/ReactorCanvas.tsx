import React from "react";
import { cn } from "../../lib/utils";
import { TechItem, levelColors } from "../../data/techStack";

interface Props {
  selectedTech: TechItem;
  displayedTechs: TechItem[];
  accentColor: string;
  setSelectedTechId: (id: string) => void;
}

export function ReactorCanvas({
  selectedTech,
  displayedTechs,
  accentColor,
  setSelectedTechId,
}: Props) {
  return (
    <div className="lg:col-span-6 flex flex-col gap-6 w-full max-w-full">
      <div className="forge-reactor-panel p-6 md:p-8 flex flex-col relative overflow-hidden w-full bg-[#111] text-white rounded-2xl shadow-[var(--shadow-elevated)] border border-[#333]">
        <div
          className="absolute -top-10 -right-10 w-64 h-64 blur-[80px] opacity-[0.15] rounded-full pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-sm bg-white/10 border border-white/20 text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                {selectedTech.level}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
                {selectedTech.category}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight break-words">
              {selectedTech.name}
            </h2>
          </div>
          <div className="flex flex-col gap-1 items-end shrink-0">
            <span className="text-[9px] font-mono uppercase text-white/40">
              Status
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-white uppercase">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />{" "}
              Active
            </span>
          </div>
        </div>

        <div className="mb-8 relative z-10 w-full">
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#AAA] mb-2 block">
            // System Role
          </span>
          <p
            className="text-sm md:text-base font-medium leading-relaxed opacity-90 border-l-2 pl-4 break-words"
            style={{ borderColor: accentColor }}
          >
            {selectedTech.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 relative z-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-[#888] font-bold mb-1">
              Operational Confidence
            </span>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-sm",
                    i < (selectedTech.proficiency || 8)
                      ? "opacity-100"
                      : "opacity-20",
                  )}
                  style={{
                    backgroundColor:
                      i < (selectedTech.proficiency || 8)
                        ? accentColor
                        : "#666",
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-right text-white/50 mt-1">
              {(selectedTech.proficiency || 8) * 10}%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono uppercase text-[#888] font-bold mb-1">
              Deployment Readiness
            </span>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-sm",
                    i < 9 ? "opacity-100" : "opacity-20",
                  )}
                  style={{
                    backgroundColor: i < 9 ? accentColor : "#666",
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-right text-white/50 mt-1">
              90%
            </span>
          </div>
        </div>

        {selectedTech.relatedTools && selectedTech.relatedTools.length > 0 && (
          <div className="mt-auto relative z-10 pt-6 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#AAA] mb-4 block">
              // Related Stack
            </span>
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
              <div
                className="forge-relationship-node px-4 py-2 rounded border border-[var(--accent-orange)] text-[12px] font-mono font-bold text-white shadow-lg shrink-0 z-10"
                style={{
                  borderColor: accentColor,
                  background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                  boxShadow: `0 0 20px color-mix(in srgb, ${accentColor} 20%, transparent)`,
                }}
              >
                {selectedTech.name}
              </div>

              <div className="absolute left-6 top-10 bottom-4 w-px bg-white/20 md:hidden z-0" />
              <div className="absolute left-[110px] top-6 w-12 h-px bg-white/20 hidden md:block z-0" />

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1 md:pl-8 relative z-10 flex-wrap">
                {selectedTech.relatedTools.map((t) => (
                  <div key={t} className="flex items-center gap-3 md:gap-0">
                    <div className="w-4 h-px bg-white/20 md:hidden" />
                    <span className="px-3 py-1.5 rounded bg-[#1f1a17] border border-white/10 text-[10px] font-mono text-[#CCC] hover:border-white/30 transition-colors">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)] px-1">
          Secondary Nodes
        </span>
        <div className="flex flex-wrap gap-2 w-full">
          {displayedTechs
            .filter((t) => t.id !== selectedTech.id)
            .map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTechId(tool.id)}
                className="forge-tool-chip px-3 py-2 rounded-lg bg-white/60 border border-[var(--border-strong)] text-[11px] font-bold font-mono text-[var(--ink-soft)] hover:bg-white hover:border-[var(--museum-brown)] hover:text-[var(--museum-ink)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--museum-brown)] shadow-sm flex items-center gap-2 max-w-full"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full opacity-60 shrink-0"
                  style={{
                    backgroundColor: (levelColors as any)[tool.level] || "#aaa",
                  }}
                />
                <span className="truncate">{tool.name}</span>
              </button>
            ))}
          {displayedTechs.length <= 1 && (
            <span className="text-[11px] font-mono text-[var(--ink-muted)] py-2">
              No other nodes found.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
