import React from "react";
import Pill from "../ui/Pill.jsx";
import { UPDATES, PROJECTS } from "../../data/mockData.js";

export default function UpdatesFeed() {
  return (
    <div className="flex flex-col gap-3.5">
      {UPDATES.map((u) => (
        <div key={u.id} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <Pill color={u.project === "vms" ? "teal" : "amber"}>
              {PROJECTS.find((p) => p.id === u.project)?.name}
            </Pill>
            <span className="font-mono text-[11px] text-mutedDark">{u.date}</span>
          </div>
          <p className="font-body text-sm text-offwhite leading-relaxed m-0">{u.text}</p>
        </div>
      ))}
    </div>
  );
}
