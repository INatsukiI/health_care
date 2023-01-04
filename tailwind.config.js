/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "tracking-in-expand-fwd-bottom":
          "tracking-in-expand-fwd-bottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
      },
      keyframes: {
        "tracking-in-expand-fwd-bottom": {
          "0%": {
            "letter-spacing": "-.5em",
            transform: "translateZ(-700px) translateY(500px)",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            transform: "translateZ(0) translateY(0)",
            opacity: "1",
          },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
