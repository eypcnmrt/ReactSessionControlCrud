/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f5ebe1',
        button: '#ff7800',
        title: '#fb871c',
        subtitle: '#505768',
        list: '#faf5f0',
        list2: '#fafaf5',
        detail: '#faf0e1',
        text: '#505768',
        buttonText: '#fff5ee',
        sidebar: '#fadcbe',
      },
    },
  },
  plugins: [],
};
