import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* ── Paleta Alma Sportt ── */
        rosa:    "#F9C6D0",          // rose suave — fondos, badges
        rosado:  "#D44D72",          // rose vibrante — CTAs principales
        mocha:   "#7A4F35",          // mocha profundo — acento cálido
        "mocha-light": "#C49A7A",    // mocha claro — bordes, hover
        crema:   "#F7F2EC",          // fondo cálido
        sand:    "#EDE8E0",          // sección alternativa
        oscuro:  "#0F0F0F",          // texto principal
        "oscuro-soft": "#2A2A2A",    // texto secundario oscuro
        /* ── shadcn tokens ── */
        border:       "hsl(var(--border))",
        input:        "hsl(var(--input))",
        ring:         "hsl(var(--ring))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":       { transform: "scale(1.15)", opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.6s ease-out both",
        "fade-up-d1": "fade-up 0.6s 0.1s ease-out both",
        "fade-up-d2": "fade-up 0.6s 0.2s ease-out both",
        "fade-up-d3": "fade-up 0.6s 0.3s ease-out both",
        "fade-in":    "fade-in 0.5s ease-out both",
        "scale-in":   "scale-in 0.4s ease-out both",
        "slide-right":"slide-right 0.5s ease-out both",
        shimmer:      "shimmer 2s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        float:        "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
