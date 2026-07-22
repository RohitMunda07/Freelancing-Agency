import React, { useRef } from "react";
import Pill from "../ui/Pill.jsx";
import ProcessCard from "../ui/ProcessCard.jsx";
import { useGSAP } from "../../hooks/useGSAP.js";
import { PROCESS } from "../../data/mockData.js";

export default function ProcessTimeline() {
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  cardRefs.current = [];
  dotRefs.current = [];

  const addCardRef = (el) => el && cardRefs.current.push(el);
  const addDotRef = (el) => el && dotRefs.current.push(el);

  useGSAP((gsap) => {
    gsap.set(fillRef.current, { height: 0 });
    gsap.to(fillRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 55%",
        end: "bottom 55%",
        scrub: 0.4,
      },
    });

    cardRefs.current.forEach((card, i) => {
      const fromSide = i % 2 === 0 ? -36 : 36;
      gsap.fromTo(
        card,
        { opacity: 0, x: fromSide, y: 16 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );
    });

    dotRefs.current.forEach((dot) => {
      gsap.fromTo(
        dot,
        { backgroundColor: "#1B2430", borderColor: "#2C3644" },
        {
          backgroundColor: "#5EEAD4",
          borderColor: "#5EEAD4",
          duration: 0.3,
          scrollTrigger: { trigger: dot, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );
    });
  }, []);

  return (
    <div id="process" className="max-w-2xl mx-auto px-6 pb-24 sm:pb-32">
      <div className="text-center mb-12 sm:mb-14">
        <Pill>PROCESS</Pill>
        <h2 className="font-display text-2xl sm:text-[30px] text-offwhite mt-4">How a project runs</h2>
      </div>

      <div ref={trackRef} className="relative pl-0.5">
        {/* static spine — sits at the far left on mobile, centered on md+ */}
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-border" />
        {/* animated fill */}
        <div
          ref={fillRef}
          className="absolute left-3 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2 shadow-[0_0_12px_rgba(94,234,212,0.55)]"
          style={{ background: "linear-gradient(180deg, #5EEAD4, #F5A623)" }}
        />

        {PROCESS.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={p.n}
              className="grid grid-cols-[24px_1fr] md:grid-cols-[1fr_40px_1fr] items-center min-h-[140px] md:min-h-[168px]"
            >
              <div className="hidden md:block md:text-right md:pr-7 col-start-1">
                {isLeft && <ProcessCard phase={p} ref={addCardRef} />}
              </div>

              <div className="flex justify-center col-start-1 md:col-start-2">
                <div ref={addDotRef} className="w-3.5 h-3.5 rounded-full border-2 border-borderLight bg-surfaceAlt" />
              </div>

              <div className="pl-4 md:pl-7 md:text-left col-start-2 md:col-start-3">
                <div className="md:hidden">
                  <ProcessCard phase={p} />
                </div>
                <div className="hidden md:block">{!isLeft && <ProcessCard phase={p} ref={addCardRef} />}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
