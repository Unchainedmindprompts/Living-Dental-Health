import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F2",
        "cream-soft": "#F5F0E8",
        "cream-deep": "#E6E0D2",
        ivory: "#FAF7F1",
        charcoal: "#1C1A17",
        "charcoal-soft": "#3A3631",
        "warm-gray": "#807A6F",
        sage: "#6B7F5E",
        "sage-deep": "#5C6B4A",
        "sage-soft": "#B6C0A6",
        rule: "rgba(28,26,23,0.10)",
        line: "rgba(28,26,23,0.18)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        tagline: "0.34em",
      },
      screens: {
        nav: "980px",
      },
    },
  },
  plugins: [],
};

export default config;
