
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // router: {
  //   middleware: ['auth']
  // },

  modules: ['@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  plugins: [
    { src: '@/plugins/message.js' },
    { src: '~/plugins/myfilter.js' },
    { src: '@/plugins/axios.js' },
  ],

  runtimeConfig: {
    public: {
    //  apiBaseUrl: process.env.API_URL, 
    //  imageBaseUrl: process.env.NUXT_IMAGE_BASE_URL,
    },
  },

  app: {
    head: {
      title: 'Intranet - Digital TechLabs',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
 
    
  },

  compatibilityDate: '2025-01-20'
})