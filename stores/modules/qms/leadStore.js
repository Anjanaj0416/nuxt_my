import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLeadStore = defineStore("leadStore",{
    state: () => ({
        initVendor: {},
        listLeads:[],
        InitLeads:{},
        curLead:{},
        leadsCount:[],
    }),
    persist: true,

actions: {

    //loadInitVendor
    async loadInitVendor(showLoading) {
       console.log('API-InitVendor');
  
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
       console.log('API-GetInitLeads');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetInitLeads`
        );
        // console.log("COM",response);

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
      console.log('API-GetVendorLeads');
      console.log(JSON.stringify(req));
    
      
      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetClientLeads?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
     
        
        loadingAlert.close();

        if (response.data.isSuccess) {
          if (response.data.data.count == 0) {
            this.listLeads = [];
            this.showToast(response.data.message, "error");
          } else {
            this.listLeads = response.data.data.data;
            this.leadsCount = response.data.data.count;

          
          }
          this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
      
        this.showToast(error.message, "error");
      }
    },

    //Add Lead
    async SetVendorLead(request, showLoading,showAlert) {
      console.log('API-SetVendorLead');
      // console.log(JSON.stringify(request));
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetClientLead`,request,    
        );
        // console.log('vendor:',response);
        
        if (response.data.isSuccess) {                   
          // showAlert(response.data.message);
          this.showToast(response.data.message, "success");

          this.listLeads = response.data.data.data;
          await this.GetInitLeads(showLoading);
          
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
     
        showAlert('Error in server call', "error");
       }
    },

    //curLead
    async SetUpdateVendorLead(req, showLoading) {
        console.log('API-SetUpdateVendorLead');
      console.log(JSON.stringify(req));
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetUpdateClientLead`,req,    
        );
      
        if (response.data.isSuccess) {  
                 
          this.showToast(response.data.message);       
       
          // this.listLeads = response.data.data.data;
          let reqLoadListLeads = { keyword: "", searchBy: req.Status}
          await this.loadListLeads(reqLoadListLeads,showLoading)
          
        } else {
       
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
      
        this.showToast('Error in server call', "error");
       }
    },

    //Add vendor to a lead
    async GetAssignSalesRef(req, showLoading) {
       console.log('API-GetAssignSalesRef');
      console.log(JSON.stringify(req));
      
      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/GetAssignSalesRef`,
          req
        );

        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message,"success");                  
          this.listLeads = response.data.data.data;

        } else {
         
          this.showToast(response.data?.Message || "Save failed", "error");
        }
      } catch (error) {
       
        //  this.showToast(response.data.message, "error");
      }
    },

    //Add new city
    async SetNewCity(req, showAlert) {
      console.log('API-SetNewCity');
      console.log(JSON.stringify(req));
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Leads/SetNewCity`,req,    
        );
        
        if (response.data.isSuccess) {  
              this.GetInitLeads();
          showAlert(response.data.message);     
          
        } else {
         
          showAlert(response.data.message, "error");
        }
      } catch (error) {
       
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