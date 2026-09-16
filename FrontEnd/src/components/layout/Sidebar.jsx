import React from "react";
import { Layers, Bell, FileText, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/authContex";

const TABS = [
  { id: "projects", label: "Projects", icon: Layers },
  { id: "updates", label: "Updates", icon: Bell },
  { id: "invoices", label: "Invoices", icon: FileText },
];

export default function Sidebar({ tab, setTab, selected, setSelected, onLogout }) {
  const { user, logout } = useAuth();

  const userName = user?.fullname || user?.name || "";
  const userCompany = user?.company || "No Company";

  return (
    <div className="md:w-56 border-b md:border-b-0 md:border-r border-border p-4 md:p-6 flex md:flex-col">
      <div className="hidden md:block font-display font-bold text-[17px] text-offwhite mb-8 pl-2">
        <span className="text-teal">{"<"}</span>ArisingBox<span className="text-teal">{"/>"}</span>
      </div>

      <div className="flex md:flex-col gap-2 flex-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              if (setSelected) setSelected(null);
            }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-body text-sm whitespace-nowrap ${tab === t.id ? "bg-surfaceAlt text-offwhite" : "text-muted"
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

        <div className="">
          <div className="font-body text-xs text-muted flex-1">{userName}</div>
          <div className="font-body text-xs text-muted flex-1">{userCompany}</div>
        </div>

        <button onClick={() => logout()}>
          <LogOut size={15} className="text-mutedDark" />
        </button>
      </div>
      <button onClick={onLogout} className="md:hidden ml-2 flex-shrink-0">
        <LogOut size={18} className="text-mutedDark" />
      </button>
    </div>
  );
}
