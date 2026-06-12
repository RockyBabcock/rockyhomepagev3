import React, { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { ForgeHeader } from "./ForgeHeader";
import { DomainRail } from "./DomainRail";
import { ReactorCanvas } from "./ReactorCanvas";
import { GridView } from "./GridView";
import { EvidenceView } from "./EvidenceView";
import { EvidenceDossier } from "./EvidenceDossier";
import { techStackData, categoryColors } from "../../data/techStack";
import { iconMap } from "./forgeData";

export function CoreCapabilitiesModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"Reactor" | "Grid" | "Evidence">(
    "Reactor",
  );

  const domains = useMemo(() => {
    const cats = new Set(techStackData.map((t) => t.category));
    return Array.from(cats).map((c) => ({
      id: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
      count: techStackData.filter((t) => t.category === c).length,
      color: (categoryColors as any)[c]?.pri || "#555",
      icon: (iconMap as any)[c],
    }));
  }, []);

  const [selectedDomain, setSelectedDomain] = useState<string>(
    domains[0]?.id || "frontend",
  );

  const filteredTechs = useMemo(() => {
    if (!searchQuery.trim()) return techStackData;
    const q = searchQuery.toLowerCase();
    return techStackData.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.evidence.some((e) => e.toLowerCase().includes(q)) ||
        t.usedIn.some((u) => u.toLowerCase().includes(q)) ||
        (t.learningFocus && t.learningFocus.toLowerCase().includes(q)) ||
        (t.nextStep && t.nextStep.toLowerCase().includes(q)) ||
        (t.relatedTools &&
          t.relatedTools.some((r) => r.toLowerCase().includes(q))),
    );
  }, [searchQuery]);

  const displayedTechs = searchQuery.trim()
    ? filteredTechs
    : techStackData.filter((t) => t.category === selectedDomain);

  const [selectedTechId, setSelectedTechId] = useState<string | null>(
    displayedTechs[0]?.id || null,
  );

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      const tools = techStackData.filter((t) => t.category === selectedDomain);
      if (tools.length > 0 && !tools.find((t) => t.id === selectedTechId)) {
        setSelectedTechId(tools[0].id);
      }
    }
  }, [selectedDomain, selectedTechId, searchQuery]);

  React.useEffect(() => {
    if (
      displayedTechs.length > 0 &&
      !displayedTechs.find((t) => t.id === selectedTechId)
    ) {
      setSelectedTechId(displayedTechs[0].id);
    }
  }, [displayedTechs, selectedTechId]);

  const activeDomainData =
    domains.find((d) => d.id === selectedDomain) || domains[0];
  const accentColor = activeDomainData?.color || "#555";
  const selectedTech =
    displayedTechs.find((t) => t.id === selectedTechId) ||
    displayedTechs[0] ||
    techStackData[0];

  const totalTools = techStackData.length;
  const totalDomains = domains.length;

  return (
    <div
      className="w-[min(94vw,1760px)] mx-auto flex flex-col gap-8 py-16 relative z-10"
      style={{ "--galaxy-accent": accentColor } as React.CSSProperties}
    >
      <div className="capability-forge-shell p-6 md:p-10 flex flex-col gap-10">
        <ForgeHeader
          totalTools={totalTools}
          totalDomains={totalDomains}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch relative">
          <DomainRail
            domains={domains}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {viewMode === "Reactor" && (
            <>
              <ReactorCanvas
                selectedTech={selectedTech}
                displayedTechs={displayedTechs}
                accentColor={accentColor}
                setSelectedTechId={setSelectedTechId}
              />
              <EvidenceDossier selectedTech={selectedTech} />
            </>
          )}

          {viewMode === "Grid" && (
            <GridView
              displayedTechs={displayedTechs}
              setSelectedTechId={setSelectedTechId}
              setViewMode={setViewMode}
            />
          )}

          {viewMode === "Evidence" && (
            <EvidenceView
              displayedTechs={displayedTechs}
              setSelectedTechId={setSelectedTechId}
              setViewMode={setViewMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
