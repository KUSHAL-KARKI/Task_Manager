/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.53, 0.21, 0, 1)',
      },
      animation: {
        'scale-in': 'scale-in 0.5s ease-in-out',
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      colors: {
        sidebar: {
          bg: '#f8fafc',
          'bg-dark': '#1e293b',
          border: '#e2e8f0',
          'border-dark': '#374151',
        },
      },
    },
  },
  plugins: [],
}