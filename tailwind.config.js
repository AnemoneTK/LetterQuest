/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "#F6F4F5",
      primary: "#14121F",
      white: "#FFFF",
      green: "#4CAF50",
      yellow: "#FFC107",
      orange: "#FF8400",
      gray: "#1F1F1F",
      "light-gray": "#898989",
      easy: "#A5D6A7",
      normal: "#FFF59D",
      hard: "#FF8A80",
    },
  },
  plugins: [],
};
