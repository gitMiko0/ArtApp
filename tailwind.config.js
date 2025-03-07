/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        waterfall: ['Waterfall', 'sans-serif'],
        alexbrush: ['Alex Brush', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
