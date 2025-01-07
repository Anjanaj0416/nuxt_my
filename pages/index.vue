<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section>
    <!--   <div @click="showComp='login'" class="cursor-pointer">Login</div>
  <div @click="showComp='changelogin'" class="cursor-pointer">changelogin</div>
    <hr class="mt-12">
   <login v-if="showComp=='login'"/>
   <changelogin v-if="showComp=='changelogin'"/> -->
    
  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
import changelogin from '~/components/auth/changelogin'
import login from '~/components/auth/login'
//import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
//import { useSampleControllerStore } from '~/store/index';
definePageMeta({
    layout: 'default'
   });
export default {
 
  components: {login,changelogin},
  props:[''],
  data() {
    return {
      imageroot: process.env.Assets_83,
      showComp:'login',
    }
  },
  async mounted() {},
  watch: {},
  // computed: {
  //   // ...mapState({
  //   //   //loggeduser: (state) => state.loggeduser,
  //   // }),
  // },
  methods: {
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


