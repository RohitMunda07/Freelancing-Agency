import React from "react";

/**
 * Retro-style button: solid fill, hard black border, offset drop shadow
 * that compresses on hover/press — matches the reference design's
 * hand-crafted / retro CTA style.
 */
export default function Button({ children, onClick, variant = "primary", icon: Icon, className = "", as = "button", href }) {
  const base =
    "inline-flex items-center gap-2 font-display font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-150 select-none";

  const variants = {
    primary:
      "bg-teal text-onAccent border-2 border-onAccent shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-retro-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    amber:
      "bg-amber text-onAccent border-2 border-onAccent shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-retro-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    secondary:
      "bg-transparent text-offwhite border-2 border-borderLight hover:bg-surfaceAlt",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (as === "a") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {Icon && <Icon size={16} />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
}
