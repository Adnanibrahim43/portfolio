import { FaMicrochip, FaDatabase, FaServer, FaCode } from "react-icons/fa6";

const categories = [
  {
    title: "Generative AI & LLMs",
    icon: FaMicrochip,
    colorClass: "text-accent-400",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG Systems",
      "Agentic Pipelines",
      "OpenAI / Anthropic / Groq",
      "Fine-Tuning",
    ],
  },
  {
    title: "Vector & Memory Systems",
    icon: FaDatabase,
    colorClass: "text-crimson-400",
    skills: [
      "ChromaDB",
      "Pinecone",
      "Semantic Search",
      "BM25",
      "NetworkX Knowledge Graphs",
      "Three-Tier Memory",
    ],
  },
  {
    title: "Backend & APIs",
    icon: FaServer,
    colorClass: "text-signal-400",
    skills: [
      "FastAPI",
      "Flask",
      "WebSocket / SSE",
      "Redis Streams",
      "PostgreSQL & MongoDB",
      "Docker & Nginx",
    ],
  },
  {
    title: "Frontend & Tooling",
    icon: FaCode,
    colorClass: "text-emerald-400",
    skills: [
      "React (Vite / Zustand)",
      "Next.js & TypeScript",
      "TailwindCSS",
      "Python (Advanced)",
      "Git / GitHub",
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
            Technical Expertise
          </h2>
          <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
            Skills & Stack
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="space-y-4 rounded-2xl border border-border-subtle bg-surface p-6"
              >
                <div className={`flex items-center space-x-3 font-mono text-sm ${category.colorClass}`}>
                  <Icon />
                  <span>{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border-subtle bg-surface-highlight px-3 py-1.5 font-mono text-xs text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;