import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Colors are semantic tokens defined as RGB triples in globals.css and
 * flipped by the light/dark theme class — `<alpha-value>` keeps Tailwind's
 * opacity modifiers (e.g. border-portfolio-ember/30) working.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

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
          black: token("canvas"),
          ash: token("surface"),
          smoke: token("line"),
          white: token("ink"),
          bright: token("ink-strong"),
          cream: token("ink-2"),
          mist: token("ink-3"),
          ember: token("accent"),
          "ember-glow": token("accent-bright"),
          "ember-dim": token("accent-dim"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        serif: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "Geist", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
