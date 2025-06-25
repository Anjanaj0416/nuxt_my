import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
    loggedUser:{},
    assetsBaseUrl: null,
    updateProfile:{},
  }),

  persist: true,

  actions: {


    async GetChangePassword(req, showLoading) {
      const loadingAlert = showLoading(''); 

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/IAM/GetChangePassword`, req);      
          
        loadingAlert.close();                            

        if (response.data.isSuccess) {
          this.showToast(response.data.message);
        } else {        
          this.showToast(`Change Password Error: ${response.data.message}`, 'error');
        }
      } catch (error) {     
        console.error("error:", error);
        this.showToast('Network Error! Password change failed. Please try again.', 'error');     
      }
    },

  async AppLogin(secretKey,showLoading) {   

      const loadingAlert = showLoading(''); 
      try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/IAM/GetAppAccessToken?secretCode=`+ secretKey);      
        loadingAlert.close();                            

        if (response.data.isSuccess) {         
          this.token = response.data.authToken;  // Assuming the response contains a 'token'                          
       }
       else{        
        this.showToast('AppLogin error:'+response.data.message,'error');
       }
       
        
      } catch (error) {     
        console.error("error:",error);
        
        this.showToast('Network Error! Login failed. Please try again.','error');     
      }
      
    },

    async login(loginDetails,showLoading) {   

      const loadingAlert = showLoading(''); 
      try {

        const response = await axios.post(`https://mcleapi.dtl.lk/api/IAM/Login`, loginDetails);      
        loadingAlert.close();                            

        if (response.data.isSuccess) {
          
          this.token = response.data.authToken;  // Assuming the response contains a 'token'
          this.loggedUser =response.data.loggedUser;
          this.assetsBaseUrl =response.data.loggedUser.resourceURLRoot;
         // console.log(this.loggedUser )
          
          document.cookie = `token=${this.token}; path=/; max-age=3600; Secure`;
                  
       }
       else{        
        this.showToast('Login error:'+response.data.message,'error');
       }
       
        
      } catch (error) {     
        console.error("error:",error);
        
        this.showToast('Network Error! Login failed. Please try again.','error');     
      }
      
    },

    async profileUpdate(formData, showLoading) {
      const loadingAlert = showLoading('');
      try {
        const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hr/Employee/GetUpdateProfile`,formData,);
        loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message);
          this.updateProfile = response.data.data.data;
        } else {
          this.showToast(response.data.message, "error");
        }
      } catch (error) {
        console.error("error:",error);
        this.showToast('Network Error! Login failed. Please try again.','error');    
      }
    },


    async fetchProfileData(id, showLoading) {
      console.log(id);
      
      const loadingAlert = showLoading('');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr/Employee/GetInitProfile`,
          { params: { Id: id } }
        );

        loadingAlert.close();

        if (response.data) {
          this.profileData = response.data;          
          return response.data;
        } else {
          this.showToast('Failed to fetch profile data.', 'error');
          return null;
        }

      } catch (error) {
        loadingAlert.close();
        console.error("Profile fetch error:", error);
        this.showToast('Network error while loading profile.', 'error');
        return null;
      }
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
        timer: 5000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    
    },
  },
});
