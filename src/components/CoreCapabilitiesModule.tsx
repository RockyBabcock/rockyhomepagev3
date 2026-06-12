import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  MonitorSmartphone, Server, Cpu, Box, Database, Settings, Sparkles, Disc, TerminalSquare,
  Search, Copy, CheckCircle2, ChevronRight, Speaker, Fingerprint, Braces, Maximize,
  Activity, ArrowRight, GitMerge, LayoutGrid, FileText
} from "lucide-react";
import { techStackData, categoryColors, TechItem, levelColors } from "../data/techStack";

const iconMap: Record<string, any> = {
  frontend: MonitorSmartphone,
  backend: Server,
  devops: Settings,
  design: Sparkles,
  ai: Cpu,
  web3: Box,
  creative: Disc,
  audio: Speaker,
  hardware: Fingerprint,
  language: Braces,
  spatial: Maximize,
  tooling: TerminalSquare
};

export function CoreCapabilitiesModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"Reactor" | "Grid" | "Evidence">("Reactor");

  const domains = useMemo(() => {
    const cats = new Set(techStackData.map(t => t.category));
    return Array.from(cats).map(c => ({
      id: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
      count: techStackData.filter(t => t.category === c).length,
      color: categoryColors[c]?.pri || "#555",
      icon: iconMap[c] || Database
    }));
  }, []);

  const [selectedDomain, setSelectedDomain] = useState<string>(domains[0]?.id || "frontend");

  const filteredTechs = useMemo(() => {
    if (!searchQuery.trim()) return techStackData;
    const q = searchQuery.toLowerCase();
    return techStackData.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.evidence.some(e => e.toLowerCase().includes(q)) ||
      t.usedIn.some(u => u.toLowerCase().includes(q)) ||
      (t.learningFocus && t.learningFocus.toLowerCase().includes(q)) ||
      (t.nextStep && t.nextStep.toLowerCase().includes(q)) ||
      (t.relatedTools && t.relatedTools.some(r => r.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  const displayedTechs = searchQuery.trim() 
    ? filteredTechs 
    : techStackData.filter(t => t.category === selectedDomain);

  const [selectedTechId, setSelectedTechId] = useState<string | null>(displayedTechs[0]?.id || null);

  // If domain changes and no search, auto-select first tool
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      const tools = techStackData.filter(t => t.category === selectedDomain);
      if (tools.length > 0 && !tools.find(t => t.id === selectedTechId)) {
        setSelectedTechId(tools[0].id);
      }
    }
  }, [selectedDomain, selectedTechId, searchQuery]);

  // Handle case where displayedTechs changes (e.g. via search) and selectedTech is lost
  React.useEffect(() => {
    if (displayedTechs.length > 0 && !displayedTechs.find(t => t.id === selectedTechId)) {
      setSelectedTechId(displayedTechs[0].id);
    }
  }, [displayedTechs, selectedTechId]);


  const activeDomainData = domains.find(d => d.id === selectedDomain) || domains[0];
  const accentColor = activeDomainData?.color || "#555";
  const selectedTech = displayedTechs.find(t => t.id === selectedTechId) || displayedTechs[0] || techStackData[0];

  const totalTools = techStackData.length;
  const totalDomains = domains.length;

  return (
    <div className="w-[min(94vw,1760px)] mx-auto flex flex-col gap-8 py-16 relative z-10" style={{ '--galaxy-accent': accentColor } as React.CSSProperties}>
      
      {/* OUTER SHELL (Visual context inside the museum) */}
      <div className="capability-forge-shell p-6 md:p-10 flex flex-col gap-10">
        
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-[var(--border-strong)] pb-8">
           <div className="max-w-4xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-3 text-[var(--museum-brown)]">
                 <Settings className="w-4 h-4" /> System Online
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tight text-[var(--museum-ink)] mb-4">
                 CAPABILITY FORGE
              </h1>
              <p className="text-[var(--ink-soft)] font-medium text-lg leading-relaxed max-w-3xl mb-6">
                 A technical reactor for interface systems, AI tools, spatial experiments, and production workflows.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--museum-brown)]">
                 <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">[{totalTools} Tools Indexed]</span>
                 <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">[{totalDomains} Domains]</span>
                 <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">[Active Build Stack]</span>
                 <span className="px-2.5 py-1 rounded bg-[rgba(62,39,35,0.06)] border border-[rgba(62,39,35,0.1)]">[Production-Ready]</span>
              </div>
           </div>

           <div className="flex flex-col gap-3 min-w-[300px]">
              {/* Search */}
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
                 <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools, systems, evidence..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full pl-9 pr-4 py-2.5 bg-white/60 border border-[var(--border-strong)] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--museum-brown)] focus:bg-white transition-all shadow-sm"
                 />
              </div>
              {/* View Modes */}
              <div className="flex gap-1 bg-[rgba(62,39,35,0.06)] p-1 rounded-lg border border-[rgba(62,39,35,0.08)]">
                  {(['Reactor', 'Grid', 'Evidence'] as const).map(mode => (
                     <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={cn("flex-1 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md transition-all shadow-sm", viewMode === mode ? "bg-white text-[var(--museum-brown)] shadow-sm" : "text-[var(--ink-muted)] hover:text-[var(--museum-ink)] hover:bg-white/40")}
                     >
                        {mode}
                     </button>
                  ))}
              </div>
           </div>
        </div>

        {/* 3-COLUMN CORE */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch relative">
           
           {/* LEFT: DOMAIN RAIL */}
           <div className="lg:col-span-2 forge-domain-rail flex flex-row lg:flex-col gap-1.5 font-mono overflow-x-auto hide-scrollbar pb-2 lg:pb-0 px-1">
              <div className="text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest mb-2 hidden lg:block sticky top-0 bg-[var(--museum-paper)]/80 backdrop-blur z-10 py-1">Domain Index</div>
              {domains.map((domain, index) => {
                 const isActive = selectedDomain === domain.id && !searchQuery.trim();
                 const Icon = domain.icon;
                 return (
                    <button 
                       key={domain.id}
                       onClick={() => { setSelectedDomain(domain.id); setSearchQuery(""); }}
                       className={cn("flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all relative overflow-hidden group shrink-0 lg:w-full text-left", isActive ? "bg-white border-[rgba(62,39,35,0.2)] shadow-sm" : "bg-transparent border-transparent hover:bg-[rgba(62,39,35,0.04)] text-[var(--ink-soft)]")}
                    >
                       <div className="w-1 absolute left-0 top-0 h-full transition-all" style={{ backgroundColor: isActive ? domain.color : 'transparent' }} />
                       <span className="text-[9px] font-bold opacity-60 w-4 text-right shrink-0">{String(index + 1).padStart(2, '0')}</span>
                       <Icon className="w-3.5 h-3.5 transition-colors shrink-0" style={{ color: isActive ? domain.color : 'currentColor' }} />
                       <span className={cn("text-[10px] font-bold uppercase tracking-wider truncate flex-1", isActive ? "text-[var(--museum-ink)]" : "")}>
                          {domain.label}
                       </span>
                       <span className="text-[9px] font-bold opacity-50 shrink-0">{domain.count}</span>
                    </button>
                 )
              })}
           </div>

           {viewMode === "Reactor" && (
             <>
               {/* CENTER: ACTIVE REACTOR */}
               <div className="lg:col-span-6 flex flex-col gap-6 w-full max-w-full">
                  <div className="forge-reactor-panel p-6 md:p-8 flex flex-col relative overflow-hidden w-full">
                     {/* Decorative Reactor Glow */}
                     <div className="absolute -top-10 -right-10 w-64 h-64 blur-[80px] opacity-[0.15] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
                     
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="pr-4">
                           <div className="flex items-center gap-2 mb-2">
                             <span className="px-2 py-0.5 rounded-sm bg-white/10 border border-white/20 text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                                {selectedTech.level}
                             </span>
                             <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
                                {selectedTech.category}
                             </span>
                           </div>
                           <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight break-words">{selectedTech.name}</h2>
                        </div>
                        <div className="flex flex-col gap-1 items-end shrink-0">
                           <span className="text-[9px] font-mono uppercase text-white/40">Status</span>
                           <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-white uppercase"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Active</span>
                        </div>
                     </div>

                     <div className="mb-8 relative z-10 w-full">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#AAA] mb-2 block">// System Role</span>
                        <p className="text-sm md:text-base font-medium leading-relaxed opacity-90 border-l-2 pl-4 break-words" style={{ borderColor: accentColor }}>
                           {selectedTech.description}
                        </p>
                     </div>

                     <div className="grid grid-cols-2 gap-6 mb-8 relative z-10 border-t border-white/10 pt-6">
                        <div className="flex flex-col gap-1">
                           <span className="text-[9px] font-mono uppercase text-[#888] font-bold mb-1">Operational Confidence</span>
                           <div className="flex gap-1">
                              {[...Array(10)].map((_, i) => (
                                 <span key={i} className={cn("h-1.5 flex-1 rounded-sm", i < (selectedTech.proficiency || 8) ? "opacity-100" : "opacity-20")} style={{ backgroundColor: i < (selectedTech.proficiency || 8) ? accentColor : '#666' }} />
                              ))}
                           </div>
                           <span className="text-[9px] font-mono text-right text-white/50 mt-1">{(selectedTech.proficiency || 8) * 10}%</span>
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-[9px] font-mono uppercase text-[#888] font-bold mb-1">Deployment Readiness</span>
                           <div className="flex gap-1">
                              {[...Array(10)].map((_, i) => (
                                 <span key={i} className={cn("h-1.5 flex-1 rounded-sm", i < 9 ? "opacity-100" : "opacity-20")} style={{ backgroundColor: i < 9 ? accentColor : '#666' }} />
                              ))}
                           </div>
                           <span className="text-[9px] font-mono text-right text-white/50 mt-1">90%</span>
                        </div>
                     </div>

                     {/* RELATED STACK NODES */}
                     {selectedTech.relatedTools && selectedTech.relatedTools.length > 0 && (
                        <div className="mt-auto relative z-10 pt-4 border-t border-white/5">
                           <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#AAA] mb-3 block">Connected Nodes</span>
                           <div className="flex flex-wrap items-center gap-3 w-full">
                              <span className="px-3 py-1.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                 {selectedTech.name}
                              </span>
                              <div className="w-4 h-px bg-white/20" />
                              <div className="flex flex-wrap gap-2 flex-1">
                                 {selectedTech.relatedTools.map(t => (
                                    <span key={t} className="px-2.5 py-1 rounded bg-transparent border border-white/10 text-[10px] font-mono text-[#AAA]">
                                       {t}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Tool Chips Grid */}
                  <div className="flex flex-col gap-3 w-full">
                     <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)] px-1">Secondary Nodes</span>
                     <div className="flex flex-wrap gap-2 w-full">
                        {displayedTechs.filter(t => t.id !== selectedTech.id).map(tool => (
                           <button
                              key={tool.id}
                              onClick={() => setSelectedTechId(tool.id)}
                              className="forge-tool-chip px-3 py-2 rounded-lg bg-white/60 border border-[var(--border-strong)] text-[11px] font-bold font-mono text-[var(--ink-soft)] hover:bg-white hover:border-[var(--museum-brown)] hover:text-[var(--museum-ink)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--museum-brown)] shadow-sm flex items-center gap-2 max-w-full"
                           >
                              <span className="w-1.5 h-1.5 rounded-full opacity-60 shrink-0" style={{ backgroundColor: levelColors[tool.level] || '#aaa' }} />
                              <span className="truncate">{tool.name}</span>
                           </button>
                        ))}
                        {displayedTechs.length <= 1 && (
                          <span className="text-[11px] font-mono text-[var(--ink-muted)] py-2">No other nodes found.</span>
                        )}
                     </div>
                  </div>
               </div>

               {/* RIGHT: EVIDENCE DOSSIER */}
               <div className="lg:col-span-4 forge-evidence-dossier p-6 md:p-8 flex flex-col h-full lg:max-h-[800px] overflow-y-auto custom-scrollbar shadow-sm w-full">
                  <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-4 mb-6 shrink-0">
                     <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--museum-brown)] flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Tool Dossier
                     </span>
                     <span className="font-mono text-[10px] font-bold text-[var(--ink-muted)] truncate max-w-[120px]">#{selectedTech.id}</span>
                  </div>

                  <div className="flex flex-col gap-8 flex-1">
                     
                     {/* Evidence */}
                     <div>
                        <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
                           <CheckCircle2 className="w-3.5 h-3.5" /> Concrete Evidence
                        </h4>
                        <ul className="space-y-3">
                           {selectedTech.evidence.map((proof, i) => (
                              <li key={i} className="bg-white border border-[rgba(62,39,35,0.08)] rounded-lg p-3 text-sm font-medium text-[var(--ink-soft)] leading-snug flex items-start gap-3 shadow-[0_2px_4px_rgba(62,39,35,0.02)] break-words">
                                 <span className="text-[10px] font-mono font-bold mt-0.5 opacity-40 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                 <span>{proof}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                     {/* Used In */}
                     <div>
                        <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
                           <LayoutGrid className="w-3.5 h-3.5" /> Used In Productions
                        </h4>
                        <div className="flex flex-col gap-2">
                           {selectedTech.usedIn.map((project, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--museum-ink)] border-b border-[rgba(62,39,35,0.08)] pb-2 last:border-0 last:pb-0 break-words">
                                 <ArrowRight className="w-3 h-3 opacity-30 shrink-0" /> {project}
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Learning Frontier */}
                     {selectedTech.learningFocus && (
                        <div>
                           <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
                              <Activity className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> Learning Frontier
                           </h4>
                           <p className="text-xs font-mono text-[var(--ink-soft)] leading-relaxed bg-[var(--museum-paper-deep)] p-3 rounded-lg border border-[rgba(62,39,35,0.08)]">
                              {selectedTech.learningFocus}
                           </p>
                        </div>
                     )}

                     {/* Next Upgrade */}
                     {selectedTech.nextStep && (
                        <div>
                           <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.15em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
                              <GitMerge className="w-3.5 h-3.5 text-[var(--accent-cyan)]" /> Next Tech Upgrade
                           </h4>
                           <p className="text-xs font-mono text-[var(--ink-soft)] leading-relaxed bg-[var(--museum-paper-deep)] p-3 rounded-lg border border-[rgba(62,39,35,0.08)]">
                              {selectedTech.nextStep}
                           </p>
                        </div>
                     )}

                  </div>
               </div>
             </>
           )}

           {viewMode === "Grid" && (
             <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-max w-full">
                {displayedTechs.map(tool => (
                   <button
                      key={tool.id}
                      onClick={() => { setSelectedTechId(tool.id); setViewMode("Reactor"); }}
                      className="bg-white/70 border border-[var(--border-strong)] rounded-xl p-5 text-left hover:bg-white hover:border-[var(--museum-brown)] shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--museum-brown)] flex flex-col gap-3 group w-full"
                   >
                      <div className="flex justify-between items-start w-full">
                         <h3 className="font-space font-bold text-lg text-[var(--museum-ink)] group-hover:text-[var(--accent-pink)] transition-colors pr-2 break-words">{tool.name}</h3>
                         <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--ink-muted)] bg-[var(--museum-paper)] shrink-0">{tool.category}</span>
                      </div>
                      <p className="text-xs font-medium text-[var(--ink-soft)] line-clamp-2 w-full">{tool.description}</p>
                      <div className="mt-auto pt-4 border-t border-[rgba(62,39,35,0.06)] flex justify-between items-center w-full">
                         <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)]">{tool.evidence.length} Proofs</span>
                         <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--museum-ink)] shrink-0" />
                      </div>
                   </button>
                ))}
             </div>
           )}

           {viewMode === "Evidence" && (
             <div className="lg:col-span-10 flex flex-col gap-8 w-full">
                {displayedTechs.map(tool => (
                   <div key={tool.id} className="bg-white/50 border border-[var(--border-strong)] rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full">
                      <div className="flex items-center gap-4">
                         <button 
                            onClick={() => { setSelectedTechId(tool.id); setViewMode("Reactor"); }}
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
                            <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">{tool.description}</p>
                         </div>
                         <div className="w-full">
                            <h4 className="text-[10px] font-mono uppercase font-bold tracking-[0.1em] text-[var(--ink-muted)] mb-3 flex items-center gap-2">
                               <FileText className="w-3 h-3" /> Concrete Proof
                            </h4>
                            <ul className="space-y-2">
                               {tool.evidence.map((proof, i) => (
                                  <li key={i} className="text-xs font-mono font-medium text-[var(--ink-soft)] flex gap-2 items-start opacity-90 break-words">
                                     <span className="text-[var(--museum-brown)] font-bold shrink-0">{'>'}</span> {proof}
                                  </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           )}

        </div>
      </div>
    </div>
  );
}
