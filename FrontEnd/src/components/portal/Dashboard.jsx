import React, { useState } from "react";
import { Layers, Bell, FileText } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import UpdatesFeed from "./UpdatesFeed.jsx";
import InvoicesTable from "./InvoicesTable.jsx";
import { PROJECTS } from "../../data/mockData.js";
import Sidebar from "../layout/Sidebar.jsx";

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
      <Sidebar
        tab={tab}
        setTab={setTab}
        selected={selected}
        setSelected={setSelected}
        onLogout={onLogout}
      />

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
