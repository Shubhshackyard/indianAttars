import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutrals (carry ~90% of the UI)
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        elevated: "var(--color-elevated)",
        cream: "var(--color-cream)",
        line: { DEFAULT: "var(--color-border)", strong: "var(--color-border-strong)" },
        divider: "var(--color-divider)",
        // Text hierarchy
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        faint: "var(--color-faint)",
        placeholder: "var(--color-placeholder)",
        disabled: "var(--color-disabled)",
        // Brand accent (emerald) — the single interactive color
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          pressed: "var(--color-primary-pressed)",
          soft: "var(--color-primary-soft)",
          fg: "var(--color-primary-fg)",
        },
        interactive: "var(--color-interactive)",
        link: "var(--color-link)",
        visited: "var(--color-visited)",
        // Micro-accent (antique gold) — rare, non-interactive
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
        },
        // Semantic
        success: { DEFAULT: "var(--color-success)", soft: "var(--color-success-soft)" },
        warning: { DEFAULT: "var(--color-warning)", soft: "var(--color-warning-soft)" },
        error: { DEFAULT: "var(--color-error)", soft: "var(--color-error-soft)" },
        danger: { DEFAULT: "var(--color-danger)", soft: "var(--color-danger-soft)" },
        info: { DEFAULT: "var(--color-info)", soft: "var(--color-info-soft)" },
        // Materials / surfaces
        card: "var(--color-card)",
        overlay: "var(--color-overlay)",
        glass: "var(--color-glass)",
        tooltip: { DEFAULT: "var(--color-tooltip)", fg: "var(--color-tooltip-fg)" },
        focus: "var(--color-focus)",
        // Back-compat aliases (map onto the new system)
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
        },
        copper: "var(--color-copper)",
        terracotta: "var(--color-terracotta)",
        blush: "var(--color-blush)",
        sage: "var(--color-sage)",
        forest: "var(--color-forest)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        label: ["var(--font-label)", "serif"],
      },
      fontSize: {
        hero: "clamp(3rem, 7vw, 6rem)",
        h1: "clamp(2rem, 4vw, 3.5rem)",
        h2: "clamp(1.5rem, 3vw, 2.5rem)",
        h3: "clamp(1.2rem, 2vw, 1.75rem)",
        label: "0.65rem",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        pill: "999px",
      },
      boxShadow: {
        // Neutral, premium elevation — no colored shadows
        sm: "0 1px 2px rgba(20,26,22,0.04)",
        card: "0 1px 2px rgba(20,26,22,0.04), 0 6px 20px rgba(20,26,22,0.06)",
        lift: "0 12px 32px rgba(20,26,22,0.10)",
        pop: "0 16px 48px rgba(20,26,22,0.14)",
        ring: "0 0 0 3px var(--color-focus-ring)",
      },
      spacing: {
        section: "clamp(4rem, 8vw, 8rem)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.6" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        shimmer: "shimmer 1.6s infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-up": "fade-up 0.6s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
