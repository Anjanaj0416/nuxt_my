<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
      <div class="text-2xl uppercase">Overtime Individual Report</div>
      <div class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 font-medium">Employee</label>
            <selectinput2
              v-model="selectedEmployee"
              :selections="reportStore.initData.initReport.arrEmp"
              :isReport=true
              @change="logSelectedDates"
              placeholder="Select Employee"
              class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <!-- <div class="relative">
              <input 
                type="date" 
                v-model="dateFrom"
                placeholder="Enter Designation" 
                @change="logSelectedDates"
                required
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div> -->
          </div>
          <div>
            <label class="block mb-1 font-medium">Year</label>
            <div class="relative">
              <selectinput2
                v-model="selectedYear"
                :selections="reportStore.initData.initReport.listYears"
                placeholder="Select Employee"
                @change="logSelectedDates"
                class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <!-- <input 
                type="date" 
                v-model="dateFrom"
                placeholder="Enter Designation" 
                @change="logSelectedDates"
                required
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              /> -->
            </div>
          </div>
          <div>
            <label class="block mb-1 font-medium">Month</label>
            <div class="relative">
              <selectinput2
                v-model="selectedMonth"
                :selections="reportStore.initData.initReport.listMonths"
                :isReport=true
                placeholder="Select Employee"
                @change="logSelectedDates"
                class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <!-- <input 
                type="date" 
                v-model="dateTo"
                placeholder="Enter Designation" 
                @change="logSelectedDates"
                required
                class="w-full p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900" 
              /> -->
            </div>
          </div>
        </div>
      </div>

      <p 
        v-if="!selectedYear || !selectedMonth" 
        class="text-sm text-gray-500 italic text-center"
      >
        Please select an Employee, Year and Month..
      </p>


      <!-- <div class="bg-white p-6 rounded shadow border mt-6">
        <p class="text-sm text-gray-500 italic text-center">Report preview will appear here after selection.</p>
        <h2 class="text-lg font-semibold mb-4">Generated Reports</h2>
        <ul class="space-y-4">
          <li class="flex items-center justify-between border p-4 rounded hover:bg-gray-50 transition">
            <div class="flex items-center space-x-3">
              <i class="fas fa-file-alt text-blue-600 text-xl"></i>
              <span class="text-gray-800 font-medium">January 2025 - Matara Arachchi</span>
            </div>
            <a
              href="http://localhost:3000/hr/reports/overtime_individual_summery_report?user=JohnDoe&month=01&year=2025"
              target="_blank"
              class="text-blue-600 hover:underline text-sm"
            >
              View
            </a>
          </li>
          <li class="flex items-center justify-between border p-4 rounded hover:bg-gray-50 transition">
            <div class="flex items-center space-x-3">
              <i class="fas fa-file-alt text-blue-600 text-xl"></i>
              <span class="text-gray-800 font-medium">February 2025 - Nimal</span>
            </div>
            <a
              href="http://localhost:3000/hr/reports/overtime_individual_summery_report?user=JaneSmith&month=02&year=2025"
              target="_blank"
              class="text-blue-600 hover:underline text-sm"
            >
              View
            </a>
          </li>
        </ul>
      </div> -->


    </section>
</template>


  
  <script>

import { useUserStore } from "~/stores/modules/userStore";
import { useReportStore } from "~/stores/modules/hr/reportStore";

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
        isReport: false,
        selectedEmployee: '',
        selectedYear: '',
        selectedMonth: ''
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.reportStore = useReportStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      await this.reportStore.getReportInitData();

    },
    watch: {},
    computed: {},
    methods: {

      async logSelectedDates() {
        if (!this.selectedEmployee || !this.selectedYear || !this.selectedMonth) {
          this.$showToast('Please select an Employee, Year and Month', 'warning');
          return;
        }

        const req = {
          EmpNo: this.selectedEmployee,
          Year: this.selectedYear,
          Month: this.selectedMonth,
        };
        await this.reportStore.getOTPeriodSummeryIndividual(req, this.$showLoading);
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
  
  
  