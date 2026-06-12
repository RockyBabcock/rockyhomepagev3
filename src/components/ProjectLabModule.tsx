import React, { useState } from "react";
import { projectLabData } from "../data/projectLabData";
import {
  ExternalLink,
  Github,
  Terminal,
  Activity,
  Box,
  Database,
  Sparkles,
  Layers,
  GitMerge,
} from "lucide-react";

import { motion } from "framer-motion";

const SystemDiagramPlaceholder = ({ projectId }: { projectId: string }) => {
  if (projectId === "rocky-homepage-v3") {
    return (
      <div className="w-full min-h-[220px] bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl flex flex-col md:flex-row items-center justify-between p-6 gap-6 relative overflow-hidden text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

        {/* SVG Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 120 110 C 200 110, 200 60, 300 60"
            fill="none"
            stroke="var(--accent-orange)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 120 110 C 200 110, 200 160, 300 160"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>

        <div className="flex flex-col gap-3 z-10 w-full md:w-[120px] shrink-0">
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.2)] rounded p-2.5 text-[9px] font-mono text-center shadow-lg relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rainbow-red)] absolute -left-0.5 -top-0.5 animate-pulse" />
            MuseumEngineHero
          </div>
          <div className="bg-[var(--museum-brown)] text-white border border-[rgba(255,255,255,0.2)] rounded p-2.5 text-[9px] font-mono text-center shadow-lg">
            ScrollEngine
          </div>
          <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.2)] rounded p-2.5 text-[9px] font-mono text-center shadow-lg">
            CapabilityForge
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-1 items-center z-10 flex-1">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
            React State
          </span>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent opacity-30" />
        </div>

        <div className="bg-[#222] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 flex flex-col items-center gap-3 z-10 w-full md:w-[150px] shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-50" />
          <Layers className="w-6 h-6 text-[var(--accent-cyan)]" />
          <span className="text-[10px] font-mono text-center tracking-widest uppercase font-bold">
            Interactive
            <br />
            Renderer
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-[var(--hall-surface)] border border-[var(--border)] rounded-xl flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      <div className="flex items-center gap-6 z-10">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[var(--ink-muted)] flex items-center justify-center">
          <Database className="w-6 h-6 text-[var(--ink-soft)]" />
        </div>
        <div className="w-12 h-0.5 bg-[var(--ink-muted)] relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-[var(--ink-muted)]"></div>
        </div>
        <div className="w-20 h-20 bg-white border border-[var(--border)] rounded-xl shadow-sm flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[var(--cyan)]" />
        </div>
      </div>
    </div>
  );
};

export const ProjectLabModule = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectLabData.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return project.category === "Featured";
    if (activeFilter === "Active Build")
      return project.status === "Active Build";
    return project.status === activeFilter || project.category === activeFilter;
  });

  return (
    <div className="w-[min(92vw,1200px)] mx-auto flex flex-col gap-12 lg:gap-16 relative py-12">
      {/* 1. Lab Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4 border-b border-[var(--border)] pb-8 z-10">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[var(--hall-primary)] block mb-4 flex items-center gap-2">
            Hall 04{" "}
            <span className="w-8 h-px bg-[var(--hall-primary)] opacity-50" />{" "}
            Proof of Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tight text-[var(--museum-ink)] mb-4">
            Project Laboratory
          </h2>
          <p className="text-[var(--ink-soft)] font-medium leading-relaxed">
            This space acts as a case-study wall. Each build below represents an
            explicit problem tackled through code, complete with architectural
            maps, capability proofs, and live deployments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {["All", "Featured", "Prototype", "Active Build"].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono font-bold tracking-[0.1em] border transition-all flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)] ${
                  isActive
                    ? "bg-[var(--hall-primary)] text-white border-[var(--hall-primary)] shadow-sm"
                    : "bg-white text-[var(--ink-soft)] border-[var(--border)] hover:border-[var(--hall-secondary)] hover:text-[var(--hall-secondary)]"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                )}
                {tab.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Study Wall Feed */}
      <div className="flex flex-col gap-16 md:gap-24">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative"
          >
            {/* Left Column: Context & Evidence */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 bg-[var(--hall-surface)] text-[var(--ink-soft)] border border-[var(--border)] font-mono text-[10px] rounded font-bold uppercase tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] rounded font-bold uppercase tracking-wider border ${project.status === "Active Build" ? "bg-[var(--orange)]/10 text-[var(--orange)] border-[var(--orange)]/20" : "bg-[var(--ink-muted)]/10 text-[var(--ink-muted)] border-[var(--ink-muted)]/20"}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-headline font-bold mb-3 text-[var(--museum-ink)] tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed mb-6">
                  {project.oneLine}
                </p>

                {/* Live Links */}
                <div className="flex gap-2 mb-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[var(--border)] text-xs font-bold text-[var(--museum-ink)] hover:text-[var(--hall-primary)] hover:border-[var(--hall-primary)] hover:shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Site deployed
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111] text-white border border-[#111] text-xs font-bold hover:bg-[var(--hall-primary)] hover:border-[var(--hall-primary)] transition-all focus-visible:ring-2 focus-visible:ring-[var(--hall-primary)]"
                    >
                      <Github className="w-3.5 h-3.5" /> Source code
                    </a>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)] mb-3">
                  Stack Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 bg-white border border-[var(--border)] text-[var(--ink-soft)] font-mono text-[10px] font-bold rounded flex items-center tracking-wider hover:border-[var(--hall-primary)] hover:text-[var(--hall-primary)] transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Readout & System Diagram */}
            <div className="lg:col-span-7 flex flex-col gap-8 bg-white/50 rounded-2xl p-6 lg:p-8 border border-[var(--border)] shadow-sm">
              {/* System Diagram block */}
              <div className="flex flex-col gap-2">
                <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)]">
                  <Box className="w-3.5 h-3.5" /> System Architecture Outline
                </h4>
                <SystemDiagramPlaceholder projectId={project.id} />
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mt-4 pt-8 border-t border-[var(--border)]">
                {/* The Problem */}
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)]">
                    <Activity className="w-3.5 h-3.5 text-[var(--orange)]" />{" "}
                    The Problem
                  </h4>
                  <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* System Solutions */}
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)]">
                    <Terminal className="w-3.5 h-3.5 text-[var(--cyan)]" />{" "}
                    System Solutions
                  </h4>
                  <ul className="space-y-2">
                    {project.built.slice(0, 4).map((item, i) => (
                      <li
                        key={i}
                        className="text-xs font-medium text-[var(--ink-soft)] leading-snug flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                    {project.built.length > 4 && (
                      <li className="text-[10px] font-mono text-[var(--ink-muted)] uppercase tracking-wider pl-4">
                        + {project.built.length - 4} more modules
                      </li>
                    )}
                  </ul>
                </div>

                {/* Concrete Proof */}
                {project.proves && project.proves.length > 0 && (
                  <div className="flex flex-col gap-2 sm:col-span-2 pt-6 border-t border-[var(--border)]">
                    <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)]">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--purple)]" />{" "}
                      Concrete Proof
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.proves.map((proof, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white border border-[var(--border-strong)] text-[var(--museum-ink)] font-mono text-[10px] font-bold shadow-sm rounded"
                        >
                          {proof}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Limitations / Next Patch */}
                {(project.limitations || project.nextSteps) && (
                  <div className="flex flex-col gap-2 sm:col-span-2 pt-6 border-t border-[var(--border)]">
                    <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[var(--ink-muted)] mb-1">
                      <GitMerge className="w-3.5 h-3.5 text-[var(--accent-pink)]" />{" "}
                      System Limitations & Next Patch
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.limitations &&
                        project.limitations.length > 0 && (
                          <div className="flex-1 bg-[rgba(255,46,136,0.04)] border border-[rgba(255,46,136,0.1)] p-4 rounded-lg">
                            <p className="text-xs font-medium text-[var(--ink-soft)] leading-relaxed">
                              <span className="text-[var(--accent-pink)] font-bold">
                                Limitation:
                              </span>{" "}
                              {project.limitations[0]}
                            </p>
                          </div>
                        )}
                      {project.nextSteps && project.nextSteps.length > 0 && (
                        <div className="flex-1 bg-white border border-[var(--border-strong)] shadow-sm p-4 rounded-lg">
                          <p className="text-xs font-medium text-[var(--ink-soft)] leading-relaxed">
                            <span className="text-[var(--museum-ink)] font-bold">
                              Next Patch:
                            </span>{" "}
                            {project.nextSteps[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider between case studies */}
            {index < filteredProjects.length - 1 && (
              <div className="col-span-1 lg:col-span-12 h-px bg-[var(--border)] mt-8" />
            )}
          </article>
        ))}

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-[var(--ink-muted)]">
              No architectures match the filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
