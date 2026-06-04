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
    <nav className="fixed top-0 w-full z-50 border-b border-ink/5 bg-base/60 backdrop-blur-md flex justify-between items-center px-6 md:px-8 py-4 max-w-full">
      <Link
        to="/"
        className="text-2xl font-bold font-headline italic text-ink hover:opacity-80 transition-opacity"
      >
        The Archive
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "font-label text-xs uppercase tracking-widest transition-all duration-300",
              location.pathname === item.path
                ? "text-primary border-b-2 border-primary pb-1 font-bold"
                : "text-ink opacity-70 hover:opacity-100",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-ink hover:scale-110 transition-transform"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}
