/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {},
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      '3xl': ['1.875rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      '5xl': ['5.875rem', {
        lineHeight: '4.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      '9xl': ['10.875rem', {
        lineHeight: '8.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
    }
  },
  plugins: [],
}
