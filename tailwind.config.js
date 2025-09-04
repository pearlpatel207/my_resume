module.exports = {
    darkMode: 'class', // 👈 this is required
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}', // include if using Next.js app directory
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  