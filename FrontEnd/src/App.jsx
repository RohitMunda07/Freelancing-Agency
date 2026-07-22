import React, { useState } from "react";
import PublicSite from "./components/site/PublicSite.jsx";
import LoginScreen from "./components/portal/LoginScreen.jsx";
import Dashboard from "./components/portal/Dashboard.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// view: "site" | "login" | "dashboard"
export default function App() {
  const [view, setView] = useState("site");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-ink">
        {view === "site" && <PublicSite onLogin={() => setView("login")} />}
        {view === "login" && (
          <LoginScreen onLogin={() => setView("dashboard")} onBack={() => setView("site")} />
        )}
        {view === "dashboard" && <Dashboard onLogout={() => setView("site")} />}
      </div>
    </ThemeProvider>
  );
}
