import { defineStore } from 'pinia';
import axios from 'axios';

export const useWelfareStore = defineStore('welfareStore', {
  state: () => ({
    listMembers: [],
    listAttendence: [],
    profileDetails:[],
    listMemberShipPayment: [],
   
  }),
  persist: true,

  actions: {

    async fetchMember(req,showLoading) {     
        console.log('API-InitOrderPlace');
        const loadingAlert = showLoading("");
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/wf/Welfare/GetSearchMember`,
                {
                    params: {
                        bookId: req.bookId, 
                        name: req.name,
                        mobile: req.mobile,
                        address: req.address,
                        nic: req.nic,
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
}
,
    
   
  },
  showToast(message,type) {
    Swal.fire({
      icon: type,
      title: type,
      text: message,
      timer: 5000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  },
 
});
