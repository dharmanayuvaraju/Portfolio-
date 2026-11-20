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
        canvas: {
          DEFAULT: '#0a0b10', // Deep ink
          deep: '#06070a',
          card: '#121520',    // Flat card background (no glassmorphism)
          cardHover: '#181c2b',
          surface: '#1d2233',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: 'rgba(255, 255, 255, 0.04)',
        },
        ink: {
          950: '#06070a',
          900: '#0a0b10',
          800: '#121520',
          700: '#1d2233',
        },
        sand: {
          50: '#faf9f6',
          100: '#f5f3ef', // Warm off-white
          200: '#e8e5de',
          300: '#d5d0c5',
          400: '#9e998e',
        },
        accent: {
          DEFAULT: '#ff6b35', // Single vibrant warm orange accent
          hover: '#ff8452',
          muted: '#c2410c',
          glow: 'rgba(255, 107, 53, 0.25)',
          subtle: 'rgba(255, 107, 53, 0.1)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
