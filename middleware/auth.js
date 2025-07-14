
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '~/stores/modules/userStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  
  try {
    const userStore = useUserStore();

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

        if (to.path !== '/user/login') {
          console.log("to.path:",to.path);
          
          const redirectToCookie = useCookie('redirectTo', {
            maxAge: 60 * 3,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
          })
          redirectToCookie.value = to.fullPath
          console.log("redirectToCookie:",redirectToCookie.value);

          await new Promise(resolve => setTimeout(resolve, 1000));
          

          return navigateTo('/user/login')
        }

        // return navigateTo('/user/login')
      }

      if (token) {
        try {
          const decoded = jwtDecode(token)
          const now = Date.now() / 1000

          if (decoded.exp < now) {
            // Token expired
            userStore.token = null
            if (to.path !== '/user/login') {
              const redirectToCookie = useCookie('redirectTo', {
                maxAge: 60 * 3,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
              })
              redirectToCookie.value = to.fullPath

              return navigateTo('/user/login')
            }
          }
        } catch (err) {
          console.error('Invalid token:', err)
          userStore.token = null
          return navigateTo('/user/login')
        }
      }
    }

  } catch (error) {
    // Handle any uncaught errors (e.g., 500 errors during SSR)
    console.error('Middleware error:', error)
    return navigateTo('/')
  }
});