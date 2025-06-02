import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { log10 } from "chart.js/helpers";

export const useVendorStore = defineStore("vendorStore", {
  state: () => ({
    listVendor: [],
    curVendor: {},
    initVendor: {},
    listLeads:[],
    InitLeads:{},
    curLead:{},
  }),
  persist: true,

  //this.showToast('Login successful!', 'success'); //success ,error ,warning,info
  actions: {
    //Update vendor
    async GetAssignSalesRef(req, showLoading) {
      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetAssignSalesRef`,
          req
        );

        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message);
        } else {
          console.error("Error saving vendor:", response);
          this.showToast(response.data?.Message || "Save failed", "error");
        }
      } catch (error) {
        console.error(error);
        //  this.showToast(response.data.message, "error");
      }
    },

   //Update vendor
   async GetVendorById(id, showLoading) {   
    
  
    const loadingAlert = showLoading("");

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/qms/Vendor/GetVendorById?id=`+id );

      loadingAlert.close();
      if (response.data.isSuccess) {
        this.curVendor = response.data.data.data;
        //this.showToast(response.data.message);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      //  this.showToast(response.data.message, "error");
    }
  },

    //addEditVendor
    async addEditVendor(formData, showLoading) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Vendor/AddEditVendor`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.isSuccess) {         
          this.showToast(response.data.message);       
       
          this.listVendor = response.data.data.data;
        
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        // console.error(error)
        this.showToast('Error in server call', "error");
       }
    },
    
    //loadInitVendor
    async loadInitVendor(showLoading) {
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
    },

    //loadListVendors
    async loadListVendors(req, showLoading) {
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Vendor/VendorList?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
        loadingAlert.close();

        if (response.data.isSuccess) {
          if (response.data.data.count == 0) {
            this.listVendor = [];
            this.showToast(response.data.message, "error");
          } else {
            this.listVendor = response.data.data.data;
           // console.log( this.listVendor)
          }
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      }
    },

    //loadListLeads
    async loadListLeads(req, showLoading) {
      console.log("loadListLeads:",req);
      
     
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetVendorLeads?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
        console.log("response:",response);
        
        loadingAlert.close();

        if (response.data.isSuccess) {
          if (response.data.data.count == 0) {
            this.listLeads = [];
            this.showToast(response.data.message, "error");
          } else {
            this.listLeads = response.data.data.data;
           // console.log( this.listLeads)
          }
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error",error)
        this.showToast(error.message, "error");
      }
    },

    //loadInitLeads
    async GetInitLeads(showLoading) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetInitLeads`
        );

        if (response.data.isSuccess) {
          this.InitLeads = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast("Failed to load vendor data", "error");
      }
    },

    //Add Vendor Lead
    async SetVendorLead(req, showLoading) {
      console.log(req);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetVendorLead`,req,    
        );
        console.log("response:",response);
        if (response.data.isSuccess) {  
                 
          this.showToast(response.data.message);       
       
          // this.listLeads = response.data.data.data;
          let reqLoadListLeads = { keyword: "", searchBy: req.Status}
          await this.loadListLeads(reqLoadListLeads,showLoading)
          
        } else {
          console.log("response:",response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        this.showToast('Error in server call', "error");
       }
    },

    //Add Vendor Lead
    async SetNewCity(req, showLoading) {
      console.log(req);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetNewCity`,req,    
        );
        console.log("response:",response);
        if (response.data.isSuccess) {  
                 
          this.showToast(response.data.message);     
          
        } else {
          console.log("response:",response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        this.showToast('Error in server call', "error");
       }
    },

    //curLead
    async SetUpdateVendorLead(req, showLoading) {
      console.log(req);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetUpdateVendorLead`,req,    
        );
        console.log("response:",response);
        if (response.data.isSuccess) {  
                 
          this.showToast(response.data.message);       
       
          // this.listLeads = response.data.data.data;
          let reqLoadListLeads = { keyword: "", searchBy: req.Status}
          await this.loadListLeads(reqLoadListLeads,showLoading)
          
        } else {
          console.log("response:",response.data.message);
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        this.showToast('Error in server call', "error");
       }
    },

    // clearCurLead
    async clearCurLead(){
      this.curLead = {};
      // Object.keys(this.curLead).forEach((key) => {
      //   this.err[key] = "";
      // });
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
        timer: 5000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    },
  },
});
