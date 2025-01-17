<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
    <section class=" m-4">
        <div class="flex justify-between" >
        <div class=" text-lg font-bold">
           <div>Vendor Details</div>
           <div class="lg:flex lg:gap-x-2  ">
               <span class="text-gray-500  text-sm">filter by -</span>
               <LinkBtn label="Open Vendors"  @click="FilterByOpenVenders" />               
           </div>
          
        </div>
       
            <div class="flex  ">
               
                <div class="mr-2"><input type="text" class="cssBox"/></div>
                <div class="  mr-2"><Button class="w-24" label="Search" variant="primary" @click="GetSearch" /> </div>
                <div class="  mr-2"><Button class="w-24" label="New" variant="primary" @click="SetNewVendor" /> </div>
            </div>
       
    </div>

     <div v-for="objV in listVendorPool" :key="objV.id" class="cssBox my-2" >
        <div class="grid grid-cols-1 lg:grid-cols-5  my-2 gap-2 ">         
         <div><lable title="CustomerRef" :value="objV.customerRef"/></div> 
         <div><lable title="Name" :value="objV.name"/></div> 
         <div><lable title="Contact" :value="objV.contact"/></div> 
         <div><lable title="Business Type" :value="objV.businessType"/></div> 
         <div><lable title="RSO" :value="objV.rso"/></div>         
    </div>
    <div class="grid grid-cols-2 gap-4  lg:flex lg:gap-x-4">
        <Button class="w-42" label="View More" variant="primary" @click="ViewMore" />
        <Button class="w-24" label="AssignRSO" variant="primary" @click="GetAssignRSO" />
        <Button class="w-42" label="Quatations" variant="primary" @click="GetCreateQuatation" />       
        <Button class="w-42" label="View Quatations" variant="primary" @click="GetCreateQuatation" />       
        <Button class="w-42" label="Delete" variant="danger" @click="GetDelete" />
    </div>
 </div> 
  

      
    </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
  </template>
  
  <script>
  import Lable from '~/components/thushara_dev/Lable'
  import Button from '~/components/thushara_dev/Button'
  import LinkBtn from '~/components/thushara_dev/Link'
  //import * as Global from '@/assets/js/Global'
  //import * as myfilter from '@/plugins/myfilter'
 // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {Lable,Button,LinkBtn },
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        listVendorPool:[
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
           {id:1,customerRef:'AES002', name:'abans group of company', contact:'Silva [0715321168]',businessType:'Hardware', rso:'Saman [rso001]-0715321168'},
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
        GetAssignRSO(){
            alert('GetAssignRSO');
        },
        GetSearch(){
            alert('GetSearch');
        },
        GetCreateQuatation(){
            alert('GetCreateQuatation');
        },
        FilterByOpenVenders(){
            alert('FilterByOpenVenders');
        },
        SetNewVendor(){
            alert('SetNewVendor');
        }
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
    @apply border-blue-600 rounded p-2;
  }
  </style>
  
  
  