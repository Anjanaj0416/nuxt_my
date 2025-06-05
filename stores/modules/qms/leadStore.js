import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLeadStore = defineStore("leadStore",{
    state: () => ({
        initVendor: {},
        listLeads:[],
        InitLeads:{},
        curLead:{},
    }),
    persist: true,

actions: {

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

    //Add Lead
    async SetVendorLead(req, showLoading,showAlert) {
      console.log(req);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetVendorLead`,req,    
        );
        console.log("response:",response);
        if (response.data.isSuccess) {  
                 
          showAlert(response.data.message);       
       
          // this.listLeads = response.data.data.data;
          let reqLoadListLeads = { keyword: "", searchBy: req.Status}
          await this.loadListLeads(reqLoadListLeads,showLoading)
          
        } else {
          console.log("response:",response.data.message);
          showAlert(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        showAlert('Error in server call', "error");
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

    //Add vendor to a lead
    async GetAssignSalesRef(req, showLoading) {
      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetAssignSalesRef`,
          req
        );

        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message,"success");
        } else {
          console.error("Error saving vendor:", response);
          this.showToast(response.data?.Message || "Save failed", "error");
        }
      } catch (error) {
        console.error(error);
        //  this.showToast(response.data.message, "error");
      }
    },

    //Add new city
    async SetNewCity(req, showAlert) {
      console.log(req);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetNewCity`,req,    
        );
        console.log("response:",response);
        if (response.data.isSuccess) {  
              this.GetInitLeads();
          showAlert(response.data.message);     
          
        } else {
          console.log("response:",response.data.message);
          showAlert(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        showAlert('Error in server call', "error");
       }
    },

    // clearCurLead
    async clearCurLead(){
      this.curLead = {};
      // Object.keys(this.curLead).forEach((key) => {
      //   this.err[key] = "";
      // });
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