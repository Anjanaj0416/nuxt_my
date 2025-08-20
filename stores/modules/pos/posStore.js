import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useposStore = defineStore("posStore",{
    state: () => ({
        initPosData: {},
    }),
    persist: true,

actions: {

    //loadInitVendor
    async loadInitPosData(showLoading) {
       console.log('API-InitPOS');
  
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/InitPOS`
        );

        console.log(response);
        

        if (response.data.isSuccess) {
          this.initPosData = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
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
    },
  },
});