import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Neon Accent Palette */
        "neon-blue": "#00d4ff",
        "neon-cyan": "#22d3ee",
        "neon-gold": "#f59e0b",
        "neon-green": "#22c55e",

        /* Dark Surface Scale */
        "dark-base": "#030712",
        "dark-raised": "#0a0f1e",
        "dark-overlay": "#111827",
        "dark-card": "#0f172a",
        "dark-border": "rgba(255,255,255,0.06)",

        /* Legacy compat */
        "metro-blue": "#00d4ff",
        "metro-blue-light": "#22d3ee",
        "metro-blue-dark": "#0891b2",
        "metro-gold": "#f59e0b",
        "metro-gold-light": "#fbbf24",
        "metro-gold-dark": "#d97706",
        "metro-green": "#22c55e",
        "metro-red": "#ef4444",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'blink': 'blink 1.2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-breathe': 'glow-breathe 4s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.15' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.25)' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
