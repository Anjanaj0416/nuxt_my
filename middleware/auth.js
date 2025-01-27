// export default defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore();

//   // Initialize authentication state
//   if (!authStore.token) {
//     authStore.initializeAuth();
//   }

//   if (!authStore.isAuthenticated && to.path !== '/login') {
//     return navigateTo('/user/login');
//   }

//   if (authStore.isAuthenticated && to.path === '/login') {
//     return navigateTo('/index');
//   }
// });



export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    authStore.initializeAuth();
  }

  if (!authStore.isAuthenticated && to.path !== '/user/login') {
    return navigateTo('/user/login');
  }

  if (authStore.isAuthenticated && to.path === '/user/login') {
    return navigateTo('/');
  }
});







