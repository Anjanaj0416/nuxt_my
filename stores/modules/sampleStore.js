import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('sample', {
  state: () => ({
    dataobj: null,
   
  }),

  actions: {
    async sampleCall(req) {
      try {
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auxx/Lxx`, req);      
        if (response.data.isSuccess) {
          this.$showToast('Loading Success!', 'success');
       }
       else{
        console.error('Loading error:', response.data.message);
        this.$showToast('Loading Error!', 'error');
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.$showToast('Loading Error!', 'error');
      }
    },

   
  },
});
