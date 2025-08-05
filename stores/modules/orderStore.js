import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    availablePin: '',
    getWorkFlow: [],
    initOrder: [],
    listoPackagesDetails: [],
  }),
  persist: true,

actions: {
  async loadAvailablePin(vendorId, showLoading) {
    console.log(JSON.stringify(vendorId));

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
    console.log(JSON.stringify(vendorId));

    
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

  //loadInitOrder
  async loadInitOrderPlace(showLoading) {     
    console.log('API-InitOrderPlace');
    const loadingAlert = showLoading("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/InitOrderPlace`
      );
      loadingAlert.close();
      if (response.data.isSuccess) {
        this.initOrder = response.data.data.data;
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast(response.data.message, "error");
    }
  },


async setSelectedCategoryId(id, showLoading) {
  console.log('API-GetItemsByCategory');
  console.log("Category ID:", JSON.stringify(id));

  const loadingAlert = showLoading("");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/qms/Order/GetItemsByCategory?id=${id}`
    );

    loadingAlert.close();

    if (response.data.isSuccess) {
      const items = response.data.data.data;
      
      // Log the full nested data
 
      console.log("items:", items);

      this.listoPackagesDetails = items;

      this.showToast(response.data.message);
    } else {
      this.showToast(response.data.message, "error");
    }
  } catch (error) {
    loadingAlert.close();
    console.error("API error:", error);
    this.showToast("Failed to fetch category items", "error");
  }
}
,






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

