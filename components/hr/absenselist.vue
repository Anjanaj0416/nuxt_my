<template>
  <section>
    <div class="relative min-h-screen px-4 pt-4 text-sm">
      <div class="flex flex-wrap justify-between">
        <div class="flex gap-x-4">
          <!-- <div class="p-1 px-4 mb-3 text-sm font-semibold uppercase bg-blue-600 rounded-md text-SID-blue">
            Absence Details
          </div> -->
          <div class="text-2xl uppercase">Absence Details </div>


          <div
            v-show="userStore?.loggedUser?.userName === empno || userStore?.loggedUser?.granted.includes('hradmin') > 0">
            <btnapplyleave name=" Apply" title="Apply Leave" @click="applyleave" />
          </div>
        </div>

        <div class="flex gap-x-4">
          <div>
            <datediff ref="datediffRef" @date-change="LoadAbsence" class="mb-2 sm:mb-0" />
          </div>
          <div class="cursor-pointer hover:text-SID-blue" title="Exit Absense" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="my-4 overflow-x-auto">
        <div
          class="hidden w-full grid-cols-1 p-2 text-center text-white bg-blue-800 sm:grid-cols-4 lg:grid-cols-8 lg:w-5/6 rounded-t-md md:grid">
          <div>Start Date</div>
          <div>End Date</div>
          <div>Absence Type</div>
          <div>Duration Days</div>
          <div>Duration Hours</div>
          <div>Attachment</div>
          <div>Approval Status</div>
          <div>Pending At</div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-if="leaveStore.absense.arrabsences.length === 0" class="text-center text-gray-800">
        <p>No Leave available.</p>
      </div>

      <div v-for="(ab, index) in leaveStore.absense.arrabsences" :key="ab.id" :index="index">
        <div class="grid w-full grid-cols-1 p-2 mt-1 text-center text-white rounded-md lg:grid-cols-8 lg:w-5/6"
          v-bind:class="[getAbsenceRowColor(ab)]">
          <div>{{ myUtility.toReadableDate(ab.startDate) }}</div>
          <div>{{ myUtility.toReadableDate(ab.endDate) }}</div>
          <div>{{ ab.absenceType }}</div>
          <div>{{ ab.durationDays }}</div>
          <div>{{ ab.durationinMinutes }}</div>
          <!-- <div class="mx-auto">
            <a v-if="ab.attachment" :href="`http://220.247.243.114/SLTDS/hr/medicalreports/${ab.attachment}`"
              target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </a>
          </div> -->
          <div>{{ ab.approvalStatus }}</div>
          <div>{{ ab.pendingAt }}</div>
          <div title="Delete record" @click="deleteRecord(ab.id)" class="m-auto ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import datediff from '~/components/hr/datediff'
import btnapplyleave from '~/components/hr/btnapplyleave'
import { useUserStore } from '~/stores/modules/userStore';
import { useLeaveStore } from '~/stores/modules/hr/leaveStore';

// import * as Global from '@/assets/js/Global'
// import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    datediff,
    btnapplyleave,
  },
  data() {
    return {
      imageroot: process.env.Assets_83,
      dtfrom: '',
      dtto: '',
      showLoading: null,
      myUtility: null,
    }
  },

  computed: {
    getAbsenceRowColor() {
      return (ab) => {
        try {
          let rowclass =
            ab.approvalStatus.toLowerCase() == 'Pending'
              ? 'cssPending'
              : ab.approvalStatus.toLowerCase() == 'reject'
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
    this.leaveStore = useLeaveStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;

    const { $myUtility } = useNuxtApp();
    this.myUtility = $myUtility;
  },
  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   viewAbsence: 'hr/viewAbsence',
    //   deleteAbsence: 'hr/deleteAbsence',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   reset: 'hr/RESET_ABSENCE',
    // }),
    async init() {
      this.reset()
      var date = new Date()
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
    async LoadAbsence() {
      this.dtfrom = this.$refs.datediffRef.dtfrom;
      this.dtto = this.$refs.datediffRef.dtto;

      const fromDate = this.$refs.datediffRef.dtfrom;
      const toDate = this.$refs.datediffRef.dtto;

      let req = {
        empNo: this.empno,
        fromDate: fromDate,
        toDate: toDate,
      }
      await this.leaveStore.getViewAbsences(req, this.showLoading);
    },
    getclose() {
      this.$emit('exit');
      this.dtfrom = '';
      this.dtto = '';
      // this.leaveStore.clearAbsence();
    },
    async applyleave() {
      let leaveYear = new Date().getFullYear()
      this.$emit('absenseapply', { empNo: this.empno, leaveYear: leaveYear })
    },

    async deleteRecord(id) {
      if (confirm('Sure to delete this Absence?')) {
        let req = { id: id }
        await this.leaveStore.getDeleteAbsence(req, this.showLoading)

        const fromDate = this.$refs.datediffRef.dtfrom;
        const toDate = this.$refs.datediffRef.dtto;

        let reqGetViewAbsences = {
          empNo: this.empno,
          fromDate: fromDate,
          toDate: toDate,
        }
        await this.leaveStore.getViewAbsences(reqGetViewAbsences, this.showLoading);
      }
    },
  },
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