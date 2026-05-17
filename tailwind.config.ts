import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#123B3C",
        tealDeep: "#075D5D",
        teal: "#147678",
        mist: "#EEF4F3",
        line: "#D7E2E0",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(18, 59, 60, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
