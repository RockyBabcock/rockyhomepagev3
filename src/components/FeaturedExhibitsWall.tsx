import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { exhibitIndex, Exhibit } from "../data/exhibitIndex";

const statusColors: Record<string, string> = {
  HOT: "text-[#ff2e88] bg-[#ff2e88]/10 border-[#ff2e88]/20",
  LIVE: "text-[#06d6a0] bg-[#06d6a0]/10 border-[#06d6a0]/20",
  LAB: "text-[#00c2ff] bg-[#00c2ff]/10 border-[#00c2ff]/20",
  PROOF: "text-[#8338ec] bg-[#8338ec]/10 border-[#8338ec]/20",
  ARCHIVE: "text-[#ff9f1c] bg-[#ff9f1c]/10 border-[#ff9f1c]/20",
  WRITING:
    "text-[var(--museum-brown)] bg-[var(--museum-brown)]/10 border-[var(--museum-brown)]/20",
  "CURRENT BUILD":
    "text-[var(--museum-ink)] bg-[var(--museum-ink)]/10 border-[var(--museum-ink)]/20",
};

export function FeaturedExhibitsWall() {
  return (
    <div className="featured-exhibits-wall flex flex-col gap-8 md:gap-12 w-full max-w-7xl mx-auto py-8">
      <div className="flex flex-col gap-2 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--museum-brown)]/20" />
        <h2 className="text-sm font-mono uppercase font-bold tracking-[0.2em] text-[var(--museum-ink)] pl-4">
          Curator's Selection
        </h2>
        <p className="text-xs font-mono text-[var(--ink-soft)] uppercase tracking-widest pl-4">
          Featured Exhibits / Status Overview
        </p>
      </div>

      <div className="exhibit-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-max">
        {exhibitIndex.map((exhibit) => {
          const isLarge = exhibit.layoutSize === "large";
          const isWide = exhibit.layoutSize === "wide";

          return (
            <a
              key={exhibit.id}
              href={exhibit.href}
              className={cn(
                "exhibit-card group relative p-6 md:p-8 flex flex-col bg-[var(--museum-paper)] border border-[rgba(62,39,35,0.12)] hover:border-[rgba(62,39,35,0.32)] transition-all duration-500 overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--museum-brown)]",
                isLarge ? "md:col-span-2 md:row-span-2 min-h-[400px]" : "",
                isWide
                  ? "md:col-span-4 min-h-[200px]"
                  : "md:col-span-1 min-h-[300px]",
                "flex justify-between items-start",
              )}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: exhibit.accent }}
              />

              <div className="w-full flex-1 flex flex-col z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <span className="exhibit-meta text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                    {exhibit.type}
                  </span>

                  <span
                    className={cn(
                      "exhibit-status px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-widest border",
                      statusColors[exhibit.status] ||
                        "text-[var(--museum-ink)] bg-white border-[rgba(62,39,35,0.1)]",
                    )}
                  >
                    {exhibit.status}
                  </span>
                </div>

                <h3
                  className={cn(
                    "font-space font-bold tracking-tight text-[var(--museum-ink)] mb-3 group-hover:text-[var(--museum-brown)] transition-colors",
                    isLarge ? "text-4xl" : "text-2xl",
                  )}
                >
                  {exhibit.title}
                </h3>

                <p
                  className={cn(
                    "font-sans text-[var(--ink-soft)] leading-relaxed mb-6",
                    isLarge ? "text-lg max-w-md" : "text-sm line-clamp-3",
                  )}
                >
                  {exhibit.summary}
                </p>

                <div className="mt-auto pt-6 border-t border-[rgba(62,39,35,0.06)] flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)] flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-[var(--museum-brown)]" />{" "}
                      Proof Signal
                    </span>
                    <span className="text-xs font-medium font-sans text-[var(--ink-soft)]">
                      {exhibit.proofSignal}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {exhibit.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(62,39,35,0.04)] text-[var(--ink-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {exhibit.tags.length > 3 && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(62,39,35,0.04)] text-[var(--ink-muted)]">
                        +{exhibit.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover effect bottom border */}
              <div
                className="absolute bottom-0 left-0 h-1 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: "var(--museum-brown)" }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
