/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          light: 'F8F4E1',
          default: 'AF8F6F',
          dark: '74512D'
        },
      },
    },
  },
  plugins: [],
}

