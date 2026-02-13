import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';
import Swal from 'sweetalert2';

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // main API
});

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    patient: {
      id: 0,
      createddate: '1900-01-01',
      updateddate: '1900-01-01',
      createdby: '',
      updatedby: '',
      title: '',
      name: '',
      nic: '',
      gender: '',
      age: '',
      email: '',
      smsnumber: '',
      whatsappnumber: '',
      status: 1,
    },
    patientresult: {},
    alpatient: [],
    alorganizeddetails: [],
    alfiltered: [],
    initData: {
      arrTitle: ['Mr'],
      arrGender: [],
    },
    patients_item_search: [{ id: -1, value: '' }],
    iseditmode: false,
  }),

  actions: {
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

    async getInitData(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getInitData', req);
        if (data.result.resultcode === 100) {
          this.initData = data.initData;
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getSearch(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getSearch', req);
        if (data.result.resultcode === 100) {
          if (data.patientresult.totalpages > 0) {
            this.patientresult = data.patientresult;
            this.alpatient = data.patientresult.alpagedetails[0].alpatient;
            this.alfiltered = this.alpatient;
          } else {
            this.showToast('No Result Found', 'success');
          }
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getItemSearch(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getItemSearch', req);
        if (data.result.resultcode === 100) {
          this.patients_item_search = data.al;
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getSave(patient) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getSave', patient);
        if (data.result.resultcode === 100) {
          if (patient.id === 0 && data.updated_patient.id > 0) {
            this.alpatient.unshift(data.updated_patient);
          } else {
            const index = this.alpatient.findIndex(p => p.id === data.updated_patient.id);
            if (index !== -1) this.alpatient[index] = data.updated_patient;
          }
          this.patient = data.updated_patient;
          this.iseditmode = false;
          this.showToast(data.result.resultdesc, 'success');
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getSaveImage(uploading_image_details) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/Upload', uploading_image_details);
        if (data.result.resultcode === 100) {
          this.patient.image = data.uploaded_image_name;
          this.showToast(data.result.resultdesc, 'success');
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getDelete(patient) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getDelete', patient);
        if (data.result.resultcode === 100) {
          this.alpatient = this.alpatient.filter(p => p.id !== data.updated_patient.id);
          this.alfiltered = this.alpatient;
          this.showToast(data.result.resultdesc, 'success');
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getExistingPatientDetails(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Patient/getExistingPateintDetails', req);
        if (data.result.resultcode === 100) {
          this.alpatient.unshift(data.patient);
          this.alfiltered = this.alpatient;
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
