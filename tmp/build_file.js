const fs = require('fs');

const fileContent = `import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  MonitorSmartphone, Server, Sparkles, Settings, Cpu, Box, Disc,
  TerminalSquare, Search, Copy, CheckCircle2, ChevronRight, X, ArrowRight, Layers, Workflow, Check, LayoutTemplate, Globe2, Database, Code2, Globe
} from "lucide-react";

const DOMAINS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: MonitorSmartphone,
    toolCount: 18,
    stackLine: "React · Next.js · TypeScript · Tailwind CSS · Framer Motion · Vite · Zustand · React Query",
    architecture: {
      title: "Frontend Engineering System",
      pipeline: "Data → Components → Layout → Interaction → Deployment",
      blocks: [
        { title: "Component Architecture", items: ["reusable section modules", "card variants", "layout primitives", "route-aware UI"] },
        { title: "State & Interaction", items: ["selected project state", "filter state", "drawers / modals", "copy actions", "keyboard focus behavior"] },
        { title: "Responsive Layout", items: ["12-column desktop grid", "tablet adaptation", "mobile stacked modules", "width: min(92vw, 1720px)"] },
        { title: "Design System", items: ["warm paper canvas", "rainbow accent tokens", "section tones", "badge variants", "hover states"] },
        { title: "Motion Layer", items: ["hover lift", "route transitions", "soft reveals", "interaction feedback", "reduced-motion awareness"] },
        { title: "Data-driven UI", items: ["project data arrays", "tech stack data models", "domain-based filtering", "selected tool detail drawer"] }
      ]
    },
    proof: {
      usedIn: ["Rocky Homepage V3", "Hero Entrance Console", "Project Laboratory", "Capability Forge"],
      whatThisProves: ["component-driven architecture", "responsive interface systems", "stateful interactions", "design-system control", "AI-assisted frontend iteration"],
      currentUpgrade: "Turning static portfolio sections into interactive, data-driven modules.",
      copyText: "Frontend Stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Vite, Zustand, React Query."
    }
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    toolCount: 9,
    stackLine: "Node.js · Express · FastAPI · Python · REST APIs · WebSockets · PostgreSQL · MongoDB · Prisma · Supabase",
    architecture: {
      title: "Backend Services System",
      pipeline: "Schema → Auth → Edge Routes → WebSockets → Persistence",
      blocks: [
        { title: "API Architecture", items: ["RESTful endpoints", "route decoupling", "schema validation", "edge caching"] },
        { title: "Data Modeling", items: ["relational schemas", "document stores", "type-safe queries", "performant indexes"] },
        { title: "Real-time Flow", items: ["WebSockets", "event broadcasting", "low-latency sync", "presence indicators"] },
        { title: "Authentication", items: ["session management", "OAuth flows", "secure boundaries", "RLS policies"] },
        { title: "Serverless", items: ["cold start optimization", "stateless logic", "cloud functions", "cron jobs"] },
        { title: "Automation", items: ["Python scripts", "data normalization", "scheduled tasks", "API bridging"] }
      ]
    },
    proof: {
      usedIn: ["AI Studio workflows", "local prototypes", "homepage backend-ready architecture", "project lab data systems"],
      whatThisProves: ["data modeling", "secure boundaries", "system reliability", "script automation"],
      currentUpgrade: "Migrating legacy custom node servers into serverless edge functions.",
      copyText: "Backend Stack: Node.js, Express, FastAPI, Postgres, Supabase, Prisma."
    }
  },
  {
    id: "ai",
    label: "AI",
    icon: Cpu,
    toolCount: 8,
    stackLine: "OpenAI API · Prompt Engineering · Tool Calling · RAG Concepts · Embeddings · Agent Workflow",
    architecture: {
      title: "Generative Logic System",
      pipeline: "Context → Prompting → Generation → Tool Excution → Validation",
      blocks: [
        { title: "Agent Workflows", items: ["multi-step planning", "autonomous execution", "state management", "reflection loops"] },
        { title: "Context Injection", items: ["RAG systems", "semantic search", "chunking strategies", "dynamic retrieval"] },
        { title: "Tool Calling", items: ["function schemas", "interface alteration", "external API integration", "error handling"] },
        { title: "Prompt Engineering", items: ["few-shot formatting", "system bounding", "deterministic constraints", "eval setups"] },
        { title: "LLM Interfaces", items: ["streaming feedback", "graceful degradation", "thinking states", "AI UI patterns"] },
        { title: "Model Ops", items: ["AI Studio tuning", "latency optimization", "cost awareness", "model fallback"] }
      ]
    },
    proof: {
      usedIn: ["AI Assistant Experiments", "Rocky Homepage V3 Iteration", "Automated Workflows"],
      whatThisProves: ["prompt-driven iteration", "LLM prototyping", "interface refinement", "AI-assisted product building"],
      currentUpgrade: "Integrating complex system prompts natively into my workflow tools.",
      copyText: "AI Stack: OpenAI API, Prompt Engineering, Tool Calling, RAG, AI Studio."
    }
  },
  {
    id: "web3",
    label: "Web3",
    icon: Box,
    toolCount: 8,
    stackLine: "Solidity · Ethers.js · Wagmi · RainbowKit · Hardhat · Foundry · Wallet UX",
    architecture: {
      title: "Decentralized Architecture",
      pipeline: "Contract → ABI → Ethers → Wagmi Hook → React UI",
      blocks: [
        { title: "Smart Contracts", items: ["Solidity logic", "immutable state", "gas optimization", "security patterns"] },
        { title: "Frontend Integration", items: ["Ethers.js provider", "Wagmi hooks", "read/write state", "blockchain sync"] },
        { title: "Wallet UX", items: ["RainbowKit onboarding", "transaction signing clarity", "optimistic updates", "error flows"] },
        { title: "Identity", items: ["ENS domains", "token gating", "cryptographic verification", "SIWE access"] },
        { title: "Testing", items: ["Hardhat simulations", "Foundry fuzzing", "local node state", "Mainnet forking"] },
        { title: "Vaults", items: ["ownership records", "value tracking", "digital scarcity", "contract mechanics"] }
      ]
    },
    proof: {
      usedIn: ["Web3 Archive Vault", "Exploration Prototypes"],
      whatThisProves: ["decentralized UX", "concept translation", "frontend integration", "contract mechanics"],
      currentUpgrade: "Upgrading local prototype wallet connectors to the latest Wagmi v2.",
      copyText: "Web3 Stack: Solidity, Ethers.js, Wagmi, RainbowKit, Hardhat, Wallet UX."
    }
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    toolCount: 8,
    stackLine: "PostgreSQL · MongoDB · Supabase · Prisma · SQL · Schema Design · Data Modeling",
    architecture: {
      title: "Data Persistence System",
      pipeline: "Modeling → Migration → Indexing → DB Write → Persistence",
      blocks: [
        { title: "Relational Schemas", items: ["PostgreSQL tables", "foreign keys", "normalization", "complex joins"] },
        { title: "NoSQL Stores", items: ["MongoDB documents", "flexible nesting", "JSONB data", "rapid iteration"] },
        { title: "ORM Abstraction", items: ["Prisma schema", "type-safe queries", "migration history", "repository pattern"] },
        { title: "Cloud Database", items: ["Supabase edge computing", "Row-Level Security", "real-time listeners", "auth integrations"] },
        { title: "Optimization", items: ["index creation", "query execution plans", "N+1 prevention", "window functions"] },
        { title: "Data Modeling", items: ["domain-driven design", "entity mapping", "polymorphic relations", "system scaling"] }
      ]
    },
    proof: {
      usedIn: ["Personal Archive", "Project Database", "Analytics Tracking"],
      whatThisProves: ["schema design", "data persistence", "relational logic", "API data bridging"],
      currentUpgrade: "Normalizing the project archive into a strictly typed SQL schema.",
      copyText: "Database Stack: PostgreSQL, MongoDB, Prisma, Supabase, SQL."
    }
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Settings,
    toolCount: 7,
    stackLine: "Vercel · Docker · GitHub Actions · CI/CD · Preview Deployments · Environment Variables",
    architecture: {
      title: "DevOps & Deployment",
      pipeline: "Commit → CI Checks → Preview Build → Merged → Prod Deploy",
      blocks: [
        { title: "Vercel Deployments", items: ["edge network caching", "serverless orchestration", "zero-downtime shipping", "instant rollbacks"] },
        { title: "CI/CD Workflows", items: ["GitHub Actions", "automated linters", "matrix testing", "deployment gates"] },
        { title: "Environment Config", items: ["secret isolation", "dev vs prod variables", "secure syncing", "runtime injection"] },
        { title: "Containerization", items: ["Docker builds", "local symmetry testing", "multi-stage images", "microservices isolating"] },
        { title: "Preview Safety", items: ["branch-based URLs", "isolated test environments", "team QA flows", "PR verification"] },
        { title: "Pipeline Optimization", items: ["build time reduction", "Lighthouse checks", "bundle analyzing", "turborepo caching"] }
      ]
    },
    proof: {
      usedIn: ["Rocky Homepage V3", "Playgrounds", "API Services"],
      whatThisProves: ["Vercel deployment", "CI/CD thinking", "environment control", "production iteration"],
      currentUpgrade: "Adding automated performance testing assertions via GitHub Actions on PRs.",
      copyText: "DevOps Stack: Vercel, Docker, GitHub Actions, CI/CD pipelines."
    }
  },
  {
    id: "design",
    label: "Design System",
    icon: Sparkles,
    toolCount: 8,
    stackLine: "Figma · Typography · Layout Systems · Color Tokens · Component Variants · Motion Language",
    architecture: {
      title: "Visual Design System",
      pipeline: "Tokens → Figma Variants → React Components → Motion → UI",
      blocks: [
        { title: "Color Tokens", items: ["warm canvas palettes", "rainbow accent tokens", "accessible contrast", "section branding"] },
        { title: "Typography", items: ["technical display fonts", "readable body copy", "fluid clamp scaling", "visual hierarchy"] },
        { title: "Grid & Layout", items: ["12-col spatial grid", "bento-box variations", "responsive breakpoints", "spacing rhythms"] },
        { title: "Component Variants", items: ["interactive states", "disabled visual cues", "card hover logic", "strict modularity"] },
        { title: "Motion Choreography", items: ["spring physics", "staggered entrance reveals", "easing curves", "reduced motion checks"] },
        { title: "Prototyping", items: ["Figma auto-layout", "component properties", "developer handoff", "variable management"] }
      ]
    },
    proof: {
      usedIn: ["Rocky Homepage V3", "Project Laboratory", "Component Kits"],
      whatThisProves: ["color tokens", "card variants", "section tones", "interaction states", "visual consistency"],
      currentUpgrade: "Extracting the Rainbow Museum aesthetic into a reusable UI component kit.",
      copyText: "Design Stack: Figma, Design Tokens, Typography, Layout Systems, Motion Language."
    }
  },
  {
    id: "creative",
    label: "Creative Coding",
    icon: Disc,
    toolCount: 6,
    stackLine: "Three.js · GSAP · Canvas · Spatial UI · Interactive Storytelling · Generative Layouts",
    architecture: {
      title: "Creative Visualization",
      pipeline: "DOM → WebGL Canvas → Shaders → Animation Loop → Rendering",
      blocks: [
        { title: "WebGL & Three.js", items: ["3D object loading", "scene graphs", "camera controls", "material shading"] },
        { title: "Timeline Animation", items: ["GSAP sequencing", "scroll-bound triggers", "synchronized states", "complex keyframes"] },
        { title: "Spatial Interfaces", items: ["Z-depth UI projection", "physics simulations", "raycasted interactions", "environmental UI"] },
        { title: "Canvas Drawing", items: ["direct 2D context", "particle generation", "performance loops", "bypassing DOM"] },
        { title: "Algorithmic Layouts", items: ["masonry packing algorithms", "generative placement", "randomized visual sizing", "data-driven art"] },
        { title: "Narrative Flow", items: ["scrolling narratives", "pacing reveals", "immersive data visualization", "art direction"] }
      ]
    },
    proof: {
      usedIn: ["Archive Subsections", "Generative Headers", "Experimental Prompts"],
      whatThisProves: ["spatial logic", "canvas performance", "interactive storytelling", "expressive code"],
      currentUpgrade: "Blending HTML DOM elements more seamlessly into 3D WebGL scenes.",
      copyText: "Creative Stack: Three.js, GSAP, Canvas, WebGL, Generative UI."
    }
  },
  {
    id: "tooling",
    label: "Tooling",
    icon: TerminalSquare,
    toolCount: 8,
    stackLine: "Git · GitHub · pnpm · npm · ESLint · Prettier · VS Code · Chrome DevTools",
    architecture: {
      title: "Workflow & Tooling",
      pipeline: "Code → Lint → Format → Test → Commit → Push",
      blocks: [
        { title: "Version Control", items: ["Git branching", "atomic commits", "rebase workflows", "merge conflict resolution"] },
        { title: "Package Management", items: ["pnpm caching", "workspace configuration", "npm resolution", "fast installations"] },
        { title: "Code Hygiene", items: ["ESLint strict rules", "Prettier formatting", "AST checking", "style consistency"] },
        { title: "Editor Mastery", items: ["VS Code snippets", "keyboard navigation setups", "integrated terminal", "extension optimizing"] },
        { title: "Debugging", items: ["Chrome DevTools", "React profiler tracing", "network payload scanning", "memory leak hunting"] },
        { title: "Automation", items: ["bash scripts", "scaffolding tools", "project initializers", "daily task scripting"] }
      ]
    },
    proof: {
      usedIn: ["Daily Workflow", "All Codebases", "Open Source Tests"],
      whatThisProves: ["version control", "codebase hygiene", "workflow efficiency", "script automation"],
      currentUpgrade: "Replacing manual folder setups with an automated module CLI scaffold.",
      copyText: "Tooling Stack: Git, GitHub, pnpm, ESLint, Prettier, VS Code."
    }
  }
];

const ALL_TOOLS_DETAILS = {
  "TypeScript": { category: "Programming Languages", role: "Type safety", whyIUseIt: "Prevent runtime errors, improve developer experience, and document intent through types.", relatedTools: ["JavaScript", "React"], usedIn: "UI architecture and backend routes", learningFocus: "Advanced generics and strict inference patterns.", nextStep: "Enforce stricter type boundaries in project data schemas." },
  "JavaScript": { category: "Programming Languages", role: "Core logic", whyIUseIt: "The foundational language of the web, used for quick prototyping and scripting.", relatedTools: ["TypeScript"], usedIn: "Legacy projects and raw DOM scripts", learningFocus: "ESNext features.", nextStep: "Adopt new web iteration protocol standards." },
  "Python": { category: "Programming Languages", role: "Scripting / AI", whyIUseIt: "Data science, AI integrations, and quick scripting workflows.", relatedTools: ["FastAPI"], usedIn: "Data processing", learningFocus: "Robust data pipeline generation.", nextStep: "Expand usage for personal archive data normalization." },
  "SQL": { category: "Programming Languages", role: "Query language", whyIUseIt: "The fundamental language for interacting with relational data.", relatedTools: ["PostgreSQL"], usedIn: "Data manipulation", learningFocus: "Pl/pgSQL scripting.", nextStep: "Write custom views for complex data aggregations." },
  "Solidity": { category: "Programming Languages", role: "Smart contracts", whyIUseIt: "Writing programmable money and immutable state logic.", relatedTools: ["Hardhat", "Foundry"], usedIn: "Ethereum scripts", learningFocus: "Security patterns and reentrancy guards.", nextStep: "Deploy a personal content-registry contract." },
  "Bash": { category: "Programming Languages", role: "Shell scripting", whyIUseIt: "Automating system-level tasks and build steps.", relatedTools: ["Git", "Docker"], usedIn: "CI/CD & local workflows", learningFocus: "Complex regex matching in shell.", nextStep: "Unify my disparate project setup scripts." },
  "HTML": { category: "Programming Languages", role: "Document Structure", whyIUseIt: "Semantic structure for all web interfaces.", relatedTools: ["CSS", "React"], usedIn: "Web structure", learningFocus: "Deep accessibility patterns.", nextStep: "Audit structural semantics of all interactive modules." },
  "CSS": { category: "Programming Languages", role: "Styling logic", whyIUseIt: "Core styling language underlying Tailwind and custom interactions.", relatedTools: ["Tailwind CSS", "HTML"], usedIn: "Design rendering", learningFocus: "Modern CSS features like anchor positioning.", nextStep: "Adopt CSS grid subgrid for complex layouts." },
  
  "React": { category: "Frontend", role: "UI framework", whyIUseIt: "Build modular sections, interactive systems, and reusable interface architecture.", relatedTools: ["Next.js", "TypeScript", "Tailwind CSS"], usedIn: "Homepage V3, Core UIs", learningFocus: "Cleaner state boundaries and reusable design-system primitives.", nextStep: "Refactor repeated UI patterns into better reusable components." },
  "Next.js": { category: "Frontend", role: "App framework", whyIUseIt: "Server-side rendering, routing structure, and full-stack capabilities.", relatedTools: ["React", "Vercel"], usedIn: "Production apps", learningFocus: "App router paradigms and RSC.", nextStep: "Migrate more static site experiments to server-driven patterns." },
  "Tailwind CSS": { category: "Frontend", role: "Visual system", whyIUseIt: "Rapid styling, token management, and consistent responsive spacing.", relatedTools: ["React", "Figma"], usedIn: "Rainbow UI", learningFocus: "Tailwind v4 optimization.", nextStep: "Extract homepage colors into reusable Tailwind plugins." },
  "Framer Motion": { category: "Frontend", role: "Interaction", whyIUseIt: "Fluid mount animations, layout transitions, and complex interactive states.", relatedTools: ["React"], usedIn: "Transitions", learningFocus: "Scroll-based layout projection.", nextStep: "Refine spring animation values for the museum exhibits." },
  "Vite": { category: "Frontend", role: "Build tool", whyIUseIt: "Extremely fast HMR and optimized production bundling.", relatedTools: ["React", "TypeScript"], usedIn: "Vercel dev environment", learningFocus: "Rollup plugin mapping.", nextStep: "Optimize asset chunking for faster initial loads." },
  "Zustand": { category: "Frontend", role: "State handling", whyIUseIt: "Lightweight, boilerplate-free global state management.", relatedTools: ["React"], usedIn: "Global UI slices", learningFocus: "Middleware logic and persistence loops.", nextStep: "Replace standard context where React reconciliation suffers." },
  "React Query": { category: "Frontend", role: "Data fetching", whyIUseIt: "Handling async state, caching, and optimistic UI updates.", relatedTools: ["React"], usedIn: "API hydration", learningFocus: "Query invalidation chains.", nextStep: "Implement for seamless project data fetching." },
  "Responsive UI": { category: "Frontend", role: "Architecture pattern", whyIUseIt: "Ensuring interface structure adapts fluidly to all devices.", relatedTools: ["CSS", "Tailwind CSS"], usedIn: "Global Layout", learningFocus: "Container queries scaling.", nextStep: "Eliminate legacy media query break points." },
  "Accessibility": { category: "Frontend", role: "Design integrity", whyIUseIt: "Opening the museum to keyboard navigators, screen readers, and high-contrast users.", relatedTools: ["HTML", "React"], usedIn: "UI Semantics", learningFocus: "ARIA live region tuning.", nextStep: "Run a full lighthouse accessibility audit on modals." },
  "Component Architecture": { category: "Frontend", role: "System design", whyIUseIt: "Creating building blocks that are modular, readable, and highly reusable.", relatedTools: ["React", "TypeScript"], usedIn: "Homepage sections", learningFocus: "Compound component patterns.", nextStep: "Split oversized monolith sections into precise sub-components." },

  "Node.js": { category: "Backend", role: "Runtime", whyIUseIt: "Standardized cross-stack language and heavily parallel I/O.", relatedTools: ["Express", "TypeScript"], usedIn: "Server processes", learningFocus: "Event loop tuning.", nextStep: "Optimize node runtime flags for API speed." },
  "Express": { category: "Backend", role: "Framework", whyIUseIt: "Battle-tested, simple API routing logic.", relatedTools: ["Node.js"], usedIn: "Legacy APIs", learningFocus: "Custom middleware caching.", nextStep: "Transition core routes to a more typed approach." },
  "FastAPI": { category: "Backend", role: "Python API Framework", whyIUseIt: "Fast Python APIs with automatic docs and strict type checking.", relatedTools: ["Python"], usedIn: "AI endpoints", learningFocus: "Async execution in python threads.", nextStep: "Integrate more powerful generative models behind FastAPI." },
  "REST APIs": { category: "Backend", role: "Architecture standard", whyIUseIt: "Standardized predictable communication between systems.", relatedTools: ["Express"], usedIn: "Client-server comms", learningFocus: "OpenAPI spec generation from code.", nextStep: "Maintain zero-drift documentation for routes." },
  "WebSockets": { category: "Backend", role: "Real-time protocol", whyIUseIt: "Live, low-latency, two-way communication.", relatedTools: ["Node.js"], usedIn: "Live events", learningFocus: "Reconnection and state healing.", nextStep: "Build a real-time presence cursor for the homepage." },
  "PostgreSQL": { category: "Backend", role: "Relational DB", whyIUseIt: "Robust, relational, strictly typed data persistence.", relatedTools: ["Prisma", "SQL"], usedIn: "Core DB", learningFocus: "Complex partitioning.", nextStep: "Build a full normalized data layer for my personal archive." },
  "MongoDB": { category: "Backend", role: "NoSQL DB", whyIUseIt: "Flexible schema prototyping and storing deeply nested artifacts.", relatedTools: ["Node.js"], usedIn: "Document stores", learningFocus: "Aggregation logic.", nextStep: "Evaluate standard use-cases vs. Postgres JSONB advantages." },
  "Prisma": { category: "Backend", role: "ORM", whyIUseIt: "Type-safe database interaction and clean migration tracking.", relatedTools: ["PostgreSQL", "TypeScript"], usedIn: "Data models", learningFocus: "Performance inside deep includes.", nextStep: "Audit deeply nested queries for hidden N+1 performance hits." },
  "Supabase": { category: "Backend", role: "BaaS", whyIUseIt: "Instant Postgres infrastructure with integrated auth and raw edge functions.", relatedTools: ["PostgreSQL", "React"], usedIn: "Auth & APIs", learningFocus: "RLS policy architecture.", nextStep: "Replace manual auth flows with pure Supabase boundaries." },

  "OpenAI API": { category: "AI", role: "LLM Access", whyIUseIt: "State-of-the-art text generation, reasoning, and data formatting.", relatedTools: ["Prompt Engineering", "Tool Calling"], usedIn: "Generative logic", learningFocus: "Streaming structured output validation.", nextStep: "Implement stronger deterministic failure fallbacks." },
  "Prompt Engineering": { category: "AI", role: "System direction", whyIUseIt: "Guiding unpredictable LLM generation into precise, strictly formatted outcomes.", relatedTools: ["AI Studio"], usedIn: "Context bounds", learningFocus: "Few-shot embedding.", nextStep: "Establish a controlled library of standardized system prompts." },
  "Tool Calling": { category: "AI", role: "Agent interfaces", whyIUseIt: "Allowing an LLM to trigger real-world application functions safely.", relatedTools: ["OpenAI API"], usedIn: "Interactive AI", learningFocus: "Hallucinated schema handling.", nextStep: "Allow an intelligent assistant to safely alter UI state data." },
  "RAG Concepts": { category: "AI", role: "Knowledge integration", whyIUseIt: "Injecting specific, true external data to prevent model hallucination.", relatedTools: ["Embeddings"], usedIn: "Semantic searching", learningFocus: "Context window chunking variables.", nextStep: "Implement vector retrieval across personal markdown notes." },
  "Embeddings": { category: "AI", role: "Semantic representation", whyIUseIt: "Mapping conceptual meaning instead of keyword searching.", relatedTools: ["RAG Concepts"], usedIn: "Data architecture", learningFocus: "Multi-dimensional distances.", nextStep: "Deploy a small local semantic store for instant results." },
  "Agent Workflow": { category: "AI", role: "Autonomous execution", whyIUseIt: "Running multi-step, reflective, looping generation tasks.", relatedTools: ["Tool Calling", "Python"], usedIn: "Data processing", learningFocus: "State management between iterative steps.", nextStep: "Set up a specialized agent for code refactoring reviews." },
  "AI Studio": { category: "AI", role: "LLM Dev environment", whyIUseIt: "Rapidly testing model configurations, tokens, and prompt chains.", relatedTools: ["Prompt Engineering"], usedIn: "Playgrounds", learningFocus: "Hyperparameter tuning defaults.", nextStep: "Deploy exported instruction chains directly into code apps." },
  "LLM UI Patterns": { category: "AI", role: "Human-AI Design", whyIUseIt: "Designing intuitive, calm loading states for non-deterministic AI generation.", relatedTools: ["React", "Framer Motion"], usedIn: "Assistants", learningFocus: "Token streaming visualization.", nextStep: "Build a more satisfying visual indicator while an LLM 'thinks'." },

  "Solidity": { category: "Web3", role: "Contract coding", whyIUseIt: "Writing programmable logic directly onto the Ethereum ledger.", relatedTools: ["Hardhat"], usedIn: "Ethereum", learningFocus: "Reentrancy security.", nextStep: "Draft a basic access-control contract for unique assets." },
  "Ethers.js": { category: "Web3", role: "RPC communication", whyIUseIt: "Translating blockchain state into frontend readability.", relatedTools: ["Wagmi"], usedIn: "Web3 interfaces", learningFocus: "Low-level provider logic.", nextStep: "Optimize block event listening strategies." },
  "Wagmi": { category: "Web3", role: "React Web3 Hooks", whyIUseIt: "Managing complex wallet state and async contract calls cleanly.", relatedTools: ["React", "Ethers.js"], usedIn: "dApp UX", learningFocus: "Client-side state caching.", nextStep: "Fully upgrade legacy projects to Wagmi v2 architecture." },
  "RainbowKit": { category: "Web3", role: "Wallet UX Component", whyIUseIt: "Providing the absolute best user experience for wallet connection flows.", relatedTools: ["Wagmi"], usedIn: "Onboarding dialogs", learningFocus: "Custom theme mapping.", nextStep: "Style a RainbowKit config to match my exact brand tokens." },
  "Hardhat": { category: "Web3", role: "Contract dev suite", whyIUseIt: "Compiling, simulating, and validating smart contracts locally.", relatedTools: ["Solidity"], usedIn: "Testing", learningFocus: "Mainnet state forking.", nextStep: "Run local economic simulations for contract edge cases." },
  "Foundry": { category: "Web3", role: "Testing architecture", whyIUseIt: "Extremely fast execution and deep fuzz testing, written in native Solidity.", relatedTools: ["Solidity"], usedIn: "Security assurance", learningFocus: "Fuzz logic constraints.", nextStep: "Rewrite my old TS-based test scripts into native Solidity tests." },
  "Wallet UX": { category: "Web3", role: "Behavioral design", whyIUseIt: "Bridging terrifying cryptographic tasks into clear, readable human actions.", relatedTools: ["RainbowKit"], usedIn: "dApps", learningFocus: "Transaction simulation clarity.", nextStep: "Design an interface that explains exactly what a signature does before confirming." },
  "Contract Interaction": { category: "Web3", role: "Integration logic", whyIUseIt: "Hooking React UI states directly to deep blockchain read/write events.", relatedTools: ["Wagmi"], usedIn: "State rendering", learningFocus: "Optimistic chain updates.", nextStep: "Build a smooth error-handling boundary for rejected transactions." },

  "Vercel": { category: "DevOps", role: "Hosting & Orchestration", whyIUseIt: "The best possible developer experience for rendering and edge deployments.", relatedTools: ["Next.js", "CI/CD"], usedIn: "All frontend hosting", learningFocus: "Edge middleware.", nextStep: "Implement deeper custom caching headers at the edge." },
  "Docker": { category: "DevOps", role: "Containerization", whyIUseIt: "Guaranteeing exactly synchronized environments across local, staging, and production.", relatedTools: ["CI/CD"], usedIn: "Backend dev environments", learningFocus: "Multi-stage artifact extraction.", nextStep: "Slim down large node container sizes using alpine isolation." },
  "GitHub Actions": { category: "DevOps", role: "Workflow automation", whyIUseIt: "Running tests, type-checks, and builds autonomously upon code pushes.", relatedTools: ["GitHub"], usedIn: "Pipelines", learningFocus: "Matrix OS testing.", nextStep: "Introduce automated bundle-size monitoring in PRs." },
  "CI/CD": { category: "DevOps", role: "Continuous Integration", whyIUseIt: "Merging and shipping fast while strictly protecting production stability.", relatedTools: ["GitHub Actions", "Vercel"], usedIn: "Deployment workflow", learningFocus: "Zero-downtime database rollout safety.", nextStep: "Formalize a strict branch-protection merge strategy." },
  "Preview Deployments": { category: "DevOps", role: "Quality assurance", whyIUseIt: "Verifying the exact compiled aesthetic before it hits real users.", relatedTools: ["Vercel"], usedIn: "PR reviews", learningFocus: "Preview database branching.", nextStep: "Explore Neon Serverless for instant DB preview isolation on demand." },
  "Environment Variables": { category: "DevOps", role: "Secret boundaries", whyIUseIt: "Protecting API keys and managing separate behaviors in dev vs prod.", relatedTools: ["Vercel", "Docker"], usedIn: "Configuration", learningFocus: "Secure synchronization tools.", nextStep: "Standardize a team-level secure local env injection tool." },
  "Build Pipelines": { category: "DevOps", role: "Compilation speed", whyIUseIt: "Tuning the transformation of code into optimized production assets.", relatedTools: ["Vite", "GitHub Actions"], usedIn: "Release sequences", learningFocus: "Turborepo cache logic.", nextStep: "Analyze Vite chunk output to optimize first-contentful-paint." },

  "Figma": { category: "Design System", role: "Visual playground", whyIUseIt: "Designing layouts, organizing component libraries, and testing high-fidelity interactions before coding.", relatedTools: ["Design Systems", "Component Variants"], usedIn: "Wireframing & Prototyping", learningFocus: "Advanced variable binding.", nextStep: "Link Figma JSON tokens directly to the Tailwind config file." },
  "Typography": { category: "Design System", role: "Information clarity", whyIUseIt: "Driving the tone—pairing technical display fonts like JetBrains Mono with warm sans-serif bodies.", relatedTools: ["Layout Systems"], usedIn: "Content rendering", learningFocus: "Fluid font clamp intervals.", nextStep: "Refine font weight variables to respond to container width." },
  "Layout Systems": { category: "Design System", role: "Architectural structure", whyIUseIt: "Organizing complex information into readable, calm, and spacious structural columns.", relatedTools: ["Tailwind CSS"], usedIn: "Page construction", learningFocus: "CSS subgrids bridging.", nextStep: "Implement advanced uneven bento grids for exhibit cards." },
  "Color Tokens": { category: "Design System", role: "Tone and Brand", whyIUseIt: "Building the exact 'warm paper, dark ink, and subtle rainbow glow' aesthetic.", relatedTools: ["Figma", "Tailwind CSS"], usedIn: "Aesthetic foundation", learningFocus: "Oklch color transformations.", nextStep: "Migrate static hex values to an interpolated perceptual scale." },
  "Component Variants": { category: "Design System", role: "State mapping", whyIUseIt: "Controlling exactly how a component feels at rest, hover, focus, disabled, or loading.", relatedTools: ["React", "Figma"], usedIn: "UI Primitives", learningFocus: "Interactive prototyping dependencies.", nextStep: "Ensure perfect 1:1 behavioral sync between Figma states and React props." },
  "Interaction States": { category: "Design System", role: "Tactile feedback", whyIUseIt: "Providing the user with instantaneous, satisfying feedback upon hover, click, or error.", relatedTools: ["CSS", "Motion Language"], usedIn: "Buttons & Cards", learningFocus: "Psychological timing thresholds.", nextStep: "Unify outline focus-visible rings across all interactive elements globally." },
  "Motion Language": { category: "Design System", role: "Choreographic logic", whyIUseIt: "Using physics and easing vectors to give the interfaces weight, presence, and direction.", relatedTools: ["Framer Motion", "GSAP"], usedIn: "Transitions", learningFocus: "Micro-interaction satisfaction curves.", nextStep: "Audit and strictly standardize spring stiffness and damping variables." },
  "Visual Hierarchy": { category: "Design System", role: "Cognitive guidance", whyIUseIt: "Creating rhythms of size, color, and padding so a page naturally reads in order of importance.", relatedTools: ["Typography"], usedIn: "All views", learningFocus: "Peripheral distraction elimination.", nextStep: "Simplify UI density by removing secondary borders." },

  "Three.js": { category: "Creative Coding", role: "3D WebGL", whyIUseIt: "Constructing massive 3D scenes, loading models, and writing custom spatial material shaders.", relatedTools: ["Canvas"], usedIn: "Visual experiments", learningFocus: "Optimized scene graph hydration.", nextStep: "Build an interactive 3D particle archive representation system." },
  "GSAP": { category: "Creative Coding", role: "Complex choreography", whyIUseIt: "The unquestioned industry standard for heavy timeline-based and scroll-triggered DOM modifications.", relatedTools: ["Three.js"], usedIn: "Scroll sequences", learningFocus: "ScrollTrigger advanced pinned layouts.", nextStep: "Use GSAP to orchestrate a stunning multi-element section entrance." },
  "Canvas": { category: "Creative Coding", role: "Render context", whyIUseIt: "Bypassing the heavy browser DOM entirely to paint thousands of elements smoothly at 60fps.", relatedTools: ["Three.js"], usedIn: "High-density particle grids", learningFocus: "requestAnimationFrame loop optimization.", nextStep: "Create a generative canvas data-stream background for an idle state." },
  "Spatial UI": { category: "Creative Coding", role: "Z-depth logic", whyIUseIt: "Moving beyond 2D plains to interactions that use perspective meaningfully to tell a story.", relatedTools: ["Three.js"], usedIn: "Experiments", learningFocus: "Raycasting intersections over complex geometry.", nextStep: "Prototype a spatial gallery where old projects float in the background." },
  "Interactive Storytelling": { category: "Creative Coding", role: "Narrative structure", whyIUseIt: "Using motion and input to make an article or case study feel like a physical journey, not a word document.", relatedTools: ["GSAP"], usedIn: "Museum flow", learningFocus: "Accessible scroll alternatives.", nextStep: "Transform a static case-study text into a progressive visual build." },
  "Generative Layouts": { category: "Creative Coding", role: "Algorithmic geometry", whyIUseIt: "Writing logical systems that automatically size and position unpredictable content beautifully without manual intervention.", relatedTools: ["React", "CSS"], usedIn: "Data grids", learningFocus: "Binary tree space packing algorithms.", nextStep: "Implement a perfectly balanced generative grid for my chaotic image archive." },

  "Git": { category: "Tooling", role: "Version control", whyIUseIt: "Safely exploring wild experimental architecture while protecting the verified main codebase history.", relatedTools: ["GitHub"], usedIn: "All projects", learningFocus: "Complex interactive rebasing.", nextStep: "Enforce a stricter atomic commit history methodology." },
  "GitHub": { category: "Tooling", role: "Source nexus", whyIUseIt: "Managing code distribution, collaborating with other systems, and orchestrating CI runner actions.", relatedTools: ["Git", "GitHub Actions"], usedIn: "Code hosting", learningFocus: "Automated issue labelling rules.", nextStep: "Expose live project health stats directly through the GitHub GraphQL API." },
  "pnpm": { category: "Tooling", role: "Package dependency engine", whyIUseIt: "Insanely fast, cryptographically strict, disk-efficient package management and superior monorepo support.", relatedTools: ["npm", "Node.js"], usedIn: "Standard scaffolding", learningFocus: "Strict workspace config hoisting.", nextStep: "Mandatorily replace npm in all lingering legacy projects." },
  "npm": { category: "Tooling", role: "Legacy dependency engine", whyIUseIt: "The foundational node package system, used purely when pnpm compatibility is not possible.", relatedTools: ["pnpm"], usedIn: "Legacy projects", learningFocus: "Overriding dependency resolutions.", nextStep: "Aggressively migrate all remaining packages away from npm." },
  "ESLint": { category: "Tooling", role: "Syntax enforcer", whyIUseIt: "Catching logic errors before runtime and aggressively enforcing strict architectural rules simultaneously across teams.", relatedTools: ["Prettier", "TypeScript"], usedIn: "Linting pipelines", learningFocus: "Writing custom AST validation logic.", nextStep: "Publish a strictly opinionated personal ESLint config package." },
  "Prettier": { category: "Tooling", role: "Aesthetic formatter", whyIUseIt: "Eliminating trivial formatting thoughts entirely by automating aesthetics instantly on keyboard save.", relatedTools: ["ESLint"], usedIn: "Formatting passes", learningFocus: "Tailwind class-sorting deterministic configs.", nextStep: "Verify perfect alignment between Prettier and nested ESLint rules without collisions." },
  "VS Code": { category: "Tooling", role: "Command terminal", whyIUseIt: "The supreme editor workspace boasting unbeatable ecosystem plugin capability and terminal unification.", relatedTools: ["Prettier", "Git"], usedIn: "Daily workflow", learningFocus: "Advanced custom snippet structures.", nextStep: "Master total keyboard-only navigation flows to remove mouse dependency." },
  "Chrome DevTools": { category: "Tooling", role: "System inspection", whyIUseIt: "Extracting timeline flame charts, dissecting network payloads, hunting memory leaks, and tuning CSS in real-time.", relatedTools: ["React"], usedIn: "Browser debugging", learningFocus: "Advanced rendering optimization profiling.", nextStep: "Locate and destroy any trailing layout-shifting (CLS) bottlenecks using the performance trace." }
};

const ARSENAL_GROUPS = [
  { category: "Programming Languages", tools: ["TypeScript", "JavaScript", "Python", "SQL", "Solidity", "Bash", "HTML", "CSS"] },
  { category: "Frontend", tools: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "Zustand", "React Query", "Responsive UI", "Accessibility", "Component Architecture"] },
  { category: "Backend", tools: ["Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "PostgreSQL", "MongoDB", "Prisma", "Supabase"] },
  { category: "AI", tools: ["OpenAI API", "Prompt Engineering", "Tool Calling", "RAG Concepts", "Embeddings", "Agent Workflow", "AI Studio", "LLM UI Patterns"] },
  { category: "Web3", tools: ["Solidity", "Ethers.js", "Wagmi", "RainbowKit", "Hardhat", "Foundry", "Wallet UX", "Contract Interaction"] },
  { category: "DevOps", tools: ["Vercel", "Docker", "GitHub Actions", "CI/CD", "Preview Deployments", "Environment Variables", "Build Pipelines"] },
  { category: "Design System", tools: ["Figma", "Typography", "Layout Systems", "Color Tokens", "Component Variants", "Interaction States", "Motion Language", "Visual Hierarchy"] },
  { category: "Creative Coding", tools: ["Three.js", "GSAP", "Canvas", "Spatial UI", "Interactive Storytelling", "Generative Layouts"] },
  { category: "Tooling", tools: ["Git", "GitHub", "pnpm", "npm", "ESLint", "Prettier", "VS Code", "Chrome DevTools"] }
];

const HUMAN_LANGUAGES = [
  { name: "English", level: "Working" },
  { name: "Chinese", level: "Working" },
  { name: "Spanish", level: "Learning" },
  { name: "French", level: "Learning" },
  { name: "Japanese", level: "Learning" }
];

export function CoreCapabilitiesModule() {
  const [activeDomainId, setActiveDomainId] = useState(DOMAINS[0].id);
  const [copied, setCopied] = useState(false);
  const [copiedStack, setCopiedStack] = useState(false);
  const [selectedToolData, setSelectedToolData] = useState<any>(null);

  const activeDomain = DOMAINS.find(d => d.id === activeDomainId) || DOMAINS[0];

  const handleCopyStack = () => {
    navigator.clipboard.writeText(activeDomain.proof.copyText);
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  const handleCopyArchitecture = () => {
    navigator.clipboard.writeText(activeDomain.architecture.title + " Architecture");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedToolData(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedToolData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedToolData]);

  return (
    <div className="w-[min(92vw,1720px)] mx-auto flex flex-col gap-8 lg:gap-10 relative z-10">
      
      {/* 1. Header Bar (12 cols) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--border)] pb-6 hover:border-[var(--orange)]/30 transition-colors group px-1">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[var(--orange)] flex items-center gap-2 mb-3">
            Hall 02 <span className="w-6 h-px bg-[var(--orange)] opacity-50" /> Capability System
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-space font-bold tracking-tight text-[var(--ink)] mb-3 transition-colors group-hover:text-[var(--orange)]">
            Capability Forge
          </h2>
          <p className="text-[var(--ink-soft)] font-medium text-sm lg:text-base leading-relaxed mb-4 max-w-3xl">
            A technical showcase of the tools, systems, and frontend architecture I use to build modern interfaces.
          </p>
          <div className="flex items-center gap-3 bg-[var(--hall-surface)] border border-[var(--border)] px-4 py-2.5 rounded-lg w-fit shadow-sm">
             <div className="w-1.5 h-1.5 bg-[var(--orange)] rounded-full shadow-[0_0_8px_var(--orange)] animate-pulse" />
             <p className="text-xs font-mono font-bold tracking-widest text-[var(--ink)]">
               This section demonstrates component architecture, responsive systems, design tokens, motion, data-driven UI, and production workflow.
             </p>
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
            <button 
               onClick={handleCopyStack}
               className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] bg-white hover:bg-[var(--orange)] hover:text-white border-[var(--orange)] hover:border-[var(--orange)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-lg px-6 py-3 border transition-all shadow-sm group/btn"
             >
               {copiedStack ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-[var(--orange)] group-hover/btn:text-white transition-colors" />}
               {copiedStack ? "Copied!" : "Copy Stack"}
             </button>
        </div>
      </div>
      
      {/* 2. Main Frontend Power Board */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch">
         
         {/* Domain Selector (2 cols) */}
         <div className="lg:col-span-2 flex flex-col gap-1.5 relative z-10 w-full overflow-x-auto lg:overflow-visible hide-scrollbar pb-2 lg:pb-0 font-mono flex-row lg:flex-col pr-4 lg:pr-0 -mx-4 px-4 lg:mx-0">
            {DOMAINS.map(domain => {
              const isActive = activeDomainId === domain.id;
              const Icon = domain.icon;
              return (
                <button
                   key={domain.id}
                   onClick={() => setActiveDomainId(domain.id)}
                   aria-selected={isActive}
                   className={cn(
                     "shrink-0 flex items-center justify-between px-3.5 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-left min-w-[150px] lg:min-w-0 border",
                     isActive 
                       ? "bg-[var(--hall-soft)] text-[var(--orange)] border-[var(--orange)] shadow-sm ring-1 ring-[var(--orange)] relative"
                       : "bg-white text-[var(--ink-soft)] border-[var(--border)] hover:bg-[var(--hall-surface)] hover:border-[var(--orange)]/40 hover:text-[var(--ink)]"
                   )}
                 >
                   {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[40%] bg-[var(--orange)] rounded-r-md" />}
                   <div className="flex items-center gap-3">
                     <span className={isActive ? "text-[var(--orange)]" : "text-[var(--ink-muted)] opacity-70"}>
                       <Icon className="w-4 h-4" />
                     </span>
                     {domain.label}
                   </div>
                   <span className={cn("text-[9px] px-1.5 py-0.5 rounded shadow-sm", isActive ? "bg-[var(--orange)]/10 text-[var(--orange)] border border-[var(--orange)]/20" : "bg-[var(--hall-surface)] text-[var(--ink-muted)] border border-[var(--border)]")}>
                     {domain.toolCount}
                   </span>
                 </button>
              )
            })}
         </div>

         {/* Architecture Showcase (7 cols) */}
         <div className="lg:col-span-7 flex flex-col bg-white border border-[var(--border)] rounded-xl relative shadow-sm overflow-hidden min-h-[420px]">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
              style={{
                backgroundImage: \`linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)\`,
                backgroundSize: '24px 24px',
                backgroundPosition: 'center center'
              }}
            />
            <div className="absolute top-0 right-0 w-1/3 h-1 bg-gradient-to-l from-[var(--orange)] to-transparent opacity-80" />

            <div className="relative z-10 p-6 lg:p-8 flex flex-col h-full"> 
               <h3 className="text-2xl font-space font-bold tracking-tight text-[var(--ink)] mb-2 flex items-center gap-3">
                  <activeDomain.icon className="w-6 h-6 text-[var(--orange)]" /> {activeDomain.architecture.title}
               </h3>
               <p className="font-mono text-[10px] uppercase font-bold text-[var(--orange)] tracking-wider mb-6 pb-6 border-b border-[var(--border)]">
                  {activeDomain.stackLine}
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-1 mb-6">
                  {activeDomain.architecture.blocks.map((block, i) => (
                    <div key={i} className="flex flex-col">
                      <h4 className="font-mono text-[11px] uppercase tracking-widest font-bold text-[var(--ink)] mb-3 pb-2 border-b border-[var(--orange)]/30 flex items-center gap-2">
                        <span className="text-[var(--orange)] font-bold">{String.fromCharCode(65+i)}.</span> {block.title}
                      </h4>
                      <ul className="space-y-2">
                        {block.items.map((item, j) => (
                          <li key={j} className="text-xs font-medium text-[var(--ink-soft)] flex items-start gap-2.5 group">
                            <div className="w-1 h-1 rounded-full bg-[var(--orange)]/40 border border-[var(--orange)]/20 mt-1.5 shrink-0 group-hover:bg-[var(--orange)] transition-colors" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>

               {/* Pipeline Line */}
               <div className="mt-auto pt-5 border-t border-[var(--border)] flex items-center gap-3">
                 <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] shrink-0">Pipeline</div>
                 <div className="h-px bg-gradient-to-r from-[var(--border)] via-[var(--orange)]/50 to-[var(--border)] flex-1 relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ink-muted)]" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--orange)]" />
                 </div>
                 <div className="text-[9px] font-mono font-bold tracking-widest text-[var(--orange)] shrink-0 bg-[var(--orange)]/5 px-2 py-1 rounded">
                   {activeDomain.architecture.pipeline}
                 </div>
               </div>
            </div>
         </div>

         {/* Technical Proof Panel (3 cols) */}
         <div className="lg:col-span-3 flex flex-col bg-[var(--hall-soft)]/50 border border-[var(--border)] rounded-xl shadow-sm overflow-hidden p-6 lg:p-7 h-full relative group">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--blue)]/5 blur-3xl rounded-full pointer-events-none" />
             
             <div className="relative z-10 flex flex-col h-full">
               <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--blue)] mb-5 pb-3 border-b border-[var(--blue)]/30 flex items-center gap-2">
                 <Workflow className="w-4 h-4" /> Domain Proof
               </h4>
               
               <div className="flex flex-col gap-5 flex-1">
                 <div className="flex flex-col gap-2.5">
                   <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)]">Used In:</h5>
                   <ul className="space-y-2.5">
                     {activeDomain.proof.usedIn.map((item, i) => (
                       <li key={i} className="text-xs font-bold text-[var(--ink)] bg-white border border-[var(--border)] px-3 py-2 rounded shadow-sm flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]/20 border border-[var(--blue)] shrink-0" />
                         <span className="leading-tight">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="flex flex-col gap-2 mt-2">
                   <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)]">What This Proves:</h5>
                   <ul className="space-y-1.5 pl-1.5 border-l-2 border-[var(--border)] ml-1">
                     {activeDomain.proof.whatThisProves.map((item, i) => (
                       <li key={i} className="text-xs font-medium text-[var(--ink)] pl-2">{item}</li>
                     ))}
                   </ul>
                 </div>
               </div>

               <div className="mt-8 flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                   <h5 className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--purple)]">Current Upgrade:</h5>
                   <p className="text-xs font-bold text-[var(--ink-soft)] leading-snug">{activeDomain.proof.currentUpgrade}</p>
                 </div>
                 
                 <button 
                   onClick={handleCopyArchitecture}
                   className="w-full shrink-0 flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink)] bg-white hover:bg-[var(--blue)] hover:text-white border-[var(--border)] hover:border-[var(--blue)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] rounded-lg px-4 py-2 border transition-all shadow-sm"
                 >
                   {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                   {copied ? "Copied!" : (\`Copy \${activeDomain.label} Stack\`)}
                 </button>
               </div>
             </div>
         </div>
      </div>

      {/* 4. Interaction / Architecture Proof full-width strip */}
      <div className="w-full mt-2">
         <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink)] flex items-center gap-2 mb-4 pl-1">
           <Layers className="w-3.5 h-3.5 text-[var(--purple)]" /> Architecture Proof Layer
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
             {[
                 {
                     color: "var(--orange)", title: "Component Architecture",
                     desc: "Reusable homepage sections, card variants, and layout primitives."
                 },
                 {
                     color: "var(--blue)", title: "Stateful UI",
                     desc: "Filters, selected states, drawers, copy actions, and active routes."
                 },
                 {
                     color: "var(--cyan)", title: "Responsive Systems",
                     desc: "Wide desktop canvas, tablet adaptation, and clean mobile stacking."
                 },
                 {
                     color: "var(--ink)", title: "Design-System Control",
                     desc: "Color tokens, typography, section tones, badges, borders, and motion."
                 },
                 {
                     color: "#FF006E", title: "Data-driven Modules",
                     desc: "Project data, tech stack mapping, selected project logic, dynamic rendering."
                 },
                 {
                     color: "var(--purple)", title: "Shipping Workflow",
                     desc: "GitHub, Vercel, preview deployments, iteration, and cleanup."
                 }
             ].map((proof, i) => (
                 <div key={i} className="flex flex-col p-4 lg:p-5 bg-white border border-[var(--border)] rounded-xl shadow-sm hover:border-[var(--border)] hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-[4px] h-[30%] opacity-80 group-hover:h-full transition-all duration-300" style={{ backgroundColor: proof.color }} />
                     <h5 className="font-space font-bold text-[var(--ink)] text-sm mb-2 pl-2">
                        {proof.title}
                     </h5>
                     <p className="text-[11px] font-medium font-mono text-[var(--ink-soft)] leading-relaxed pl-2 mt-auto">
                        {proof.desc}
                     </p>
                 </div>
             ))}
         </div>
      </div>

      {/* 3. Technical Arsenal (Full-width sections) */}
      <div className="w-full mt-4 bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 lg:p-8 relative">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
             <Settings className="w-24 h-24 text-[var(--ink-muted)] animate-[spin_60s_linear_infinite]" />
          </div>
          <h3 className="text-[14px] font-space font-bold tracking-tight text-[var(--ink)] uppercase flex items-center gap-2 mb-8 pb-4 border-b border-[var(--border)] relative z-10 w-fit">
            <Settings className="w-4 h-4 text-[var(--ink-muted)]" /> Technical Arsenal
          </h3>

          <div className="flex flex-col gap-6 relative z-10 lg:pl-2">
             {ARSENAL_GROUPS.map((group, index) => (
               <div key={index} className="flex flex-col xl:flex-row gap-2 xl:gap-8 xl:items-start group">
                 <div className="xl:w-48 shrink-0 py-1.5 flex items-center gap-2 border-b xl:border-b-0 border-[var(--border)] xl:border-transparent pb-3 xl:pb-0 mb-2 xl:mb-0">
                    <div className="w-1 h-3 bg-[var(--orange)] rounded-[1px] opacity-10 xl:opacity-100 group-hover:bg-[var(--orange)] transition-colors" />
                    <h4 className="text-[10px] uppercase font-mono font-bold text-[var(--ink-muted)] tracking-wider group-hover:text-[var(--ink)] xl:group-hover:text-[var(--orange)] transition-colors">
                       {group.category}
                    </h4>
                 </div>
                 
                 <div className="flex flex-wrap gap-2.5 flex-1">
                    {group.tools.map((toolName, j) => {
                       // Find tool data or fallback to generic
                       const toolData = ALL_TOOLS_DETAILS[toolName as keyof typeof ALL_TOOLS_DETAILS] || { name: toolName, category: group.category, role: "Tool", whyIUseIt: "A vital part of my workflow.", relatedTools: [], usedIn: "Various Projects", learningFocus: "Advanced application", nextStep: "Deeper integration into current stack" };
                       if (!toolData.name) { toolData.name = toolName; }
                       
                       return (
                         <button 
                           key={j}
                           onClick={() => setSelectedToolData(toolData)}
                           className="bg-[var(--hall-surface)] border border-[var(--border)] px-3.5 py-1.5 rounded-lg shadow-sm text-xs font-bold text-[var(--ink)] hover:border-[var(--orange)] hover:-translate-y-[1px] hover:bg-white hover:text-[var(--orange)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] group/chip flex items-center justify-between gap-3 text-left"
                         >
                           {toolName}
                           <ChevronRight className="w-3 h-3 text-[var(--ink-muted)] opacity-50 group-hover/chip:text-[var(--orange)] group-hover/chip:opacity-100 group-hover/chip:translate-x-0.5 transition-all" />
                         </button>
                       )
                    })}
                 </div>
               </div>
             ))}
          </div>
      </div>

      {/* 5. Global Communication Layer - Small, secondary section */}
      <div className="w-full mt-4 bg-[var(--hall-soft)]/30 border border-[var(--border)] rounded-xl p-5 relative overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center bg-white/50">
         <div className="flex flex-col gap-1.5 max-w-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--ink)] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[var(--cyan)]" /> Global Communication Layer
            </h3>
            <p className="text-[10px] font-mono text-[var(--ink-soft)] leading-relaxed">
              Language learning and cross-cultural communication patterns. NOT a technical stack.
            </p>
         </div>

         <div className="flex flex-wrap justify-end gap-3 lg:gap-4 relative z-10 w-full md:w-auto">
            {HUMAN_LANGUAGES.map((lang, i) => (
               <div key={i} className="flex flex-col bg-white border border-[var(--border)] rounded-lg px-4 py-2 shadow-sm min-w-[110px]">
                  <h4 className="font-space font-bold text-[var(--ink)] text-sm">{lang.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                     <span className={cn("w-1 h-3 rounded shadow-sm", 
                        lang.level === "Working" ? "bg-[var(--cyan)]" : "bg-[var(--purple)]/50"
                     )} />
                     <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--ink-soft)]">{lang.level}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Tool Detail Drawer */}
      <AnimatePresence>
        {selectedToolData && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-[var(--ink)]/40 backdrop-blur-sm z-[100]"
               onClick={() => setSelectedToolData(null)}
            />
            <motion.div 
               initial={{ x: "100%", opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: "100%", opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white border-l border-[var(--border)] shadow-2xl z-[101] flex flex-col p-6 lg:p-8 overflow-y-auto"
            >
               <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
                 <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--orange)] bg-[var(--orange)]/10 px-2.5 py-1 rounded border border-[var(--orange)]/20 inline-flex items-center gap-1.5">
                      <TerminalSquare className="w-3 h-3" /> Tool Intelligence
                    </span>
                 </div>
                 <button 
                   onClick={() => setSelectedToolData(null)}
                   className="p-1.5 hover:bg-[var(--hall-surface)] text-[var(--ink)] rounded-lg transition-colors border border-transparent hover:border-[var(--border)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <h2 className="text-4xl font-space font-bold text-[var(--ink)] mb-1.5 tracking-tight">
                 {selectedToolData.name}
               </h2>
               <h3 className="font-mono text-[10px] font-bold text-[var(--ink-soft)] uppercase tracking-widest mb-4">Category: {selectedToolData.category}</h3>
               
               <p className="text-[11px] font-mono uppercase font-bold text-[var(--orange)] mb-8 flex items-center gap-2">
                 Role: <span className="text-[var(--ink)] px-2.5 py-0.5 bg-[var(--hall-surface)] border border-[var(--border)] rounded tracking-wider shadow-sm">{selectedToolData.role}</span>
               </p>

               <div className="flex flex-col gap-6 lg:gap-8">
                  
                  <div className="flex flex-col gap-2.5 relative group">
                    <div className="absolute left-0 top-7 bottom-2 w-px bg-[var(--orange)]/30 group-hover:bg-[var(--orange)] transition-colors" />
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] flex items-center gap-1.5">
                       <CheckCircle2 className="w-3.5 h-3.5 text-[var(--orange)]" /> Why I Use It
                    </h4>
                    <p className="text-sm font-medium text-[var(--ink)] leading-relaxed p-4 rounded-xl border border-[var(--border)] ml-3 shadow-sm bg-white">
                      {selectedToolData.whyIUseIt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 relative group">
                    <div className="absolute left-0 top-7 bottom-2 w-px bg-[var(--cyan)]/30 group-hover:bg-[var(--cyan)] transition-colors" />
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] flex items-center gap-1.5">
                       <Layers className="w-3.5 h-3.5 text-[var(--cyan)]" /> Project Proof
                    </h4>
                    <div className="text-xs font-bold text-[var(--ink-soft)] bg-white border border-[var(--border)] px-4 py-3 rounded-lg shadow-sm w-full ml-3 leading-relaxed">
                      {selectedToolData.usedIn}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pt-4 border-t border-[var(--border)]">
                     <div className="flex flex-col gap-2">
                       <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] flex items-center gap-1.5 mb-1">
                          <LayoutTemplate className="w-3.5 h-3.5 text-[var(--blue)]" /> Current Learning Focus
                       </h4>
                       <p className="text-xs font-bold text-[var(--blue)] leading-snug bg-[var(--blue)]/5 border border-[var(--blue)]/20 p-3.5 rounded-lg shadow-sm">
                         {selectedToolData.learningFocus}
                       </p>
                     </div>

                     <div className="flex flex-col gap-2">
                       <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] flex items-center gap-1.5 mb-1">
                          <ArrowRight className="w-3.5 h-3.5 text-[#FF006E]" /> Next Technical Step
                       </h4>
                       <p className="text-xs font-medium text-[var(--ink)] bg-white border border-[var(--border)] p-3.5 rounded-lg shadow-sm font-mono leading-relaxed">
                         {selectedToolData.nextStep}
                       </p>
                     </div>
                  </div>

                  {selectedToolData.relatedTools && selectedToolData.relatedTools.length > 0 && (
                    <div className="mt-2 flex flex-col gap-3 pt-6 border-t border-[var(--border)] pb-10">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] flex items-center gap-1.5">
                        <TerminalSquare className="w-3.5 h-3.5" /> Related Tools in Workflow
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedToolData.relatedTools.map((rt: string, i: number) => (
                          <span key={i} className="text-[10px] font-bold text-[var(--ink)] bg-[var(--hall-surface)] border border-[var(--border)] px-2.5 py-1.5 rounded shadow-sm hover:border-[var(--orange)]/40 transition-colors cursor-default mt-1">
                            {rt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
`;

fs.writeFileSync('/src/components/CoreCapabilitiesModule.tsx', fileContent);
console.log('File written successfully.');
