import {
  FaBolt,
  FaMicrophone,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaWindowMaximize,
} from "react-icons/fa6";
import ProjectCard from "./ProjectCard";

// Tailwind can't see class names built from variables (like `from-${color}-950`),
// so each project stores its full class strings.
const projects = [
  {
    title: "Alfred Local Multi-Agent AI",
    badge: "Active Development",
    badgeClass: "text-accent-400 bg-accent-500/10 border-accent-500/20",
    bannerClass: "from-accent-950 via-neutral-950 to-obsidian",
    tagClass: "text-accent-300",
    description:
      "Production-grade multi-agent system: LangGraph Supervisor orchestrating 5 specialist agents (Coder, Planner, Research, Memory, Echo) with a three-tier memory architecture (Ring Buffer, SQLite, ChromaDB).",
    features: [
      { icon: FaBolt, iconClass: "text-amber-400", text: "FastAPI gateway with SSE & WebSocket streaming" },
      { icon: FaMicrophone, iconClass: "text-signal-400", text: "Voice I/O pipeline: Faster Whisper STT & Edge TTS" },
    ],
    tags: ["Python", "LangGraph", "ChromaDB", "Ollama"],
    repoUrl: "https://github.com/Adnanibrahim43",
  },
  {
    title: "Brother-Eye Job Agent",
    badge: "Autonomous Pipeline",
    badgeClass: "text-crimson-400 bg-crimson-500/10 border-crimson-500/20",
    bannerClass: "from-crimson-950 via-neutral-950 to-obsidian",
    tagClass: "text-crimson-300",
    description:
      "10-stage agentic pipeline featuring resume parsing, multi-site scraping (10 platforms), RAG-based semantic matching via ChromaDB + HuggingFace embeddings, and anti-fabrication validation using Groq Llama 3.3.",
    features: [
      { icon: FaRobot, iconClass: "text-crimson-400", text: "Selenium auto-apply with rate-limiting & anti-detection" },
      { icon: FaChartLine, iconClass: "text-signal-400", text: "React (Vite+Zustand) dashboard with live WebSocket progress" },
    ],
    tags: ["LangGraph", "FastAPI", "Docker", "Groq LLM"],
    repoUrl: "https://github.com/Adnanibrahim43",
  },
  {
    title: "ProjectDNA Knowledge Platform",
    badge: "Enterprise RAG",
    badgeClass: "text-signal-400 bg-signal-500/10 border-signal-500/20",
    bannerClass: "from-signal-950 via-neutral-950 to-obsidian",
    tagClass: "text-signal-300",
    description:
      "Full-stack Corrective-RAG platform: self-correcting agent grades retrieved context, rewrites poor queries, and enriches answers from an auto-extracted NetworkX entity-relationship knowledge graph.",
    features: [
      { icon: FaDatabase, iconClass: "text-signal-400", text: "Gemini 2.5 API with 1536-dim vector embeddings" },
      { icon: FaWindowMaximize, iconClass: "text-accent-400", text: "Next.js frontend with 4 interaction modes & SSE streaming" },
    ],
    tags: ["Corrective-RAG", "NetworkX", "Next.js", "PostgreSQL"],
    repoUrl: "https://github.com/Adnanibrahim43",
  },
];

function Projects() {
  return (
    <section id="projects" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="mb-16 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
              Featured Systems
            </h2>
            <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
              AI & Agentic Projects
            </h3>
          </div>
          <p className="mt-2 max-w-sm text-sm text-slate-400 md:mt-0">
            Production-grade multi-agent architectures, RAG platforms, and
            autonomous web agents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;