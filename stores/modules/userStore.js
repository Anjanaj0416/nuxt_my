import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: '',
    token: '',
    loggedUser:{},
    assetsBaseUrl: '',
    updateProfile:{},
    redirectTo:'',
    loggedUser: {
      granted: [] 
    }
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

    async AppLogin(formData,showLoading) { 
    //  console.log('FormData in AppLogin:', Object.fromEntries(formData));
      //console.log(formData);
      
      const loadingAlert = showLoading(''); 

        try {
          // const secretCode = formData.get('secretCode');
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/IAM/GetAppAccessToken`,formData);     
        //  console.log("response:",response);
          
          loadingAlert.close();                            

          if (response.data.isSuccess) {         
            this.token = response.data.authToken;  // Assuming the response contains a 'token'  
             this.loggedUser =response.data.loggedUser;
             this.assetsBaseUrl =response.data.loggedUser.resourceURLRoot;
               localStorage.setItem("authToken", response.data.authToken);
        // this.showToast("Login successful!", "success");

        }
        else{        
          this.showToast('AppLogin error:'+response.data.message,'error');
        }
        
          
        } catch (error) {     
          console.error("error:",error);
          loadingAlert.close(); 
        }
      
    },

    async login(loginDetails,showLoading) {   
    //  console.log("API - login:",loginDetails);

      const loadingAlert = showLoading(''); 
      try {
       // console.log(import.meta.env.VITE_API_URL)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/IAM/Login`, loginDetails); 
       
        loadingAlert.close();      
        
       // console.log("response:",response);
        

        if (response.data.isSuccess) {
          
          this.token = response.data.authToken;  // Assuming the response contains a 'token'
          this.loggedUser =response.data.loggedUser;
          this.assetsBaseUrl =response.data.loggedUser.resourceURLRoot;
          this.redirectTo = response.data.redirectTo;
          
          document.cookie = `token=${this.token}; path=/; max-age=3600; Secure; SameSite=Strict`;
                  
       }
       else{        
        this.showToast('Login error:'+response.data.message,'error');
       }
       
        
      } catch (error) {     
        console.error("error:",error);
        this.showToast(' Login failed! Please try again.','error');     
      }
      
    },

    async profileUpdate(formData, showLoading) {
     // console.log('FormData in AppLogin:', Object.fromEntries(formData));
      const loadingAlert = showLoading('');
      try {
        const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hr/Employee/GetUpdateProfile`,formData,);
        loadingAlert.close();

        if (response.data.isSuccess) {

          this.showToast(response.data.message,"success");
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
   //   console.log(id);
      
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
          return ;
        }

      } catch (error) {
        loadingAlert.close();
        console.error("Profile fetch error:", error);
        this.showToast('Network error while loading profile.', 'error');
        return ;
      }
    },

    logout() {
      const userStore = useUserStore();
      userStore.token = '';
      userStore.loggedUser = null;
      this.$reset()
      localStorage.clear();
      document.cookie = 'token=; path=/; max-age=0; Secure; SameSite=Strict';
      navigateTo('/user/login')
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
