/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Thêm dòng này quan trọng nhất
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}