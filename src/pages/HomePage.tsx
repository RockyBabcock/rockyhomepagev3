import React, { lazy, Suspense } from "react";
import { ProfileModule } from "../components/ProfileModule";
import { NowBuildingModule } from "../components/NowBuildingModule";
import { ProjectLabModule } from "../components/ProjectLabModule";
import { FeaturedExhibitsWall } from "../components/FeaturedExhibitsWall";
import { CoreCapabilitiesModule } from "../components/capability-forge/CoreCapabilitiesModule";
import {
  DesignPrinciplesModule,
  LearningMapModule,
  BuildLogModule,
} from "../components/InfoModules";
import { ConnectModule } from "../components/ConnectModule";
import { GitHubModule } from "../components/GitHubModule";
import {
  MuseumSectionLayout,
  sectionTones,
} from "@/components/layout/MuseumSectionLayout";
import { PersonalWorldPreview } from "@/components/PersonalWorldPreview";
import { ModuleSkeleton } from "@/components/common/ModuleSkeleton";
import { ModuleErrorBoundary } from "../components/common/ModuleErrorBoundary";
import { SealedArchive } from "../components/SealedArchive";
import { MuseumScrollMap } from "../components/common/MuseumScrollMap";
import { features } from "../config/features";

const AIPlaygroundModule = lazy(() =>
  import("../components/AIPlaygroundModule").then((m) => ({
    default: m.AIPlaygroundModule,
  })),
);
const Web3VaultModule = lazy(() =>
  import("../components/Web3VaultModule").then((m) => ({
    default: m.Web3VaultModule,
  })),
);
const TimelineModule = lazy(() =>
  import("../components/TimelineModule").then((m) => ({
    default: m.TimelineModule,
  })),
);
const BlogModule = lazy(() =>
  import("../components/BlogModule").then((m) => ({ default: m.BlogModule })),
);
const VisitorAnalyticsModule = lazy(() =>
  import("../components/VisitorAnalyticsModule").then((m) => ({
    default: m.VisitorAnalyticsModule,
  })),
);

