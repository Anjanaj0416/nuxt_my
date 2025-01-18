<template >
  <div class="overflow-y-auto">
    <h1 class="mt-2 text-2xl font-semibold tracking-tight text-gray-700 sm:text-3xl">Vender</h1>
    <div class="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-3">
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Company Name</label>
        <input
          type="text"
          v-model="CompanyName"
          placeholder="Enter Company Name"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Address Line 1</label>
        <input
          type="text"
          v-model="address1"
          placeholder="Enter Address Line 1"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Address Line 2</label>
        <input
          type="text"
          v-model="address2"
          placeholder="Enter Address Line 2"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">City</label>
        <input
          type="text"
          v-model="city"
          placeholder="Enter city"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">District</label>
        <input
          type="text"
          v-model="district"
          placeholder="Enter District"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="text"
          v-model="email"
          placeholder="Enter Email"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Contact Number</label>
        <input
          type="text"
          v-model="contactNumber"
          placeholder="Enter Contact Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Phone Number</label>
        <input
          type="text"
          v-model="phoneNumber"
          placeholder="Enter Phone Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Whatsapp Number</label>
        <input
          type="text"
          v-model="whatappNumber"
          placeholder="Enter Whatsapp Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
  
      
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Company Logo</label>
        <input class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Banner 1</label>
        <input class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Banner 2</label>
        <input class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
      </div>
  
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Description</label>
        <input
          type="text"
          v-model="description"
          placeholder="Enter description"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Contact Person Name</label>
        <input
          type="text"
          v-model="contactPersonName"
          placeholder="Enter Contact Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Contact Person Mobile</label>
        <input
          type="text"
          v-model="contactPersonMobile"
          placeholder="Enter Phone Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Owner First Name</label>
        <input
          type="text"
          v-model="ownerFirstName"
          placeholder="Enter Whatsapp Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
  
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Owner Contact</label>
        <input
          type="text"
          v-model="ownerContact"
          placeholder="Enter description"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Owner Birth Date</label>
        <input
          type="date"
          v-model="ownerBirthDate"
          placeholder="Enter Contact Number"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Bank Name</label>
        <input
          type="text"
          v-model="bankName"
          placeholder="Enter Bank Name"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Bank Branch</label>
        <input
          type="text"
          v-model="bankBranch"
          placeholder="Enter Bank Branch"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
  
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Bank Branch Code</label>
        <input
          type="text"
          v-model="bankBranchCode"
          placeholder="Enter Bank Branch Code"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Bank Account No</label>
        <input
          type="date"
          v-model="bankAccountNo"
          placeholder="Enter ank Account No"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">Bank Swift Code</label>
        <input
          type="text"
          v-model="bankSwiftCode"
          placeholder="Enter Bank Swift Code"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="">
        <label class="block text-sm font-medium text-gray-600">RSO No</label>
        <select
          id="bankBranch"
          v-model="rsoNo"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled selected>Select a Bank Branch</option>
          <option value="branch1">Bank Branch 1</option>
          <option value="branch2">Bank Branch 2</option>
          <option value="branch3">Bank Branch 3</option>
          <!-- Add more options as needed -->
        </select>
      </div>
      <!-- <div class="">
        <label class="block text-sm font-medium text-gray-600">Description</label>
        <textarea
          type="text"
          row="3"
          v-model="description"
          placeholder="Enter Description"
          required
          class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div> -->
    </div>
    <div class="grid grid-cols-2 mt-10">
  
        <button 
          type="button" 
          class="text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         Submit
        </button>
        <button 
          type="button" 
          class="text-blue-900 bg-white hover:bg-blue-900 border-2 border-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="$emit('cancel-assign')"
        >
          Cancel
        </button>

    </div>
  </div>
  </template>
  
      
      <script>

    
      //import textInput from '~/components/customcontrol/textinput'
      //import * as Global from '@/assets/js/Global'
      //import * as myfilter from '@/plugins/myfilter'
     // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
       definePageMeta({
        layout: 'loginlayout'
       });
    
      export default {
        components: {},
        props:[''],
        data() {
          return {
            imageroot: process.env.Assets_83,
            text: '', 
            showtext: false, 
          }
        },
        async mounted() {},
        watch: {},
        computed: {
          // ...mapState({
          //   //loggeduser: (state) => state.loggeduser,
          // }),
        },
        methods: {

        toggletext() {
          this.showtext = !this.showtext;
        },
        
        
          // ...mapActions({
          //   //  getWGInitData: 'reservedaddetail/getWGInitData',
          // }),
          //   ...mapMutations({
          //   //resettext: 'office/RESET_text',
          //    //showMessage: 'PUSH_NOTIFICATION',
          // }),
          //  this.processing_year = new Date().getFullYear()
           //this.$emit('Load_MonthlyBrakeDown',req)
           //this.$refs.catcomp.initCategoryItem(-1)
           //this.$emit('input', this.selected_item.trim());
        // show_error(msg) {
        //     this.showMessage({
        //       type: 'Failed',
        //       message: msg,
        //     })
        //   },
        //    show_msg(msg) {
        //     this.showMessage({
        //       type: 'success',
        //       message: msg,
        //     })
        //   },
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
      </script>
      
      <style scoped>
      .csscmd{
        @apply p-2  bg-blue-200 rounded;
      }
      .csscmd:hover{
        @apply bg-blue-200 cursor-pointer;
      }
      
      .cssBox {
        border: 1px solid;
        @apply border-gray-500 rounded p-2;
      }
    
      .btn{
        background-color: #072556; 
      }
  
      
      </style>
      
      
      