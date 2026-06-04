import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  MonitorSmartphone, Server, Cpu, Box, Database, Settings, Sparkles, Disc, TerminalSquare,
  Search, Copy, CheckCircle2, ChevronRight, X, Code2, Layers, MousePointer2, Check, LayoutTemplate, Workflow, ArrowRight
} from "lucide-react";

// --- DATA & CONSTANTS ---
const DOMAINS = [
  { id: 'frontend', label: 'Frontend', icon: MonitorSmartphone, count: 11 },
  { id: 'backend', label: 'Backend', icon: Server, count: 9 },
  { id: 'ai', label: 'AI Systems', icon: Cpu, count: 9 },
  { id: 'web3', label: 'Web3', icon: Box, count: 9 },
  { id: 'database', label: 'Database', icon: Database, count: 9 },
  { id: 'devops', label: 'DevOps', icon: Settings, count: 8 },
  { id: 'design', label: 'Design System', icon: Sparkles, count: 9 },
  { id: 'creative', label: 'Creative Coding', icon: Disc, count: 7 },
  { id: 'tooling', label: 'Tooling', icon: TerminalSquare, count: 9 },
];

const REACTOR_NODES = [
  { id: "component", label: "Component Architecture", keywords: ["sections", "primitives", "reusable layouts"], pipeline: "Components", angle: -90 },
  { id: "state", label: "State Management", keywords: ["filters", "selected state", "drawer logic"], pipeline: "State", angle: -45 },
  { id: "responsive", label: "Responsive Layout", keywords: ["12-col grid", "tablet", "mobile"], pipeline: "Layout", angle: 0 },
  { id: "motion", label: "Motion Layer", keywords: ["hover", "transition", "feedback"], pipeline: "Motion", angle: 45 },
  { id: "tokens", label: "Design Tokens", keywords: ["warm canvas", "rainbow accents", "variants"], pipeline: "Layout", angle: 90 },
  { id: "data", label: "Data Rendering", keywords: ["map", "filter", "dynamic modules"], pipeline: "Data", angle: 135 },
  { id: "a11y", label: "Accessibility", keywords: ["focus", "buttons", "aria states"], pipeline: "Components", angle: 180 },
  { id: "deploy", label: "Shipping Flow", keywords: ["GitHub", "Vercel", "preview deploy"], pipeline: "Ship", angle: -135 }
];

const PIPELINE_STEPS = ["Data", "Components", "State", "Layout", "Motion", "Ship"];