const homeSections = [
  {
    id: "entrance",
    component: (
      <div id="entrance-wrapper">
        <ProfileModule />
        <NowBuildingModule />
      </div>
    ),
    wrapLayout: false,
  },
  {
    id: "curators-select",
    tone: "projects",
    eyebrow: "HALL 01 / CURATOR'S SELECTION",
    title: "Featured Exhibits",
    description:
      "A curated overview of the systems, tools, and archives within this museum.",
    layout: "custom",
    size: "xl",
    width: "full",
    headerVariant: "hidden",
    component: <FeaturedExhibitsWall />,
  },
  {
    id: "projects",
    tone: "projects",
    eyebrow: "HALL 02 / PROOF OF WORK",
    title: "Project Laboratory",
    description:
      "Selected builds that show how I design, structure, and implement web systems.",
    layout: "custom",
    size: "xl",
    width: "full",
    headerVariant: "hidden",
    component: <ProjectLabModule />,
  },
  {
    id: "forge",
    tone: "skills",
    eyebrow: "HALL 03 / CAPABILITY SYSTEM",
    title: "Capability Forge",
    description:
      "A living map of the tools I use to design, build, automate, and experiment.",
    layout: "dashboard",
    size: "xl",
    width: "wide",
    headerVariant: "side",
    component: <CoreCapabilitiesModule />,
  },
  {
    id: "principles-learning",
    component: (
      <>
        <DesignPrinciplesModule />
        <LearningMapModule />
      </>
    ),
    wrapLayout: false,
  },
  {
    id: "experiments",
    tone: "experiments",
    eyebrow: "HALL 04 / EXPERIMENT CHAMBERS",
    title: "AI, Web3 & Interface Systems",
    description:
      "Explorations in intelligent interfaces, decentralized systems, and creative tools.",
    layout: "split",
    size: "xl",
    width: "wide",
    headerVariant: "side",
    component: (
      <>
        <ModuleErrorBoundary fallbackTitle="AI Experiment Chamber Offline">
          <Suspense
            fallback={<ModuleSkeleton label="Loading AI Playground..." />}
          >
            {features.aiPlayground ? (
              <AIPlaygroundModule />
            ) : (
              <SealedArchive
                title="AI Experiment Chamber Offline"
                description="Live AI calls are disabled in this production build."
              />
            )}
          </Suspense>
        </ModuleErrorBoundary>
        <ModuleErrorBoundary fallbackTitle="Web3 Archive Mode">
          <Suspense fallback={<ModuleSkeleton label="Loading Web3 Vault..." />}>
            {features.web3Vault ? (
              <Web3VaultModule />
            ) : (
              <SealedArchive
                title="Web3 Archive Mode"
                description="Wallet interaction is disabled."
              />
            )}
          </Suspense>
        </ModuleErrorBoundary>
      </>
    ),
  },
  {
    id: "live-proof",
    tone: "live",
    eyebrow: "HALL 05 / LIVE PROOF",
    title: "Activity Signals",
    description: "Signals from what I build, commit, track, and improve.",
    layout: "mosaic",
    size: "xl",
    width: "wide",
    headerVariant: "side",
    component: (
      <>
        <ModuleErrorBoundary fallbackTitle="GitHub Signal Unavailable">
          {features.githubActivity ? (
            <GitHubModule />
          ) : (
            <SealedArchive
              title="GitHub Signal Unavailable"
              description="Live repository data could not be loaded."
            />
          )}
        </ModuleErrorBoundary>
        <ModuleErrorBoundary fallbackTitle="Telemetry Simulation">
          <Suspense fallback={<ModuleSkeleton label="Loading Analytics..." />}>
            {features.telemetry ? (
              <VisitorAnalyticsModule />
            ) : (
              <SealedArchive
                title="Telemetry Simulation"
                description="Real analytics are not connected yet."
              />
            )}
          </Suspense>
        </ModuleErrorBoundary>
      </>
    ),
  },
  {
    id: "archives",
    tone: "personal",
    eyebrow: "HALL 06 / PERSONAL ARCHIVES",
    title: "Play, Strategy & Memory",
    description:
      "The human side of the site: games, sport, media, chess, and daily systems.",
    layout: "mosaic",
    size: "xl",
    width: "wide",
    headerVariant: "centered",
    component: (
      <>
        <PersonalWorldPreview
          title="Chess Archive"
          eyebrow="Strategy"
          description="A personal thinking hall about chess, constraints, and long-term planning."
          color="#D4AF37"
          href="/chess"
        />
        <PersonalWorldPreview
          title="Basketball Geometry"
          eyebrow="Motion"
          description="A cinematic archive about Spurs basketball, structure, movement, and design systems."
          color="#FF6B35"
          href="/basketball"
        />
        <PersonalWorldPreview
          title="Media Universe"
          eyebrow="Memory"
          description="Games, films, music, and visual references that shape my interface taste."
          color="#8338EC"
          href="/media"
        />
        <PersonalWorldPreview
          title="Watering System"
          eyebrow="Daily System"
          description="A small personal system about routines, care, tracking, and growth."
          color="#06D6A0"
          href="/watering"
        />
      </>
    ),
  },
  {
    id: "garden",
    tone: "garden",
    eyebrow: "HALL 07 / DIGITAL GARDEN",
    title: "Digital Garden",
    description: "Notes, essays, and fragments from the systems I build.",
    layout: "editorial",
    size: "lg",
    width: "narrow",
    headerVariant: "compact",
    component: (
      <>
        <Suspense fallback={<ModuleSkeleton label="Loading Blog Module..." />}>
          <BlogModule />
        </Suspense>
        <Suspense fallback={<ModuleSkeleton label="Loading Timeline..." />}>
          <TimelineModule />
        </Suspense>
      </>
    ),
  },
  {
    id: "buildlog",
    component: <BuildLogModule />,
    wrapLayout: false,
  },
  {
    id: "signal",
    tone: "signal",
    eyebrow: "HALL 08 / SIGNAL ROOM",
    title: "Let’s Build Something",
    description:
      "Open to frontend, design engineering, AI interface, and creative web collaborations.",
    layout: "centered",
    size: "xl",
    width: "wide",
    headerVariant: "centered",
    component: <ConnectModule />,
  },
];

export default function HomePage() {
  return (
    <main className="homepage-rainbow-bg text-[var(--museum-text)] museum-page-shell relative">
      <MuseumScrollMap />
      {homeSections.map((section) =>
        section.wrapLayout === false ? (
          <React.Fragment key={section.id}>{section.component}</React.Fragment>
        ) : (
          <MuseumSectionLayout
            key={section.id}
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            tone={section.tone as any}
            layout={section.layout as any}
            size={section.size as any}
            width={section.width as any}
            headerVariant={section.headerVariant as any}
          >
            {section.component}
          </MuseumSectionLayout>
        ),
      )}
    </main>
  );
}
