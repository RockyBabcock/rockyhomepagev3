import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ArrowDown } from "lucide-react";

const artifacts = [
  {
    id: "forge",
    targetId: "forge",
    hall: "03",
    title: "Capability Forge",
    type: "Technical Reactor",
    status: "HOT",
    tags: ["React", "TypeScript", "AI", "WebGL"],
    proof: "tools → evidence → systems",
    size: "medium",
    pctX: "72%",
    pctY: "10%",
    rotate: 2,
    zIndex: 20,
  },
  {
    id: "projects",
    targetId: "projects",
    hall: "02",
    title: "Project Laboratory",
    type: "Work Archive",
    status: "STABLE",
    tags: ["Full Stack", "Product", "Creative"],
    proof: "Shipped code, complete systems",
    size: "large",
    pctX: "75%",
    pctY: "48%",
    rotate: -1,
    zIndex: 25,
  },
  {
    id: "garden",
    targetId: "garden",
    hall: "06",
    title: "Digital Garden",
    type: "Reading Room",
    status: "GROWING",
    tags: ["Writing", "Ideas", "Logs"],
    proof: "Continuous mental curation",
    size: "medium",
    pctX: "68%",
    pctY: "82%",
    rotate: 3,
    zIndex: 18,
  },
  {
    id: "experiments",
    targetId: "experiments",
    hall: "04",
    title: "AI Playground",
    type: "Interface Experiment",
    status: "EXPERIMENTAL",
    tags: ["LLMs", "Generative UX", "Agents"],
    proof: "Novel prompt-reactive systems",
    size: "medium",
    pctX: "10%",
    pctY: "78%",
    rotate: -3,
    zIndex: 24,
  },
  {
    id: "vault",
    targetId: "archives",
    hall: "05",
    title: "Web3 Vault",
    type: "Protocol Study",
    status: "SEALED",
    tags: ["Solidity", "Crypto", "Protocols"],
    proof: "Decentralized state machines",
    size: "small",
    pctX: "5%",
    pctY: "42%",
    rotate: 1,
    zIndex: 15,
  },
  {
    id: "chess",
    targetId: "archives",
    hall: "01",
    title: "Chess Archive",
    type: "System Study",
    status: "ARCHIVE",
    tags: ["Game Logic", "Temporal States"],
    proof: "Strategy play tree search",
    size: "small",
    pctX: "12%",
    pctY: "12%",
    rotate: -2,
    zIndex: 16,
  },
];

