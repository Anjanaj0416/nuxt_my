<template>
  <section class="justify-center">
    <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
      <div class="text-2xl uppercase">Work Flow</div>
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
    {{ orderStore.loadWorkFLow.data }}
    {{ vendorId }}
    <div class="overflow-x-auto rounded-xl border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-blue-950 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Discription</th>
            
            <th class="px-4 py-2 text-left">Assigned To</th>
            <th class="px-4 py-2 text-left">Assigned Date</th>
            <th class="px-4 py-2 text-left">Completed Date</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Days Taken</th>
            <th class="px-4 py-2 text-left">Comment</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td class="px-4 py-2 font-medium">Nimal <span class="text-xs text-gray-500">[0772784123]</span></td>
            <td class="px-4 py-2">2025-06-15</td>
            <td class="px-4 py-2 text-gray-500">—</td>
            <td class="px-4 py-2">
              <span class="inline-block rounded-full bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs">Pending</span>
            </td>
            <td class="px-4 py-2 text-center">130</td>
            <td class="px-4 py-2 text-gray-600 italic">—</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td class="px-4 py-2 font-medium">Kamal <span class="text-xs text-gray-500">[0718738129]</span></td>
            <td class="px-4 py-2">2025-01-16</td>
            <td class="px-4 py-2">2025-02-05</td>
            <td class="px-4 py-2">
              <span class="inline-block rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs">Completed</span>
            </td>
            <td class="px-4 py-2 text-center">19</td>
            <td class="px-4 py-2 text-gray-600 italic">—</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td class="px-4 py-2 font-medium">Dumindu <span class="text-xs text-gray-500">[0778626741]</span></td>
            <td class="px-4 py-2">2025-06-16</td>
            <td class="px-4 py-2">2025-01-16</td>
            <td class="px-4 py-2">
              <span class="inline-block rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs">Completed</span>
            </td>
            <td class="px-4 py-2 text-center">0</td>
            <td class="px-4 py-2 text-gray-600">Recall the WorkOrder By FLO</td>
          </tr>
          <!-- Repeat for others -->
        </tbody>
      </table>
    </div>
  </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>
  
<script>
  import { useRoute } from 'vue-router'
  import { useOrderStore } from '~/stores/modules/orderStore';
  
  
  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:['vendorId'],
    data() {
      return {
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.orderStore = useOrderStore(); 
      this.showLoading = this.$showLoading;

      await this.orderStore.loadWorkFLow(this.vendorId, this.showLoading);

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
  
  
  