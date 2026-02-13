<template>
  <section class="csshead">
    <!-- Header -->
    <div class="w-full text-center">
      <img :src="assets_root + '/mlab/logo/' + company.logo" class="w-32 h-16 mx-auto" alt="logo" />
      <div class="text-xl">{{ company.address1 }} {{ company.address2 }}</div>
      <div class="text-xl">{{ company.address3 }}</div>
      <div class="text-sm">HotLine - {{ company.phone }}</div>
      <div class="text-xl lg:text-3xl">Tests - Cash Collection</div>

      <!-- Date Picker -->
      <div class="notToPrint absolute top-0 right-0 p-4">
        <datediff @click="loadReport" />
      </div>
    </div>

    <div class="border-t-2 border-EF-blue w-full mt-2"></div>

    <!-- Reports -->
    <div v-for="labreportdata in cashcollectionReportData" :key="labreportdata.labname" class="my-8">
      
      <!-- Report Card -->
      <div class="shadow-outline bg-EF-blue text-white my-2 p-2 w-full lg:w-1/4 rounded text-sm">
        <div class="flex">
          <div class="w-32 text-sm">Laboratory</div>
          <div class="font-thin text-sm">{{ labreportdata.labname }}</div>
        </div>
        <div class="flex">
          <div class="w-32 text-sm">Period</div>
          <div class="font-thin text-sm">{{ getReportDate(dtfrom) }} - {{ getReportDate(dtto) }}</div>
        </div>
        <div class="flex">
          <div class="w-32 text-sm">No of Tests Done</div>
          <div class="font-thin text-sm">{{ labreportdata.reportcount }}</div>
        </div>
      </div>

      <!-- Table Header -->
      <div
        :class="[
          'csstbheading grid grid-cols-4 lg:grid-cols-' + (labreportdata.collection === 'inside' ? 9 : 11),
          'rounded bg-EF-blue text-white p-1 my-4'
        ]"
      >
        <div>Date</div>
        <div>Ref. No</div>
        <div v-if="labreportdata.collection === 'outside'">Oth. Lab. Ref</div>
        <div>Patient Name</div>
        <div>Age</div>
        <div>Report Name</div>
        <div>State</div>
        <div>SystemUser</div>
        <div>Paid</div>
        <div>Amount(Rs.)</div>
        <div v-if="labreportdata.collection === 'outside'">Commision</div>
      </div>

      <!-- Table Rows -->
      <div v-for="row in labreportdata.alReportBrakeup" :key="row.refno">
        <div
          :class="[
            'csstbcontent grid grid-cols-4 mt-1 rounded border-b-2 border-EF-green-300',
            'lg:grid-cols-' + (labreportdata.collection === 'inside' ? 9 : 11)
          ]"
        >
          <div>{{ getReportDate(row.date) }}</div>
          <div>{{ row.refno }}</div>
          <div v-if="labreportdata.collection === 'outside'">{{ row.otherlabref }}</div>
          <div class="text-left">{{ row.name }}</div>
          <div class="text-left">{{ row.age }}</div>
          <div class="text-left">{{ row.reportname }}</div>
          <div>{{ row.status }}</div>
          <div>{{ row.systemuser }}</div>
          <div>{{ row.state }}</div>
          <div class="text-right">{{ $options.filters.toLKR(row.amount) }}</div>
          <div v-if="labreportdata.collection === 'outside'" class="text-right">{{ $options.filters.toLKR(row.commision) }}</div>
        </div>
      </div>

      <!-- Table Footer Totals -->
      <div
        :class="[
          'grid grid-cols-4 mt-1 rounded border-b-2 border-EF-green-300',
          'lg:grid-cols-' + (labreportdata.collection === 'inside' ? 8 : 11)
        ]"
      >
        <div v-for="n in (labreportdata.collection === 'inside' ? 6 : 8)" :key="n"></div>
        <div class="text-red-600 font-bold text-center">Total</div>
        <div class="text-red-600 font-bold text-right">{{ $options.filters.toLKR(labreportdata.totalcollection) }}</div>
        <div v-if="labreportdata.collection === 'outside'" class="text-red-600 font-bold text-right">{{ $options.filters.toLKR(labreportdata.totalCommision) }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as global from '@/assets/js/Global'
import datediff from '~/components/customcontrol/datediff'
import selectinput2 from '~/components/customcontrol/selectinput2_report'
import * as myfilter from '@/plugins/myfilter'

export default {
  components: { datediff, selectinput2 },
  data() {
    return {
      assets_root: process.env.McleAssets,
      dtfrom: '',
      dtto: '',
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      company: state => state.company,
      cashcollectionReportData: state => state.report.cashcollectionReportData,
    }),
    getReportDate() {
      return date => global.getDateFormat1(new Date(date))
    },
  },
  methods: {
    ...mapActions({
      getCashCollectionReportData: 'report/getCashCollectionReportData',
    }),
    ...mapMutations({
      resetCashCollection: 'report/RESET_CASH_COLLECTION',
    }),
    async loadReport(datediff) {
      this.resetCashCollection()
      this.dtfrom = datediff.dtfrom
      this.dtto = datediff.dtto
      await this.getCashCollectionReportData({
        from_date: this.dtfrom,
        to_date: this.dtto,
        user: this.loggeduser,
      })
    },
  },
  async mounted() {
    this.resetCashCollection()
    const date = new Date()
    this.dtfrom = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1))
    this.dtto = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    await this.getCashCollectionReportData({
      from_date: this.dtfrom,
      to_date: this.dtto,
      user: this.loggeduser,
    })
  },
  head() {
    return { title: 'Tests - Cash Collection Report' }
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

@media print {
  .notToPrint {
    visibility: hidden;
    display: none;
  }
  .csshead {
    @apply mt-0;
  }
  .csstbheading {
    @apply border-2 border-black;
  }
  .csstbheading,
  .csstbcontent {
    @apply grid-cols-8;
  }
}
</style>
