import React, { forwardRef } from "react";

const ProcessCard = forwardRef(function ProcessCard({ phase }, ref) {
  return (
    <div ref={ref} className="inline-block text-left bg-surface border border-border rounded-xl px-5 py-4.5 max-w-[280px]">
      <div className="font-mono text-[11px] text-mutedDark mb-1.5">PHASE {phase.n}</div>
      <h4 className="font-display text-[17px] text-offwhite mb-2">{phase.title}</h4>
      <p className="font-body text-[13px] text-muted leading-relaxed m-0">{phase.desc}</p>
    </div>
  );
});

export default ProcessCard;
