import { useEffect, useRef } from "react";
import { FaGraduationCap, FaCertificate, FaArrowUpRightFromSquare } from "react-icons/fa6";
import certifications from "../data/certifications.json";

// Draft text, written only from what's already on the site. Edit it to sound like you.
const paragraphs = [
  "I'm an ML engineer based in Hyderabad, India, with a B.Tech in Computer Science Engineering (2021 to 2025). I build AI systems that go past the demo stage: multi-agent pipelines with LangGraph, retrieval-augmented generation (RAG), and the APIs and interfaces around them.",
  "During my internship at Kingscote Informatics, I built a preprocessing pipeline over 50K+ records that lifted a model's F1 score from 0.72 to 0.81, and a Flask inference API whose caching and batching cut average latency by 44%.",
  "My personal projects, Alfred, Brother-Eye, and ProjectDNA, are where I test agent architectures, memory systems, and self-correcting retrieval end to end.",
];

const facts = [
  { label: "Location", value: "Hyderabad, India" },
  { label: "Focus", value: "Multi-agent systems, RAG" },
  { label: "Experience", value: "AI/ML Intern, Kingscote Informatics" },
];

const education = {
  degree: "B.Tech in Computer Science Engineering",
  school: "Shadan College of Engineering & Technology - JNTUH",
  period: "11/2021 - 07/2025",
  coursework:
    "Coursework: Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems, Statistics & Probability, Linear Algebra.",
};

function About() {
  const certsRef = useRef(null);

  // Let a normal vertical mouse-wheel scroll the certifications row
  // horizontally while the cursor is over it, instead of scrolling the page.
  // This has to be a native, non-passive listener: React's onWheel is
  // registered as passive, so event.preventDefault() inside it is ignored
  // and the page scrolls vertically at the same time.
  useEffect(() => {
    const el = certsRef.current;
    if (!el) return;

    const handleWheel = (event) => {
      // If the user is scrolling mostly horizontally already (trackpad),
      // let the browser handle it natively.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth && event.deltaY > 0;
      // At the edges, let the event bubble so the page can keep scrolling.
      if (atStart || atEnd) return;

      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section id="about" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
            About Me
          </h2>
          <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
            Building AI that ships
          </h3>
        </div>

        {/* Bio + quick facts */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed text-slate-400 lg:col-span-7">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <dl className="space-y-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-mono text-xs text-slate-500 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-sm text-slate-300">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center justify-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
                <span>Available for AI Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 border-t border-border-subtle pt-16">
          <h3 className="mb-6 flex items-center space-x-2 text-xl font-bold text-ink">
            <FaGraduationCap className="text-accent-400" />
            <span>Education</span>
          </h3>
          <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-base font-semibold text-ink">{education.degree}</h4>
              <span className="shrink-0 font-mono text-xs text-accent-400">
                {education.period}
              </span>
            </div>
            <div className="text-sm text-accent-300">{education.school}</div>
            <p className="pt-2 text-xs text-slate-400">{education.coursework}</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-10">
          <h3 className="mb-6 flex items-center space-x-2 text-xl font-bold text-ink">
            <FaCertificate className="text-crimson-400" />
            <span>Certifications</span>
          </h3>
          <div
            ref={certsRef}
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-2"
          >
            {certifications.map((cert) => {
              const content = (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-wide text-slate-500 uppercase">
                      {cert.issuer}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-accent-400">
                      {cert.year}
                    </span>
                  </div>

                  <h4 className="mt-2 line-clamp-2 text-sm leading-snug font-semibold text-ink">
                    {cert.title}
                  </h4>

                  <div className="mt-3 flex items-center justify-between border-t border-border-subtle pt-2">
                    <span className="text-[11px] text-slate-500">Certificate</span>
                    {cert.url && (
                      <FaArrowUpRightFromSquare className="text-[9px] text-slate-600" />
                    )}
                  </div>
                </>
              );

              const cardClass =
                "flex h-[150px] w-[260px] shrink-0 flex-col justify-between rounded-xl border border-border-subtle bg-surface p-4 transition-colors";

              return cert.url ? (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  title={cert.title}
                  className={`${cardClass} hover:border-accent-500/40 hover:bg-surface-highlight`}
                >
                  {content}
                </a>
              ) : (
                <div key={cert.title} title={cert.title} className={cardClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;