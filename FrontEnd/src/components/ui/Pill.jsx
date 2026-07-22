import React from "react";

const COLORS = {
  teal: "text-teal border-teal/40 bg-teal/10",
  amber: "text-amber border-amber/40 bg-amber/10",
};

export default function Pill({ children, color = "teal" }) {
  return (
    <span
      className={`font-mono text-[11px] tracking-wider rounded-full border px-2.5 py-1 inline-block ${COLORS[color]}`}
    >
      {children}
    </span>
  );
}
