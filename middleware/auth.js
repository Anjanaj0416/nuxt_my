export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Initialize authentication state
  if (!authStore.token) {
    authStore.initializeAuth();
  }

  // If the user is not authenticated and not on the login page, redirect to login
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/user/login');
  }

  // If the user is authenticated and tries to access the login page, redirect to the dashboard
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/index');
  }
});
