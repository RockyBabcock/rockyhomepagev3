import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectLabData } from "../data/projectLabData";
import {
  CheckCircle2,
  ChevronRight,
  Workflow,
  ArrowRight,
  LayoutTemplate,
  Palette,
  Bot,
  BoxSelect,
  MonitorSmartphone,
  ExternalLink,
  Github,
  Terminal,
  Activity,
  Box,
  Layers,
  ChevronDown,
  X
} from "lucide-react";
import { StatusPill } from "./StatusPill";

export const ProjectLabModule = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState("rocky-homepage-v3");
  
  // Modals / Drawers
  const [caseStudyDrawerOpen, setCaseStudyDrawerOpen] = useState(false);
  const [roadmapDrawerOpen, setRoadmapDrawerOpen] = useState(false);
  const [roadmapTab, setRoadmapTab] = useState("near"); // "near", "mid", "long"
  
  // Section expand/collapse state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    problem: true,
    built: true,
    proves: true,
    limitations: false,
    nextSteps: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter projects
  const filteredProjects = projectLabData.filter(project => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return project.category === "Featured";
    if (activeFilter === "Active Build") return project.status === "Active Build";
    return project.status === activeFilter || project.category === activeFilter;
  });

  // Keep selection valid
  useEffect(() => {
    if (filteredProjects.length > 0 && !filteredProjects.find(p => p.id === selectedProjectId)) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [activeFilter, filteredProjects, selectedProjectId]);

  // URL Hash syncing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#project-", "");
      if (hash && projectLabData.some(p => p.id === hash)) {
        setSelectedProjectId(hash);
      }
    };
    handleHashChange(); // initial
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    window.history.pushState(null, "", `#project-${id}`);
    
    // Optionally scroll to top of details area on mobile
    if (window.innerWidth < 1024) {
      const detailsEl = document.getElementById("featured-case-study");
      if (detailsEl) {
        detailsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const featuredProject = projectLabData.find(p => p.id === selectedProjectId) || projectLabData[0];
  
  // Prevent body scroll when drawer open
  useEffect(() => {
    if (caseStudyDrawerOpen || roadmapDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [caseStudyDrawerOpen, roadmapDrawerOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCaseStudyDrawerOpen(false);
        setRoadmapDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="w-[min(92vw,1720px)] mx-auto flex flex-col gap-8 lg:gap-10 relative">
      
      {/* Subtle blueprint grid background for the entire module */}
      <div className="absolute inset-0 max-w-full -mx-[4vw] px-[4vw] pointer-events-none opacity-20 mix-blend-multiply" 
           style={{
             backgroundImage: `linear-gradient(var(--hall-surface) 1px, transparent 1px), linear-gradient(90deg, var(--hall-surface) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }}
      />
      
      {/* 1. Lab Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-4 relative z-10">
        <div className="lg:col-span-7">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[var(--hall-primary)] block mb-4 flex items-center gap-2">
            Hall 01 <span className="w-8 h-px bg-[var(--hall-primary)] opacity-50" /> Proof of Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tight text-[var(--ink)] mb-4 lg:mb-6">
            Project Laboratory
          </h2>
          <p className="text-[var(--ink-soft)] font-medium leading-relaxed max-w-3xl text-sm sm:text-base lg:text-lg">
            This laboratory collects the systems I am building, rebuilding, and testing. Each project is treated as a case study: what problem it solves, how it is structured, what it proves technically, and what still needs improvement.
          </p>
        </div>
        
        <div className="lg:col-span-5 flex flex-col lg:items-end gap-6 justify-end pb-2">
          {/* Lab Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
             <div className="flex flex-col text-left lg:text-right">
                <span className="text-[var(--hall-primary)] font-bold text-2xl font-space">{projectLabData.filter(p => p.status === "Active Build").length}</span>
                <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-wider mt-1">Active<br/>Builds</span>
             </div>
             <div className="flex flex-col text-left lg:text-right">
                <span className="text-[var(--hall-secondary)] font-bold text-2xl font-space">{projectLabData.filter(p => p.category === "Featured").length}</span>
                <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-wider mt-1">Featured<br/>Case Study</span>
             </div>
             <div className="flex flex-col text-left lg:text-right">
                <span className="text-[var(--purple)] font-bold text-2xl font-space">{projectLabData.filter(p => p.category === "Prototype").length}</span>
                <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-wider mt-1">Prototype<br/>Experiments</span>
             </div>
             <div className="flex flex-col text-left lg:text-right">
                <span className="text-[var(--orange)] font-bold text-2xl font-space">V3</span>
                <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-wider mt-1">Currently<br/>Expanding</span>
             </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 lg:justify-end">
             {['All', 'Featured', 'Prototype', 'Concept', 'Active Build'].map(tab => {
                const isActive = activeFilter === tab;
                return (
                  <button 
                     key={tab} 
                     onClick={() => setActiveFilter(tab)}
                     className={`px-3 py-1.5 rounded-md text-[11px] font-mono font-bold tracking-[0.1em] border transition-all flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)] ${
                         isActive 
                         ? 'bg-[var(--hall-primary)] text-white border-[var(--hall-primary)] shadow-sm' 
                         : 'bg-white text-[var(--ink-soft)] border-[var(--border)] hover:border-[var(--hall-secondary)] hover:text-[var(--hall-secondary)]'
                     }`}
                     aria-pressed={isActive}
                  >
                     {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
                     {tab.toUpperCase()}
                  </button>
                );
             })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 w-full">
        <div className="lg:col-span-8 flex flex-col order-2 lg:order-1" id="featured-case-study">
        {/* Featured Case Study (8 cols) */}
        <motion.article 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[var(--border)] p-6 md:p-8 lg:p-10 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow h-full"
        >
          {/* Technical side decoration */}
          <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[var(--hall-primary)] to-[var(--hall-secondary)] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--hall-primary)] via-[var(--hall-secondary)] to-transparent" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[var(--hall-secondary)]/5 blur-[100px] rounded-full pointer-events-none" />

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
              <BoxSelect className="w-12 h-12 text-[var(--ink-muted)] opacity-50 mb-4" />
              <h3 className="text-xl font-space font-bold text-[var(--ink)] mb-2">No projects match this filter</h3>
              <p className="text-sm font-medium text-[var(--ink-soft)] mb-6">This section of the lab is still expanding.</p>
              <button 
                onClick={() => setActiveFilter("All")}
                className="px-4 py-2 bg-white border border-[var(--border)] rounded-md font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--hall-primary)] hover:border-[var(--hall-primary)] transition-all"
              >
                Reset Filter
              </button>
            </div>
          ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10 w-full">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-[var(--hall-secondary)]/10 text-[var(--hall-secondary)] border border-[var(--hall-secondary)]/20 font-mono text-[11px] rounded font-bold uppercase tracking-[0.1em]">
                   {featuredProject.category}
                 </span>
                 <span className={`px-3 py-1 font-mono text-[11px] rounded font-bold uppercase tracking-[0.1em] border ${featuredProject.status === 'Active Build' ? 'bg-[var(--orange)]/10 text-[var(--orange)] border-[var(--orange)]/20' : 'bg-[var(--ink-muted)]/10 text-[var(--ink-muted)] border-[var(--ink-muted)]/20'}`}>
                   {featuredProject.status}
                 </span>
              </div>
              
              <div className="flex gap-2">
                {featuredProject.liveUrl ? (
                  <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[var(--border)] text-xs font-bold text-[var(--ink)] hover:text-[var(--hall-primary)] hover:border-[var(--hall-primary)] hover:shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]">
                    <ExternalLink className="w-3.5 h-3.5" /> <span className="hidden sm:inline">View Live Site</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--hall-surface)] border border-[var(--border)] text-xs font-bold text-[var(--ink-muted)] cursor-not-allowed">
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" /> <span className="hidden sm:inline">No Live Demo</span>
                  </span>
                )}
                
                {featuredProject.repoUrl ? (
                  <a href={featuredProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-white border border-[#1a1a1a] text-xs font-bold hover:bg-[var(--hall-primary)] hover:border-[var(--hall-primary)] hover:shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]">
                    <Github className="w-3.5 h-3.5" /> <span className="hidden sm:inline">View GitHub</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--hall-surface)] border border-[var(--border)] text-xs font-bold text-[var(--ink-muted)] cursor-not-allowed">
                    <Github className="w-3.5 h-3.5 opacity-50" /> <span className="hidden sm:inline">Private Repo</span>
                  </span>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                 key={featuredProject.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 transition={{ duration: 0.3 }}
                 className="relative z-10 flex flex-col flex-1"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-[var(--ink)] tracking-tight">
                    {featuredProject.title}
                  </h3>
                  
                  {featuredProject.caseStudyAvailable && (
                    <button 
                      onClick={() => setCaseStudyDrawerOpen(true)}
                      className="hidden sm:flex shrink-0 px-4 py-2 bg-white border border-[var(--border)] text-[var(--ink)] font-bold text-[11px] uppercase tracking-wider rounded-lg hover:border-[var(--hall-primary)] hover:text-[var(--hall-primary)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]"
                    >
                      Read Case Study
                    </button>
                  )}
                </div>

                <p className="text-base font-medium text-[var(--ink)] mb-8 leading-relaxed max-w-3xl">
                  {featuredProject.oneLine}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {featuredProject.techStack.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 bg-[var(--hall-surface)] border border-[var(--hall-soft)] text-[var(--hall-primary)] font-mono text-[10px] font-bold rounded flex items-center tracking-wider uppercase"
                    >
                      <Terminal className="w-3 h-3 mr-1.5 opacity-50" />
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Detail Grid - Extended */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-1 mb-8">
                  {/* Approach / Problem */}
                  <div className="flex flex-col gap-0 border-t border-[var(--border)]">
                    {featuredProject.problem && (
                      <div className="py-4 border-b border-[var(--border)] group/sec">
                        <button 
                          onClick={() => toggleSection("problem")}
                          className="w-full flex items-center justify-between text-[11px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest outline-none"
                          aria-expanded={expandedSections.problem}
                        >
                          <span className="flex items-center"><Activity className="w-3.5 h-3.5 mr-2 text-[var(--orange)]" /> Problem</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.problem ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {expandedSections.problem && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed pt-3">
                                {featuredProject.problem}
                              </p>
                              {featuredProject.id === "rocky-homepage-v3" && (
                                <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed mt-2 border-l-2 border-[var(--hall-primary)] pl-3">
                                  Instead of building a normal portfolio, I designed the homepage as a modular museum with halls, routes, archives, project labs, capability systems, and personal fragments.
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* System Built */}
                  <div className="flex flex-col gap-0 border-t border-[var(--border)] md:border-t-0 md:mt-0">
                    {featuredProject.built && featuredProject.built.length > 0 && (
                      <div className="py-4 border-b border-[var(--border)] md:border-t md:border-[var(--border)]">
                         <button 
                            onClick={() => toggleSection("built")}
                            className="w-full flex items-center justify-between text-[11px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest outline-none"
                            aria-expanded={expandedSections.built}
                          >
                            <span className="flex items-center"><Box className="w-3.5 h-3.5 mr-2 text-[var(--hall-secondary)]" /> System Built</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.built ? "rotate-180" : ""}`} />
                          </button>
                         <AnimatePresence>
                           {expandedSections.built && (
                           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                             <ul className="space-y-2.5 pt-3">
                               {featuredProject.built.map((item, i) => (
                                   <li key={i} className="text-sm font-medium text-[var(--ink)] leading-snug flex items-start gap-2">
                                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--hall-secondary)] mt-1.5 shrink-0" />
                                       <span>{item}</span>
                                   </li>
                               ))}
                             </ul>
                            </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>

                {((featuredProject.proves && featuredProject.proves.length > 0) || (featuredProject.limitations && featuredProject.limitations.length > 0) || (featuredProject.nextSteps && featuredProject.nextSteps.length > 0)) && (
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-1 mt-auto">
                     
                     {/* What This Proves */}
                     {featuredProject.proves && featuredProject.proves.length > 0 && (
                       <div className="py-4 border-b border-[var(--border)] self-start w-full">
                           <button 
                            onClick={() => toggleSection("proves")}
                            className="w-full flex items-center justify-between text-[11px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest outline-none"
                            aria-expanded={expandedSections.proves}
                          >
                             <span className="flex items-center"><Layers className="w-3.5 h-3.5 mr-2 text-[var(--purple)]" /> What This Proves</span>
                             <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.proves ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {expandedSections.proves && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <ul className="space-y-2.5 pt-3">
                           {featuredProject.proves.map((item, i) => (
                               <li key={i} className="text-sm font-medium text-[var(--ink)] leading-snug flex items-start gap-2">
                                   <span className="text-[var(--purple)] shrink-0 font-bold font-mono">{(i+1).toString().padStart(2, '0')}.</span>
                                   <span>{item}</span>
                               </li>
                           ))}
                         </ul>
                         </motion.div>
                            )}</AnimatePresence>
                       </div>
                     )}
                     
                     {/* Limitations & Next Steps */}
                     <div className="flex flex-col">
                         {featuredProject.limitations && featuredProject.limitations.length > 0 && (
                           <div className="py-4 border-b border-[var(--border)]">
                              <button 
                                onClick={() => toggleSection("limitations")}
                                className="w-full flex items-center justify-between text-[11px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest outline-none"
                                aria-expanded={expandedSections.limitations}
                              >
                                <span className="flex items-center">
                                  <span className="w-2 h-2 rounded-full bg-[var(--ink-muted)] mr-2"/> Current Limitations
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.limitations ? "rotate-180" : ""}`} />
                              </button>
                               <AnimatePresence>
                                {expandedSections.limitations && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed pt-3">
                                 {featuredProject.limitations[0]}
                              </p>
                              </motion.div>
                                )}</AnimatePresence>
                           </div>
                         )}
                         {featuredProject.nextSteps && featuredProject.nextSteps.length > 0 && (
                             <div className="py-4 border-b border-[var(--border)]">
                                <button 
                                  onClick={() => toggleSection("nextSteps")}
                                  className="w-full flex items-center justify-between text-[11px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest outline-none"
                                  aria-expanded={expandedSections.nextSteps}
                                >
                                  <span className="flex items-center"><Workflow className="w-3.5 h-3.5 mr-2 text-[var(--cyan)]" /> Next Steps</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.nextSteps ? "rotate-180" : ""}`} />
                                </button>
                                
                                <AnimatePresence>
                                {expandedSections.nextSteps && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-1">
                                    {featuredProject.nextSteps.map((item, i) => (
                                        <li key={i} className="text-[11px] font-mono font-bold text-[var(--ink-soft)] leading-snug flex items-center p-2 rounded-md bg-[var(--hall-surface)] border border-[var(--hall-soft)]">
                                           {item}
                                        </li>
                                    ))}
                                </ul>
                                </motion.div>
                                )}</AnimatePresence>
                             </div>
                         )}
                     </div>
                  </div>
                )}
                
                {/* Mobile View Case Study Button */}
                {featuredProject.caseStudyAvailable && (
                  <button 
                    onClick={() => setCaseStudyDrawerOpen(true)}
                    className="sm:hidden w-full mt-6 py-3 bg-[var(--hall-surface)] border border-[var(--border)] text-[var(--ink)] font-bold text-xs uppercase tracking-wider rounded-lg hover:border-[var(--hall-primary)] hover:text-[var(--hall-primary)] transition-all outline-none"
                  >
                    Read Full Case Study
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>}
        </motion.article>
        </div>

        {/* Lab Control Deck (4 cols) */}
        <div className="lg:col-span-4 flex flex-col order-1 lg:order-2">
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[var(--border)] p-6 lg:p-8 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
           {/* Section 1: Project Index */}
           <div className="mb-8">
               <h4 className="flex justify-between items-center text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
                   <span>Project Index</span>
                   <Terminal className="w-3.5 h-3.5 opacity-50" />
               </h4>
               <div className="flex flex-col gap-3">
                  {filteredProjects.map((project, index) => {
                      const isSelected = selectedProjectId === project.id;
                      const num = (index + 1).toString().padStart(2, '0');
                      return (
                          <button 
                             key={project.id}
                             onClick={() => handleSelectProject(project.id)}
                             aria-selected={isSelected}
                             className={`text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 relative group outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--hall-primary)] focus-visible:ring-offset-white ${
                                 isSelected 
                                 ? 'bg-[var(--hall-primary)]/5 border-[var(--hall-primary)] shadow-sm ring-1 ring-[var(--hall-primary)] ring-offset-0 ring-offset-transparent' 
                                 : 'bg-white border-[var(--border)] hover:border-[var(--hall-primary)]/40 hover:bg-[var(--hall-surface)]'
                             }`}
                          >
                              {isSelected && <div className="absolute left-0 top-0 w-1.5 h-full bg-[var(--hall-primary)] rounded-l-xl" />}
                              
                              <div className="flex justify-between items-center gap-2">
                                  <span className={`font-space font-bold text-sm transition-colors line-clamp-1 ${isSelected ? 'text-[var(--hall-primary)]' : 'text-[var(--ink)] group-hover:text-[var(--hall-primary)]'}`}>
                                     <span className="text-[var(--ink-muted)] mr-1.5 font-mono text-[9px]">{num}.</span>{project.title}
                                  </span>
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[var(--hall-primary)] shrink-0" />}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 pl-[24px]">
                                 <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase bg-white border border-[var(--border)] text-[var(--ink-muted)] font-bold">
                                     {project.status}
                                 </span>
                                 <span className="text-[10px] font-medium text-[var(--ink-soft)] truncate">
                                     {project.category}
                                 </span>
                              </div>
                          </button>
                      );
                  })}
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-4 text-xs font-medium text-[var(--ink-soft)] bg-[var(--hall-surface)] rounded-lg">
                      No matches found.
                    </div>
                  )}
               </div>
           </div>

           {/* Section 2: Selected Snapshot */}
           {filteredProjects.length > 0 && (
             <div className="mb-8 flex-1">
                 <h4 className="flex justify-between items-center text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
                     <span>Selected Snapshot</span>
                     <MonitorSmartphone className="w-3.5 h-3.5 opacity-50" />
                 </h4>
                 <div className="bg-[var(--hall-surface)] rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3 h-full">
                      <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]/50">
                         <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase">Status</span>
                         <span className="text-xs font-bold text-[var(--ink)]">{featuredProject.status}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]/50">
                         <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase">Type</span>
                         <span className="text-xs font-bold text-[var(--ink)]">{featuredProject.category}</span>
                      </div>
                      <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]/50">
                         <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase">Focus</span>
                         <span className="text-xs font-medium text-[var(--ink-soft)] leading-snug">
                             {featuredProject.focus || "Expanding functionality"}
                         </span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase">Next Step</span>
                         <span className="text-xs font-medium text-[var(--ink-soft)] leading-snug">
                             {featuredProject.nextStep || featuredProject.nextSteps?.[0] || "Review"}
                         </span>
                      </div>
                 </div>
             </div>
           )}

           {/* Section 4: Roadmap Preview */}
           <div className="mt-auto">
               <h4 className="flex justify-between items-center text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3 pb-2 border-b border-[var(--border)]">
                   <span>Roadmap Preview</span>
                   <button 
                     onClick={() => setRoadmapDrawerOpen(true)}
                     className="hover:text-[var(--orange)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded"
                   >
                     <ArrowRight className="w-3.5 h-3.5 opacity-50 text-[var(--orange)] hover:opacity-100 transition-opacity" />
                   </button>
               </h4>
               <ul className="space-y-1.5 mb-3">
                   <li className="text-[11px] font-medium text-[var(--ink-soft)] flex items-center gap-2 border-[var(--border)] border bg-white rounded flex justify-between px-2 py-1.5">
                       <span>Add real project screenshots</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--hall-primary)]" />
                   </li>
                   <li className="text-[11px] font-medium text-[var(--ink-soft)] flex items-center gap-2 border-[var(--border)] border bg-white rounded flex justify-between px-2 py-1.5">
                       <span>Expand chess archive</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                   </li>
                   <li className="text-[11px] font-medium text-[var(--ink-soft)] flex items-center gap-2 border-[var(--border)] border bg-white rounded flex justify-between px-2 py-1.5">
                       <span>Document AI Studio workflow</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple)]" />
                   </li>
               </ul>
               <button 
                 onClick={() => setRoadmapDrawerOpen(true)}
                 className="w-full text-[10px] font-bold font-mono uppercase tracking-widest text-[var(--ink)] bg-[var(--hall-surface)] hover:bg-[var(--hall-primary)] hover:text-white transition-colors border border-[var(--border)] py-1.5 rounded outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]"
               >
                 View Full Roadmap
               </button>
           </div>
        </motion.div>
        </div>
      </div>

      {/* 3. Evidence Belt (Full width) */}
      <motion.div 
         initial={{ opacity: 0, y: 15 }} 
         whileInView={{ opacity: 1, y: 0 }} 
         viewport={{ once: true }} 
         transition={{ delay: 0.2 }} 
         className="w-full relative z-10"
      >
          <div className="flex justify-between items-center mb-4 pl-1">
              <h3 className="font-mono text-[11px] uppercase font-bold text-[var(--hall-primary)] tracking-widest flex items-center gap-2">
                 <BoxSelect className="w-3.5 h-3.5" /> What This Lab Proves
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--hall-soft)] to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 bg-white/90 backdrop-blur-md rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
             
             {[
                 {
                     icon: LayoutTemplate, color: "var(--hall-primary)",
                     title: "Component Arch", desc: "Reusable homepage modules with clear section responsibility."
                 },
                 {
                     icon: Palette, color: "var(--cyan)",
                     title: "Visual Systems", desc: "Color, spacing, typography, and interaction as one interface language."
                 },
                 {
                     icon: Bot, color: "var(--purple)",
                     title: "AI-Assisted Workflow", desc: "Using AI Studio as an iterative design and code partner."
                 },
                 {
                     icon: BoxSelect, color: "var(--orange)",
                     title: "Content Modeling", desc: "Turning sparse personal material into structured project stories."
                 },
                 {
                     icon: MonitorSmartphone, color: "var(--hall-secondary)",
                     title: "Responsive Design", desc: "Wide desktop layouts that collapse cleanly into mobile-first sections."
                 }
             ].map((proof, i) => (
                 <div key={i} className="flex flex-col p-5 border-b sm:border-r border-[var(--border)] hover:bg-[var(--hall-surface)] transition-all group relative overflow-hidden">
                     <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: proof.color, filter: 'blur(20px)' }} />
                     <proof.icon className="w-5 h-5 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: proof.color }} />
                     <h5 className="font-space font-bold text-[var(--ink)] mb-2 text-xs uppercase tracking-wide">{proof.title}</h5>
                     <p className="text-[11px] font-medium text-[var(--ink-soft)] leading-relaxed">{proof.desc}</p>
                 </div>
             ))}
             
          </div>
      </motion.div>

      {/* 4. Prototype Shelf (Full width, 4 cards) */}
      <motion.div 
         initial={{ opacity: 0, y: 15 }} 
         whileInView={{ opacity: 1, y: 0 }} 
         viewport={{ once: true }} 
         transition={{ delay: 0.3 }} 
         className="w-full relative z-10"
      >
          <div className="flex justify-between items-center mb-4 pl-1">
              <h3 className="font-mono text-[11px] uppercase font-bold text-[var(--purple)] tracking-widest flex items-center gap-2">
                 <Terminal className="w-3.5 h-3.5" /> Prototype Shelf
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--purple)]/20 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             
             {/* Card 1: AI Studio Prototype */}
             <div className="bg-white/90 backdrop-blur-md rounded-xl border border-[var(--border)] hover:border-[var(--purple)]/50 p-6 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--purple)] opacity-30 group-hover:opacity-100 transition-colors" />
                 
                 <div className="flex justify-between items-start mb-4">
                     <h4 className="font-space font-bold text-base text-[var(--ink)] w-3/4">AI Studio Prototype</h4>
                     <span className="w-2 h-2 rounded-full bg-[var(--purple)] ring-4 ring-[var(--purple)]/20 shadow-sm" />
                 </div>
                 <p className="text-[11px] font-medium text-[var(--ink-soft)] mb-5 min-h-[48px]">An experimental workflow for using AI-assisted iteration to reshape homepage layout, copy, visual hierarchy, and interaction.</p>
                 
                 <div className="mb-4">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--purple)] block mb-1">Purpose</span>
                     <p className="text-[10px] font-medium text-[var(--ink)]">Test how AI Studio can help generate, revise, and deploy interface improvements faster.</p>
                 </div>
                 
                 <div className="mb-5 flex-1">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--purple)] block mb-1.5">Built Around</span>
                     <ul className="space-y-1 border-l-2 border-[var(--border)] pl-2">
                         {["Prompt-driven UI iteration", "Component-level code editing", "Homepage layout experiments", "GitHub + Vercel workflow"].map(item => (
                             <li key={item} className="text-[10px] font-medium text-[var(--ink-soft)] leading-tight">{item}</li>
                         ))}
                     </ul>
                 </div>
                 
                 <div className="flex flex-wrap gap-1.5 mb-6">
                     {["Prompting", "LLMs", "Node.js"].map(t => (
                         <span key={t} className="px-1.5 py-0.5 bg-[var(--hall-surface)] rounded text-[8px] font-mono font-bold text-[var(--ink-muted)] uppercase border border-[var(--border)]">{t}</span>
                     ))}
                 </div>

                 <button 
                    onClick={() => { handleSelectProject("ai-assistant"); setCaseStudyDrawerOpen(true); }}
                    className="w-full py-2 bg-white border border-[var(--border)] rounded text-[11px] font-bold text-[var(--ink)] hover:text-[var(--purple)] hover:border-[var(--purple)] transition-colors focus:ring-2 focus:ring-[var(--purple)] outline-none"
                  >
                     Document Case Study
                 </button>
             </div>

             {/* Card 2: Interactive Chess Visualizer */}
             <div className="bg-white/90 backdrop-blur-md rounded-xl border border-[var(--border)] hover:border-[var(--cyan)]/50 p-6 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--cyan)] opacity-30 group-hover:opacity-100 transition-colors" />
                 
                 <div className="flex justify-between items-start mb-4">
                     <h4 className="font-space font-bold text-base text-[var(--ink)]">Interactive Chess Visualizer</h4>
                     <span className="w-2 h-2 rounded-full bg-[var(--cyan)] ring-4 ring-[var(--cyan)]/20 shadow-sm" />
                 </div>
                 <p className="text-[11px] font-medium text-[var(--ink-soft)] mb-5 min-h-[48px]">A concept module for turning chess ideas into visual, interactive, and personal archive experiences.</p>
                 
                 <div className="mb-4">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--cyan)] block mb-1">Purpose</span>
                     <p className="text-[10px] font-medium text-[var(--ink)]">Use chess as a way to express strategy, memory, personality, and systems thinking.</p>
                 </div>
                 
                 <div className="mb-5 flex-1">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--cyan)] block mb-1.5">Planned Features</span>
                     <ul className="space-y-1 border-l-2 border-[var(--border)] pl-2">
                         {["Interactive 8×8 board", "Famous chess quotes", "Master constellation map", "Piece personality cards"].map(item => (
                             <li key={item} className="text-[10px] font-medium text-[var(--ink-soft)] leading-tight">{item}</li>
                         ))}
                     </ul>
                 </div>
                 
                 <div className="flex flex-wrap gap-1.5 mb-6">
                     {["Chess.com API", "Three.js", "Local Storage"].map(t => (
                         <span key={t} className="px-1.5 py-0.5 bg-[var(--hall-surface)] rounded text-[8px] font-mono font-bold text-[var(--ink-muted)] uppercase border border-[var(--border)]">{t}</span>
                     ))}
                 </div>

                 <button 
                   onClick={() => {
                     const chessEl = document.getElementById("hall-experiments");
                     if (chessEl) { chessEl.scrollIntoView({ behavior: "smooth" }); }
                     else { alert("Chess archive section coming soon."); } // fallback
                   }}
                   className="w-full py-2 bg-white border border-[var(--border)] rounded text-[11px] font-bold text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors focus:ring-2 focus:ring-[var(--cyan)] outline-none"
                 >
                     Connect to Archive
                 </button>
             </div>

             {/* Card 3: Rainbow Component System */}
             <div className="bg-white/90 backdrop-blur-md rounded-xl border border-[var(--border)] hover:border-[var(--orange)]/50 p-6 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--orange)] opacity-30 group-hover:opacity-100 transition-colors" />
                 
                 <div className="flex justify-between items-start mb-4">
                     <h4 className="font-space font-bold text-base text-[var(--ink)] w-3/4">Rainbow Component System</h4>
                     <span className="w-2 h-2 rounded-full bg-[var(--orange)] ring-4 ring-[var(--orange)]/20 shadow-sm animate-pulse" />
                 </div>
                 <p className="text-[11px] font-medium text-[var(--ink-soft)] mb-5 min-h-[48px]">A reusable visual language for cards, badges, route lines, section tones, and interaction states.</p>
                 
                 <div className="mb-4">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--orange)] block mb-1">Purpose</span>
                     <p className="text-[10px] font-medium text-[var(--ink)]">Make the homepage feel colorful and alive without becoming chaotic.</p>
                 </div>
                 
                 <div className="mb-5 flex-1">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--orange)] block mb-1.5">Built Around</span>
                     <ul className="space-y-1 border-l-2 border-[var(--border)] pl-2">
                         {["Warm paper background", "Rainbow accent tokens", "Section color identities", "Hover glow states"].map(item => (
                             <li key={item} className="text-[10px] font-medium text-[var(--ink-soft)] leading-tight">{item}</li>
                         ))}
                     </ul>
                 </div>
                 
                 <div className="flex flex-wrap gap-1.5 mb-6">
                     <span className="px-2 py-0.5 bg-[var(--orange)]/10 text-[var(--orange)] border border-[var(--orange)]/20 rounded text-[9px] font-mono font-bold uppercase">Active Build</span>
                 </div>

                 <button 
                  onClick={() => alert("Rainbow System drawer coming soon.")}
                  className="w-full py-2 bg-[var(--hall-surface)] border border-[var(--border)] border-dashed rounded text-[11px] font-bold text-[var(--ink-muted)] cursor-not-allowed outline-none"
                >
                     System Docs TBD
                 </button>
             </div>

             {/* Card 4: Prototype Shelf */}
             <div className="bg-white/90 backdrop-blur-md rounded-xl border border-[var(--border)] hover:border-[var(--hall-primary)]/50 p-6 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--hall-primary)] opacity-30 group-hover:opacity-100 transition-colors" />
                 
                 <div className="flex justify-between items-start mb-4">
                     <h4 className="font-space font-bold text-base text-[var(--ink)]">General Prototype Shelf</h4>
                     <span className="w-2 h-2 rounded-full bg-[var(--hall-primary)] ring-4 ring-[var(--hall-primary)]/20 shadow-sm" />
                 </div>
                 <p className="text-[11px] font-medium text-[var(--ink-soft)] mb-5 min-h-[48px]">A holding area for small experiments, unfinished ideas, and future builds that are not yet full case studies.</p>
                 
                 <div className="mb-5 flex-1 w-full">
                     <span className="text-[9px] font-mono uppercase font-bold text-[var(--hall-primary)] block mb-2">Expansion Items</span>
                     <div className="grid grid-cols-1 gap-2 w-full">
                         {[
                             { name: "Digital garden cards", color: "var(--green)" },
                             { name: "Media universe archive", color: "var(--purple)" },
                             { name: "Web3 learning UI", color: "var(--orange)" },
                             { name: "Live activity widgets", color: "var(--blue)" }
                         ].map(item => (
                             <div key={item.name} className="flex items-center gap-2 px-2.5 py-2 rounded border border-[var(--border)] bg-[var(--hall-surface)] group-hover:border-[var(--border)]/80 transition-colors w-full">
                                 <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor: item.color}} />
                                 <span className="text-[10px] font-bold text-[var(--ink-soft)] truncate">{item.name}</span>
                             </div>
                         ))}
                     </div>
                 </div>

                 <button 
                  onClick={() => setRoadmapDrawerOpen(true)}
                  className="w-full mt-auto py-2 bg-white border border-[var(--border)] rounded text-[11px] font-bold text-[var(--ink)] hover:text-[var(--hall-primary)] hover:border-[var(--hall-primary)] transition-colors focus:ring-2 focus:ring-[var(--hall-primary)] outline-none flex items-center justify-center gap-1">
                     View Roadmap <ArrowRight className="w-3 h-3 opacity-50" />
                 </button>
             </div>

          </div>
      </motion.div>

      {/* --- DRAWERS / MODALS --- */}
      
      {/* Case Study Drawer */}
      <AnimatePresence>
        {caseStudyDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6" aria-modal="true" role="dialog">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm shadow-xl"
               onClick={() => setCaseStudyDrawerOpen(false)}
             />
             <motion.div 
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="bg-[var(--background)] w-full max-w-4xl max-h-[90vh] sm:rounded-2xl border border-[var(--border)] shadow-2xl relative z-10 flex flex-col overflow-hidden"
             >
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-white shrink-0">
                  <div>
                    <h2 className="font-space font-bold text-xl text-[var(--ink)]">{featuredProject.title}</h2>
                    <p className="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider">{featuredProject.category} • {featuredProject.status}</p>
                  </div>
                  <button onClick={() => setCaseStudyDrawerOpen(false)} className="p-2 rounded hover:bg-[var(--hall-surface)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Body scroll */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[var(--background)]">
                   <p className="text-lg font-medium text-[var(--ink)] mb-8 leading-relaxed max-w-3xl">
                     {featuredProject.oneLine}
                   </p>
                   
                   <div className="grid md:grid-cols-3 gap-8 mb-10">
                     <div className="md:col-span-2 flex flex-col gap-8">
                       {featuredProject.problem && (
                         <div>
                           <h3 className="text-xs font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3 border-b border-[var(--border)] pb-2">The Problem</h3>
                           <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{featuredProject.problem}</p>
                         </div>
                       )}
                       {featuredProject.built && featuredProject.built.length > 0 && (
                         <div>
                           <h3 className="text-xs font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3 border-b border-[var(--border)] pb-2 flex items-center"><Box className="w-4 h-4 mr-2" /> What Was Built</h3>
                           <ul className="space-y-2">
                             {featuredProject.built.map(item => (
                               <li key={item} className="text-sm font-medium text-[var(--ink)] leading-relaxed flex gap-2">
                                 <span className="text-[var(--hall-secondary)] font-bold shrink-0">•</span> {item}
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}
                       {featuredProject.learned && featuredProject.learned.length > 0 && (
                         <div>
                           <h3 className="text-xs font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3 border-b border-[var(--border)] pb-2 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-[var(--green)]" /> Key Learnings</h3>
                           <ul className="space-y-3">
                             {featuredProject.learned.map((item, i) => (
                               <li key={item} className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed p-3 bg-white border border-[var(--border)] rounded-lg">
                                  {item}
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}
                     </div>
                     
                     {/* Sidebar info */}
                     <div className="flex flex-col gap-6">
                        <div className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm">
                           <h3 className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3">Role</h3>
                           <p className="text-sm font-bold text-[var(--ink)] mb-6">{featuredProject.role}</p>
                           
                           <h3 className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3">Tech Stack</h3>
                           <div className="flex flex-wrap gap-2 mb-6">
                             {featuredProject.techStack.map(t => (
                               <span key={t} className="px-2 py-1 bg-[var(--hall-surface)] text-[var(--ink)] font-mono text-[10px] font-bold rounded border border-[var(--border)]">{t}</span>
                             ))}
                           </div>
                           
                           <h3 className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-bold tracking-widest mb-3">Links</h3>
                           <div className="flex flex-col gap-2">
                             {featuredProject.liveUrl && (
                               <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-[var(--hall-primary)] hover:underline">
                                 <ExternalLink className="w-4 h-4" /> Live Site
                               </a>
                             )}
                             {featuredProject.repoUrl && (
                               <a href={featuredProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-[var(--ink)] hover:underline">
                                 <Github className="w-4 h-4" /> View Source
                               </a>
                             )}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Roadmap Drawer */}
      <AnimatePresence>
        {roadmapDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" aria-modal="true" role="dialog">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm"
               onClick={() => setRoadmapDrawerOpen(false)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
               className="bg-[var(--background)] w-full max-w-2xl rounded-2xl border border-[var(--border)] shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh]"
             >
                <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-white shrink-0">
                  <div>
                    <h2 className="font-space font-bold text-xl text-[var(--ink)] flex items-center gap-2"><Workflow className="w-5 h-5 text-[var(--orange)]" /> Project Laboratory Roadmap</h2>
                  </div>
                  <button onClick={() => setRoadmapDrawerOpen(false)} className="p-2 rounded hover:bg-[var(--hall-surface)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                   <div className="flex gap-2 mb-6 border-b border-[var(--border)] pb-4">
                     {["near", "mid", "long"].map(tab => (
                       <button
                         key={tab}
                         onClick={() => setRoadmapTab(tab)}
                         className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] transition-colors ${roadmapTab === tab ? "bg-[var(--ink)] text-white" : "text-[var(--ink-soft)] hover:bg-[var(--hall-surface)]"}`}
                       >
                         {tab} term
                       </button>
                     ))}
                   </div>

                   <AnimatePresence mode="wait">
                     <motion.div key={roadmapTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                       {roadmapTab === "near" && (
                         <ul className="space-y-3">
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--hall-primary)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Add real project screenshots to case studies</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--hall-primary)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Expand Homepage V3 case study content</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--hall-primary)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Document AI Studio generation workflow</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--hall-primary)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Improve chess archive interaction module</span></li>
                         </ul>
                       )}
                       {roadmapTab === "mid" && (
                         <ul className="space-y-3">
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--cyan)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Build standalone dedicated case-study pages</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--cyan)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Add real visual process/Figma design screenshots</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--cyan)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Add interactive, draggable project timeline</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--cyan)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Connect project repository data with GitHub Activity API</span></li>
                         </ul>
                       )}
                       {roadmapTab === "long" && (
                         <ul className="space-y-3">
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--purple)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Turn the homepage into an endlessly living personal archive</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--purple)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Add decentralized learning notebooks and Web3 UI prototypes</span></li>
                           <li className="flex gap-3 p-3 bg-white rounded-xl border border-[var(--border)]"><span className="text-[var(--purple)]">❖</span> <span className="text-sm font-medium text-[var(--ink)]">Build deeper custom AI assistant interactions inside the app</span></li>
                         </ul>
                       )}
                     </motion.div>
                   </AnimatePresence>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
