import { useState } from "react";
import { motion } from "motion/react";

const visitorRouteElements = [
  { id: "entrance", index: "01", title: "Entrance", subtitle: "Identity + museum map", color: "var(--pink)" },
  { id: "projects", index: "02", title: "Projects", subtitle: "Builds + case studies", color: "var(--blue)" },
  { id: "forge", index: "03", title: "Forge", subtitle: "Skills + workflows", color: "var(--orange)" },
  { id: "experiments", index: "04", title: "Experiments", subtitle: "AI + Web3 prototypes", color: "var(--purple)" },
  { id: "archives", index: "05", title: "Archives", subtitle: "Chess + media + memory", color: "var(--pink)" },
  { id: "garden", index: "06", title: "Garden", subtitle: "Notes + ideas", color: "var(--green)" },
  { id: "signal", index: "07", title: "Signal", subtitle: "Contact + links", color: "var(--orange)" },
];

const explorationTrackElements = [
  {
    id: "projects", label: "Build Track", color: "var(--blue)", status: "Active Build", btn: "View Projects",
    desc: "Projects, case studies, implementation stories, and interface systems.",
    bullets: ["Homepage V3 rebuild", "Component architecture", "Visual system experiments"]
  },
  {
    id: "forge", label: "Skill Track", color: "var(--orange)", status: "Currently Expanding", btn: "Explore Forge",
    desc: "Frontend, AI, Web3, design systems, and creative coding.",
    bullets: ["React / TypeScript", "AI interface workflow", "Rainbow design system"]
  },
  {
    id: "archives", label: "Archive Track", color: "var(--pink)", status: "Learning Archive", btn: "Open Archives",
    desc: "Chess, media, memory, personal fragments, and cultural signals.",
    bullets: ["Chess archive", "Media universe", "Personal notes"]
  },
  {
    id: "garden", label: "Garden Track", color: "var(--green)", status: "Under Construction", btn: "Visit Garden",
    desc: "Notes, reflections, unfinished ideas, and future writing.",
    bullets: ["Interface notes", "Learning reflections", "Design thinking"]
  },
  {
    id: "signal", label: "Signal Track", color: "var(--purple)", status: "Open Signal", btn: "Contact Me",
    desc: "Contact, collaboration, external links, and public identity.",
    bullets: ["Email", "GitHub", "Social handle"]
  }
];

