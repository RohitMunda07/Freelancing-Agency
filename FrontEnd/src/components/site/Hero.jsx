import React from "react";
import { ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import Button from "../ui/Button.jsx";
import Pill from "../ui/Pill.jsx";
import StackCard from "../ui/StackCard.jsx";

const Squiggle = ({ color }) => (
  <svg width="150" height="14" viewBox="0 0 150 14" className="absolute left-0 -bottom-1.5 w-24 sm:w-[150px]">
    <path
      d="M2 9 C 20 2, 35 2, 50 8 S 80 14, 95 7 S 130 1, 148 8"
      stroke={color}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const HandArrow = ({ color }) => (
  <svg width="70" height="46" viewBox="0 0 70 46" className="absolute -left-4 -top-8 hidden sm:block">
    <path d="M4 4 C 20 6, 40 10, 54 28" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M40 26 L54 28 L50 15" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WavyDivider = () => (
  <svg width="100%" height="70" viewBox="0 0 1200 70" preserveAspectRatio="none" className="block">
    <path
      id="heroWave"
      d="M0,40 C 150,10 300,10 450,42 S 750,74 900,40 S 1080,8 1200,34"
      fill="none"
      stroke="#2C3644"
      strokeWidth="1.5"
    />
    <text className="font-hand text-base fill-mutedDark">
      <textPath href="#heroWave" startOffset="4%">
        Build. Ship. Iterate. · Build. Ship. Iterate. · Build. Ship. Iterate.
      </textPath>
    </text>
  </svg>
);

export default function Hero({ onContact }) {
  return (
    <div className="dot-grid relative pt-2">
      <Sparkles size={26} className="absolute top-7 left-[6%] text-amber opacity-80 animate-spinSlow hidden sm:block" />
      <Lightbulb size={24} className="absolute top-7 right-[5%] text-teal opacity-70 animate-floatY hidden sm:block" />

      <div id="top" className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20 pb-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-12 items-center relative">
        <div>
          <Pill>WEB · MOBILE · ONE TEAM</Pill>
          <h1 className="font-display text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.08] text-offwhite mt-5 mb-5 tracking-tight">
            We build the{" "}
            <span className="relative text-teal inline-block">
              web app
              <Squiggle color="#5EEAD4" />
            </span>{" "}
            and the <span className="text-amber">Android app</span> — from the same source of truth.
          </h1>
          <p className="font-body text-base text-muted leading-relaxed max-w-[480px]">
            Stackform is a small full-stack studio working in MERN and Kotlin/Compose. No handoffs between disconnected teams — one point of contact, one API, one plan.
          </p>

          <div className="relative flex flex-wrap gap-3 mt-8">
            <Button onClick={onContact} icon={ArrowRight}>Start a project</Button>
            <Button
              variant="secondary"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              See our work
            </Button>

            <span className="absolute -left-16 -top-10 font-hand text-xl text-amber -rotate-[8deg] hidden sm:block">
              Let's go
            </span>
            <HandArrow color="#F5A623" />
          </div>
        </div>

        <div className="relative h-[260px] sm:h-[300px] flex items-center justify-center">
          <div className="absolute left-[4%] sm:left-[8%] top-2">
            <StackCard label="REACT" sub="frontend" offset={0} color="#5EEAD4" />
          </div>
          <div className="absolute left-[4%] sm:left-[8%] top-16">
            <StackCard label="EXPRESS · NODE" sub="api layer" offset={1} color="#5EEAD4" />
          </div>
          <div className="absolute left-[4%] sm:left-[8%] top-[124px]">
            <StackCard label="MONGODB" sub="data" offset={2} color="#5EEAD4" />
          </div>
          <div className="absolute right-0 sm:right-[2%] top-[184px]">
            <StackCard label="KOTLIN · COMPOSE" sub="android" offset={3} color="#F5A623" />
          </div>
          <span className="absolute right-[4%] -top-4 font-hand text-lg text-teal rotate-[6deg] hidden sm:block">
            two stacks, one team
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <WavyDivider />
      </div>
    </div>
  );
}
