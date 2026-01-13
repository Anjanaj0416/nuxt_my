<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
    <section class="my-20 mx-10">
   
      <overtime_individual_summery_report v-if="reportNo=='R1001'"/>
      <overtime_monthend_summery_report v-if="reportNo=='R1002'"/>
      <daily_attendance_report v-if="reportNo=='R1003'"/>
      <employee_rectification_report v-if="reportNo=='R1004'"/>
      <employee_leave_annual_report v-if="reportNo=='R1005'"/>
      <timeCard_summery_report v-if="reportNo=='R1007'"/>
      <noPay_monthly_report v-if="reportNo=='R1009'"/>
      <get_month_end_attendance_sheet_type1 v-if="reportNo=='R1012'"/>
      <get_month_end_attendance_sheet_type2 v-if="reportNo=='R1013'"/>
    </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
  </template>
  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //// import * as Global from '@/assets/js/Global'
  ////import * as myfilter from '@/plugins/myfilter'
 //import Swal from 'sweetalert2';
 //import { useSampleStore  } from '~/stores/modules/sampleStore';
 //import { useRoute } from 'vue-router'
 //import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 

import overtime_individual_summery_report from "~/components/hr/reports/overtime_individual_summery_report";
import overtime_monthend_summery_report from "~/components/hr/reports/overtime_monthend_summery_report";
import daily_attendance_report from "~/components/hr/reports/daily_attendance_report";
import employee_rectification_report from "~/components/hr/reports/employee_rectification_report";
import employee_leave_annual_report from "~/components/hr/reports/employee_leave_annual_report";
import timeCard_summery_report from "~/components/hr/reports/timeCard_summery_report";
import noPay_monthly_report from "~/components/hr/reports/noPay_monthly_report";
import get_month_end_attendance_sheet_type1 from "~/components/hr/reports/get_month_end_attendance_sheet_type1";
import get_month_end_attendance_sheet_type2 from "~/components/hr/reports/get_month_end_attendance_sheet_type2";
import { useRoute } from 'vue-router'

 //import LinkBtn from "~/components/customcontrol/Link";
 // import Button from "~/components/customcontrol/Button";
 // import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {
      overtime_individual_summery_report,
      overtime_monthend_summery_report,
      daily_attendance_report,
      employee_rectification_report,
      employee_leave_annual_report,
      timeCard_summery_report,
      noPay_monthly_report,
      get_month_end_attendance_sheet_type1,
      get_month_end_attendance_sheet_type2
    },//LinkBtn,Button,selectinput2

    props:[''],

    data() {
      return {
        imageroot: "",
        showLoading: null,
        reportNo:'R1001',
       
      }
    },

    setup() {
      const route = useRoute();
      return { route };
    },

    async mounted() {
     
    },
    async created() {
    //  this.userStore = useUserStore();
      //this.showLoading = this.$showLoading;
     // this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    const route = useRoute();
    this.reportNo  = route.query.p || 'R1001';

    },
    watch: {
      'route.query.p': {
      immediate: true, // Trigger immediately on mount
      handler(newVal) {
        this.reportNo = newVal || 'R1001'; // Update reportNo when query param changes
      },
    },
    },
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
  
  
  