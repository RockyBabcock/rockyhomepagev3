import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const sections = [
  { id: "entrance", label: "Entrance Hall", num: "00" },
  { id: "curators-select", label: "Curator's Selection", num: "01" },
  { id: "projects", label: "Project Laboratory", num: "02" },
  { id: "forge", label: "Capability Forge", num: "03" },
  { id: "experiments", label: "Experiment Chambers", num: "04" },
  { id: "archives", label: "Personal Archives", num: "05" },
  { id: "garden", label: "Digital Garden", num: "06" },
  { id: "signal", label: "Signal Room", num: "07" },
];

export function MuseumScrollMap() {
  const [activeSection, setActiveSection] = useState("entrance");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, get the one closest to the top
          const closest = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRect.top > prev.intersectionRect.top ? curr : prev,
          );
          setActiveSection(closest.target.id);
        }
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: 0 },
    );

    // Observe entrance wrapper
    const entranceWrapper = document.getElementById("entrance-wrapper");
    if (entranceWrapper) observer.observe(entranceWrapper);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="museum-scroll-map fixed top-1/2 -translate-y-1/2 left-4 z-50 flex-col gap-6 hidden xl:flex pointer-events-none">
      <div className="bg-[var(--museum-paper)]/80 backdrop-blur-md p-4 rounded-2xl border border-[var(--border)] shadow-sm pointer-events-auto">
        <div className="absolute left-[23px] top-8 bottom-8 w-px bg-[var(--line-soft)]" />
        <motion.div
          className="absolute left-[23px] top-8 w-px bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]"
          initial={false}
          animate={{
            height: `${
              Math.max(
                0,
                sections.findIndex((s) => s.id === activeSection),
              ) *
              (100 / (sections.length - 1))
            }%`,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        <div className="flex flex-col gap-6">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                className="relative flex items-center group"
              >
                <a
                  href={`#${section.id === "entrance" ? "" : section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el =
                      section.id === "entrance"
                        ? document.getElementById("entrance-wrapper")
                        : document.getElementById(section.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="flex items-center gap-4 z-10 py-1"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[var(--museum-paper)]",
                      isActive
                        ? "border-[var(--orange)] shadow-[0_0_12px_rgba(255,159,28,0.4)]"
                        : "border-[var(--line-strong)] hover:border-[var(--ink)]",
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        isActive
                          ? "bg-[var(--orange)] scale-100"
                          : "bg-transparent scale-0",
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col transition-all duration-300 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100",
                      isActive ? "opacity-100 translate-x-0" : "",
                    )}
                  >
                    <span className="text-[9px] font-mono font-bold text-[var(--ink-muted)] mb-0.5">
                      HALL {section.num}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-mono tracking-widest uppercase transition-colors whitespace-nowrap",
                        isActive
                          ? "text-[var(--ink)] font-bold"
                          : "text-[var(--ink-soft)] font-medium",
                      )}
                    >
                      {section.label}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
