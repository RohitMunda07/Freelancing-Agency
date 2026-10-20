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
      Build. Scale. Convert. · Build. Scale. Convert. · Build. Scale. Convert.
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
          <Pill>DEV · META ADS · REELS CREATIVE</Pill>
          <h1 className="font-display text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.08] text-offwhite mt-5 mb-5 tracking-tight">
            High-converting{" "}
            <span className="relative text-teal inline-block">
              websites
              <Squiggle color="#5EEAD4" />
            </span>{" "}
            and the <span className="text-amber">Meta ads & reels</span> that scale them.
          </h1>
          <p className="font-body text-base text-muted leading-relaxed max-w-[480px]">
            ArisingBox builds modern, fast web applications and pairs them with ROI-focused Meta Ad campaigns and viral short-form reel editing. Complete brand growth under one roof.
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
            <StackCard label="WEB DEVELOPMENT" sub="react · node · custom" offset={0} color="#5EEAD4" />
          </div>
          <div className="absolute left-[4%] sm:left-[8%] top-16">
            <StackCard label="META ADS" sub="scaling · roas · leads" offset={1} color="#5EEAD4" />
          </div>
          <div className="absolute left-[4%] sm:left-[8%] top-[124px]">
            <StackCard label="SHORTS & REELS" sub="retention · editing" offset={2} color="#5EEAD4" />
          </div>
          <div className="absolute right-0 sm:right-[2%] top-[184px]">
            <StackCard label="GROWTH STACK" sub="full pipeline" offset={3} color="#F5A623" />
          </div>
          <span className="absolute right-[4%] -top-4 font-hand text-lg text-teal rotate-[6deg] hidden sm:block">
            ready to convert
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <WavyDivider />
      </div>
    </div>
  );
}