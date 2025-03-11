import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useVendorStore = defineStore("vendorStore", {
  state: () => ({
    listVendor: [],
    curVendor: {},
    initVendor: {},
   
  }),
  //this.showToast('Login successful!', 'success'); //success ,error ,warning,info
  actions: {
    //addEditVendor
    async addEditVendor(showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/b2b/Vendor/AddEditVendor`
        );

        if (response.data.isSuccess) {
          this.initVendor = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
      loadingAlert.close();
    },

//loadInitVendor
    async loadInitVendor(showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Vendor/InitVendor`
        );

        if (response.data.isSuccess) {
          this.initVendor = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(response.data.message, "error");
      }
      loadingAlert.close();
    },

    //loadListVendors
    async loadListVendors(req,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/b2b/Vendor/VendorList?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
  
        if ( response.data.isSuccess) {     
          if (response.data.data.count == 0) {           
            this.listVendor = [];           
          } else {
            this.listVendor = response.data.data.data;
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

    ResetVendor() {
      this.curVendor.id = "00000000-0000-0000-0000-000000000000";
      this.curVendor.firstName = "xxx";
      this.curVendor.lastName = "";
      this.curVendor.customerRef = "";
      this.curVendor.phone = "";
      this.curVendor.vendorImage = "";
      this.curVendor.email = "";
      this.curVendor.shopName = "";
      this.curVendor.shopContactNo = "";
      this.curVendor.shopAddress1 = "";
      this.curVendor.shopAddress2 = "";
      this.curVendor.city = "";
      this.curVendor.shopLogo = "";
      this.curVendor.shopCoverImage = "";
      this.curVendor.brCopy = "";
      this.curVendor.description = "";
      this.curVendor.bankName = "";
      this.curVendor.branch = "";
      this.curVendor.holderName = "";
      this.curVendor.accountNumber = "";
      this.curVendor.isActive = true;
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
  },
});
