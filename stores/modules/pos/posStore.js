import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useposStore = defineStore("posStore",{
    state: () => ({
        initPosData:{},
        listMainCategries: [],
        listSubCategories: [],
        listItems: [],
        selectedCategory: null,
        selectedSubCategory: null,
    }),
    persist: true,

actions: {

    //loadInitVendor
    async loadInitPosData(showLoading) {      
  
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/InitPOS`
        );   

        if (response.data.isSuccess) {          
           this.initPosData = response.data.data.data;               
            this.listMainCategries =  this.initPosData.listMainCategries;        
            this.listSubCategories =  this.initPosData.listSubCategories;
            this.listItems =  this.initPosData.listItems;
            this.listClients = this.initPosData.listClients
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
      }
    },


    async setSelectedCategory(id, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Category ID:", JSON.stringify(id));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/GetSubCategoriesByMainCategories?id=${id}`
        );

        loadingAlert.close();

        // console.log(response);
        if (response.data.isSuccess) {          
           this.initPosData = response.data.data.data;               
          //  this.listMainCategries =  this.initPosData.listMainCategries;        
            this.listSubCategories =  this.initPosData.listSubCategories;
             this.listItems =  this.initPosData.listPOSItems;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Failed to fetch category items", "error");
      }
    },

    async setSelectedSubCategory(id, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Category ID:", JSON.stringify(id));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/POS/GetItemsBySubCategories?id=${id}`
        );
        loadingAlert.close();
        console.log(response.data.data.data);
        if (response.data.isSuccess) {          
          //  this.initPosData = response.data.data.data;               
            this.listItems =  response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Failed to fetch category items", "error");
      }
    },

    async makePayment(payload, showLoading) {
      console.log('API-GetItemsByCategory');
      console.log("Payload:", JSON.stringify(payload));

      const loadingAlert = showLoading("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/POS/GetCreateReceipt`,
          payload
        );

        loadingAlert.close();

        if (response.data.isSuccess) {     
          this.showToast(response.data.message, "success");
          
        } else {
          this.showToast(response.data.message, "error");
        }

        // Return response for further handling in submitPayment
        return response.data;
      } catch (error) {
        loadingAlert.close();
        console.error("API error:", error);
        this.showToast("Payment Failed", "error");
        throw error; // rethrow so submitPayment can catch it
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