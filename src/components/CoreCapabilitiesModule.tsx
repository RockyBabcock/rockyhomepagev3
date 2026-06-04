import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData } from "../data/techStack";
import { cn } from "../lib/utils";
import { Layers, MonitorSmartphone, Server, Sparkles, Settings, Cpu, Box, Disc, TerminalSquare, Search } from "lucide-react";

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "frontend": return <MonitorSmartphone size={16} />;
    case "backend": return <Server size={16} />;
    case "design": return <Sparkles size={16} />;
    case "devops": return <Settings size={16} />;
    case "ai": return <Cpu size={16} />;
    case "web3": return <Box size={16} />;
    case "creative": return <Disc size={16} />;
    case "tooling": return <TerminalSquare size={16} />;
    default: return <Layers size={16} />;
  }
}

const CATEGORY_ORDER = [
  "frontend",
  "backend",
  "ai",
  "web3",
  "design",
  "creative",
  "devops",
  "tooling",
];

export function CoreCapabilitiesModule() {
  const existingCategories = Array.from(new Set(techStackData.map((t) => t.category)));
  const categories = CATEGORY_ORDER.filter(cat => existingCategories.includes(cat));
  
  const [activeCategory, setActiveCategory] = useState(categories[0] || "frontend");
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  useEffect(() => {
    const tools = techStackData.filter((t) => t.category === activeCategory);
    if (tools.length > 0) {
      setActiveToolId(tools[0].id);
    } else {
      setActiveToolId(null);
    }
  }, [activeCategory]);

  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <div className="relative w-full z-10">
      <div className="mb-8 max-w-2xl text-[var(--ink-soft)] leading-relaxed">
        A living map of the tools, systems, and workflows I use to build interfaces, experiments, and digital spaces.
      </div>
      
      <div className="flex flex-col lg:grid lg:grid-cols-[200px_minmax(0,1.2fr)_280px] gap-6 lg:gap-8 items-start">
        {/* Left Column: Domain Rail */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
            <Search size={12} />
            Domains
          </h3>
          <div className="flex overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar gap-2 lg:flex-col lg:gap-1.5 -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "shrink-0 flex items-center gap-2 px-3 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-300 text-left w-full",
                    isActive 
                      ? "bg-[var(--hall-soft)] text-[var(--hall-primary)] shadow-sm border border-[var(--hall-primary)]/20" 
                      : "text-[var(--ink-soft)] hover:bg-[var(--canvas-soft)] border border-transparent"
                  )}
                >
                  <div className={cn("transition-colors", isActive ? "text-[var(--hall-primary)]" : "text-[var(--ink-muted)]")}>
                    {getCategoryIcon(cat)}
                  </div>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Capability Highlight & Chips */}
        <div className="flex flex-col gap-6 w-full h-full min-h-[300px]">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-0 lg:hidden">
            Capability
          </h3>
          <AnimatePresence mode="wait">
            {activeTool && (
              <motion.div 
                key={activeTool.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="museum-card spectrum-edge flex flex-col p-6 lg:p-8 relative overflow-hidden"
              >
                <h3 className="text-3xl font-space font-bold tracking-tight text-[var(--ink)] mb-4">{activeTool.name}</h3>
                <p className="text-base text-[var(--ink-soft)] mb-6 leading-relaxed bg-[var(--canvas-soft)] p-4 rounded-xl border border-[var(--border)]">{activeTool.description}</p>
                
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">How I use it</h4>
                <ul className="space-y-3 mb-2">
                  {activeTool.evidence?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--ink)]">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--hall-secondary)] shadow-sm" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  )) || (
                    <li className="text-sm text-[var(--ink-soft)]">Applied in core feature workflows and isolated architecture experiments.</li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
             <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3 mt-2">Tools in domain</h4>
             <div className="flex flex-wrap gap-2">
               {techStackData.filter(t => t.category === activeCategory).map((tool) => (
                 <button
                   key={tool.id}
                   onClick={() => setActiveToolId(tool.id)}
                   className={cn(
                     "px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all shadow-sm",
                     activeToolId === tool.id 
                       ? "bg-[var(--hall-soft)] text-[var(--hall-primary)] border-[var(--hall-primary)] ring-1 ring-[var(--hall-primary)]/50"
                       : "bg-white text-[var(--ink-soft)] border-[var(--border)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
                   )}
                 >
                   {tool.name}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Proof Cards */}
        <div className="flex flex-col gap-4 w-full h-full lg:mt-6">
          <AnimatePresence mode="wait">
             {activeTool && (
               <motion.div
                  key={`proofs-${activeTool.id}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
               >
                 {activeTool.usedIn && activeTool.usedIn.length > 0 && (
                   <div className="bg-white/80 backdrop-blur border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--hall-primary)] mb-3 font-semibold">Used In</h4>
                      <div className="flex flex-col gap-2 text-sm text-[var(--ink)]">
                        {activeTool.usedIn.map((item, i) => (
                          <div key={i} className="font-semibold bg-[var(--canvas-soft)] px-3 py-1.5 rounded-lg border border-[var(--border)]">{item}</div>
                        ))}
                      </div>
                   </div>
                 )}
                 
                 {activeTool.learningFocus && (
                   <div className="bg-white/80 backdrop-blur border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--orange)] mb-3 font-semibold">Learning Focus</h4>
                      <p className="text-sm text-[var(--ink-soft)] leading-relaxed italic">{activeTool.learningFocus}</p>
                   </div>
                 )}

                 <div className="bg-white/80 backdrop-blur border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--blue)] mb-3 font-semibold">Proficiency</h4>
                    <p className="text-sm text-[var(--ink)] font-bold">{activeTool.level || "Advanced"}</p>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
