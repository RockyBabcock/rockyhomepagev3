import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { TechItem, techStackData, levelColors } from "../../data/techStack";

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
  const orbitNodes = useMemo(() => {
    let related = selectedTech.relatedTools || [];
    if (related.length === 0) {
      related = displayedTechs
        .filter((t) => t.id !== selectedTech.id)
        .slice(0, 3)
        .map((t) => t.name);
    }
    return related.slice(0, 5); // max 5 for clean layout
  }, [selectedTech, displayedTechs]);

  const secondaryNodes = displayedTechs.filter(
    (t) => t.id !== selectedTech.id && !orbitNodes.includes(t.name),
  );

  return (
    <div className="lg:col-span-6 flex flex-col gap-6 w-full max-w-full">
      <div className="forge-reactor-panel p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden w-full bg-[var(--museum-ink)] text-white rounded-xl shadow-2xl border border-[rgba(255,255,255,0.1)] min-h-[400px]">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: accentColor }}
        />

        {/* Status bar top */}
        <div className="absolute top-4 left-6 right-6 flex justify-between items-start z-20">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-bold tracking-widest text-white/50 uppercase">
              Active Core
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              {selectedTech.level}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#06d6a0] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0] animate-pulse" />{" "}
              Stable
            </span>
          </div>
        </div>

        {/* Reactor Visual Engine */}
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center my-6 z-10">
          {/* SVG Connections & Scan Rings */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 320 320"
          >
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Center Glow */}
            <circle cx="160" cy="160" r="100" fill="url(#coreGlow)" />

            {/* Scanning Rings */}
            <motion.circle
              cx="160"
              cy="160"
              r="60"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              strokeDasharray="4 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="opacity-50"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="100"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="2 6"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Dynamic Connection Lines to Orbits */}
            {orbitNodes.map((_, i) => {
              const angle = i * (360 / orbitNodes.length) * (Math.PI / 180);
              const radius = 120;
              const targetX = 160 + radius * Math.cos(angle);
              const targetY = 160 + radius * Math.sin(angle);
              return (
                <motion.line
                  key={i}
                  x1="160"
                  y1="160"
                  x2={targetX}
                  y2={targetY}
                  stroke={accentColor}
                  strokeWidth="1.5"
                  className="opacity-40"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Core Output */}
          <motion.div
            key={selectedTech.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-20 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#111] border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={{ borderColor: accentColor }}
          >
            <span className="font-space font-bold text-lg leading-tight text-center px-2 word-break-break-word">
              {selectedTech.name}
            </span>
          </motion.div>

          {/* Orbital Nodes */}
          {orbitNodes.map((toolName, i) => {
            const angle =
              (i * (360 / orbitNodes.length) - 90) * (Math.PI / 180);
            const radius = 120;
            const x = `calc(50% + ${radius * Math.cos(angle)}px)`;
            const y = `calc(50% + ${radius * Math.sin(angle)}px)`;

            // Find if this exists in tech stack to make clickable
            const matchedTool = techStackData.find((t) => t.name === toolName);

            return (
              <motion.button
                key={toolName}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                onClick={() => matchedTool && setSelectedTechId(matchedTool.id)}
                className={cn(
                  "absolute w-16 h-16 rounded-full flex items-center justify-center text-[9px] font-mono font-bold leading-tight text-center px-1 z-30 transition-colors shadow-lg border",
                  matchedTool
                    ? "bg-[#1a1a1a] hover:bg-[#222] cursor-pointer text-white border-[rgba(255,255,255,0.2)] hover:border-white"
                    : "bg-[#111] text-white/50 border-[rgba(255,255,255,0.05)] cursor-default",
                )}
                style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
              >
                {toolName}
              </motion.button>
            );
          })}
        </div>

        {/* Meters */}
        <div className="w-full relative z-20 mt-4 grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-end justify-between mb-1">
              <span className="text-[9px] font-mono text-[#888] font-bold uppercase tracking-widest">
                Proficiency
              </span>
              <span className="text-[10px] font-mono text-white">
                {(selectedTech.proficiency || 8) * 10}%
              </span>
            </div>
            <div className="h-1 bg-white/10 w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: 0 }}
                animate={{ width: `${(selectedTech.proficiency || 8) * 10}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-end justify-between mb-1">
              <span className="text-[9px] font-mono text-[#888] font-bold uppercase tracking-widest">
                Readiness
              </span>
              <span className="text-[10px] font-mono text-white">90%</span>
            </div>
            <div className="h-1 bg-white/10 w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: 0 }}
                animate={{ width: `90%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Nodes (Cells) */}
      <div className="flex flex-col gap-3 w-full">
        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)]">
          System Registry / Unlinked Nodes
        </span>
        <div className="flex gap-2 flex-wrap pb-2">
          {secondaryNodes.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTechId(tool.id)}
              className="px-3 py-1.5 rounded bg-[var(--museum-paper)] border border-[rgba(62,39,35,0.1)] text-[10px] font-bold font-mono text-[var(--ink-soft)] hover:bg-white hover:border-[var(--museum-brown)] hover:text-[var(--museum-ink)] transition-all shadow-sm"
            >
              {tool.name}
            </button>
          ))}
          {secondaryNodes.length === 0 && (
            <span className="text-[10px] font-mono text-[var(--ink-muted)] border border-dashed border-[rgba(62,39,35,0.1)] px-3 py-1.5 rounded">
              All filtered nodes linked.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
