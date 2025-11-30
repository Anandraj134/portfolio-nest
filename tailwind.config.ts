import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        secondary: "#64FFDA",
        accent: "#C77DFF",
        background: {
          dark: "#0A0A0A",
          light: "#1A1A1A",
        },
        text: {
          gray: "#8892B0",
          light: "#E6F1FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
