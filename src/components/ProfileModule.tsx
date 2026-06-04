import { useState } from "react";
import { motion } from "motion/react";

// Data
const museumMap = [
  { id: "projects", label: "Project Laboratory", desc: "Selected builds, case studies, and implementation stories.", color: "var(--blue)" },
  { id: "forge", label: "Capability Forge", desc: "Tools, workflows, skills, and proof-of-work.", color: "var(--orange)" },
  { id: "experiments", label: "Experiment Chambers", desc: "AI interfaces, Web3 prototypes, and playful technical experiments.", color: "var(--purple)" },
  { id: "archives", label: "Personal Archives", desc: "Chess, media, memories, identity fragments, and personal signals.", color: "var(--pink)" },
  { id: "garden", label: "Digital Garden", desc: "Notes, reflections, unfinished ideas, and future writing.", color: "var(--green)" },
  { id: "signal", label: "Signal Room", desc: "Contact, collaboration, and external links.", color: "var(--orange)" },
];

export function ProfileModule() {
  const [copied, setCopied] = useState(false);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyHandle = async () => {
    await navigator.clipboard.writeText("@braverocky");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex flex-col relative z-10 w-full mb-16 lg:mb-24 pt-24 lg:pt-32 hero-entrance-bg">
      {/* Texture overlay (if any) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute bottom-0 left-0 spectrum-rule" />

      <section className="homepage-canvas">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-16">
          
          {/* Identity Statement - 6 Columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-8 relative z-10 lg:pl-4 mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]"
            >
              PERSONAL DIGITAL MUSEUM / {new Date().getFullYear()}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-6xl lg:text-[7.5rem] font-black leading-[0.80] tracking-[-0.055em] text-[var(--ink)] mb-6"
            >
              ROCKY
              <br />
              BABCOCK
            </motion.h1>

             <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-[var(--ink-soft)] font-semibold leading-relaxed"
            >
              Creative Technologist · AI Interface Builder<br className="hidden lg:block"/> · Web Systems Explorer
             </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl text-base lg:text-lg leading-relaxed text-[var(--ink-soft)] font-medium mb-8"
            >
              I build colorful interfaces, experimental systems, and digital spaces where code, design, and imagination meet. This homepage is my living digital museum: part portfolio, part archive, part laboratory, and part personal operating system.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-wrap gap-4"
            >
               <button
                 onClick={() => scrollToElement("projects")}
                 aria-label="View Projects"
                 className="group relative overflow-hidden rounded-full bg-[var(--ink)] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[var(--ink)]/10 transition hover:-translate-y-0.5 inline-block focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                 View Projects
               </button>

               <button
                 onClick={() => scrollToElement("forge")}
                 aria-label="Explore Museum map"
                 className="rounded-full border border-[var(--border-strong)] bg-white/50 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2"
               >
                 Explore Museum map
               </button>
            </motion.div>
          </div>

          {/* Current Build - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
            className="col-span-1 lg:col-span-3 museum-card bg-white/70 p-6 lg:p-8 flex flex-col group transition-all hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--pink)] opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-4 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--pink)]" /> Current Build
            </h3>
            <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed mb-4">
              I am rebuilding this homepage into a warmer, wider, rainbow-like digital museum. The goal is not only to show projects, but to create an interface that expresses my taste, learning path, technical experiments, and personal world.
            </p>
            <div className="mt-auto pt-4 border-t border-transparent group-hover:border-[var(--border)] transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--pink)] block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Priorities</span>
                <ul className="text-xs font-medium text-[var(--ink-soft)] space-y-1">
                   <li>- Enrich content density</li>
                   <li>- Improve rainbow system</li>
                   <li>- Expand case studies</li>
                   <li>- Add personal archives</li>
                </ul>
            </div>
          </motion.div>

          {/* Quick Status - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
            className="col-span-1 lg:col-span-3 museum-card-strong bg-[var(--ink)] text-white p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--cyan)] opacity-70 group-hover:opacity-100 transition-opacity z-20" />
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
             
             <div className="relative z-10 space-y-5">
                <div>
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Mode</h3>
                   <div className="flex items-center gap-2.5">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]"></span>
                     </span>
                     <span className="text-sm font-mono font-bold text-[var(--green)]">Active Build</span>
                   </div>
                </div>
                <div>
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Focus</h3>
                   <span className="text-sm font-medium text-white/90">Rocky Homepage V3</span>
                </div>
                <div>
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Status</h3>
                   <span className="text-sm font-medium text-[var(--cyan)]">Currently Expanding</span>
                </div>
                <div>
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Stack</h3>
                   <div className="flex flex-wrap gap-1.5">
                     {["React", "TypeScript", "Tailwind", "Motion", "AI Studio"].map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/10 rounded text-white/90 border border-white/5">{tag}</span>
                     ))}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Museum Map - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/70 hover:shadow-md hover:-translate-y-1 transition-all group overflow-hidden relative"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--blue)] opacity-50 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-5 border-b border-[var(--border)] pb-3 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" /> Museum Map
             </h3>
             <ul className="space-y-4">
                {museumMap.map((item, i) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToElement(item.id)} className="text-left group/btn flex flex-col focus:outline-none w-full hover:bg-[var(--canvas-soft)] p-2 -mx-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-2 mb-0.5">
                         <span className="font-mono text-[10px] font-bold text-[var(--ink-muted)] group-hover/btn:text-[var(--blue)] transition-colors">0{i+1}.</span>
                         <span className="font-space font-bold text-sm text-[var(--ink)] group-hover/btn:text-[var(--blue)] transition-colors">{item.label}</span>
                      </div>
                      <span className="text-xs text-[var(--ink-soft)] pl-6 cursor-pointer">
                        {item.desc}
                      </span>
                    </button>
                  </li>
                ))}
             </ul>
          </motion.div>
          
          {/* Design Manifesto - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/70 hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--orange)] opacity-50 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-5 border-b border-[var(--border)] pb-3 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" /> Design Manifesto
             </h3>
             <ul className="space-y-4 mb-4">
               {[
                 "Interfaces should feel alive.",
                 "Personal websites should show personality, not only credentials.",
                 "Color should guide emotion and navigation.",
                 "Every module should justify its existence.",
                 "A homepage can be a museum, not just a resume."
               ].map((text, i) => (
                 <li key={i} className="text-sm font-medium text-[var(--ink-soft)] flex items-start gap-3">
                    <span className="font-mono text-[10px] text-[var(--orange)] mt-0.5 font-bold">0{i+1}</span>
                    <span className="leading-snug">{text}</span>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Active Experiments - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/70 hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--purple)] opacity-50 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-5 border-b border-[var(--border)] pb-3 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)]" /> Active Experiments
             </h3>
             <ul className="space-y-4">
                {[
                  { title: "Rainbow Interface System", text: "Building a warmer color language for the homepage." },
                  { title: "AI Studio Workflow", text: "Using AI-assisted iteration to reshape layout, copy, and interaction." },
                  { title: "Web3 Learning Archive", text: "Collecting early interface patterns around wallets, identity, and ownership." },
                  { title: "Personal Archive Expansion", text: "Turning chess, media, notes, and memories into interactive exhibits." }
                ].map((exp, i) => (
                  <li key={i} className="text-sm font-medium group/exp">
                     <span className="text-[var(--ink)] flex items-center gap-2 font-semibold">
                       <span className="w-1 h-1 rounded-full bg-[var(--border-strong)] group-hover/exp:bg-[var(--purple)] transition-colors" /> {exp.title}
                     </span>
                     <span className="text-[var(--ink-soft)] block text-xs mt-1 pl-3 leading-snug">{exp.text}</span>
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* Focus Stack - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/70 hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--cyan)] opacity-50 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-5 border-b border-[var(--border)] pb-3 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" /> Focus Stack
             </h3>
             <ul className="space-y-3">
                {[
                  { name: "React", desc: "component architecture" },
                  { name: "TypeScript", desc: "safer interface logic" },
                  { name: "Tailwind", desc: "fast visual system iteration" },
                  { name: "Motion", desc: "subtle interaction & presence" },
                  { name: "AI Studio", desc: "AI-assisted prototyping" },
                  { name: "Vercel", desc: "live deployment workflow" }
                ].map((stack, i) => (
                  <li key={i} className="text-sm font-medium flex flex-wrap items-baseline gap-x-2">
                     <span className="text-[var(--ink)] font-bold">{stack.name}</span>
                     <span className="text-[var(--ink-muted)] hidden xs:inline">—</span>
                     <span className="text-[var(--ink-soft)] text-xs">{stack.desc}</span>
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* Build Log Preview - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/70 hover:shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-[var(--green)] opacity-50 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-bold mb-5 border-b border-[var(--border)] pb-3 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> Build Log Preview
             </h3>
             <div className="space-y-5 flex-1">
                {[
                  "Rebuilding Homepage V3 into a wider rainbow museum layout.",
                  "Fixing sparse homepage content by adding richer project stories and personal archive modules.",
                  "Moving from narrow centered layout to a wider 90% content canvas."
                ].map((log, i) => (
                  <div key={i} className="text-sm font-medium relative pl-4">
                     <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full border border-[var(--green)] bg-white" />
                     <span className="font-mono text-[10px] font-bold text-[var(--ink-muted)] block mb-0.5">JUNE 2026</span>
                     <span className="text-[var(--ink-soft)] leading-snug block">{log}</span>
                  </div>
                ))}
             </div>
          </motion.div>

          {/* Quick Actions - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col gap-4"
          >
             <button
               onClick={() => scrollToElement("projects")}
               className="museum-card w-full p-6 text-left hover:shadow-md hover:-translate-y-1 transition-all group focus:outline-none flex justify-between items-center bg-white relative overflow-hidden"
             >
               <div className="absolute left-0 top-0 w-1 h-full bg-[var(--blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="font-space font-bold text-[var(--ink)]">View Projects</span>
               <span className="font-mono text-xl text-[var(--ink-muted)] group-hover:text-[var(--blue)] group-hover:translate-x-1 transition-all">→</span>
             </button>

             <button
               onClick={() => scrollToElement("signal")}
               className="museum-card w-full p-6 text-left hover:shadow-md hover:-translate-y-1 transition-all group focus:outline-none flex justify-between items-center bg-white relative overflow-hidden"
             >
               <div className="absolute left-0 top-0 w-1 h-full bg-[var(--orange)] opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="font-space font-bold text-[var(--ink)]">Send Signal</span>
               <span className="font-mono text-xl text-[var(--ink-muted)] group-hover:text-[var(--orange)] group-hover:translate-x-1 transition-all">→</span>
             </button>

             <button
               onClick={copyHandle}
               className="museum-card w-full p-6 text-left hover:shadow-md hover:-translate-y-1 transition-all group focus:outline-none flex justify-between items-center bg-white mt-auto relative overflow-hidden"
             >
               <div className="absolute left-0 top-0 w-1 h-full bg-[var(--pink)] opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="font-space font-bold text-[var(--ink)]">
                 {copied ? "Copied!" : "Copy @braverocky"}
               </span>
               <span className="text-[var(--ink-muted)] group-hover:text-[var(--pink)] group-hover:scale-110 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
               </span>
             </button>
          </motion.div>
          
        </div>
      </section>
    </div>
  );
}
