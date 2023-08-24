/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["DM Sans", "sans-serif"],
      },
      colors: {
        "light-gray": "#5F6165",
        "custom-white": "#F3F5F8",
        "custom-yellow": "#EF9011",
        "custom-gray": "#7C7C8D",
        "custom-gray2": "#72767C",
        "custom-purple": "#A162F7",
        "custom-black": "#242731",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
