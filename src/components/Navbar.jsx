import { useState, useEffect } from "react";
import { FaBars, FaXmark, FaDownload } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import Magnet from "./Magnet";

// Put your PDF in the "public" folder with this exact name
const RESUME_URL = "/Ibrahim_Khan_Resume.pdf";
const RESUME_FILENAME = "Ibrahim_Khan_Resume.pdf";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Close the menu when the Escape key is pressed
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-obsidian/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Magnet><a href="#" className="group flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 font-mono text-xs font-bold tracking-tight text-white shadow-md transition-transform group-hover:scale-105">
            IK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-ink">
              ibrahimbuilds.space
            </span>
            <span className="font-mono text-[10px] text-accent-400">
              AI Systems Core
            </span>
          </div>
        </a></Magnet>

        {/* Desktop nav links */}
        <nav className="hidden items-center space-x-1 text-sm font-medium text-slate-400 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 transition-colors hover:bg-surface-highlight hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Status pill, CTA and hamburger */}
        <div className="flex items-center space-x-3">
          <div className="hidden items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 2xl:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            <span>Available for AI Roles</span>
          </div>
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            className="hidden items-center space-x-2 rounded-lg border border-border-subtle px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface-highlight lg:inline-flex"
          >
            <FaDownload />
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            className="hidden rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-obsidian shadow-sm transition-all hover:bg-ink/90 xl:inline-block"
          >
            Let's Connect
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="rounded-lg border border-border-subtle p-2.5 text-slate-300 transition-colors hover:bg-surface-highlight hover:text-ink lg:hidden"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-border-subtle px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-300">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 transition-colors hover:bg-surface-highlight hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
              <span>Available for AI Roles</span>
            </div>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              onClick={closeMenu}
              className="flex items-center justify-center space-x-2 rounded-lg border border-border-subtle px-4 py-3 text-xs font-semibold text-ink transition-colors hover:bg-surface-highlight"
            >
              <FaDownload />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="rounded-lg bg-ink px-4 py-3 text-center text-xs font-semibold text-obsidian shadow-sm transition-all hover:bg-ink/90"
            >
              Let's Connect
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;