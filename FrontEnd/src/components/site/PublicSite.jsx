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
import PreviousWork from "./PreviousWork.jsx";
import WhatsAppFloat from "../ui/WhatsAppFloat.jsx";


export default function PublicSite({ onLogin }) {
  return (
    <div>
      <Nav onLogin={onLogin} />
      <Hero onContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
      <Services />
      <ProcessTimeline />
      {/* <Work /> */}
      <PreviousWork onContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
      <Reviews />
      <Contact />
      <Connect />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
