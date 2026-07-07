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
        // Neo-brutalism primary palette
        navy: {
          50: "#f0f3ff",
          100: "#e1e8ff",
          200: "#c6d2ff",
          300: "#a4b4ff",
          400: "#7d8dff",
          500: "#5a67ff",
          600: "#4850e6",
          700: "#3a3fc1",
          800: "#323696",
          900: "#133272", // Primary navy
          950: "#12122e",
        },
        // Gold for backgrounds
        gold: {
          50: "#FEF9E3",
          100: "#FEF5D0",
          200: "#FDF4C8", // Primary gold/cream
          300: "#FFE88C",
          400: "#FFD93D",
          500: "#F9C74F",
          600: "#E9B535",
          700: "#C99A2A",
          800: "#A1761F",
          900: "#735114",
        },
        // Purple accent
        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D9FF",
          300: "#D5BCFF",
          400: "#C4B5FD",
          500: "#953A90",
          600: "#7A2E76",
          700: "#5F215C",
          800: "#441442",
          900: "#2F0D28",
        },
        // Supporting colors
        "light-blue": {
          50: "#EFF8FF",
          100: "#DAF0FF",
          200: "#BFE5FF",
          300: "#A1C6F3",
          400: "#74B3F5",
          500: "#4AABF7",
          600: "#2A9BF9",
          700: "#1A8DF3",
          800: "#0F6BBC",
          900: "#0A4F88",
        },
        lavender: {
          50: "#FCF8FF",
          100: "#F5F0FF",
          200: "#EEDFFF",
          300: "#E2D3FF",
          400: "#CFADD7",
          500: "#BC99D6",
          600: "#AA85C5",
          700: "#9671B4",
          800: "#825DA3",
          900: "#6E4992",
        },
        // Keep existing surface colors for softer backgrounds
        surface: {
          50: "#fafaf7",
          100: "#f5f4ef",
          200: "#eae8e0",
          300: "#d8d5c8",
          400: "#bfbba8",
          500: "#a8a38c",
          600: "#8b8670",
          700: "#6f6a58",
          800: "#555140",
          900: "#3d3a2e",
          950: "#221f18",
        },
        plum: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        status: {
          open: "#a7f3d0",
          in_progress: "#bfdbfe",
          review: "#fde68a",
          completed: "#ddd6fe",
          archived: "#d1d5db",
        },
      },
      fontFamily: {
        sans: [
          "Space Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        hand: "0.625rem",
        "hand-lg": "1rem",
        "hand-xl": "1.25rem",
      },
      boxShadow: {
        // Softened neo-brutal shadows with slight blur
        "brutal-sm": "2px 2px 4px 0px rgba(0, 0, 0, 0.25)",
        "brutal-md": "4px 4px 8px 0px rgba(0, 0, 0, 0.25)",
        "brutal-lg": "6px 6px 12px 0px rgba(0, 0, 0, 0.25)",
        "brutal-xl": "8px 8px 16px 0px rgba(0, 0, 0, 0.25)",
        "brutal-yellow": "4px 4px 8px 0px rgba(255, 217, 61, 0.4)",
        "brutal-purple": "4px 4px 8px 0px rgba(149, 58, 144, 0.4)",
        "brutal-blue": "4px 4px 8px 0px rgba(161, 198, 243, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s ease-in-out infinite",
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
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;