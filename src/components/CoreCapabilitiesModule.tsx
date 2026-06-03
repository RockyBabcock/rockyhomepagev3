import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData, categoryColors, TechItem } from "../data/techStack";
import { cn } from "../lib/utils";
import { Code, Box, Server, Sparkles, MonitorSmartphone, Cpu, TerminalSquare, Search, ChevronRight } from "lucide-react";

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "Frontend": return <MonitorSmartphone size={16} />;
    case "Systems": return <Server size={16} />;
    case "Design": return <Sparkles size={16} />;
    case "AI": return <Cpu size={16} />;
    case "Web3": return <Box size={16} />;
    case "Tools": return <TerminalSquare size={16} />;
    default: return <Code size={16} />;
  }
}

export function CoreCapabilitiesModule() {
  const categories = ["Frontend", "AI", "Design", "Systems", "Web3", "Tools"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  useEffect(() => {
    const tools = techStackData.filter((t) => t.category === activeCategory);
    if (tools.length > 0) {
      setActiveToolId(tools[0].id);
    } else {
      setActiveToolId(null);
    }
  }, [activeCategory]);

  const categoryColor = categoryColors[activeCategory]?.pri || "#3A86FF";
  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <div className="relative w-full z-10 text-slate-800">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[2rem]">
         <motion.div 
            animate={{ backgroundColor: `${categoryColor}15` }}
            transition={{ duration: 1 }}
            className="absolute -top-10 -right-10 w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply opacity-50" 
         />
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/65 backdrop-blur-xl shadow-sm p-5 sm:p-6 lg:p-7 relative z-10 w-full transition-colors duration-500">
        
        {/* Responsive Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px] gap-6 lg:gap-8 xl:gap-10">
           
           {/* Column 1: Categories & List */}
           <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-2">
                  <Search size={12} />
                  Domains
                </h3>
                {/* Horizontal scroll on mobile, wrap on tablet, stack on desktop */}
                <div className="flex overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar gap-2 lg:flex-col lg:gap-1.5 -mx-2 px-2 lg:mx-0 lg:px-0">
                  {categories.map((cat) => {
                    const color = categoryColors[cat]?.pri || "#3A86FF";
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "shrink-0 flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-300 text-left",
                          isActive 
                            ? "bg-white text-slate-900 shadow-sm border border-slate-200/60" 
                            : "text-slate-500 hover:bg-white/50 border border-transparent"
                        )}
                      >
                         <div style={{ color: isActive ? color : undefined }} className="transition-colors">
                           {getCategoryIcon(cat)}
                         </div>
                         {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 hidden lg:block">
                  Capabilities
                </h3>
                <div className="flex overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar gap-2 lg:flex-col lg:gap-1.5 -mx-2 px-2 lg:mx-0 lg:px-0">
                   {techStackData.filter((t) => t.category === activeCategory).map((tool) => {
                     const isActive = activeToolId === tool.id;
                     return (
                       <button
                         key={tool.id}
                         onClick={() => setActiveToolId(tool.id)}
                         className={cn(
                           "shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-all text-left",
                           isActive 
                             ? "bg-slate-900 text-white shadow-md pointer-events-none" 
                             : "bg-white/40 text-slate-700 border border-white/60 hover:bg-white"
                         )}
                         style={{
                           boxShadow: isActive ? `0 4px 14px ${categoryColor}40` : undefined,
                           backgroundColor: isActive ? categoryColor : undefined,
                         }}
                       >
                         {tool.name}
                       </button>
                     );
                   })}
                   {techStackData.filter((t) => t.category === activeCategory).length === 0 && (
                     <div className="text-sm text-slate-400 italic px-2 py-1">No tools configured</div>
                   )}
                </div>
              </div>
           </div>

           {/* Column 2: Selected Tool Detail */}
           <div className="flex flex-col h-full min-h-[300px]">
               <AnimatePresence mode="wait">
                 {activeTool && (
                   <motion.div 
                     key={activeTool.id}
                     initial={{ opacity: 0, scale: 0.98, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.98, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-md shadow-sm p-6 relative flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                     style={{
                        borderColor: `${categoryColor}30`,
                        boxShadow: `0 8px 32px ${categoryColor}15`,
                     }}
                   >
                       <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: categoryColor }} />
                       
                       <div className="flex items-start justify-between gap-4 mb-4">
                         <div>
                           <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: categoryColor }}>
                             {activeTool.category}
                           </div>
                           <h3 className="text-3xl font-space font-bold tracking-tight text-slate-900">
                             {activeTool.name}
                           </h3>
                         </div>
                         <div
                           className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-sm"
                           style={{
                             background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}05)`,
                             color: categoryColor,
                             border: `1px solid ${categoryColor}30`
                           }}
                         >
                            {getCategoryIcon(activeTool.category)}
                         </div>
                       </div>

                       <p className="text-slate-600 leading-relaxed font-body text-sm mb-5">
                         {activeTool.description}
                       </p>

                       <div className="mb-5">
                         <div className="flex justify-between items-end mb-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Skill Level / <span className="font-semibold text-slate-700">{activeTool.levelLabel}</span></span>
                            <span className="text-xs font-semibold" style={{ color: categoryColor }}>{activeTool.level}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${activeTool.level}%` }}
                               transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                               className="h-full rounded-full" 
                               style={{ backgroundColor: categoryColor }} 
                            />
                         </div>
                       </div>

                       <div className="mb-5 hidden sm:block">
                         <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Main Use Cases</h4>
                         <div className="flex flex-wrap gap-2">
                           {activeTool.useCases.map((uc) => (
                             <span key={uc} className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                               {uc}
                             </span>
                           ))}
                         </div>
                       </div>

                       <div className="mt-auto">
                          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">How I use this</h4>
                          <p className="text-sm text-slate-600 bg-white/60 p-4 rounded-xl border border-slate-100">
                             {activeTool.howIUseThis || `I use ${activeTool.name} to orchestrate component logic and establish resilient ${activeTool.category.toLowerCase()} architectures.`}
                          </p>
                       </div>
                   </motion.div>
                 )}
               </AnimatePresence>
           </div>

           {/* Column 3: Evidence & Proof */}
           <div className="flex flex-col h-full">
               <AnimatePresence mode="wait">
                 {activeTool && (
                   <motion.div 
                     key={activeTool.id}
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     transition={{ duration: 0.2, delay: 0.1 }}
                     className="rounded-[1.5rem] border border-slate-200/60 bg-slate-50/50 p-6 flex flex-col h-full gap-6"
                     style={{
                        borderColor: `${categoryColor}15`,
                     }}
                   >
                     <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-2">
                           Related Project
                        </h4>
                        <div className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm inline-block">
                           {activeTool.relatedProject}
                        </div>
                     </div>

                     <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                           Implementation Proof
                        </h4>
                        <div className="flex items-start gap-2 text-sm text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100">
                           <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
                           <span>{activeTool.implementationProof}</span>
                        </div>
                     </div>

                     <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                           Current Learning Target
                        </h4>
                        <p className="text-sm text-slate-600 italic">
                           "{activeTool.currentLearning}"
                        </p>
                     </div>

                     <div className="mt-auto">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                           Next Improvement Goal
                        </h4>
                        <div className="text-sm font-medium text-slate-700 flex items-start gap-2">
                           <ChevronRight size={16} className="shrink-0 mt-0.5" style={{ color: categoryColor }} />
                           <span>{activeTool.nextTarget}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200/60 hidden sm:flex flex-wrap gap-1.5">
                           {activeTool.stackTags.map(tag => (
                             <span key={tag} className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                               #{tag}
                             </span>
                           ))}
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
           </div>

        </div>
      </div>
    </div>
  );
}
