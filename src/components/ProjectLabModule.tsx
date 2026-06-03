import React from "react";
import { motion } from "motion/react";
import { projectLabData } from "../data/projectLabData";
import {
  CheckCircle2,
  ChevronRight,
  Workflow,
  ArrowRight,
  Lightbulb,
  PenTool,
  Code2,
  RefreshCw,
  Layers,
  Wrench
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { EvidenceBadge } from "./EvidenceBadge";

export const ProjectLabModule = () => {
  const featuredProject = projectLabData[0];
  const sideProjects = projectLabData.slice(1, 3);

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/65 backdrop-blur-xl shadow-sm p-5 sm:p-6 lg:p-7">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
        
        {/* Left Column: Featured Project & Process */}
        <div className="flex flex-col gap-5">
          <motion.article 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.75rem] border border-blue-200/70 bg-white/80 p-6 shadow-md flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col h-full">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/50">
                  Featured Build
                </span>
                <StatusPill status={featuredProject.status} />
              </div>

              <h3 className="text-3xl lg:text-4xl font-headline font-bold mb-3 text-slate-800 tracking-tight">
                {featuredProject.title}
              </h3>

              <p className="text-base text-slate-600 mb-6 leading-relaxed font-body max-w-xl">
                {featuredProject.oneLine}
              </p>

              <div className="mb-8">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-3">Core Challenge</h4>
                <p className="text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-100/80 leading-relaxed shadow-sm">
                  {featuredProject.problem}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-600 mb-3 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" /> Implementation Details
                  </h4>
                  <ul className="space-y-2.5">
                    {featuredProject.built.slice(0, 4).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-purple-600 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.techStack.map((chip) => (
                      <span
                        key={chip}
                        className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-slate-100/80">
                {featuredProject.liveUrl && (
                  <EvidenceBadge type="Live Demo" href={featuredProject.liveUrl} />
                )}
                {featuredProject.repoUrl && (
                  <EvidenceBadge type="GitHub" href={featuredProject.repoUrl} />
                )}
              </div>
            </div>
          </motion.article>

          {/* Process Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-sm"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x divide-slate-200/60">
              <div className="flex flex-col items-center justify-center p-3 text-center group">
                <Lightbulb className="w-5 h-5 mb-2.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1">Think</span>
                <span className="text-[10px] text-slate-500 leading-tight">Define constraints & user journey</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center group">
                <PenTool className="w-5 h-5 mb-2.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1">Design</span>
                <span className="text-[10px] text-slate-500 leading-tight">Visual language & layout</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center group line-clamp-2">
                <Code2 className="w-5 h-5 mb-2.5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1">Build</span>
                <span className="text-[10px] text-slate-500 leading-tight">Data-driven responsive modules</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center group">
                <RefreshCw className="w-5 h-5 mb-2.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1">Iterate</span>
                <span className="text-[10px] text-slate-500 leading-tight">Test, refine & improve</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Secondary Projects */}
        <div className="flex flex-col gap-5">
          {sideProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-sm flex flex-col justify-between group transition-all hover:bg-white/90 relative overflow-hidden h-full min-h-[280px]"
            >
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <StatusPill status={project.status} />
                </div>
                
                <h3 className="text-xl font-bold font-headline text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-slate-600 font-body leading-relaxed mb-5 line-clamp-3">
                  {project.oneLine}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 3).map((chip) => (
                    <span
                      key={chip}
                      className="px-2 py-1 rounded-md bg-white border border-slate-100 text-[10px] font-mono text-slate-500"
                    >
                      {chip}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-md bg-transparent text-[10px] font-mono text-slate-400">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mt-auto pt-4 border-t border-slate-200/60 w-full">
                  <div className="flex gap-2">
                    {project.repoUrl && <EvidenceBadge type="GitHub" href={project.repoUrl} />}
                    {project.liveUrl && <EvidenceBadge type="Live Demo" href={project.liveUrl} />}
                  </div>
                  {(project.repoUrl || project.liveUrl) && (
                     <a href={project.liveUrl || project.repoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors p-1" aria-label={`View ${project.title}`}>
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                     </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
};

