import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { sections } from "./MuseumScrollEngine";

export function MuseumEngineHero() {
  const [hoveredHall, setHoveredHall] = React.useState<string | null>(null);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-24 md:py-0 bg-[var(--museum-paper)] overflow-hidden">
      {/* Editorial Identity */}
      <div className="z-10 flex flex-col md:w-1/3 mb-16 md:mb-0 relative">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-[var(--color-rainbow-red)] opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />
        <h1 className="font-space font-bold tracking-tighter text-6xl md:text-[clamp(4rem,8vw,10rem)] leading-[0.8] text-[var(--museum-ink)] uppercase mb-6 flex flex-col">
          <span>Rocky</span>
          <span className="text-[var(--museum-brown)]">Babcock</span>
        </h1>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[var(--ink-soft)] max-w-sm leading-relaxed mb-8">
          Creative Technologist /{" "}
          <span className="text-[var(--accent-cyan)]">AI Interfaces</span> / Web
          Systems
        </p>
      </div>

      {/* Interactive Museum Engine Map (SVG) */}
      <div className="z-10 md:w-1/3 relative flex justify-center items-center h-[400px] md:h-[600px] w-full">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[var(--museum-brown)]/5 to-transparent pointer-events-none blur-3xl opacity-50" />

        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            {/* Connection Lines */}
            <motion.path
              d="M 200 80 Q 200 200 320 160"
              fill="none"
              stroke={
                hoveredHall === "projects" || hoveredHall === "forge"
                  ? "var(--accent-orange)"
                  : "rgba(62,39,35,0.15)"
              }
              strokeWidth="2"
              className="transition-colors duration-500"
            />
            <motion.path
              d="M 200 80 Q 200 200 80 160"
              fill="none"
              stroke={
                hoveredHall === "curators-select" || hoveredHall === "entrance"
                  ? "var(--accent-pink)"
                  : "rgba(62,39,35,0.15)"
              }
              strokeWidth="2"
              className="transition-colors duration-500"
            />
            <motion.path
              d="M 80 160 Q 200 200 80 280"
              fill="none"
              stroke={
                hoveredHall === "experiments" || hoveredHall === "archives"
                  ? "var(--color-rainbow-green)"
                  : "rgba(62,39,35,0.15)"
              }
              strokeWidth="2"
              className="transition-colors duration-500"
            />
            <motion.path
              d="M 320 160 Q 200 200 320 280"
              fill="none"
              stroke={
                hoveredHall === "garden" || hoveredHall === "signal"
                  ? "var(--accent-cyan)"
                  : "rgba(62,39,35,0.15)"
              }
              strokeWidth="2"
              className="transition-colors duration-500"
            />

            {/* Path glow effects (only if hovered) */}
            {(hoveredHall === "forge" || hoveredHall === "projects") && (
              <motion.circle
                r="3"
                fill="var(--accent-orange)"
                filter="blur(2px)"
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path="M 200 80 Q 200 200 320 160"
                />
              </motion.circle>
            )}
            {(hoveredHall === "experiments" || hoveredHall === "entrance") && (
              <motion.circle
                r="3"
                fill="var(--color-rainbow-green)"
                filter="blur(2px)"
              >
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path="M 80 160 Q 200 200 80 280"
                />
              </motion.circle>
            )}
          </svg>

          {/* Engine Nodes */}
          {/* Top Node */}
          <EngineNode
            id="entrance"
            label="Entrance"
            x="50%"
            y="10%"
            onClick={() => scrollToSection("entrance")}
            isHovered={hoveredHall === "entrance"}
            setHovered={setHoveredHall}
            delay={0.1}
          />
          {/* Left Nodes */}
          <EngineNode
            id="curators-select"
            label="Curator's Selection"
            x="20%"
            y="30%"
            onClick={() => scrollToSection("curators-select")}
            isHovered={hoveredHall === "curators-select"}
            setHovered={setHoveredHall}
            delay={0.2}
          />
          <EngineNode
            id="experiments"
            label="Experiment Chamber"
            x="20%"
            y="65%"
            onClick={() => scrollToSection("experiments")}
            isHovered={hoveredHall === "experiments"}
            setHovered={setHoveredHall}
            delay={0.3}
          />
          {/* Center */}
          <EngineNode
            id="projects"
            label="Project Lab"
            x="50%"
            y="50%"
            onClick={() => scrollToSection("projects")}
            isHovered={hoveredHall === "projects"}
            setHovered={setHoveredHall}
            size="large"
            delay={0.4}
          />
          {/* Right Nodes */}
          <EngineNode
            id="forge"
            label="Capability Forge"
            x="80%"
            y="30%"
            onClick={() => scrollToSection("forge")}
            isHovered={hoveredHall === "forge"}
            setHovered={setHoveredHall}
            delay={0.5}
          />
          <EngineNode
            id="archives"
            label="Archives"
            x="80%"
            y="65%"
            onClick={() => scrollToSection("archives")}
            isHovered={hoveredHall === "archives"}
            setHovered={setHoveredHall}
            delay={0.6}
          />
          {/* Bottom Nodes */}
          <EngineNode
            id="garden"
            label="Digital Garden"
            x="35%"
            y="90%"
            onClick={() => scrollToSection("garden")}
            isHovered={hoveredHall === "garden"}
            setHovered={setHoveredHall}
            delay={0.7}
          />
          <EngineNode
            id="signal"
            label="Signal Room"
            x="65%"
            y="90%"
            onClick={() => scrollToSection("signal")}
            isHovered={hoveredHall === "signal"}
            setHovered={setHoveredHall}
            delay={0.8}
          />
        </div>
      </div>

      {/* Live System Panel - Right Side */}
      <div className="z-10 md:w-1/3 flex flex-col items-end text-right mt-16 md:mt-0 font-mono text-[9px] md:text-[10px] space-y-6">
        <div className="flex flex-col gap-1 items-end border-r-2 border-[var(--museum-brown)] pr-4">
          <span className="uppercase text-[var(--ink-muted)] font-bold tracking-widest">
            System Status
          </span>
          <span className="text-[var(--accent-orange)] font-bold tracking-widest flex items-center gap-2">
            ONLINE{" "}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
          </span>
        </div>

        <div className="flex flex-col gap-1 items-end border-r-2 border-[rgba(62,39,35,0.2)] pr-4">
          <span className="uppercase text-[var(--ink-muted)] font-bold tracking-widest">
            Active Stack
          </span>
          <span className="text-[var(--museum-ink)] font-bold uppercase tracking-wider">
            React / TS / Tailwind
          </span>
        </div>

        <div className="flex flex-col gap-1 items-end border-r-2 border-[rgba(62,39,35,0.2)] pr-4">
          <span className="uppercase text-[var(--ink-muted)] font-bold tracking-widest">
            Current Build
          </span>
          <span className="text-[var(--museum-ink)] font-bold uppercase tracking-wider">
            v3.0.0 "Museum Engine"
          </span>
        </div>

        <div className="flex flex-col gap-1 items-end border-r-2 border-[rgba(62,39,35,0.2)] pr-4">
          <span className="uppercase text-[var(--ink-muted)] font-bold tracking-widest">
            Telemetry
          </span>
          <span className="text-[var(--museum-ink)] font-bold uppercase tracking-wider">
            Vercel Edge
          </span>
        </div>
      </div>
    </div>
  );
}

