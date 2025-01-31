import { useUserStore  } from '~/stores/modules/userStore';

export default defineNuxtRouteMiddleware((to, from) => {
 // const user = useCookie('user') // Or use localStorage / vuex, depending on how you store the user data

  const userStore = useUserStore(); 

   // Ensure we are on the client side before accessing localStorage
   if (!userStore.token && process.client) {

    localStorage.setItem('requestedRoute', to.fullPath);

    // Check if the user is authenticated by looking for the token
    if (!userStore.token && !localStorage.getItem('token')) {
      // If not authenticated, redirect to the login page
      return navigateTo('/user/login');
    }

    // If token exists in localStorage but not in store, set it
    if (!userStore.token && localStorage.getItem('token')) {
      userStore.token = localStorage.getItem('token');
    }

    // Optionally, set the logged-in user from localStorage (if needed)
    if (userStore.loggedUser.userName === '' && localStorage.getItem('user')) {
      userStore.loggedUser = JSON.parse(localStorage.getItem('user'));
    }
  }
})