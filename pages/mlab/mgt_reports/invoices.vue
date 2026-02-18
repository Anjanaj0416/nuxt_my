<template>
  <section class="mt-16 px-4">
    <!-- Header -->
    <div class="my-4 flex gap-x-4 justify-between items-center">
      <div class="text-xl">Monthly Payments</div>
      <div
        class="font-bold text-center shadow-outline p-1 rounded h-8 bg-blue-300 cursor-pointer hover:bg-blue-700 hover:text-white"
        title="Refresh the report"
        @click="LoadReport"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </div>

    <!-- Outstanding Payment -->
    <div class="text-sm mb-4">
      <div>
        Out Standing Payment - 
        <span class="font-bold">{{ $options.filters.toLKR(payment.outstanding) }}</span>
      </div>
      <div v-if="payment.outstanding > 0">
        Due Date - 
        <span class="font-bold">{{ getReportDate(payment.duedate) }}</span>
      </div>
    </div>

    <!-- Invoice Table -->
    <div class="cssInvoices">
      <div class="grid grid-cols-6 text-center w-full text-black bg-blue-300 shadow-outline rounded-t-md p-1">
        <div>Invoice Number</div>
        <div>Month</div>
        <div>Description</div>
        <div>Total</div>
        <div>Status</div>
        <div></div>
      </div>

      <div v-for="inv in payment.invoices" :key="inv.invoiceNo" class="grid grid-cols-6 w-full text-black shadow-outline mt-2 rounded text-center text-sm">
        <div class="my-2">{{ inv.invoiceNo }}</div>
        <div class="my-2">{{ getMonthName(inv.month) }} {{ inv.year }}</div>
        <div class="my-2">{{ inv.description }}</div>
        <div class="my-2">{{ $options.filters.toLKR(inv.total) }}</div>
        <div class="my-2">{{ inv.status }}</div>
        <div>
          <div class="cursor-pointer border-2 shadow-outline px-2 my-2 rounded w-32 hover:bg-blue-400">
            Invoice Print
          </div>
        </div>
      </div>
    </div>

    <!-- Pay To Bank Section -->
    <div class="bg-blue-300 p-4 my-4 -mx-4">
      <div class="text-xl uppercase mb-2">Pay To Bank</div>

      <div class="shadow-outline p-4 my-2 rounded">
        <div><span class="text-sm">Bank Name :</span> <span class="font-bold">{{ payment.payToBank.bankName }}</span></div>
        <div><span class="text-sm">Bank Account Name :</span> <span class="font-bold">{{ payment.payToBank.accName }}</span></div>
        <div><span class="text-sm">Bank Account Number :</span> <span class="font-bold">{{ payment.payToBank.accNumber }}</span></div>
        <div><span class="text-sm">Pay Reference Number :</span> <span class="font-bold">{{ payment.payToBank.refNumber }}</span></div>
        <div class="mt-2 font-thin italic">
          Do not hesitate to contact us for any clarifications: {{ payment.payToBank.contact }}
        </div>
      </div>

      <!-- Payment Slip Image -->
      <div class="my-4">
        <img class="w-full" :src="assets_root + '/Miracle/payment/' + payment.payToBank.slipImage" alt="PaySlip" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import * as global from '@/assets/js/Global'

export default {
  data() {
    return {
      assets_root: process.env.McleAssets,
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      payment: state => state.report.payment,
    }),
    getMonthName() {
      return month => global.getMonthName(month)
    },
    getReportDate() {
      return date => global.getDateFormat1(new Date(date))
    },
  },
  methods: {
    LoadReport() {
      alert('Report refreshed')
    },
  },
}
</script>

<style scoped>
.cssInvoices > div {
  @apply text-center font-thin;
}
</style>
