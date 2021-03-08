const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill: {
        green: colors.green,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
