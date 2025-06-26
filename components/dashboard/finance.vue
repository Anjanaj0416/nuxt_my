<template>
  <section class="mt-8">
    <!-- <h1 class="text-2xl font-bold mb-4">📊 Finance Dashboard</h1> -->


    <div class="flex flex-col lg:flex-row gap-8 mb-6 ">
        <!-- Attendance Overview -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-1 bg-white">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            💰 Financial Summary
            </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Revenue (MTD):</h3>
                <p class="text-3xl font-extrabold text-blue-800">LKR.{{ dashboardStore.financialSummary.totalRevenueMTD }}.00</p>
            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Revenue (YTD)</h3>
                <p class="text-3xl font-extrabold text-blue-800">LKR.{{ dashboardStore.financialSummary.totalRevenueYTD }}.00</p>
            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Expenses (MTD)</h3>
                <p class="text-3xl font-extrabold text-blue-800">LKR.{{ dashboardStore.financialSummary.totalExpensesMTD }}.00</p>
            </div>
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-1">Profit (Monthly)</h3>
                <p class="text-3xl font-extrabold text-blue-800">LKR.{{ dashboardStore.financialSummary.profitMonthly }}.00</p>
            </div>
        </div>
        </div>
        <!-- Management Card -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full lg:max-w-sm  bg-white">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📄 Claims
                </h2>
            </div>
            <ul class="space-y-2 text-sm text-gray-600"> 
                <h2 class="text-xl font-semibold mb-4 text-indigo-600"></h2>
                <p>Expense Claims: <span class="font-bold">LKR.{{ dashboardStore.claimsSummary.expenseClaims }}.00</span></p>
                <p>Pending Approval: <span class="font-bold text-yellow-600">LKR.{{ dashboardStore.claimsSummary.pendingApproval }}.00</span></p>
                <p>Approved: <span class="font-bold text-green-600">LKR.{{ dashboardStore.claimsSummary.approved }}.00</span></p>
                <p>Rejected: <span class="font-bold text-red-500">LKR.{{ dashboardStore.claimsSummary.rejected }}.00</span></p>
                <p>Reimbursed: <span class="font-bold">LKR.{{ dashboardStore.claimsSummary.reimbursed }}.00</span></p>
            </ul>
        </div>
    </div>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


      <!-- Accounts & Payments -->
      <div class="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-4 text-indigo-600">🏦 Accounts & Payments</h2>
        <p>Outstanding Payments: <span class="font-bold text-orange-500">$30,000</span></p>
        <p>Payables: <span class="font-bold">$50,000</span></p>
        <ul class="text-sm text-gray-500 ml-2 list-disc">
          <li>Vendor A - $20k</li>
          <li>Vendor B - $30k</li>
        </ul>
        <p>Receivables: <span class="font-bold">$70,000</span></p>
        <ul class="text-sm text-gray-500 ml-2 list-disc">
          <li>Client X - $50k</li>
          <li>Client Y - $20k</li>
        </ul>
      </div>

      <!-- Invoices -->
      <div class="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-4 text-indigo-600">🧾 Invoices</h2>
        <p>Issued Today: <span class="font-bold">{{ dashboardStore.invoices.issuedToday }}</span></p>
        <p>Issued This Week: <span class="font-bold">{{ dashboardStore.invoices.issuedThisWeek }}</span></p>
        <p>Paid: <span class="font-bold text-green-600">{{ dashboardStore.invoices.paid }}</span></p>
        <p>Overdue: <span class="font-bold text-red-500">{{ dashboardStore.invoices.overdue }}</span></p>
      </div>

      <!-- Claims -->
      

      <!-- Budget & Cash -->
      <div class="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-4 text-indigo-600">📊 Budget & Cash</h2>
        <p>Budget vs Actual: <span class="font-bold">85%</span> utilization</p>
        <p>Dept Usage:</p>
        <ul class="text-sm text-gray-500 ml-2 list-disc">
          <li>HR - 90%</li>
          <li>IT - 80%</li>
        </ul>
        <p>Petty Cash Remaining: <span class="font-bold">$800</span></p>
        <p>Logged Expenses Today: <span class="font-bold">$450</span></p>
      </div>

      <!-- Payroll & Compliance -->
      <div class="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold mb-4 text-indigo-600">👥 Payroll & Compliance</h2>
        <p>Salary Status: <span class="font-bold text-green-600">Processed</span></p>
        <p>Deductions: <span class="font-bold">$6,000</span></p>
        <p>Tax/VAT Deadline: <span class="font-bold text-red-500">28th June</span></p>
        <p>EPF/ETF Submitted: <span class="font-bold text-green-600">Yes</span></p>
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
//  import { useDashboardStore  } from "~/stores/modules/dashboardStore";

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
  
  
  