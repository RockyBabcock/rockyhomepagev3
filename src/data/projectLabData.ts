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
}

export const projectLabData: ProjectEntry[] = [
  {
    id: "rocky-homepage-v3",
    title: "Rocky Homepage V3",
    oneLine:
      "A personal digital museum combining portfolio, archive, experiments, and interactive identity inside a rainbow spectrum.",
    role: "Designer / Frontend Developer",
    status: "Active Build",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    problem:
      "Most personal portfolios feel too generic, lacking personality or a real technical identity.",
    built: [
      "Modular museum-style homepage",
      "Rainbow visual system and colorful spectrum themes",
      "Project laboratory for deep case studies",
      "Skill forge and technical mapping",
      "Personal archive and digital garden modules"
    ],
    proves: [
      "React architecture and modular component design",
      "Visual system thinking and layout grids",
      "AI-assisted development workflow"
    ],
    learned: [
      "How to organize a dense homepage without making it feel random",
      "How to balance professional proof and personal expression",
    ],
    limitations: [
      "The site is still expanding, and some modules need more real content.",
    ],
    nextSteps: [
      "Expand chess, media, and personal archive modules",
      "Build a stronger rainbow color system",
    ],
    liveUrl: "https://rockybabcock.fun",
    repoUrl: "https://github.com/RockyBabcock/rockyhomepageV3",
  },
  {
    id: "ai-assistant",
    title: "AI Studio Prototype",
    oneLine:
      "An experimental UI orchestrating multi-agent chains and tool execution contexts.",
    role: "Full-Stack Researcher",
    status: "Prototype",
    techStack: ["Prompting", "LLMs", "Node.js", "React", "Gemini API"],
    problem:
      "Exploring how AI agents can interact with human intent seamlessly without requiring purely terminal-based inputs.",
    built: [
      "Constructed multi-agent decision chains with tool-using capabilities",
      "Explored tool formulation schemas mapped to UI generation",
      "Designed an experimental orchestration window showcasing background step executions",
    ],
    learned: [
      "AI tools need clear boundaries, context, and visible state.",
      "Latency masking through skeleton loaders is critical for agent interactions.",
    ],
    limitations: [
      "Connect the interface to real API flows and add saved experiment logs.",
      "Currently runs completely client-side with hardcoded logic for demonstration.",
    ],
    repoUrl: "https://github.com/RockyBabcock/ai-studio-experiments",
  },
  {
    id: "interactive-chess",
    title: "Interactive Chess Visualizer",
    oneLine:
      "Rendered interactive modular 3D chess boards and geometric tactical game state visualizations.",
    role: "Developer",
    status: "Concept",
    techStack: ["Chess.com API", "Three.js", "LocalStorage"],
    problem:
      "Transforming standard 2D algebraic notation into an engaging, geometric, and strategic online representation.",
    built: [
      "Modular 3D chess board environment via Three.js primitives",
      "Visual geometry mapping of potential maneuvers using a depth-first search for move calculations",
      "Local state synchronizer matching Chess.com game IDs",
    ],
    learned: [
      "Chess provides a useful metaphor for interface design: every move changes the available system state.",
      "Three.js performance dramatically degrades with too many overlapping mesh instances; instancing is required.",
    ],
    limitations: [
      "The board requires hardware acceleration and struggles on mid-tier mobile browsers.",
    ],
  },
  {
    id: "web3-learning",
    title: "Web3 Sandbox Vault",
    oneLine:
      "A visual archive for Web3 concepts, wallet interaction patterns, and ownership models.",
    role: "Smart Contract Explorer",
    status: "Learning Archive",
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
