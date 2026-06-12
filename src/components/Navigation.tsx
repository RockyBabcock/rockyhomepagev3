import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-[var(--museum-ink)] bg-[var(--museum-paper)]/95 backdrop-blur-md flex justify-between items-center px-4 md:px-6 py-3 max-w-full shadow-sm">
      <Link
        to="/"
        className="font-space font-bold text-sm md:text-base uppercase tracking-widest text-[var(--museum-ink)] hover:text-[var(--accent-orange)] transition-colors flex items-center gap-3"
      >
        <span className="w-3 h-3 bg-[var(--museum-ink)]" />
        ROCKY ARCHIVE
      </Link>

      <div className="hidden md:flex items-center space-x-3 border border-[rgba(62,39,35,0.15)] bg-white/50 px-4 py-1.5 shadow-[2px_2px_0_rgba(62,39,35,0.1)]">
        <span className="w-1.5 h-1.5 bg-[var(--accent-cyan)] animate-pulse rounded-full" />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          System Online / V3.0
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "font-mono text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-300",
                location.pathname === item.path
                  ? "text-[var(--accent-cyan)] border-b border-[var(--accent-cyan)] pb-0.5"
                  : "text-[var(--ink-muted)] hover:text-[var(--museum-ink)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-[var(--museum-ink)] hover:text-[var(--accent-cyan)] transition-colors flex items-center justify-center border border-[var(--museum-ink)] w-8 h-8 bg-white shadow-[2px_2px_0_rgba(62,39,35,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
}
