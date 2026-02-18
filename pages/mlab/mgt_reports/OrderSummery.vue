<template>
  <section class="mt-12 px-4">

    <!-- Dashboard Tiles -->
    <div v-if="activeSection === 'dashboard'" class="h-screen flex lg:items-center w-screen">
      <div class="csstile grid grid-cols-1 lg:grid-cols-3 w-1/2 h-64 gap-y-4 mx-auto mt-8 lg:mt-0">
        <div class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer" @click="navigate('testsummery')">
          <div class="font-thin text-sm pt-4">Day Tests</div>
          <div class="text-2xl font-thin">{{ dboard.count_day_tests }}</div>
        </div>
        <div class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer" @click="navigate('cashcollection')">
          <div class="font-thin text-sm pt-4">Day Sales</div>
          <div class="text-2xl font-thin">{{ $options.filters.toLKR(dboard.day_sales) }}</div>
        </div>
        <div class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer" @click="navigate('incomereport')">
          <div class="font-thin text-sm pt-4">Day Income</div>
          <div class="text-2xl font-thin">{{ $options.filters.toLKR(dboard.day_income) }}</div>
        </div>
      </div>
    </div>

    <!-- Cash Collection Report -->
    <div v-if="activeSection === 'cashcollection'" class="csshead">
      <div class="w-full">
        <div class="flex items-center">
          <div class="mx-auto text-center">
            <div>
              <img :src="assets_root + '/mlab/logo/' + company.logo" class="w-32 h-16 mx-auto" alt="" />
            </div>
            <div class="text-xl">{{ company.address1 }} {{ company.address2 }}</div>
            <div class="text-xl">{{ company.address3 }}</div>
            <div class="text-sm">HotLine - {{ company.phone }}</div>
            <div class="text-xl lg:text-3xl">Tests - Cash Collection</div>
            <div class="notToPrint">
              <div class="cssSearch my-4 lg:my-0 lg:absolute lg:top-0 lg:right-0 lg:p-4">
                <datediff @click="loadCashCollectionReport" />
              </div>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-EF-blue w-full mt-2"></div>

        <div v-for="labreportdata in cashcollectionReportData" :key="labreportdata" class="my-8">
          <!-- Inside / Outside collection -->
          <div v-if="labreportdata.collection === 'inside'">
            <div class="shadow-outline bg-EF-blue text-white my-2 p-2 w-full lg:w-1/4 rounded text-sm">
              <div class="flex"><div class="w-32 text-sm">Laboratory</div><div class="font-thin text-sm">{{ labreportdata.labname }}</div></div>
              <div class="flex"><div class="w-32 text-sm">Period</div><div class="font-thin text-sm">{{ getReportDate(dtfrom) }} - {{ getReportDate(dtto) }}</div></div>
              <div class="flex"><div class="w-32 text-sm">No of Tests Done</div><div class="font-thin text-sm">{{ labreportdata.reportcount }}</div></div>
            </div>

            <div class="csstbheading grid grid-cols-4 lg:grid-cols-9 rounded bg-EF-blue text-white p-1 my-4">
              <div>Date</div><div>Ref. No</div><div>Patient Name</div><div>Age</div><div>Report Name</div><div>State</div><div>SystemUser</div><div>Paid</div><div>Amount(Rs.)</div>
            </div>

            <div v-for="row in labreportdata.alReportBrakeup" :key="row">
              <div class="csstbcontent grid grid-cols-4 mt-1 lg:grid-cols-9 rounded border-b-2 border-EF-green-300">
                <div>{{ getReportDate(row.date) }}</div>
                <div>{{ row.refno }}</div>
                <div style="text-align: left">{{ row.name }}</div>
                <div style="text-align: left">{{ row.age }}</div>
                <div style="text-align: left">{{ row.reportname }}</div>
                <div>{{ row.status }}</div>
                <div>{{ row.systemuser }}</div>
                <div>{{ row.state }}</div>
                <div style="text-align: right">{{ $options.filters.toLKR(row.amount) }}</div>
              </div>
            </div>

            <div class="grid grid-cols-4 mt-1 lg:grid-cols-8 rounded border-b-2 border-EF-green-300">
              <div></div><div></div><div></div><div></div><div></div><div></div>
              <div class="text-red-600 font-bold text-center">Total</div>
              <div class="text-red-600 font-bold text-right">{{ $options.filters.toLKR(labreportdata.totalcollection) }}</div>
            </div>
          </div>

          <!-- Outside collection -->
          <div v-if="labreportdata.collection === 'outside'">
            <div class="shadow-outline bg-EF-blue text-white my-2 p-2 w-full lg:w-1/4 rounded text-sm">
              <div class="flex"><div class="w-32 text-sm">Laboratory</div><div class="font-thin text-sm">{{ labreportdata.labname }}</div></div>
              <div class="flex"><div class="w-32 text-sm">Period</div><div class="font-thin text-sm">{{ getReportDate(dtfrom) }} - {{ getReportDate(dtto) }}</div></div>
              <div class="flex"><div class="w-32 text-sm">No of Tests Done</div><div class="font-thin text-sm">{{ labreportdata.reportcount }}</div></div>
            </div>

            <div class="csstbheading grid grid-cols-4 lg:grid-cols-11 rounded bg-EF-blue text-white p-1 my-4">
              <div>Date</div><div>Ref. No</div><div>Oth. Lab. Ref</div><div>Patient Name</div><div>Age</div><div>Report Name</div><div>State</div><div>SystemUser</div><div>Paid</div><div>Amount(Rs.)</div><div>Commision</div>
            </div>

            <div v-for="row in labreportdata.alReportBrakeup" :key="row">
              <div class="csstbcontent grid grid-cols-4 mt-1 lg:grid-cols-11 rounded border-b-2 border-EF-green-300">
                <div>{{ getReportDate(row.date) }}</div>
                <div>{{ row.refno }}</div>
                <div>{{ row.otherlabref }}</div>
                <div style="text-align: left">{{ row.name }}</div>
                <div style="text-align: left">{{ row.age }}</div>
                <div style="text-align: left">{{ row.reportname }}</div>
                <div>{{ row.status }}</div>
                <div>{{ row.systemuser }}</div>
                <div>{{ row.state }}</div>
                <div style="text-align: right">{{ $options.filters.toLKR(row.amount) }}</div>
                <div style="text-align: right">{{ $options.filters.toLKR(row.commision) }}</div>
              </div>
            </div>

            <div class="grid grid-cols-4 mt-1 lg:grid-cols-11 rounded border-b-2 border-EF-green-300">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div class="text-red-600 font-bold text-center">Total</div>
              <div class="text-red-600 font-bold text-right">{{ $options.filters.toLKR(labreportdata.totalcollection) }}</div>
              <div class="text-red-600 font-bold text-right">{{ $options.filters.toLKR(labreportdata.totalCommision) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Summary Report -->
    <div v-if="activeSection === 'ordersummary'" class="csshead">
      <div class="w-full">
        <div class="flex items-center">
          <div class="mx-auto text-center">
            <div>
              <img :src="assets_root + '/mlab/logo/' + company.logo" class="w-32 h-16 mx-auto" alt="" />
            </div>
            <div class="text-xl">{{ company.address1 }} {{ company.address2 }}</div>
            <div class="text-xl">{{ company.address3 }}</div>
            <div class="text-sm">HotLine - {{ company.phone }}</div>
            <div class="text-xl lg:text-3xl">Order Summery Report</div>
            <div class="notToPrint">
              <div class="cssSearch my-4 lg:my-0 lg:absolute lg:top-0 lg:right-0 lg:p-4">
                <datediff @click="loadOrderSummaryReport" />
              </div>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-EF-blue w-full mt-2"></div>

        <div class="my-4 cssBorder w-full grid grid-cols-2 lg:grid-cols-9 gap-4">
          <div v-for="detOrdCount in orderSummeryReportData.alDayOrderCount" :key="detOrdCount">
            <div class="text-center bg-EF-blue p-4 rounded text-white border-2 border-EF-blue">
              <div class="text-xl">{{ detOrdCount.day }}</div>
              <div class="text-sm text-blue-500">Orders - {{ detOrdCount.noOfOrders }}</div>
              <div class="text-sm text-gray-500">Tests - {{ detOrdCount.noOfTests }}</div>
              <div class="text-blue-500 text-xl border-gray-600 border-t-2 my-2 pt-4">{{ $options.filters.toLKR(detOrdCount.income) }}</div>
            </div>
          </div>
        </div>

        <div class="csstbheading grid grid-cols-4 lg:grid-cols-9 rounded bg-EF-blue text-white p-1 my-4">
          <div>BillNo</div><div>OrderDate</div><div>Patient Name</div><div>Contact</div>
          <div>NoOfTests</div><div>GrossTotal(Rs.)</div><div>Discount(Rs.)</div><div>NetTotal(Rs.)</div><div>TestDoneBy</div>
        </div>

        <div v-for="order in orderSummeryReportData.alorders" :key="order">
          <div class="csstbcontent grid grid-cols-4 mt-1 lg:grid-cols-9 rounded border-b-2 border-EF-green-300">
            <div>{{ order.billNo }}</div>
            <div>{{ getReportDate(order.orderDate) }}</div>
            <div style="text-align: left">{{ order.pateintName }}</div>
            <div>{{ order.pateintContact }}</div>
            <div>{{ order.noOfTest }}</div>
            <div style="text-align: right">{{ $options.filters.toLKR(order.grossTotal) }}</div>
            <div style="text-align: right">{{ $options.filters.toLKR(order.discount) }}</div>
            <div style="text-align: right">{{ $options.filters.toLKR(order.netTotal) }}</div>
            <div>{{ order.testDoneBy }}</div>
          </div>
        </div>

        <div class="csstbcontent grid grid-cols-4 mt-1 lg:grid-cols-9 rounded border-b-2 border-EF-green-300 text-red-600">
          <div></div><div></div><div></div><div><b>Total</b></div>
          <div><b>{{ orderSummeryReportData.totalTests }}</b></div>
          <div style="text-align: right"><b>{{ $options.filters.toLKR(orderSummeryReportData.totalGross) }}</b></div>
          <div style="text-align: right"><b>{{ $options.filters.toLKR(orderSummeryReportData.totalDiscount) }}</b></div>
          <div style="text-align: right"><b>{{ $options.filters.toLKR(orderSummeryReportData.totalNet) }}</b></div>
          <div></div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as myfilter from '@/plugins/myfilter'
import * as global from '@/assets/js/Global'
import datediff from '~/components/customcontrol/datediff'
import selectinput2 from '~/components/customcontrol/selectinput2_report'

export default {
  components: { datediff, selectinput2 },
  data() {
    return {
      assets_root: process.env.McleAssets,
      dtfrom: '',
      dtto: '',
      activeSection: 'dashboard',
      dboard: {
        count_day_tests: 34,
        day_sales: 250000,
        day_income: 225000,
      },
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      company: state => state.company,
      cashcollectionReportData: state => state.report.cashcollectionReportData,
      orderSummeryReportData: state => state.report.orderSummeryReportData,
    }),
    getReportDate() {
      return (date) => global.getDateFormat1(new Date(date))
    },
  },
  methods: {
    navigate(sec) {
      if (sec === 'testsummery') this.activeSection = 'cashcollection'
      else if (sec === 'cashcollection') this.activeSection = 'cashcollection'
      else if (sec === 'incomereport') this.activeSection = 'ordersummary'
    },
    ...mapActions({
      getCashCollectionReportData: 'report/getCashCollectionReportData',
      getOrderSummeryReportData: 'report/getOrderSummeryReportData',
    }),
    ...mapMutations({
      resetCashCollection: 'report/RESET_CASH_COLLECTION',
      resetOrderSummery: 'report/RESET_ORDER_SUMMERY',
    }),
    async loadCashCollectionReport(datediff) {
      this.resetCashCollection()
      this.dtfrom = datediff.dtfrom
      this.dtto = datediff.dtto
      await this.getCashCollectionReportData({
        from_date: this.dtfrom,
        to_date: this.dtto,
        user: this.loggeduser,
      })
    },
    async loadOrderSummaryReport(datediff) {
      this.resetOrderSummery()
      this.dtfrom = datediff.dtfrom
      this.dtto = datediff.dtto
      await this.getOrderSummeryReportData({
        from_date: this.dtfrom,
        to_date: this.dtto,
        user: this.loggeduser,
      })
    },
  },
  async mounted() {
    const date = new Date()
    this.dtfrom = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1))
    this.dtto = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    await this.getCashCollectionReportData({ from_date: this.dtfrom, to_date: this.dtto, user: this.loggeduser })
    await this.getOrderSummeryReportData({ from_date: this.dtfrom, to_date: this.dtto, user: this.loggeduser })
  },
  head() {
    return { title: 'Management Reports' }
  },
}
</script>

<style scoped>
.csstbheading > div,
.csstbcontent > div {
  @apply text-center font-thin;
}

.csshead {
  @apply mt-12 px-4 relative;
}

.csstile > div {
  @apply p-4 shadow-outline rounded-md h-32 w-32 text-center items-center;
}

@media print {
  .notToPrint { visibility: hidden; display: none; }
  .csshead { @apply mt-0; }
  .csstbheading { @apply border-2 border-black; }
  .csstbheading, .csstbcontent { @apply grid-cols-8; }
  .cssBorder { @apply border-gray-200 rounded; border-width: 1px; }
}
</style>
