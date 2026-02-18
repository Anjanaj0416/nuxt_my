import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';
import Swal from 'sweetalert2';

const api_call = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // lab appt base URL
});

const api_call_miracle = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_MIRACLE, // miracle base URL
});

export const useLabApptStore = defineStore('labApptStore', {
  state: () => ({
    reportemailingpara: {},
    arremailrecepinets: [],
    apptresult: {
      noofapptpending: 0,
      alpagedetails: [],
    },
    alappt: [],
    bill: {
      logo: '',
      address: '',
      hotline: '',
      billno: '',
      name: '',
      sex: '',
      date: '',
      time: '',
      items: [{ description: '', amount: 0.0 }],
      total: 0.0,
      discount: 0.0,
      payment: 0.0,
      credit: 0.0,
      balance: 0.0,
    },
    cur_order_item: {},
    alPendingBills: [],
    testresult: {},
  }),

  actions: {
    showToast(message, type = 'success') {
      Swal.fire({
        icon: type.toLowerCase(),
        title: type,
        text: message,
        timer: 5000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      });
    },

    async getReportparamerterForEmailing(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/getReportparamerterForEmailing', req);
        if (data.result.resultcode === 100) {
          this.reportemailingpara = data.reportemailingpara;
          this.arremailrecepinets = [];
          if (this.reportemailingpara.patientemail !== '') {
            this.arremailrecepinets.push({ value: this.reportemailingpara.patientemail });
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

    async sendReportEmail(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call_miracle.post('/Mailoutbox/setMLabReportEmail', req);
        if (data.result.resultcode === 100) {
          userStore.pushNotification({ type: 'success', message: 'Successfull.Email Sent to the Client/s' });
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
        const { data } = await api_call.post('/LabAppt/getSearch', req);
        if (data.result.resultcode === 100) {
          this.apptresult = data.apptresult;
          this.alappt = data.apptresult.alpagedetails.length > 0 ? data.apptresult.alpagedetails[0].allabappt : [];
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getAdvanceSearch(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/getAdvanceSearch', req);
        if (data.result.resultcode === 100) {
          if (data.apptresult.alpagedetails.length === 0) {
            userStore.pushNotification({ type: 'success', message: 'No Appoinments Found' });
          } else {
            this.apptresult = data.apptresult;
            this.alappt = data.apptresult.alpagedetails[0].allabappt;
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

    async loadApptOrderDetails(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/loadApptOrderDetails', req);
        if (data.result.resultcode === 100) {
          const index = this.alappt.findIndex((a) => a.id === data.orderdetails.apptid);
          if (index !== -1) this.alappt[index].bill = data.orderdetails;
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getCreateAppt(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/getCreateAppt', req);
        if (data.result.resultcode === 100) {
          this.alappt.unshift(data.appt);
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async setLabApptOrderItem(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/setLabApptOrderItem', req);
        if (data.result.resultcode === 100) {
          const index = this.alappt.findIndex((a) => a.id === data.labappt.id);
          if (index !== -1) this.alappt[index].bill = data.labappt.bill;
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async removeLabApptOrderItem(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/removeLabApptOrderItem', req);
        if (data.result.resultcode === 100) {
          const index = this.alappt.findIndex((a) => a.id === data.labappt.id);
          if (index !== -1) this.alappt[index].bill = data.labappt.bill;
        } else {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getSaveLabReport(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Labreport/getSave', req);
        if (data.result.resultcode === 100) {
          const index = this.alappt.findIndex((a) => a.id === data.labappt.id);
          if (index !== -1) this.alappt[index] = data.labappt;
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

    async getCompleteOrder(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/getCompleteOrder', req);
        if (data.result.resultcode === 100) {
          const index = this.alappt.findIndex((a) => a.id === data.appt.id);
          if (index !== -1) this.alappt[index].apptstatus = data.appt.apptstatus;
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

    async setNotifyCustomer(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/setNotifyCustomer', req);
        if (data.result.resultcode === 100) {
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

    async sendWhatappReports(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Report/sendWhatappReports', req);
        if (data.result.resultcode === 100) {
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

    async getTestResultDetails(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/LabAppt/getTestResultDetails', req);
        this.testresult = data.testresult || {};
        if (data.result.resultcode !== 100) {
          userStore.pushNotification({ type: 'Failed', message: data.result.resultdesc });
        }
      } catch (error) {
        userStore.pushNotification({ type: 'Failed', message: error.message || error });
      } finally {
        userStore.setLoading(false);
      }
    },

    async getPrint_Report(req) {
      const userStore = useUserStore();
      userStore.setLoading(true);
      try {
        const { data } = await api_call.post('/Report/getPrint_Report', req);
        if (data.result.resultcode === 100) {
          this.reportpdf = data.pdfname;
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
