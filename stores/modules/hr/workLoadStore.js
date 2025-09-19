import { defineStore } from "pinia";
import axios from "axios";

export const useWorkLoadStore = defineStore("workLoadStore", {
  state: () => ({
    dashboard: {
      workgroupjobcount: '',
    },
    workgroup: {
      arrJobCardDetails: [],
    },
    isLoading: true,
  }),

  persist: true,

  actions: {
     async getWorkLoadCount() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadCount`
        );
        console.log("getWorkLoadCount response:",response);

        if (response.data.isSuccess) {
          if (response.data.data.data.length > 0) {
            const jobArr = response.data.data.data[0].assignedUser.jobArr;

            const totalJobCount = jobArr.reduce((sum, jobType) => {
              return sum + jobType.jobDetails.length;
            }, 0);

            this.dashboard.workgroupjobcount = totalJobCount;
          }else{
             this.dashboard.workgroupjobcount = 0;
          }
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
    },

    async getWorkLoadDetails(showLoading) {
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get( 
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadDetails`
        );

        console.log("response:",response);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getWorkLoadApprove(req,showLoading) {
      console.log('API-getWorkLoadApprove');
      console.log(JSON.stringify(req));


      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadApprove`,req);

        console.log("response:",response.data.data.data);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          // this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

    async getWorkLoadReject(req,showLoading) {
      console.log('API-getWorkLoadReject');
      console.log(JSON.stringify(req));


      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/hr/WorkLoad/GetWorkLoadReject`,req);

        console.log("response:",response.data.data.data);
        // console.log("response:",response.data.data.data.assignedUser.jobArr);

        if (response.data.isSuccess) {
          // this.workgroup.arrJobCardDetails = response.data.data.data || [];
          this.showToast("Loading successful!", "success");
        } else {
          console.error("Loading error:", response.data.message);
        }
      } catch (error) {
        console.error("Loading error:", error);
        // this.showToast(error.response.data.Message, 'error');
      }
      loadingAlert.close();
    },

  async showToast(message, type) {
    const Swal = (await import("sweetalert2")).default;
    Swal.fire({
      icon: type,
      title: type,
      text: message,
      timer: 5000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  },
  },
});
