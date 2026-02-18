import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';
import Swal from 'sweetalert2';

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_MIRACLE, // miracle API
});

export const useMiracleStore = defineStore('miracleStore', {
  state: () => ({
    uploaded_file: '',
  }),

  actions: {
    // Optional toast helper
    showToast(message, type = 'success') {
      Swal.fire({
        icon: type.toLowerCase(),
        title: type,
        text: message,
        timer: 4000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      });
    },

    async setCompanyLogo(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Company/setCompanyLogo', req);
        if (data.result.resultcode !== 100) {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
        // If success, nothing to update in state
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async SaveAnyFile(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Miracle/SaveAnyFile', req);
        if (data.result.resultcode === 100) {
          this.uploaded_file = data.filename;
          userStore.pushNotification({ type: 'success', message: data.result.resultdesc });
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },
  },
});
