import React, { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import Button from "../ui/Button.jsx";
import ThemeToggle from "../ui/ThemeToggle.jsx";

const LINKS = ["Services", "Process", "Work", "Reviews", "Contact"];

export default function Nav({ onLogin }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="border-b border-border sticky top-0 bg-ink/95 backdrop-blur z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display font-bold text-lg text-offwhite tracking-tight flex items-center gap-1">
          <span className="text-teal">{"<"}</span>Stackform<span className="text-teal">{"/>"}</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.toLowerCase());
              }}
              className="font-body text-sm text-muted hover:text-offwhite transition-colors"
            >
              {l}
            </a>
          ))}
          <ThemeToggle />
          <Button variant="secondary" icon={LogIn} onClick={onLogin} className="!px-4 !py-2">
            Client Login
          </Button>
        </div>

        {/* Mobile: toggle + hamburger, always visible */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-offwhite"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.toLowerCase());
              }}
              className="font-body text-sm text-muted"
            >
              {l}
            </a>
          ))}
          <Button variant="secondary" icon={LogIn} onClick={() => { setOpen(false); onLogin(); }} className="justify-center">
            Client Login
          </Button>
        </div>
      )}
    </div>
  );
}
