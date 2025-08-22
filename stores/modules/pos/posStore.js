import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useposStore = defineStore("posStore",{
    state: () => ({
        listMainCategories: [],
        listSubCategories: [],
        listItems: [],
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
          console.log(response.data.data.data);
         // this.initPosData = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
      }
    },


    async setSelectedMainCategoryId(masterId, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Category ID:", JSON.stringify(masterId));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/GetSubCategoriesByMainCategories?id=${masterId}`
        );

        loadingAlert.close();

        if (response.data.isSuccess) {
          const items = response.data.data.data;
          
          // Log the full nested data
    
          console.log("items:", items);

          this.listSubCategories = items;

          this.showToast(response.data.message);
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Failed to fetch category items", "error");
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