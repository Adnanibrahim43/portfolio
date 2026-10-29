import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

function ThemeToggle() {
  // index.html sets data-theme before React loads, so we read the starting value from there
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark"
  );

  const nextTheme = theme === "dark" ? "light" : "dark";

  function handleToggle() {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="rounded-lg border border-border-subtle p-2.5 text-slate-300 transition-colors hover:bg-surface-highlight hover:text-ink"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;