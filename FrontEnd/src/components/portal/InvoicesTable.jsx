import React from "react";
import { Download } from "lucide-react";
import { INVOICES, PROJECTS } from "../../data/mockData.js";

export default function InvoicesTable() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-x-auto">
      <table className="w-full border-collapse min-w-[560px]">
        <thead>
          <tr className="border-b border-border">
            {["Invoice", "Project", "Amount", "Status", "Date", ""].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-mono text-[11px] text-mutedDark font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((inv) => (
            <tr key={inv.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3.5 font-mono text-[13px] text-offwhite">{inv.id}</td>
              <td className="px-4 py-3.5 font-body text-[13px] text-muted">
                {PROJECTS.find((p) => p.id === inv.project)?.name}
              </td>
              <td className="px-4 py-3.5 font-body text-[13px] text-offwhite">{inv.amount}</td>
              <td className="px-4 py-3.5">
                <span className={`font-mono text-[11px] ${inv.status === "Paid" ? "text-teal" : "text-amber"}`}>
                  {inv.status}
                </span>
              </td>
              <td className="px-4 py-3.5 font-body text-[13px] text-mutedDark">{inv.date}</td>
              <td className="px-4 py-3.5">
                <Download size={14} className="text-mutedDark cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
