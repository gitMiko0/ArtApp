const plugin = require('tailwindcss/plugin');

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
      pattern: /grid-cols-(\d+)/,
    },
  ],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.7)',
        },
        '.text-shadow-md': {
          'text-shadow': '5px 5px 10px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-lg': {
          'text-shadow': '8px 8px 16px rgba(0, 0, 0, 0.9)',
        },
      });
    }),
  ],
};
