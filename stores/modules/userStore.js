import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
    loggedUser:{},
    assetsBaseUrl: null,
  }),

  persist: true,

  actions: {
    async login(loginDetails,showLoading) {
      const loadingAlert = showLoading(''); 
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/IAM/Login`, loginDetails);      
                                      
        if (response.data.isSuccess) {
          
          this.token = response.data.authToken;  // Assuming the response contains a 'token'
          this.loggedUser =response.data.loggedUser;
          this.assetsBaseUrl =response.data.loggedUser.resourceURLRoot;
          
          document.cookie = `token=${this.token}; path=/; max-age=3600; Secure`;
                  
       }
       else{        
        this.showToast('Login error:'+response.data.message,'error');
       }
       
        
      } catch (error) {     
        this.showToast('Network Error! Login failed. Please try again.','error');     
      }
      loadingAlert.close();
    },

    logout() {
      this.token = null;
      localStorage.clear();
      //this.showToast('User Logged out!','success');
    },

    loadFromStorage() {
      if (process.client) {
        const storedToken = useCookie('token').value;
        if (storedToken) this.token = storedToken;
      }
    },

    showToast(message,type) {
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    },
  },
});
