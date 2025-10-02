import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useDashboardStore  = defineStore('dashboard', {
  state: () => ({
    dashBoardInitDetails: {},
    salesDashboardList: {},

  }),

  actions: {

    async GetInitDashBoard(showLoading) {
      // console.log('API-GetQMSDashboardDetails')
      const loadingAlert = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/Welfare/GetWFDashBoardInitDetails`
        );
        if (response.data.isSuccess) {
           this.dashBoardInitDetails = response.data.data.data;
        //   this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        // this.showToast("Error while deleting order", "error");
      }
    },

    async welfaredashBoard(selectedYear , showLoading) {
      // console.log('API-GetQMSDashboardDetails')
      console.log(selectedYear);
      
      const loadingAlert = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/Welfare/GetWFDashBoardDetails?year=${selectedYear}`
        );
        // console.log(response);
        // loadingAlert.close();
        if (response.data.isSuccess) {
            this.salesDashboardList = response.data.data.data;
            console.log(this.salesDashboardList);

           
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        // this.showToast("Error while deleting order", "error");
      }
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
  }
});
