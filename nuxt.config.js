// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'


export default defineNuxtConfig({
devServer: {
    https: {

       key: resolve('./certs/localhost+2-key.pem'),
        cert: resolve('./certs/localhost+2.pem'),
    },
    host: 'localhost',
    port: 3000
  
  },
  router: {
    middleware: ['auth']
  },

  routeRules: {
    '/*': { ssr: false }, // Disable SSR for non-existent routes
  },
  
  image: {
    domains: ['lh3.googleusercontent.com', 'drive.google.com']
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n','@nuxt/image'],
  
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
    // public: { apiBaseUrl: process.env.VITE_API_URL }
    },
  },

  app: {
    head: {
      title: "Digital TechLabs",
      link: [
        // { rel: "icon", type: "image/png", sizes: "16x16", href: "/dtl/favicon_io/favicon-16x16.png" },
        // { rel: "icon", type: "image/png", sizes: "32x32", href: "/dtl/favicon_io/favicon-32x32.png" },
        // { rel: "apple-touch-icon", sizes: "180x180", href: "/dtl/favicon_io/apple-touch-icon.png" },
        // { rel: "manifest", href: "/dtl/favicon_io/site.webmanifest" }
      ],
      meta: [
        // Charset
        { charset: "utf-8" },

        // Viewport (for responsive design)
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // SEO basics
        { name: "description", content: "Digital TechLabs - Innovative digital solutions for businesses and organizations." },
        { name: "keywords",   content: "Digital TechLabs, DTL, software solutions Sri Lanka, IT services Sri Lanka, web development Sri Lanka, custom software Sri Lanka, ERP solutions Sri Lanka, technology company Sri Lanka, digital transformation Sri Lanka"  },
        { name: "author", content: "Digital TechLabs Team" },

        // Mobile app settings
        { name: "theme-color", content: "#ffffff" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },

        // Open Graph (Facebook, LinkedIn, etc.)
        { property: "og:title", content: "Digital TechLabs" },
        { property: "og:description", content: "Discover innovative digital solutions with Digital TechLabs." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://dtl.lk/" },
        { property: "og:image", content: "https://dtl.lk//favicon_io/android-chrome-512x512.png" },
        { property: "og:site_name", content: "Digital TechLabs" },

        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Digital TechLabs" },
        { name: "twitter:description", content: "Innovative digital solutions tailored for your business growth." },
        { name: "twitter:image", content: "https://dtl.lk//favicon_io/android-chrome-512x512.png" },
        { name: "twitter:creator", content: "@yourtwitterhandle" }
      ],
    }
  },

  compatibilityDate: "2025-11-02",
   sourcemap: false
})