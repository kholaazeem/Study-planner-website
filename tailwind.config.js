/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0a0f1e',
        'navy-blue': '#161b30',
        'electric-blue': '#00d2ff',
        'lavender': '#9d4edd',
        'teal': '#00e676',
        'purple': '#7e57c2',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 210, 255, 0.3)',
        'glow-active': '0 0 25px rgba(0, 210, 255, 0.6)',
      }
    },
  },
  plugins: [],
}