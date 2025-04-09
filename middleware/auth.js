import { useUserStore  } from '~/stores/modules/userStore';

export default defineNuxtRouteMiddleware((to, from) => {
 // const user = useCookie('user') // Or use localStorage / vuex, depending on how you store the user data

  const userStore = useUserStore(); 

   // Ensure we are on the client side before accessing localStorage
   if (!userStore.token && process.client) {

    localStorage.setItem('requestedRoute', to.fullPath);

    // Check if the user is authenticated by looking for the token
    if (!userStore.token) {
      const redirectToCookie = useCookie('redirectTo', {
        maxAge: 60 * 3, // 7 days
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      })
      redirectToCookie.value = from.fullPath
      // If not authenticated, redirect to the login page
      return navigateTo('/user/login');
    }
  }
});
