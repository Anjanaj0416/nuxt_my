import axios from 'axios'
import { useUserStore } from '@/stores/modules/userStore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Set base URL
  axios.defaults.baseURL = config.public.apiBaseUrl

  axios.interceptors.request.use(
    (config) => {
      const userStore = useUserStore()

      // First try token from Pinia
      let token = userStore.token

      // If token not found, fallback to cookie
      if (!token && process.client) {
        const tokenFromCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1]

        if (tokenFromCookie) {
          token = tokenFromCookie
          // userStore.token = token // Sync back to Pinia if needed
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  return {
    provide: {
      axios
    }
  }
})


































// import axios from 'axios'
// import { useUserStore } from '@/stores/modules/userStore'

// export default defineNuxtPlugin((nuxtApp) => {
//   const config = useRuntimeConfig()

//   // Set base URL from runtime config
//   axios.defaults.baseURL = config.public.apiBaseUrl

//   axios.interceptors.request.use(
//     (config) => {
//       const userStore = useUserStore()
//       const token = userStore.token

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }

//       return config
//     },
//     (error) => Promise.reject(error)
//   )

//   // Optionally make axios available globally via $axios
//   return {
//     provide: {
//       axios
//     }
//   }
// })
