import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
