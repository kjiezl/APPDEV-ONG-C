/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'accent-coral': '#FF6B6B',
        'vivid-sky-blue': '#42deff',
        'anti-flash-white': '#ededed',
        'space-cadet': '#1d1e35',
        'slate-gray': '6c757d'
      },
    },
  },
  plugins: [],
}