<template>
  <section>
    <div class="relative min-h-screen px-4 pt-4 text-sm">
      <!-- Header Section -->
      <div class="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div class="flex gap-x-4">
          <div class="px-4 py-1 text-sm font-semibold uppercase bg-blue-600 rounded-md text-SID-blue">
            Over Time Pre-Approvals
          </div>
        </div>

        <div class="flex mt-4 gap-x-4 md:mt-0">
          <div>
            <datediff ref="datediffRef" @date-change="LoadOTApplied" title="Load OT Applied" />
          </div>
          <div class="cursor-pointer hover:text-SID-blue" title="Exit OT Apply" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- OT Apply Form Section -->
      <OTApplyForm class="flex flex-col my-4 text-gray-800 cssOTApplyForm gap-y-4 md:flex-row md:gap-x-2"
        v-show="userStore.loggedUser.userName == empno || userStore.loggedUser.granted.indexOf('hradmin') > -1">
        <div>
          <span class="pr-4">Date</span>
          <input v-model="oTPreApprovalRequest.date" type="date" />
        </div>
        <div>
          <span class="pr-4">From</span>
          <input v-model="oTPreApprovalRequest.OTFrom" @blur="calcOTHours" type="time" />
        </div>
        <div>
          <span class="pr-4">To</span>
          <input v-model="oTPreApprovalRequest.OTTo" @blur="calcOTHours" type="time" />
        </div>
        <div class="pt-1">OT Hrs: {{ hrStore.OTApllyDetails.ot_hours }}</div>
        <div>
          <span class="pr-4">Nature Of Works</span>
          <input v-model="oTPreApprovalRequest.Reason" type="text" />
        </div>
        <div>
          <btnhr name="Apply" @click="setApplyOT" />
        </div>
      </OTApplyForm>

      <!-- OT Apply List Section -->
      <div class="mt-4">
        <OTApplyList>
          <div
            class="hidden w-full grid-cols-1 p-2 text-center text-white bg-blue-800 sm:grid-cols-4 lg:grid-cols-8 lg:w-5/6 rounded-t-md md:grid">
            <div>Date</div>
            <div>OverTime From | To</div>
            <div>OT Hours</div>
            <div>Nature Of Work</div>
            <div>Status</div>
            <div>Pending At</div>
            <div></div>
            <div class="font-bold">Total Approved: {{ Tot_OT_Hours }} Hrs</div>
          </div>

          {{ hrStore.OTApllyDetails.otRecords }}

          <div v-if="hrStore.OTApllyDetails.arrOTApply.length === 0" class="mt-5 text-center text-white">
            <p>No Apply OT available.</p>
          </div>

          <div v-for="(ot, index) in hrStore.OTApllyDetails.arrOTApply" :key="ot.id"
            class="grid w-full grid-cols-1 p-2 my-1 text-center text-white break-words rounded-md sm:grid-cols-4 lg:grid-cols-8 lg:w-5/6"
            v-bind:class="[getOTApplyRowColor(ot)]">
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">Date :</div>
              <div>{{ ot.date }}</div>
            </div>
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">OverTime From | To :</div>
              <div>{{ ot.otFrom }} | {{ ot.otTo }}</div>
            </div>
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">OT Hours :</div>
              <div>{{ ot.otHours }}</div>
            </div>
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">Nature Of Work :</div>
              <div>{{ ot.reason }}</div>
            </div>
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">Status :</div>
              <div>{{ ot.approvalStatus }}</div>
            </div>
            <div class="grid w-full grid-cols-2 ">
              <div class="block font-semibold md:hidden">Pending At:</div>
              <div>{{ ot.supervisor }}</div>
            </div>
            <div v-show="userStore.loggedUser.granted.includes('hradmin')" title="Delete record"
              class="mx-auto cursor-pointer" @click="deleteRecord(ot.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div></div>
          </div>
        </OTApplyList>
      </div>
    </div>
  </section>
</template>

