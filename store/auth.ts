import { defineStore } from 'pinia';
import axios from 'axios';
import { useRuntimeConfig } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    token: null as string | null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      const config = useRuntimeConfig();

      try {
        const response = await axios.post('/Auth/login', credentials, {
          baseURL: config.public.apiBaseUrl,
        });

        // Assign response data to state
        this.user = response.data.user;
        this.token = response.data.token;
        this.isAuthenticated = true;

        // Store token in localStorage
        localStorage.setItem('authToken', this.token);
      } catch (error: any) {
        // Axios error handling
        const errorMessage = error?.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },

    initializeAuth() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },
  },
});