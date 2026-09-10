/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pyblue: {
          50: '#eef6fc',
          100: '#d5e9f8',
          200: '#afd5f2',
          300: '#7cb9ea',
          400: '#4b8bbe',
          500: '#306998', // official python blue
          600: '#23537e',
          700: '#1e4366',
          800: '#1c3954',
          900: '#1c3147',
          950: '#0e1c2b',
        },
        pygold: {
          50: '#fffdeb',
          100: '#fffac8',
          200: '#fff38b',
          300: '#ffe873', // python gold light
          400: '#ffd43b', // python gold core
          500: '#f5b50a',
          600: '#d99004',
          700: '#ad6707',
          800: '#8c4f0d',
          900: '#74400f',
        },
        arena: {
          crimson: '#EF4444',
          fire: '#F97316',
          dark: '#0a0d14',
          panel: '#121824',
          border: '#222f44',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 212, 59, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 212, 59, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
