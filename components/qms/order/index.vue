<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Order</div>
          <button
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 transition-all duration-300 bg-white border-1 rounded-full shadow hover:bg-blue-700 hover:text-white hover:shadow-md"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Proposals
          </button>
        </div>

        <div class="max-h-[660px] overflow-y-auto space-y-4">
        <div
          class="flex flex-col gap-3 p-3 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:p-4"
          >
          <!-- v-for="(qItem, index) in quotationStore.listQuotation" :key="index" -->
          <!-- Top section: Details -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Proposal No.</h1>
              <p class="text-sm font-semibold text-blue-600">test</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Company</h1>
              <p class="text-sm text-gray-700">test</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Total</h1>
              <p class="text-sm font-semibold text-gray-800">Rs.test</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <!-- <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Status</h1>
              <span :class="{
                'bg-green-100 text-green-700': qItem.status === 'Approved',
                'bg-yellow-100 text-yellow-700': qItem.status === 'Pending',
                'bg-red-100 text-red-700': qItem.status === 'Rejected'
              }" class="text-xs font-semibold px-2 py-0.5 rounded-full">
                {{ qItem.status }}
              </span>
            </div> -->
          </div>

          <!-- Sales Exec -->
          <div class="text-xs text-red-500 font-medium">
            Sales Exec: <span class="text-gray-700">test</span>
          </div>

          <!-- Items list -->
          <!-- <div class="text-xs text-gray-700">
            <span class="font-medium uppercase text-gray-800">Items:</span>
            <ul class="list-disc list-inside ml-2">
              <li v-for="(qProduct, index) in qItem.items" :key="index">{{ qProduct }}</li>
            </ul>
          </div> -->

          <!-- Button group -->
          <div class="flex flex-wrap justify-end gap-1 mt-1">
            <LinkBtn label="Invoice" class="text-xs font-medium" @click="
              GoToInvoice(qItem.id);
            showInvoice = true
              " />
            <LinkBtn label="Workflow " class="text-xs font-medium"/>
            <LinkBtn label="View Proforma" class="text-xs font-medium"/>
          </div>
        </div>
        <!-- <div v-if="!quotationStore.listQuotation.length" class="mt-4 text-center text-blue-950">
          No quotations found.
        </div> -->
      </div>
      <Invoice v-if="isViewMore && showInvoice" @close="isViewMore = false; showInvoice = false" />
    </section>
  </template>
  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import Invoice from "~/components/qms/invoice/index.vue";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,Invoice},
    props:[''],
    data() {
      return {
        isViewMore: false,
        showInvoice: false,
      }
    },

    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
    },
    
    methods: {
        async GoToInvoice(test){
            this.resetViews();  

            let id = this.quotationStore.curQuotation.id;
            this.isViewMore = true;
        },

        resetViews(){
            this.isViewMore= false
            this.showInvoice= false
        },
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

  @keyframes glow {
  0% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 1.5s infinite ease-in-out;
}
  </style>
  
  
  