/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0B0B0F',
        'space-blue': '#1A1A2E',
        'hologram-blue': '#00F0FF',
        'hologram-pink': '#FF003C',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
