<!-- https://flowbite.com/docs/components/avatar/ -->
<template>
    <section>
        <h1 class="items-start justify-start mt-8 mb-8 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">Assign Rso</h1>
       


            <div class="grid grid-cols-2 gap-4 ">
                <div>
                    <label class="block mb-6 text-sm font-medium text-gray-600">Company Name</label>
                    <select v-model="selectedRso" class="w-full px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-md">
                        <option value="" disabled selected>Select RSO</option>
                        <option v-for="rso in rsoName" :key="rso.id" :value="rso.name">{{ rso.name }}</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4 mt-6" v-if="selectedRso">
                <label class="block text-sm font-medium text-gray-600">Selected RSO: {{ selectedRso }}</label>
            </div>

        
        <div class="grid grid-cols-1 gap-1 mt-6 sm:grid-cols-2 md:grid-cols-2">
            <button @click="deleteVendor" type="button"  class="text-white bg-btn hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
            <button @click="cancelUpload" type="button" class="text-btn bg-white hover:bg-blue-900 border-2 border-btn hover:text-white focus:outline-none focus:ring-0 focus:ring-blue-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cancel
            </button>
        </div>
    </section>
</template>
  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //import * as Global from '@/assets/js/Global'
  //import * as myfilter from '@/plugins/myfilter'
 // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        selectedRso: "",
        rsoName: [
            { id: 1, name: "RSO A" },
            { id: 2, name: "RSO B" },

        ],
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
        cancelUpload() {
            this.$emit('cancel-upload'); // Emit event to parent
        },
      // ...mapActions({
      //   //  getWGInitData: 'reservedaddetail/getWGInitData',
      // }),
      //   ...mapMutations({
      //   //resetEmail: 'office/RESET_EMAIL',
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
  
  
  