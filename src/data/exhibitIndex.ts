export interface Exhibit {
  id: string;
  title: string;
  type: string;
  status:
    | "HOT"
    | "LIVE"
    | "LAB"
    | "PROOF"
    | "ARCHIVE"
    | "WRITING"
    | "CURRENT BUILD";
  tags: string[];
  sectionId: string;
  summary: string;
  proofSignal: string;
  accent: string;
  layoutSize: "large" | "wide" | "small";
  href: string;
}

export const exhibitIndex: Exhibit[] = [
  {
    id: "homepage-v3",
    title: "Rocky Homepage V3",
    type: "Personal Digital Museum",
    status: "CURRENT BUILD",
    tags: ["React", "TypeScript", "Motion", "Museum System"],
    sectionId: "entrance",
    summary:
      "A modular exhibition of systems, artifacts, and personal thinking. Not just a portfolio.",
    proofSignal: "Modular hall architecture and data-driven exhibits",
    accent: "var(--accent-pink)",
    layoutSize: "large",
    href: "#",
  },
  {
    id: "capability-forge",
    title: "Capability Forge",
    type: "Technical Reactor",
    status: "HOT",
    tags: ["Frontend", "AI", "Tooling", "Evidence"],
    sectionId: "forge",
    summary:
      "An interactive mapping of deployed technologies and production-ready systems.",
    proofSignal: "Maps tools to proof, usage, and learning frontier",
    accent: "var(--accent-orange)",
    layoutSize: "small",
    href: "#forge",
  },
  {
    id: "project-laboratory",
    title: "Project Laboratory",
    type: "Evidence Wall",
    status: "PROOF",
    tags: ["Case Study", "Systems", "Build Log"],
    sectionId: "projects",
    summary:
      "Selected builds that show how I design, structure, and implement web systems.",
    proofSignal: "Shows problem, system, stack, proof, limitation, next patch",
    accent: "var(--accent-cyan)",
    layoutSize: "small",
    href: "#projects",
  },
  {
    id: "ai-playground",
    title: "AI Playground",
    type: "Experiment Chamber",
    status: "LAB",
    tags: ["AI Interface", "Prompt System", "Interaction"],
    sectionId: "experiments",
    summary:
      "Live tests of intelligence as a design material and conversational UX.",
    proofSignal: "Demonstrates interface thinking around AI workflows",
    accent: "var(--color-rainbow-green)",
    layoutSize: "wide",
    href: "#experiments",
  },
  {
    id: "web3-vault",
    title: "Web3 Vault",
    type: "Protocol Console",
    status: "LAB",
    tags: ["Wallet UX", "Contracts", "Web3"],
    sectionId: "experiments",
    summary: "Interfaces for decentralized protocols and state machines.",
    proofSignal: "Explores blockchain interaction and product UX",
    accent: "var(--museum-brown)",
    layoutSize: "small",
    href: "#experiments",
  },
  {
    id: "chess-archive",
    title: "Chess Archive",
    type: "Personal Archive",
    status: "ARCHIVE",
    tags: ["Strategy", "Culture", "Memory"],
    sectionId: "archives",
    summary:
      "A personal thinking hall about chess, constraints, and long-term planning.",
    proofSignal: "Shows personal intellectual world, not only technical work",
    accent: "#D4AF37",
    layoutSize: "small",
    href: "/chess",
  },
  {
    id: "digital-garden",
    title: "Digital Garden",
    type: "Reading Room",
    status: "WRITING",
    tags: ["Essays", "Notes", "Thinking"],
    sectionId: "garden",
    summary: "Notes, essays, and fragments from the systems I build and read.",
    proofSignal: "Demonstrates reasoning and long-term thinking",
    accent: "var(--accent-pink)",
    layoutSize: "large",
    href: "#garden",
  },
];
