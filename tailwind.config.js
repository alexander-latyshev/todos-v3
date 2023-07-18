/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    transparent: "transparent",
    primary: "rgb(249,168,212)",
    secondary: "rgb(222, 213, 213)",
  },
};

const width = {
  700: "700px",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    screens: {
      mobile: "240px",
      laptop: "768px",
      dekstop: "1024px",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      big: "1.3rem",
    },
    extend: {
      colors: colors,
      width: width,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
