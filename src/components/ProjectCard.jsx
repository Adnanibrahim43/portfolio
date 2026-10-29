import { FaGithub } from "react-icons/fa6";

function ProjectCard({ project }) {
  const {
    title,
    badge,
    badgeClass,
    bannerClass,
    tagClass,
    description,
    features,
    tags,
    repoUrl,
  } = project;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border-subtle bg-surface transition-all hover:border-accent-500/40">
      <div>
        {/* Banner */}
        <div
          className={`force-dark relative flex h-48 items-center justify-center overflow-hidden border-b border-border-subtle bg-linear-to-br p-6 text-center ${bannerClass}`}
        >
          <div className="bg-grid-pattern absolute inset-0 opacity-30"></div>
          <div className="relative">
            <span className={`rounded border px-3 py-1 font-mono text-xs ${badgeClass}`}>
              {badge}
            </span>
            <h4 className="mt-3 text-xl font-bold text-ink">{title}</h4>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>

          <div className="space-y-2 text-xs text-slate-400">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.text} className="flex items-center space-x-2">
                  <Icon className={`shrink-0 ${feature.iconClass}`} />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded bg-surface-highlight px-2.5 py-1 font-mono text-[11px] ${tagClass}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-4 border-t border-border-subtle/50 px-6 pt-2 pb-6">
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 text-xs font-medium text-ink transition-colors hover:text-accent-400"
        >
          <FaGithub />
          <span>View Repository</span>
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;