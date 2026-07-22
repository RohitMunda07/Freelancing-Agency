import React from "react";
import { Clock, CheckCircle } from "lucide-react";

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

export default function ProjectCard({ project, onSelect }) {
  return (
    <div
      onClick={() => onSelect(project.id)}
      className="bg-surface border border-border rounded-xl p-5 cursor-pointer hover:border-borderLight transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-display text-base text-offwhite mb-1">{project.name}</div>
          <div className="font-body text-xs text-mutedDark">{project.client} · {project.stack}</div>
        </div>
        <StatusPill status={project.status} />
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-mono text-[11px] text-mutedDark mb-1.5">
          <span>PROGRESS</span><span>{project.progress}%</span>
        </div>
        <div className="h-1.5 bg-surfaceAlt rounded overflow-hidden">
          <div
            className={`h-full rounded ${project.status === "Delivered" ? "bg-teal" : "bg-amber"}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
