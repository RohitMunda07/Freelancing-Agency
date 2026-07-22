import React from "react";
import Nav from "../layout/Nav.jsx";
import Footer from "../layout/Footer.jsx";
import Hero from "./Hero.jsx";
import Services from "./Services.jsx";
import ProcessTimeline from "./ProcessTimeline.jsx";
import Work from "./Work.jsx";
import Reviews from "./Reviews.jsx";
import Contact from "./Contact.jsx";
import Connect from "./Connect.jsx";

export default function PublicSite({ onLogin }) {
  return (
    <div>
      <Nav onLogin={onLogin} />
      <Hero onContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
      <Services />
      <ProcessTimeline />
      <Work />
      <Reviews />
      <Contact />
      <Connect />
      <Footer />
    </div>
  );
}
