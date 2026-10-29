import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FaNetworkWired } from "react-icons/fa6";

// Typed.js types HTML strings: tags are inserted instantly, only the text inside is typed.
const codeHtml = `
<div class="text-slate-500"># LangGraph Multi-Agent Orchestration</div>
<div><span class="text-crimson-400">from</span> langgraph.graph <span class="text-crimson-400">import</span> StateGraph</div>
<div><span class="text-crimson-400">from</span> agents <span class="text-crimson-400">import</span> Coder, Planner, Research</div>
<div class="mt-2"><span class="text-yellow-300">workflow</span> = StateGraph(AgentState)</div>
<div>workflow.add_node(<span class="text-emerald-300">"supervisor"</span>, SupervisorAgent)</div>
<div>workflow.add_node(<span class="text-emerald-300">"rag_retriever"</span>, ChromaVectorStore)</div>
<div class="mt-2 text-accent-300"># Memory: 3-Tier (Buffer + SQLite + Chroma)</div>
<div>app = workflow.compile()</div>
<div class="mt-2 text-emerald-400">→ Status: 5 Specialist Agents Active.</div>
`.trim();

function CodeWidget() {
  const typedTarget = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip the animation for people who asked their system for less motion
    if (prefersReducedMotion) {
      typedTarget.current.innerHTML = codeHtml;
      return;
    }

    const typed = new Typed(typedTarget.current, {
      strings: [codeHtml],
      typeSpeed: 15,
      startDelay: 500,
      loop: false,
      cursorChar: "▋",
      // Hide the blinking cursor once typing finishes
      onComplete: (self) => {
        if (self.cursor) self.cursor.style.display = "none";
      },
    });

    // Cleanup: stops the animation if the component unmounts
    return () => typed.destroy();
  }, []);

  return (
    <div data-cursor-hide className="force-dark glow-accent overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-2xl">
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-highlight px-4 py-3">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80 transition-all duration-200 hover:scale-125 hover:bg-rose-500 hover:shadow-[0_0_10px_rgba(244,63,94,0.7)]"></span>
          <span className="h-3 w-3 rounded-full bg-amber-500/80 transition-all duration-200 hover:scale-125 hover:bg-amber-500 hover:shadow-[0_0_10px_rgba(245,158,11,0.7)]"></span>
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 transition-all duration-200 hover:scale-125 hover:bg-emerald-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.7)]"></span>
        </div>
        <div className="flex items-center space-x-1.5 font-mono text-xs text-slate-400">
          <FaNetworkWired className="text-crimson-400" />
          <span>AgentSupervisor.py</span>
        </div>
        <div className="font-mono text-xs text-emerald-400">● LIVE</div>
      </div>

      <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
        <div className="relative">
          {/* Invisible full copy reserves the final height, so the box doesn't grow while typing */}
          <div
            aria-hidden="true"
            className="invisible space-y-1"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
          {/* Typed.js writes into this overlay */}
          <div ref={typedTarget} className="absolute top-0 left-0 w-full space-y-1" />
        </div>
      </div>
    </div>
  );
}

export default CodeWidget;