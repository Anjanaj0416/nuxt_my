<template>
  <section class="mt-16">
    <div class="flex justify-between px-2 lg:justify-start gap-x-4">
      <div class="font-bold">My Workgroup</div>
      <div class="flex items-center justify-center w-8 p-1 px-2 font-bold bg-green-400 rounded-full text-SID-green-600">
        {{ totalJobs(hrStore.workgroup.arrJobCardDetails) }}

      </div>

      <div @click="getRefreshWorkGroup" title="Refresh"
        class="p-2 bg-green-400 rounded-full cursor-pointer text-SID-green-600 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div @click="getClose" title="Exit"
        class="p-2 bg-green-400 rounded-full cursor-pointer text-SID-green-600 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <div class="lb"></div>
    <div class="grid grid-cols-1 gap-4 p-4 mx-2 my-2 cssEmps lg:grid-cols-4">
      <div v-for="aprovalCardDetail in hrStore.workgroup.arrJobCardDetails" :key="aprovalCardDetail" class="">
        <div
          class="p-1 p-2 text-gray-800 border-gray-500 rounded rounded-md cursor-pointer bg-gradient-to-r from-blue-900 to-blue-800 text-md">
          <div class="flex justify-between mb-2">
            <div class="flex gap-x-2">
              <div>
                <img class="h-10 transform border-2 border-white rounded hover:scale-150" :src="imageroot + '/user/' + aprovalCardDetail.assignedUser.image
                  " alt="" />
              </div>
              <div class="text-neutral-50">
                <div>
                  {{ aprovalCardDetail.assignedUser.name }} [{{
                    aprovalCardDetail.assignedUser.empNo
                  }}]
                </div>
                <div class="w-32 p-1 text-sm text-white bg-blue-600 rounded font-italic" @click="
                  getViewMore(
                    aprovalCardDetail.assignedUser.empNo,
                    aprovalCardDetail.assignedUser.name
                  )
                  ">
                  View Attendence
                </div>
              </div>
            </div>
            <div></div>
          </div>

          <div v-for="jobs in aprovalCardDetail.assignedUser.jobArr" :key="jobs" class="">
            <div class="flex w-full p-1 text-white rounded cursor-pointer gap-x-2 hover:bg-blue-500 hover:text-white"
              @click="
                LoadViewdJobs(
                  jobs.jobDetails,
                  jobs.jobType,
                  aprovalCardDetail.assignedUser.name,
                  aprovalCardDetail.assignedUser.empNo
                )
                ">
              <div>{{ getJobTypeName(jobs.jobType) }}</div>
              <div class="p-1 px-2 text-xs text-blue-800 bg-white rounded-full">
                {{ jobs.jobDetails.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 m-2 bg-blue-200" v-show="viewed_jobs.length > 0">
      <span class="text-xl font-bold">
        {{ cur_emplyee }} - {{ cur_approvalTypeName }}</span>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div v-for="job in viewed_jobs" :key="job">
          <Approvalcard class="my-1 cursor-pointer" :job="job" :jobType="cur_JobType" @getRefresh="getRefresh" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Approvalcard from '~/components/hr/Approvalcard'
import * as myfilter from '@/plugins/myfilter'
import { useUserStore } from '~/stores/modules/userStore'
import { useHrStore } from '~/stores/modules/hrStore'
// import * as Global from '@/assets/js/Global'

export default {
  components: { Approvalcard },

  data() {
    return {
      imageroot: process.env.Assets_83,
      viewed_jobs: [],

      cur_JobType: -1,
      cur_emplyee: '',
      cur_approvalTypeName: '',
      cur_aproval_id: -1,
      comment: '',
      showLoading: null,
      hrStore: null,
      userStore: null,
    }
  },

  async created() {
    this.userStore = useUserStore();
    this.hrStore = useHrStore();
    this.showLoading = this.$showLoading;
  },
  computed: {
    totalJobs() {
      return (arrJobCardDetails) => {
        let total_jobs = 0
        arrJobCardDetails.forEach((emp) => {
          emp.assignedUser.jobArr.forEach((jobs) => {
            total_jobs += jobs.jobDetails.length
          })
        })
        return total_jobs
      }
    },

    getJobTypeName() {
      return (jobtypeid) => {
        try {
          let jobname =
            jobtypeid == 100
              ? 'OT Pre Approval'
              : jobtypeid == 101
                ? 'Leave'
                : jobtypeid == 102
                  ? 'Time Card'
                  : jobtypeid == 103
                    ? 'Movement'
                    : jobtypeid == 104
                      ? 'Rectify'
                      : ''

          return jobname
        } catch {
          return ''
        }
      }
    },
    getJobTypeColor() {
      return (jobtypeid) => {
        try {
          let jobColor =
            jobtypeid == 100
              ? 'cssOT'
              : jobtypeid == 101
                ? 'cssLeave'
                : jobtypeid == 102
                  ? 'cssTimeCard'
                  : jobtypeid == 103
                    ? 'cssMovement'
                    : jobtypeid == 104
                      ? 'cssRectify'
                      : ''

          return jobColor
        } catch {
          return ''
        }
      }
    },
  },
  async beforeMount() {
    if (this.userStore.loggedUser.userGroup === 'Supervisor') {//Supervisor
      await this.hrStore.getWorkLoadDetails(this.showLoading);
      // await this.hrStore.getWorkLoadDetails({ user: this.userStore.loggedUser })
    } else {
      this.showMessage({
        type: 'Failed',
        message: 'Not Allowed to access this page',
      })
      this.$router.push('/')
    }
  },

  methods: {
    async getRefresh(jobId) {
      //this.viewed_jobs = []
      let index = this.viewed_jobs.find((ind) => ind.jobId == jobId)
      this.viewed_jobs.splice(index, 1)
      //await this.getWorkLoadDetails({ user: this.loggeduser })
    },

    async getRefreshWorkGroup(jobId) {
      this.viewed_jobs = []
      await this.getWorkLoadDetails({ user: this.loggeduser })
    },

    // FindTest(job_id){

    //   let index = this.viewed_jobs.find(ind=>ind.jobId==job_id)
    //   this.viewed_jobs.splice(index,1)

    // },

    getClose() {
      this.$router.push('/hr')
    },
    // setApprovalCard(cur_aproval_id) {
    //   this.cur_aproval_id = cur_aproval_id
    // },
    LoadViewdJobs(jobsDetails, jobtype, name, empno) {
      this.cur_emplyee = name + '[ ' + empno + ' ]'
      this.viewed_jobs = jobsDetails
      this.cur_approvalTypeName = this.getJobTypeName(jobtype)
      this.cur_JobType = jobtype
    },
    getViewMore(emp_no, empname) {
      var today = new Date()

      var firstDayOfLastMonth = myfilter.toInputTypeDate(
        new Date(today.getFullYear(), today.getMonth() - 1, 1)
      )

      var lastDayOfCurrentMonth = myfilter.toInputTypeDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      )

      let req = {
        from_date: firstDayOfLastMonth,
        to_date: lastDayOfCurrentMonth,
        empno: emp_no,
        empname: empname,
        granted: this.loggeduser.granted,
      }

      const encodedData = Global.atob(JSON.stringify(req))

      window.open(
        'http://officeapps.sltds.lk:2021/HR/attendence_printview?hr=' +
        encodedData,
        '_blank'
      )
    },

    showMessage({ type, message }) {
      alert(`${type}: ${message}`); // or use a toast/snackbar
    },
  },


}
</script>

<style scoped>
divss {
  @apply border-gray-500 rounded p-2;
}

.lb {
  @apply w-full my-2 bg-green-600;
  height: 2px;
}

.cssEmps {}

.cssjobdesc {
  min-height: 300px;

}

.cssjobdesc>div {
  @apply border-gray-500 rounded p-2 rounded text-blue-900 p-1 h-auto w-auto font-thin;
}

.lb {
  @apply w-full h-1 my-2 bg-green-800;
}

.cssOT {
  @apply bg-purple-500;
}

.cssOT+.cssDetailView {
  @apply bg-purple-200;
}

.cssLeave {
  @apply bg-green-500;
}

.cssLeave+.cssDetailView {
  @apply bg-green-200;
}

.cssTimeCard {
  @apply bg-blue-500;
}

.cssTimeCard+.cssDetailView {
  @apply bg-blue-200;
}

.cssMovement {
  @apply bg-orange-500;
}

.cssMovement+.cssDetailView {
  @apply bg-orange-200;
}

.cssRectify {
  @apply bg-teal-500;
}

.cssRectify+.cssDetailView {
  @apply bg-teal-200;
}
</style>