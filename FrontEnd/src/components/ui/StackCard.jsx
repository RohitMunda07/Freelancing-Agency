import React from "react";

export default function StackCard({ label, sub, offset = 0, color = "#5EEAD4" }) {
  return (
    <div
      className="bg-surfaceAlt border border-borderLight rounded-[10px] px-4 py-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.35)] flex items-center justify-between min-w-[190px] sm:min-w-[220px]"
      style={{ transform: `translate(${offset * 10}px, ${offset * -8}px)` }}
    >
      <div>
        <div className="font-mono text-[13px] tracking-wide" style={{ color }}>
          {label}
        </div>
        <div className="font-body text-xs text-muted mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
