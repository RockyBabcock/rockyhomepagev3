import React, { useState, useEffect } from "react";
import { projectLabData, ProjectEntry } from "../data/projectLabData";
import {
  ExternalLink,
  Github,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  GitMerge,
  Workflow,
  Lock,
  Compass,
  LineChart,
  Code,
  Shield,
  Eye,
  Settings,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export const ProjectLabModule = () => {
  const [activeId, setActiveId] = useState<string>("rocky-homepage-v3");
  const [hoveredCapsule, setHoveredCapsule] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parent = document.getElementById("build-evidence-theater");
      if (parent) {
        const rect = parent.getBoundingClientRect();
        setMouseOffset({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 35,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 35,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeProject =
    projectLabData.find((p) => p.id === activeId) || projectLabData[0];
  const activeIdx = projectLabData.findIndex((p) => p.id === activeId);

  // Mapped Aesthetic Color Specs mirroring high-end museum telemetry
  const getProjectColors = (id: string) => {
    switch (id) {
      case "rocky-homepage-v3":
        return {
          primary: "#d97706", // Amber
          glow: "rgba(217,119,6,0.15)",
          border: "border-amber-500/20",
          text: "text-amber-600",
          bgLight: "bg-amber-500/5",
          accentGlow: "from-amber-600/10 via-amber-500/5 to-transparent",
        };
      case "ai-assistant":
        return {
          primary: "#c084fc", // Purple/Magenta
          glow: "rgba(192,132,252,0.15)",
          border: "border-purple-500/20",
          text: "text-purple-400",
          bgLight: "bg-purple-500/5",
          accentGlow: "from-purple-600/10 via-purple-500/5 to-transparent",
        };
      case "interactive-chess":
        return {
          primary: "#9f1239", // Burgundy
          glow: "rgba(159,18,57,0.15)",
          border: "border-rose-500/20",
          text: "text-rose-600",
          bgLight: "bg-rose-500/5",
          accentGlow: "from-rose-600/10 via-rose-500/5 to-transparent",
        };
      case "web3-learning":
        return {
          primary: "#10b981", // Emerald
          glow: "rgba(16,185,129,0.15)",
          border: "border-emerald-500/20",
          text: "text-emerald-500",
          bgLight: "bg-emerald-500/5",
          accentGlow: "from-emerald-600/10 via-emerald-500/5 to-transparent",
        };
      default:
        return {
          primary: "#4f46e5", // Indigo
          glow: "rgba(79,70,229,0.15)",
          border: "border-indigo-500/20",
          text: "text-indigo-500",
          bgLight: "bg-indigo-500/5",
          accentGlow: "from-indigo-600/10 via-indigo-500/5 to-transparent",
        };
    }
  };

  const projectColors = getProjectColors(activeId);

  // Exquisite dynamic vector diagrams for representing functional engineering layouts
  const renderVectorSystemSchema = (id: string, color: string) => {
    switch (id) {
      case "rocky-homepage-v3":
        return (
          <svg className="w-full h-full min-h-[250px] md:min-h-[290px]" viewBox="0 0 400 240">
            <defs>
              <linearGradient id="homepageGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sub-grid system */}
            <g opacity="0.15">
              <line x1="20" y1="120" x2="380" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="100" y1="20" x2="100" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="200" y1="20" x2="200" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="300" y1="20" x2="300" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            </g>

            {/* Glowing Flow pipelines */}
            <motion.path 
              d="M 60,120 Q 130,50 200,120 T 340,120"
              fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M 60,120 Q 130,190 200,120 T 340,120"
              fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4"
            />

            {/* Modules */}
            {/* 1. Entrance / Anchor Node */}
            <g transform="translate(60, 120)">
              <circle r="12" fill="#1c1a16" stroke={color} strokeWidth="2" />
              <circle r="4" fill={color} />
              <text y="28" textAnchor="middle" fill="#52525b" className="font-mono text-[7px] font-black uppercase tracking-wider">ENTRANCE_PORTAL</text>
            </g>

            {/* 2. Scroll controller node */}
            <g transform="translate(160, 70)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <text y="4" textAnchor="middle" fill="#1c1a16" className="font-mono text-[7.5px] font-bold">ScrollEngine</text>
              <line x1="-30" y1="0" x2="-20" y2="0" stroke={color} strokeWidth="1.5" />
            </g>

            {/* 3. Exhibition Chamber */}
            <g transform="translate(260, 170)">
              <rect x="-32" y="-12" width="64" height="24" rx="4" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <text y="4" textAnchor="middle" fill="#1c1a16" className="font-mono text-[7.5px] font-bold">ActiveChamber</text>
              <circle cx="24" cy="0" r="2.5" fill={color} className="animate-pulse" />
            </g>

            {/* 4. Delivery core target */}
            <g transform="translate(340, 120)">
              <polygon points="0,-14 12,0 0,14 -12,0" fill={color} opacity="0.9" />
              <text y="28" textAnchor="middle" fill="#52525b" className="font-mono text-[7px] font-black uppercase tracking-widest">VERCEL_EDGE</text>
              <circle r="18" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" fill="none" className="animate-spin-slow" />
            </g>

            {/* Traveling signal */}
            <motion.circle r="3" fill="#ffffff" stroke={color} strokeWidth="1">
              <animateMotion dur="4.2s" repeatCount="indefinite" path="M 60,120 Q 130,50 200,120 T 340,120" />
            </motion.circle>
          </svg>
        );
      case "ai-assistant":
        return (
          <svg className="w-full h-full min-h-[250px] md:min-h-[290px]" viewBox="0 0 400 240">
            {/* Prompt response cybernetics diagram */}
            <g opacity="0.12">
              <circle cx="200" cy="120" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="200" cy="120" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
            </g>

            {/* Rotational satellite data loops */}
            <motion.path 
              d="M 110,120 A 90,90 0 1,1 290,120"
              fill="none" stroke={color} strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              style={{ transformOrigin: "200px 120px" }}
            />

            {/* Core Neural Node */}
            <g transform="translate(200, 120)">
              <polygon points="0,-18 15,10 -15,10" fill="#1c1a16" stroke={color} strokeWidth="2.5" />
              <circle r="4" fill={color} className="animate-pulse" />
              <text y="28" textAnchor="middle" fill={color} className="font-mono text-[7.5px] font-black tracking-widest">GEMINI_BRAIN</text>
            </g>

            {/* User Prompt Entry Station */}
            <g transform="translate(70, 70)">
              <rect x="-26" y="-14" width="52" height="28" rx="2" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <text x="0" y="-3" textAnchor="middle" fill="#1c1a16" className="font-mono text-[7px] font-black">USER_RAW</text>
              <text x="0" y="7" textAnchor="middle" fill="#a1a1aa" className="font-sans text-[7.5px] font-bold">Input prompt</text>
              <motion.line x1="-15" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1" animate={{ width: ["0%", "100%", "0%"] }} />
            </g>

            {/* Web Server Sandbox Render Port */}
            <g transform="translate(330, 170)">
              <rect x="-30" y="-14" width="60" height="28" rx="2" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <text x="0" y="-3" textAnchor="middle" fill="#1c1a16" className="font-mono text-[7px] font-black">VITE_DEV</text>
              <text x="0" y="7" textAnchor="middle" fill="#52525b" className="font-sans text-[7px] font-bold">Port 3000 Sync</text>
            </g>

            {/* Signal paths */}
            <path d="M 96,70 C 130,70 150,110 185,110" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 215,130 C 250,130 270,170 300,170" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />

            <motion.circle r="3" fill={color}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 96,70 C 130,70 150,110 185,110" />
            </motion.circle>
            <motion.circle r="3" fill={color}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 215,130 C 250,130 270,170 300,170" />
            </motion.circle>
          </svg>
        );
      case "interactive-chess":
        return (
          <svg className="w-full h-full min-h-[250px] md:min-h-[290px]" viewBox="0 0 400 240">
            {/* Tactical Grid Structure */}
            <g opacity="0.1">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v-${i}`} x1={80 + i * 30} y1="30" x2={80 + i * 30} y2="210" stroke="#000" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`h-${i}`} x1="80" y1={30 + i * 30} x2="320" y2={30 + i * 30} stroke="#000" strokeWidth="0.5" />
              ))}
            </g>

            {/* Tactical Path Vectors */}
            <motion.path 
              d="M 110,180 L 110,90 L 200,90 L 200,150 L 290,150"
              fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <path 
              d="M 110,180 L 110,90 L 200,90 L 200,150 L 290,150"
              fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.25" strokeLinecap="round" strokeLinejoin="round"
            />

            {/* Tactical Target Nodes */}
            <g transform="translate(110,180)">
              <circle r="4.5" fill={color} />
              <text y="-8" textAnchor="middle" fill="#71717a" className="font-mono text-[6.5px]">SRC_SQUARE</text>
            </g>
            <g transform="translate(200,90)">
              <rect x="-5" y="-5" width="10" height="10" fill="#1c1a16" stroke={color} strokeWidth="1" />
              <text y="-8" textAnchor="middle" fill="#71717a" className="font-mono text-[6.5px]">MID_KNIGHT_PIVOT</text>
            </g>
            <g transform="translate(290,150)">
              <polygon points="0,-6 6,4 -6,4" fill={color} />
              <text y="14" textAnchor="middle" fill="#1c1a16" className="font-mono text-[7px] font-black uppercase">CAPTURE_TARGET</text>
            </g>

            {/* Secondary chess engine connection node */}
            <g transform="translate(200,205)">
              <rect x="-30" y="-8" width="60" height="16" rx="2" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="0.5" />
              <text y="2.5" textAnchor="middle" fill="#1c1a16" className="font-mono text-[6px] font-bold">Chess_API_Bridge</text>
            </g>
            <path d="M 200,155 L 200,197" stroke="var(--museum-ink)" strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.4" />
          </svg>
        );
      case "web3-learning":
        return (
          <svg className="w-full h-full min-h-[250px] md:min-h-[290px]" viewBox="0 0 400 240">
            {/* Cryptographic Node Vault Constellation */}
            <g opacity="0.1">
              <polygon points="200,30 290,80 290,165 200,215 110,165 110,80" fill="none" stroke="#000" strokeWidth="1" />
              <line x1="200" y1="30" x2="200" y2="215" stroke="#000" strokeWidth="0.5" />
              <line x1="110" y1="80" x2="290" y2="165" stroke="#000" strokeWidth="0.5" />
              <line x1="290" y1="80" x2="110" y2="165" stroke="#000" strokeWidth="0.5" />
            </g>

            {/* Secure flow loops */}
            <motion.polygon 
              points="200,38 280,84 280,159 200,204 120,159 120,84"
              fill="none" stroke={color} strokeWidth="1.5"
              animate={{ strokeDashoffset: [0, 40] }}
              strokeDasharray="4 6"
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Cryptographic Vault Core Block */}
            <g transform="translate(200, 120)">
              <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#1c1a16" stroke={color} strokeWidth="2" />
              <Lock className="w-5 h-5 text-white absolute -translate-x-2.5 -translate-y-2.5" style={{ color }} />
              <text y="34" textAnchor="middle" fill="#52525b" className="font-mono text-[7px] font-black uppercase tracking-widest">MULTI_SIG_CORE</text>
            </g>

            {/* Keys */}
            <g transform="translate(90, 80)">
              <circle r="8" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <Shield className="w-3.5 h-3.5 text-stone-500 absolute -translate-x-1.75 -translate-y-1.75" />
              <text x="-24" y="3" fill="#a1a1aa" className="font-mono text-[7px]">KEY_01</text>
            </g>
            <g transform="translate(310, 80)">
              <circle r="8" fill="#faf8f5" stroke="#e4e4e7" strokeWidth="1" />
              <Shield className="w-3.5 h-3.5 text-stone-500 absolute -translate-x-1.75 -translate-y-1.75" />
              <text x="14" y="3" fill="#a1a1aa" className="font-mono text-[7px]">KEY_02</text>
            </g>
            <g transform="translate(200, 204)">
              <circle r="6" fill={color} />
              <text y="14" textAnchor="middle" fill="#a1a1aa" className="font-mono text-[6.5px]">VALIDATED_STAKE_LOCK</text>
            </g>
            
            <circle cx="200" cy="38" r="3" fill={color} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="build-evidence-theater"
      className="relative w-full bg-[#fdfcf7] border-b-2 border-[var(--museum-ink)] py-28 px-6 sm:px-12 md:px-16 overflow-hidden select-none"
    >
      {/* ────────────────────────────────────────────────────────────────────────
          THEATER ATMOSPHERE: Dynamic fluid back-glow synced with active spec
          ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-[1500ms] opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${projectColors.primary} 0%, transparent 65%)`,
        }}
      />

      {/* Blueprint background grid coordinate map */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--museum-ink) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, var(--museum-ink) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${mouseOffset.x * 0.08}px, ${mouseOffset.y * 0.08}px)`,
        }}
      />

      {/* Vertical spatial construction guides */}
      <div className="absolute top-0 bottom-0 left-[22%] w-[1.5px] bg-[var(--museum-ink)]/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[26%] w-[1.5px] bg-[var(--museum-ink)]/5 pointer-events-none" />
      <div className="absolute left-[5%] right-[5%] h-[1.5px] top-[45%] bg-[var(--museum-ink)]/5 pointer-events-none" />

      {/* Collabcapitolium Editorial Giant Label */}
      <div className="absolute -left-12 bottom-[10%] rotate-90 origin-bottom-left font-space text-[110px] font-black uppercase text-[var(--museum-ink)]/[0.015] tracking-tighter select-none hidden xl:block">
        EVIDENCE_THEATER
      </div>

      <div className="max-w-[1500px] mx-auto w-full relative z-10">
        
        {/* Unseen.co minimal header line */}
        <div className="flex justify-between items-end border-b border-[var(--museum-ink)]/10 pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] font-extrabold text-stone-400">
              [HALL_04_LAB]
            </span>
            <div className="w-1.5 h-1.5" style={{ backgroundColor: projectColors.primary }} />
            <h2 className="font-mono text-[9px] uppercase tracking-[0.25em] font-black text-amber-600 block">
              Rocky Babcock Build Laboratory
            </h2>
          </div>
          <span className="font-mono text-[9.5px] text-stone-500 uppercase font-black tracking-widest hidden sm:block">
            STAGE_GRID_DECODED
          </span>
        </div>

        {/* =========================================================================================
            Main Theater Layout Grid
           ========================================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* 1. LEFT COLUMN: Technical Navigation Control Rail */}
          <div className="lg:col-span-3 flex flex-col gap-8 self-center">
            <div className="flex flex-col gap-1 select-none">
              <span className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] text-stone-400">
                ACTIVE SYSTEM TESTBED
              </span>
              <h2 className="font-space font-black uppercase text-3.5xl tracking-tight text-[var(--museum-ink)] leading-none">
                Laboratory
              </h2>
            </div>

            {/* Dynamic Selector Spine */}
            <div className="flex flex-col gap-3 relative select-none">
              {/* Spine connection bar */}
              <div className="absolute left-[13px] top-6 bottom-6 w-[1.5px] bg-[var(--museum-ink)]/10" />

              {/* Mapped timeline indices */}
              {projectLabData.map((project, idx) => {
                const isSelected = activeId === project.id;
                const matches = getProjectColors(project.id);

                return (
                  <button
                    key={`timeline-selector-${project.id}`}
                    onClick={() => setActiveId(project.id)}
                    className="flex items-center gap-5 group text-left px-2 py-2 cursor-pointer transition-all duration-300 relative rounded-none outline-none"
                  >
                    {/* Circle sensor node */}
                    <div className="relative shrink-0 flex items-center justify-center w-3.5 h-3.5 z-10">
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full transition-all duration-500",
                          isSelected ? "scale-125" : "bg-stone-200 group-hover:bg-amber-500 group-hover:scale-110"
                        )}
                        style={{
                          backgroundColor: isSelected ? matches.primary : undefined,
                        }}
                      />
                      {isSelected && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping scale-150 opacity-30"
                          style={{ backgroundColor: matches.primary }}
                        />
                      )}
                    </div>

                    {/* Meta specification layout */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[7.5px] uppercase tracking-wider text-stone-400 font-bold leading-none mb-1">
                        SPEC_0{idx + 1} // {project.status}
                      </span>
                      <span
                        className={cn(
                          "font-space font-extrabold uppercase text-[12px] tracking-tight transition-all duration-300",
                          isSelected
                            ? "text-[var(--museum-ink)] font-black translate-x-1"
                            : "text-stone-400 group-hover:text-[var(--museum-ink)] group-hover:translate-x-0.5"
                        )}
                        style={{
                          color: isSelected ? matches.primary : undefined,
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic system metrics footnote */}
            <div className="mt-4 pt-6 border-t border-[var(--museum-ink)]/5 font-mono text-[8.5px] text-stone-400 tracking-widest leading-relaxed">
              <span className="font-bold text-stone-500 block uppercase mb-1">
                Laboratory telemetry
              </span>
              SYSTEM_STATE: OPERAND_ONLINE <br />
              COMPARE_ID: {activeProject.id.toUpperCase()} <br />
              ENGINEER_FLAG: ROCKY_PRIMARY
            </div>
          </div>

          {/* 2. CORE CENTER COLUMN: The Dynamic System Specimen Glass panel */}
          <div className="lg:col-span-5 flex flex-col relative mt-6 lg:mt-0">
            
            {/* The Glass Cylinder Blueprint Stage */}
            <div 
              className="relative rounded-2xl border transition-all duration-1000 p-6 flex flex-col items-center bg-white/75 backdrop-blur-xl shadow-xl hover:shadow-2xl overflow-hidden"
              style={{
                borderColor: projectColors.primary,
                boxShadow: `0 20px 45px -10px ${projectColors.glow}`,
              }}
            >
              {/* Subtle dynamic background scan grid */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--museum-ink) 1px, transparent 1px)`,
                  backgroundSize: "14px 14px"
                }}
              />

              {/* Top Bar Telemetry indicators inside glass panel */}
              <div className="w-full flex justify-between items-center border-b border-[var(--museum-ink)]/10 pb-3 mb-4 select-none">
                <div className="flex items-center gap-1.5 font-mono text-[8.5px] font-black text-stone-400">
                  <Workflow className="w-3.5 h-3.5 animate-pulse" style={{ color: projectColors.primary }} />
                  ACTIVE_SPECIMEN_MAP // VECTOR_FLOW
                </div>
                <div 
                  className="px-2 py-0.5 rounded font-mono text-[8.5px] font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: projectColors.primary }}
                >
                  {activeProject.status}
                </div>
              </div>

              {/* Large, high-end SVG architectural readout */}
              <div className="w-full relative justify-center flex items-center min-h-[250px] md:min-h-[290px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {renderVectorSystemSchema(activeId, projectColors.primary)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom active blueprint link actions */}
              <div className="w-full border-t border-[var(--museum-ink)]/10 pt-4 mt-2 flex justify-between items-center">
                <span className="font-mono text-[8px] text-stone-400 font-bold uppercase tracking-widest hidden sm:block">
                  DECODE_PORTAL_ACTIVE
                </span>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-[var(--museum-ink)]/10 text-[9.5px] uppercase font-black tracking-widest text-[var(--museum-ink)] hover:text-white hover:bg-[#111] hover:border-[#111] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Deployed site
                    </a>
                  )}
                  {activeProject.repoUrl && (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#111] text-white text-[9.5px] uppercase font-black tracking-widest hover:bg-stone-800 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" /> Source files
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Realistic soft sub-panel drop shadows */}
            <div
              className="absolute w-[220px] h-[25px] bottom-[-15px] left-1/2 -translate-x-1/2 rounded-full filter blur-[20px] opacity-15 pointer-events-none mix-blend-multiply transition-all duration-1000"
              style={{ backgroundColor: projectColors.primary }}
            />
          </div>

          {/* 3. RIGHT COLUMN: 3 Layered Evidence Proof Capsules */}
          <div className="lg:col-span-4 flex flex-col gap-6 self-center justify-center h-full">
            <div className="flex flex-col gap-1 border-b border-[var(--museum-ink)]/10 pb-5 mb-2 select-none">
              <span className="font-mono text-[8.5px] font-black tracking-[0.3em] uppercase text-stone-400 block">
                LAB_EVALUATION_HUD
              </span>
              <h3 className="font-space font-black uppercase text-lg text-[var(--museum-ink)] tracking-tight">
                Proof Decals & Metrics
              </h3>
            </div>

            {/* Micro proof telemetry cells replacing big rigid panels */}
            <div className="flex flex-col gap-4">
              
              {/* Capsule 1: The Core Thesis */}
              <div 
                onMouseEnter={() => setHoveredCapsule("thesis")}
                onMouseLeave={() => setHoveredCapsule(null)}
                className="bg-white/60 hover:bg-white border hover:border-amber-600/30 p-4 relative cursor-default transition-all duration-300 rounded-none shadow-[2px_2px_0_rgba(62,39,35,0.02)] flex gap-3 items-start"
              >
                <div className="p-2 bg-[#fad8c3]/20 text-amber-700 shrink-0 border border-amber-500/10">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-400 font-bold uppercase tracking-wider mb-0.5">
                    <span>EVAL_01 // COGNITIVE_FOCUS</span>
                    <span>ACTIVE</span>
                  </div>
                  <h4 className="font-space font-extrabold uppercase text-[10px] text-[var(--museum-ink)] mb-1">
                    System Core Thesis
                  </h4>
                  <p className="font-sans text-[11.5px] text-zinc-600 leading-normal font-bold italic">
                    “{activeProject.oneLine}”
                  </p>
                </div>
              </div>

              {/* Capsule 2: Problem Solved */}
              <div 
                onMouseEnter={() => setHoveredCapsule("problem")}
                onMouseLeave={() => setHoveredCapsule(null)}
                className="bg-white/60 hover:bg-white border hover:border-rose-600/30 p-4 relative cursor-default transition-all duration-300 rounded-none shadow-[2px_2px_0_rgba(62,39,35,0.02)] flex gap-3 items-start"
              >
                <div className="p-2 bg-[#fecdd3]/20 text-rose-700 shrink-0 border border-rose-500/10">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-400 font-bold uppercase tracking-wider mb-0.5">
                    <span>EVAL_02 // SYSTEM_FRICTION</span>
                    <span>RESOLVED</span>
                  </div>
                  <h4 className="font-space font-extrabold uppercase text-[10px] text-[var(--museum-ink)] mb-1">
                    Friction Point Solved
                  </h4>
                  <p className="font-sans text-[11.5px] text-zinc-600 leading-normal">
                    {activeProject.problem}
                  </p>
                </div>
              </div>

              {/* Capsule 3: Tech Stack Deployed */}
              <div 
                onMouseEnter={() => setHoveredCapsule("stack")}
                onMouseLeave={() => setHoveredCapsule(null)}
                className="bg-white/60 hover:bg-white border hover:border-emerald-600/30 p-4 relative cursor-default transition-all duration-300 rounded-none shadow-[2px_2px_0_rgba(62,39,35,0.02)] flex gap-3 items-start"
              >
                <div className="p-2 bg-[#d1fae5]/20 text-emerald-700 shrink-0 border border-emerald-500/10">
                  <Code className="w-4 h-4" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-stone-400 font-bold uppercase tracking-wider mb-2">
                    <span>EVAL_03 // PARADIGM_COMPILATION</span>
                    <span>COMPILED</span>
                  </div>
                  <h4 className="font-space font-extrabold uppercase text-[10px] text-[var(--museum-ink)] mb-2">
                    Infrastructure Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {activeProject.techStack.map((chip) => (
                      <span
                        key={`chip-${chip}`}
                        className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 text-stone-500 font-mono text-[8px] font-bold tracking-wider"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Core telemetry prompt decal */}
            <div className="mt-3">
              <span className="text-[7.5px] font-mono font-black tracking-widest text-stone-400 uppercase block mb-1">
                EVIDENCE_PROOF_SIGNALS
              </span>
              <div className="bg-[#faf8f5] border border-[var(--museum-ink)]/10 p-3 relative overflow-hidden">
                <div className="font-mono text-[9px] leading-relaxed text-stone-600 font-bold">
                  SYS_VERDICT: {activeProject.proves && activeProject.proves[0] ? `“${activeProject.proves[0]}”` : "“Verified Design-to-Code integration”"}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================================
            Active curator summary block
           ========================================================================================= */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-[var(--museum-ink)]/10 pt-10 gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-extrabold flex items-center gap-2 mb-2 text-[#d97706]" style={{ color: projectColors.primary }}>
              <Sparkles className="w-3.5 h-3.5" /> SYSTEM PERFORMANCE VERDICT
            </span>
            <p className="font-sans text-[14.5px] font-bold text-gray-800 leading-relaxed italic">
              {activeId === "rocky-homepage-v3" 
                ? "“This portfolio system incorporates real-time layout structures, content routers, and fine typography pairings to present physical code archives systematically.”"
                : `“The ${activeProject.title} project represents active implementation of ${activeProject.techStack.join(', ')} configured for fast telemetry and clean state controls.”`
              }
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {activeProject.id === "rocky-homepage-v3" && (
              <button
                onClick={() => {
                  const el = document.getElementById("skills-forge");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full md:w-auto py-4 px-8 bg-[var(--museum-ink)] text-white hover:bg-[#faf8f5] hover:text-[var(--museum-ink)] border-2 border-[var(--museum-ink)] font-mono text-[10px] uppercase font-black tracking-[0.25em] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative z-20 shadow-[6px_6px_0_rgba(62,39,35,0.7)]"
                style={{
                  boxShadow: `5px 5px 0 ${projectColors.primary}`
                }}
              >
                Examine Capability Forge
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
