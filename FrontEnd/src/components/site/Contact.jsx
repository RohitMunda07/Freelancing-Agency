import React, { useState } from "react";
import { Mail, Github, Send, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button.jsx";

const inputClass =
  "font-body text-sm text-offwhite bg-surfaceAlt border border-borderLight rounded-lg px-3.5 py-2.5 outline-none focus:border-teal transition-colors w-full";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-28">
      <div className="bg-surface border border-border rounded-2xl p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-offwhite mb-3">Tell us about the project</h2>
          <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
            One reply, usually within a day, with a few clarifying questions and a rough sense of scope — no sales call required to get that.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-body text-[13px] text-muted">
              <Mail size={15} className="text-teal" /> hello@stackform.dev
            </div>
            <div className="flex items-center gap-2 font-body text-[13px] text-muted">
              <Github size={15} className="text-teal" /> github.com/stackform
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {sent ? (
            <div className="flex items-center gap-2.5 text-teal font-body text-sm">
              <CheckCircle2 size={18} />
              Thanks — this is a prototype, so nothing was actually sent, but this is where the message would go.
            </div>
          ) : (
            <>
              <input className={inputClass} placeholder="Your name" />
              <input className={inputClass} placeholder="Email" />
              <textarea className={inputClass} placeholder="What are you building?" rows={4} />
              <Button onClick={() => setSent(true)} icon={Send}>Send message</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
