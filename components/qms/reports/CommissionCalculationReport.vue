<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
      <div class="text-2xl uppercase">Commission Calculation Report</div>
      <div class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">From</label>
            <div class="relative">
              <input 
                type="date" 
                v-model="dateFrom"
                placeholder="Enter Designation" 
                @change="logSelectedDates"
                required
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-medium">To</label>
            <div class="relative">
              <input 
                type="date" 
                v-model="dateTo"
                placeholder="Enter Designation" 
                @change="logSelectedDates"
                required
                class="w-full p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900" 
              />
            </div>
          </div>
        </div>
      </div>

      <p 
        v-if="!dateFrom || !dateTo" 
        class="text-sm text-gray-500 italic text-center"
      >
        Please select date range.
      </p>


    </section>
</template>


  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import { useQuotationStore } from '~/stores/modules/qms/quotationStore';

 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import SearchInput from '~/components/customcontrol/SearchInput.vue';

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {
      LinkBtn,
      Button,
      selectinput2,
      SearchInput
    },
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        dateFrom: '',
        dateTo: '',
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.quotationStore = useQuotationStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
    methods: {

      async logSelectedDates() {
        if (!this.dateFrom || !this.dateTo) {
          this.$showToast('Please select both From and To dates', 'warning');
          return;
        }

        const req = {
          from: this.dateFrom,
          to: this.dateTo,
        };
        console.log(req);
        
        await this.quotationStore.GetPrintInvoiceReports({ from: this.dateFrom, to: this.dateFrom }, this.$showLoading);

        
      }
     
   
      //this.$showToast('Login successful!', 'success'); //success ,error ,warning,info
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
  
  
  