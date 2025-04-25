<template>
  <section>
    <div class="">
    <div class="flex-none md:flex  gap-x-4 ">
        
        <div class="justify-between"> 
           <div class="cssTitle"> Out Time </div> <div><input type="time" class="cssbox" v-model="outBoundDetails.request.outTime" /></div>
        </div>
        <div>
            <div class="cssTitle">Required Time</div> <div class="flex gap-x-2 cssbox">
              <input type="text" class="px-1 cssboxMin" v-model="outBoundDetails.request.requredTimeHrs" size=3 oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/> H :
              <input type="text" class="px-1 cssboxMin" v-model="outBoundDetails.request.requredTimeMin" size=3 oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/> M
            </div>
        </div>
        <div>
           <div class="cssTitle"> Purpose/Reason</div><div><textarea  rows="2" class="cssbox w-full md:w-64" v-model="outBoundDetails.request.reason"/></div>
        </div>
        <div class="mt-0 md:mt-6">
            <button class="cssbox cssbtn" @click="SumbitForApproval">Submit Approval</button>
        </div>
        </div>

        <div class="cssError ">

        </div>
        
    </div>
  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  components: {},
  props:['arrParams'],
  data() {
    return {
      imageroot: process.env.Assets_83,      
    }
  },
  async mounted() {},
  watch: {},
  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //    outBoundDetails: (state) => state.hr.outBoundDetails,
    // }),
  },
  methods: {
    // ...mapActions({
    //     setOutBoundRequest: 'hr/setOutBoundRequest',
    // }),
    //   ...mapMutations({
    //   //resetEmail: 'office/RESET_EMAIL',
    //    showMessage: 'PUSH_NOTIFICATION',
    // }),
    //  this.processing_year = new Date().getFullYear()
     //this.$emit('Load_MonthlyBrakeDown',req)
     //this.$refs.catcomp.initCategoryItem(-1)
     //this.$emit('input', this.selected_item.trim());
  show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
     show_msg(msg) {
      this.showMessage({
        type: 'success',
        message: msg,
      })
    },
    async SumbitForApproval(){
         if(this.validate() && confirm('Sure to Apply your request?') ){        
         
         if(this.loggeduser.id==-1){
          this.loggeduser.username = this.arrParams[4];
          }
           await this.setOutBoundRequest({user:this.loggeduser,outBoundDetails:this.outBoundDetails.request});
           this.$emit('RefreshOutBound')
         }
    },
    validate(){
        let isOK = true;
       if(this.outBoundDetails.request.requestrequredTimeHrs==''){ this.show_error('Invalid requred Time - Hours');isOK=false;}
       if(this.outBoundDetails.request.outTime==''){ this.show_error('Invalid OutTime');isOK=false;}
       if(this.outBoundDetails.request.requredTimeHrs==''){ this.show_error('Invalid requred Time - Hours');isOK=false;}
       if(this.outBoundDetails.request.requredTimeMin==''){ this.show_error('Invalid requred Time - Minutes');isOK=false;}       
       if(this.outBoundDetails.request.reason==''){ this.show_error('Invalid Outbound Reason');isOK=false;}       
       return isOK;
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
      title: 'Digital Services - SLTDS',
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
.cssbox{
  border: 1px solid;
  @apply border-gray-600 rounded p-1 ;  
}

.cssboxMin{
  border: 1px solid;
  @apply border-gray-600 rounded ; 
}

.cssbtn{
   @apply cursor-pointer text-center mt-2;   
}
.cssbtn:hover{
    @apply bg-blue-200;
}

input[type=time]::-webkit-datetime-edit-ampm-field {
  display: none;
}

.cssTitle{
    @apply text-gray-700 text-sm;
}
</style>


  