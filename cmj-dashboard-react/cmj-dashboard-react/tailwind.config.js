/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baylor-green': {
          DEFAULT: '#003015',
          'dark': '#002010',
          'light': '#004020',
          50: '#e6f0eb',
          100: '#cce1d7',
          200: '#99c3af',
          300: '#66a587',
          400: '#33875f',
          500: '#003015',
          600: '#002713',
          700: '#001e0f',
          800: '#00140b',
          900: '#000a05',
        },
        'baylor-gold': {
          DEFAULT: '#FECB00',
          'dark': '#E5B700',
          'light': '#FFD633',
          50: '#fffaeb',
          100: '#fff5d6',
          200: '#ffebad',
          300: '#fee185',
          400: '#fed75c',
          500: '#FECB00',
          600: '#e5b700',
          700: '#cca300',
          800: '#b38f00',
          900: '#997b00',
        },
      },
      fontFamily: {
        'agency': ['Agency FB', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
