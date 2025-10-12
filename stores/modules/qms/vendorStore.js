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
    listVendorOnboadingWF: {},
    regVendorAdmin:{
      suAdmin:{
        fullName:'',
        designation:'',
        email:'',
        mobile:'',
        nic:'',
      },
      additionalUser:{
         fullName:'',
        designation:'',
        email:'',
        mobile:'',
        nic:'',
      }
    },
  }),
  persist: true,

  //this.showToast('Login successful!', 'success'); //success ,error ,warning,info
  actions: {

     //addEditVendor
    async SetVendorAdminDetails(regVendorAdmin, showLoading) {
       console.log('API-SetVendorAdminDetails');
      console.log(JSON.stringify(regVendorAdmin));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Client/AddEditClient`,
          regVendorAdmin,         
        );

        loadingAlert.close();

        if (response.data.isSuccess) {         
          this.showToast(response.data.message,"success");       
          // this.listVendor = response.data.data.data;
        
        } else {
          console.error("error:",response.data.message)
          // this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        this.showToast('Error in server call', "error");
       }
    },

   //Update vendor
   async GetVendorById(id, showLoading) { 
    console.log('API-GetVendorById');
    console.log(JSON.stringify(id));
    const loadingAlert = showLoading("");
       
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/qms/Client/GetClientById?id=`+id );
      // console.log(response);
      
      loadingAlert.close();
      if (response.data.isSuccess) {
        this.curVendor = response.data.data.data;
        // console.log('response:',response);

        this.showToast(response.data.message);
      } else {
        this.showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      //  this.showToast(response.data.message, "error");
    }
  },

    //addEditVendor
    async AddEditVendor(formData, showLoading) {
       console.log('API-AddEditVendor');
      console.log(JSON.stringify(formData));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/qms/Client/AddEditClient`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        loadingAlert.close();
        console.log("Response Data:", response.data);

        if (response.data.isSuccess) {         
          this.showToast(response.data.message,"success");       
          this.listVendor = response.data.data.data;
        
        } else {
          console.error("error:",response.data.message)
          // this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error)
        this.showToast('Error in server call', "error");
       }
    },
    
    //loadInitVendor
    async loadInitVendor(showLoading) {
       console.log('API-InitVendor');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Client/InitClient`
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
      console.log('API-VendorList');
      console.log(JSON.stringify(req));
     
      const loadingAlert = showLoading("");
      try {
       
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Client/ClientList?keyword=${
            req.keyword
          }&searchBy=${req.searchBy}`
        );
        loadingAlert.close();       
         
        if (response.data.isSuccess) {         
            this.listVendor = response.data.data.data;   
            this.showToast(response.data.message, "success");
        } else {        
            this.listVendor = [];          
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      }
    },

    //DeleteVendor
    async DeleteVendor(req, showLoading) {
      console.log('API-Delete');
      console.log(JSON.stringify(req));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/qms/Client/DeleteClient?id=${req.id}`
        );
        loadingAlert.close();
       
        if (response.data.isSuccess) {
          // await this.loadListVendors();
          this.listVendor = response.data.data.data;   
          // this.showToast(response.data.message, "success");
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      }
    },

    //Vendor Onboading Workflow
    async GetVendorOnboadingWorkflow(vendorId, showLoading) {
      console.log('API-VendorOnboadingWorkflow');
      console.log(JSON.stringify(vendorId));

      const loadingAlert = showLoading("");
      try {
        const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/qms/Client/GetVendorOnboadingWF?vendorId=${vendorId}`

        );
        loadingAlert.close();
       console.log(response);
       
        if (response.data.isSuccess) {
          this.showToast(response.data.data.message, "success");
          this.listVendorOnboadingWF = response.data.data.data;   
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      }
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
