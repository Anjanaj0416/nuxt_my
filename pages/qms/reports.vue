<template>
  <section class="my-20 mx-10">
    <InvoiceDataSummeryReport v-if="reportNo === 'R901'" />
    <ReceiptDataSummaryReport v-if="reportNo === 'R902'" />
    <UnsettledAdvancesReport v-if="reportNo === 'R903'" />
    <DebtorOSReport v-if="reportNo === 'R904'" />
    <CommissionCalculationReport v-if="reportNo === 'R905'" />
    <CollectionSheetReport v-if="reportNo === 'R906'"/>
    <SalesKPIReport v-if="reportNo === 'R907'"/>
    <AllCommisionPaymentReport v-if="reportNo === 'R908'"/>
    
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import InvoiceDataSummeryReport from "~/components/qms/reports/InvoiceDataSummeryReport.vue";
import ReceiptDataSummaryReport from "~/components/qms/reports/ReceiptDataSummaryReport.vue";
import UnsettledAdvancesReport from "~/components/qms/reports/UnsettledAdvancesReport.vue";
import DebtorOSReport from "~/components/qms/reports/DebtorOSReport.vue";
import CommissionCalculationReport from "~/components/qms/reports/CommissionCalculationReport.vue";
import CollectionSheetReport from '~/components/qms/reports/CollectionSheetReport.vue';
import SalesKPIReport from '~/components/qms/reports/SalesKPIReport.vue';
import AllCommisionPaymentReport from '~/components/qms/reports/AllCommisionPaymentReport.vue';

// get current route
const route = useRoute();
const reportNo = ref(route.query.p || null);

// watch for route query param change (e.g., ?p=R902)
watch(
  () => route.query.p,
  (newVal) => {
    reportNo.value = newVal;
  }
);
</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>
