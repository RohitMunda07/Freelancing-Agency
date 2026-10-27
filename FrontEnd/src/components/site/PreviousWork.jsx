import React, { useState } from "react";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import Pill from "../ui/Pill.jsx";
import Button from "../ui/Button.jsx";

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  // { id: "website", label: "Websites" },
  // { id: "meta-ads", label: "Meta Ads" },
  // { id: "video-editing", label: "Reels & Shorts" },
];

const PROJECTS = [
  {
    id: 1,
    title: "MECON LIMITED, RANCHI JHARKHAND",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "teal",
    description: "Custom internal visitor management system and administrative CRM engineered for on-premise security. Features automated gate pass workflows, visitor credential logging, and structured administrative reporting.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793017278/mecon.jpg",
    liveUrl: "",
    metrics: "INTERNAL TOOL",
    status: "DELIVERED"
  },
  {
    id: 2,
    title: "Butter And Crumb Bakery",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "amber",
    description: "Lightweight, mobile-first daily bake storefront and digital menu prototype. Engineered for artisan cafes with sub-second load times, fresh batch availability indicators, and direct localized contact options.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793016122/Screenshot_2026-10-26_171923.png",
    liveUrl: "https://butter-and-crumb-bakery.netlify.app/",
    metrics: "BAKERY BLUEPRINT",
    status: "SAMPLE"
  },
  {
    id: 3,
    title: "Sugar Whisk",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "teal",
    description: "Interactive patisserie ordering concept built for high local conversion. Features custom cake configuration workflows (flavor, weight, and custom notes) paired with a seamless one-tap WhatsApp order dispatch flow.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793016113/Screenshot_2026-10-26_172055.png",
    liveUrl: "https://sugar-whisk.netlify.app/",
    metrics: "BAKERY BLUEPRINT",
    status: "SAMPLE"
  },
  {
    id: 4,
    title: "Verane",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "amber",
    description: "High-performance boutique apparel and ethnic wear storefront concept. Engineered with responsive collection lookbooks, zero layout shift (CLS), and intuitive filtering tailored for modern retail fashion brands.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793016103/Screenshot_2026-10-26_172401.png",
    liveUrl: "https://verane.netlify.app/",
    metrics: "FASHION STOREFRONT",
    status: "SAMPLE"
  },
  {
    id: 5,
    title: "Nova",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "teal",
    description: "Streetwear and modern apparel ecommerce prototype built for high-retention shopping experiences. Features fluid size/variant selection, instant cart state management, and optimized asset loading.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793016078/Cloth1.png",
    liveUrl: "https://nova-ecommerce-sample.netlify.app/",
    metrics: "D2C COMMERCE ARCHITECTURE",
    status: "SAMPLE"
  },
  {
    id: 6,
    title: "Frostella",
    category: "website",
    categoryLabel: "Website Development",
    tagColor: "amber",
    description: "Vibrant, mobile-first visual menu and inquiry portal designed for quick-service dessert parlours. Features dynamic flavor category filtering, seasonal highlight cards, and an integrated event/bulk catering form.",
    image: "https://res.cloudinary.com/u7orcin4/image/upload/f_auto,q_auto:good,w_800,ar_16:10,c_fill,g_auto/v1793015981/Screenshot_2026-10-26_172643.png",
    liveUrl: "https://frostella-ice-cream.netlify.app/",
    metrics: "DESSERT BLUEPRINT",
    status: "SAMPLE"
  },
];

export default function PreviousWork({ onContact }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects =
    activeTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <div id="work" className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <Pill>PORTFOLIO & CASE STUDIES</Pill>
          <h1 className="font-display text-3xl sm:text-[40px] text-offwhite mt-4 tracking-tight leading-tight">
            Selected Work & Results
          </h1>
          <p className="font-body text-sm sm:text-base text-muted mt-2 max-w-lg leading-relaxed">
            A look at recent websites engineered for performance, ad campaigns configured for ROAS, and reels edited for high retention.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-surface border border-border rounded-xl p-1.5 self-start md:self-auto">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-body text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-surfaceAlt text-teal font-medium border border-borderLight shadow-sm"
                  : "text-muted hover:text-offwhite hover:bg-surfaceAlt/50"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredProjects.map((item) => (
          <div
            key={item.id}
            className="group bg-surface border border-border hover:border-borderLight rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] bg-surfaceAlt overflow-hidden border-b border-borderLight">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container if the local image is not yet placed
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add(
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                  e.currentTarget.parentElement.innerHTML = `
                    <div class="flex flex-col items-center gap-2 text-mutedDark font-mono text-xs">
                      <span>[IMAGE PREVIEW]</span>
                      <span class="text-[10px] text-muted">${item.title}</span>
                    </div>
                  `;
                }}
              />

              {/* Top overlay badge */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[11px] !text-black text-offwhite bg-ink/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-borderLight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse " />
                  {item.metrics}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Pill color={item.tagColor}>{item.categoryLabel}</Pill>
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-teal transition-colors"
                    aria-label={`Open ${item.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <h3 className="font-display text-lg text-offwhite group-hover:text-teal transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-muted leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="pt-5 mt-5 border-t border-borderLight/60 flex items-center justify-between text-xs font-mono text-muted">
                <span>{item.status}</span>
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-offwhite hover:text-teal font-body transition-colors"
                >
                  {item.id !== 1 && <span>View live <ExternalLink size={12} /></span>}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer banner */}
      <div className="mt-16 sm:mt-20 bg-surfaceAlt/60 border border-border rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-display text-xl sm:text-2xl text-offwhite">
            Have a project or campaign in mind?
          </h3>
          <p className="font-body text-sm text-muted mt-1">
            We handle everything from code and ad setups to viral short video edits.
          </p>
        </div>
        <Button onClick={onContact} icon={ArrowUpRight}>
          Start your project
        </Button>
      </div>
    </div>
  );
}