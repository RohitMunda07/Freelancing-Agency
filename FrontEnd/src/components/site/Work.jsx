import React from "react";
import Pill from "../ui/Pill.jsx";

export default function Work() {
  return (
    <div id="work" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-28">
      <h2 className="font-display text-2xl sm:text-[28px] text-offwhite mb-8">Recent work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-surface border border-border rounded-xl p-7">
          <Pill>MERN</Pill>
          <h3 className="font-display text-xl text-offwhite mt-3.5 mb-2">Visitors Management System</h3>
          <p className="font-body text-sm text-muted leading-relaxed">
            Front-desk check-in, host alerts, and badge printing across a 3-building business park — replacing a paper logbook with a searchable digital record.
          </p>
          <div className="flex gap-2 mt-3 font-mono text-[11px] text-mutedDark">
            <span>REACT</span><span>·</span><span>NODE</span><span>·</span><span>MONGODB</span>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-7">
          <Pill color="amber">KOTLIN / COMPOSE</Pill>
          <h3 className="font-display text-xl text-offwhite mt-3.5 mb-2">Field Inspection App</h3>
          <p className="font-body text-sm text-muted leading-relaxed">
            Offline-first Android app for warehouse inspection checklists, syncing photos and reports the moment connectivity returns.
          </p>
          <div className="flex gap-2 mt-3 font-mono text-[11px] text-mutedDark">
            <span>COMPOSE</span><span>·</span><span>ROOM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
