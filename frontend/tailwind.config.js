/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          50: '#f4f8f4',
          100: '#e3eee3',
          200: '#c7ddc7',
          300: '#9fc49f',
          400: '#73a573',
          500: '#4f854f', // Sage green primary
          600: '#3c693c',
          700: '#315431',
          800: '#294329',
          900: '#233723',
          950: '#111e11',
        },
        sandalwood: {
          50: '#fdf8f3',
          100: '#f7ebdb',
          200: '#edd4b3',
          300: '#e1b782',
          400: '#d59453',
          500: '#cb7a32',
          600: '#bd6228',
          700: '#9d4c23',
          800: '#7e3e23',
          900: '#673420',
        },
        vata: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7',
          dark: '#0369a1'
        },
        pitta: {
          light: '#fef3c7',
          DEFAULT: '#d97706',
          dark: '#b45309'
        },
        kapha: {
          light: '#dcfce7',
          DEFAULT: '#15803d',
          dark: '#166534'
        }
      }
    },
  },
  plugins: [],
}
