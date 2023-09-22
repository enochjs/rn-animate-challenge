/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code...
    './src/**/*.{tsx,ts,jsx,js}',
    // If you use a `src` folder, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level folders...
  ],
  theme: {
    colors: {
      standard: {
        1: '#F5F6FA',
        2: '#E6E9F4',
        3: '#D7DBEC',
        4: '#7E84A3',
        5: '#131523',
        7: '#D63200',
      },
      primary: '#0058FF',
      error: '#F0142F',
      info: '#57B8FF',
      warning: '#FF9900',
      success: '#21D59B',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {},
  },
  plugins: [],
};
