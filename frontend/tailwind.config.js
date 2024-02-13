/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
        "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins', 'sans-serif'],
      },
      colors:{
        black:'#000000'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tw-elements-react/dist/plugin.cjs")
  ],
}

