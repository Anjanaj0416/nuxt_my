
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  router: {
    middleware: ['auth']
  },

  routeRules: {
    '/*': { ssr: false }, // Disable SSR for non-existent routes
  },

  modules: [
    '@pinia/nuxt',
  
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  css: ['@/assets/css/tailwind.css', '@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  plugins: [
    { src: '@/plugins/message.js' },
    { src: '@/plugins/myfilter.js' },
    { src: '@/plugins/axios.js' },
    { src: '@/plugins/init.js' },
    { src: '@/plugins/piniaPersist.client.js' },
    { src: '@/plugins/pinia-cleanup.js' },
  ],

  runtimeConfig: {
    public: {
    //  apiBaseUrl: process.env.API_URL, 
    //  imageBaseUrl: process.env.NUXT_IMAGE_BASE_URL,
    },
  },

  app: {
    head: {
      title: '',//Digital TechLabs
      viewport: 'width=device-width, initial-scale=1',
      meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon_io/favicon-32x32.png' }],
    },
 
    
  },

  compatibilityDate: '2025-01-20'
})