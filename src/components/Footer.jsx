import { FaGithub, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 text-center font-mono text-xs text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div>
          © {new Date().getFullYear()} Ibrahim Khan (
          <span className="text-accent-400">ibrahimbuilds.space</span>). All rights
          reserved.
        </div>
        <div className="flex items-center space-x-6 text-lg text-slate-400">
          <a
            href="https://github.com/Adnanibrahim43"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-ink"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/ibrahim-khan-a58683326"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-ink"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;