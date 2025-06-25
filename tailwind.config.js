module.exports = {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        btn: '#072556',
        nav : '#072556',
        textColor: '#9900c7',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#C73659', // Main primary color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          920: '#750000',
          950: '#172554'
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#075B5E',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          970: '#705158', // example
          1000:'#FF0000'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }  
    }
  },
  safelist: [
    'bg-purple-700',
    'bg-blue-900',
    'bg-green-500',
    'bg-red-500',
    'border-purple-700',
    'bg-orange-50',
    'bg-gray-900',
    // Add other colors you plan to use dynamically
  ],
  plugins: [],
}

