import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useQuotationStore = defineStore("QuotationStore", {
  state: () => ({
    listQuotation: [],   
    listQuotationVerions: [],
    curQuotation: {},
    initQuotation: {},
    testParam:{id:21}
  }),
  
  actions: {
    async loadInitQuotation(showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/InitQuotation`
        );

        if (response.data.isSuccess) {
          this.initQuotation = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
      loadingAlert.close();
    },

      async loadListQuotations(req,showLoading) {
        const loadingAlert = showLoading(''); 
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/QuotationList?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
  
        if ( response.data.isSuccess) {     
          if (response.data.data.count == 0) {           
            this.listQuotation = [];           
          } else {
            this.listQuotation = response.data.data.data;
          }         
          this.showToast(response.data.message, "success");
          
        } else {
          this.showToast(response.data.message, "error");
        }
        
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
      loadingAlert.close();
    },

    async LoadQuotationVersions(id,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/GetLoadQuotationVersions?id=${id}`
        );
  
        if ( response.data.isSuccess) {     
          if (response.data.data.count == 0) {           
            this.listQuotationVerions = [];           
          } else {
            this.listQuotationVerions = response.data.data.data;
          }         

          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
      loadingAlert.close();
    },

    async GetAprrovingTheQuotation(id,imgfile,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('ApprovalMemoFile', imgfile); 
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/b2b/Quotation/GetAprrovingTheQuotation`,formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',  // Make sure to set the correct content type for file uploads
            },
          }
        );  

    if (response?.data?.IsSuccess) {      
      this.showAlert(response.data.Message, "error");
    } else {     
      this.showAlert(response.data.Message, "error");
    }

     } catch (error) {
        this.showAlert(response.data.message, "error");      
   
      }
      loadingAlert.close();
    },

    ResetQuotation() {
      this.curQuotation.id = "00000000-0000-0000-0000-000000000000";
      this.curQuotation.firstName = "xxx";
      this.curQuotation.lastName = "";
      this.curQuotation.customerRef = "";
      this.curQuotation.phone = "";
      this.curQuotation.QuotationImage = "";
      this.curQuotation.email = "";
      this.curQuotation.shopName = "";
      this.curQuotation.shopContactNo = "";
      this.curQuotation.shopAddress1 = "";
      this.curQuotation.shopAddress2 = "";
      this.curQuotation.city = "";
      this.curQuotation.shopLogo = "";
      this.curQuotation.shopCoverImage = "";
      this.curQuotation.brCopy = "";
      this.curQuotation.description = "";
      this.curQuotation.bankName = "";
      this.curQuotation.branch = "";
      this.curQuotation.holderName = "";
      this.curQuotation.accountNumber = "";
      this.curQuotation.isActive = true;
    },
    showToast(message, type) {
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    },

    showAlert(message, type) {
      console.log(type)
      Swal.fire({
        title: 'Hello!',
        text: 'This is a SweetAlert2 alert.',
        icon: 'success',  // Can be 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: 'Cool'
      });
    }
  },
});
