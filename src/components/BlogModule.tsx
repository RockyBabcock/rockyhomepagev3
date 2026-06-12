import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MuseumCard } from "./common/MuseumCard";

export function BlogModule() {
  const blogs = [
    {
      slug: "death-of-1px-border",
      date: "May 12, 2024",
      readTime: "8 min read",
      title: "The Death of the 1px Border and the Rise of Tonal Layering.",
      excerpt:
        "Exploring why our eyes are becoming fatigued by the standard UI boxes and how natural depth through color shifts is the next frontier of digital tactility...",
    },
    {
      slug: "typography-physical-object",
      date: "Apr 28, 2024",
      readTime: "12 min read",
      title: "Why Typography should feel like a Printed Physical Object.",
      excerpt:
        "The tactile quality of newsprint and high-end editorial magazines can be translated to the screen through careful attention to ink-traps and bold weights...",
    },
  ];

  return (
    <div
      id="BlogModule"
      className="col-span-12 md:col-span-7 h-full flex flex-col pt-4"
    >
      <div className="space-y-12 md:space-y-16 flex-1">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.slug}
            className="block group cursor-pointer border-t-2 border-[var(--ink)]/10 pt-6 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[10px] uppercase text-[var(--ink-soft)] font-bold tracking-[0.2em] relative">
                {blog.date}
              </span>
              <div className="w-4 h-px bg-[var(--ink)]/20" />
              <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] font-bold tracking-widest">
                {blog.readTime}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-space font-bold mt-2 text-[var(--museum-ink)] group-hover:text-[var(--accent-pink)] transition-colors duration-300 leading-tight">
              {blog.title}
            </h3>
            <p className="font-sans text-[var(--ink-soft)] text-base md:text-lg mt-4 line-clamp-3 leading-relaxed opacity-90 max-w-2xl">
              {blog.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--museum-ink)] group-hover:text-[var(--accent-pink)] transition-colors">
              Read{" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t-2 border-[var(--ink)]/5">
        <Link
          to="/blog"
          className="inline-flex items-center gap-3 bg-[var(--museum-ink)] text-white px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[var(--accent-pink)] transition-colors"
        >
          Enter Digital Garden Archives <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
