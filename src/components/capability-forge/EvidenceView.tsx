import React from "react";
import { Settings, FileText } from "lucide-react";
import { TechItem } from "../../data/techStack";

interface Props {
  displayedTechs: TechItem[];
  setSelectedTechId: (id: string) => void;
  setViewMode: (v: "Reactor" | "Grid" | "Evidence") => void;
}

export function EvidenceView({
  displayedTechs,
  setSelectedTechId,
  setViewMode,
}: Props) {
  return (
    <div className="lg:col-span-10 flex flex-col gap-8 w-full">
      {displayedTechs.map((tool) => (
        <div
          key={tool.id}
          className="bg-white/50 border border-[var(--border-strong)] rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedTechId(tool.id);
                setViewMode("Reactor");
              }}
              className="px-3 py-1 bg-[var(--museum-brown)] hover:bg-[var(--museum-ink)] transition-colors text-white text-[10px] font-mono font-bold uppercase rounded-md shadow-sm shrink-0"
            >
              {tool.name}
            </button>
            <div className="h-px bg-[rgba(62,39,35,0.1)] flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full">
            <div className="w-full">
              <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.1em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
                <Settings className="w-3 h-3" /> System Role
              </h4>
              <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">
                {tool.description}
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.1em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Concrete Proof
              </h4>
              <ul className="space-y-2">
                {tool.evidence.map((proof, i) => (
                  <li
                    key={i}
                    className="text-xs font-mono font-medium text-[var(--ink-soft)] flex gap-2 items-start opacity-90 break-words"
                  >
                    <span className="text-[var(--museum-brown)] font-bold shrink-0">
                      {">"}
                    </span>{" "}
                    {proof}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
