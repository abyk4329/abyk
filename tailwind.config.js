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
  // Unified palette — Lights
  'ivory': '#f2f2f1', // New background color
  'ivory-soft': '#f2f2f1', // New soft background color
  'sand-50': '#F1E3D7', // Milky beige
  'sand-100': '#E8D7C6', // Light sand
  'stone-soft': '#E6D7C5', // Soft stone
  'pearl-sand': '#E2D8CB', // Pearly sand

  // Medium tones (nuance/texture)
  'peach-beige': '#E1C6AB',
  'nude-beige': '#DDC5B0',
  'desert-sand': '#DFCBB3',
  'peach-gold': '#CDA991',
  'caramel': '#C29E7E',
  'light-coffee': '#BB8E73',
  'warm-beige': '#BBA18A',
  'sandy-gold': '#BE9D76',

  // Soft darks (headings)
  'copper-brown': '#A8795B',
  'golden-brown': '#A7835A',
  'medium-brown': '#A48569',
  'smoky-brown': '#84705C',

  // Accent text hues
  'cacao': '#5C4430', // Dark cacao
  'espresso': '#3F3226', // Deep espresso
  'dark-choco': '#2B2622', // Almost-black warm

  // Legacy tokens remapped to the new palette
  'gold': '#BE9D76',
  'gold-deep': '#A7835A',
  'charcoal': '#3F3226',
  'text-secondary': '#84705C',
  'champagne': '#E1C6AB',
      },
      fontFamily: {
        'assistant': ['Assistant', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'headings': ['var(--font-headings)', 'Assistant', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4rem)',
        'display': 'clamp(2rem, 4vw, 3rem)',
        'title': 'clamp(1.5rem, 3vw, 2.2rem)',
        'subtitle': 'clamp(1.2rem, 2.5vw, 1.6rem)',
      },
    },
  },
  plugins: [],
}
