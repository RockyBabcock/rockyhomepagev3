import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useActiveHall } from "../hooks/useActiveHall";

export const sections = [
  {
    id: "entrance",
    label: "Entrance Hall",
    num: "00",
    type: "Museum Engine",
    status: "LIVE",
  },
  {
    id: "curators-select",
    label: "Curator's Selection",
    num: "01",
    type: "Design Archive",
    status: "HOT",
  },
  {
    id: "projects",
    label: "Project Laboratory",
    num: "02",
    type: "Evidence Wall",
    status: "PROOF",
  },
  {
    id: "forge",
    label: "Capability Forge",
    num: "03",
    type: "Technical Reactor",
    status: "HOT",
  },
  {
    id: "experiments",
    label: "Experiment Chambers",
    num: "04",
    type: "Live System",
    status: "LAB",
  },
  {
    id: "archives",
    label: "Personal Archives",
    num: "05",
    type: "Cultural Index",
    status: "ARCHIVE",
  },
  {
    id: "garden",
    label: "Digital Garden",
    num: "06",
    type: "Reading Room",
    status: "WRITING",
  },
  {
    id: "signal",
    label: "Signal Room",
    num: "07",
    type: "Contact Portal",
    status: "LIVE",
  },
];

export function MuseumScrollEngine() {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useActiveHall(sectionIds, "-40% 0px -40% 0px");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] || sections[0];

  return (
    <>
      {/* Background Tone Control Based on Active Hall */}
      <AnimatePresence>
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            backgroundColor:
              activeId === "forge" ? "rgba(62,39,35,0.01)" : "transparent",
          }}
        />
      </AnimatePresence>

      <nav
        className="fixed z-50 left-0 top-1/2 -translate-y-1/2 ml-4 md:ml-8 hidden xl:flex flex-col gap-6"
        aria-label="Museum Hall Tracking Map"
      >
        <div className="flex flex-col gap-4 relative">
          {/* Vertical Scanner Line Background */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-[rgba(62,39,35,0.1)] z-0" />

          {/* Active Scanner Line Indicator */}
          <motion.div
            className="absolute left-[7px] w-px bg-[var(--museum-brown)] z-0 origin-top shadow-[0_0_8px_var(--accent-orange)]"
            initial={false}
            animate={{
              top: `${Math.max(0, (activeIndex / Math.max(1, sections.length - 1)) * 100)}%`,
              height: activeIndex === 0 ? "0%" : "20px",
              y: "-10px",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />

          {sections.map((section, idx) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center gap-4 text-left outline-none"
              >
                {/* Node Icon */}
                <div className="relative z-10 flex items-center justify-center w-[15px] h-[15px]">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-[var(--museum-brown)] scale-150 shadow-[0_0_8px_rgba(62,39,35,0.4)]"
                        : "bg-[var(--museum-text)] opacity-20 group-hover:bg-[var(--museum-brown)] group-hover:opacity-100 group-hover:scale-125",
                    )}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="active-ring"
                      className="absolute inset-0 border border-[var(--museum-brown)] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>

                {/* Desktop Labels */}
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 absolute left-8 w-48",
                    isActive
                      ? "text-[var(--museum-ink)] translate-x-1 opacity-100"
                      : "text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 -translate-x-2",
                  )}
                >
                  <span className="opacity-40 mr-1.5">{section.num}</span>{" "}
                  {section.label}
                </span>

                {/* Active Section Metadata Box */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-8 top-5 border border-[var(--border-strong)] bg-white/80 backdrop-blur shadow-sm p-2 rounded-md flex flex-col gap-1 w-40 pointer-events-none"
                  >
                    <span className="text-[8px] font-mono font-bold tracking-widest text-[var(--ink-muted)] uppercase">
                      Status {activeSection.status}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-wide text-[var(--museum-ink)] uppercase leading-tight">
                      {activeSection.type}
                    </span>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Horizontal Scroll Track */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 xl:hidden overflow-hidden pointer-events-none">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pointer-events-auto bg-[var(--museum-paper)]/90 backdrop-blur-md p-2 rounded-xl border border-[rgba(62,39,35,0.1)] shadow-xl w-full">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex-shrink-0 px-3 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "bg-white text-[var(--museum-ink)] border border-[rgba(62,39,35,0.2)] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--museum-ink)] hover:bg-white/50",
                )}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[var(--museum-brown)] animate-pulse" />
                )}
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
