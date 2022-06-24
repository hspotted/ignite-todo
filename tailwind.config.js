/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          100: '#f2f2f2',
          200: '#d9d9d9',
          300: '#808080',
          400: '#333333',
          500: '#262626',
          600: '#1a1a1a',
          700: '#0d0d0d'
        },
        red: {
          danger: '#e25858'
        },
        blue: {
          primary: '#4ea8de',
          secondary: '#1e6f9f'
        },
        purple: {
          primary: '#8284fa',
          secondary: '#5e60ce'
        }
      }
    },
  },
  plugins: [],
}
