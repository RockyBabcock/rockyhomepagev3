import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronDown, Copy } from "lucide-react";

const visitorRouteElements = [
  { id: "entrance", index: "01", title: "Entrance", subtitle: "Identity + Mission", color: "var(--accent-pink)" },
  { id: "projects", index: "02", title: "Project Laboratory", subtitle: "Builds + Case Studies", color: "var(--accent-blue)" },
  { id: "forge", index: "03", title: "Capability Forge", subtitle: "Arsenal + Skills", color: "var(--accent-orange)" },
  { id: "experiments", index: "04", title: "Experiment Chambers", subtitle: "Creative Tech + AI", color: "var(--accent-purple)" },
  { id: "archives", index: "05", title: "Personal Archives", subtitle: "Chess + Media", color: "var(--accent-cyan)" },
  { id: "garden", index: "06", title: "Digital Garden", subtitle: "Notes + Signals", color: "var(--accent-green)" },
];

export function ProfileModule() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    } else if (id === "entrance") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("braverocky@proton.me");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex flex-col relative z-10 w-full pt-20 lg:pt-32 pb-12 overflow-hidden" id="entrance">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[var(--museum-paper)] -z-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[var(--accent-pink)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent-cyan)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10" style={{ backgroundImage: "linear-gradient(var(--museum-ink) 1px, transparent 1px), linear-gradient(90deg, var(--museum-ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <section className="mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-12">
        {/* 12-COLUMN MAIN ENTRANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left: Identity (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)] flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] shadow-[0_0_8px_var(--accent-orange)] animate-pulse" /> 
              ACTIVE BUILD // 2026
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-5xl sm:text-6xl lg:text-[7rem] font-bold leading-[0.85] tracking-[-0.04em] text-[var(--museum-ink)] mb-6"
            >
              ROCKY<br />BABCOCK
            </motion.h1>

             <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-[var(--ink-soft)] font-bold leading-relaxed border-l-2 border-[var(--border-strong)] pl-4"
            >
              Creative Technologist / <span className="text-[var(--accent-pink)]">AI Interface Builder</span> / Web Systems Explorer
             </motion.h2>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-[var(--ink-soft)] font-medium mb-10 space-y-4"
            >
              <p>
                <strong className="text-[var(--museum-ink)] font-bold">This is a Personal Digital Museum.</strong> It is not a standard portfolio, but a spatial hub bridging creative web design, AI interfaces, robust component architectures, and a personal catalog of ideas.
              </p>
              <p>
                Every wing of this site serves a purpose: proving technical stack viability, documenting case studies, exploring experimental systems, and logging the journey.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-wrap items-center gap-4"
            >
               <button onClick={() => scrollToElement("projects")} aria-label="View Projects"
                 className="flex items-center gap-2 bg-[var(--museum-ink)] text-[var(--museum-paper)] px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-[var(--museum-ink)] focus:ring-offset-2"
               >
                 Enter Museum <ArrowRight className="w-4 h-4" />
               </button>
               
               <button onClick={copyEmail} aria-label="Copy Email"
                 className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[var(--border)] text-[var(--museum-ink)] px-6 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:bg-white hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-[var(--border-strong)] focus:ring-offset-2"
               >
                 {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" /> : <Copy className="w-4 h-4" />}
                 {copiedEmail ? "Signal Copied" : "Open Signal"}
               </button>
            </motion.div>
          </div>

          {/* Right: Live Operating Panel (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center mt-10 lg:mt-0 relative z-10">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[var(--museum-ink)] rounded-[24px] overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-pink)] via-[var(--accent-orange)] to-[var(--accent-cyan)] opacity-80" />
              
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-white/50 tracking-widest uppercase">Live Operating Panel</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--accent-green)] font-bold bg-[var(--accent-green)]/10 px-2 py-0.5 rounded">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" /> ONLINE
                </span>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col gap-6 font-mono text-sm text-white/70">
                 
                 <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Architecture</span>
                      <span className="text-white font-bold text-sm">Modular Matrix</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Current Build</span>
                      <span className="text-white font-bold text-sm">V3.5 Dense</span>
                    </div>
                 </div>

                 <div className="border-b border-white/10 pb-6">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Core Arsenal</span>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind v4", "Motion", "Vite"].map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-bold text-white hover:bg-white/10 transition-colors">{tag}</span>
                      ))}
                    </div>
                 </div>

                 <div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">System Status</span>
                    <ul className="space-y-2 text-xs">
                       <li className="flex items-start gap-2">
                         <span className="text-[var(--accent-orange)] font-bold">~</span>
                         <span>Refining case-study structures</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="text-[var(--accent-cyan)] font-bold">~</span>
                         <span>Upgrading capability forge logic</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="text-[var(--accent-pink)] font-bold">~</span>
                         <span>Polishing architectural hierarchy</span>
                       </li>
                    </ul>
                 </div>
                 
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: Museum Navigation Rail */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full relative py-6 border-y border-[var(--border-strong)] bg-white/40 backdrop-blur-md rounded-2xl flex flex-col items-center overflow-hidden"
        >
          <div className="w-full overflow-x-auto hide-scrollbar px-4">
             <div className="flex min-w-max items-center justify-between gap-6 px-4">
               {visitorRouteElements.map((route, i) => (
                 <div key={route.id} className="flex items-center gap-6 group/nav">
                   <button onClick={() => scrollToElement(route.id)} aria-label={`Go to ${route.title}`}
                     className="flex flex-col text-left py-2 outline-none focus-visible:ring-2 ring-[var(--museum-ink)] ring-offset-4 rounded transition-all"
                   >
                       <span className="font-mono text-[10px] font-bold flex items-center gap-2 mb-1" style={{ color: route.color }}>
                         {route.index}
                       </span>
                       <span className="font-space font-bold text-sm text-[var(--museum-ink)] opacity-80 group-hover/nav:opacity-100 transition-opacity whitespace-nowrap">
                         {route.title}
                       </span>
                   </button>
                   {i !== visitorRouteElements.length - 1 && (
                     <div className="w-12 h-px bg-[var(--border-strong)] opacity-50 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <div className="flex justify-center mt-12 animate-bounce">
           <button aria-label="Scroll Down" onClick={() => scrollToElement("projects")} className="p-3 rounded-full bg-white/50 border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--museum-ink)] transition-colors outline-none focus-visible:ring-2">
              <ChevronDown className="w-5 h-5" />
           </button>
        </div>

      </section>
    </div>
  );
}
