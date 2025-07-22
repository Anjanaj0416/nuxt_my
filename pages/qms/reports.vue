
<template>
    <section class="my-20 mx-10">
   
      <InvoiceDataSummeryReport v-if="reportNo=='R901'"/>
      <ReceiptDataSummaryReport v-if="DataSummaryReportNo=='R902'" />
      <UnsettledAdvancesReport v-if="AdvancesReportNo=='R903'"/>
      <DebtorOSReport v-if="OSReportNo=='R904'"/>
      <CommissionCalculationReport v-if="CalculationReportNo=='R905'"/> 

    </section>
  </template>
  
  <script>

 import InvoiceDataSummeryReport from "~/components/qms/reports/InvoiceDataSummeryReport.vue";
 import ReceiptDataSummaryReport from "~/components/qms/reports/ReceiptDataSummaryReport.vue";
 import UnsettledAdvancesReport from "~/components/qms/reports/UnsettledAdvancesReport.vue";
 import DebtorOSReport from "~/components/qms/reports/DebtorOSReport.vue";
 import CommissionCalculationReport from "~/components/qms/reports/CommissionCalculationReport.vue";

import { useRoute } from 'vue-router'


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {
      InvoiceDataSummeryReport,
      ReceiptDataSummaryReport,
      UnsettledAdvancesReport,
      DebtorOSReport,
      CommissionCalculationReport
    },
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        reportNo:'R901',
        DataSummaryReportNo:'R902',
        AdvancesReportNo:'R903',
        OSReportNo:'R904',
        CalculationReportNo:'R905',
       
      }
    },
    async mounted() {
     
    },
    async created() {

      const route = useRoute();
      this.reportNo  = route.query.p ;
      this.DataSummaryReportNo  = route.query.p ;


    },
    watch: {},
    computed: {
  
    },
    methods: {
     
    },
    async beforeMount() {

    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

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
  
  
  