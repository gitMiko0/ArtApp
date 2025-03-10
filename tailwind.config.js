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
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  safelist: [
    {
      pattern: /grid-cols-(\d+)/, //safelisting to dynamically generate grid columns for PaintingsList
    },
  ],
  plugins: [],
}
