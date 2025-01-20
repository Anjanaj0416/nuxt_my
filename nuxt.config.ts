// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  modules: ['@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  plugins: [
    '@/plugins/sweetalert2.ts',
    '@/plugins/axios.ts'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000', // Fallback for local dev
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

  compatibilityDate: '2025-01-04'
})