function EngineNode({
  id,
  label,
  x,
  y,
  onClick,
  isHovered,
  setHovered,
  size = "normal",
  delay = 0,
}: {
  id: string;
  label: string;
  x: string | number;
  y: string | number;
  onClick: () => void;
  isHovered: boolean;
  setHovered: (id: string | null) => void;
  size?: "normal" | "large";
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group outline-none"
      style={{ left: x, top: y }}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      aria-label={`Navigate to ${label}`}
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center transition-all duration-300 relative border border-[var(--border-strong)] z-10 bg-[var(--museum-paper)]",
          size === "large" ? "w-12 h-12" : "w-8 h-8",
          isHovered
            ? "border-[var(--museum-brown)] shadow-[0_0_20px_rgba(62,39,35,0.2)] bg-white"
            : "group-hover:border-[var(--museum-brown)]",
        )}
      >
        <span
          className={cn(
            "rounded-full transition-all duration-300",
            size === "large" ? "w-4 h-4" : "w-2.5 h-2.5",
            isHovered
              ? "bg-[var(--museum-brown)] shadow-[0_0_10px_rgba(62,39,35,0.3)]"
              : "bg-[var(--museum-ink)] opacity-40 group-hover:bg-[var(--museum-brown)] group-hover:opacity-100",
          )}
        />
      </div>
      <span
        className={cn(
          "absolute top-full mt-2 font-mono text-[9px] uppercase font-bold tracking-widest whitespace-nowrap transition-all duration-300",
          isHovered
            ? "text-[var(--museum-ink)] opacity-100 translate-y-1"
            : "text-[var(--ink-muted)] opacity-60",
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
