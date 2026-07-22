import React from "react";
import { Smartphone } from "lucide-react";

/**
 * Three custom animated service icons. Each assumes it is rendered inside
 * a parent with the "group" class so Tailwind's group-hover variants fire
 * on card hover, not just icon hover.
 */

// "</>" splits apart and lifts on hover: < moves left+up, / moves straight up, > moves right+up
export function CodeSplitIcon() {
  return (
    <div className="flex items-center font-mono font-bold text-2xl text-teal select-none h-9">
      <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-1">
        &lt;
      </span>
      <span className="transition-transform duration-300 ease-out group-hover:-translate-y-2">/</span>
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1">
        &gt;
      </span>
    </div>
  );
}

// Phone icon lifts lightly on hover
export function PhoneIcon() {
  return (
    <div className="h-9 flex items-center">
      <Smartphone size={24} className="text-amber transition-transform duration-300 ease-out group-hover:-translate-y-2" />
    </div>
  );
}

// Three stacked "plates" disassemble on hover: top plate lifts most and first,
// middle plate lifts a little with a delay, bottom plate stays put a beat longer
export function StackDisassembleIcon() {
  return (
    <div className="relative w-9 h-9">
      <div className="absolute inset-x-0 top-0 h-2 rounded bg-teal transition-transform duration-300 ease-out group-hover:-translate-y-3" />
      <div className="absolute inset-x-0 top-[11px] h-2 rounded bg-teal/70 transition-transform duration-300 ease-out delay-100 group-hover:-translate-y-1" />
      <div className="absolute inset-x-0 top-[22px] h-2 rounded bg-teal/40 transition-transform duration-300 ease-out delay-200 group-hover:translate-y-1" />
    </div>
  );
}
