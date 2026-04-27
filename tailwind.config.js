/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          black:  '#050509',
          card:   '#0D0D14',
          cyan:   '#00F5FF',
          blue:   '#0055FF',
          green:  '#00FF88',
          muted:  '#6B6B8A',
          text:   '#EEEEF5',
          border: 'rgba(0,245,255,0.10)',
        },
      },
    },
  },
  plugins: [],
};
