import React, { useState } from "react";
import { LogIn } from "lucide-react";
import Button from "../ui/Button.jsx";

const inputClass =
  "font-body text-sm text-offwhite bg-surfaceAlt border border-borderLight rounded-lg px-3.5 py-2.5 outline-none focus:border-teal transition-colors w-full";

export default function LoginScreen({ onLogin, onBack }) {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8">
        <div className="font-display font-bold text-lg text-offwhite mb-1">
          <span className="text-teal">{"<"}</span>Stackform<span className="text-teal">{"/>"}</span>
        </div>
        <div className="font-body text-[13px] text-muted mb-6">Client Portal — sign in to view your project</div>

        <div className="flex flex-col gap-3">
          <input className={inputClass} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={inputClass} placeholder="Password" type="password" />
          <Button onClick={onLogin} icon={LogIn} className="justify-center mt-1">
            Sign in
          </Button>
          <div className="font-body text-xs text-mutedDark text-center mt-1">
            Prototype login — any details will work.
          </div>
        </div>

        <button onClick={onBack} className="text-muted font-body text-sm mt-5">
          ← Back to site
        </button>
      </div>
    </div>
  );
}
