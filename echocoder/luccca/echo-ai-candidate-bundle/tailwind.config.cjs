/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        glacier: "#00faff",
        phoenix: "#ff3c00",
      },
      boxShadow: {
        neon: "0 0 10px rgba(0,255,255,.5)",
        "phoenix-glow": "0 0 12px rgba(255,60,0,.6)",
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(to bottom, #0a0f1f, #0a0a0a)",
        "grid-light": "linear-gradient(to bottom, #f5fafe, #dbeafe)",
      },
    },
  },
  plugins: [],
};
