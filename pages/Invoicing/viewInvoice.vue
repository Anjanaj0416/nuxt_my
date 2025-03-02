<template>
  <section>
    <h1 class="mt-8 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">View Invoice</h1>
    <div class="flex justify-end mt-6">
    <button
        @click="goToProformaInvoice"
      class="px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
      aria-label="Edit vendor"
    >
      Edit Invoice
    </button>
  </div>
  
    <div>
    <div class="grid grid-cols-2 mt-0">
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="font-medium text-gray-900 text-sm/6">Customer Name</dt>
            <dd class="mt-1 text-gray-700 text-sm/6 sm:col-span-2 sm:mt-0">V123</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="font-medium text-gray-900 text-sm/6">Address</dt>
            <dd class="mt-1 text-gray-700 text-sm/6 sm:col-span-2 sm:mt-0">ABC Company</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="font-medium text-gray-900 text-sm/6">Email</dt>
            <dd class="mt-1 text-gray-700 text-sm/6 sm:col-span-2 sm:mt-0">xxxxxx</dd>
          </div>

        </dl>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="font-medium text-gray-900 text-sm/6">Contact Number</dt>
            <dd class="mt-1 text-gray-700 text-sm/6 sm:col-span-2 sm:mt-0">xxxxxx</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="font-medium text-gray-900 text-sm/6">Web</dt>
            <dd class="mt-1 text-gray-700 text-sm/6 sm:col-span-2 sm:mt-0">xxxxxx</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="relative mt-5 overflow-x-auto sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Item
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Qty
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Discount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Package 1
                    </th>
                    <td class="px-6 py-4">
                    LKR: 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR: 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR : 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR : 5000.00
                    </td>
                </tr>

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Package 2
                    </th>
                    <td class="px-6 py-4">
                    LKR: 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR: 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR : 5000.00
                    </td>
                    <td class="px-6 py-4">
                    LKR : 5000.00
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="grid grid-cols-1 gap-4 mt-6 rounded-lg sm:grid-cols-2 lg:grid-cols-3">
            <!-- Left Side (Empty Divs for Placement) -->
            <div></div>
            <div></div>
            <!-- Invoice Summary -->
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <p class="text-xl font-semibold text-gray-800 dark:text-gray-100">Invoice Summary</p>
              <div class="mt-4 space-y-2">
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Discount:</span>
                  <span>LKR 5000.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Net Price:</span>
                  <span>LKR 5000.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Tax (10%):</span>
                  <span>LKR 500.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Total:</span>
                  <span>LKR 5500.00</span>
                </div>
              </div>
            </div>
          </div>

    </div>
  </section>
  </template>
  
      
      <script>
      import changelogin from '~/pages/user/changelogin'
      import register from '~/pages/user/register.vue'
      import logo from '~/assets/img/Logo.png';
    
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
        goToProformaInvoice() {
        this.$router.push('/Invoicing/invoice'); // Navigate to /user/changelogin
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
      
      
      