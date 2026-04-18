import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Military green palette
        'mil-green': {
          50:  '#f0f4f0',
          100: '#d6e4d6',
          200: '#adc9ad',
          300: '#7eaa7e',
          400: '#538c53',
          500: '#2d6b2d',
          600: '#1e5220',
          700: '#163d18',
          800: '#0f2a10',
          900: '#081808',
          950: '#040c04',
        },
        // Gold accent palette
        gold: {
          300: '#e8cf7e',
          400: '#d4b84a',
          500: '#c9a84c',
          600: '#b8962e',
          700: '#9a7c22',
        },
        // Near-black backgrounds
        'mil-black': {
          DEFAULT: '#080c08',
          800: '#0f160f',
          700: '#151f15',
          600: '#1a271a',
        },
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-opensans)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
