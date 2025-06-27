// import { useUserStore } from '~/stores/modules/userStore';

// export default defineNuxtRouteMiddleware((to, from) => {
//   const userStore = useUserStore();

//   if (process.client && !userStore.token) {
//     const token = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('token='));

//     if (!token) {
//       // 🚨 Prevent redirect loop if already on login page
//       if (to.path !== '/user/login') {
//         return navigateTo('/user/login');
//       }
//     }
//   }
// });



import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '~/stores/modules/userStore'



export default defineNuxtRouteMiddleware(async (to, from) => {


  const userStore = useUserStore()

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
    } else {
      // No token found at all
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
  }
})

























// import { useUserStore  } from '~/stores/modules/userStore';

// export default defineNuxtRouteMiddleware((to, from) => {
//  // const user = useCookie('user') // Or use localStorage / vuex, depending on how you store the user data

//   const userStore = useUserStore(); 

//    // Ensure we are on the client side before accessing localStorage
//    if (!userStore.token && process.client) {

//     localStorage.setItem('requestedRoute', to.fullPath);

//     // Check if the user is authenticated by looking for the token
//     if (!userStore.token) {
//       const redirectToCookie = useCookie('redirectTo', {
//         maxAge: 60 * 3, // 7 days
//         path: '/',
//         sameSite: 'strict',
//         secure: process.env.NODE_ENV === 'production'
//       })
//       redirectToCookie.value = from.fullPath
//       // If not authenticated, redirect to the login page
//       return navigateTo('/user/login');
//     }
//   }
// });
