<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
    <div class="text-2xl uppercase">All Commision Payment Report</div>
    <div class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block mb-1 font-medium">From</label>
          <input 
            type="date" 
            v-model="dateFrom"
            required
            class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">To</label>
          <input 
            type="date" 
            v-model="dateTo"
            required
            class="w-full p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Keyword</label>
          <input 
            type="data" 
            v-model="keyword"
            required
            class="w-full p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">CSO No</label>
          <select
                v-model="csoNo"
                class="w-full border border-gray-300 text-black text-sm rounded px-3 py-2 mt-2"
            >
                <option disabled selected value="">Select cso</option>
                <option
                    v-for="cat in orderStore.InitCommision"
                    :key="cat.id"
                    :value="cat.id"
                >
                    {{ cat.value }}
                </option>
            </select>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center mt-6">
       <button
        @click="downloadReport"
        class="px-6 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Download Report
      </button>

      </div>
    </div>

    <p 
      v-if="!dateFrom || !dateTo || !cso" 
      class="text-sm text-gray-500 italic text-center"
    >
      Please Download Button Click.
    </p>
  </section>
</template>



  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";

 import { useQmsReportsStore } from '~/stores/modules/qms/qmsReportsStore';
 import { useOrderStore } from '~/stores/modules/orderStore';


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {

    },
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
         dtFrom: "",
            dtTo: "",
            keyword: "",
            csoNo: "",
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.qmsReportsStore = useQmsReportsStore();
      this.orderStore = useOrderStore();

      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      await this.orderStore.GetCommissionRatesDetails(this.showLoading);
      this.InitCommision = this.orderStore.InitCommision;
  
    },
    watch: {},
    computed: {
  
    },
  methods: {
    async downloadReport() {
      const req = {
        dtFrom: this.dateFrom || '',
        dtTo: this.dateTo || '',
        keyword: this.keyword || '',
        csoNo: this.csoNo || '',
      };
      
      await this.qmsReportsStore.GetCommisionPaymentReport(req , this.$showLoading); 
    }
  },
    async beforeMount() {
      // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
      // } else {
      //   this.show_error('Not Allowed to access this page')
      //   this.$router.push('/')
      // }
  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

 
  </script>
  
  <style scoped>
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }
  </style>
  
  
  