const INSPECTOR_DATA: Record<string, { concept: string, proves: string, codeHint: string, related: string[] }> = {
  default: {
    concept: "Frontend Engineering",
    proves: "Building advanced interactive interfaces, data-driven modules, and production-ready architectures.",
    codeHint: "<CapabilityForge />",
    related: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  component: {
    concept: "Component Architecture",
    proves: "Reusable sections, card primitives, layout composition, and scalable homepage architecture.",
    codeHint: "sections.map(section => <MuseumSection key={section.id} {...section} />)",
    related: ["React", "TypeScript", "Tailwind CSS", "Vite"]
  },
  state: {
    concept: "Stateful UI Logic",
    proves: "Selected states, filters, drawers, search queries, copy feedback, and active UI transitions.",
    codeHint: "const [selectedTool, setSelectedTool] = useState(null)",
    related: ["React", "Zustand", "React Query"]
  },
  responsive: {
    concept: "Responsive Layout",
    proves: "Adaptive sizing, 12-column grids, mobile stacking, and dense desktop canvases.",
    codeHint: "grid-template-columns: repeat(12, minmax(0, 1fr))",
    related: ["Tailwind CSS", "CSS Grid", "Flexbox"]
  },
  motion: {
    concept: "Motion Layer",
    proves: "Hover feedback, route transitions, drawer animations, and reduced-motion states.",
    codeHint: "whileHover={{ y: -4, scale: 1.01 }}",
    related: ["Framer Motion", "React Spring"]
  },
  tokens: {
    concept: "Design Tokens",
    proves: "Consistent warm canvas colors, rainbow accents, section tones, and typography clamping.",
    codeHint: "style={{ '--reactor-accent': selectedToken.value }}",
    related: ["CSS Variables", "Tailwind Theme", "Figma"]
  },
  data: {
    concept: "Data Rendering",
    proves: "Mapping arrays, dynamic filtering, structured content models, and reusable array mapping.",
    codeHint: "filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)",
    related: ["Lodash", "TypeScript", "Array methods"]
  },
  a11y: {
    concept: "Accessibility",
    proves: "Keyboard navigation, focus rings, semantic HTML structure, and screen reader announcements.",
    codeHint: "aria-selected={isActive} role=\"button\"",
    related: ["Radix UI", "Aria attributes", "HTML5"]
  },
  deploy: {
    concept: "Shipping Flow",
    proves: "Production readiness, zero-downtime previews, automated validations, and global edge deployments.",
    codeHint: "git push origin main && vercel build",
    related: ["Vercel", "GitHub Actions", "Docker"]
  }
};

const ARSENAL_GROUPS = [
  { category: "Programming", tools: ["TypeScript", "JavaScript", "Python", "SQL", "Solidity", "Bash", "HTML", "CSS"] },
  { category: "Frontend", tools: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Zustand", "React Query", "React Router", "Accessibility", "Responsive UI", "Component Architecture"] },
  { category: "Backend", tools: ["Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "PostgreSQL", "MongoDB", "Prisma", "Supabase"] },
  { category: "AI Systems", tools: ["OpenAI API", "Prompt Engineering", "Tool Calling", "Embeddings", "RAG Concepts", "Agent Workflow", "AI Studio", "LLM UI Patterns", "AI Prototyping"] },
  { category: "Web3", tools: ["Solidity", "Ethers.js", "Wagmi", "RainbowKit", "Hardhat", "Foundry", "Wallet UX", "Contract Interaction", "On-chain Identity"] },
  { category: "Database", tools: ["PostgreSQL", "MongoDB", "Supabase", "Prisma", "SQL", "Schema Design", "Data Modeling", "Indexing", "Persistence Layer"] },
  { category: "DevOps", tools: ["Vercel", "Docker", "GitHub Actions", "CI/CD", "Preview Deployments", "Environment Variables", "Build Pipelines", "Deployment Workflow"] },
  { category: "Design System", tools: ["Figma", "Typography", "Layout Systems", "Color Tokens", "Component Variants", "Interaction States", "Motion Language", "Visual Hierarchy", "Responsive Rhythm"] },
  { category: "Creative Coding", tools: ["Three.js", "GSAP", "Canvas", "Spatial UI", "Interactive Storytelling", "Generative Layouts", "Media Archives"] },
  { category: "Tooling", tools: ["Git", "GitHub", "pnpm", "npm", "ESLint", "Prettier", "VS Code", "Chrome DevTools", "Markdown"] }
];

function getToolDetails(name: string, category: string) {
  if (name === "React") {
    return {
      name: "React",
      category: "Frontend",
      role: "Primary UI framework",
      whyIUseIt: "To build modular sections, interactive systems, reusable interface architecture, and data-driven UI modules.",
      relatedTools: ["TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "Vite"],
      usedIn: "Used in Rocky Homepage V3, Hero Entrance Console, Project Laboratory, and Capability Forge.",
      learningFocus: "Cleaner component boundaries, reusable primitives, and stronger state organization.",
      nextStep: "Refactor repeated cards, badges, and layout sections into reusable design-system components."
    };
  }
  return {
    name,
    category,
    role: `Core ${category} Tool`,
    whyIUseIt: `Provides foundational capability for my ${category.toLowerCase()} workflow, structuring domain-specific tasks and scaling outputs reliably.`,
    relatedTools: [],
    usedIn: "Various production apps, core workflow setups, and generative engineering experiments.",
    learningFocus: "Deeper architectural integration and exploring advanced performance optimizations.",
    nextStep: "Adopt the latest stable patterns and integrate into upcoming module iterations."
  };
}

// --- SUBCOMPONENTS ---

const CodeInspector = ({ activeNodeId }: { activeNodeId: string }) => {
   const data = INSPECTOR_DATA[activeNodeId] || INSPECTOR_DATA.default;
   
   return (
     <AnimatePresence mode="wait">
       <motion.div 
          key={data.concept}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#1E1E1E] rounded-xl flex flex-col shadow-xl border border-[var(--reactor-accent)]/20 overflow-hidden h-full text-white font-mono relative"
       >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#2A2A2A] border-b border-black/30 text-[10px] text-zinc-400 font-bold tracking-widest relative">
             <div className="flex gap-1.5 absolute left-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
             </div>
             <span className="mx-auto uppercase text-[var(--reactor-accent)]">{data.concept}</span>
          </div>
          
          <div className="p-5 flex flex-col gap-6 flex-1 overflow-y-auto hide-scrollbar text-sm">
             <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#888] mb-2">// What it proves</h4>
                <p className="text-[#D4D4D4] leading-relaxed select-text">{data.proves}</p>
             </div>
             
             <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#888] mb-2">// Code hint</h4>
                <div className="bg-black/40 p-3 rounded-lg border border-[#333] font-mono text-[11px] text-[#9CDCFE] overflow-x-auto select-text shadow-inner">
                   <code>{data.codeHint}</code>
                </div>
             </div>
             
             {data.related.length > 0 && (
                <div className="mt-auto pt-4">
                   <h4 className="text-[10px] uppercase tracking-widest text-[#888] mb-2">// Related tools</h4>
                   <div className="flex flex-wrap gap-2">
                     {data.related.map(t => (
                        <span key={t} className="bg-[#2D2D2D] text-[#CE9178] px-2 py-1 rounded-[4px] text-[10px] shadow-sm select-text border border-[#444]">{t}</span>
                     ))}
                   </div>
                </div>
             )}
          </div>
       </motion.div>
     </AnimatePresence>
   );
};

// Demos
const StateMachineDemo = ({ accent }: { accent: string }) => {
  const states = ['idle', 'selected', 'filtering', 'drawerOpen', 'copied'];
  const [idx, setIdx] = useState(0);
  
  return (
    <div className="bg-white border border-[var(--border)] hover:border-[var(--reactor-accent)] transition-colors rounded-xl p-6 shadow-sm flex flex-col group relative overflow-hidden">
       <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h4 className="font-space font-bold text-sm text-[var(--ink)]">State Machine</h4>
            <p className="font-mono text-[10px] text-[var(--ink-muted)]">Interactive state progression</p>
          </div>
          <button onClick={() => setIdx(v => (v + 1) % states.length)} className="w-8 h-8 rounded-full border border-[var(--reactor-accent)] text-[var(--reactor-accent)] hover:bg-[var(--reactor-accent)] hover:text-white transition-colors flex items-center justify-center outline-none focus-visible:ring-2 ring-offset-1 focus-visible:ring-[var(--reactor-accent)]">
             <ChevronRight className="w-4 h-4" />
          </button>
       </div>
       
       <div className="flex-1 flex flex-col gap-3 relative z-10 w-full">
          {states.map((s, i) => (
             <div key={s} className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full border transition-all duration-300", i === idx ? "border-[var(--reactor-accent)] bg-[var(--reactor-accent)] scale-110 shadow-[0_0_8px_var(--reactor-accent)]" : i < idx ? "border-[var(--reactor-accent)] bg-[var(--reactor-accent)]/20" : "border-[var(--border)] bg-[var(--hall-soft)]")} />
                <span className={cn("font-mono text-xs font-bold transition-colors duration-300", i === idx ? "text-[var(--ink)]" : "text-[var(--ink-muted)]")}>{s}</span>
             </div>
          ))}
       </div>
       <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--reactor-accent)]/5 rounded-full blur-2xl pointer-events-none transition-colors" />
    </div>
  )
};

const ResponsiveGridDemo = () => {
  const [vp, setVp] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  return (
    <div className="bg-white border border-[var(--border)] hover:border-[var(--reactor-accent)] transition-colors rounded-xl p-6 shadow-sm flex flex-col">
       <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-space font-bold text-sm text-[var(--ink)]">Responsive Grid</h4>
            <p className="font-mono text-[10px] text-[var(--ink-muted)]">Adaptive layout simulation</p>
          </div>
       </div>
       
       <div className="flex bg-[var(--hall-soft)] p-0.5 rounded-lg border border-[var(--border)] w-fit mb-6">
          {['desktop', 'tablet', 'mobile'].map(b => (
            <button 
              key={b} onClick={() => setVp(b as any)}
              className={cn("px-3 py-1.5 text-[10px] font-mono uppercase font-bold rounded-md shadow-sm transition-all focus-visible:ring-2 outline-none focus-visible:ring-[var(--reactor-accent)]", vp === b ? "bg-[var(--reactor-accent)] text-white" : "bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] shadow-none")}
            >
              {b}
            </button>
          ))}
       </div>
       
       <div className="flex-1 bg-[var(--hall-soft)] border border-[var(--border)] rounded-md p-3 flex flex-col items-center overflow-hidden w-full relative">
          <motion.div 
             layout
             className={cn("bg-white border border-[var(--border)] shadow-sm rounded p-1.5 gap-1.5 transition-all duration-500 overflow-hidden flex", vp === 'desktop' ? "w-full grid grid-cols-4 h-24 content-start" : vp === 'tablet' ? "w-2/3 grid grid-cols-2 h-28 content-start" : "w-1/3 flex-col h-32 content-start")}
          >
             {[1,2,3,4].map(id => (
                <motion.div layout key={id} className={cn("bg-[var(--reactor-accent)]/20 rounded shadow-inner", vp === 'desktop' ? "h-6 w-full" : vp === 'tablet' ? "h-6 w-full" : "h-4 shrink-0 w-full")} />
             ))}
             <motion.div layout className={cn("bg-[var(--hall-soft)] rounded shadow-inner w-full", vp === 'desktop' ? "col-span-4 h-12" : vp === 'tablet' ? "col-span-2 h-12" : "h-12")} />
          </motion.div>
       </div>
    </div>
  )
};

const DesignTokenDemo = ({ accent, setAccent }: { accent: string, setAccent: (v: string) => void }) => {
  const tokens = [
    { id: 'orange', val: '#FF7B00' },
    { id: 'pink', val: '#FF006E' },
    { id: 'purple', val: '#9D4EDD' },
    { id: 'cyan', val: '#00B4D8' },
    { id: 'blue', val: '#0077B6' }
  ];
  return (
    <div className="bg-white border border-[var(--border)] hover:border-[var(--reactor-accent)] transition-colors rounded-xl p-6 shadow-sm flex flex-col">
       <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-space font-bold text-sm text-[var(--ink)]">Design Tokens</h4>
            <p className="font-mono text-[10px] text-[var(--ink-muted)]">Live CSS variable injection</p>
          </div>
       </div>
       
       <div className="flex-1 flex flex-col justify-center items-center gap-6">
          <div className="flex gap-3 bg-[var(--hall-soft)] p-2.5 rounded-full border border-[var(--border)] shadow-inner">
             {tokens.map(t => (
               <button 
                 key={t.id}
                 onClick={() => setAccent(t.val)}
                 style={{ backgroundColor: t.val }}
                 aria-label={`Select ${t.id} accent`}
                 className={cn("w-6 h-6 rounded-full shadow-sm transition-transform hover:scale-110 focus-visible:ring-2 ring-offset-2 ring-[var(--ink)] outline-none relative", accent === t.val && "scale-110")}
               >
                 {accent === t.val && (
                    <motion.div layoutId="tokenGlow" className="absolute inset-0 rounded-full bg-white blur-sm opacity-50 pointer-events-none" />
                 )}
               </button>
             ))}
          </div>
          
          <div className="flex items-center justify-center p-4 rounded-xl shadow-[0_0_15px_var(--reactor-accent)]/20 transition-all font-mono text-[10px] font-bold text-white uppercase tracking-widest relative overflow-hidden" style={{ backgroundColor: accent }}>
             <span className="relative z-10 text-shadow-sm">--reactor-accent</span>
             <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-20 transform skew-x-12" />
          </div>
       </div>
    </div>
  )
};

export function CoreCapabilitiesModule() {
  const [selectedDomain, setSelectedDomain] = useState('frontend');
  const [selectedNode, setSelectedNode] = useState('default');
  const [activePipelineStep, setActivePipelineStep] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedStack, setCopiedStack] = useState(false);
  const [selectedToolData, setSelectedToolData] = useState<any>(null);
  const [selectedAccent, setSelectedAccent] = useState('#FF7B00');

  const filteredGroups = useMemo(() => {
    return ARSENAL_GROUPS.map(group => ({
      ...group,
      tools: group.tools.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(g => g.tools.length > 0);
  }, [searchQuery]);

  const handleCopy = () => {
    navigator.clipboard.writeText("React, Next.js, Node.js, TypeScript, Tailwind CSS, System Prompting, Framer Motion, Zustand");
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedToolData(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const themeStyle = { '--reactor-accent': selectedAccent } as React.CSSProperties;

  return (
    <div className="w-[min(94vw,1760px)] mx-auto flex flex-col gap-12 relative z-10 py-16" style={themeStyle}>
       
      {/* 1. FORGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-8 hover:border-[var(--reactor-accent)]/30 transition-colors">
         <div className="max-w-4xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--reactor-accent)] flex items-center gap-2 mb-3">
               Hall 02 <span className="w-4 h-px bg-[var(--reactor-accent)] opacity-50" /> Capability System
            </span>
            <h1 className="text-4xl md:text-5xl font-space font-bold tracking-tight text-[var(--ink)] mb-4">
               Capability Forge
            </h1>
            <p className="text-[var(--ink-soft)] font-medium text-lg leading-relaxed max-w-3xl">
               An interactive frontend reactor showing the systems, tools, motion layers, state logic, and production stack I use to build modern interfaces.
            </p>
         </div>
         <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0">
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-muted)]" />
               <input 
                 type="text" 
                 placeholder="Search stack arsenal..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[var(--border)] rounded-lg outline-none focus:border-[var(--reactor-accent)] focus:ring-1 focus:ring-[var(--reactor-accent)] transition-all font-mono placeholder:text-[var(--ink-muted)] text-[var(--ink)] shadow-sm"
               />
            </div>
            <button 
               onClick={handleCopy}
               className="shrink-0 flex items-center justify-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink)] bg-white hover:bg-[var(--reactor-accent)] hover:text-white border-[var(--border)] hover:border-[var(--reactor-accent)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--reactor-accent)] rounded-lg px-6 py-2.5 transition-all shadow-sm"
             >
               {copiedStack ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
               {copiedStack ? "Copied!" : "Copy Stack"}
             </button>
         </div>
      </div>

      {/* 2. REACTOR CONSOLE (12 cols) */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch min-h-[560px]">
         
         {/* Left: Domain Rail (2 cols) */}
         <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2 font-mono overflow-x-auto hide-scrollbar pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0">
            {DOMAINS.map(domain => {
               const isActive = selectedDomain === domain.id;
               return (
                  <button 
                     key={domain.id}
                     onClick={() => { setSelectedDomain(domain.id); setSelectedNode('default'); }}
                     aria-selected={isActive}
                     className={cn("flex items-center justify-between px-3.5 py-3.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest outline-none transition-all relative overflow-hidden group shrink-0 min-w-[160px] lg:min-w-0 focus-visible:ring-2 focus-visible:ring-[var(--reactor-accent)]", isActive ? "bg-white border-[var(--reactor-accent)] text-[var(--reactor-accent)] shadow-sm" : "bg-white/40 border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink-soft)] hover:border-[var(--reactor-accent)]/50 hover:bg-white")}
                  >
                     {isActive && (
                        <motion.div layoutId="domainGlow" className="absolute top-0 left-0 w-1 h-full bg-[var(--reactor-accent)] shadow-[0_0_10px_var(--reactor-accent)]" />
                     )}
                     <div className="flex items-center gap-2.5 relative z-10 transition-colors">
                        <domain.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-[var(--reactor-accent)]" : "opacity-60")} />
                        {domain.label}
                     </div>
                     <span className={cn("text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold relative z-10 transition-colors", isActive ? "bg-[var(--reactor-accent)]/10 text-[var(--reactor-accent)]" : "bg-[var(--hall-soft)] text-[var(--ink-muted)] group-hover:text-[var(--ink)]")}>
                        {domain.count}
                     </span>
                  </button>
               )
            })}
         </div>

         {/* Center: Reactor Canvas (7 cols) */}
         <div className="lg:col-span-7 bg-[#FAFAFA] border border-[var(--border)] rounded-2xl relative shadow-inner overflow-hidden flex flex-col group">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)', backgroundSize: '32px 32px', backgroundPosition: 'center center' }}
            />
            {/* Center radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--reactor-accent)]/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex-1 relative z-10 p-8 flex items-center justify-center overflow-hidden min-h-[440px]">
               {selectedDomain === 'frontend' ? (
                  <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center scale-90 sm:scale-100">
                     
                     {/* SVG Connection Lines */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                           <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
                               <feGaussianBlur stdDeviation="3" result="blurLine" />
                               <feComposite in="SourceGraphic" in2="blurLine" operator="over" />
                           </filter>
                        </defs>
                        {REACTOR_NODES.map((node) => {
                           const radius = 42; 
                           const rad = (node.angle * Math.PI) / 180;
                           const x2 = 50 + radius * Math.cos(rad);
                           const y2 = 50 + radius * Math.sin(rad);
                           
                           const isHoveredPipeline = activePipelineStep === node.pipeline;
                           const isActive = selectedNode === node.id || isHoveredPipeline;
                           
                           return (
                             <line 
                               key={`line-${node.id}`}
                               x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`} 
                               stroke={isActive ? 'var(--reactor-accent)' : 'var(--ink)'} 
                               strokeWidth={isActive ? "2" : "1"} 
                               strokeOpacity={isActive ? "0.8" : "0.15"} 
                               className="transition-all duration-300"
                               filter={isActive ? 'url(#glowLine)' : ''}
                             />
                           )
                        })}
                        {/* Inner technical rings */}
                        <circle cx="50%" cy="50%" r="20%" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.05" />
                        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.05" />
                     </svg>
                     
                     {/* Center Core */}
                     <button
                        onClick={() => setSelectedNode('default')}
                        aria-selected={selectedNode === 'default'}
                        className="absolute z-20 w-[130px] h-[130px] rounded-full bg-white border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center p-4 outline-none focus-visible:ring-2 ring-[var(--reactor-accent)] transition-transform hover:scale-105 group/core"
                     >
                        <div className="absolute inset-2 border border-[var(--reactor-accent)]/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderStyle: 'dashed' }} />
                        <span className="font-space font-bold text-center text-[10px] leading-tight text-[var(--ink)] group-hover/core:text-[var(--reactor-accent)] transition-colors">FRONTEND<br/>ENGINEERING</span>
                     </button>
                     
                     {/* Orbiting Nodes */}
                     {REACTOR_NODES.map((node) => {
                        const radiusX = 42;
                        const radiusY = 42;
                        const rad = (node.angle * Math.PI) / 180;
                        const x = 50 + radiusX * Math.cos(rad);
                        const y = 50 + radiusY * Math.sin(rad);
                        
                        const isHoveredPipeline = activePipelineStep === node.pipeline;
                        const isActive = selectedNode === node.id || isHoveredPipeline;

                        // Align text based on position
                        const isRight = x > 50;
                        const isLeft = x < 50;
                        const align = isLeft ? 'items-end text-right' : isRight ? 'items-start text-left' : 'items-center text-center';
                        
                        let translate = '';
                        if (isLeft) translate = '-translate-x-[calc(100%+16px)]';
                        else if (isRight) translate = 'translate-x-[16px]';
                        else translate = '-translate-y-[calc(100%+16px)]';
                        if (node.angle === 90) translate = 'translate-y-[16px]';
                        
                        return (
                           <div 
                              key={node.id}
                              className="absolute z-30 flex flex-col justify-center transition-all duration-300"
                              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                           >
                              {/* The connector dot */}
                              <button 
                                 onClick={() => setSelectedNode(node.id)}
                                 aria-selected={isActive}
                                 className={cn("w-4 h-4 rounded-full border-2 outline-none transition-all focus-visible:ring-2 ring-[var(--reactor-accent)] ring-offset-2", isActive ? "bg-[var(--reactor-accent)] border-white shadow-[0_0_12px_var(--reactor-accent)] scale-125" : "bg-white border-[var(--border)] hover:border-[var(--reactor-accent)] hover:scale-110")}
                              />
                              
                              {/* The label panel */}
                              <div className={cn("absolute top-1/2 -translate-y-1/2 flex flex-col pointer-events-none transition-all duration-300 w-max max-w-[140px]", align, translate, isActive ? "opacity-100 scale-100" : "opacity-60 scale-95 hover:opacity-100 hover:scale-100")}>
                                 <span className={cn("font-mono text-[9px] font-bold uppercase tracking-widest mb-1 shadow-sm px-2 py-0.5 rounded transition-colors whitespace-nowrap", isActive ? "bg-[var(--reactor-accent)] text-white" : "bg-white border border-[var(--border)] text-[var(--ink)] group-hover:bg-gray-50")}>
                                    {node.label}
                                 </span>
                                 <span className={cn("text-[8px] font-mono text-[var(--ink-muted)] bg-white/80 backdrop-blur border border-[var(--border)] px-1.5 py-0.5 rounded shadow-sm", isLeft || isRight ? "" : "text-center")}>
                                    {node.keywords.join(' · ')}
                                 </span>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center font-mono text-[var(--ink-muted)] opacity-50 select-none">
                     <Settings className="w-10 h-10 mb-4 opacity-50 animate-spin-slow" />
                     <p className="text-xs font-bold uppercase tracking-widest text-center">Reactor Data Pending<br/>Switch to Frontend</p>
                  </div>
               )}
            </div>
            
            {/* Pipeline Dock */}
            <div className="border-t border-[var(--border)] bg-white/60 backdrop-blur-md p-3 relative z-20 flex justify-center w-full">
               <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-2">
                  {PIPELINE_STEPS.map((step, idx) => {
                     const isHovered = activePipelineStep === step;
                     return (
                        <React.Fragment key={step}>
                           <button 
                              onMouseEnter={() => setActivePipelineStep(step)}
                              onMouseLeave={() => setActivePipelineStep(null)}
                              className={cn("px-3 py-1.5 sm:px-4 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest transition-all outline-none focus-visible:ring-2 ring-[var(--reactor-accent)]", isHovered ? "bg-[var(--reactor-accent)] text-white shadow-md scale-105" : "bg-white text-[var(--ink)] border border-[var(--border)] hover:border-[var(--reactor-accent)]/50 shadow-sm")}
                           >
                              {step}
                           </button>
                           {idx < PIPELINE_STEPS.length - 1 && (
                              <ArrowRight className={cn("w-3 h-3 transition-colors", activePipelineStep ? "text-[var(--reactor-accent)] opacity-80" : "text-[var(--ink-muted)] opacity-50")} />
                           )}
                        </React.Fragment>
                     )
                  })}
               </div>
            </div>
         </div>

         {/* Right: Code Inspector (3 cols) */}
         <div className="lg:col-span-3">
             <CodeInspector activeNodeId={selectedNode} />
         </div>

      </div>

      {/* 3. STACK ARSENAL */}
      <div className="mt-8 border-t border-[var(--border)] pt-12">
        <div className="mb-10 flex flex-col gap-3 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-space font-bold tracking-tight text-[var(--ink)]">
              Stack Arsenal
            </h3>
            <p className="text-[var(--ink-soft)] font-medium text-sm leading-relaxed">
              A curated array of the languages, frameworks, and infrastructure tools I use to orchestrate robust architectures, rich interfaces, and scalable deployments.
            </p>
        </div>
        
        <div className="flex flex-col gap-6 relative z-10 w-full mb-8">
           {filteredGroups.length === 0 ? (
             <div className="py-12 flex flex-col items-center justify-center gap-4 text-center border border-[var(--border)] rounded-2xl bg-[var(--hall-soft)]">
               <Search className="w-8 h-8 text-[var(--ink-muted)]" />
               <p className="text-sm font-mono text-[var(--ink)] font-bold">No technical tools match "{searchQuery}"</p>
               <button onClick={() => setSearchQuery("")} className="text-[10px] uppercase tracking-widest font-mono font-bold text-[var(--reactor-accent)] hover:underline outline-none p-2 focus-visible:ring-2 rounded">Clear filters</button>
             </div>
           ) : (
             filteredGroups.map((group, index) => (
               <div key={index} className="group/row flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start py-4 border-b border-[var(--border)] last:border-b-0 hover:bg-white/40 transition-colors -mx-4 px-4 rounded-xl">
                  <div className="lg:w-[200px] shrink-0 flex items-center lg:items-start lg:pt-2 gap-3">
                     <div className="w-1.5 h-1.5 bg-[var(--reactor-accent)] rounded-full opacity-30 group-hover/row:opacity-100 transition-opacity" />
                     <h4 className="text-[11px] uppercase font-mono font-bold text-[var(--ink)] tracking-widest group-hover/row:text-[var(--reactor-accent)] transition-colors">
                        {group.category}
                     </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 flex-1">
                     {group.tools.map((toolName, j) => {
                        const toolData = getToolDetails(toolName, group.category);
                        return (
                           <button 
                              key={j}
                              onClick={() => setSelectedToolData(toolData)}
                              className="bg-white border border-[var(--border)] hover:border-[var(--reactor-accent)] hover:text-[var(--reactor-accent)] px-3.5 py-1.5 rounded-lg shadow-sm text-[11px] font-bold font-sans text-[var(--ink-soft)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--reactor-accent)] hover:-translate-y-0.5"
                           >
                              {toolName}
                           </button>
                        )
                     })}
                  </div>
               </div>
             ))
           )}
        </div>
      </div>

      {/* 4. LIVE ENGINEERING DEMOS */}
      <div className="pt-12 mt-4 border-t border-[var(--border)]">
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-space font-bold tracking-tight text-[var(--ink)] mb-3">
            Live Engineering Demos
          </h3>
          <p className="text-[var(--ink-soft)] font-medium text-sm">
            Compact visual proofs of custom interactive states, robust grid adaptations, and real-time design tokens.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StateMachineDemo accent={selectedAccent} />
           <ResponsiveGridDemo />
           <DesignTokenDemo accent={selectedAccent} setAccent={setSelectedAccent} />
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selectedToolData && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-md z-[100]"
              onClick={() => setSelectedToolData(null)}
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100dvh] w-[min(100vw,480px)] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] border-l border-[var(--border)] z-[110] flex flex-col overflow-y-auto"
              style={themeStyle}
              role="dialog"
              aria-modal="true"
              aria-expanded="true"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[var(--border)] p-6 flex items-center justify-between z-10 shadow-sm">
                <div className="flex flex-col gap-1.5">
                   <h3 className="text-2xl font-space font-bold text-[var(--ink)] tracking-tight">{selectedToolData.name}</h3>
                   <span className="bg-[var(--reactor-accent)]/10 text-[var(--reactor-accent)] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md w-fit border border-[var(--reactor-accent)]/20">{selectedToolData.category}</span>
                </div>
                <button 
                  onClick={() => setSelectedToolData(null)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[var(--reactor-accent)] border border-[var(--border)] hover:border-[var(--reactor-accent)] flex items-center justify-center text-[var(--ink-muted)] hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--reactor-accent)] shadow-sm"
                  aria-label="Close detail view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-8 pb-12">
                 <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[var(--reactor-accent)]" /> Role
                    </h4>
                    <p className="text-base font-medium text-[var(--ink)]">{selectedToolData.role}</p>
                 </div>

                 <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--reactor-accent)]" /> Why I use it
                    </h4>
                    <p className="text-sm leading-relaxed font-medium text-[var(--ink-soft)] bg-[var(--hall-soft)] p-5 rounded-xl border border-[var(--border)] relative overflow-hidden shadow-sm">
                       <span className="absolute top-0 left-0 w-1 h-full bg-[var(--reactor-accent)]" />
                       {selectedToolData.whyIUseIt}
                    </p>
                 </div>

                 {selectedToolData.relatedTools.length > 0 && (
                   <div className="flex flex-col gap-3">
                      <h4 className="font-mono text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-2">
                        <Workflow className="w-3.5 h-3.5 text-[var(--reactor-accent)]" /> Related Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedToolData.relatedTools.map((t: string, idx: number) => (
                            <span key={idx} className="bg-white border border-[var(--border)] text-xs font-bold text-[var(--ink)] px-3.5 py-1.5 rounded-lg shadow-sm hover:border-[var(--reactor-accent)] hover:text-[var(--reactor-accent)] cursor-default transition-colors">
                               {t}
                            </span>
                         ))}
                      </div>
                   </div>
                 )}

                 <div className="h-px bg-[var(--border)] w-full w-[80%] mx-auto my-2" />

                 <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-2">
                      <LayoutTemplate className="w-3.5 h-3.5 opacity-60" /> Project Proof
                    </h4>
                    <p className="text-sm leading-relaxed font-medium text-[var(--ink)]">
                       {selectedToolData.usedIn}
                    </p>
                 </div>

                 <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 opacity-60" /> Current Learning Focus
                    </h4>
                    <p className="text-sm leading-relaxed font-medium text-[var(--ink-soft)]">
                       {selectedToolData.learningFocus}
                    </p>
                 </div>

                 <div className="flex flex-col gap-3 bg-[var(--reactor-accent)]/5 border border-[var(--reactor-accent)]/20 p-5 rounded-xl mt-2 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[var(--reactor-accent)]/10 rounded-full blur-xl pointer-events-none" />
                    <h4 className="font-mono text-[10px] font-bold text-[var(--reactor-accent)] uppercase tracking-widest flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> Next Technical Step
                    </h4>
                    <p className="text-sm leading-relaxed font-bold text-[var(--ink)]">
                       {selectedToolData.nextStep}
                    </p>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
