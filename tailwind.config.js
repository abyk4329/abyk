/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        "brown-dark": "var(--brown-dark)",
        "brown-heading": "var(--brown-heading)",
        "brown-bronze": "var(--brown-bronze)",
        beige: "var(--beige)",
      },
      borderRadius: {
        xl: "var(--radius)",
      },
      boxShadow: {
        glass: "0 20px 45px rgba(15, 23, 42, 0.25)",
      },
      backdropBlur: {
        glass: "18px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(2%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
