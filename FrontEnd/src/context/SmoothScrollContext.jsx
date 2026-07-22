import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // keep native smooth scroll off — Lenis owns the easing
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Keep GSAP's ScrollTrigger positions in sync with Lenis's virtual scroll,
    // and drive Lenis's raf loop from GSAP's ticker so both stay on one clock.
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // Smoothly scroll to a section id (used instead of native scrollIntoView
  // so in-page nav links match the same easing as scroll/wheel input).
  const scrollTo = (id, opts = {}) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -8, ...opts });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>");
  return ctx;
}
