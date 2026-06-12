import { motion } from "motion/react";

const pipelineSteps = [
  { id: "01", name: "Structure", desc: "Fix layout width and section rhythm." },
  {
    id: "02",
    name: "Content",
    desc: "Add real text, project depth, and archive material.",
  },
  { id: "03", name: "Color", desc: "Build a warmer rainbow visual system." },
  {
    id: "04",
    name: "Interaction",
    desc: "Improve buttons, route map, hover states, and copy actions.",
  },
  {
    id: "05",
    name: "Polish",
    desc: "Refine spacing, contrast, hierarchy, and responsive behavior.",
  },
];

const changingCards = [
  {
    title: "Layout Density",
    desc: "Moving from narrow centered content to a wide 90% museum canvas.",
    bullets: [
      "Wider content grid",
      "Stronger section rhythm",
      "Less empty horizontal space",
    ],
    color: "var(--orange)",
  },
  {
    title: "Project Storytelling",
    desc: "Turning project cards into deeper case-study panels.",
    bullets: [
      "Problem definition",
      "Process & iteration",
      "Live technical proof",
    ],
    color: "var(--blue)",
  },
  {
    title: "Rainbow Atmosphere",
    desc: "Using soft color fields, section accents, and full-spectrum route lines.",
    bullets: [
      "Warm paper background",
      "Low-opacity radial glows",
      "Colorful accent borders",
    ],
    color: "var(--pink)",
  },
  {
    title: "Personal Archive",
    desc: "Expanding chess, media, notes, and identity fragments into real exhibits.",
    bullets: [
      "Chess archive module",
      "Media universe gallery",
      "Digital garden notes",
    ],
    color: "var(--green)",
  },
];

export function NowBuildingModule() {
  return (
    <section
      className="homepage-canvas w-full py-16 lg:py-24 relative overflow-hidden"
      id="build-mission"
    >
      {/* Soft background integration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--pink)] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--orange)] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ROW 1 */}
        {/* Build Mission Card (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-[var(--border)] border-l-4 border-l-[var(--pink)] group hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col h-full"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--pink)] opacity-10 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity pointer-events-none" />
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--pink)] mb-5 flex items-center gap-2">
            Build Mission
          </h3>
          <p className="text-sm sm:text-base font-medium text-[var(--ink-soft)] leading-relaxed mb-6">
            <strong className="text-[var(--ink)] font-bold">
              I am rebuilding this homepage into a warmer, more colorful digital
              museum.
            </strong>{" "}
            The goal is to combine portfolio, archive, technical proof, and
            personal identity into one living interface.
          </p>
          <p className="text-xs font-medium text-[var(--ink)] leading-relaxed italic border-l-2 border-[var(--pink)] pl-3 mb-6 relative z-10">
            This section tracks the current construction phase of the site.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto relative z-10">
            {[
              "Active Rebuild",
              "Homepage V3",
              "Rainbow System",
              "Content Expansion",
            ].map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-[var(--pink)]/10 text-[var(--pink)] border border-[var(--pink)]/20 font-mono text-[10px] rounded uppercase font-bold tracking-wider transition-colors hover:bg-[var(--pink)]/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Concept Phase Card (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-[var(--border)] group hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--blue)] opacity-50 group-hover:opacity-100 transition-colors" />
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--blue)] mb-5">
            Concept Phase
          </h3>
          <p className="text-sm font-medium text-[var(--ink)] leading-relaxed mb-4">
            The current design phase focuses on turning a sparse homepage into a
            dense but readable museum interface.
          </p>
          <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">
            Instead of adding random decoration, the goal is to create structure
            through richer project stories, clearer section identities, better
            visual rhythm, and more useful interaction.
          </p>
        </motion.div>

        {/* Current Priorities Card (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-1 lg:col-span-4 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-[var(--border)] group hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--orange)] opacity-50 group-hover:opacity-100 transition-colors" />
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--orange)] mb-5">
            Current Priorities
          </h3>
          <ul className="space-y-4 flex-1 flex flex-col justify-between">
            <li className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--ink)]">
                <span className="text-[var(--orange)] mr-1">01.</span> Improve
                homepage density
              </span>
              <span className="text-[11px] font-medium text-[var(--ink-soft)] pl-5">
                Add more real content blocks so the page feels alive, not empty.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--ink)]">
                <span className="text-[var(--orange)] mr-1">02.</span> Build a
                stronger rainbow color system
              </span>
              <span className="text-[11px] font-medium text-[var(--ink-soft)] pl-5">
                Use color as navigation, emotion, and section identity.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--ink)]">
                <span className="text-[var(--orange)] mr-1">03.</span> Turn
                projects into case studies
              </span>
              <span className="text-[11px] font-medium text-[var(--ink-soft)] pl-5">
                Show problem, process, build details, proof, and limitations.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--ink)]">
                <span className="text-[var(--orange)] mr-1">04.</span> Expand
                personal archive modules
              </span>
              <span className="text-[11px] font-medium text-[var(--ink-soft)] pl-5">
                Make chess, media, notes, and personal fragments feel like real
                exhibits.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* ROW 2: Build Pipeline (12 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="col-span-1 lg:col-span-12 museum-card p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-[var(--border)] mt-2"
        >
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-6">
            Build Pipeline
          </h3>

          <div className="relative">
            {/* Background line */}
            <div className="absolute top-3 left-0 w-full h-[3px] bg-[var(--border-strong)] rounded-full hidden md:block" />
            {/* Progress line */}
            <div className="absolute top-3 left-0 w-2/5 h-[3px] spectrum-rule rounded-full hidden md:block opacity-80" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {pipelineSteps.map((step, idx) => {
                const isActive = idx < 2; // Arbitrary current active step
                const isCurrent = idx === 1; // Content
                return (
                  <div key={step.id} className="flex flex-col relative group">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mb-3 border-2 transition-colors ${isActive ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-white text-[var(--ink-muted)] border-[var(--border-strong)]"} ${isCurrent ? "ring-4 ring-[var(--orange)]/20" : ""}`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`font-space font-bold text-sm mb-1 ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
                    >
                      {step.name}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--ink-soft)] leading-snug">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ROW 3: What Is Changing Now (12 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="col-span-1 lg:col-span-12 mt-4"
        >
          <h3 className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-5">
            What Is Changing Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {changingCards.map((card) => (
              <div
                key={card.title}
                className="museum-card p-5 lg:p-6 bg-white/80 backdrop-blur-md rounded-xl border border-[var(--border)] group hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col relative overflow-hidden h-full"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-colors"
                  style={{ backgroundColor: card.color }}
                />
                <h4
                  className="font-mono text-[11px] font-bold uppercase mb-3 tracking-widest"
                  style={{ color: card.color }}
                >
                  {card.title}
                </h4>
                <p className="text-xs font-bold text-[var(--ink)] mb-4 leading-relaxed flex-none">
                  {card.desc}
                </p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-[var(--border)]">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-1.5 text-[11px] text-[var(--ink-soft)] font-medium leading-tight"
                    >
                      <span
                        className="font-bold -translate-y-[0.5px]"
                        style={{ color: card.color }}
                      >
                        •
                      </span>{" "}
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
