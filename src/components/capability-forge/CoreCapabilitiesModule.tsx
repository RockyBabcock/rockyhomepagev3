import React, { useState, useEffect, useMemo } from "react";
import { cn } from "../../lib/utils";
import { techStackData, domainLabels, TechItem } from "../../data/techStack";
import { iconMap } from "./forgeData";
import {
  ExternalLink,
  Target,
  Terminal,
  Activity,
  Cpu,
  Bookmark,
  Sparkles,
  GitMerge,
  Workflow,
  Search,
  CheckCircle2,
  Lock,
  Compass,
  LineChart,
  Code,
  Shield,
  Eye,
  Settings,
  ArrowRight,
  RefreshCw,
  Plus,
  Box,
  Layers,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Interface for rich visual states
interface DomainMotif {
  primary: string;
  secondary: string;
  glow: string;
  aura: string;
  energyName: string;
  particleCount: number;
}

// Custom domain specific designs
const domainMotifs: Record<string, DomainMotif> = {
  frontend: {
    primary: "#ea580c", // Rich Amber-Orange
    secondary: "#06b6d4", // Electric Cyan
    glow: "rgba(234, 88, 12, 0.25)",
    aura: "rgba(234, 88, 12, 0.05)",
    energyName: "AMBER_CYAN_REACTOR_GLOW",
    particleCount: 16
  },
  backend: {
    primary: "#3b82f6", // Electric Blue
    secondary: "#475569", // Cool Slate
    glow: "rgba(59, 130, 246, 0.25)",
    aura: "rgba(59, 130, 246, 0.05)",
    energyName: "DEEP_BLUE_CORES_AND_PIPES",
    particleCount: 12
  },
  devops: {
    primary: "#22c55e", // Forest Green
    secondary: "#eab308", // Vivid Yellow
    glow: "rgba(34, 197, 94, 0.25)",
    aura: "rgba(34, 197, 94, 0.05)",
    energyName: "GREEN_AMBER_AUTOSCALE_GRID",
    particleCount: 14
  },
  design: {
    primary: "#ec4899", // Magenta-pink
    secondary: "#64748b", // Steel Accent
    glow: "rgba(236, 72, 153, 0.25)",
    aura: "rgba(236, 72, 153, 0.05)",
    energyName: "MAGENTA_STEEL_AUTO_CANVAS",
    particleCount: 10
  },
  ai: {
    primary: "#8b5cf6", // Violet Flow
    secondary: "#3b82f6", // Neon Blue
    glow: "rgba(139, 92, 246, 0.3)",
    aura: "rgba(139, 92, 246, 0.08)",
    energyName: "VIOLET_AI_NEURAL_WAVEFORM",
    particleCount: 18
  },
  web3: {
    primary: "#10b981", // Emerald Mint
    secondary: "#4f46e5", // Indigo Core
    glow: "rgba(16, 185, 129, 0.25)",
    aura: "rgba(16, 185, 129, 0.05)",
    energyName: "MINT_CRYPTOGRAPHIC_PROT_NODES",
    particleCount: 13
  },
  creative: {
    primary: "#f97316", // Solar Orange
    secondary: "#06b6d4", // Electric Cyan
    glow: "rgba(249, 115, 22, 0.3)",
    aura: "rgba(249, 115, 22, 0.07)",
    energyName: "SOLAR_PARTICLE_GLSL_MATRIX",
    particleCount: 17
  },
  audio: {
    primary: "#a855f7", // Psychedelic Purple
    secondary: "#ec4899", // Hot Pink
    glow: "rgba(168, 85, 247, 0.25)",
    aura: "rgba(168, 85, 247, 0.05)",
    energyName: "PURPLE_PHASE_WAVEFORM_RINGS",
    particleCount: 11
  },
  hardware: {
    primary: "#475569", // Gunmetal Steel
    secondary: "#f97316", // Warning Amber
    glow: "rgba(71, 85, 105, 0.25)",
    aura: "rgba(71, 85, 105, 0.05)",
    energyName: "STEEL_SOLID_MCU_CIRCUITS",
    particleCount: 10
  },
  programming_languages: {
    primary: "#2563eb", // Electric Deep Blue
    secondary: "#ca8a04", // Dark Gold Syntax
    glow: "rgba(37, 99, 235, 0.3)",
    aura: "rgba(37, 99, 235, 0.08)",
    energyName: "COMPILER_TOKEN_ENERGY_STREAMS",
    particleCount: 18
  },
  natural_languages: {
    primary: "#a855f7", // Orchid Purple
    secondary: "#38bdf8", // Sky blue translation
    glow: "rgba(168, 85, 247, 0.25)",
    aura: "rgba(168, 85, 247, 0.05)",
    energyName: "MULTILINGUAL_SPEECH_AURA",
    particleCount: 12
  },
  language_systems: {
    primary: "#db2777", // Intense Magenta
    secondary: "#334155", // Deep Graphite slate
    glow: "rgba(219, 39, 119, 0.3)",
    aura: "rgba(219, 39, 119, 0.08)",
    energyName: "AST_TRANSFORMER_MUTATIONS",
    particleCount: 15
  },
  spatial: {
    primary: "#06b6d4", // Cyan coordinate
    secondary: "#4f46e5", // Indigo vertex
    glow: "rgba(6, 182, 212, 0.25)",
    aura: "rgba(6, 182, 212, 0.05)",
    energyName: "CYAN_3D_VECTOR_COORDS",
    particleCount: 16
  },
  tooling: {
    primary: "#ea580c", // Copper Bronze
    secondary: "#52525b", // Zinc 600
    glow: "rgba(234, 88, 12, 0.25)",
    aura: "rgba(234, 88, 12, 0.05)",
    energyName: "DEVELOPER_SHELL_TOOL_LOGS",
    particleCount: 11
  }
};

// Fallback motif for unknown types
const defaultMotif: DomainMotif = {
  primary: "#78716c",
  secondary: "#a8a29e",
  glow: "rgba(120, 113, 108, 0.2)",
  aura: "rgba(120, 113, 108, 0.05)",
  energyName: "STANDARD_CALIBRATION",
  particleCount: 8
};

export function CoreCapabilitiesModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"Reactor" | "Grid" | "Evidence">("Reactor");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle subtle ambient parallax tracking on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parent = document.getElementById("capability-reactor-chamber");
      if (parent) {
        const rect = parent.getBoundingClientRect();
        setMouseOffset({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute domains sequentially inside our requested Order Layout
  const domains = useMemo(() => {
    const cats = Array.from(new Set(techStackData.map((t) => t.category)));
    const explicitOrder = [
      "frontend",
      "backend",
      "devops",
      "design",
      "ai",
      "web3",
      "creative",
      "audio",
      "hardware",
      "programming_languages",
      "natural_languages",
      "language_systems",
      "spatial",
      "tooling"
    ];

    // Sort to match Rocky's portfolio narrative direction
    const sortedCats = cats.sort((a, b) => {
      const idxA = explicitOrder.indexOf(a);
      const idxB = explicitOrder.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

    return sortedCats.map((c) => ({
      id: c,
      label: domainLabels[c] || c.charAt(0).toUpperCase() + c.slice(1).replace("_", " "),
      count: techStackData.filter((t) => t.category === c).length,
      color: (domainMotifs[c] || defaultMotif).primary,
      icon: iconMap[c] || Settings,
    }));
  }, []);

  const [selectedDomain, setSelectedDomain] = useState<string>(domains[0]?.id || "frontend");

  // Filter tools based on search queries
  const filteredTechs = useMemo(() => {
    if (!searchQuery.trim()) return techStackData;
    const q = searchQuery.toLowerCase();
    return techStackData.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.evidence.some((e) => e.toLowerCase().includes(q)) ||
        t.usedIn.some((u) => u.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const displayedTechs = searchQuery.trim()
    ? filteredTechs
    : techStackData.filter((t) => t.category === selectedDomain);

  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  // Synchronize dynamic active technical node selections
  useEffect(() => {
    if (displayedTechs.length > 0) {
      if (!selectedTechId || !displayedTechs.some((t) => t.id === selectedTechId)) {
        setSelectedTechId(displayedTechs[0].id);
      }
    } else {
      setSelectedTechId(null);
    }
  }, [selectedDomain, searchQuery, displayedTechs, selectedTechId]);

  const selectedTech = useMemo(() => {
    return techStackData.find((t) => t.id === selectedTechId) || displayedTechs[0] || techStackData[0];
  }, [selectedTechId, displayedTechs]);

  const motif = domainMotifs[selectedTech?.category || selectedDomain] || defaultMotif;

  // Build dual-layered orbit sets (Inner and Outer constellation rings)
  const orbitNodes = useMemo(() => {
    if (!selectedTech) return { inner: [], outer: [] };
    
    // Sort related tools
    let related = selectedTech.relatedTools || [];
    if (related.length === 0) {
      related = displayedTechs
        .filter((t) => t.id !== selectedTech.id)
        .map((t) => t.name);
    }

    // Split nicely to give visual density
    const inner = related.slice(0, 3);
    const outer = related.slice(3, 8);

    // Fallback if empty
    if (inner.length === 0) {
      const allFilteredNames = displayedTechs.filter((t) => t.id !== selectedTech.id).map((t) => t.name);
      return {
        inner: allFilteredNames.slice(0, 3),
        outer: allFilteredNames.slice(3, 8)
      };
    }

    return { inner, outer };
  }, [selectedTech, displayedTechs]);

  const proficiency = selectedTech?.proficiency || 80;

  // Domain-specific interactive backgrounds
  const renderMotifBackgroundEffects = () => {
    const isLangProg = selectedTech?.category === "programming_languages";
    const isLangNat = selectedTech?.category === "natural_languages";
    const isLangSys = selectedTech?.category === "language_systems";

    if (isLangProg) {
      // Compiled syntax stream bits floating
      return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] font-mono text-[8px] text-blue-900 leading-none overflow-hidden select-none">
          <div className="absolute top-[10%] left-[5%] animate-pulse">{"export type Token = string | number;"}</div>
          <div className="absolute top-[25%] right-[8%] animate-pulse">{"interface AstCompiler<T> { parse(): T; }"}</div>
          <div className="absolute bottom-[20%] left-[12%] animate-pulse">{"const value = fn.evaluate(scope);"}</div>
          <div className="absolute bottom-[35%] right-[15%] animate-pulse">{"enum Process { STABLE = 1, SWEEP = 2 }"}</div>
        </div>
      );
    }

    if (isLangNat) {
      // Text phonetic and translation particles
      return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] font-sans font-extrabold text-[12px] text-purple-900 leading-none overflow-hidden select-none">
          <div className="absolute top-[8%] left-[15%]">[Bonjour] &rarr; [Hello]</div>
          <div className="absolute top-[30%] right-[10%]">[你好] &rarr; [Academic_Sync]</div>
          <div className="absolute bottom-[15%] left-[8%]">[Exploration] &rarr; [French_Verb]</div>
          <div className="absolute bottom-[28%] right-[18%]">Phonetic Sound Waves: /eɪ.aɪ/</div>
        </div>
      );
    }

    if (isLangSys) {
      // Abstract trees visualization diagram outlines
      return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden select-none">
          <svg className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="1">
            <line x1="50%" y1="10%" x2="40%" y2="25%" />
            <line x1="50%" y1="10%" x2="60%" y2="25%" />
            <line x1="40%" y1="25%" x2="30%" y2="45%" />
            <line x1="40%" y1="25%" x2="48%" y2="45%" />
            <circle cx="50%" cy="10%" r="5" fill="black" />
            <circle cx="40%" cy="25%" r="4" />
            <circle cx="60%" cy="25%" r="4" />
            <circle cx="30%" cy="45%" r="3" />
            <circle cx="48%" cy="45%" r="3" />
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <section
      id="capability-reactor-chamber"
      className="relative w-full bg-[#fdfcf7] border-b-2 border-[var(--museum-ink)] py-20 px-4 sm:px-10 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* ────────────────────────────────────────────────────────────────────────
          Ambient Halo Core (Responsive, deep visual gradient matching motif)
          ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-[0.22] md:opacity-[0.28]"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${motif.primary} 0%, ${motif.secondary}22 35%, transparent 68%)`,
        }}
      />

      {/* Structured grid background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--museum-ink) 1px, transparent 1px),
            linear-gradient(to bottom, var(--museum-ink) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          transform: `translate(${mouseOffset.x * 0.1}px, ${mouseOffset.y * 0.1}px)`,
        }}
      />

      {/* Decorative Blueprint Construction Markings */}
      <div className="absolute top-0 bottom-0 left-[22%] w-[1px] bg-[var(--museum-ink)]/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[28%] w-[1px] bg-[var(--museum-ink)]/5 pointer-events-none" />
      <div className="absolute left-[2%] right-[2%] h-[1px] top-[30%] bg-[var(--museum-ink)]/5 pointer-events-none" />
      
      {/* Dynamic Background Layout elements */}
      {renderMotifBackgroundEffects()}

      <div className="absolute -right-12 bottom-[8%] -rotate-90 origin-bottom-right font-space text-[90px] md:text-[110px] font-black uppercase text-[var(--museum-ink)]/[0.015] tracking-tight pointer-events-none select-none">
        REACTOR_NODE_SEC_03
      </div>

      <div className="max-w-[1550px] mx-auto w-full relative z-10">
        
        {/* =========================================================================================
            HUD TELEMETRY PANEL HEADER
           ========================================================================================= */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end border-b border-[var(--museum-ink)]/15 pb-6 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2 select-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] font-extrabold text-stone-400">
                [SYSTEM_HALL_03_CAPABILITIES]
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: motif.primary }} />
              <span className="font-mono text-[8px] uppercase tracking-wider text-amber-600 font-bold" style={{ color: motif.primary }}>
                REALTIME_METRICS_STABLE // CORES: {techStackData.length}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-space font-black uppercase tracking-tight text-[var(--museum-ink)]">
              Capability Reactor
            </h1>
            <p className="text-stone-600 font-sans text-[13px] max-w-2xl font-medium mt-1 leading-relaxed">
              Rocky’s technical stack is an interactive network topology. It traces concrete experience logs across reactive browsers, secure gateways, design systems, physical computation, and syntax-systems processors.
            </p>
          </div>

          {/* Action hub: Quick Search & Mode deck */}
          <div className="flex flex-col sm:flex-row gap-3 min-w-[280px] lg:min-w-[440px] shrink-0">
            {/* Minimal Search Field */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, platforms, databases..."
                autoComplete="off"
                className="w-full pl-9 pr-4 py-2.5 bg-white/70 border border-[var(--museum-ink)]/10 rounded-none text-[11px] font-mono tracking-wide focus:outline-none focus:border-stone-800 focus:bg-white transition-all font-semibold placeholder-stone-400 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono hover:text-stone-950 text-stone-400 cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Layout Toggles */}
            <div className="flex p-0.5 bg-stone-100/50 border border-[var(--museum-ink)]/10 rounded-none shrink-0 select-none">
              {(["Reactor", "Grid", "Evidence"] as const).map((mode) => (
                <button
                  key={`mode-${mode}`}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "px-3.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                    viewMode === mode
                      ? "bg-[var(--museum-ink)] text-white shadow-sm"
                      : "text-stone-400 hover:text-[var(--museum-ink)]"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================================
            CHAMBER TRI-PANEL LAYOUT
           ========================================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          
          {/* ──────────────────────────────────────────────────────────────────
              PANEL 1 (LEFT): THE DOMAIN CONSTELLATION SPINE
              ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-5 self-start lg:sticky lg:top-8 lg:max-h-[82vh] overflow-visible">
            <div className="flex flex-col gap-1 select-none">
              <span className="font-mono text-[8px] uppercase tracking-widest font-black text-stone-400">
                CHAMBER SPINES
              </span>
              <h3 className="font-space font-black uppercase text-sm text-[var(--museum-ink)] tracking-wider">
                Domain Channels
              </h3>
            </div>

            {/* Selector list crafted as high-density clickable system channels */}
            <div className="flex flex-col gap-1 relative bg-white/40 backdrop-blur-md p-2 border border-[var(--museum-ink)]/10 rounded-none max-h-[500px] overflow-y-auto custom-scrollbar">
              {domains.map((domain, index) => {
                const isActive = selectedDomain === domain.id && !searchQuery.trim();
                const Icon = domain.icon;
                const dMotif = domainMotifs[domain.id] || defaultMotif;

                return (
                  <button
                    key={`domain-node-${domain.id}`}
                    onClick={() => {
                      setSelectedDomain(domain.id);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-2 transition-all cursor-pointer relative group border text-left",
                      isActive
                        ? "bg-white border-stone-800 shadow-[3px_3px_0_rgba(17,17,17,0.06)] translate-x-1"
                        : "bg-transparent border-transparent hover:bg-stone-50 hover:border-stone-200"
                    )}
                  >
                    {/* Active conduit marker line */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                        style={{ backgroundColor: dMotif.primary }}
                      />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0 pr-1">
                      <span className="font-mono text-[7px] font-bold text-stone-400 opacity-60 w-4 text-right">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        className="w-3.5 h-3.5 shrink-0 transition-colors duration-300"
                        style={{ color: isActive ? dMotif.primary : "#71717a" }}
                      />
                      <span
                        className={cn(
                          "font-space font-bold text-[10.5px] uppercase tracking-wider truncate transition-colors",
                          isActive ? "text-[var(--museum-ink)]" : "text-stone-500 group-hover:text-stone-800"
                        )}
                      >
                        {domain.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isActive && (
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-ping"
                          style={{ backgroundColor: dMotif.primary }}
                        />
                      )}
                      <span className="font-mono text-[7.5px] font-bold bg-stone-100 px-1 py-0.5 border border-zinc-200 text-stone-500 rounded">
                        {domain.count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic system footprint calibration readings */}
            <div className="pt-4 border-t border-[var(--museum-ink)]/10 font-mono text-[8px] text-stone-400 tracking-wider leading-relaxed select-none">
              <span className="font-bold text-stone-500 uppercase block mb-1">
                REACTOR SPECTRAL STATE
              </span>
              ACTIVE_AURA: {motif.energyName} <br />
              SYS_CHORES: {techStackData.length}_DOMAINS_INDEXED <br />
              CONFIDENCE_STATUS: SWEEP_STABLE
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────────
              PANEL 2 (CENTER): THE CAPABILITY REACTOR CORE
              ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            <AnimatePresence mode="wait">
              
              {/* VIEW MODE A: INTENSE COMPREHENSIVE CONSTELLATION CONSOLE */}
              {viewMode === "Reactor" && (
                <motion.div
                  key="reactor-element"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4 w-full h-full justify-between"
                >
                  <div 
                    className="relative rounded-none border-2 bg-white/75 backdrop-blur-xl p-6 flex flex-col items-center justify-center overflow-hidden h-[450px] md:h-[490px] transition-all duration-500"
                    style={{
                      borderColor: motif.primary,
                      boxShadow: `0 16px 40px -15px ${motif.glow}`,
                    }}
                  >
                    {/* Telemetry frame boundaries */}
                    <div className="absolute top-4 inset-x-5 flex justify-between items-center border-b border-[var(--museum-ink)]/15 pb-2">
                      <div className="flex items-center gap-1.5 font-mono text-[8px] text-stone-400 font-bold uppercase tracking-wider">
                        <Activity className="w-3.5 h-3.5 animate-pulse" style={{ color: motif.primary }} />
                        CONSTELLATION NETWORK: {selectedTech?.category?.toUpperCase()}
                      </div>
                      <span className="font-mono text-[8.5px] font-black text-emerald-600 uppercase flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        STABLE_EMISSION
                      </span>
                    </div>

                    {/* Dual-Orbit SVG Space Coordinates */}
                    <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center my-2">
                      
                      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 340 340">
                        {/* Perfect Alignment Grid Lines */}
                        <line x1="170" y1="10" x2="170" y2="330" stroke="var(--museum-ink)" strokeWidth="0.5" strokeOpacity="0.05" />
                        <line x1="10" y1="170" x2="330" y2="170" stroke="var(--museum-ink)" strokeWidth="0.5" strokeOpacity="0.05" />

                        {/* Double Calibration Outer Circle Rings */}
                        <circle cx="170" cy="170" r="158" stroke="var(--museum-ink)" strokeWidth="0.5" strokeOpacity="0.06" fill="none" />
                        <circle cx="170" cy="170" r="115" stroke="var(--museum-ink)" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.1" fill="none" />
                        <circle cx="170" cy="170" r="75" stroke="var(--museum-ink)" strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.15" fill="none" />
                        
                        {/* Ambient Glowing Focal Target */}
                        <radialGradient id="reactorCoreInnerGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor={motif.primary} stopOpacity="0.35" />
                          <stop offset="60%" stopColor={motif.secondary} stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                        <circle cx="170" cy="170" r="105" fill="url(#reactorCoreInnerGlow)" />

                        {/* Outer Perimeter Pulse Ring */}
                        <motion.circle
                          cx="170"
                          cy="170"
                          r="140"
                          fill="none"
                          stroke={motif.primary}
                          strokeWidth="0.75"
                          strokeDasharray="6 26"
                          strokeOpacity="0.3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Highspeed Tracker Loop */}
                        <motion.circle
                          cx="170"
                          cy="170"
                          r="92"
                          fill="none"
                          stroke={motif.secondary}
                          strokeWidth="1"
                          strokeDasharray="35 15"
                          strokeOpacity="0.25"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Active Laser Interconnections */}
                        {orbitNodes.inner.map((name, i) => {
                          const angle = (i * (360 / Math.max(orbitNodes.inner.length, 1)) - 90) * (Math.PI / 180);
                          const radius = 75;
                          const tx = 170 + radius * Math.cos(angle);
                          const ty = 170 + radius * Math.sin(angle);
                          const isHovered = hoveredNode === name;
                          return (
                            <line
                              key={`inner-laser-${i}`}
                              x1="170"
                              y1="170"
                              x2={tx}
                              y2={ty}
                              stroke={motif.primary}
                              strokeWidth={isHovered ? "2.5" : "0.75"}
                              strokeOpacity={isHovered ? "0.8" : "0.15"}
                              strokeDasharray={isHovered ? undefined : "2 3"}
                              className="transition-all duration-300"
                            />
                          );
                        })}

                        {orbitNodes.outer.map((name, i) => {
                          const angle = (i * (360 / Math.max(orbitNodes.outer.length, 1)) + 45 - 90) * (Math.PI / 180);
                          const radius = 125;
                          const tx = 170 + radius * Math.cos(angle);
                          const ty = 170 + radius * Math.sin(angle);
                          const isHovered = hoveredNode === name;
                          return (
                            <g key={`outer-conduit-grp-${i}`}>
                              <line
                                x1="170"
                                y1="170"
                                x2={tx}
                                y2={ty}
                                stroke={isHovered ? motif.primary : motif.secondary}
                                strokeWidth={isHovered ? "2" : "0.5"}
                                strokeOpacity={isHovered ? "0.6" : "0.08"}
                                className="transition-all duration-300"
                              />
                              <motion.circle r={isHovered ? "3.5" : "1.5"} fill={motif.primary}>
                                <animateMotion
                                  dur={isHovered ? "1.2s" : "3s"}
                                  delay={`${i * 0.4}s`}
                                  repeatCount="indefinite"
                                  path={`M 170,170 L ${tx},${ty}`}
                                />
                              </motion.circle>
                            </g>
                          );
                        })}
                      </svg>

                      {/* INNER LEVEL CORE NODE (SELECTED SPECIMEN) */}
                      <AnimatePresence mode="wait">
                        {selectedTech && (
                          <motion.div
                            key={`selected-node-${selectedTech.id}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                            className="absolute w-28 h-28 rounded-full bg-stone-900 border-2 flex flex-col items-center justify-center p-2.5 text-center cursor-default z-20 shadow-2xl overflow-hidden group select-none"
                            style={{ 
                              borderColor: motif.primary,
                              boxShadow: `0 0 28px -2px ${motif.primary}4c`
                            }}
                          >
                            <span className="font-space font-black text-white text-[12.5px] leading-tight uppercase tracking-wider mb-0.5 truncate max-w-full">
                              {selectedTech.name}
                            </span>
                            <span 
                              className="font-mono text-[7px] font-black uppercase tracking-widest scale-95"
                              style={{ color: motif.primary }}
                            >
                              {selectedTech.level === "Primary Tool" ? "CORE" : selectedTech.level.toUpperCase()}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CONSTELLATION MULTI-RING ORBITS (INNER CLUSTER ring: R=75px) */}
                      {orbitNodes.inner.map((name, i) => {
                        const angle = (i * (360 / Math.max(orbitNodes.inner.length, 1)) - 90) * (Math.PI / 180);
                        const radius = 75;
                        const x = `calc(50% + ${radius * Math.cos(angle)}px)`;
                        const y = `calc(50% + ${radius * Math.sin(angle)}px)`;

                        const match = techStackData.find((t) => t.name === name);
                        const isActive = match && selectedTechId === match.id;

                        return (
                          <motion.button
                            key={`inner-satellite-${name}`}
                            onClick={() => match && setSelectedTechId(match.id)}
                            onMouseEnter={() => setHoveredNode(name)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                            className={cn(
                              "absolute w-12 h-12 rounded-full flex flex-col items-center justify-center p-1 text-center transition-all duration-300 pointer-events-auto border z-30 shadow-md",
                              match
                                ? "bg-white hover:bg-stone-900 text-stone-800 hover:text-white border-stone-200/85 hover:border-transparent cursor-pointer hover:scale-110 active:scale-95"
                                : "bg-stone-100 text-stone-300 border-dashed border-stone-200 pointer-events-none"
                            )}
                          >
                            <span className="font-space font-extrabold text-[8px] leading-none uppercase truncate max-w-full">
                              {name}
                            </span>
                            <span className="text-[5.5px] font-mono scale-90 tracking-tighter opacity-40 mt-0.5 uppercase">
                              INNER
                            </span>
                          </motion.button>
                        );
                      })}

                      {/* CONSTELLATION MULTI-RING ORBITS (OUTER CLUSTER ring: R=125px) */}
                      {orbitNodes.outer.map((name, i) => {
                        const angle = (i * (360 / Math.max(orbitNodes.outer.length, 1)) + 45 - 90) * (Math.PI / 180);
                        const radius = 125;
                        const x = `calc(50% + ${radius * Math.cos(angle)}px)`;
                        const y = `calc(50% + ${radius * Math.sin(angle)}px)`;

                        const match = techStackData.find((t) => t.name === name);

                        return (
                          <motion.button
                            key={`outer-satellite-${name}`}
                            onClick={() => match && setSelectedTechId(match.id)}
                            onMouseEnter={() => setHoveredNode(name)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                            className={cn(
                              "absolute w-[44px] h-[44px] rounded-full flex flex-col items-center justify-center p-1 text-center transition-all duration-300 pointer-events-auto border z-30 shadow-sm",
                              match
                                ? "bg-stone-50 hover:bg-stone-900 text-stone-700 hover:text-white border-stone-200 hover:border-transparent cursor-pointer hover:scale-105 active:scale-95"
                                : "bg-stone-100 text-stone-300 border-dashed border-stone-200 pointer-events-none"
                            )}
                          >
                            <span className="font-space font-bold text-[7.5px] leading-none uppercase truncate max-w-full">
                              {name}
                            </span>
                            <span className="text-[5px] font-mono tracking-tighter opacity-40 scale-[0.8] mt-0.5 uppercase">
                              LINKED
                            </span>
                          </motion.button>
                        );
                      })}

                    </div>

                    {/* Highly responsive telemetry system health controls */}
                    <div className="w-full border-t border-[var(--museum-ink)]/10 pt-4 mt-auto grid grid-cols-2 gap-4 select-none">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-end font-mono text-[7px] text-stone-400 font-bold uppercase">
                          <span>Reactor emissions</span>
                          <span style={{ color: motif.primary }}>{proficiency}%</span>
                        </div>
                        <div className="h-1 bg-stone-100 rounded overflow-hidden">
                          <motion.div
                            className="h-full rounded"
                            style={{ backgroundColor: motif.primary }}
                            initial={{ width: 0 }}
                            animate={{ width: `${proficiency}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-end font-mono text-[7px] text-stone-400 font-bold uppercase">
                          <span>Calibration Sync</span>
                          <span style={{ color: motif.secondary }}>94%</span>
                        </div>
                        <div className="h-1 bg-stone-100 rounded overflow-hidden">
                          <motion.div
                            className="h-full rounded"
                            style={{ backgroundColor: motif.secondary }}
                            initial={{ width: 0 }}
                            animate={{ width: "94%" }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other peripheral nodes inside active domain spine */}
                  <div className="flex flex-col gap-1.5 select-none">
                    <span className="font-mono text-[7.5px] uppercase tracking-widest font-black text-stone-400">
                      OTHER CHAMBER METADATA (SELECT LINK DIRECTLY)
                    </span>
                    <div className="flex flex-wrap gap-1 hover:opacity-[0.98] max-h-[80px] overflow-y-auto custom-scrollbar">
                      {displayedTechs
                        .filter((t) => t.id !== selectedTech?.id && !orbitNodes.inner.includes(t.name) && !orbitNodes.outer.includes(t.name))
                        .map((t) => (
                          <button
                            key={`unlinked-${t.id}`}
                            onClick={() => setSelectedTechId(t.id)}
                            className="px-2 py-1 bg-white hover:bg-stone-900 border border-[var(--museum-ink)]/10 hover:border-transparent text-[8.5px] font-mono font-bold text-stone-600 hover:text-white transition-all cursor-pointer rounded"
                          >
                            {t.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW MODE B: HIGH-DENSITY INTERACTIVE GRID REGISTER CHIPS */}
              {viewMode === "Grid" && (
                <motion.div
                  key="grid-element"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 auto-rows-max overflow-y-auto max-h-[580px] pr-2 custom-scrollbar"
                >
                  {displayedTechs.map((tool) => {
                    const isSelected = selectedTechId === tool.id;
                    const val = tool.proficiency || 80;
                    return (
                      <div
                        key={`chip-card-${tool.id}`}
                        onClick={() => setSelectedTechId(tool.id)}
                        className={cn(
                          "bg-white/60 p-4.5 cursor-pointer text-left transition-all relative border flex flex-col justify-between group",
                          isSelected
                            ? "border-stone-800 bg-white ring-[1.5px] ring-stone-900 z-10 shadow-md translate-x-1"
                            : "border-[var(--museum-ink)]/10 hover:bg-white hover:border-stone-400"
                        )}
                        style={{
                          boxShadow: isSelected ? `3px 3px 0 ${motif.primary}` : undefined,
                        }}
                      >
                        {isSelected && (
                          <div
                            className="absolute top-0 bottom-0 left-0 w-1"
                            style={{ backgroundColor: motif.primary }}
                          />
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-space font-black text-[12.5px] text-[var(--museum-ink)] uppercase leading-tight truncate pr-1">
                              {tool.name}
                            </h4>
                            <span className="font-mono text-[7px] bg-stone-100 border border-zinc-200 text-stone-500 px-1.5 py-0.5 font-bold uppercase shrink-0">
                              {tool.level === "Primary Tool" ? "CORE" : tool.level}
                            </span>
                          </div>

                          <p className="font-sans text-[11px] leading-relaxed text-stone-600 line-clamp-2 mb-4 font-medium">
                            {tool.description}
                          </p>
                        </div>

                        <div className="border-t border-[var(--museum-ink)]/10 pt-2.5 mt-auto flex justify-between items-center text-stone-400">
                          <span className="font-mono text-[7.5px] font-bold uppercase tracking-wider">
                            {tool.evidence.length} Evidence entries
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[8px] text-stone-600 font-bold">{val}%</span>
                            <div className="w-10 h-1.5 bg-stone-100 rounded overflow-hidden">
                              <div className="h-full bg-stone-700" style={{ width: `${val}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* VIEW MODE C: EXPANDED DETAILED EVIDENCE CHRONICLE SHEETS */}
              {viewMode === "Evidence" && (
                <motion.div
                  key="evidence-element"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-4 overflow-y-auto max-h-[580px] pr-2 custom-scrollbar"
                >
                  {displayedTechs.map((tool) => {
                    const isSelected = selectedTechId === tool.id;
                    const val = tool.proficiency || 80;
                    return (
                      <div
                        key={`log-evidence-${tool.id}`}
                        onClick={() => setSelectedTechId(tool.id)}
                        className={cn(
                          "bg-white/40 border p-5 flex flex-col gap-3.5 cursor-pointer text-left transition-all relative",
                          isSelected
                            ? "border-stone-900 bg-white shadow-xl ring-1 ring-stone-900"
                            : "border-[var(--museum-ink)]/10 hover:border-stone-400 hover:bg-white"
                        )}
                      >
                        {isSelected && (
                          <div
                            className="absolute top-0 bottom-0 left-0 w-1"
                            style={{ backgroundColor: motif.primary }}
                          />
                        )}

                        <div className="flex items-center justify-between border-b border-[var(--museum-ink)]/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: isSelected ? motif.primary : "#d4d4d8" }} 
                            />
                            <h4 className="font-space font-black text-[10.5px] text-[var(--museum-ink)] uppercase tracking-wider leading-none">
                              {tool.name} // METRIC_SPECS
                            </h4>
                          </div>
                          <span className="font-mono text-[7px] text-stone-400 font-bold">
                            REALM: {tool.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Side by side descriptive details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                              FUNCTIONAL OVERVIEW
                            </span>
                            <p className="text-[11.5px] leading-relaxed font-sans text-stone-600 font-medium">
                              “{tool.description}”
                            </p>
                          </div>
                          <div>
                            <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                              VERIFIABLE LOGS ({tool.evidence.length})
                            </span>
                            <ul className="space-y-1">
                              {tool.evidence.slice(0, 3).map((clause, idx) => (
                                <li key={`clause-${idx}`} className="font-mono text-[9px] text-stone-600 flex items-start gap-1">
                                  <span style={{ color: motif.primary }}>&gt;</span>
                                  <span className="truncate">{clause}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* ──────────────────────────────────────────────────────────────────
              PANEL 3 (RIGHT): THE SPECIMEN DOSSIER ARTIFACT INSPECTOR
              ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            
            <AnimatePresence mode="wait">
              {selectedTech ? (
                <motion.div
                  key={`inspector-${selectedTech.id}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/80 backdrop-blur-xl border-2 border-stone-900 p-5.5 flex flex-col h-full min-h-[480px] max-h-[580px] overflow-y-auto custom-scrollbar select-none rounded-none justify-between transition-all"
                  style={{
                    boxShadow: `4px 4px 0 ${motif.primary}`,
                  }}
                >
                  <div className="space-y-4.5">
                    {/* Telemetry Header */}
                    <div className="flex justify-between items-center border-b border-[var(--museum-ink)]/15 pb-3 select-none">
                      <span className="font-mono text-[8px] font-black text-stone-400 flex items-center gap-1.5 uppercase tracking-widest">
                        <Target className="w-3.5 h-3.5" style={{ color: motif.primary }} />
                        ARTIFACT_INSPECTOR // 00{selectedTech.id.length}
                      </span>
                      <span 
                        className="font-mono text-[7px] font-black uppercase bg-stone-100 border border-stone-200 px-2 py-0.5 text-stone-600"
                        style={{ borderLeft: `2.5px solid ${motif.primary}` }}
                      >
                        {selectedTech.level === "Primary Tool" ? "CORE" : selectedTech.level}
                      </span>
                    </div>

                    {/* Taxonomy Block Specifications */}
                    <div>
                      <span className="font-mono text-[7px] font-bold text-stone-400 block tracking-widest uppercase mb-0.5">
                        SPECIMEN_ID
                      </span>
                      <h2 className="font-space font-black uppercase text-2xl tracking-tight text-[var(--museum-ink)]">
                        {selectedTech.name}
                      </h2>
                    </div>

                    {/* Operational System Roles */}
                    <div>
                      <span className="font-mono text-[7px] font-bold text-stone-400 block tracking-widest uppercase mb-1.5">
                        OPERATIONAL_SYSTEM_ROLE
                      </span>
                      <p className="font-sans text-[12px] leading-relaxed text-stone-600 font-semibold border-l-2 pl-3 border-stone-800/35 italic">
                        {selectedTech.description}
                      </p>
                    </div>

                    {/* HIGH CONTRAST MATRIX / TECHNICAL SPECS OVERVIEW */}
                    <div className="bg-[#faf8f5] p-3 border border-stone-900/10 grid grid-cols-2 gap-3.5 select-none text-[10px]">
                      <div>
                        <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                          MASTERY VALUE
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-space font-black text-stone-800 truncate">
                            {selectedTech.masteryLabel || "Verified Skill"}
                          </span>
                        </div>
                        <div className="h-1.5 bg-stone-200 rounded overflow-hidden mt-1">
                          <div className="h-full bg-stone-700" style={{ width: `${proficiency}%` }} />
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                          DEPLOY CONFIDENCE
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0" style={{ backgroundColor: motif.primary }} />
                          <span className="font-mono text-[8.5px] font-extrabold text-stone-800 tracking-wider">
                            {selectedTech.confidenceStatus || "SECURE_FLOW"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC CATEGORY-SPECIFIC SUB-EXHIBITS */}
                    {selectedTech.category === "natural_languages" && (
                      <div className="bg-purple-50/70 border border-purple-200/50 p-3 rounded-none space-y-2 select-none">
                        <span className="font-mono text-[7px] font-bold text-purple-600 block tracking-widest uppercase mb-1">
                          ACTIVE_SPOKEN_REPERTOIRE // PORTFOLIO
                        </span>
                        
                        <div className="space-y-2">
                          {[
                            { code: "EN", name: "English", level: "Native / Bilingual Fluency", bar: "w-full", bg: "bg-purple-600" },
                            { code: "ZH", name: "Chinese (Mandarin)", level: "Fluent / Technical & Cultural Sync", bar: "w-11/12", bg: "bg-purple-500" },
                            { code: "FR", name: "French", level: "Conversational / Academic Sync", bar: "w-8/12", bg: "bg-purple-400" },
                            { code: "ES", name: "Spanish", level: "Conversational / Reading & Intro", bar: "w-6/12", bg: "bg-purple-300" },
                            { code: "JA", name: "Japanese", level: "Basic / Minimalist UI Research", bar: "w-4/12", bg: "bg-purple-200" },
                          ].map((lang) => (
                            <div key={`lang-bar-${lang.code}`} className="space-y-0.5">
                              <div className="flex justify-between items-center text-[9px] font-mono">
                                <span className="font-bold text-stone-800 flex items-center gap-1">
                                  <span className="px-1 py-0.1 bg-purple-100 text-purple-700 text-[8px] rounded border border-purple-300/45 font-sans font-extrabold">{lang.code}</span>
                                  {lang.name}
                                </span>
                                <span className="text-stone-500 text-[8px]">{lang.level}</span>
                              </div>
                              <div className="h-1 bg-stone-200/60 rounded-full overflow-hidden">
                                <div className={`h-full ${lang.bar} ${lang.bg}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedTech.category === "programming_languages" && (
                      <div className="bg-blue-50/70 border border-blue-200/50 p-2.5 rounded-none grid grid-cols-2 gap-2 select-none text-[8.5px] font-mono">
                        <div className="flex items-center gap-1.5 col-span-2 border-b border-blue-100 pb-1 mb-1 justify-between">
                          <span className="text-[7.5px] font-bold text-blue-600 uppercase tracking-widest">COMPILE_RUNTIME_METRICS</span>
                          <span className="text-[7px] text-stone-400">STATUS: STABLE</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span className="text-stone-500">PARADIGM:</span>
                          <span className="text-stone-850 font-extrabold">OOP / FP</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-stone-500">TYPING:</span>
                          <span className="text-stone-850 font-extrabold">STRICT_STATIC</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          <span className="text-stone-500">RUNTIME:</span>
                          <span className="text-stone-850 font-extrabold">V8/NODE/WASM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                          <span className="text-stone-500">TARGET:</span>
                          <span className="text-stone-850 font-extrabold">ESNEXT / CJS</span>
                        </div>
                      </div>
                    )}

                    {selectedTech.category === "language_systems" && (
                      <div className="bg-pink-50/70 border border-pink-200/50 p-2.5 rounded-none flex flex-col gap-1.5 select-none text-[8.5px] font-mono">
                        <div className="flex items-center justify-between border-b border-pink-100 pb-1">
                          <span className="text-[7.5px] font-bold text-pink-600 uppercase tracking-widest">SYNTAX_TRANSFORMS_LOGS</span>
                          <span className="text-[7px] text-stone-400">MODE: ACTIVE</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">LEXICAL TOKENIZATION:</span>
                          <span className="text-pink-600 font-bold">TOKEN_ENERGY_HIGH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">AST_GENERATION_DENSITY:</span>
                          <span className="text-pink-600 font-bold">STABLE_PARSE</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">INTERPRETER_MUTATION:</span>
                          <span className="text-pink-600 font-bold">TypeScript AST</span>
                        </div>
                      </div>
                    )}

                    {/* Logged Verifiable Proof Logs */}
                    <div>
                      <span className="font-mono text-[7px] font-bold text-stone-400 block tracking-widest uppercase mb-1.5">
                        VERIFIABLE_PROOF_LOGS
                      </span>
                      <ul className="space-y-1.5">
                        {selectedTech.evidence.map((proof, idx) => (
                          <li 
                            key={`inspect-proof-${idx}`}
                            className="bg-stone-50 border border-stone-200/50 p-2 text-[10.5px] font-sans font-medium text-stone-600 flex items-start gap-2"
                          >
                            <span className="font-mono text-[8px] font-bold text-stone-400 mt-0.5">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="leading-snug">{proof}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learning Frontier */}
                    {selectedTech.learningFocus && (
                      <div>
                        <span className="font-mono text-[7px] font-bold text-stone-400 block tracking-widest uppercase mb-1">
                          LEARNING_FRONTIER
                        </span>
                        <div className="bg-stone-50 p-2.5 border border-dashed border-stone-300 font-medium font-sans text-[11px] leading-relaxed text-stone-600 rounded">
                          {selectedTech.learningFocus}
                        </div>
                      </div>
                    )}

                    {/* Future Upgrade Step */}
                    {selectedTech.nextUpgrade && (
                      <div>
                        <span className="font-mono text-[7px] font-bold text-stone-400 block tracking-widest uppercase mb-1">
                          FUTURE_UPGRADE_PATHWAY
                        </span>
                        <div className="bg-stone-100/60 p-2 border-l-2 border-stone-800 font-mono text-[9px] leading-relaxed text-stone-700">
                          {selectedTech.nextUpgrade}
                        </div>
                      </div>
                    )}

                    {/* Integrations & Used in deployments */}
                    <div className="grid grid-cols-2 gap-3 pt-1 select-none text-[10px]">
                      <div>
                        <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                          INTEGRATED TOOLS
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedTech.relatedTools && selectedTech.relatedTools.length > 0 ? (
                            selectedTech.relatedTools.slice(0, 3).map((t) => (
                              <span 
                                key={`tag-${t}`}
                                className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 font-mono text-[7px] font-bold text-neutral-600 uppercase rounded"
                              >
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-400 italic">None logged</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[7px] text-stone-400 font-bold block uppercase tracking-wider mb-1">
                          USED_IN_DEPLOYMENTS
                        </span>
                        <div className="flex flex-col gap-1">
                          {selectedTech.usedIn && selectedTech.usedIn.length > 0 ? (
                            selectedTech.usedIn.slice(0, 3).map((app) => (
                              <span 
                                key={`app-${app}`}
                                className="font-mono text-[8px] font-black text-stone-800 tracking-wide truncate flex items-center gap-1"
                              >
                                <span style={{ color: motif.primary }}>&rsaquo;</span>
                                {app}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-400 italic">Core Stack</span>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footnotes Calibration Reading */}
                  <div className="border-t border-[var(--museum-ink)]/15 pt-3.5 mt-4 flex justify-between items-center text-stone-400 select-none">
                    <span className="font-mono text-[7.5px] uppercase font-extrabold tracking-widest">
                      CHAMBER_STATUS: LOCKED_READ
                    </span>
                    <button
                      onClick={() => {
                        const el = document.getElementById("signal");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-mono text-[8px] uppercase font-black text-stone-900 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Collaborate <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="border border-dashed border-stone-300 p-8 text-center text-stone-400 font-mono text-xs flex flex-col items-center justify-center h-full min-h-[460px]">
                  No active tool node selected.
                </div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* =========================================================================================
            Active reactor state diagnostics footer
           ========================================================================================= */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between border-t border-[var(--museum-ink)]/15 pt-6 gap-6">
          <div className="max-w-2xl select-none">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] font-extrabold flex items-center gap-1.5 mb-1 text-amber-600" style={{ color: motif.primary }}>
              <Sparkles className="w-3.5 h-3.5" /> DIGITAL MUSEUM COMPOSITE DIAGNOSTICS
            </span>
            <p className="font-sans text-[13.5px] font-bold text-stone-700 leading-relaxed italic">
              “Rocky has fully indexed, classified, and verified all core system pipelines, providing an active network topology that automatically adapts state configurations to responsive design footprints.”
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto shrink-0 select-none">
            <button
              onClick={() => {
                const el = document.getElementById("principles-learning");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full md:w-auto py-3 px-6 bg-stone-900 hover:bg-white text-white hover:text-stone-900 border-2 border-stone-900 font-mono text-[9px] uppercase font-bold tracking-[0.15em] cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 rounded"
              style={{
                boxShadow: `3px 3px 0 ${motif.primary}`
              }}
            >
              System Learning Principles
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
