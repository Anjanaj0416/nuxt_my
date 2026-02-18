import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from './userStore'; // assuming root loading & notifications

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Nuxt3 env variable
});

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    uploaded_file: '',
    backuped_file: '',
  }),

  actions: {
    showToast(message, type) {
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 5000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    },

    async getBackupDB(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Admin/getBackupDB', req);

        if (data.result.resultcode === 100) {
          this.backuped_file = data.url;

          userStore.pushNotification({
            type: 'success',
            message: data.result.resultdesc,
          });
        } else {
          userStore.pushNotification({
            type: 'Failed',
            message: data.result.resultdesc,
          });
        }
      } catch (error) {
        userStore.pushNotification({
          type: 'Failed',
          message: error.message || error,
        });
      } finally {
        userStore.setLoading(false);
      }
    },

    setUploadedFile(filename) {
      this.uploaded_file = filename;
    },

    setBackupedFile(filename) {
      this.backuped_file = filename;
    },
  },
});
