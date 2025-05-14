<template>
  <section>
    <div class="pt-2 px-4 text-sm relative min-h-screen">
      <div class="flex justify-between">
        <div class="flex gap-x-4">
          <div class="
              text-sm
              font-semibold
              uppercase
              bg-blue-600
              text-white
              px-4
              p-1
              rounded-md
            ">
            Appling Movement
          </div>
        </div>
        <div class="cursor-pointer hover:text-gray-600" title="Exit Movement Apply" @click="goto_movementview">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="my-4 w-full lg:w-1/2 bg-gray-600 px-4 py-8 text-white rounded">
        <div class="font-bold uppercase text-xs">Date and Time</div>
        <div class="lb"></div>

        <div class="grid grid-cols-4 my-2 gap-y-2">
          <div class="">Date</div>
          <div class="">
            <input class="text-gray-600 rounded p-1" v-model="movement_apply.date" type="date" />
          </div>

          <div class="text-right px-2">Start Time</div>
          <div class="">
            <input class="text-gray-600 rounded p-1" v-model="movement_apply.out_time" type="time" />
          </div>

          <div></div>
          <div></div>

          <div class="text-right px-2">End Time</div>
          <div class="">
            <input class="text-gray-600 rounded p-1" v-model="movement_apply.in_time" type="time" />
          </div>
        </div>

        <div class="mt-4">
          <div class="font-bold uppercase text-xs">Movement Details</div>
          <div class="lb"></div>

          <div class="grid grid-cols-4 my-2 gap-y-2">
            <div>Movement Type</div>
            <div class="">
              <selectinput2 v-model="movementType" :cur_item="movement_apply.movementType"
                :selections="hrStore.initData.initMovement.arrMovementType" @changed=movementTypeChanged />
            </div>

            <div class="text-right px-2">Movement Period</div>
            <div class="">
              <selectinput2 v-model="movement_apply.movementPeriod" :cur_item="movement_apply.movementPeriod"
                :selections="hrStore.initData.initMovement.arrMovementPeriod" @changed=movementTypeChanged />

            </div>
            <div class="" v-show="!isWFH">Start From</div>
            <div class="" v-show="!isWFH">
              <selectinput2 v-model="movement_apply.start_from" :cur_item="movement_apply.start_from"
                :selections="hrStore.initData.initMovement.arrStartFrom" />
            </div>

            <div class="text-right px-2" v-show="!isWFH">From Location</div>
            <div class="" v-show="!isWFH">
              <input class="text-gray-600 w-full rounded p-1" v-model="movement_apply.from_location" type="text" />
            </div>

            <div class="" v-show="!isWFH">To Location</div>
            <div class="" v-show="!isWFH">
              <input class="text-gray-600 w-full rounded p-1" v-model="movement_apply.to_location" type="text" />
            </div>

            <div class="text-right px-2" v-show="!isWFH">Distance</div>
            <div class="" v-show="!isWFH">
              <input class="text-gray-600 w-full rounded p-1" v-model="movement_apply.distance" type="text" />
            </div>

            <div class="" v-show="!isWFH">Vehicle No</div>
            <div class="" v-show="!isWFH">
              <input class="text-gray-600 w-full rounded p-1" v-model="movement_apply.vehicle_number" type="text" />
            </div>

            <div class="text-right px-2" v-show="!isWFH">Travel By</div>
            <div class="" v-show="!isWFH">
              <selectinput2 v-model="movement_apply.travel_by" :cur_item="movement_apply.travel_by"
                :selections="hrStore.initData.initMovement.arrTravelBy" />
            </div>
          </div>
        </div>

        <div class="mt-8 w-full flex justify-end gap-x-4">
          <btnhr_Save class="w-20" name="Clear" @click="getClear" />
          <btnhr_Save class="w-20" name="Save" @click="getSave" />
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import btnhr_Save from '~/components/hr/btnhr_button'
import leave_entitlement from '~/components/hr/leave_entitlement'
import { useHrStore } from '~/stores/modules/hrStore'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno', 'dtFrom', 'dtTo'],
  components: { selectinput2, btnhr_Save, leave_entitlement },
  data() {
    return {
      isWFH: false,
      movement_apply: {
        empNo: '',
        date: '',
        out_time: '00:00',
        in_time: '00:00',
        start_from: '',
        from_location: '',
        to_location: '',
        distance: '0',
        vehicle_number: '',
        travel_by: '',
        movementType: '',
        movementPeriod: '',
        user: {},
      },
      dtfrom: null,
      dtto: null,
      hrStore: null,
      showLoading: null,
    }
  },

  async created() {
    this.hrStore = useHrStore();
    this.showLoading = this.$showLoading;
  },

  computed: {
  },
  methods: {
    async init() { },
    goto_movementview() {
      this.$emit('goto_movementview')
    },
    async getSave() {
      if (!this.validate()) {
        return
      }
      let req = {
        EmpNo: this.empno,
        Date: this.movement_apply.date,
        InTime: this.movement_apply.in_time,
        OutTime: this.movement_apply.out_time,
        StartFrom: this.movement_apply.start_from,
        FromLocation: this.movement_apply.from_location,
        ToLocation: this.movement_apply.to_location,
        Distance: this.movement_apply.distance,
        VehicleNumber: this.movement_apply.vehicle_number,
        TravelBy: this.movement_apply.travel_by,
        MovementType: this.movement_apply.movementType,
        MovementPeriod: this.movement_apply.movementPeriod,
      }
      //console.log(JSON.stringify(this.movement_apply));
      await this.hrStore.setMovement(req, this.showLoading);

      let reqGetViewMovement = {
        fromDate: this.dtFrom,
        toDate: this.dtTo,
        empNo: this.empno,
      }

      await this.hrStore.getViewMovement(reqGetViewMovement, this.showLoading)
      this.$emit('goto_movementview')
    },
    movementTypeChanged(selected_item) {
      this.isWFH = (selected_item == 'Work From Home') ? true : false

    },
    movementPeriodChanged(selected_item) {


    },
    validate() {
      if (!this.isWFH && this.movement_apply.out_time == '') {
        this.show_error('Invalid Out Date')
        return false
      }

      // if (!this.isWFH && this.movement_apply.out_time == '00:00') {
      //   this.show_error('Invalid Out Time')
      //   return false
      // }
      if (this.movement_apply.movementPeriod == '') {
        this.show_error('Invalid Movement Period')
        return false
      }
      if (!this.isWFH && this.movement_apply.in_time == '') {
        this.show_error('Invalid In Date')
        return false
      }

      if (!this.isWFH && this.movement_apply.out_time > this.movement_apply.in_time) {
        this.show_error('Invalid  Mov.  Start Time  and    End Time')
        return false
      }


      if (!this.isWFH && this.movement_apply.to_location == '') {
        this.show_error('Invalid To Location')
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

    getClear() {
      this.movement_apply.out_date = ''
      this.movement_apply.out_time = ''
      this.movement_apply.in_date = ''
      this.movement_apply.in_time = ''
      this.movement_apply.start_from = ''
      this.movement_apply.from_location = ''
      this.movement_apply.to_location = ''
      this.movement_apply.distance = ''
      this.movement_apply.vehicle_number = ''
      this.movement_apply.travel_by = ''
      this.movement_apply.movementType = ''
      this.movement_apply.movementPeriod = ''
      this.movement_apply.date = ''
    },
  },
}
</script>

<style scoped>
.lb {
  @apply w-full border-b-2 border-white my-2;
}
</style>