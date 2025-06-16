<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
    <section class="justify-center">


  
        <div class="flex flex-col items-center justify-between mt-0 mb-2 md:flex-row">
            <div class="w-full mb-4 md:mb-0">  
              <div class="text-2xl uppercase">Proposal</div>
            </div>
        <div class="w-full md:w-auto">
            <div class="mr-2">
            <Button
                class="w-24 px-4 py-1.5 rounded-full text-xs transition"
                label="Create"
                variant="primary"
            />
            </div>
        </div>
        </div>

        <div class="bg-white border rounded-lg shadow-md p-4 space-y-1 text-sm text-gray-800">
            <div class="flex flex-wrap justify-between items-start">
                <div class="space-y-1">
                    <div>
                    <span class="font-semibold">Proposal No.</span>
                    <a href="#" class="text-blue-600 font-bold ml-1">P2025060027</a>
                    </div>
                    <div>
                   
                    </div>
                </div>

                <div class="text-right space-y-1">
                     <!-- <span class="font-semibold">Company</span>
                    <span class="ml-1">abc-abc abc-0712365498</span> -->
                    <!-- <div>
                    <span class="font-semibold">Total</span>
                    <span class="text-green-600 font-bold ml-1">Rs. 1,500,000.00</span>
                    </div>
                    <div>
                    <span class="font-semibold">Status</span>
                    <span class="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Pending
                    </span>
                    </div> -->
                </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 space-y-1 text-sm text-gray-800">
                <div class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                    <span class="text-gray-500">Proposal Version No:</span>
                    <div class="text-blue-600 font-semibold">P2025060027V</div>
                    </div>
                    <div>
                    <span class="text-gray-500">Date:</span>
                    <div class="text-blue-600 font-semibold">16/06/2025</div>
                    </div>
                    <div>
                    <span class="text-gray-500">Total Amount:</span>
                    <div class="text-green-600 font-semibold">Rs. 1,500,000.00</div>
                    </div>
                    <div>
                    <span class="text-gray-500">Status:</span>
                    <span class="bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded-full text-xs inline-block">Pending</span>
                    </div>
                </div>

                <!-- Action Buttons Section -->
                <div class="flex flex-wrap justify-end gap-2 pt-0">
                    <LinkBtn
                      label="View Versions"
                      class="text-xs font-medium"
                    />
                    <LinkBtn
                      label="Approve"
                      class="text-xs font-medium"
                    />
                    <LinkBtn
                      label="Sent to CSO"
                      class="text-xs font-medium"
                    />
                    <LinkBtn
                      label="Create Profoma"
                      class="text-xs font-medium"
                    />
                </div>
            </div>

        </div>


    </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
  </template>
  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //// import * as Global from '@/assets/js/Global'
  ////import * as myfilter from '@/plugins/myfilter'
 //import Swal from 'sweetalert2';
 //import { useSampleStore  } from '~/stores/modules/sampleStore';
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

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
  
  
  