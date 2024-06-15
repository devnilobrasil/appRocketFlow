/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#212529',
      secondary: '#ffc300',
      derrota: '#d00000',
      vitoria: '#2c6e49',
      white: '#fff',
    },
    fontFamily: {
      'jaro': ['Jaro'],
    }
  },
  plugins: [],
}