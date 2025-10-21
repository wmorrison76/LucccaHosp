
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tron: {
          cyan: '#16e0ff',
          bg: '#0b1220',
        }
      }
    },
  },
  plugins: [],
}
