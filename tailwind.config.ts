import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      hiwebGreen: {
        500: "#46B666",
        700: "#3A9E57",
        900: "#328C4C",
      },
      hiwebRed: {
        500: "#FF6666",
      },
      hiwebGray: {
        300: "#A0A0A0",
        500: "#5C5C5C",
      },
    },
  },
  plugins: [],
};
export default config;
