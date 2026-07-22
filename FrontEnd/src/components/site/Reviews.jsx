import React from "react";
import { Quote } from "lucide-react";
import Pill from "../ui/Pill.jsx";

/**
 * Placeholder testimonial section. No reviews yet — this reserves the
 * layout so real client quotes can be dropped in later without a redesign.
 * To add one: replace an entry in `PLACEHOLDERS` (or map real data) with
 * { quote, name, role }.
 */
const PLACEHOLDERS = [1, 2, 3];

export default function Reviews() {
  return (
    <div id="reviews" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-28">
      <div className="text-center mb-10">
        <Pill>REVIEWS</Pill>
        <h2 className="font-display text-2xl sm:text-[28px] text-offwhite mt-4">What clients say</h2>
        <p className="font-body text-sm text-muted mt-2 max-w-md mx-auto">
          Early days — this space is reserved for client reviews as projects wrap up.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {PLACEHOLDERS.map((i) => (
          <div
            key={i}
            className="border border-dashed border-borderLight rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]"
          >
            <Quote size={20} className="text-mutedDark mb-3" />
            <p className="font-body text-sm text-mutedDark">Reserved for a future review</p>
          </div>
        ))}
      </div>
    </div>
  );
}
