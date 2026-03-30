/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
