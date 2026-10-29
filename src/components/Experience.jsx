import { FaAnglesRight } from "react-icons/fa6";

const job = {
  initials: "KI",
  title: "AI/ML Software Engineer Intern",
  company: "Kingscote Informatics Pvt. Ltd.",
  period: "August 2025 - January 2026",
  highlights: [
    <>
      Developed end-to-end data preprocessing pipeline for e-commerce product
      catalog handling <strong>50K+ records</strong>, implementing automated
      feature engineering, outlier detection, and normalization that improved
      model <strong>F1 score from 0.72 to 0.81</strong>.
    </>,
    <>
      Built and deployed Flask REST API for ML model inference serving{" "}
      <strong>200+ daily requests</strong>, implementing response caching and
      batch processing that reduced average API latency from{" "}
      <strong>3.2s to 1.8s (44% improvement)</strong>.
    </>,
    <>
      Performed exploratory data analysis on customer behavior dataset (150K
      records, 25 features), uncovering 3 key user segments through clustering
      analysis that informed product team's roadmap.
    </>,
    <>
      Collaborated with 2 senior engineers to establish model evaluation
      framework using cross-validation and holdout testing, creating reusable
      scripts used across 4 internal ML projects.
    </>,
  ],
};

function Experience() {
  return (
    <section id="experience" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
            Professional Experience
          </h2>
          <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
            Real-World Impact
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Building scalable ML pipelines and production-ready architectures.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8">
          <div className="absolute top-6 right-6 hidden rounded-full border border-accent-500/20 bg-accent-500/10 px-3 py-1 font-mono text-xs text-accent-400 sm:block">
            {job.period}
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600 text-lg font-bold text-white">
              {job.initials}
            </div>
            <div>
              <h4 className="text-xl font-bold text-ink">{job.title}</h4>
              <div className="text-sm font-medium text-accent-300">{job.company}</div>
            </div>
          </div>

          <div className="mb-2 font-mono text-xs text-accent-400 sm:hidden">
            {job.period}
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-300 sm:text-base">
            {job.highlights.map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <FaAnglesRight className="mt-1.5 shrink-0 text-xs text-accent-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;