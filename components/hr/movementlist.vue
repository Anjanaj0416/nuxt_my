<template>
  <section>
    {{ hrStore }}
    <!-- <div class="relative min-h-screen px-4 pt-4 text-sm">
      <div class="flex flex-col justify-between lg:flex-row">
        <div class="flex mb-4 gap-x-4 lg:mb-0">
          <div class="p-1 px-4 text-sm font-semibold uppercase bg-blue-600 rounded-md text-SID-blue">
            Movement Details
          </div>

          
          <div v-show="hrStore.loggeduser.userName == empno || hrStore.loggeduser.granted === 'hradmin'">
            <btnapplyleave name="Apply" title="Apply Movement" @click="applymovement" />
          </div>
        </div>

        <div class="flex gap-x-4">
          <div>
            <datediff @click="LoadMovement" />
          </div>
          <div class="cursor-pointer hover:text-SID-blue" title="Exit Movement" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="my-4">
        <div
          class="hidden w-full grid-cols-1 p-2 text-center text-white bg-blue-800 sm:grid-cols-4 lg:grid-cols-9 lg:w-5/6 rounded-t-md md:grid">
          <div>Date</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>From Location</div>
          <div>To Location</div>
          <div>Vehicle</div>
          <div>Distance</div>
          <div>Approval Status</div>
          <div>Pending At</div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-if="arrmovements.length === 0" class="text-center text-white">
        <p>No movements available.</p>
      </div>

      <div v-for="(mv, index) in arrmovements" :key="mv" :index="index">
        <div class="grid w-full grid-cols-1 p-2 mt-1 text-center text-white rounded-md lg:grid-cols-10 lg:w-5/6"
          v-bind:class="[getMovementRowColor(mv)]">
          <div>{{ getFormatDate(mv.date) }}</div>
          <div>{{ mv.out_time }}</div>
          <div>{{ mv.in_time }}</div>
          <div>{{ mv.from_loc }}</div>
          <div>{{ mv.to_loc }}</div>
          <div>{{ mv.vehicle }}</div>
          <div>{{ mv.distance }}</div>
          <div>{{ mv.status }}</div>
          <div>{{ mv.pendingat }}</div>
          <div title="Delete record" @click="deleteRecord(mv.movementId)">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div></div>
        </div>
      </div>
    </div> -->
  </section>
</template>


<script>
import datediff from '~/components/customcontrol/datediff'
import btnapplyleave from '~/components/hr/btnapplyleave'
import { useHrStore } from '~/stores/modules/hrStore'


// import * as Global from '@/assets/js/Global'
import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    datediff,
    btnapplyleave,
  },
  data() {
    return {
      dtfrom: '',
      dtto: '',
      showLoading: null,
    }
  },

  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   arrmovements: (state) => state.hr.movementdetails.arrmovements,
    // }),
    async created() {
      this.hrStore = useHrStore();
      this.showLoading = this.$showLoading;
    },
    getMovementRowColor() {
      return (ab) => {
        try {
          let rowclass =
            ab.status.toLowerCase() == 'pending' ? 'cssPending' : (ab.status.toLowerCase() == 'reject') ? 'cssReject' : 'cssDefault'

          return rowclass
        } catch {
          return ''
        }
      }
    },
    getFormatDate() {
      return (dt) => {
        if (dt == '' || dt == undefined) return ''
        return Global.getDateFormat1(new Date(dt))
      }
    },
  },
  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   viewMovement: 'hr/viewMovement',
    //   deleteMovement: 'hr/deleteMovement',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   reset: 'hr/RESET_MOVEMENT',
    // }),
    async init() {
      // this.reset()
      var date = new Date()
      this.dtfrom = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.dtto = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      )

      await this.viewMovement({
        fromdate: this.dtfrom,
        todate: this.dtto,
        empNo: this.empno,
        user: this.loggeduser,
      })
    },
    async LoadMovement(req) {
      await this.viewMovement({
        fromdate: req.dtfrom,
        todate: req.dtto,
        empNo: this.empno,
        user: this.loggeduser,
      })
    },
    getclose() {
      this.$emit('exit')
    },
    applymovement() {
      this.$emit('movementapply', this.empno)
    },
    async deleteRecord(id) {
      if (confirm('Sure to delete this record?')) {
        let req = { movement_id: id, user: this.loggeduser }
        await this.deleteMovement(req)
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