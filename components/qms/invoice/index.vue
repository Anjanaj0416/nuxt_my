<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Invoice</div>
          <!-- <button
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 transition-all duration-300 bg-white border-1 rounded-full shadow hover:bg-blue-700 hover:text-white hover:shadow-md"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to orders
          </button> -->
        </div>

        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-base font-semibold text-gray-700">
                Full Payment: <span class="text-blue-600 font-bold">LKR: {{ invoice.InvoiceDetails.FullPayment }}</span>
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Balance Payment: <span class="text-gray-500 font-bold">LKR : {{ invoice.InvoiceDetails.BalancePayment }}</span>
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Panding Installment: <span class="text-gray-500 font-bold">{{ invoice.InvoiceDetails.PendingInstallments }} Installment</span>
              </h2>
            </div>

            <!-- Button Section (Right) -->
            <div class="w-full md:w-auto">
              <div class="mr-2">
                <Button class="w-24 px-4 py-1.5 mt-2 rounded-full text-xs transition" label="Payment" variant="primary"   @click="GoToPayment"/>
                <!-- v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')"
                  @click="handleCreateClick"  -->
              </div>
            </div>
          </div>

          


          <ol class="flex items-center w-full">
            <li
              v-for="(item, index) in invoice.installmentList"
              :key="item.id"
              class="flex items-center text-blue-600 relative"
              :class="{ 'w-full': index !== invoice.installmentList.length - 1 }"
            >
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full z-10 ring-2 shrink-0"
                :class="{
                  'bg-green-100 ring-green-600': item.stats === 'paid',
                  'bg-red-100 ring-red-600': item.stats === 'latepayment',
                  'bg-yellow-100 ring-yellow-600': item.stats === 'Pending'
                }"
              >
                <svg
                  v-if="item.stats === 'paid'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 h-5 text-green-600"
                  fill="currentColor"
                >
                  <path
                    d="M256 8C119 8 8 119 8 256s111 248 248 248
                      248-111 248-248S393 8 256 8zM377 187l-136 136c-4.7 4.7-12.3 
                      4.7-17 0l-72-72c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 
                      12.3-4.7 17 0l47.5 47.5L343 153c4.7-4.7 
                      12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 h-5"
                  :class="{
                    'text-red-500': item.stats === 'latepayment',
                    'text-yellow-500': item.stats === 'Pending'
                  }"
                  fill="currentColor"
                >
                  <path
                    d="M256 8C119 8 8 119 8 256s111 248 
                      248 248 248-111 248-248S393 8 256 8zm12 
                      136h-24c-6.6 0-12 5.4-12 12v116c0 4.2 
                      2.2 8.2 5.8 10.4l96 58c5.7 3.5 13.1 
                      1.7 16.6-4l12-20c3.5-5.7 1.7-13.1-4-16.6L268 
                      276.1V156c0-6.6-5.4-12-12-12z"
                  />
                </svg>
              </div>
              <div
                v-if="index !== invoice.installmentList.length - 1"
                class="hidden sm:block w-full h-0.5 bg-gray-300"
              ></div>
            </li>
          </ol>

          <div class="mt-6 flex justify-between text-xs text-gray-600">
            <div
              v-for="item in invoice.installmentList"
              :key="'label-' + item.id"
              class="text-center flex flex-col items-center"
            >
              <p class="font-semibold">{{ item.name }}</p>
              <p class="mb-2">LKR {{ item.price }}</p>

              <!-- Status badge -->
              <span
                v-if="item.stats === 'paid'"
                class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                Paid
              </span>
              <span
                v-else-if="item.stats === 'latepayment'"
                class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                Late payment
              </span>
              <span
                v-else
                class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                Pending
              </span>


              <!-- Action -->
              <a
                v-if="item.stats === 'paid'"
                :href="item.invoice"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-medium text-blue-900 underline mt-2 justify-between"
              >
                View
              </a>

            </div>
          </div>
        </div>
        <addPayment v-if="isAddPayment" @close="isAddPayment = false" />
    </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import addPayment from './addPayment.vue';

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,addPayment},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddPayment: false,
        receiptFiles: {},
        invoice: {
          id:"I001",
          InvoiceDetails:{
            FullPayment:125,
            BalancePayment:25,
            Installment:4,
            PendingInstallments:2,
          },
          installmentList:[
            {id:"1", name:"1st Installment", price:"50000.00", stats:"paid", invoice:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
            {id:"2", name:"2st Installment", price:"50000.00", stats:"latepayment"},
            {id:"3", name:"3st Installment", price:"50000.00", stats:"Pending"},
          ]
        }
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
    methods: {

      GoToPayment() {
        this.isAddPayment = true;
      },

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
  
  
  