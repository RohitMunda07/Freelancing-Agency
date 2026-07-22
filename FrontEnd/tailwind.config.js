/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Structural / neutral colors — theme-aware via CSS variables
        // defined in src/index.css (see :root and [data-theme="light"]).
        ink: "var(--color-bg)",
        surface: "var(--color-surface)",
        surfaceAlt: "var(--color-surfaceAlt)",
        border: "var(--color-border)",
        borderLight: "var(--color-borderLight)",
        offwhite: "var(--color-text)",
        muted: "var(--color-muted)",
        mutedDark: "var(--color-mutedDark)",

        // Fixed near-black used for text/borders sitting ON TOP of an
        // accent-colored fill (e.g. button text) — must stay dark in
        // both themes since the accent fill itself doesn't change.
        onAccent: "#0D1117",

        // Brand accents — intentionally constant across themes.
        teal: { DEFAULT: "#5EEAD4", dim: "#2DD4BF" },
        amber: { DEFAULT: "#F5A623", dim: "#D98C1A" },
        danger: "#F16565",

        // WhatsApp brand green, used only by the WhatsApp button.
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ['"Sora"', "sans-serif"],
        body: ["Manrope", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        floatY: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        spinSlow: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
      },
      animation: {
        floatY: "floatY 3.4s ease-in-out infinite",
        spinSlow: "spinSlow 9s linear infinite",
      },
      boxShadow: {
        retro: "4px 4px 0px #0D1117",
        "retro-sm": "2px 2px 0px #0D1117",
      },
    },
  },
  plugins: [],
};
