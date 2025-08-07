<template>
  <section class="">
    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Attendance Overview -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-1">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today Attendance Overview
            </h2>
        </div>

        <p class="text-md font-medium text-gray-600 mb-6">
            Overall Count Employees:
            <span class="font-bold text-blue-700">{{ dashboardStore.attendanceOverview.totalEmployees }}</span>
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Present -->
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Present Count</h3>
            <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.attendanceOverview.present }}</p>
            </div>

            <!-- Absent -->
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Absent Count</h3>
            <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.attendanceOverview.absent }}</p>
            </div>

            <!-- On Leave -->
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
            <h3 class="text-sm font-semibold text-gray-600 mb-1">On Leave Count</h3>
            <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.attendanceOverview.onLeave }}</p>
            </div>
        </div>
        </div>


        <!-- Management Card -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full lg:max-w-sm">
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
            </svg>
            Management
            </h2>
        </div>

        <h3 class="text-lg font-semibold text-gray-700 mb-4">Today's Managers</h3>

        <ul class="space-y-2 text-sm text-gray-600">
            <li
            v-for="(manager, index) in dashboardStore.todaysManagers"
            :key="manager.id"
            class="flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50"
            >
            <span>{{ index + 1 }}. {{ manager.name }}</span>
            <span
                class="text-green-600 font-medium text-xs"
            >{{ manager.status }}</span>
            </li>
        </ul>
        </div>

    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-6">
        <div class=" border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 class="text-xl font-bold text-gray-600 mb-4 flex items-center gap-2">
                🎂 Upcoming Birthdays
            </h2>
            <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex justify-between">
                <span>Nimesha Jayasinghe</span><span class="text-pink-600 font-semibold">June 25</span>
                </li>
                <li class="flex justify-between">
                <span>Tharindu Perera</span><span class="text-pink-600 font-semibold">June 28</span>
                </li>
                <li class="flex justify-between">
                <span>Roshan Silva</span><span class="text-pink-600 font-semibold">July 01</span>
                </li>
            </ul>
        </div>
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 class="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                🕒 Pending Leave Requests
            </h2>
            <ul class="space-y-2 text-sm text-gray-700">
                
            </ul>
            <ul class="text-sm text-gray-700 max-h-32 overflow-y-auto pr-1 space-y-1">
              <li class="flex justify-between">
                <span>Madushani R.</span><span class="text-yellow-600 font-medium">3 Days</span>
              </li>
              <li class="flex justify-between">
                <span>Thilina G.</span><span class="text-yellow-600 font-medium">1 Day</span>
              </li>
              <li class="flex justify-between">
                <span>Madushani R.</span><span class="text-yellow-600 font-medium">3 Days</span>
              </li>
              <li class="flex justify-between">
                <span>Thilina G.</span><span class="text-yellow-600 font-medium">1 Day</span>
              </li>
              <li class="flex justify-between">
                <span>Thilina G.</span><span class="text-yellow-600 font-medium">1 Day</span>
              </li>
              <li class="flex justify-between">
                <span>Madushani R.</span><span class="text-yellow-600 font-medium">3 Days</span>
              </li>
              <li class="flex justify-between">
                <span>Thilina G.</span><span class="text-yellow-600 font-medium">1 Day</span>
              </li>
            </ul>
        </div>
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
 import { useDashboardStore  } from "~/stores/modules/dashboardStore";

 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import { useUserStore } from "~/stores/modules/userStore";

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
      this.userStore = useUserStore();
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
  
  
  