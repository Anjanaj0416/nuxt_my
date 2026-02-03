import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '~/stores/modules/userStore'
import { useLoading } from "~/composables/useLoading";

export default defineNuxtRouteMiddleware(async (to, from) => {
  
  try {
    const userStore = useUserStore();
    const loading = useLoading()
    loading.value = true
   // console.log("Loading state:", loading.value)


    if (process.client) {
      let token = userStore.token

      if (!token) {
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))

        if (cookieToken) {
          token = cookieToken.split('=')[1]
          userStore.token = token
        }

        if (to.path !== '/qbook') {
          // console.log("to.path:",to.path);
          
          const redirectToCookie = useCookie('redirectTo', {
            maxAge: 60 * 3,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
          })
          redirectToCookie.value = to.fullPath
          console.log("redirectToCookie:",redirectToCookie.value);

          //spinner
          await new Promise(resolve => setTimeout(resolve, 1000));
          loading.value = false

          return navigateTo('/qbook')
        }else {
            loading.value = false
            return 
        }

        // return navigateTo('/user/login')
      }

      if (token) {
        try {
          loading.value = false
              
          const decoded = jwtDecode(token)
          const now = Date.now() / 1000

          if (decoded.exp < now) {
            // Token expired
            userStore.token = null
            if (to.path !== '/qbook') {
              const redirectToCookie = useCookie('redirectTo', {
                maxAge: 60 * 3,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
              })
              redirectToCookie.value = to.fullPath
              // return navigateTo('/user/login')
              return navigateTo('/errors/qbook401page');
            }
          }
        } catch (err) {
          console.error('Invalid token:', err)
          userStore.token = null
          loading.value = false
          return navigateTo('/qbook')
        }
      }
    }

  } catch (error) {
    // Handle any uncaught errors (e.g., 500 errors during SSR)
    console.error('Middleware error:', error)
    loading.value = false
    // return navigateTo('/')
    return navigateTo('/errors/qbook500page');
  }
});