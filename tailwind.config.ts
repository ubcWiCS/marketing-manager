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
        accent: {
          50: "#eef1ff",
          100: "#e0e5ff",
          200: "#c6ceff",
          300: "#a3acff",
          400: "#7d82ff",
          500: "#5e6ad2",
          600: "#4a52b3",
          700: "#3d4391",
          800: "#343a76",
          900: "#2f3462",
          950: "#1c1e39",
        },
        surface: {
          50: "#f8f9fb",
          100: "#f0f1f4",
          200: "#e4e5ec",
          300: "#d0d2de",
          400: "#b4b7c8",
          500: "#9a9dae",
          600: "#7d8093",
          700: "#65677a",
          800: "#4e5060",
          900: "#3a3b47",
          950: "#22232b",
        },
        status: {
          open: "#22c55e",
          in_progress: "#3b82f6",
          review: "#f59e0b",
          completed: "#8b5cf6",
          archived: "#6b7280",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
