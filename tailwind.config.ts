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
        navy: {
          50: "#f0f0f7",
          100: "#e0e0f0",
          200: "#c4c4e0",
          300: "#a3a3c8",
          400: "#7c7ca8",
          500: "#5b5b8a",
          600: "#3d3d6b",
          700: "#2d2d5e",
          800: "#23234a",
          900: "#1a1a3e",
          950: "#12122e",
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
          "Inter",
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