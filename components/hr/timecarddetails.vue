<template>
  <section>
    <div class="relative min-h-screen px-4 pt-4 text-sm">
      <!-- Top Header Section -->
      <div class="flex-wrap items-center justify-between gap-4">
        <!-- Left Side -->
        <div class="flex flex-wrap items-center gap-4">
          <div class="h-8 p-1 px-4 mt-4 text-sm font-semibold uppercase bg-blue-600 rounded-md text-SID-blue">
            Time Card Details
          </div>

          <!-- Month and Year Selection (Only for HR Admin) -->
          <div v-show="userStore.loggedUser.granted.includes('hradmin')" class="flex items-center gap-2">
            <selectinput2 class="w-20" v-model="month" :cur_item="month" :selections="month_names" :err="err.month"
              label="Month" />
            <selectinput2 class="w-20" v-model="year" :cur_item="year" :selections="years" :err="err.year"
              label="Year" />
            <div class="pt-2">
              <btnapplyleave name="Create Time Card" title="Create Time Card" @click="applyTimeCard" />
            </div>
          </div>

          <!-- Refresh Button -->
          <div class="pt-2">
            <btnapplyleave name="Refresh" title="Refresh Time Card" @click="getRefresh" />
          </div>

          <!-- Close Button -->
          <div class="cursor-pointer hover:text-SID-blue" title="Exit Absence" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- Header Row for Timecard -->
        <div class="my-4">
          <div
            class="grid grid-cols-2 gap-2 p-2 text-center text-white bg-blue-800 rounded-t-md sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 lg:w-5/6">
            <div>Employee</div>
            <div>Month</div>
            <div>Total Hours</div>
            <div>OT-Single</div>
            <div>OT-Double</div>
            <div>Leave</div>
            <div>Short Leave</div>
            <div>Half Day</div>
            <div>Movement</div>
            <div>Pending At</div>
            <div>Status</div>
          </div>
        </div>

        <div v-if="timeCardStore.timecard.arrtimecard.length === 0" class="text-center text-white">
          <p>No Time card available.</p>
        </div>

        <!-- Timecard Rows -->
        <div v-for="jc in timeCardStore.timecard.arrtimecard" :key="jc" :index="index">
          <div
            class="grid grid-cols-2 gap-2 p-2 mt-1 text-center text-white rounded-md sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 lg:w-5/6"
            v-bind:class="[getTimeCardRowColor(jc)]">
            <div>{{ jc.empName }}</div>
            <div>{{ jc.monthName }}</div>
            <div>{{ jc.totalHours }}</div>
            <div>{{ jc.totalSingleOT }}</div>
            <div>{{ jc.totalDoubleOT }}</div>
            <div>{{ jc.leaves }}</div>
            <div>{{ jc.shortLeave }}</div>
            <div>{{ jc.halfDays }}</div>
            <div>{{ jc.movement }}</div>
            <div>{{ jc.pendingAt }}</div>
            <div>{{ jc.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import datediff from '~/components/customcontrol/datediff'
import btnapplyleave from '~/components/hr/btnapplyleave'
import selectinput2 from '~/components/customcontrol/selectinput2'
import { useUserStore } from '~/stores/modules/userStore'

import * as Global from '@/assets/js/Global'
import { useTimeCardStore } from '~/stores/modules/hr/timeCardStore'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    // datediff,
    selectinput2,
    btnapplyleave,
  },
  data() {
    return {
      imageroot: process.env.Assets_83,
      year: 2022,
      month: 'Jan',
      month_names: [],
      years: [],
      err: {
        year: '',
        month: '',
      },
      timeCardStore: null,
      userStore: null,
      showLoading: null,
    }
  },

  computed: {
    getTimeCardRowColor() {
      return (jc) => {
        try {
          let rowclass =
            jc.status.toLowerCase() == 'pending'
              ? 'cssPending'
              : jc.status.toLowerCase() == 'reject'
                ? 'cssReject'
                : 'cssDefault'

          return rowclass
        } catch {
          return ''
        }
      }
    },
  },

  async created() {
    this.timeCardStore = useTimeCardStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
  },

  methods: {
    async init() {
      // this.reset()
      // var date = new Date()
      // this.dtfrom = myfilter.toInputTypeDate(
      //   new Date(date.getFullYear(), date.getMonth(), 1)
      // )
      // this.dtto = myfilter.toInputTypeDate(
      //   new Date(date.getFullYear(), date.getMonth() + 1, 0)
      // )
      // await this.viewAbsence({
      //   fromdate: this.dtfrom,
      //   todate: this.dtto,
      //   empno: this.empno,
      //   user: this.loggeduser,
      // })
    },
    // async LoadAbsence(req) {
    //   await this.viewAbsence({
    //     fromdate: req.dtfrom,
    //     todate: req.dtto,
    //     empno: this.empno,
    //     user: this.loggeduser,
    //   })
    // },
    async getRefresh() {
      let dt = new Date();

      this.year = dt.getFullYear()
      this.month = this.month_names[dt.getMonth() - 1]

      let req = { empNo: this.empno }
      await this.timeCardStore.getTimeCards(req, this.showLoading)

    },

    getclose() {
      this.$emit('exit')
    },

    async applyTimeCard() {

      this.$showConfirm("Sure to create this Time Card?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let year = parseInt(this.year)
            let month = parseInt(this.month_names.indexOf(this.month) + 1);//this.month;
            let req = { empNo: this.empno, month: month, year: year }

            await this.timeCardStore.setTimeCardWorkLoad(req, this.showLoading)
            this.getRefresh();
          }
        });
    },

  },

  async beforeMount() {
    this.month_names = Global.getMonthNames()
    this.years = Global.getYears()
    // this.getRefresh()
  }
}
</script>

<style scoped>
.cssPending {
  @apply bg-orange-600;
}

.cssDefault {
  @apply bg-green-600;
}

.cssReject {
  @apply bg-red-600;
}
</style>