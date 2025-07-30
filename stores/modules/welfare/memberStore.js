import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('sample', {
  state: () => ({
    dataobj: '',
   
  }),

  persist: true,

   //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info
  actions: {
    async sampleCall(req,showLoading) {
      const loadingAlert = showLoading('');    
      try {
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auxx/Lxx`, req);      
        loadingAlert.close();  
        
        if (response.data.isSuccess) {       
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast('Loading Error!', 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast('Loading Error!', 'error'); 
      }
    },
    
    
   
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
