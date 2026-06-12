import React from "react";

type MuseumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  as?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
};

export function MuseumButton({
  children,
  className = "",
  variant = "primary",
  as: Component = "button",
  ...props
}: MuseumButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center transition-colors duration-300 rounded";

  let variantStyles = "";
  if (variant === "primary") {
    variantStyles =
      "px-6 py-3 bg-[var(--museum-ink)] text-white font-mono text-[10px] uppercase font-bold tracking-[0.2em] shadow-sm hover:bg-[var(--accent-orange)] hover:text-[var(--museum-ink)]";
  } else if (variant === "secondary") {
    variantStyles =
      "px-6 py-3 bg-[var(--museum-paper)] border border-[var(--border-strong)] text-[var(--museum-ink)] font-mono text-[10px] uppercase font-bold tracking-[0.2em] shadow-sm hover:bg-white hover:border-[var(--museum-ink)]";
  } else if (variant === "ghost") {
    variantStyles =
      "px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--ink-soft)] hover:text-[var(--museum-ink)] hover:bg-[rgba(62,39,35,0.06)] rounded-lg";
  }

  return (
    <Component
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}
