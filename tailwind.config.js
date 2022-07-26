module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        showopac: {
          "0%": { opacity: 0.2 },
          "30%": { opacity: 0.4 },
          "50%": { opacity: 0.6 },
          "80%": { opacity: 0.8 },
          "10%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
