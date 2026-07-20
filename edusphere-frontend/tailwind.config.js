/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#c084fc', // purple-400
          DEFAULT: '#a855f7', // purple-500
          dark: '#7e22ce', // purple-700
        },
        bg: {
          base: '#f5f6fa', // Soft lavender/gray background from mockup
          surface: '#ffffff',
          'surface-2': '#f8fafc',
          'surface-3': '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
