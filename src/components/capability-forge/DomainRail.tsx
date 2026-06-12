import React from "react";
import { cn } from "../../lib/utils";

interface DomainType {
  id: string;
  label: string;
  count: number;
  color: string;
  icon: any;
}

interface Props {
  domains: DomainType[];
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}

export function DomainRail({
  domains,
  selectedDomain,
  setSelectedDomain,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="lg:col-span-2 forge-domain-rail flex flex-row lg:flex-col gap-1.5 font-mono overflow-x-auto hide-scrollbar pb-2 lg:pb-0 px-1">
      <div className="text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-widest mb-2 hidden lg:block sticky top-0 bg-[var(--museum-paper)]/80 backdrop-blur z-10 py-1">
        Domain Index
      </div>
      {domains.map((domain, index) => {
        const isActive = selectedDomain === domain.id && !searchQuery.trim();
        const Icon = domain.icon;
        return (
          <button
            key={domain.id}
            onClick={() => {
              setSelectedDomain(domain.id);
              setSearchQuery("");
            }}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all relative overflow-hidden group shrink-0 lg:w-full text-left",
              isActive
                ? "bg-white border-[rgba(62,39,35,0.2)] shadow-sm"
                : "bg-transparent border-transparent hover:bg-[rgba(62,39,35,0.04)] text-[var(--ink-soft)]",
            )}
          >
            <div
              className="w-1 absolute left-0 top-0 h-full transition-all"
              style={{
                backgroundColor: isActive ? domain.color : "transparent",
              }}
            />
            <span className="text-[9px] font-bold opacity-60 w-4 text-right shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon
              className="w-3.5 h-3.5 transition-colors shrink-0"
              style={{ color: isActive ? domain.color : "currentColor" }}
            />
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider truncate flex-1",
                isActive ? "text-[var(--museum-ink)]" : "",
              )}
            >
              {domain.label}
            </span>
            <span className="text-[9px] font-bold opacity-50 shrink-0">
              {domain.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
