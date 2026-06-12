import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PersonalWorldPreviewProps = {
  title: string;
  eyebrow: string;
  description: string;
  color: string;
  href: string;
  className?: string;
};

export function PersonalWorldPreview({
  title,
  eyebrow,
  description,
  color,
  href,
  className,
}: PersonalWorldPreviewProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative p-8 md:p-10 personal-world-card overflow-hidden",
        "flex flex-col justify-between border border-[var(--border-strong)] rounded-2xl bg-[#080808]",
        className,
      )}
      style={{
        boxShadow: `0 30px 90px rgba(0,0,0,0.5)`,
      }}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full opacity-[0.25] transition-opacity duration-700 group-hover:opacity-[0.4]"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${color}, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-[#080808]/40" />
      </div>

      <div className="relative z-10">
        <div
          className="inline-flex rounded border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
          style={{
            color,
            borderColor: `${color}40`,
            backgroundColor: `${color}15`,
          }}
        >
          {eyebrow}
        </div>

        <h3 className="mt-8 font-space text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
          {title}
        </h3>

        <p className="mt-5 text-sm md:text-base leading-relaxed text-[#CCC] max-w-sm">
          {description}
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between relative z-10 border-t border-white/10 pt-6">
        <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-white/60 group-hover:text-white transition-colors">
          Enter Archive Wing
        </span>

        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all transform group-hover:scale-110"
          style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
