import React from "react";
import { Linkedin, Github, Mail, ArrowRight } from "lucide-react";
import Button from "../ui/Button.jsx";
import { SOCIALS } from "../../data/mockData.js";

const ICONS = { linkedin: Linkedin, github: Github, email: Mail };

export default function Connect() {
  return (
    <div className="dot-grid">
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-28 text-center">
        <h2 className="font-display text-2xl sm:text-[32px] text-offwhite">Let's build together.</h2>
        <p className="font-body text-sm sm:text-base text-muted mt-3 max-w-md mx-auto">
          Have an idea, business, or project in mind? Let's turn it into something real — on web and Android.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
          {SOCIALS.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <div key={s.id} className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-surfaceAlt flex items-center justify-center mb-4">
                  <Icon size={18} className="text-teal" />
                </div>
                <h3 className="font-display text-base text-offwhite mb-2">{s.title}</h3>
                <p className="font-body text-xs text-muted leading-relaxed mb-5">{s.desc}</p>
                <Button as="a" href={s.href} variant="amber" icon={ArrowRight} className="!px-4 !py-2 !text-xs">
                  {s.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="bg-surface/60 border border-border rounded-2xl p-8 sm:p-10 mt-8">
          <h3 className="font-display text-xl sm:text-2xl text-offwhite mb-3">Ready to build something amazing?</h3>
          <p className="font-body text-sm text-muted max-w-md mx-auto mb-6">
            From web dashboards to Android apps, reach out to start your next project.
          </p>
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </div>
  );
}
