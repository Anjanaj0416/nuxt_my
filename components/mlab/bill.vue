<template>
  <article>
    <div>
      <page size="bill" class="cssbill text-sm cssborder">
        <!-- Close Button -->
        <div
          class="flex justify-end mr-4 notToPrint cursor-pointer"
          @click="closeBill"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 hover:text-EF-green-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div class="px-2">
          <!-- Logo -->
          <img :src="assets_root + '/mlab/logo/' + bill.logo" class="w-full h-16" alt="Logo" />

          <!-- Bill Header -->
          <div class="text-center border-b-2 border-black">
            <div>{{ bill.address }}</div>
            <div>Hot Line - {{ bill.hotline }}</div>
          </div>

          <!-- Patient Info -->
          <div class="my-2 space-y-1">
            <div class="flex justify-between"><div>Bill No</div><div>{{ bill.billno }}</div></div>
            <div class="flex justify-between"><div>Name</div><div>{{ bill.name }}</div></div>
            <div class="flex justify-between"><div>Age</div><div>{{ bill.age }}</div></div>
            <div class="flex justify-between"><div>Sex</div><div>{{ bill.sex }}</div></div>
            <div class="flex justify-between"><div>Date</div><div class="text-xs">{{ bill.date }}</div></div>
            <div class="flex justify-between"><div>Time</div><div>{{ bill.time }}</div></div>
            <div class="flex justify-between"><div>Opr</div><div>{{ loggeduser.name }}</div></div>
          </div>

          <!-- Items -->
          <div class="flex justify-between border-b-2 border-black font-bold">
            <div>Description</div>
            <div>Amount</div>
          </div>
          <div v-for="(item, index) in bill.items" :key="index" class="flex justify-between">
            <div class="truncate">{{ item.description }}</div>
            <div>{{ $options.filters.toLKR(item.amount) }}</div>
          </div>

          <!-- Totals -->
          <div class="flex justify-between border-t-2 border-black font-bold">
            <div>Gross Total</div>
            <div>{{ $options.filters.toLKR(bill.grossTotal) }}</div>
          </div>
          <div class="flex justify-between font-bold">
            <div>Discount</div>
            <div>{{ $options.filters.toLKR(bill.discount) }}</div>
          </div>
          <div class="flex justify-between border-t-2 border-black font-bold">
            <div>Net Total</div>
            <div>{{ $options.filters.toLKR(bill.netTotal) }}</div>
          </div>
          <div class="flex justify-between">
            <div>Payment</div>
            <div class="border-b-2 border-black">{{ $options.filters.toLKR(bill.payment) }}</div>
          </div>
          <div class="flex justify-between" v-if="bill.balance >= 0">
            <div>Balance</div>
            <div class="border-b-4 border-double border-black">{{ $options.filters.toLKR(bill.balance) }}</div>
          </div>
          <div class="flex justify-between" v-if="bill.balance < 0">
            <div>Credit</div>
            <div class="border-b-4 border-double border-black">{{ $options.filters.toLKR(bill.balance) }}</div>
          </div>

          <!-- Footer -->
          <div class="text-center mt-4 border-t-2 border-black">Thank you - Come Again</div>
          <div class="text-center uppercase text-xs">Your health is our concern!!</div>
          <div class="text-center capitalize text-xs">easyappts.lk</div>
          <div class="text-center capitalize text-xs">070 505 2425</div>
        </div>
      </page>
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['bill'],
  data() {
    return {
      assets_root: process.env.McleAssets,
    }
  },
  computed: {
    ...mapState({
      loggeduser: (state) => state.loggeduser,
    }),
  },
  methods: {
    closeBill() {
      this.$emit('closebill')
    },
  },
}
</script>

<style scoped>
div {
  line-height: 13px !important;
}

.notToPrint {
}

@media print {
  .notToPrint {
    visibility: hidden;
  }
}
</style>
