<template>
  <section class="bg-white mt-16 flex w-full px-2">
    <div class="cssbox m-auto w-full md:w-3/4">
      <div class="text-sm md:text-lg text-gray-600 capitalize text-xl">
        <b>My Account Details</b>
      </div>

      <div class="csstable w-full md:w-3/4 my-4">
        <!-- Table Header -->
        <div
          class="cssheader flex gap-x-4 justify-between px-4 lg:px-1 md:grid md:grid-cols-6 bg-gray-300 border-2 border-gray-500 my-1 text-center text-xs md:text-sm rounded"
        >
          <div>Date</div>
          <div>Type</div>
          <div>Debt</div>
          <div>Credit</div>
          <div>Balance</div>
          <div></div>
        </div>

        <!-- Table Body -->
        <div v-for="ma in myaccountdetails" :key="ma">
          <div
            class="cssbody flex gap-x-4 justify-between px-4 lg:px-0 md:grid md:grid-cols-6 border-2 my-1 border-gray-500 text-center rounded text-xs md:text-sm"
            :class="{'bg-blue-300': ma.type === 'Payment'}"
          >
            <div>{{ getFormatDate(ma.date) }}</div>
            <div>{{ ma.type }}</div>
            <div>{{ $options.filters.toLKR(ma.debt) }}</div>
            <div>{{ $options.filters.toLKR(ma.credit) }}</div>
            <div>{{ $options.filters.toLKR(ma.balance) }}</div>
            <div class="cursor-pointer">
              <a
                v-if="ma.type === 'Periodic'"
                :href="`${assets_root}/mlab/monthendinvoices/${ma.bpacode}/${ma.invpdf}`"
                target="_blank"
                title="View Invoice PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as Global from '@/assets/js/Global'

export default {
  layout: 'default',
  data() {
    return {
      assets_root: process.env.McleAssets,
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      myaccountdetails: state => state.report.myaccountdetails,
    }),
    getFormatDate() {
      return dt => (dt ? Global.getDateFormat1(new Date(dt)) : '')
    },
    getMonthName() {
      return monthnum => Global.getMonthNames()[monthnum - 1]
    },
  },
  methods: {
    ...mapActions({ getMyAccountDetails: 'report/getMyAccountDetails' }),
    ...mapMutations({ showMessage: 'PUSH_NOTIFICATION' }),
  },
  async mounted() {
    if (['superuser', 'admin'].includes(this.loggeduser.usergroup)) {
      await this.getMyAccountDetails({ user: this.loggeduser })
    } else {
      this.showMessage({ type: 'Failed', message: 'Not Allowed to access this page' })
      this.$router.push('/')
    }
  },
  head() {
    return { title: 'My Payments' }
  },
}
</script>

<style scoped>
page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
}

page[size='A4'] {
  width: 21cm;
  height: 29.7cm;
}

page[size='A4'][layout='portrait'] {
  width: 29.7cm;
  height: 21cm;
  box-shadow: none;
}

@media print {
  .notToPrint {
    display: none;
  }
}
</style>
