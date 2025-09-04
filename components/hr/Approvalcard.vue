<template>
  <section class="relative ">

    <div class="p-1">
      <div class="p-4 bg-blue-400 rounded">
        <div class="cssjobdesc my-2 grid grid-cols-2 gap-2">
          <div v-for="tag in job.jobDetails" :key="tag" class="relative">
            <div class="font-bold text-sm absolute top-0">
              {{ tag.tag }}
            </div>
            <div class="flex h-full items-center">
              <div class="mx-auto">
                <div class="text-md font-bold text-gray-100">
                  {{ tag.value }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="text-sm capitalize">comment</div>
          <input v-model="comment" placeholder="Comment" type="text"
            class="w-full px-2 py-1 rounded-md my-2 border-gray-500 rounded p-2" />
        </div>
        <div class="flex justify-between cursor-pointer rounded-b-md text-center w-full">
          <div class="w-1/2 rounded-bl-md font-bold bg-red-500 py-4 hover:bg-red-600 text-white"
            @click="setreject(job.jobId)">
            Reject
          </div>
          <div class="w-1/2 rounded-br-md font-bold py-4 text-white bg-blue-500 hover:bg-blue-600"
            @click="setapprove(job.jobId)">
            Approve
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import btn_jobcard_approve from '~/components/hr/btn_jobcard_approve'
import btn_jobcard_reject from '~/components/hr/btn_jobcard_reject'
import { useWorkLoadStore } from '~/stores/modules/hr/workLoadStore'

export default {
  components: { btn_jobcard_approve, btn_jobcard_reject },
  props: ['job', 'jobType'],

  data() {
    return {
      imageroot: process.env.Assets_83,
      ismore: false,
      cur_jobid: -1,
      comment: '',
      showLoading: null,
      workLoadStore: null,
    }
  },
  async created() {
    this.workLoadStore = useWorkLoadStore();
    this.showLoading = this.$showLoading;
  },

  computed: {
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

  methods: {
    refreshComp(jobId) {
      //this.jcDetails = []
      //this.jobType =-1
      this.$emit('getRefresh', jobId)
      this.comment = ''
    },

    async setapprove(jobId) {
      this.$showConfirm("Sure to approve this work-order?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            await this.workLoadStore.getWorkLoadApprove({
              jobId: jobId,
              jobType: this.jobType,
              comment: this.comment,
            }, this.showLoading)
            this.refreshComp(jobId)
          }
        });
    },

    async setreject(jobId) {
      this.$showConfirm("Sure to reject this work-order?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            if (this.comment == '') {
              this.showMessage({
                type: 'Failed',
                message: 'Type Reject Reason as comment',
              })

              return
            }

            await this.workLoadStore.getWorkLoadReject({
              jobId: jobId,
              jobType: this.jobType,
              comment: this.comment,
            }, this.showLoading)

            this.refreshComp(jobId)
          }
        });
    },

    showMessage({ type, message }) {
      alert(`${type}: ${message}`); // or use a toast/snackbar
    },
  },
}
</script>

<style scoped>
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

.cssOT .cssDetailView {
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
