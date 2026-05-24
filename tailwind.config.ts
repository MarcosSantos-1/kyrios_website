import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#123B3C",
        tealDeep: "#075D5D",
        teal: "#147678",
        tealBright: "#1FA9AB",
        mist: "#EEF4F3",
        line: "#D7E2E0",
        sand: "#F2EDE3",
        amber: "#E8A33D",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(18, 59, 60, 0.12)",
        glow: "0 0 0 1px rgba(20,118,120,0.15), 0 24px 60px -20px rgba(20,118,120,0.45)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        floatY: "floatY 6s ease-in-out infinite",
        spinSlow: "spinSlow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
