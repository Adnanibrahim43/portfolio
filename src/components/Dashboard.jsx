import { useEffect, useState } from "react";
import {
  FaCircleCheck,
  FaHammer,
  FaRocket,
  FaCertificate,
  FaBriefcase,
  FaHandshake,
  FaHourglassHalf,
  FaCodeBranch,
  FaGithub,
} from "react-icons/fa6";
import { localData, REMOTE_DATA_URL, GITHUB_USERNAME } from "../data/dashboard";
import { useGithub } from "../hooks/useGithub";

// Badge colours per status word
const statusStyles = {
  building: "border-signal-500/30 bg-signal-500/10 text-signal-400",
  built: "border-accent-500/30 bg-accent-500/10 text-accent-400",
  deployed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  earned: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  active: "border-signal-500/30 bg-signal-500/10 text-signal-400",
  "in progress": "border-signal-500/30 bg-signal-500/10 text-signal-400",
  waitlist: "border-border-subtle bg-surface-highlight text-slate-400",
};

const eventLabels = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  PullRequestEvent: "Pull request in",
  IssuesEvent: "Issue in",
};

function timeAgo(isoDate) {
  const seconds = (Date.now() - new Date(isoDate).getTime()) / 1000;
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Uses the local file, then swaps in the remote JSON if a URL is set and loads fine
function useDashboardData() {
  const [data, setData] = useState(localData);

  useEffect(() => {
    if (!REMOTE_DATA_URL) return;
    const controller = new AbortController();

    fetch(REMOTE_DATA_URL, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((remote) => setData({ ...localData, ...remote }))
      .catch(() => {
        // Keep the local data if the remote file can't be loaded
      });

    return () => controller.abort();
  }, []);

  return data;
}

function StatusBadge({ status }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] capitalize ${
        statusStyles[status] ?? statusStyles.waitlist
      }`}
    >
      {status}
    </span>
  );
}

function StatTile({ icon: Icon, value, label, iconClass }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <Icon className={`mb-4 ${iconClass}`} />
      <div className="font-mono text-3xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function Panel({ title, icon: Icon, iconClass, children }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6">
      <h4 className="mb-5 flex items-center space-x-2 text-base font-semibold text-ink">
        <Icon className={iconClass} />
        <span>{title}</span>
      </h4>
      {children}
    </div>
  );
}

function Rows({ rows }) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">Nothing here yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.title} className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-ink">{row.title}</div>
            <div className="text-xs text-slate-500">{row.subtitle}</div>
          </div>
          <StatusBadge status={row.status} />
        </li>
      ))}
    </ul>
  );
}

function Dashboard() {
  const data = useDashboardData();
  const github = useGithub(GITHUB_USERNAME);

  const projectCount = (...statuses) =>
    data.projects.filter((project) => statuses.includes(project.status)).length;

  const tiles = [
    { icon: FaCircleCheck, value: projectCount("built", "deployed"), label: "Projects built", iconClass: "text-accent-400" },
    { icon: FaHammer, value: projectCount("building"), label: "Building now", iconClass: "text-signal-400" },
    { icon: FaRocket, value: projectCount("deployed"), label: "Deployed", iconClass: "text-emerald-400" },
    {
      icon: FaCertificate,
      value: data.certifications.filter((cert) => cert.status === "earned").length,
      label: "Certifications",
      iconClass: "text-crimson-400",
    },
    { icon: FaBriefcase, value: data.internships.length, label: "Internships", iconClass: "text-accent-400" },
    { icon: FaHandshake, value: data.gigs.length, label: "Freelance gigs", iconClass: "text-signal-400" },
    { icon: FaHourglassHalf, value: data.waitlist.count, label: "Orders waitlist", iconClass: "text-crimson-400" },
    {
      icon: FaCodeBranch,
      value: github.status === "ready" ? github.repos : "-",
      label: "Public repos (live)",
      iconClass: "text-cyan-400",
    },
  ];

  return (
    <section id="dashboard" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
              Live Dashboard
            </h2>
            <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
              What I'm up to
            </h3>
          </div>
          <div className="flex items-center space-x-3 font-mono text-xs text-slate-400">
            <span className="flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
              <span>LIVE</span>
            </span>
            <span>Updated {data.lastUpdated}</span>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tiles.map((tile) => (
            <StatTile key={tile.label} {...tile} />
          ))}
        </div>

        {/* Projects + GitHub activity */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Panel title="Projects" icon={FaHammer} iconClass="text-signal-400">
              <Rows
                rows={data.projects.map((project) => ({
                  title: project.name,
                  subtitle: project.note,
                  status: project.status,
                }))}
              />
            </Panel>
          </div>

          <div className="lg:col-span-5">
            <Panel title="Recent GitHub activity" icon={FaGithub} iconClass="text-cyan-400">
              {github.status === "loading" && (
                <p className="text-sm text-slate-500">Loading activity...</p>
              )}
              {github.status === "error" && (
                <p className="text-sm text-slate-500">Couldn't load GitHub activity right now.</p>
              )}
              {github.status === "ready" && github.events.length === 0 && (
                <p className="text-sm text-slate-500">No recent public activity.</p>
              )}
              {github.status === "ready" && github.events.length > 0 && (
                <ul className="space-y-4">
                  {github.events.map((event) => (
                    <li key={event.id} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-slate-400">
                        {eventLabels[event.type] ?? "Activity in"}{" "}
                        <span className="font-mono text-ink">{event.repo}</span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-slate-500">
                        {timeAgo(event.time)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>

        {/* Certifications, internships, gigs */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Panel title="Certifications" icon={FaCertificate} iconClass="text-crimson-400">
            <Rows
              rows={data.certifications.map((cert) => ({
                title: cert.title,
                subtitle: `${cert.issuer} - ${cert.year}`,
                status: cert.status,
              }))}
            />
          </Panel>

          <Panel title="Internships" icon={FaBriefcase} iconClass="text-accent-400">
            <Rows
              rows={data.internships.map((job) => ({
                title: job.role,
                subtitle: `${job.company} - ${job.period}`,
                status: job.status,
              }))}
            />
          </Panel>

          <Panel title="Freelance gigs" icon={FaHandshake} iconClass="text-signal-400">
            <Rows
              rows={data.gigs.map((gig) => ({
                title: gig.title,
                subtitle: gig.client,
                status: gig.status,
              }))}
            />
          </Panel>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;