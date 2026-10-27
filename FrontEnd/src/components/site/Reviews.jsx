import React from "react";
import { Star, Quote } from "lucide-react";
import Pill from "../ui/Pill.jsx";
import { REVIEWS } from "../../data/mockData.js";

export default function Reviews() {
  return (
    <div id="reviews" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-28">
      <div className="text-center mb-12 sm:mb-14">
        <Pill>REVIEWS</Pill>
        <h2 className="font-display text-2xl sm:text-[28px] text-offwhite mt-4">
          What clients say
        </h2>
        <p className="font-body text-sm text-muted mt-2 max-w-md mx-auto">
          Feedback on our build speed, communication, and conversion results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.slice(0, 3).map((r) => (
          <div
            key={r.id}
            className="group bg-surface border border-border hover:border-borderLight rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={18} className="text-borderLight group-hover:text-teal transition-colors" />
              </div>

              <div className="mb-3">
                <span className="font-mono text-[11px] text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded">
                  {r.service}
                </span>
              </div>

              <p className="font-body text-sm text-muted leading-relaxed italic">
                "{r.quote}"
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-borderLight flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surfaceAlt border border-borderLight flex items-center justify-center font-mono text-xs text-offwhite font-medium">
                <img className="w-full h-full rounded-full" src={r.avatar} alt="client_review" loading="lazy" />
              </div>
              <div>
                <h4 className="font-display text-sm text-offwhite leading-none">
                  {r.name}
                </h4>
                <p className="font-body text-xs text-muted mt-1">
                  {r.role} · {r.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}