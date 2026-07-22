import React from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";

const STATUS_MAP = {
  "In Progress": { color: "text-amber", icon: Clock },
  Delivered: { color: "text-teal", icon: CheckCircle },
};

function StatusPill({ status }) {
  const { color, icon: Icon } = STATUS_MAP[status] || STATUS_MAP["In Progress"];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${color}`}>
      <Icon size={12} /> {status.toUpperCase()}
    </span>
  );
}

export default function ProjectDetail({ project, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-muted font-body text-sm mb-5 flex items-center gap-1">
        ← All projects
      </button>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-6">
        <div>
          <h2 className="font-display text-2xl text-offwhite mb-1.5">{project.name}</h2>
          <div className="font-body text-[13px] text-muted">{project.client} · Due {project.dueDate}</div>
        </div>
        <StatusPill status={project.status} />
      </div>

      <p className="font-body text-sm text-muted leading-relaxed max-w-lg mb-7">{project.description}</p>

      <div className="font-mono text-xs text-mutedDark mb-3">MILESTONES</div>
      <div className="flex flex-col gap-2.5">
        {project.milestones.map((m) => (
          <div key={m.label} className={`flex items-center gap-2.5 font-body text-sm ${m.done ? "text-offwhite" : "text-muted"}`}>
            {m.done ? <CheckCircle size={16} className="text-teal" /> : <Circle size={16} className="text-mutedDark" />}
            <span>{m.label}</span>
          </div>
        ))}
        {project.milestones.length === 0 && (
          <div className="font-body text-[13px] text-mutedDark">Project delivered — no open milestones.</div>
        )}
      </div>
    </div>
  );
}
