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
    async addEditVendor(formData) {
      console.log("Saving vendor data:", formData);
      const loadingAlert = Swal.fire({
        title: 'Saving...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const fd = new FormData();

          // Append text fields
          fd.append('AccountNumber', formData.AccountNumber);
          fd.append('BRCopy', formData.BRCopy);
          fd.append('BankName', formData.BankName);
          fd.append('Branch', formData.Branch);
          fd.append('Description', formData.Description);
          fd.append('Email', formData.Email);
          fd.append('FirstName', formData.FirstName);
          fd.append('HolderName', formData.HolderName);
          fd.append('LastName', formData.LastName);
          fd.append('Phone', formData.Phone);
          fd.append('ShopAddress1', formData.ShopAddress1);
          fd.append('ShopAddress2', formData.ShopAddress2);
          fd.append('ShopContactNo', formData.ShopContactNo);
          fd.append('ShopName', formData.ShopName);
          fd.append('VATNo', formData.VATNo);

          // Append file fields if they are available
          if (formData.ShopCoverImage) {
            fd.append('ShopCoverImage', formData.ShopCoverImage);
          }
          if (formData.ShopLogo) {
            fd.append('ShopLogo', formData.ShopLogo);
          }
          if (formData.VendorImage) {
            fd.append('VendorImage', formData.VendorImage);
          }
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/qms/Vendor/AddEditVendor`, fd, 
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

        if (response.data.isSuccess) {
          this.showToast(response.data.message);
          this.AddEditVendor = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        
        this.showToast(response.data.message, "error");
        
      }
      loadingAlert.close();
    },

    //loadInitVendor
    async loadInitVendor(showLoading = true) {
      let loadingAlert;
      if (showLoading) {
        loadingAlert = Swal.fire({
          title: 'Loading...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Vendor/InitVendor`
        );

        if (response.data.isSuccess) {
          this.initVendor = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
      }

      if (showLoading && loadingAlert) {
        loadingAlert.close();
      }
    },

    //loadListVendors
    async loadListVendors(req) {
      const loadingAlert = Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Vendor/VendorList?keyword=${req.keyword}&searchBy=${req.searchBy}`
        );
    
        if (response.data.isSuccess) {
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
        this.showToast(error.message, "error"); // use error.message here, not response.data.message
      }
      Swal.close(); // Close loading manually
    },

    // DeleteVendors
    async deleteVendor(vendor) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Vendor/DeleteVendor?id=${vendor.id}`
        );

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.AddEditVendor = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        const message = error.response?.data?.message || error.message;
        this.showToast(message, "error");
      }

      Swal.close();
    },


    //RestoreVendor
    async restoreVendor(vendor) {
      const loadingAlert = Swal.fire({
        title: 'Restoring...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/Vendor/RestoreVendor/${vendor.id}`
        );
    
        if (response.data.isSuccess) {
          this.listVendor = response.data.data?.data || [];
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      }
    
      Swal.close();
    },    
    
    
    ResetVendor() {
      this.curVendor.id = "00000000-0000-0000-0000-000000000000";
      this.curVendor.firstName = "";
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
