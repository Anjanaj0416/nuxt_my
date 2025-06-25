<template>
  <section class="p-6 min-h-screen">
    <!-- <h1 class="text-2xl font-bold text-gray-800 mb-8">Sales Dashboard</h1> -->

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <!-- Today Sales Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              📅 Today Freelance Sales Summary
            </h2>
          </div>

          <div class="space-y-4">
            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.totalSales }}</p>
            </div>
            <div class="p-4 bg-yellow-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Pending Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.pendingSales }}</p>
            </div>

            <div class="p-4 bg-green-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Completed Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.completedSales }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Sales Summary -->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              📊 Monthly Freelance Sales Summary
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.totalSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Pending Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.pendingSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Completed Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.completedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Rejected Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.rejectedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Refunded Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.refundedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">In Progress</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.inProgress }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Future Section: Add Charts, Tables, or Sales by Category -->
    <div class="mt-10">
      <!-- Placeholder for Sales Chart, Sales Table, etc. -->
      <p class="text-center text-gray-500 italic">More sales analytics coming soon...</p>
    </div>
  </section>
</template>



  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //// import * as Global from '@/assets/js/Global'
  ////import * as myfilter from '@/plugins/myfilter'
 //import Swal from 'sweetalert2';
 //import { useSampleStore  } from '~/stores/modules/sampleStore';
 import { useRoute } from 'vue-router'


 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
   import { useDashboardStore  } from "~/stores/modules/dashboardStore";


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.dashboardStore  = useDashboardStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
    methods: {
     
     
      // async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //     async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //  async downloadReportKotukole(){
      //   if(confirm('Do you want to Download?')){
      //      await this.get_DownloadKotukole({book:this.book});
      //      window.open(this.csv_root+'/reports/'+this.csv_name, '_blank');
      //   }
      // },

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

      //Message Usecases
    //this.$showAlert("Test Login Failed!", "error");

    //     this.$showConfirm('Are you sure you want to delete this item?', 'warning').then((result) => {
    //   if (result) {
    //     console.log('Item deleted');
    //   } else {
    //     console.log('Action canceled');
    //   }
    // });

  //    this.$showInput('Please enter your name:').then((input) => {
  //   if (input) {
  //     console.log('User input:', input);
  //   } else {
  //     console.log('No input or canceled');
  //   }
  // });

  // const htmlMessage = `
  //       <h2 style="color: #007bff;">Hello, Welcome to the Custom HTML Alert!</h2>
  //       <p>This is a <strong>custom HTML</strong> message with <a href="https://www.example.com" target="_blank" style="color: #007bff;">links</a>.</p>
  //       <img src="https://via.placeholder.com/150" alt="Sample Image" style="display: block; margin-top: 10px;" />
  //       <p><em>Note: This is a custom alert with rich HTML content.</em></p>
  //     `;
      
  //     this.$showHtmlAlert(htmlMessage);

  
  //const loadingAlert = this.$showLoading('Loading...');
  //loadingAlert.close();

  // const imageUrl = 'https://intranet.sltds.lk/SLTDS/Resource/rainbow/news/GroupPhotoMeetingTheSecretarytotheTreasury.jpg'; 
  // this.$showImageAlert('Here is your custom image!', imageUrl);

  // this.$showCustomButtons('Are you sure you want to proceed?', 'warning').then((result) => {
  //   if (result === 'Proceed') {
  //     console.log('User confirmed to proceed');
  //   } else {
  //     console.log('User canceled the action');
  //   }
  // });

 //End Message Usecases
  
  //Validation
  //-------------------------------------------------
  // async cmdSearchOrg(){
  //       if(this.isAtleasetOneExisitsForSearch()){
  //      await this.getOrganizationData(this.organizationSearch);
  //       }
  //     },
  
  // 	-------------------
  
  
  //  isAtleasetOneExisitsForSearch(){
  //  let isAtleasetOneExisitsForSearch = false;
  
  
  //  if(this.organizationSearch.person.trim()!='' ){
  //         if( this.organizationSearch.person.trim().length  <= 3 ){
  //             this.show_error('Invalid person , More than three Letters Requied for search');
  //         }
  //         else{ isAtleasetOneExisitsForSearch = true;}
  
  //       }
  // 	  return isAtleasetOneExisitsForSearch;
  // 	  }

     // GetCityById() {
    //   return (id) => {
    //     try {
    //       let objCity = this.vendorStore.initVendor.listCities.filter((city) => {
    //         return city.id == id
    //       })[0]
    //       return objCity.value
    //     } catch {
    //       return ''
    //     }
    //   }
    // },
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
  
  
  