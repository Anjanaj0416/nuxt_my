import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useWelfareStore = defineStore('welfareStore', {
  state: () => ({
    listMembers: [],
    listAttendence: [],
    profileDetails:[],
    listMemberShipPayment: [],
    updateInit: [],
    paymentListView: [],
   
  }),
  persist: true,

  actions: {

    async fetchMember(req,showLoading) {     
        console.log('API-InitOrderPlace',req);
        const loadingAlert = showLoading("");
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/wf/Welfare/GetSearchMember`,
                {
                  params: {
                      searchBy: req.searchBy, 
                      keyWord: req.keyWord,
                  }
                }
            );
            loadingAlert.close();
            console.log(response);
            
            if (response.data.isSuccess) {
                this.listMembers = response.data.data.data;
            } else {
                this.showToast(response.data.message, "error");
            }
        } catch (error) {
        this.showToast(response.data.message, "error");
        }
    },

    async memberDashboardDetail(id, showLoading) {
      const loadingAlert = showLoading("")
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/Welfare/GetMemberDashboardDetailById?id=${id}`
        )

        loadingAlert.close()
        console.log(response);

        if (response.data.isSuccess) {
          this.listAttendence = response.data.data.data.listAttendence
          this.profileDetails = response.data.data.data.profileDetails
          this.listMemberShipPayment = response.data.data.data.listMemberShipPayment


        }
      } catch (error) {
        loadingAlert.close()
        this.showToast("Failed to load attendance", "error")
      }
    },

    async addPayment(req, showLoading) {
      const loadingAlert = showLoading("")
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/wf/WFPayment/SetMemberShipPayment`,req
        )

        loadingAlert.close()
        console.log(response);

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.listMemberShipPayment = response.data.data.data.listMemberShipPayment

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close()
        // this.showToast("Failed to add payment", "error")
      }
    },

    async removePayment(paymentId, showLoading) {
      const loadingAlert = showLoading("")
      console.log('GetDeletePayment',paymentId);
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/WFPayment/GetDeletePayment?id=${paymentId}`,
        )

        loadingAlert.close()
        console.log(response);

        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          this.listMemberShipPayment = response.data.data.data.listMemberShipPayment

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close()
        // this.showToast("Failed to add payment", "error")
      }
    },

    async memberDetailsInit(showLoading) {
      const loadingAlert = showLoading("")
      console.log('GetDeletePayment');
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/Welfare/GetUpdateProfileInitDetails`,
        )

        loadingAlert.close()
        console.log(response);

        if (response.data.isSuccess) {
          this.updateInit = response.data.data.data

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close()
        // this.showToast("Failed to add payment", "error")
      }
    },

    async GetUpdateProfile(formData, showLoading) {     
        console.log('API-SetPassToOtherWorkGroup');

        const loadingAlert = showLoading("");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/wf/Welfare/GetUpdateProfileDetails`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }

            );
            console.log(response);
            loadingAlert.close();
            if (response.data.isSuccess) {
                this.showToast(response.data.message, "success");
            } else {
                this.showToast(response.data.message, "error");
            }
        } catch (error) {
            this.showToast(error.message || "Something went wrong!", "error");
            loadingAlert.close();
        }
    },

    async paymentViewInit(searchVal, showLoading) {
      const loadingAlert = showLoading("")
      console.log('GetDeletePayment', searchVal);
    
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/WFPayment/GetPaymentViewInit`,{
          params: {
            searchval: searchVal || '',
          }
        })

        loadingAlert.close()
        console.log(response);

        if (response.data.isSuccess) {
          this.paymentListView = response.data.data.data
          

        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        loadingAlert.close()
        // this.showToast("Failed to add payment", "error")
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
   
  },

 
});
