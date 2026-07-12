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
        // Redefined navy as a dark purple/slate palette (contrast-optimized)
        navy: {
          50: "#f7f6fd",
          100: "#f0eefa",
          200: "#e3dffa",
          300: "#cecaf6",
          400: "#b2a1ec", // #b2a1ec Target light purple
          500: "#7662c8", // #7662c8 Accessible purple for contrast
          600: "#614db2",
          700: "#4f3c98",
          800: "#2a2154",
          900: "#1b1437", // Very dark purple/black for text
          950: "#0e0a1f",
        },
        // Redefined gold as a pastel pink palette (using target #fad2e0)
        gold: {
          50: "#fff5f8",  // Very light pink for content backdrops
          100: "#ffeef4", // Softer pink
          200: "#fad2e0", // Target #fad2e0 pink for page backgrounds
          300: "#f8bad1",
          400: "#f597ba",
          500: "#e86c9d",
          600: "#d2477f",
          700: "#b22e63",
          800: "#8f1c48",
          900: "#6c1132",
        },
        // Redefined plum as brand accent palette centered around target #b2a1ec and accessible #7662c8
        plum: {
          50: "#f7f6fd",
          100: "#f0eefa",
          200: "#e3dffa",
          300: "#cecaf6",
          400: "#b2a1ec", // Target light purple
          500: "#7662c8", // Accessible brand purple
          600: "#614db2",
          700: "#4f3c98",
          800: "#41317e",
          900: "#362967",
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
        // Softer neutral/surface colors
        surface: {
          50: "#faf9fa",
          100: "#f4f3f4",
          200: "#eae7ea",
          300: "#dad6db",
          400: "#c1bbc2",
          500: "#a9a2aa",
          600: "#8b858c",
          700: "#706971",
          800: "#565057",
          900: "#3e3a3f",
          950: "#232024",
        },
        status: {
          open: "#a7f3d0",
          in_progress: "#bfdbfe",
          review: "#fde68a",
          completed: "#d7d3e7",
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