<script>
import datediff from '~/components/hr/datediff'
import btnhr from '~/components/hr/btnhr'
import { useHrStore } from '~/stores/modules/hrStore'
import { useUserStore } from '~/stores/modules/userStore'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    datediff,
    btnhr,
  },
  data() {
    return {
      dtfrom: '',
      dtto: '',
      oTPreApprovalRequest: {
        empno: '',
        date: '',
        inTime: '00:00',
        outTime: '00:00',
        OTFrom: '',
        OTTo: '',
        otHour: '',
        Reason: '',
      },
      Tot_OT_Hours: '0.00',

      userStore: null,
      hrStore: null,
      myUtility: null,
      showLoading: null,
    }
  },

  computed: {
    getOTApplyRowColor() {
      return (ot) => {
        try {
          let rowclass =
            ot.approvalStatus.toLowerCase() == 'pending'
              ? 'cssPending'
              : ot.approvalStatus.toLowerCase() == 'reject'
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
    this.userStore = useUserStore();
    this.hrStore = useHrStore();
    this.showLoading = this.$showLoading;

    const { $myUtility } = useNuxtApp();
    this.myUtility = $myUtility;
  },

  methods: {

    async calcOTHours() {
      if (
        this.oTPreApprovalRequest.OTFrom != '' &&
        this.oTPreApprovalRequest.OTTo != ''
      ) {

        let req = {
          empno: this.empno,
          OTFrom: this.oTPreApprovalRequest.OTFrom,
          OTTo: this.oTPreApprovalRequest.OTTo,
        };

        await this.hrStore.getOTHours(req);
        this.oTPreApprovalRequest.otHour = this.hrStore.OTApllyDetails.ot_hours
      }
    },

    async LoadOTApplied(datediff) {
      this.dtfrom = this.$refs.datediffRef.dtfrom;
      this.dtto = this.$refs.datediffRef.dtto;

      let req = {
        empNo: this.empno,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }
      await this.hrStore.getOTApprovals(req, this.showLoading)
      // this.getTot_OT_Hours()
    },

    async init() {
      //this.reset()
      var date = new Date()
      this.dtfrom = useNuxtApp().$myUtility.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.dtto = useNuxtApp().$myUtility.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      )

      let req = {
        empNo: this.empno,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }
      await this.hrStore.getOTApprovals(req, this.showLoading)
      // this.getTot_OT_Hours()
    },

    async setApplyOT() {
      this.oTPreApprovalRequest.empno = this.empno
      this.dtfrom = this.$refs.datediffRef.dtfrom;
      this.dtto = this.$refs.datediffRef.dtto;

      this.$showConfirm("Sure to apply this OT Pre-Approval?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = {
              EmpNo: this.oTPreApprovalRequest.empno,
              Date: this.oTPreApprovalRequest.date,
              OTFrom: this.oTPreApprovalRequest.OTFrom,
              OTTo: this.oTPreApprovalRequest.OTTo,
              OTHour: this.oTPreApprovalRequest.otHour,
              Reason: this.oTPreApprovalRequest.Reason,
              FromDate: this.dtfrom,
              ToDate: this.dtto,
              Note: "OTBtn"
            }
            await this.hrStore.setOTApproval(req, this.showLoading)
            this.oTPreApprovalRequest = {}
          }
        });
    },

    async deleteRecord(ot_id) {
      this.$showConfirm("Sure to delete this OT Pre-Approval?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = {
              id: ot_id
            }
            await this.hrStore.setDeleteOTApproval(req, this.showLoading);

            this.dtfrom = this.$refs.datediffRef.dtfrom;
            this.dtto = this.$refs.datediffRef.dtto;

            let reqSetDeleteOTApproval = {
              empNo: this.empno,
              fromDate: this.dtfrom,
              toDate: this.dtto,
            };
            await this.hrStore.getOTApprovals(reqSetDeleteOTApproval, this.showLoading);
          }
        });
    },

    async getclose() {
      this.oTPreApprovalRequest = {};
      this.dtfrom = '';
      this.dtto = '';
      this.$emit('exit')
    },

    getTot_OT_Hours() {
      try {
        let Ots = this.OTApllyDetails.arrOTApply.filter(
          (ot) => ot.approvalStatus == 'Approved'
        )

        let tot = 0.0;
        Ots.forEach(function (detot) {

          tot += detot.otHours;
        });
        this.Tot_OT_Hours = tot
      } catch {
        this.Tot_OT_Hours = 0.00
      }
    },

    validate() {
      if (this.oTPreApprovalRequest.date == '') {
        this.show_error('Invalid Date')
        return false
      }

      if (this.oTPreApprovalRequest.OTFrom == '') {
        this.show_error('Invalid OT From Time')
        return false
      }

      if (this.oTPreApprovalRequest.OTTo == '') {
        this.show_error('Invalid OT To Time')
        return false
      }

      if (this.oTPreApprovalRequest.Reason == '') {
        this.show_error('Invalid Nature Of Work')
        return false
      }

      return true
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
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

.cssOTApplyForm {
  @apply font-bold;
}

.cssOTApplyForm input {
  @apply rounded-md p-1;
}
</style>