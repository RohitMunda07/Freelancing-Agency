import React, { useState } from "react";
import { Layers, Bell, FileText, LogOut, User } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import UpdatesFeed from "./UpdatesFeed.jsx";
import InvoicesTable from "./InvoicesTable.jsx";
import { PROJECTS } from "../../data/mockData.js";

const TABS = [
  { id: "projects", label: "Projects", icon: Layers },
  { id: "updates", label: "Updates", icon: Bell },
  { id: "invoices", label: "Invoices", icon: FileText },
];

export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("projects");
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar on desktop, top tab bar on mobile */}
      <div className="md:w-56 border-b md:border-b-0 md:border-r border-border p-4 md:p-6 flex md:flex-col">
        <div className="hidden md:block font-display font-bold text-[17px] text-offwhite mb-8 pl-2">
          <span className="text-teal">{"<"}</span>Stackform<span className="text-teal">{"/>"}</span>
        </div>

        <div className="flex md:flex-col gap-2 flex-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelected(null); }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-body text-sm whitespace-nowrap ${
                tab === t.id ? "bg-surfaceAlt text-offwhite" : "text-muted"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 p-2 border-t border-border mt-3 pt-4">
          <div className="w-7 h-7 rounded-full bg-surfaceAlt flex items-center justify-center">
            <User size={14} className="text-muted" />
          </div>
          <div className="font-body text-xs text-muted flex-1">Meridian Business Park</div>
          <button onClick={onLogout}>
            <LogOut size={15} className="text-mutedDark" />
          </button>
        </div>
        <button onClick={onLogout} className="md:hidden ml-2 flex-shrink-0">
          <LogOut size={18} className="text-mutedDark" />
        </button>
      </div>

      <div className="flex-1 p-6 sm:p-8 md:p-10 max-w-3xl">
        {tab === "projects" && !selected && (
          <>
            <h2 className="font-display text-xl sm:text-2xl text-offwhite mb-5">Your projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} onSelect={setSelected} />
              ))}
            </div>
          </>
        )}
        {tab === "projects" && selected && (
          <ProjectDetail project={PROJECTS.find((p) => p.id === selected)} onBack={() => setSelected(null)} />
        )}
        {tab === "updates" && (
          <>
            <h2 className="font-display text-xl sm:text-2xl text-offwhite mb-5">Recent updates</h2>
            <UpdatesFeed />
          </>
        )}
        {tab === "invoices" && (
          <>
            <h2 className="font-display text-xl sm:text-2xl text-offwhite mb-5">Invoices</h2>
            <InvoicesTable />
          </>
        )}
      </div>
    </div>
  );
}
