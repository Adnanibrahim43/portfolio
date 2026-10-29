import { FaBrain, FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa6";
import CodeWidget from "./CodeWidget";
import Magnet from "./Magnet";

const metrics = [
  { value: "-44%", label: "API Latency Reduction" },
  { value: "0.81", label: "Optimized Model F1" },
  { value: "50K+", label: "Records Pipeline" },
];

function Hero() {
  return (
    <section id="home" className="overflow-hidden px-4 pt-12 pb-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left content */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center space-x-2 rounded-full border border-border-subtle bg-surface px-3 py-1 font-mono text-xs text-accent-400">
              <FaBrain className="text-[10px]" />
              <span>ML Engineer // Hyderabad, India</span>
            </div>

            <h1 className="font-display text-5xl leading-none font-medium tracking-tighter text-ink sm:text-7xl">
              Architecting <span className="text-outline">Autonomous</span> AI & Intelligent Systems
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Specializing in production-grade conversational AI systems,
              multi-agent pipelines (LangGraph), and advanced RAG applications.
              Delivering measurable impact: 44% latency reduction, F1 score
              improvements to 0.81, and real-time vector intelligence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnet>
              <a
                href="#projects"
                className="flex items-center space-x-2 rounded-xl bg-accent-600 hover:bg-accent-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent-600/25 transition-all"
              >
                <span>Explore AI Projects</span>
                <FaArrowDown className="text-xs" />
              </a>
              </Magnet>
              <Magnet>
              <a
                href="https://github.com/Adnanibrahim43"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 rounded-xl border border-border-subtle bg-surface px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-surface-highlight hover:text-ink"
              >
                <FaGithub className="text-cyan-400" />
                <span>GitHub (Adnanibrahim43)</span>
              </a>
              </Magnet>
              <Magnet>
              <a
                href="https://linkedin.com/in/ibrahim-khan-a58683326"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex items-center rounded-xl border border-border-subtle bg-surface px-4 py-3 text-slate-300 transition-all hover:text-ink"
              >
                <FaLinkedin className="text-lg text-[#0a66c2]" />
              </a>
              </Magnet>
            </div>

            {/* Impact stats */}
            <div className="grid max-w-lg grid-cols-3 gap-4 border-t border-border-subtle pt-6">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-2xl font-bold text-ink">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: typed code widget */}
          <div className="lg:col-span-5">
            <CodeWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;