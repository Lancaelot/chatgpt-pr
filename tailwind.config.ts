import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          DEFAULT: '#343541',
          light: '#40414F',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
