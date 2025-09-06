/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#D4B896',
        'gold-deep': '#C6A170',
        'ivory': '#FEFEFE',
        'charcoal': '#1F2024',
        'text-secondary': '#6B6F76',
      },
      fontFamily: {
        'assistant': ['Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
