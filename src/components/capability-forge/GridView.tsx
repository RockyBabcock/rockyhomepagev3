import React from "react";
import { ArrowRight } from "lucide-react";
import { TechItem } from "../../data/techStack";

interface Props {
  displayedTechs: TechItem[];
  setSelectedTechId: (id: string) => void;
  setViewMode: (v: "Reactor" | "Grid" | "Evidence") => void;
}

export function GridView({
  displayedTechs,
  setSelectedTechId,
  setViewMode,
}: Props) {
  return (
    <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-max w-full">
      {displayedTechs.map((tool) => (
        <button
          key={tool.id}
          onClick={() => {
            setSelectedTechId(tool.id);
            setViewMode("Reactor");
          }}
          className="bg-white/70 border border-[var(--border-strong)] rounded-xl p-5 text-left hover:bg-white hover:border-[var(--museum-brown)] shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--museum-brown)] flex flex-col gap-3 group w-full"
        >
          <div className="flex justify-between items-start w-full">
            <h3 className="font-space font-bold text-lg text-[var(--museum-ink)] group-hover:text-[var(--accent-pink)] transition-colors pr-2 break-words">
              {tool.name}
            </h3>
            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--ink-muted)] bg-[var(--museum-paper)] shrink-0">
              {tool.category}
            </span>
          </div>
          <p className="text-xs font-medium text-[var(--ink-soft)] line-clamp-2 w-full">
            {tool.description}
          </p>
          <div className="mt-auto pt-4 border-t border-[rgba(62,39,35,0.06)] flex justify-between items-center w-full">
            <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)]">
              {tool.evidence.length} Proofs
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--museum-ink)] shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
}
