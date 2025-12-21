import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        coal: "var(--color-coal)",
        charcoal: "var(--color-charcoal)",
        stone: "var(--color-stone)",
        fog: "var(--color-fog)",
        mist: "var(--color-mist)",
        moss: "var(--color-moss)",
        "moss-light": "var(--color-moss-light)",
        cream: "var(--color-cream)",
        "warm-white": "var(--color-warm-white)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;


