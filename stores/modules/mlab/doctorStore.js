import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from './userStore'; // for loading & notifications

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_MIRACLE, // Nuxt3 env variable
});

export const useDoctorStore = defineStore('doctorStore', {
  state: () => ({
    doctor: {
      id: 0,
      createddate: '1900-01-01',
      updateddate: '1900-01-01',
      createdby: '',
      updatedby: '',
      firstname: '',
      lastname: '',
      fullname: '',
      speciality: '',
      mobile: '',
      email: '',
      sex: '',
      title: '',
      signature: '',
      status: 1,
    },
    doctorresult: {},
    aldoctor: [],
    initData: {},
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

    async getInitData(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Doctor/getInitData', req);

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
        const { data } = await api_call.post('/Doctor/getSearch', req);

        if (data.result.resultcode === 100) {
          if (data.doctorresult.totalpages === 0) {
            userStore.pushNotification({
              type: 'success',
              message: 'No Result Found',
            });
          }
          this.doctorresult = data.doctorresult;
          this.aldoctor =
            data.doctorresult.totalpages > 0
              ? data.doctorresult.alpagedetails[0].aldoctor
              : [];
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

    async getSearchForCRUD(req) {
      // basically same as getSearch
      await this.getSearch(req);
    },

    async getSave(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Doctor/getSave', req);

        if (data.result.resultcode === 100) {
          if (req.doctor.id === 0 && data.updated_doctor.id > 0) {
            this.aldoctor.unshift(data.updated_doctor); // insert
          } else {
            const index = this.aldoctor.findIndex(
              (d) => d.id === data.updated_doctor.id
            );
            if (index !== -1) this.aldoctor[index] = data.updated_doctor; // update
          }

          this.iseditmode = false;

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

    async getDelete(doctor) {
      const userStore = useUserStore();
      userStore.setLoading(true);

      try {
        const { data } = await api_call.post('/Doctor/getDelete', doctor);

        if (data.result.resultcode === 100) {
          this.aldoctor.splice(
            this.aldoctor.findIndex((d) => d.id === data.updated_doctor.id),
            1
          );

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

    setDoctor(doctor) {
      this.doctor = doctor;
    },

    clearDoctor() {
      this.doctor = {
        id: 0,
        doctor: { id: -1, value: '' },
        token: '',
        doctortype: '',
        doctordate: '',
        status: 1,
        createddate: '1900-01-01',
        updateddate: '1900-01-01',
      };
    },

    setPage(pageNumber) {
      if (this.doctorresult.alpagedetails?.[pageNumber - 1])
        this.aldoctor = this.doctorresult.alpagedetails[pageNumber - 1].aldoctor;
    },

    setEditMode(value) {
      this.iseditmode = value;
    },
  },
});
