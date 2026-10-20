import React from "react";
import Pill from "../ui/Pill.jsx";
import { CodeSplitIcon } from "../ui/ServiceIcons.jsx";

/* 2. Megaphone Animation for Meta Ads */
const MegaphoneIcon = () => (
  <div className="w-10 h-10 rounded-lg bg-surfaceAlt border border-borderLight flex items-center justify-center group-hover:border-teal transition-colors">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-teal">
      {/* Megaphone body */}
      <path
        d="M3 11V13C3 13.55 3.45 14 4 14H6L11 17V7L6 10H4C3.45 10 3 10.45 3 11Z"
        fill="currentColor"
        className="group-hover:-rotate-6 transition-transform origin-center"
      />
      {/* Megaphone handle */}
      <path
        d="M6 14L7 18.5C7.2 19.3 8 19.8 8.8 19.6C9.6 19.4 10 18.5 9.8 17.8L9 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Sound waves emitted on hover */}
      <path
        d="M15 9C16.2 10.2 16.2 13.8 15 15"
        stroke="#F5A623"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
      />
      <path
        d="M18 6.5C20.5 9 20.5 15 18 17.5"
        stroke="#F5A623"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="transition-all duration-300 opacity-20 group-hover:opacity-100 group-hover:translate-x-1"
      />
    </svg>
  </div>
);

/* 3. Movie Take / Clapperboard Animation for Video Editing */
const MovieTakeIcon = () => (
  <div className="w-10 h-10 rounded-lg bg-surfaceAlt border border-borderLight flex items-center justify-center group-hover:border-amber transition-colors">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber">
      {/* Slate base board */}
      <rect x="3" y="10" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Film track lines on base */}
      <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />
      <line x1="7" y1="17.5" x2="13" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />

      {/* Clapper arm: Starts tilted open, snaps shut on hover (Movie Take action) */}
      <g className="transition-transform duration-300 origin-[3px_10px] -rotate-12 group-hover:rotate-0">
        <rect x="3" y="5.5" width="18" height="4.5" rx="1" fill="#5EEAD4" />
        {/* Clapper stripes */}
        <path d="M7 5.5L5.5 10M12 5.5L10.5 10M17 5.5L15.5 10" stroke="#161b22" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

const SERVICES_DATA = [
  {
    title: "Website Development",
    tag: "FULL STACK",
    desc: "Modern, high-performance web applications, landing pages, and storefronts built with seamless UX and clean architecture.",
    icon: CodeSplitIcon,
    tagColor: "teal",
  },
  {
    title: "Meta Ads",
    tag: "PAID TRAFFIC",
    desc: "Targeted Facebook and Instagram ad campaigns optimized for low CPA, qualified lead generation, and maximum ROAS.",
    icon: MegaphoneIcon,
    tagColor: "amber",
  },
  {
    title: "Video Editing",
    tag: "SHORTS & REELS",
    desc: "High-retention short-form video editing with punchy hooks, clean captions, and pacing designed to maximize watch time.",
    icon: MovieTakeIcon,
    tagColor: "teal",
  },
];

export default function Services() {
  return (
    <div id="services" className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-[28px] text-offwhite m-0">What we build</h2>
        <span className="font-mono text-xs text-mutedDark hidden sm:inline">03 SERVICES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES_DATA.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="group bg-surface border border-border rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <Icon />
                <h3 className="font-display text-lg text-offwhite mt-4 mb-2">{s.title}</h3>
                <div className="mb-2.5">
                  <Pill color={s.tagColor}>{s.tag}</Pill>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed m-0">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}