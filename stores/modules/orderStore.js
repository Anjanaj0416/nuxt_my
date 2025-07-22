import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    availablePin: '',
    getWorkFlow: [],
  }),
  persist: true,

actions: {
  async loadAvailablePin(vendorId, showLoading) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetNextAvaialblePINumber`,
        { params: { vendorId } }
      );

      if (response.data.isSuccess) {
        this.availablePin = response.data.data;
        console.log("PI Response:", response.data.data);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load Available PI Number", "error");
    }
  },

  async GetIssuePINumber(request, showLoading) {
    console.log('API-GetIssuePINumber');
    console.log(JSON.stringify(request));
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetIssuePINumber`,
        {
            params: {
            vendorId: request.vendorId,
            PINo: request.PINo,
            },
        }
      );

      if (response.data.isSuccess) {
        this.showToast(response.data.message, "success");
         this.availablePin='';
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load Available PI Number", "error");
    }
  },

  async loadWorkFLow(vendorId, showLoading) {
    console.log(vendorId);
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/WorkFLow/GetWFs`,
        { params: { vendorId } }
      );

      if (response.data.isSuccess) {
        this.getWorkFlow = response.data.data;
        console.log("Work Flow:", response.data.data);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast("Failed to load WorkFLow", "error");
    }
  },

  showToast(message, type) {
    Swal.fire({
      icon: type,
      title: type,
      text: message,
      timer: 5000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
}

});

