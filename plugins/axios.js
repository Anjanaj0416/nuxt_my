import axios from 'axios'
import { useUserStore } from '@/stores/modules/userStore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Set base URL from runtime config
  axios.defaults.baseURL = config.public.apiBaseUrl

  axios.interceptors.request.use(
    (config) => {
      const userStore = useUserStore()
      const token = userStore.token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // Optionally make axios available globally via $axios
  return {
    provide: {
      axios
    }
  }
})
