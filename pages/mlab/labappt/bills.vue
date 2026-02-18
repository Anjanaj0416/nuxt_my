<template>
  <section>
    <div class="cssbox">
      <!-- Bill List View -->
      <div class="m-auto w-full md:w-1/4 rounded" v-if="cur_view === 'bill_list'">
        <div class="text-center text-3xl py-4 uppercase flex justify-between mx-4">
          <b>Bill View</b>
          <div
            @click="getRefresh"
            class="mt-3 cursor-pointer transform hover:scale-125"
            title="Refresh Bills"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
          </div>
        </div>

        <div class="h-screen overflow-y-scroll">
          <div v-for="bill in alPendingBills" :key="bill.billno" class="border-2 border-blue-800 px-4 w-full rounded-lg mb-2">
            <div class="flex justify-between">
              <div>
                <div class="text-gray-600 text-base">Name</div>
                <b>{{ bill.title }}.{{ bill.name }}</b>
              </div>
              <div>
                <div class="text-gray-600 text-base">Mobile</div>
                <b>{{ bill.contact }}</b>
              </div>
            </div>
            <div class="flex py-4 text-center">
              <div class="m-auto">
                <div class="text-gray-600 text-base">{{ bill.date }} | Bill No</div>
                <p class="text-5xl tracking-wider"><b>{{ bill.billno }}</b></p>
              </div>
            </div>
            <div class="flex pb-4 justify-center gap-x-4">
              <div class="cursor-pointer shadow-outline rounded p-1" title="View Bill" @click="viewBill(bill.billno)">View</div>
              <div class="cursor-pointer shadow-outline rounded p-1" title="Print Bill" @click="printBill(bill.billno)">Print</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bill Detail View -->
      <article class="w-screen bg-white absolute top-0 left-0" v-show="cur_view === 'bill'">
        <bill :bill="bill" @closebill="closebill" />
      </article>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bill from '~/components/mlab/bill'

export default {
  layout: 'default',
  components: { bill },
  data() {
    return {
      cur_view: 'bill_list',
      imageroot: process.env.Assets_83,
    }
  },
  computed: {
    ...mapState({
      loggeduser: (state) => state.loggeduser,
      alPendingBills: (state) => state.labappt.alPendingBills,
      bill: (state) => state.labappt.bill,
    }),
  },
  methods: {
    ...mapActions({
      getPendingBills: 'labappt/getPendingBills',
      getBillDetails: 'labappt/getBillDetails',
    }),
    closebill() {
      this.cur_view = 'bill_list'
    },
    async viewBill(bill_no) {
      await this.getBillDetails({ user: this.loggeduser, billno: bill_no })
      this.cur_view = 'bill'
    },
    async printBill(bill_no) {
      await this.getBillDetails({ user: this.loggeduser, billno: bill_no })
      this.cur_view = 'bill'
      setTimeout(() => window.print(), 1000)
    },
    async getRefresh() {
      await this.getPendingBills({ user: this.loggeduser })
    },
  },
  async beforeMount() {
    await this.getRefresh()
  },
  head() {
    return {
      title: 'EasyAppts',
    }
  },
}
</script>

<style scoped>
.cssbox {
  @apply mt-16 mx-4 flex;
}
@media print {
  .cssbox {
    @apply mt-0 mx-0 flex-none;
  }
  @page {
    margin: 0;
    padding: 0;
  }
  .cssbill {
    @apply mt-0;
  }
  .cssborder {
    @apply border-0 py-0;
  }
}
</style>
