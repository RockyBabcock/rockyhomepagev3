import React from "react";

export function DesignPrinciplesModule() {
  return (
    <section className="homepage-canvas my-16 lg:my-24">
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="font-space font-bold text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mb-4">
              Design Principles
            </h2>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: "01",
              title: "Interfaces should feel alive",
              desc: "Digital spaces shouldn't feel like generic templates. They need motion, warmth, and intent.",
            },
            {
              id: "02",
              title: "Personal means personal",
              desc: "A personal website should show personality, hobbies, and taste, not only credentials and metrics.",
            },
            {
              id: "03",
              title: "Color guides emotion",
              desc: "Rainbows shouldn't be chaotic. Used strictly, color creates structure, rhythm, and section identity.",
            },
            {
              id: "04",
              title: "Justify existence",
              desc: "Every module, decoration, and animation must have a reason to exist. Reduce noise.",
            },
            {
              id: "05",
              title: "Museum, not resume",
              desc: "Treat the homepage as a curated sequence of exhibits exploring ideas, not just a list of jobs.",
            },
          ].map((principle) => (
            <div
              key={principle.id}
              className="p-6 border border-[var(--border)] rounded-2xl bg-[var(--card)] hover:shadow-sm transition-shadow"
            >
              <span className="font-mono text-xs font-bold text-[var(--pink)] mb-2 block">
                {principle.id}
              </span>
              <h3 className="font-space font-bold text-lg text-[var(--ink)] mb-2">
                {principle.title}
              </h3>
              <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearningMapModule() {
  return (
    <section className="homepage-canvas my-16 lg:my-24">
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="font-space font-bold text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mb-4">
              Learning Map
            </h2>
            <p className="text-[var(--ink-soft)] leading-relaxed text-lg">
              The paths I am actively exploring and building within.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Frontend Systems",
                desc: "React, TypeScript, component architecture, layout systems, and scale.",
                color: "var(--blue)",
              },
              {
                title: "AI Interfaces",
                desc: "Prompt engineering, AI Studio workflow, interactive AI modules, and LLM orchestration.",
                color: "var(--purple)",
              },
              {
                title: "Creative Coding",
                desc: "Motion, visual systems, spatial interfaces, experimental UI, and canvas rendering.",
                color: "var(--orange)",
              },
              {
                title: "Web3",
                desc: "Wallet interaction, on-chain identity, and decentralized interface patterns.",
                color: "var(--cyan)",
              },
              {
                title: "Design",
                desc: "Color systems, typography, brutalist layouts, visual rhythm, and curation.",
                color: "var(--pink)",
              },
            ].map((mapItem, idx) => (
              <div key={idx} className="flex gap-4 md:gap-6 items-start group">
                <div
                  className="w-1.5 h-12 rounded-full mt-1 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: mapItem.color }}
                />
                <div>
                  <h3 className="font-space font-bold text-xl text-[var(--ink)] mb-1">
                    {mapItem.title}
                  </h3>
                  <p className="text-[var(--ink-soft)] font-medium leading-relaxed">
                    {mapItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuildLogModule() {
  return (
    <section className="homepage-canvas my-16 lg:my-24 border-t border-[var(--border)] pt-16 lg:pt-24">
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="font-space font-bold text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mb-4">
              Build Log
            </h2>
            <p className="text-[var(--ink-soft)] leading-relaxed text-lg">
              A record of how this site evolves over time.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative border-l border-[var(--border)] ml-3 pl-6 md:ml-4 md:pl-8 flex flex-col gap-10">
            {[
              {
                date: "June 2026",
                text: "Rebuilding homepage V3 into a wider rainbow museum layout with 12-column content grids.",
              },
              {
                date: "June 2026",
                text: "Fixing sparse homepage content by adding richer project stories and personal archive modules.",
              },
              {
                date: "June 2026",
                text: "Transitioning from a narrow centered layout to a 90% wide content canvas to support data density.",
              },
              {
                date: "May 2026",
                text: "Prototyped initial museum concepts and established the core technology stack.",
              },
            ].map((log, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[30px] md:-left-[38px] top-1.5 w-3 h-3 rounded-full bg-[var(--canvas-soft)] border-2 border-[var(--ink-muted)] flex items-center justify-center">
                  {idx === 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                  )}
                </div>
                <h4 className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)] tracking-widest mb-2">
                  {log.date}
                </h4>
                <p className="text-[var(--ink)] font-medium">{log.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
