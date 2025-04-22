module.exports = {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        btn: '#072556',
        nav : '#072556',
      }
    },
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