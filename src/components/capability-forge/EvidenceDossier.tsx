import React from "react";
import {
  FileText,
  CheckCircle2,
  LayoutGrid,
  Activity,
  GitMerge,
} from "lucide-react";
import { TechItem } from "../../data/techStack";

interface Props {
  selectedTech: TechItem;
}

export function EvidenceDossier({ selectedTech }: Props) {
  return (
    <div className="lg:col-span-4 forge-evidence-dossier p-6 md:p-8 flex flex-col h-full lg:max-h-[800px] overflow-y-auto custom-scrollbar shadow-sm w-full bg-[var(--museum-paper)] border border-[rgba(62,39,35,0.08)] rounded-xl">
      <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-4 mb-6 shrink-0">
        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--museum-brown)] flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" /> Tool Dossier
        </span>
        <span className="font-mono text-[10px] font-bold text-[var(--ink-muted)] truncate max-w-[120px]">
          #{selectedTech.id}
        </span>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <div>
          <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
            System Role
          </h4>
          <p className="text-sm font-medium leading-relaxed opacity-90 border-l-2 pl-4 border-[rgba(62,39,35,0.2)] text-[var(--ink-soft)]">
            {selectedTech.description}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Proof Signals
          </h4>
          <ul className="space-y-3">
            {selectedTech.evidence.map((proof, i) => (
              <li
                key={i}
                className="bg-white border border-[rgba(62,39,35,0.08)] rounded-lg p-3 text-sm font-medium text-[var(--ink-soft)] leading-snug flex items-start gap-3 shadow-[0_2px_4px_rgba(62,39,35,0.02)] break-words"
              >
                <span className="text-[10px] font-mono font-bold mt-0.5 text-[var(--museum-brown)] opacity-80 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{proof}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5" /> Used In
          </h4>
          <div className="flex flex-col gap-2">
            {selectedTech.usedIn.map((project, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--museum-ink)] border-b border-[rgba(62,39,35,0.08)] pb-2 last:border-0 last:pb-0 break-words"
              >
                <span className="text-[var(--museum-brown)] font-bold shrink-0">
                  {">"}
                </span>{" "}
                {project}
              </div>
            ))}
          </div>
        </div>

        {selectedTech.learningFocus && (
          <div>
            <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-orange)]" />{" "}
              Learning Frontier
            </h4>
            <p className="text-xs font-mono text-[var(--ink-soft)] leading-relaxed bg-[var(--museum-paper-deep)] p-3 rounded-lg border border-[rgba(62,39,35,0.08)]">
              {selectedTech.learningFocus}
            </p>
          </div>
        )}

        {selectedTech.nextStep && (
          <div>
            <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
              <GitMerge className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />{" "}
              Next Tech Upgrade
            </h4>
            <p className="text-xs font-mono text-[var(--ink-soft)] leading-relaxed bg-[var(--museum-paper-deep)] p-3 rounded-lg border border-[rgba(62,39,35,0.08)]">
              {selectedTech.nextStep}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
