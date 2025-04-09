import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    loggedUser:{},
    assetsBaseUrl: null,
  }),

  persist: true,

  actions: {
    async login(loginDetails) {
      try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/IAM/Login`, loginDetails);      
       
        if (response.data.isSuccess) {
          
          this.token = response.data.authToken;  // Assuming the response contains a 'token'
          this.loggedUser =response.data.loggedUser;
          this.assetsBaseUrl =response.data.loggedUser.resourceURLRoot;
         
          // localStorage.setItem('assetsBaseUrl', this.loggedUser.resourceURLRoot); // Save assetsBaseUrl to localStorage if needed
          // localStorage.setItem('token', this.token);  // Save token to localStorage if needed
          // localStorage.setItem('refreshToken', this.refreshToken);         
       }
       else{        
        this.showToast('Login error:'+response.data.message,'error');
       }
       
        
      } catch (error) {     
        this.showToast('Network Error! Login failed. Please try again.','error');     
      }
    },

    logout() {
      this.token = null;
      localStorage.clear();
      //this.showToast('User Logged out!','success');
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
