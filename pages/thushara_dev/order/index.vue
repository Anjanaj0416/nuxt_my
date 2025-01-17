<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
    <section class=" m-4">
        <div class="flex justify-between" >
        <div class=" text-lg font-bold">
           <div>Quotaion Details</div>
           <div class="lg:flex lg:gap-x-2  ">
               <span class="text-gray-500  text-sm">filter by -</span>
               <LinkBtn label="Approved Only"  @click="FilterByApprovedOnly" />      
               <LinkBtn label="View All"  @click="FilterViewAll" />                    
           </div>
          
        </div>
       
            <div class="flex  ">
               
                <div class="mr-2"><input type="text" class="cssBox"/></div>
                <div class="  mr-2"><Button class="w-24" label="Search" variant="primary" @click="GetSearch" /> </div>
                <div class="  mr-2"><Button class="w-24" label="New" variant="primary" @click="SetNewVendor" /> </div>
            </div>
       
    </div>

     <div v-for="objQu in listQuotation" :key="objQu" class="cssBox my-2" >
        <div class="grid grid-cols-1 lg:grid-cols-5  my-2 gap-2 ">         
         <div><lable title="Quotation Id" :value="objQu.QuotationId"/></div> 
         <div><lable title="Company" :value="objQu.company"/></div> 
         <div><lable title="Contact" :value="objQu.contact"/></div> 
         <div><lable title="Sales Ex." :value="objQu.rso"/></div> 
         <div><lable title="Total" :value="objQu.total"/></div>          
         <div><lable title="Status" :class="[objQu.status=='Approved' ? 'approved-class' : '']"  :value="objQu.status"/></div>    
         
        
         
    </div>

     <!--Approved Quotation view More Section -->
     <div class="grid grid-cols-1 lg:grid-cols-5  my-2 gap-2 " v-show="isViewMoreApprovedQua && curRow==objQu.id">   
        <div >
          <ImageLabelComp
      title="Apprval Proof"
      value=""
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjgYxVeutJQUYdquKGXwkYSdqM2UyBzlK0X2JdksLqkGNuiJqKz6Uy2DEfYtQBDFd8nA&usqp=CAU"
      imageCaption="Apprval Proof"
      imageLink="https://example.com/sample-image.jpg"
    />
        </div>
      </div>
         <!--End Approved Quotation view More Section -->
  
    <div class="grid grid-cols-2 gap-4  lg:flex lg:gap-x-4">
      <Button class="w-42" :label= "(curRow==objQu.id && !isViewMoreApprovedQua)?'View More':'View Less'" variant="primary" @click="isViewMoreApprovedQua=!isViewMoreApprovedQua;curRow=objQu.id"/>    
      <Button class="w-42" label="View Quatation" variant="primary"/>    
      <Button class="w-42" label="Upload Approval Proof" variant="primary"/>   
      <Button class="w-42" label="view Proforma" variant="primary"/>     
      <Button class="w-42" label="view Invoice" variant="primary"/> 
      <Button class="w-42" label="view Tax Invoice" variant="primary"/>  
      <Button class="w-42" label="View All Quo." variant="primary" @click="isViewAll=!isViewAll;curRow=objQu.id" /> 
       
    </div>

  <!--Not Approved Quotations view-->
   <div v-if="curRow==objQu.id && isViewAll">
    <div v-for="objQu in objQu.others" :key="objQu.id" class="cssBox my-2 bg-gray-200" >
        <div class="grid grid-cols-1 lg:grid-cols-5  my-2 gap-2 ">         
         <div><lable title="Quotation Id" :value="objQu.QuotationId"/></div> 
         <div><lable title="Company" :value="objQu.company"/></div> 
         <div><lable title="Contact" :value="objQu.contact"/></div> 
         <div><lable title="Sales Ex." :value="objQu.rso"/></div> 
         <div><lable title="Total" :value="objQu.total"/></div>          
         <div><lable title="Status"   :value="objQu.status"/></div>           
       
         
    </div>
    <div class="grid grid-cols-2 gap-4  lg:flex lg:gap-x-4">
         <Button class="w-42" label="View Quatation" variant="primary"/>    
         
    </div>
    </div>
  </div>
   <!--End Not Approved Quotations view-->
 </div> 
  

      
    </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
  </template>
  
  <script>
  import Lable from '~/components/thushara_dev/Lable'
  import Button from '~/components/thushara_dev/Button'
  import LinkBtn from '~/components/thushara_dev/Link'
  import ImageLabelComp from '~/components/thushara_dev/ImageLable';
  //import * as Global from '@/assets/js/Global'
  //import * as myfilter from '@/plugins/myfilter'
 // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {Lable,Button,LinkBtn,ImageLabelComp },
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        isViewAll:false,
        isViewMoreApprovedQua:false,
        curRow:-1,
        listQuotation:[
           {id:1,QuotationId:'QU202801001_v3', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'Approved', rso:'Saman [rso001]-0715321168',total:250000,
            others:[           
           {id:2,QuotationId:'QU202801001_v2', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'P ', rso:'Saman [rso001]-0715321168',total:250200},
           {id:3,QuotationId:'QU202801001_v1', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'P ', rso:'Saman [rso001]-0715321168',total:290000},
           ]
          },
          {id:4,QuotationId:'QU202801001_v3', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'Approved', rso:'Saman [rso001]-0715321168',total:250000,
            others:[           
           {id:5,QuotationId:'QU202801001_v2', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'P', rso:'Saman [rso001]-0715321168',total:253000},
           {id:6,QuotationId:'QU202801001_v1', company:'abans group of company [ABA0025]', contact:'Silva [0715321168]',status:'P', rso:'Saman [rso001]-0715321168',total:270000},
           ]
          },
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
      FilterByApprovedOnly(){
         alert('FilterByApprovedOnly')
      },
      FilterViewAll(){
        alert('FilterViewAll')
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
  
  <style >
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

  .approved-class{
    @apply bg-green-100  ;
  }

  .approved-class div{
    @apply  !text-green-800 ;
  }
  </style>
  
  
  