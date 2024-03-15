/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        midnightBlue: '#161A30',
        steelBlue: '#31304D',
        silverSmoke: '#B6BBC4',
        pearlWhite: '#F0ECE5',
        lemonChiffon: '#F8E559',
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
