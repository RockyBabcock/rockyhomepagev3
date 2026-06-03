import React from "react";

export type SkillLevel =
  | "Active Builder"
  | "Proficient"
  | "Comfortable"
  | "Learning"
  | "Exploring"
  | string;

export interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "AI" | "Design" | "Systems" | "Web3" | "Tools";
  level: number;
  levelLabel: SkillLevel;
  description: string;
  useCases: string[];
  stackTags: string[];
  relatedProject: string;
  implementationProof: string;
  currentLearning: string;
  nextTarget: string;
  howIUseThis?: string;
  icon?: any;
}

export const categoryColors: Record<string, { pri: string; sec: string }> = {
  Frontend: { pri: "#FF9F1C", sec: "#FFE66D" },
  AI: { pri: "#8338EC", sec: "#00C2FF" },
  Design: { pri: "#FF006E", sec: "#8338EC" },
  Systems: { pri: "#3A86FF", sec: "#00C2FF" },
  Web3: { pri: "#06D6A0", sec: "#3A86FF" },
  Tools: { pri: "#06D6A0", sec: "#FFE66D" },
};

export const techStackData: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 90,
    levelLabel: "Active Builder",
    description: "Component-driven UI architecture for interactive web systems.",
    useCases: [
      "Component architecture",
      "Interactive dashboards",
      "Portfolio systems",
      "AI interface shells"
    ],
    stackTags: ["React", "TypeScript", "Vite", "Tailwind"],
    relatedProject: "Rocky Homepage V2",
    implementationProof: "Used in modular museum layout, interactive navigation, archive modules, and dashboard-style sections.",
    currentLearning: "Improving animation performance, component architecture, and state-driven UI transitions.",
    nextTarget: "Build more production-grade AI interface workflows with stronger data handling.",
    howIUseThis: "I use React to structurally architect intentional, high-quality frontend experiences, orchestrating component logic and establishing resilient interface boundaries."
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 85,
    levelLabel: "Active Builder",
    description: "Type safety, state predictability, interface scaling.",
    useCases: [
      "Strict data pipelines",
      "Dynamic prop validation",
      "Interface contracts"
    ],
    stackTags: ["TypeScript", "Zod", "ESLint"],
    relatedProject: "TypeScript Tooling",
    implementationProof: "Integrated strict enums for status and module modes in this site.",
    currentLearning: "Advanced generics, utility types, and strict mode compliance.",
    nextTarget: "Improve type inference across complex state changes in AI workflows."
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Design",
    level: 95,
    levelLabel: "Proficient",
    description: "Rapid structural design and interaction aesthetics.",
    useCases: [
      "Design synthesis",
      "Responsive token scales",
      "Micro-interactions"
    ],
    stackTags: ["Tailwind", "CSS", "Design Tokens"],
    relatedProject: "Museum Layout Engine",
    implementationProof: "Created the neo-brutalist dark terminal visual system using configuration-driven design.",
    currentLearning: "Tailwind V4 features, arbitrary values, and complex layout grid architectures.",
    nextTarget: "Refine motion integrations using pure CSS and Tailwind plugins."
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "Frontend",
    level: 80,
    levelLabel: "Proficient",
    description: "Declarative animations and fluid layout transitions.",
    useCases: [
      "Entrance animations",
      "Layout shifts",
      "Gesture interactions"
    ],
    stackTags: ["Motion", "React", "Animation"],
    relatedProject: "Interactive Homepage",
    implementationProof: "Implemented scroll-linked animations and layout persistence across route changes.",
    currentLearning: "Optimizing layout animations to avoid reflow spikes and mastering AnimatePresence.",
    nextTarget: "Build highly fluid list reordering and complex micro-interactions."
  },
  {
    id: "solidity",
    name: "Solidity",
    category: "Web3",
    level: 40,
    levelLabel: "Learning",
    description: "EVM smart contract design and consensus modeling.",
    useCases: [
      "Security vaults",
      "Ownership tokens",
      "Decentralized logic"
    ],
    stackTags: ["Solidity", "Hardhat", "EVM"],
    relatedProject: "Web3 Archive Vault",
    implementationProof: "Studying wallet UX, ownership models, and self-authored basic security vaults.",
    currentLearning: "Smart contracts, wallet interactions, on-chain identity and verification.",
    nextTarget: "Deploy an integrated Web3 contract connected to real UI dashboards."
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "AI",
    level: 70,
    levelLabel: "Comfortable",
    description: "API integration for deep thinking and agent routing.",
    useCases: [
      "Model inference",
      "Context engineering",
      "Tool generation"
    ],
    stackTags: ["OpenAI", "LLMs", "RAG"],
    relatedProject: "AI Assistant Experiments",
    implementationProof: "Integrating model inference into frontend concepts and tool formulation schemas.",
    currentLearning: "Function calling robustness and continuous context management in long sessions.",
    nextTarget: "Develop stronger orchestration limits with structured data and multimodal inputs."
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI",
    level: 60,
    levelLabel: "Learning",
    description: "Framework for developing LLM-driven applications and data pipelines.",
    useCases: [
      "Agent memory",
      "Document retrieval",
      "Chain composition"
    ],
    stackTags: ["LangChain", "Vector DB", "Agents"],
    relatedProject: "AI Playground",
    implementationProof: "Experimented with document retrieval pipelines and prompt templating.",
    currentLearning: "Evaluating LangGraph for more complex agent state machines.",
    nextTarget: "Adopt LangGraph for building multi-agent collaborative workflows."
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Systems",
    level: 80,
    levelLabel: "Proficient",
    description: "Server-side JavaScript environments and backend orchestration.",
    useCases: [
      "API orchestration",
      "Service aggregation",
      "Data ingestion"
    ],
    stackTags: ["Node", "Express", "Vite"],
    relatedProject: "Backend Proxy Logic",
    implementationProof: "Built lightweight proxy layers for API integrations.",
    currentLearning: "Performance tuning and scaling Node processes.",
    nextTarget: "Master WebSockets for real-time multiplayer integrations."
  },
  {
    id: "docker",
    name: "Docker",
    category: "Systems",
    level: 65,
    levelLabel: "Comfortable",
    description: "Containerization and portable environment deployment.",
    useCases: [
      "Portable builds",
      "Microservices",
      "Isolated environments"
    ],
    stackTags: ["Docker", "Containers", "DevOps"],
    relatedProject: "Containerized Web Apps",
    implementationProof: "Containerized full stack prototypes for easy deployments on Cloud Run.",
    currentLearning: "Optimizing multi-stage builds to minimize image sizes.",
    nextTarget: "Integrate Docker tightly into GitHub Actions pipelines for seamless CD."
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    level: 80,
    levelLabel: "Proficient",
    description: "UI/UX design mapping and system components.",
    useCases: [
      "Prototypes",
      "Wireframing",
      "Design systems"
    ],
    stackTags: ["Figma", "Design", "Prototyping"],
    relatedProject: "Design Mockups",
    implementationProof: "Architected component mapping for frontend systems.",
    currentLearning: "Auto-layout mastery and design token syncing with code.",
    nextTarget: "Establish a complete end-to-end Figma-to-Tailwind design pipeline."
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Tools",
    level: 90,
    levelLabel: "Active Builder",
    description: "AI-augmented code editing and rapid structural prototyping.",
    useCases: [
      "Rapid prototyping",
      "Code reasoning",
      "Generative coding"
    ],
    stackTags: ["Cursor", "IDE", "AI Coding"],
    relatedProject: "All Active Projects",
    implementationProof: "Used continuously for refining logic and rapidly spinning up interface drafts.",
    currentLearning: "Prompt engineering directly in the IDE to generate large cohesive components.",
    nextTarget: "Optimize workflow for generating complex backend routing with fewer iterations."
  }
];
