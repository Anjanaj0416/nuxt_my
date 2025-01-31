import { defineStore } from 'pinia';
import axios from 'axios';

export const useVendorStore = defineStore('vendorStore', {
  state: () => ({
    listVendor: [
      {id:'dddd2',customerRef:'AE51156',name:'Abans Group of Company',contact:'Silva - 0718542367',businessType:'Hardware',rso:'Saman - 071458752',status:'Active'},
      {id:'dddd2',customerRef:'AE51157',name:'Asian Hardware',contact:'Silva - 0718542368',businessType:'Hardware',rso:'Saman - 071458742',status:'InActive'},
      {id:'dddd2',customerRef:'AE31158',name:'Lotus Hardware',contact:'Silva - 0718542333',businessType:'Hardware',rso:'Saman - 071458852',status:'Active'},
      {id:'dddd2',customerRef:'AU51159',name:'Tulip Sport Goods',contact:'Silva - 0718542344',businessType:'Shores',rso:'Saman - 071458452',status:'Active'}

    ],
   
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
