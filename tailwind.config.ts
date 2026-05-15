import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          black: "#0A0A0A",
          white: "#F7F4EE",
          ember: "#C84B11",
          "ember-dim": "#7A2D0A",
          "ember-glow": "#E8621A",
          ash: "#1A1612",
          smoke: "#2E2925",
          mist: "#8C8480",
          cream: "#D4CFC8",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      animation: {
        "fade-up": "fadeUp 0.9s ease forwards",
        "scroll-pulse": "scrollPulse 2s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
