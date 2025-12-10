export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Work Sans"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#e1f7f6',
          100: '#c6eeeb',
          200: '#8dded6',
          300: '#52c6c1',
          400: '#1f9bb0',
          500: '#0f7da0',
          600: '#0a607c',
          800: '#084054',
        },
        coral: '#ff7a8a',
        sand: {
          50: '#fffbf3',
          100: '#f7eedf',
          200: '#e9d6b3',
          300: '#d4b47b',
          400: '#b38246',
        },
        slate: {
          950: '#0b1224',
        },
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.08)',
        glow: '0 18px 60px rgba(16, 127, 192, 0.20)',
      },
    },
  },
  plugins: [],
};