export function MuseumEngineHero() {
  const [hoveredArtifact, setHoveredArtifact] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40, // Parallax intensity
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeArtifactData = artifacts.find((a) => a.id === hoveredArtifact);

  return (
    <div className="museum-engine-hero hero-live-system-wall relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-[var(--museum-paper)] overflow-hidden border-b border-[rgba(62,39,35,0.1)]">
      {/* Texture Layer / Archival Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(var(--museum-ink) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Moving Scanline behind cards */}
      <motion.div
        className="hero-scanline absolute w-full h-[2px] bg-[var(--accent-cyan)]/30 blur-[1px] pointer-events-none z-0"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle background coordinate grids */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="5%" y1="0" x2="5%" y2="100%" stroke="var(--museum-ink)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="95%" y1="0" x2="95%" y2="100%" stroke="var(--museum-ink)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="0" y1="15%" x2="100%" y2="15%" stroke="var(--museum-ink)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="0" y1="85%" x2="100%" y2="85%" stroke="var(--museum-ink)" strokeWidth="1" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="w-full max-w-[1920px] mx-auto min-h-[100vh] flex flex-col lg:flex-row relative z-10 px-6 md:px-12 py-24 lg:py-12">
        {/* Left Side Info & Architectural Inscription */}
        <div className="flex flex-col justify-center lg:w-4/12 h-full z-20 mt-16 lg:mt-0 relative shrink-0">
          <motion.div
            className="hero-identity-block flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Monumental Architectural Inscription */}
            <h1 className="hero-kinetic-title font-space font-bold uppercase text-[12vw] lg:text-[5.5vw] leading-[0.8] tracking-tighter text-[var(--museum-ink)] mb-6 text-shadow-sm flex flex-col">
              <span>ROCKY</span>
              <span className="text-[var(--museum-brown)]">BABCOCK</span>
            </h1>

            {/* Access plaque / console block */}
            <div className="bg-[var(--museum-paper)]/95 backdrop-blur-md p-6 lg:p-8 border-2 lg:border-3 border-[var(--museum-ink)] shadow-[10px_10px_0_rgba(24,18,13,1)] max-w-lg">
              <p className="font-space text-base md:text-lg lg:text-xl uppercase tracking-widest font-bold text-[var(--museum-ink)] leading-snug mb-6 border-l-[4px] border-[var(--accent-cyan)] pl-4">
                Creative Technologist <br />
                AI Interface Builder <br />
                Web Systems Explorer
              </p>

              <p className="font-mono text-[10px] md:text-xs text-[var(--ink-soft)] leading-loose font-bold mb-8 p-4 border border-[var(--museum-ink)] bg-white/40">
                A personal digital museum for technical proof, interface
                experiments, archives, and long-term creative systems.
              </p>

              <div className="flex flex-wrap items-center gap-4 relative z-30">
                <button
                  onClick={() => scrollToSection("curators-select")}
                  className="px-6 py-4 bg-[var(--museum-ink)] text-white font-mono text-[11px] sm:text-xs uppercase font-semibold tracking-[0.15em] shadow-[4px_4px_0_rgba(62,39,35,0.4)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[var(--accent-orange)] hover:text-[var(--museum-ink)] transition-all flex items-center gap-3 group outline-none border-2 border-[var(--museum-ink)]"
                >
                  Explore Museum{" "}
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 py-4 bg-transparent text-[var(--museum-ink)] hover:bg-white font-mono text-[11px] sm:text-xs uppercase font-semibold tracking-[0.15em] shadow-[2px_2px_0_rgba(62,39,35,0.2)] hover:shadow-[4px_4px_0_rgba(62,39,35,0.4)] hover:-translate-y-[2px] transition-all outline-none border-2 border-[var(--museum-ink)]"
                >
                  View Projects
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Genesis Node Constellation (Interactive Artifact Wall + Liquid Protocol Core) */}
        <div className="hero-artifact-wall flex-1 relative flex min-h-[650px] lg:min-h-[800px] mt-16 lg:mt-0 z-10 w-full lg:w-8/12">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[var(--museum-brown)]/10 to-transparent pointer-events-none blur-[80px]" />

          {/* SVG SYSTEM LAYER: Handles liquid protocol lines, ticks, and coordinates */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            {/* Filter for Liquid Glass Core */}
            <defs>
              <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="4" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Glowing active path connection lines behind panels */}
            {artifacts.map((artifact) => {
              const isActive = hoveredArtifact === artifact.id;
              return (
                <g key={`path-${artifact.id}`}>
                  {/* Subtle static coordinate line */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2={artifact.pctX}
                    y2={artifact.pctY}
                    stroke="var(--museum-ink)"
                    strokeWidth="1.5"
                    strokeOpacity={isActive ? "0.8" : "0.15"}
                    strokeDasharray={isActive ? "none" : "4 8"}
                    className="transition-all duration-300"
                  />
                  {/* Active bright connection trace */}
                  {isActive && (
                    <>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={artifact.pctX}
                        y2={artifact.pctY}
                        stroke="var(--accent-cyan)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 4px var(--accent-cyan))"
                      />
                      {/* Energy particle pulse flowing outward */}
                      <circle r="5" fill="var(--accent-orange)" filter="drop-shadow(0 0 3px var(--accent-orange))">
                        <animateMotion
                          dur="1.2s"
                          repeatCount="indefinite"
                          path={`M ${window.innerWidth > 1024 ? "50%" : "50%"} ${window.innerHeight > 1024 ? "50%" : "50%"} L ${artifact.pctX} ${artifact.pctY}`}
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {/* Central Orbital rings and ticks (Hidden on tiny screens to avoid layout clutter) */}
            <g transform="translate(0, 0)" className="hidden lg:block">
              {/* Outer orbit radius locator */}
              <circle cx="50%" cy="50%" r="280" fill="none" stroke="var(--museum-ink)" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3 6" />
              
              {/* Rotation HUD metrics */}
              <motion.circle
                cx="50%"
                cy="50%"
                r="180"
                fill="none"
                stroke="var(--museum-ink)"
                strokeWidth="1"
                strokeOpacity="0.25"
                strokeDasharray="12 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50% 50%" }}
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="220"
                fill="none"
                stroke="var(--accent-orange)"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                strokeDasharray="4 16"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50% 50%" }}
              />
            </g>
          </svg>

          {/* LAYER: Liquid Protocol Core Visual Center (Hover-dynamic portal) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-44 h-44 hidden md:flex items-center justify-center pointer-events-none">
            {/* Core glow aura */}
            <div className="absolute inset-[-40px] rounded-full bg-gradient-to-tr from-[var(--accent-cyan)]/25 to-[var(--accent-orange)]/15 pointer-events-none blur-[40px] mix-blend-screen animate-pulse" />

            {/* Rotating SVG coordinate bezel */}
            <motion.div
              className="absolute inset-[0px] border border-[var(--museum-ink)] border-dashed rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[-12px] border-2 border-[var(--accent-cyan)]/40 border-b-transparent border-t-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* The liquid glass body itself */}
            <motion.div
              className={cn(
                "w-36 h-36 rounded-full flex flex-col items-center justify-center text-center p-3 transition-all duration-500",
                hoveredArtifact 
                  ? "bg-[var(--museum-ink)] text-white shadow-[0_0_60px_rgba(0,194,255,0.4)] border-2 border-[var(--accent-cyan)] scale-105"
                  : "bg-white border-2 border-[var(--museum-ink)] text-[var(--museum-ink)] shadow-[0_12px_44px_rgba(62,39,35,0.15)]"
              )}
              style={{
                filter: "url(#liquid-glass)",
                transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)`
              }}
            >
              <span className="font-space font-bold uppercase text-[11px] tracking-[0.25em] leading-none mb-1">
                {hoveredArtifact ? activeArtifactData?.title.split(" ")[0] : "Protocols"}
              </span>
              <span className="font-space font-bold uppercase text-[15px] tracking-tight leading-none text-[var(--accent-orange)]">
                {hoveredArtifact ? activeArtifactData?.title.split(" ").slice(1).join(" ") : "Core Node"}
              </span>
              <div className="h-px bg-current w-12 my-2 opacity-30" />
              <span className="font-mono text-[8px] uppercase tracking-widest leading-none font-bold opacity-80">
                {hoveredArtifact ? `Hall ${activeArtifactData?.hall} Active` : "SYSTEM SECURE"}
              </span>
            </motion.div>
          </div>

          {/* LAYER: Constellation of Premium Artifact Panels */}
          <div className="w-full relative h-[650px] lg:h-full lg:min-h-[800px] xl:min-h-[900px] transition-transform duration-300 transform-gpu">
            {artifacts.map((artifact, i) => {
              const isHovered = hoveredArtifact === artifact.id;
              const isOtherHovered = hoveredArtifact !== null && hoveredArtifact !== artifact.id;

              return (
                <motion.button
                  key={artifact.id}
                  onClick={() => scrollToSection(artifact.targetId)}
                  onMouseEnter={() => setHoveredArtifact(artifact.id)}
                  onMouseLeave={() => setHoveredArtifact(null)}
                  initial={{
                    opacity: 0,
                    y: 35,
                    rotate: artifact.rotate,
                  }}
                  animate={{
                    opacity: isOtherHovered ? 0.45 : 1,
                    rotate: isHovered ? 0 : artifact.rotate,
                    x: isHovered
                      ? 12
                      : mousePos.x * (artifact.zIndex / 25),
                    y: isHovered
                      ? -12
                      : mousePos.y * (artifact.zIndex / 25),
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    duration: isHovered ? 0.35 : 0.65,
                    delay: isHovered ? 0 : i * 0.08 + 0.4,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "hero-artifact-card absolute text-left bg-[var(--museum-paper)] outline-none border-[3px] border-[var(--museum-ink)] select-text cursor-pointer",
                    artifact.size === "large"
                      ? "p-5 sm:p-7 w-[240px] sm:w-[280px] lg:w-[350px]"
                      : artifact.size === "medium"
                        ? "p-4 sm:p-5 w-[210px] sm:w-[245px] lg:w-[290px]"
                        : "p-3 sm:p-4 w-[180px] sm:w-[210px] lg:w-[240px]",
                    isHovered
                      ? "z-50 shadow-[20px_20px_0_rgba(24,18,13,1)] border-[var(--accent-cyan)] bg-slate-50"
                      : "shadow-[10px_10px_0_rgba(62,39,35,0.45)] bg-white/95"
                  )}
                  style={{
                    top: artifact.pctY,
                    left: artifact.pctX,
                    zIndex: isHovered ? 50 : artifact.zIndex,
                  }}
                  aria-label={`Inspect ${artifact.title}`}
                >
                  {/* Internal sub-frame nested border to give a premium museum label feel */}
                  <div className="absolute inset-[3px] border border-[var(--museum-ink)] border-dashed opacity-40 pointer-events-none" />

                  {/* Top luxury badge and telemetry element */}
                  <div className="relative z-10 flex flex-col h-full pl-2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 bg-[var(--museum-ink)] text-white">
                        Hall {artifact.hall}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[8px] uppercase tracking-widest font-bold text-[var(--ink-muted)]">
                          {artifact.status}
                        </span>
                        <div
                          className={cn(
                            "w-2.5 h-2.5 rounded-none border border-[var(--museum-ink)] transition-colors duration-300",
                            artifact.status === "HOT" || artifact.status === "LIVE SYSTEM"
                              ? "bg-[var(--accent-orange)] animate-pulse"
                              : "bg-[var(--accent-cyan)]",
                            isHovered && "ring-4 ring-cyan-200"
                          )}
                        />
                      </div>
                    </div>

                    {/* Master title */}
                    <h3 className="font-space font-bold uppercase text-[15px] sm:text-[18px] lg:text-[21px] leading-none tracking-tight text-[var(--museum-ink)] group-hover:text-[var(--accent-cyan)] transition-colors mt-1 mb-0.5">
                      {artifact.title}
                    </h3>

                    {/* Meta category details */}
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-[var(--ink-muted)] mb-3 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[var(--museum-ink)] rotate-45" /> {artifact.type}
                    </p>

                    <div className="h-px w-full bg-[var(--museum-ink)] opacity-15 mb-4" />

                    {/* Technical evidence statement */}
                    <div className="hero-artifact-proof font-mono text-[9.5px] sm:text-[10.5px] leading-relaxed text-[var(--museum-ink)] font-bold mb-4 flex flex-col gap-0.5">
                      <span className="text-[var(--accent-orange)] uppercase tracking-wider text-[8px]">Index Proof //</span>
                      <span className="italic">“{artifact.proof}”</span>
                    </div>

                    {/* Interactive Enter Hall pill */}
                    <div className={cn(
                      "font-mono text-[8.5px] uppercase font-bold tracking-[0.18em] mb-4 flex items-center gap-1.5 transition-colors duration-300",
                      isHovered ? "text-[var(--accent-cyan)]" : "text-[var(--museum-ink)]"
                    )}>
                      <span>Enter Hall</span>
                      <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}>
                        →
                      </motion.span>
                    </div>

                    {/* Technical Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-dashed border-[var(--museum-ink)]/10">
                      {artifact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] uppercase font-bold tracking-widest text-white bg-[var(--museum-ink)] px-1.5 py-0.5 group-hover:bg-[var(--accent-cyan)] group-hover:text-[var(--museum-ink)] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
