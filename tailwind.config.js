/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unified palette — Lights
        ivory: "#FAFAFA", // Main warm background color
        "ivory-soft": "#F9F6F6", // Softer ivory for subtle variations
        // Near-whites (very light)
        "nearwhite-100": "#FEFEFE",
        "nearwhite-150": "#FAFAFA",
        "nearwhite-200": "#FEFAFA",
        "nearwhite-250": "#FDFCFA",
        "nearwhite-300": "#F9F5EF",
        "nearwhite-350": "#F8EFE5",
        "nearwhite-400": "#F4F1EA",
        "sand-50": "#F1E3D7", // Milky beige
        "sand-100": "#E8D7C6", // Light sand
        "stone-soft": "#E6D7C5", // Soft stone
        "pearl-sand": "#E2D8CB", // Pearly sand

        // New base 7-color palette
        "beige-cream": "#f7f3e8",
        "beige-100": "#ede2cc",
        "beige-200": "#dcc9a7",
        "beige-300": "#dcba8a",
        "gold-primary": "#b99668",
        "gold-primary-dark": "#8a724c",
        "accent-choco": "#845c2e",

        // Medium tones (nuance/texture)
        "peach-beige": "#E1C6AB",
        "nude-beige": "#DDC5B0",
        "desert-sand": "#DFCBB3",
        "peach-gold": "#CDA991",
        caramel: "#C29E7E",
        "light-coffee": "#BB8E73",
        "warm-beige": "#BBA18A",
        "sandy-gold": "#BE9D76",
        // Soft darks (headings)
        "copper-brown": "#A8795B",
        "golden-brown": "#A7835A",
        "medium-brown": "#A48569",
        "smoky-brown": "#84705C",

        // Accent text hues
        cacao: "#5C4430",
        espresso: "#3F3226",
        "dark-choco": "#2B2622",

        // Legacy tokens remapped to the new palette
        gold: "#BE9D76",
        "gold-deep": "#A7835A",
        "gold-warm": "#B9916D",
        // Semantic aliases
        charcoal: "#3F3226",
        "text-secondary": "#84705C",
        champagne: "#E1C6AB",
      },
      fontFamily: {
        assistant: ["Assistant", "sans-serif"],
      },
    },
  },
  plugins: [],
};
