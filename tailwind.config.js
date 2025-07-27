/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react";
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(35, 90, 90)',
          light: 'rgb(45, 115, 115)',
          dark: 'rgb(25, 65, 65)',
          50: 'rgb(240, 248, 248)',
          100: 'rgb(220, 238, 238)',
          200: 'rgb(180, 218, 218)',
          300: 'rgb(140, 198, 198)',
          400: 'rgb(100, 178, 178)',
          500: 'rgb(35, 90, 90)',
          600: 'rgb(28, 72, 72)',
          700: 'rgb(21, 54, 54)',
          800: 'rgb(14, 36, 36)',
          900: 'rgb(7, 18, 18)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), heroui()],
} 