/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor : "#202020",
        primary: "#db4c3f",
        hoverColor: "hsla(0,0%,100%,0.2)"
      },
      boxShadow: {
        custom: '0 -1px 4px 6px rgb(222 72 58 / 0.1), 0 2px 4px 1px rgb(222 72 58 / 0.1)'
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
