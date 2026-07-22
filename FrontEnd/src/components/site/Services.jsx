import React from "react";
import Pill from "../ui/Pill.jsx";
import { CodeSplitIcon, PhoneIcon, StackDisassembleIcon } from "../ui/ServiceIcons.jsx";
import { SERVICES } from "../../data/mockData.js";

const ICONS = { code: CodeSplitIcon, phone: PhoneIcon, stack: StackDisassembleIcon };

export default function Services() {
  return (
    <div id="services" className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-[28px] text-offwhite m-0">What we build</h2>
        <span className="font-mono text-xs text-mutedDark hidden sm:inline">03 SERVICES</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.iconType];
          return (
            <div
              key={s.title}
              className="group bg-surface border border-border rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              {Icon && <Icon />}
              <h3 className="font-display text-lg text-offwhite mt-4 mb-2">{s.title}</h3>
              <div className="mb-2.5">
                <Pill color="amber">{s.tag}</Pill>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed m-0">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
