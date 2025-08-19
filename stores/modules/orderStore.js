import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";


export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    availablePin: '',
    getWorkFlow: [],
    initOrder: [],
    listoPackagesDetails: [],
    listOrder : [],
    PaymentDetails: [],
    piSigned : []
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
  },

  async GetAddorder(payload, showLoading) {
    console.log('API-GetCreateOrder');
    console.log(JSON.stringify(payload, null, 2));

    const loadingAlert = showLoading('Loading...');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetCreateOrder`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      loadingAlert.close();

      if (response.data.isSuccess) {
        this.showToast(response.data.message, 'success');
        this.listVendor = response.data.data.data;
      } else {
        console.error('Backend error:', response.data.message);
        this.showToast(response.data.message || 'Unknown error', 'error');
      }
    } catch (error) {
      loadingAlert.close();
      console.error('API call failed:', error);
      this.showToast('Error in server call', 'error');
    }
  },

  async loadListOrder(req, showLoading) {
    console.log('API-GetOrderDetails');
    console.log(JSON.stringify(req));
    
    const loadingAlert = showLoading("");
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/qms/Order/GetOrderDetails?keyword=${
          req.keyword
        }&searchBy=${req.searchBy}`
      );
      loadingAlert.close();       
        
      if (response.data.isSuccess) {         
          this.listOrder = response.data.data.data;   
          this.showToast(response.data.message, "success");
      } else {        
          this.listOrder = [];          
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      this.showToast(error.message, "error");
    }
  },

   async deleteOrder(orderId, showLoading) {
       console.log('API-CancelOrder')
      console.log(JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/CancelOrder?orderId=${orderId}`
        );
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    async GetQuotationApprove(formData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetUploadSignedImage`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.isSuccess) {

          this.piSigned = response.data.data.data;


          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("An error occurred during approval", "error");
        console.error(error);
      }
    },

    async GettPaymentDetails(orderId, showLoading) {
       console.log('API-CancelOrder')
      console.log('getPayment,',JSON.stringify(orderId));

      const loadingAlert = showLoading("");
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetPaymentDetails?orderId=${orderId}`
        );
        console.log(response);
        
        loadingAlert.close();
        if (response.data.isSuccess) {
           this.PaymentDetails = response.data.data.data;
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Error while deleting order", "error");
      }
    },

    //GetPayment

    async getDoPay(formData, showLoading) {
      console.log('API-DoPayment');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Order/DoPayment`,
          formData
        );

        loadingAlert.close();

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close();
        this.showToast(error.message || "Error during payment", "error");
      }
    },


    async PrintInvoice(req, showLoading) {
      console.log('API-GetGenerateInvoicePdf')
      console.log(JSON.stringify(req));

      const loading = showLoading?.('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Order/GetGenerateInvoicePdf?orderNo=${req.orderNo}&receiptNo=${req.receiptNo}&amountPaid=${req.amountPaid}&isTax=${req.isTax}`,
          { responseType: 'blob' }
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error(error);
        this.showToast("Failed to load Employee data", "error");
      } finally {
        loading?.close();
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

