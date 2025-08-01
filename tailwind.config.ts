import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#15411F",
      },
      backgroundColor: {
        primary: "#15411F",
      },
    },
  },
  plugins: [],
};

export default config;