export function ProfileModule() {
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    } else if (id === "entrance") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyHandle = async () => {
    await navigator.clipboard.writeText("@braverocky");
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 1600);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("braverocky@proton.me");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1600);
  };

  return (
    <div className="flex flex-col relative z-10 w-full mb-12 lg:mb-16 pt-24 lg:pt-28 hero-entrance-bg">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute bottom-0 left-0 spectrum-rule" />

      <section className="homepage-canvas pb-12 lg:pb-16" id="entrance">
        {/* TOP ROW: Identity (5) + Dashboard (7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Identity Block - 5 Columns */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center relative z-10 p-2 sm:p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)] flex items-center gap-2"
            >
              PERSONAL DIGITAL MUSEUM <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]" /> 2026
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-5xl lg:text-[5.5rem] font-black leading-[0.85] tracking-[-0.055em] text-[var(--ink)] mb-4 lg:mb-6"
            >
              ROCKY<br />BABCOCK
            </motion.h1>

             <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[var(--ink-soft)] font-bold leading-relaxed"
            >
              Creative Technologist · AI Interface Builder<br className="hidden lg:block"/> · Web Systems Explorer
             </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-medium text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] font-medium mb-6"
            >
              <strong className="text-[var(--ink)] font-semibold">I build colorful interfaces, experimental systems, and digital spaces where code, design, and imagination meet.</strong><br aria-hidden="true" className="mb-2 block"/>This homepage is my living digital museum: part portfolio, part archive, part laboratory, and part personal operating system.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="mb-8"
            >
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Active Build", "Creative Technologist", "AI Interfaces", "Web Systems", "Personal Archive"].map(chip => (
                    <span key={chip} className="px-2 py-1 bg-white/60 border border-[var(--border)] text-[var(--ink-muted)] font-mono text-[10px] uppercase font-bold rounded-md tracking-wider">{chip}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5">
                  {[
                    { label: "Halls", val: "7" },
                    { label: "Active Rebuild", val: "1" },
                    { label: "Explo Tracks", val: "5" },
                    { label: "In Progress", val: "V3" }
                  ].map(stat => (
                    <div key={stat.label} className="flex items-baseline gap-1.5">
                      <span className="font-space font-bold text-lg text-[var(--ink)]">{stat.val}</span>
                      <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs font-bold text-[var(--ink)] uppercase tracking-wide border-l-2 border-[var(--pink)] pl-3">
                  This is not a finished portfolio.<br className="hidden sm:block"/> It is a public creative system under active construction.
                </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-wrap gap-4"
            >
               <button onClick={() => scrollToElement("projects")} aria-label="View Projects"
                 className="group/btn relative overflow-hidden rounded-xl bg-[var(--ink)] border border-[var(--ink)] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 inline-block focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--pink)]/20 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                 View Projects
               </button>

               <button onClick={() => scrollToElement("visitor-route")} aria-label="Explore Route"
                 className="rounded-xl border border-[var(--border-strong)] bg-white/60 backdrop-blur-md px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:ring-offset-2"
               >
                 Explore Route
               </button>
            </motion.div>
          </div>

          {/* Entrance Console Dashboard - 7 Columns */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 pt-2 lg:pt-0">
            
            {/* 1. Museum Passport */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="museum-card p-5 lg:p-6 bg-white/80 backdrop-blur-md group hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden border border-[var(--border)] rounded-xl flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--blue)] opacity-50 group-hover:opacity-100 transition-colors" />
               <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--blue)] mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" /> Museum Passport
               </h3>
               <div className="flex flex-col gap-3 flex-1 justify-between">
                 <div className="flex justify-between items-baseline gap-2 pb-2 border-b border-[var(--border)]">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Name</span>
                   <span className="font-medium text-sm text-[var(--ink)]">Rocky Babcock</span>
                 </div>
                 <div className="flex justify-between items-baseline gap-2 pb-2 border-b border-[var(--border)]">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Role</span>
                   <span className="font-medium text-sm text-[var(--ink)]">Creative Technologist</span>
                 </div>
                 <div className="flex justify-between items-baseline gap-2 pb-2 border-b border-[var(--border)]">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Mode</span>
                   <span className="font-mono text-[11px] font-bold text-[var(--blue)] bg-[var(--blue)]/10 px-2 py-0.5 rounded">Active Build</span>
                 </div>
                 <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Direction</span>
                   <span className="font-medium text-sm text-[var(--ink)]">Warm Rainbow Museum</span>
                 </div>
                 <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Medium</span>
                   <span className="font-medium text-sm text-[var(--ink)]">React / TS / Motion</span>
                 </div>
                 <div className="flex justify-between items-baseline gap-2">
                   <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Zone</span>
                   <span className="font-medium text-sm text-[var(--ink)]">Personal Digital Museum</span>
                 </div>
               </div>
            </motion.div>

            {/* 2. Current Status */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="museum-card p-5 lg:p-6 bg-white/80 backdrop-blur-md group hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden border border-[var(--border)] rounded-xl flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--cyan)] opacity-50 group-hover:opacity-100 transition-colors" />
               <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--cyan)] mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" /> Current Status
               </h3>
               <div className="flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Status</span>
                    <span className="font-medium text-sm text-[var(--ink)]">Currently Expanding</span>
                  </div>
                  <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Focus</span>
                    <span className="font-medium text-sm text-[var(--ink)]">Content Density</span>
                  </div>
                  <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Visual Pass</span>
                    <span className="font-medium text-sm text-[var(--ink)]">Rainbow System</span>
                  </div>
                  <div className="flex flex-col gap-1 pb-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Build Mode</span>
                    <span className="font-medium text-sm text-[var(--ink)]">Public Iteration</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold">Priority</span>
                    <span className="font-medium text-sm text-[var(--ink)]">Hero + Project Density</span>
                  </div>
               </div>
            </motion.div>

            {/* 3. Focus Stack */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="museum-card p-5 lg:p-6 bg-white/80 backdrop-blur-md group hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden border border-[var(--border)] rounded-xl flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--pink)] opacity-50 group-hover:opacity-100 transition-colors" />
               <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--pink)] mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)]" /> Focus Stack
               </h3>
               <ul className="space-y-3 flex-1 flex flex-col justify-center">
                  {[
                    {name: "React", desc: "component architecture"},
                    {name: "TypeScript", desc: "safer interface logic"},
                    {name: "Tailwind", desc: "visual system iteration"},
                    {name: "Motion", desc: "interaction & presence"},
                    {name: "Vercel", desc: "deployment workflow"},
                    {name: "AI Studio", desc: "AI-assisted prototyping"}
                  ].map(s => (
                    <li key={s.name} className="flex gap-2 text-xs">
                      <span className="font-bold text-[var(--ink)] min-w-[75px]">{s.name}</span>
                      <span className="text-[var(--ink-soft)] font-medium leading-snug">{s.desc}</span>
                    </li>
                  ))}
               </ul>
            </motion.div>

            {/* 4. Quick Actions */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="museum-card p-5 lg:p-6 bg-white/80 backdrop-blur-md group/parent hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden border border-[var(--border)] rounded-xl flex flex-col h-full"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--orange)] opacity-50 group-hover/parent:opacity-100 transition-colors" />
               <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--orange)] mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange)]" /> Quick Actions
               </h3>
               <div className="flex flex-col gap-2.5 flex-1 justify-center relative">
                  <button onClick={() => scrollToElement("projects")} aria-label="View Projects button" className="text-left text-sm font-bold text-[var(--ink)] hover:text-[var(--blue)] hover:border-[var(--blue)] transition-colors flex justify-between items-center bg-white border border-[var(--border)] px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--blue)] outline-none group">
                    View Projects <span className="text-[var(--ink-muted)] group-hover:text-[var(--blue)] group-hover:translate-x-0.5 transition-all">→</span>
                  </button>
                  <button onClick={() => scrollToElement("visitor-route")} aria-label="Explore Route map button" className="text-left text-sm font-bold text-[var(--ink)] hover:text-[var(--pink)] hover:border-[var(--pink)] transition-colors flex justify-between items-center bg-white border border-[var(--border)] px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--pink)] outline-none group">
                    Explore Route <span className="text-[var(--ink-muted)] group-hover:text-[var(--pink)] group-hover:translate-x-0.5 transition-all">→</span>
                  </button>
                  <button onClick={copyHandle} aria-label="Copy twitter handle" className="text-left text-sm font-bold text-[var(--ink)] hover:text-[var(--orange)] hover:border-[var(--orange)] transition-colors flex justify-between items-center bg-white border border-[var(--border)] px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--orange)] outline-none group">
                    {copiedHandle ? <span className="text-[var(--orange)]">Copied!</span> : "Copy Handle"} <span className={`text-[var(--ink-muted)] transition-colors ${copiedHandle ? "text-[var(--orange)]" : "group-hover:text-[var(--orange)]"}`}>@</span>
                  </button>
                  <button onClick={copyEmail} aria-label="Copy email address" className="text-left text-sm font-bold text-[var(--ink)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors flex justify-between items-center bg-white border border-[var(--border)] px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-[var(--cyan)] outline-none group">
                    {copiedEmail ? <span className="text-[var(--cyan)]">Copied!</span> : "Copy Email"} <span className={`text-[var(--ink-muted)] transition-colors ${copiedEmail ? "text-[var(--cyan)]" : "group-hover:text-[var(--cyan)]"}`}>✉</span>
                  </button>
               </div>
            </motion.div>
          </div>
        </div>

        {/* SECOND ROW: Quest & Proof Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Current Quest */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-1 lg:col-span-6 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-xl border border-[var(--border)] border-l-4 border-l-[var(--orange)] group hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden flex flex-col"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-[var(--yellow)] opacity-10 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity" />
            
            <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--orange)] mb-4 flex items-center gap-2">
               Current Quest
            </h3>
            
            <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed mb-4">
              <strong className="text-[var(--ink)]">I am turning this homepage from a normal portfolio into a living personal museum.</strong> The current focus is content density: richer project stories, stronger section identities, more personal archive material, and a warmer rainbow visual language.
            </p>
            <p className="text-sm font-medium text-[var(--ink)] leading-relaxed italic border-l-2 border-[var(--yellow)] pl-4 mb-4">
              This build is not pretending to be finished. It is a visible process.
            </p>

            <div className="mt-2 pt-4 border-t border-[var(--border)] mb-6 relative z-10 w-full pl-0">
               <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--orange)] block mb-3 font-bold">Current Priorities</span>
               <ul className="text-xs font-medium text-[var(--ink-soft)] space-y-2">
                  <li className="flex items-start gap-1.5"><span className="text-[var(--orange)] mt-0.5 font-bold">•</span> Richer homepage density</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--orange)] mt-0.5 font-bold">•</span> Deeper project storytelling</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--orange)] mt-0.5 font-bold">•</span> Stronger visual rhythm</li>
               </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
               {["Active Build", "Layout Pass", "Content Expansion", "Rainbow System"].map(badge => (
                  <span key={badge} className="px-2.5 py-1 bg-[var(--orange)]/10 text-[var(--orange)] border border-[var(--orange)]/20 font-mono text-[10px] rounded font-bold uppercase tracking-wider">{badge}</span>
               ))}
            </div>
          </motion.div>

          {/* Proof Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="col-span-1 lg:col-span-6 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-xl border border-[var(--border)] border-l-4 border-l-[var(--purple)] group hover:-translate-y-0.5 hover:shadow-md transition-all relative overflow-hidden flex flex-col"
          >
             <div className="absolute left-0 bottom-0 w-32 h-32 bg-[var(--cyan)] opacity-10 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity" />

             <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--purple)]">
                 Proof Preview
               </h3>
               <span className="font-space font-bold text-[var(--ink)] text-sm">Rocky Homepage V3</span>
             </div>

             <div className="mb-5">
                <p className="text-xs font-medium text-[var(--ink-soft)] leading-relaxed"><strong className="text-[var(--ink)] font-bold">Problem:</strong> Most portfolios feel generic, narrow, and forgettable.</p>
                <p className="text-xs font-medium text-[var(--ink-soft)] mt-2 leading-relaxed"><strong className="text-[var(--ink)] font-bold">Build:</strong> A modular digital museum with project halls, capability systems, personal archives, live proof, and a colorful interface language.</p>
             </div>

             <div className="mt-auto pt-4 border-t border-[var(--border)] relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--cyan)] block mb-3 font-bold">What this proves</span>
                   <ul className="text-xs font-medium text-[var(--ink-soft)] space-y-2">
                      <li className="flex items-start gap-1.5"><span className="text-[var(--purple)] mt-0.5 font-bold">•</span> React component architecture</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--cyan)] mt-0.5 font-bold">•</span> Visual system thinking</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--purple)] mt-0.5 font-bold">•</span> AI-assisted iteration workflow</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--cyan)] mt-0.5 font-bold">•</span> Personal branding via design</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--purple)] mt-0.5 font-bold">•</span> Responsive layout design</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--cyan)] mt-0.5 font-bold">•</span> Component-based systems</li>
                   </ul>
                 </div>
                 <div>
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--purple)] block mb-3 font-bold">Next Steps</span>
                   <ul className="text-xs font-medium text-[var(--ink-soft)] space-y-2">
                      <li className="flex items-start gap-1.5"><span className="text-[var(--cyan)] mt-0.5 font-bold">•</span> Expand project evidence</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--purple)] mt-0.5 font-bold">•</span> Improve module richness</li>
                      <li className="flex items-start gap-1.5"><span className="text-[var(--cyan)] mt-0.5 font-bold">•</span> Connect Hero downstream</li>
                   </ul>
                 </div>
             </div>
          </motion.div>
        </div>

        {/* THIRD ROW: Visitor Route */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
          id="visitor-route" className="w-full relative py-5 lg:py-6 my-4 lg:my-6 border border-[var(--border)] bg-white/50 backdrop-blur-sm rounded-xl flex flex-col items-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 spectrum-rule opacity-60" />
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-4 text-center mt-2">Visitor Route</h3>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-4 relative z-10 w-full">
            {visitorRouteElements.map((route, i) => (
              <div key={route.id} className="flex items-center gap-2 sm:gap-3 shrink-0 lg:flex-1 w-[140px] lg:w-auto">
                <button onClick={() => scrollToElement(route.id)} aria-label={`Go to ${route.title}`}
                  className="flex flex-col text-left px-3 py-2.5 w-full rounded-xl bg-white border border-[var(--border)] hover:border-[var(--ink-muted)] hover:-translate-y-0.5 hover:shadow-sm transition-all focus:outline-none focus:ring-2 group/route"
                  style={{'--tw-ring-color': route.color} as any}
                >
                    <span className="font-mono text-[10px] font-bold opacity-60 mb-1" style={{color: route.color}}>{route.index}</span>
                    <span className="font-space font-bold text-sm text-[var(--ink)] group-hover/route:text-[var(--ink)] transition-colors leading-tight mb-0.5">{route.title}</span>
                    <span className="text-[10px] font-medium text-[var(--ink-soft)] transition-colors leading-tight line-clamp-1">{route.subtitle}</span>
                </button>
                {i !== visitorRouteElements.length - 1 && <span className="font-mono text-lg text-[var(--ink-muted)] opacity-30 mx-auto hidden lg:block shrink-0">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOURTH ROW: Exploration Tracks */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
           className="mt-2 lg:mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {explorationTrackElements.map(track => (
               <div key={track.id} className="museum-card bg-white/80 backdrop-blur-sm group hover:-translate-y-1 hover:shadow-md transition-all p-5 lg:p-6 rounded-xl relative overflow-hidden flex flex-col h-full border border-[var(--border)]">
                  <div className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-colors" style={{backgroundColor: track.color}} />
                  
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest mb-3" style={{color: track.color}}>{track.label}</h4>
                  <p className="text-xs text-[var(--ink)] font-bold mb-4 leading-relaxed flex-none">{track.desc}</p>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                     {track.bullets.map(b => (
                        <li key={b} className="flex items-start gap-1.5 text-xs text-[var(--ink-soft)] font-medium leading-tight">
                           <span className="font-bold -translate-y-[1px]" style={{color: track.color}}>•</span> {b}
                        </li>
                     ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3 mt-auto">
                     <span className="inline-block px-2.5 py-1 rounded-full bg-[var(--canvas)] text-[10px] font-mono font-bold w-fit border border-[var(--border)] tracking-wider" style={{color: track.color}}>{track.status}</span>
                     <button onClick={() => scrollToElement(track.id)} aria-label={track.btn}
                       className="w-full text-center py-2.5 rounded-xl bg-white border border-[var(--border)] text-xs font-bold text-[var(--ink)] transition-colors focus:ring-2 outline-none" 
                       style={{'--tw-ring-color': track.color} as any} 
                       onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = track.color; e.currentTarget.style.color = '#fff'; }} 
                       onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--ink)'; }}
                     >
                       {track.btn}
                     </button>
                  </div>
               </div>
            ))}
          </div>
        </motion.div>

      </section>
    </div>
  );
}
