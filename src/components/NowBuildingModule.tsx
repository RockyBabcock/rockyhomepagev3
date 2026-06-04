import { motion } from "motion/react";

export function NowBuildingModule() {
  return (
    <section className="homepage-canvas my-24 lg:my-32">
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        {/* Title area */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="font-space font-bold text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mb-4">
              Now Building
            </h2>
            <p className="text-[var(--ink-soft)] leading-relaxed text-lg">
              Rebuilding this homepage into a warmer, more colorful digital museum.
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="museum-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3 border-b border-[var(--border)] pb-2">
                Concept Phase
              </h3>
              <p className="font-medium text-[var(--ink)] mb-4">
                The goal is to combine portfolio, archive, technical proof, and personal identity into one living interface.
              </p>
            </div>
          </div>

          <div className="museum-card p-6 md:p-8 flex flex-col justify-between bg-white/60">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3 border-b border-[var(--border)] pb-2">
                Current Priorities
              </h3>
              <ul className="space-y-3 font-medium text-[var(--ink-soft)] text-sm">
                <li className="flex items-start gap-2"><span className="text-[var(--orange)] mt-0.5">•</span> Improve homepage density</li>
                <li className="flex items-start gap-2"><span className="text-[var(--blue)] mt-0.5">•</span> Build a stronger rainbow color system</li>
                <li className="flex items-start gap-2"><span className="text-[var(--pink)] mt-0.5">•</span> Turn projects into case studies</li>
                <li className="flex items-start gap-2"><span className="text-[var(--green)] mt-0.5">•</span> Expand personal archive modules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
