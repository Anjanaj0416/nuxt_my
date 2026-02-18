import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from './userStore'; // if needed for token, etc.

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Nuxt3 env variable
});

export const useApptStore = defineStore('apptStore', {
  state: () => ({
    appt: {
      id: 0,
      createddate: '1900-01-01',
      updateddate: '1900-01-01',
      createdby: '',
      updatedby: '',
      patient: { id: -1, value: '' },
      token: '',
      appttype: '',
      apptdate: '',
      status: 1,
      image: '',
    },
    apptresult: {},
    alappt: [],
    initData: {},
    alpatients_item_search: [],
    iseditmode: false,
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

    async getInitData() {
      const userStore = useUserStore();
      userStore.setLoading(true); // assumes userStore has setLoading action

      try {
        const { data } = await api_call.post('/appt/getInitData');
        if (data.result.resultcode === 100) {
          this.initData = data.initData;
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

    async getSearch(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Appt/getSearch', req);
        if (data.result.resultcode === 100) {
          this.apptresult = data.apptresult;
          if (data.apptresult.totalpages > 0) {
            this.alappt = data.apptresult.alpagedetails[0].alappt;
          }
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

    async getSave(appt) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Appt/getSave', appt);
        if (data.result.resultcode === 100) {
          if (appt.id === 0 && data.updated_appt.id > 0) {
            // Insert
            this.alappt.unshift(data.updated_appt);
          } else {
            // Update
            const index = this.alappt.findIndex(a => a.id === data.updated_appt.id);
            if (index !== -1) this.alappt[index] = data.updated_appt;
          }

          userStore.pushNotification({
            type: 'success',
            message: data.result.resultdesc,
          });
          this.iseditmode = false;
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

    async getSaveImage(uploading_image_details) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Appt/Upload', uploading_image_details);
        if (data.result.resultcode === 100) {
          this.appt.image = data.uploaded_image_name;
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

    async getDelete(appt) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Appt/getDelete', appt);
        if (data.result.resultcode === 100) {
          this.alappt = this.alappt.filter(a => a.id !== data.updated_appt.id);
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

    setPage(pageNumber) {
      if (this.apptresult.alpagedetails?.[pageNumber - 1]) {
        this.alappt = this.apptresult.alpagedetails[pageNumber - 1].alappt;
      }
    },

    clearAppt() {
      this.appt = {
        id: 0,
        createddate: '1900-01-01',
        updateddate: '1900-01-01',
        createdby: '',
        updatedby: '',
        patient: { id: -1, value: '' },
        token: '',
        appttype: '',
        apptdate: '',
        status: 1,
        image: '',
      };
    },
  },
});
