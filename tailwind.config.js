/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Scan your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in 'src' folder and subfolders
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define 'Inter' font
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in 'src' folder and subfolders
    "./public/index.html" // Also scan your public HTML file
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define 'Inter' font
      },
    },
  },
  plugins: [],
}