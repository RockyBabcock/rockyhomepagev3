import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { exhibitIndex, Exhibit } from "../data/exhibitIndex";
import { 
  Compass, 
  Cpu, 
  Terminal, 
  Layers, 
  Database, 
  ChevronRight, 
  Activity, 
  Sparkles, 
  Crown,
  Lock,
  ArrowRight,
  Eye
} from "lucide-react";

export function FeaturedExhibitsWall() {
  const [activeId, setActiveId] = useState<string>("homepage-v3");
  const [hoveredPreviewId, setHoveredPreviewId] = useState<string | null>(null);
  const [ticker, setTicker] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Monitor mouse position for subtle parallax coordinates shift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parent = document.getElementById("living-exhibit-chamber");
      if (parent) {
        const rect = parent.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 50,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 50,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Soft internal heartbeat clock for visual wave animations
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const activeExhibit = exhibitIndex.find((e) => e.id === activeId) || exhibitIndex[0];
  const activeIdx = exhibitIndex.findIndex((e) => e.id === activeId);

  // Smooth scroll helper to navigate the museum halls
  const scrollToSection = (id: string) => {
    if (id === "entrance" || id === "#" || id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const cleanId = id.replace("#", "");
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // High-end Museum Aesthetic Colors mapped to environmental auras
  const getExhibitColorSpecs = (id: string) => {
    switch (id) {
      case "homepage-v3": 
        return { 
          primary: "#d97706", // Amber
          light: "#fffbeb", 
          glow: "rgba(217,119,6,0.18)", 
          text: "text-amber-600", 
          bgGlow: "from-amber-500/10 via-transparent to-transparent",
          accentColor: "bg-amber-500"
        };
      case "capability-forge": 
        return { 
          primary: "#06b6d4", // Cyan
          light: "#ecfeff", 
          glow: "rgba(6,182,212,0.18)", 
          text: "text-cyan-500", 
          bgGlow: "from-cyan-500/10 via-transparent to-transparent",
          accentColor: "bg-cyan-500"
        };
      case "project-laboratory": 
        return { 
          primary: "#4f46e5", // Indigo
          light: "#e0e7ff", 
          glow: "rgba(79,70,229,0.18)", 
          text: "text-indigo-500", 
          bgGlow: "from-indigo-500/10 via-transparent to-transparent",
          accentColor: "bg-indigo-500"
        };
      case "ai-playground": 
        return { 
          primary: "#c084fc", // Magenta/Lavender
          light: "#f3e8ff", 
          glow: "rgba(192,132,252,0.18)", 
          text: "text-purple-400", 
          bgGlow: "from-purple-500/10 via-transparent to-transparent",
          accentColor: "bg-purple-500"
        };
      case "web3-vault": 
        return { 
          primary: "#10b981", // Mint
          light: "#f0fdf4", 
          glow: "rgba(16,185,129,0.18)", 
          text: "text-emerald-500", 
          bgGlow: "from-emerald-500/10 via-transparent to-transparent",
          accentColor: "bg-emerald-500"
        };
      case "chess-archive": 
        return { 
          primary: "#9f1239", // Burgundy/Gold
          light: "#fff1f2", 
          glow: "rgba(159,18,57,0.18)", 
          text: "text-rose-600", 
          bgGlow: "from-rose-600/10 via-transparent to-transparent",
          accentColor: "bg-rose-600"
        };
      case "digital-garden": 
        return { 
          primary: "#84cc16", // Lime
          light: "#f7fee7", 
          glow: "rgba(132,204,22,0.18)", 
          text: "text-lime-500", 
          bgGlow: "from-lime-500/10 via-transparent to-transparent",
          accentColor: "bg-lime-500"
        };
      default: 
        return { 
          primary: "#d97706", 
          light: "#fffbeb", 
          glow: "rgba(217,119,6,0.18)", 
          text: "text-amber-600", 
          bgGlow: "from-amber-500/10 via-transparent to-transparent",
          accentColor: "bg-amber-500"
        };
    }
  };

  const getExhibitIcon = (id: string, className: string) => {
    switch (id) {
      case "homepage-v3": return <Compass className={className} />;
      case "capability-forge": return <Cpu className={className} />;
      case "project-laboratory": return <Layers className={className} />;
      case "ai-playground": return <Terminal className={className} />;
      case "web3-vault": return <Lock className={className} />;
      case "chess-archive": return <Crown className={className} />;
      case "digital-garden": return <Database className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Dynamically select exactly 3 neighboring secondary exhibits for the orbital satellite configuration
  const getOrbitExhibits = (): Exhibit[] => {
    const list: Exhibit[] = [];
    for (let i = 1; i <= 3; i++) {
      const idx = (activeIdx + i) % exhibitIndex.length;
      list.push(exhibitIndex[idx]);
    }
    return list;
  };

  const specs = getExhibitColorSpecs(activeId);
  const orbitExhibits = getOrbitExhibits();

  // Fine-tuned Vector Motif Generator (High-end WebGL-like Abstract Renderers)
  const renderInteractiveCore = (id: string, color: string) => {
    switch (id) {
      case "homepage-v3":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[80%]" viewBox="0 0 100 100">
              {/* Outer compass ring */}
              <motion.circle 
                cx="50" cy="50" r="42" 
                stroke={color} strokeWidth="1" strokeDasharray="3 4" fill="none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              />
              <motion.circle 
                cx="50" cy="50" r="32" 
                stroke={color} strokeWidth="0.5" fill="none"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              />
              {/* Core alignment coordinates */}
              <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
              <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
              {/* Floating inner nodes */}
              <motion.polygon 
                points="50,22 58,50 50,78 42,50" 
                stroke={color} strokeWidth="1.5" fill="none"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 180, 270, 360] }}
                transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
              />
              <circle cx="50" cy="50" r="4" fill={color} />
            </svg>
          </div>
        );
      case "capability-forge":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[80%]" viewBox="0 0 100 100">
              {/* Reactor Nodes */}
              <circle cx="50" cy="50" r="28" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
              <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="0.5" fill="none" strokeOpacity="0.2" />
              
              {/* Intersecting constellation vectors */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * Math.PI) / 3;
                const x1 = 50 + Math.cos(angle) * 28;
                const y1 = 50 + Math.sin(angle) * 28;
                const x2 = 50 + Math.cos(angle + Math.PI/3) * 28;
                const y2 = 50 + Math.sin(angle + Math.PI/3) * 28;
                
                return (
                  <React.Fragment key={i}>
                    <line x1="50" y1="50" x2={x1} y2={y1} stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" />
                    <motion.circle 
                      cx={x1} cy={y1} r="2.5" 
                      fill={color}
                      animate={{ scale: [1, 1.6, 1] }} 
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} 
                    />
                  </React.Fragment>
                );
              })}
              <circle cx="50" cy="50" r="5" fill={color} />
            </svg>
          </div>
        );
      case "project-laboratory":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[80%]" viewBox="0 0 100 100">
              <path d="M10,80 Q30,20 50,55 T90,30" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M10,80 Q30,50 50,30 T90,65" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" fill="none" strokeOpacity="0.5" />
              
              {/* Tracking nodes */}
              {[20, 50, 75].map((val, idx) => (
                <motion.g 
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" }}
                >
                  <circle cx={val} cy={idx === 0 ? 50 : idx === 1 ? 55 : 40} r="3" fill={color} />
                  <circle cx={val} cy={idx === 0 ? 50 : idx === 1 ? 55 : 40} r="8" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
                </motion.g>
              ))}
              {/* Matrix baseline */}
              <line x1="5" y1="80" x2="95" y2="80" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
          </div>
        );
      case "ai-playground":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Elegant fluid waveform ripples */}
            <div className="w-48 h-48 rounded-full border border-white/5 relative flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-1.5"
                  style={{ borderColor: color }}
                  animate={{
                    width: ["30%", "100%"],
                    height: ["30%", "100%"],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="w-12 h-12 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: `${color}15` }}>
                <Activity className="w-5 h-5 animate-pulse" style={{ color }} />
              </div>
            </div>
          </div>
        );
      case "web3-vault":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[75%]" viewBox="0 0 100 100">
              <motion.g
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              >
                {/* Cryptographic glass crystal */}
                <polygon points="50,15 80,40 80,68 50,91 20,68 20,40" stroke={color} strokeWidth="1" fill="none" />
                <polygon points="50,15 50,91" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
                <polygon points="20,40 80,40" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
                <polygon points="20,68 80,68" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
              </motion.g>
              <circle cx="50" cy="50" r="3" fill={color} />
            </svg>
          </div>
        );
      case "chess-archive":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[80%]" viewBox="0 0 100 100">
              {/* Tactical chess lattice */}
              <rect x="25" y="25" width="50" height="50" stroke={color} strokeWidth="1" fill="none" strokeDasharray="2 2" />
              <line x1="50" y1="25" x2="50" y2="75" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
              <line x1="25" y1="50" x2="75" y2="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
              
              {/* Floating tactical route line */}
              <motion.path 
                d="M 33,67 L 33,33 L 67,33" 
                stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <circle cx="33" cy="67" r="3" fill={color} />
              <circle cx="67" cy="33" r="3" fill={color} />
            </svg>
          </div>
        );
      case "digital-garden":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full max-w-[80%]" viewBox="0 0 100 100">
              {/* Organic branch structures */}
              <motion.path 
                d="M50,90 Q50,60 35,45 T20,25" 
                stroke={color} strokeWidth="1" fill="none"
                animate={{ pathLength: [0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path 
                d="M50,90 Q50,55 65,38 T80,18" 
                stroke={color} strokeWidth="1" fill="none"
                animate={{ pathLength: [0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              />
              <circle cx="20" cy="25" r="3.5" fill={color} />
              <circle cx="80" cy="18" r="3.5" fill={color} />
              <circle cx="50" cy="40" r="2.5" fill={color} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="living-exhibit-chamber"
      className="relative w-full bg-[#fdfcf7] border-b-2 border-[var(--museum-ink)] py-20 lg:py-24 px-6 sm:px-12 md:px-16 overflow-hidden select-none"
    >
      {/* ────────────────────────────────────────────────────────────────────────
          SPATIAL CONTINUITY BRIDGE: Visualizing energy of the Genesis Node flowing into the Chamber
          ──────────────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1500px] mx-auto relative h-[140px] md:h-[180px] flex items-center justify-center overflow-visible mb-16 select-none border-b border-dashed border-[var(--museum-ink)]/10">
        
        {/* Ambient projection glow emanating from the top center */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] h-[120px] md:h-[160px] rounded-full filter blur-[50px] transition-all duration-[1000ms] pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, ${specs.primary}30 0%, transparent 70%)`
          }}
        />

        {/* Cinematic stream connection conduits using responsive grid mapping */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main vertical center conduit line */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="var(--museum-ink)"
            strokeWidth="0.15"
            strokeOpacity="0.25"
            strokeDasharray="1 1.5"
          />

          {/* Leftward stream line branching to Nav Spine */}
          <path
            d="M 50,0 C 50,40 15,60 15,100"
            fill="none"
            stroke="var(--museum-ink)"
            strokeWidth="0.1"
            strokeOpacity="0.15"
            strokeDasharray="1 1"
          />

          {/* Rightward stream line branching to Satellites */}
          <path
            d="M 50,0 C 50,40 85,60 85,100"
            fill="none"
            stroke="var(--museum-ink)"
            strokeWidth="0.1"
            strokeOpacity="0.15"
            strokeDasharray="1 1"
          />

          {/* Glowing Animated Energy Pulses flowing along coordinates */}
          {/* Central main energy blast */}
          <motion.circle r="0.6" fill={specs.primary}>
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path="M 50,0 L 50,100"
            />
          </motion.circle>
          
          <motion.circle r="0.5" fill={specs.primary} opacity="0.6">
            <animateMotion
              dur="3s"
              delay="1.2s"
              repeatCount="indefinite"
              path="M 50,0 C 50,40 15,60 15,100"
            />
          </motion.circle>

          <motion.circle r="0.5" fill={specs.primary} opacity="0.6">
            <animateMotion
              dur="3s"
              delay="0.6s"
              repeatCount="indefinite"
              path="M 50,0 C 50,40 85,60 85,100"
            />
          </motion.circle>

          {/* Node access ticks at the threshold */}
          <circle cx="50" cy="0" r="1" fill="var(--museum-ink)" />
          <circle cx="50" cy="0" r="2.5" stroke="var(--museum-ink)" strokeWidth="0.1" strokeOpacity="0.4" fill="none" />
          
          {/* Exit portals at the bottom of the bridge */}
          <circle cx="15" cy="100" r="0.8" fill={specs.primary} />
          <circle cx="50" cy="100" r="1" fill={specs.primary} />
          <circle cx="85" cy="100" r="0.8" fill={specs.primary} />
        </svg>

        {/* Editorial Decals / Coordinates along the stream - Pure Unseen.co style */}
        <div className="absolute left-0 md:left-6 top-2 flex flex-col font-mono text-[8px] text-stone-400 tracking-wider">
          <span className="font-bold uppercase text-stone-500">[STREAM_COORDINATES]</span>
          <span>NODE_ALT: ELEV_HALL_1</span>
          <span>VAL_FLOW: ACTIVE_STROBE</span>
        </div>

        <div className="absolute right-0 md:right-6 top-2 flex flex-col font-mono text-[8px] text-stone-400 text-right tracking-wider">
          <span className="font-bold uppercase text-stone-500">[BRIDGE_AUTHENTICATE]</span>
          <span>CRYPTO_DECODER: PASS</span>
          <span>MUSEUM_LOCK: ACTIVE</span>
        </div>

        {/* Centered portal label signifier */}
        <div className="absolute bg-[#fdfcf7] px-4 py-2 border border-[var(--museum-ink)]/15 text-center flex flex-col items-center">
          <span className="font-mono text-[7px] tracking-[0.4em] font-black uppercase text-stone-400 leading-none mb-1">
            CONDUIT_PATH_01
          </span>
          <h3 className="font-space font-black uppercase text-[10px] tracking-widest text-[var(--museum-ink)] leading-none inline-flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: specs.primary }} />
            Genesis Energy Stream
          </h3>
        </div>

      </div>

      {/* Living Atmospheric Environmental Glow mapped directly to Active Exhibit Aura */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-[1200ms] ease-in-out opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${specs.primary} 0%, transparent 60%)`
        }}
      />
      
      {/* Moving Light Leak from top left corner */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none opacity-20 mix-blend-color-burn transition-all duration-[1200ms]"
        style={{ backgroundColor: specs.primary }}
      />

      {/* Atmospheric coordinate grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--museum-ink) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, var(--museum-ink) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "55px 55px",
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
        }}
      />

      {/* Dynamic Constellation Layer: Connecting Central Glass Reactor to Navigation and Satellites */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        
        {/* Connected pipeline leading from left selector area to Center */}
        <path
          d="M 280,500 L 500,500"
          fill="none"
          stroke={specs.primary}
          strokeWidth="0.6"
          strokeOpacity="0.18"
          strokeDasharray="4 6"
        />

        {/* Connection paths leading from Center to the 3 satellites on the right side */}
        <path
          d="M 500,500 C 580,420 620,380 720,340"
          fill="none"
          stroke={specs.primary}
          strokeWidth="0.8"
          strokeOpacity="0.18"
          strokeDasharray="3 5"
        />
        <path
          d="M 500,500 L 720,540"
          fill="none"
          stroke={specs.primary}
          strokeWidth="0.8"
          strokeOpacity="0.18"
          strokeDasharray="3 5"
        />
        <path
          d="M 500,500 C 580,580 620,620 720,740"
          fill="none"
          stroke={specs.primary}
          strokeWidth="0.8"
          strokeOpacity="0.18"
          strokeDasharray="3 5"
        />

        {/* Traveling electrical energy pulses bridging the gap */}
        <motion.circle r="2.5" fill={specs.primary}>
          <animateMotion 
            dur="4.5s" 
            repeatCount="indefinite" 
            path="M 500,500 C 580,420 620,380 720,340" 
          />
        </motion.circle>
        <motion.circle r="2.5" fill={specs.primary}>
          <animateMotion 
            dur="4s" 
            delay="1.2s" 
            repeatCount="indefinite" 
            path="M 500,500 L 720,540" 
          />
        </motion.circle>
        <motion.circle r="2.5" fill={specs.primary}>
          <animateMotion 
            dur="4.8s" 
            delay="2.4s" 
            repeatCount="indefinite" 
            path="M 500,500 C 580,580 620,620 720,740" 
          />
        </motion.circle>
      </svg>

      {/* Delicate Museum Axis Line Marks */}
      <div className="absolute top-0 bottom-0 left-[24%] w-[1.5px] bg-[var(--museum-ink)]/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[28%] w-[1.5px] bg-[var(--museum-ink)]/5 pointer-events-none text-right" />
      <div className="absolute left-[8%] right-[8%] h-[1.5px] top-[40%] bg-[var(--museum-ink)]/5 pointer-events-none" />

      {/* Oversized Cinematic Typography - Collabcapitolium style */}
      <div className="absolute -left-12 top-[10%] rotate-90 origin-top-left font-space text-[120px] font-black uppercase text-[var(--museum-ink)]/[0.02] tracking-tighter select-none hidden xl:block">
        EXHIBITION_01
      </div>
      
      <div className="absolute -right-16 bottom-[10%] -rotate-90 origin-bottom-right font-space text-[120px] font-black uppercase text-[var(--museum-ink)]/[0.02] tracking-tighter select-none hidden xl:block">
        _CHAMBER_01
      </div>

      <div className="max-w-[1500px] mx-auto w-full relative z-10">
        
        {/* Subtle section identifier - Unseen style */}
        <div className="flex justify-between items-end border-b border-[var(--museum-ink)]/10 pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400">
              [HALL_01_CORE]
            </span>
            <div className="w-1.5 h-1.5 rounded-none" style={{ backgroundColor: specs.primary }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: specs.primary }}>
              Active Environment State
            </span>
          </div>
          <span className="font-mono text-[9px] text-stone-500 uppercase font-black tracking-widest hidden sm:block">
            ARCHIVAL ID: RB-2026-CHAMBER
          </span>
        </div>

        {/* =========================================================================================
            Main Spatial Layout Grid (Asymmetrical Architecture - Selector, Central installation, Orbit previews)
           ========================================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* 1. SLIM LEFT COLUMN: Floating Chronology Selector */}
          <div className="lg:col-span-3 flex flex-col gap-8 self-center">
            <div className="flex flex-col gap-1">
              <h2 className="font-space font-black uppercase text-3xl tracking-tight text-[var(--museum-ink)] leading-none select-none">
                Chamber
              </h2>
              <p className="font-mono text-[10px] uppercase font-bold tracking-[0.15em] text-stone-400">
                Curator Navigation Spine
              </p>
            </div>

            {/* Float selection array without bulky containers */}
            <div className="flex flex-col gap-3 relative select-none">
              
              {/* Delicate line timeline tracker */}
              <div className="absolute left-[13.5px] top-6 bottom-6 w-[1.5px] bg-[var(--museum-ink)]/10" />
              
              <div 
                className="absolute left-[13.5px] w-[1.5px] transition-all duration-[600ms] ease-out-quint" 
                style={{
                  top: `calc(${activeIdx * (100 / (exhibitIndex.length - 1))}% + 24px)`,
                  height: "28px",
                  backgroundColor: specs.primary
                }}
              />

              {exhibitIndex.map((exh, idx) => {
                const isItemActive = activeId === exh.id;
                const matchSpecs = getExhibitColorSpecs(exh.id);

                return (
                  <button
                    key={`left-selector-${exh.id}`}
                    onClick={() => setActiveId(exh.id)}
                    onMouseEnter={() => setActiveId(exh.id)}
                    className="flex items-center gap-5 group text-left px-2 py-2 cursor-pointer transition-all duration-300 relative rounded-none outline-none"
                  >
                    {/* Ring Node */}
                    <div className="relative shrink-0 flex items-center justify-center w-3 h-3 z-10">
                      <div 
                        className={cn(
                          "absolute inset-0 rounded-full transition-all duration-500",
                          isItemActive ? "scale-125 shadow-lg" : "bg-stone-200 group-hover:bg-amber-500 group-hover:scale-110"
                        )}
                        style={{
                          backgroundColor: isItemActive ? matchSpecs.primary : undefined
                        }}
                      />
                      {isItemActive && (
                        <div 
                          className="absolute inset-0 rounded-full animate-ping scale-150 opacity-40"
                          style={{ backgroundColor: matchSpecs.primary }}
                        />
                      )}
                    </div>

                    {/* Meta Label */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-stone-400 font-bold leading-normal mb-0.5">
                        0{idx + 1} // {exh.status}
                      </span>
                      <span 
                        className={cn(
                          "font-space font-medium uppercase text-[12.5px] tracking-tight transition-all duration-300",
                          isItemActive 
                            ? "text-[var(--museum-ink)] font-black translate-x-1" 
                            : "text-stone-400 group-hover:text-[var(--museum-ink)] group-hover:translate-x-0.5"
                        )}
                        style={{
                          color: isItemActive ? matchSpecs.primary : undefined
                        }}
                      >
                        {exh.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Coordinate Telemetry Footnote */}
            <div className="mt-4 pt-6 border-t border-[var(--museum-ink)]/5 font-mono text-[8.5px] text-stone-400 tracking-widest leading-relaxed">
              <span className="font-bold text-stone-500 block uppercase mb-1">Environmental Sync</span>
              SYS_ACTIVE_POS: H01_EX0{activeIdx + 1} <br />
              COGNITIVE_GRID: CONNECTED_SECURE
            </div>
          </div>

          {/* 2. CORE CENTER COLUMN: The Holographic/WebGL Stage Reactor */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            {/* The Floating Circular Chamber Cylinder */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[410px] md:h-[410px] flex items-center justify-center z-10">
              
              {/* Outer rotational ticks */}
              <motion.div 
                className="absolute inset-0 border-2 rounded-full border-dashed transition-colors duration-1000 pointer-events-none"
                style={{ borderColor: specs.primary, opacity: 0.25 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              />

              {/* Subdued shadow and background glass slab */}
              <div 
                className="absolute inset-[15px] rounded-full border-[1.5px] transition-all duration-1000 shadow-2xl backdrop-blur-[12px] bg-white/70 flex flex-col items-center justify-center p-6 relative overflow-hidden"
                style={{ 
                  borderColor: specs.primary,
                  boxShadow: `0 25px 50px -12px ${specs.primary}20` 
                }}
              >
                {/* Embedded Coordinate Vector Grid inside key circle */}
                <div 
                  className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                  style={{
                    backgroundImage: `radial-gradient(circle, var(--museum-ink) 1px, transparent 1px)`,
                    backgroundSize: "16px 16px"
                  }}
                />

                {/* Motif projection viewport */}
                <div className="w-52 h-52 relative flex items-center justify-center select-none mb-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.85, rotate: 20 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {renderInteractiveCore(activeId, specs.primary)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Compressed overlay telemetry text labels - pure Unseen style */}
                <div className="absolute bottom-10 left-0 right-0 text-center px-4 flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <span className="font-mono text-[8px] uppercase tracking-[0.25em] font-black text-stone-400 mb-1">
                        PROJECT_CORE // SPECIFICATION
                      </span>
                      <h3 className="font-space font-black uppercase text-base sm:text-lg text-[var(--museum-ink)] tracking-tight">
                        {activeExhibit.title}
                      </h3>
                      <p className="font-sans text-[11.5px] font-bold text-stone-500 leading-none max-w-xs mt-1">
                        {activeExhibit.type}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Floating Orbit ring coordinates (Subtle Web3 Protocol graphics) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" stroke={specs.primary} strokeWidth="0.2" fill="none" strokeDasharray="1 9" />
              </svg>
            </div>

            {/* Real environmental depth shadows beneath center stage */}
            <div 
              className="absolute w-[240px] h-[30px] bottom-[-20px] rounded-full filter blur-[25px] opacity-15 pointer-events-none mix-blend-multiply transition-all duration-1000"
              style={{ backgroundColor: specs.primary }}
            />
          </div>

          {/* 3. RIGHT COLUMN: 3 Ambient Floating Artifact Previews */}
          <div className="lg:col-span-4 flex flex-col gap-6 self-center justify-center h-full">
            <div className="flex flex-col gap-1 border-b border-[var(--museum-ink)]/10 pb-5 mb-2 select-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-indigo-500">
                SAT_ORBIT_SYS
              </span>
              <h3 className="font-space font-bold uppercase text-lg text-[var(--museum-ink)] tracking-tight">
                Neighboring Artifacts
              </h3>
            </div>

            {/* Orbit Satellite list (3 overlapping components) instead of dashboard card stack */}
            <div className="flex flex-col gap-5 relative">
              {orbitExhibits.map((exh, idx) => {
                const orbSpecs = getExhibitColorSpecs(exh.id);
                const isHovered = hoveredPreviewId === exh.id;

                return (
                  <button
                    key={`satellite-preview-${exh.id}`}
                    onClick={() => setActiveId(exh.id)}
                    onMouseEnter={() => {
                      setHoveredPreviewId(exh.id);
                      setActiveId(exh.id);
                    }}
                    onMouseLeave={() => setHoveredPreviewId(null)}
                    className="w-full text-left bg-white/70 border-1.5 border-[var(--museum-ink)]/10 hover:border-[var(--museum-ink)] p-4 relative group cursor-pointer transition-all duration-500 rounded-none overflow-hidden hover:bg-white flex gap-4 items-center shadow-[4px_4px_0_rgba(62,39,35,0.03)] hover:shadow-[7px_7px_0_rgba(62,39,35,0.18)] hover:-translate-y-1 hover:-translate-x-0.5"
                    style={{
                      // Slight positional staggers representing orbit positions
                      transform: isHovered ? `translateX(-4px) scale(1.02)` : `translateX(${idx * 10}px)`
                    }}
                  >
                    {/* Tiny color signal node */}
                    <div 
                      className="w-1.5 h-12 shrink-0 transition-all duration-500"
                      style={{ backgroundColor: orbSpecs.primary }}
                    />

                    <div className="flex-grow min-w-0 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-center text-[7px] font-mono text-stone-400 font-bold mb-1">
                        <span className="uppercase">{exh.status}</span>
                        <span>POS_0{idx + 1}</span>
                      </div>

                      <h4 className="font-space font-black uppercase text-xs text-[var(--museum-ink)] leading-none transition-colors duration-300 group-hover:text-amber-600 mb-1.5">
                        {exh.title}
                      </h4>

                      {/* Expandable description on hover representing depth */}
                      <p className="font-sans text-[11px] leading-tight text-stone-500 transition-all duration-300 block truncate group-hover:text-stone-700">
                        {exh.summary}
                      </p>
                    </div>

                    {/* Micro abstract motif inside card */}
                    <div className="w-11 h-11 shrink-0 border border-stone-100 bg-[#faf8f5] flex items-center justify-center relative overflow-hidden select-none">
                      {renderInteractiveCore(exh.id, orbSpecs.primary)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick action HUD selector overlay */}
            <div className="mt-3">
              <span className="text-[7.5px] font-mono font-black tracking-widest text-stone-400 uppercase block mb-1">
                EXHIBITION_EVIDENCE_PROMPT
              </span>
              <div className="bg-[#faf8f5] border border-[var(--museum-ink)]/10 p-3.5 select-none relative overflow-hidden">
                <div className="font-mono text-[9.5px] leading-relaxed text-stone-600 font-bold">
                  “{activeExhibit.proofSignal}”
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================================
            Atmospheric Base Curator Action Trigger Block
           ========================================================================================= */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-[var(--museum-ink)]/10 pt-10 gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d97706] font-extrabold flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> CURATOR SUMMARY STATEMENT
            </span>
            <p className="font-sans text-[14.5px] font-bold text-gray-800 leading-relaxed italic">
              “{activeExhibit.summary} This exhibit serves as high-fidelity evidence of technical rigor and visual design execution.”
            </p>
          </div>

          <button
            onClick={() => scrollToSection(activeExhibit.sectionId)}
            className="w-full md:w-auto py-4 px-8 bg-[var(--museum-ink)] text-white hover:bg-[#faf8f5] hover:text-[var(--museum-ink)] border-2 border-[var(--museum-ink)] font-mono text-[10px] uppercase font-black tracking-[0.25em] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative z-20 shadow-[6px_6px_0_rgba(62,39,35,0.7)]"
            style={{
              boxShadow: `5px 5px 0 ${specs.primary}`
            }}
          >
            Enter Exhibit Corridor
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
