export type ProjectStatus =
  | "Shipped"
  | "Active Build"
  | "Prototype"
  | "Learning Archive"
  | "Concept";

export interface ProjectEntry {
  id: string;
  title: string;
  oneLine: string;
  role: string;
  status: ProjectStatus;
  techStack: string[];
  problem: string;
  built: string[];
  learned: string[];
  proves?: string[];
  limitations?: string[];
  nextSteps?: string[];
  liveUrl?: string;
  repoUrl?: string;
  category?: "Featured" | "Prototype" | "Concept" | "Learning Archive" | "Active Build";
  focus?: string;
  mainProof?: string;
  nextStep?: string;
  caseStudyAvailable?: boolean;
}

export const projectLabData: ProjectEntry[] = [
  {
    id: "rocky-homepage-v3",
    title: "Rocky Homepage V3",
    oneLine:
      "A personal digital museum combining portfolio, archive, experiments, and interactive identity inside a rainbow spectrum interface.",
    role: "Designer / Frontend Developer",
    status: "Active Build",
    category: "Featured",
    focus: "Portfolio system / visual identity / content architecture",
    mainProof: "React component architecture + visual system thinking",
    nextStep: "Expand project case studies",
    caseStudyAvailable: true,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion", "Vercel", "AI Studio"],
    problem:
      "Most personal portfolios feel generic, narrow, and forgettable. They show links, but not personality, process, or system thinking.",
    built: [
      "Wide 90% homepage canvas",
      "Hero entrance console",
      "Project laboratory",
      "Capability forge",
      "Personal archive modules",
      "Rainbow visual system",
      "Interactive route navigation",
      "AI-assisted iteration workflow",
    ],
    proves: [
      "React component architecture",
      "TypeScript-based UI structure",
      "Tailwind visual system iteration",
      "Responsive layout design",
      "Content modeling",
      "Personal branding through interface design",
    ],
    learned: [],
    limitations: [
      "The site is still expanding. Some modules need more real content, stronger project evidence, and deeper archive material.",
    ],
    nextSteps: [
      "Expand project case studies",
      "Improve chess and media archive modules",
      "Add richer interactive details",
      "Refine visual consistency across sections",
    ],
    liveUrl: "https://rockyhomepagev3.vercel.app/",
    repoUrl: "https://github.com/RockyBabcock/rockyhomepagev3",
  },
  {
    id: "ai-assistant",
    title: "AI Studio Prototype",
    oneLine:
      "An experimental workflow for using AI-assisted iteration to reshape homepage layout, copy, visual hierarchy, and interaction behavior.",
    role: "Full-Stack Researcher",
    status: "Prototype",
    category: "Prototype",
    focus: "AI-assisted interface iteration",
    mainProof: "Prompt-driven UI iteration workflow",
    nextStep: "Document case study",
    caseStudyAvailable: true,
    techStack: ["Prompting", "LLMs", "Node.js", "GitHub", "Vercel"],
    problem:
      "Test how AI Studio can help generate, revise, and deploy interface improvements faster.",
    built: [
      "Prompt-driven UI iteration",
      "Component-level code editing",
      "Homepage layout experiments",
      "Design feedback loops",
      "GitHub + Vercel deployment workflow",
    ],
    learned: [],
    limitations: [],
    nextSteps: [
      "Turn this into a documented AI-assisted development case study."
    ],
    repoUrl: "https://github.com/RockyBabcock/rockyhomepagev3",
  },
  {
    id: "interactive-chess",
    title: "Interactive Chess Visualizer",
    oneLine:
      "A concept module for turning chess ideas into visual, interactive, and personal archive experiences.",
    role: "Developer",
    status: "Concept",
    category: "Concept",
    focus: "Chess archive / interaction / personal system",
    mainProof: "Interactive archive concept",
    nextStep: "Connect to Personal Archives",
    caseStudyAvailable: true,
    techStack: ["Chess.com API", "Three.js", "LocalStorage", "Interaction Design", "Personal Archive"],
    problem:
      "Use chess as a way to express strategy, memory, personality, and systems thinking.",
    built: [
      "Interactive 8×8 board",
      "Famous chess quotes",
      "Master constellation map",
      "Piece personality cards",
      "Tactical state visualization",
    ],
    learned: [],
    limitations: [],
    nextSteps: [
      "Connect the chess visualizer with the Personal Archives section.",
    ],
  },
  {
    id: "web3-learning",
    title: "Web3 Sandbox Vault",
    oneLine:
      "A visual archive for Web3 concepts, wallet interaction patterns, and ownership models.",
    role: "Smart Contract Explorer",
    status: "Learning Archive",
    category: "Learning Archive",
    focus: "Smart contract research & interaction",
    mainProof: "Decentralized state management",
    nextStep: "Deploy testnet demo",
    caseStudyAvailable: false,
    techStack: ["Solidity", "Foundry", "WalletConnect", "Ethers.js"],
    problem:
      "Understanding decentralization primitives and multi-signature operations systematically.",
    built: [
      "Self-authored sandbox protocols mapping multi-sig treasury security vaults.",
      "Documented wallet connection UX concepts avoiding heavy technical jargon.",
      "A simple permissioned faucet mock deploying testing ETH loops.",
    ],
    learned: [
      "Web3 interfaces often fail because they hide too much complexity or expose too much too early.",
      "Designing rollback UI states for failed blockchain transactions is 10x harder than equivalent Web2 architectures.",
    ],
    limitations: [
      "Needs a small wallet-connected prototype to demonstrate interaction flow fully deployed on a testnet.",
    ],
  },
];
