/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#4B0082'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
};