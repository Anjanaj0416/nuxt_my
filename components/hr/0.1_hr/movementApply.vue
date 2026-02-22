<template>
  <section class="justify-center mb-12">
    <h2 class="text-lg font-semibold text-gray-700 mb-2 tracking-wide">
            Apply Movement  - {{ leaveyear }}
        </h2>

    <div >
      <!-- Movement Date & Time -->
      <div class="border-t pt-5">
        <h3 class="text-md font-semibold text-gray-700 mb-4">
          Movement Date & Time
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center mb-3">
          <label class="text-sm font-medium text-gray-600">Date</label>
          <div class="md:col-span-2">
            <input
              type="date"
              v-model="localDate"
              @input="clearErrorOnInput('date')"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <p v-if="err.date" class="mt-2 text-sm text-red-600">
              {{ err.date }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center mb-3">
          <label class="text-sm font-medium text-gray-600">Start Time</label>
          <div class="md:col-span-2">
            <input
              type="time"
              v-model="movement_apply.out_time"
              @input="clearErrorOnInput('out_time')"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <p v-if="err.out_time" class="mt-1 text-sm text-red-600">
              {{ err.out_time }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <label class="text-sm font-medium text-gray-600">End Time</label>
          <div class="md:col-span-2">
            <input
              type="time"
              v-model="movement_apply.in_time"
              @input="clearErrorOnInput('in_time')"
              class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <p v-if="err.in_time" class="mt-1 text-sm text-red-600">
              {{ err.in_time }}
            </p>
          </div>
        </div>
      </div>


      <!-- Movement Details -->
      <div class="border-t pt-5 mt-5">
        <h3 class="text-md font-semibold text-gray-700 mb-4">
          Movement Details
        </h3>

        <!-- Movement Type -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">

          <!-- Movement Type -->
          <div>
            <label class="text-sm font-medium text-gray-600 block mb-1">
              Movement Type
            </label>
            <selectinput2
              v-model="movement_apply.movementType"
              :cur_item="movement_apply.movementType"
              :selections="movementStore.initData.initMovement.arrMovementType"
              @input="clearErrorOnInput('movementType')"
            />
            <p v-if="err.movementType" class="mt-1 text-sm text-red-600">
              {{ err.movementType }}
            </p>
          </div>

          <!-- Movement Period -->
          <div>
            <label class="text-sm font-medium text-gray-600 block mb-1">
              Movement Period
            </label>
            <selectinput2
              v-model="movement_apply.movementPeriod"
              :cur_item="movement_apply.movementPeriod"
              :selections="movementStore.initData.initMovement.arrMovementPeriod"
              @input="clearErrorOnInput('movementPeriod')"
            />
            <p v-if="err.movementPeriod" class="mt-1 text-sm text-red-600">
              {{ err.movementPeriod }}
            </p>
          </div>

        </div>

        <!-- Non WFH fields -->
        <template v-if="!isWFH">

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <!-- Start From -->
            <div>
              <label class="text-sm font-medium text-gray-600">Start From</label>
              <selectinput2
                v-model="movement_apply.start_from"
                :cur_item="movement_apply.start_from"
                :selections="movementStore.initData.initMovement.arrStartFrom"
                @input="clearErrorOnInput('start_from')"
              />
              <p v-if="err.start_from" class="mt-1 text-sm text-red-600">
                {{ err.start_from }}
              </p>
            </div>

            <!-- From Location -->
            <div>
              <label class="text-sm font-medium text-gray-600">From Location</label>
              <input
                type="text"
                v-model="movement_apply.from_location"
                @input="clearErrorOnInput('from_location')"
                placeholder="Ex: Gampaha, etc."
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
              <p v-if="err.from_location" class="mt-1 text-sm text-red-600">
                {{ err.from_location }}
              </p>
            </div>

            <!-- To Location -->
            <div>
              <label class="text-sm font-medium text-gray-600">To Location</label>
              <input
                type="text"
                v-model="movement_apply.to_location"
                @input="clearErrorOnInput('to_location')"
                placeholder="Ex: Colombo, etc."
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
              <p v-if="err.to_location" class="mt-1 text-sm text-red-600">
                {{ err.to_location }}
              </p>
            </div>

            <!-- Distance -->
            <div>
              <label class="text-sm font-medium text-gray-600">Distance</label>
              <input
                type="text"
                v-model="movement_apply.distance"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>

            <!-- Vehicle No -->
            <div>
              <label class="text-sm font-medium text-gray-600">Vehicle No</label>
              <input
                type="text"
                v-model="movement_apply.vehicle_number"
                placeholder="Ex: BKG-1234"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>

            <!-- Travel By -->
            <div>
              <label class="text-sm font-medium text-gray-600">Travel By</label>
              <selectinput2
                v-model="movement_apply.travel_by"
                :cur_item="movement_apply.travel_by"
                :selections="movementStore.initData.initMovement.arrTravelBy"
              />
            </div>

            <!-- Reason (full width) -->
            <div class="md:col-span-2">
              <label class="text-sm font-medium text-gray-600">Reason</label>
              <textarea
                type="text"
                v-model="movement_apply.reason"
                @input="clearErrorOnInput('reason')"
                placeholder="Ex: Fever, Family Function, Personal Work, etc."
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
              <p v-if="err.reason" class="mt-1 text-sm text-red-600">
                {{ err.reason }}
              </p>
            </div>

          </div>

        </template>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-8 border-t pt-4">
      <button
        @click="getClear"
        class="px-4 py-1.5 text-sm bg-white text-black border border-gray-300
              rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        @click="getSave"
        class="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-gray-300
              rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        ✔ Apply
      </button>
    </div>

  </section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import btnhr_Save from '~/components/hr/btnhr_button'
import leave_entitlement from '~/components/hr/leave_entitlement'
import { useMovementStore } from '~/stores/modules/hr/movementStore'

export default {
  props: ['empno', 'dtFrom', 'dtTo', 'leaveyear'],
  components: { selectinput2, btnhr_Save, leave_entitlement },
  data() {
    return {
      isWFH: false,
      err: {
        out_time: "",
        date: '',
        movementPeriod: "",
        in_time: "",
        to_location: "",
        from_location: "",
        start_from: "",
        movementType: '',
        reason: '',
      },
      movement_apply: {
        empNo: '',
        date: '',
        out_time: '',
        in_time: '',
        start_from: '',
        from_location: '',
        to_location: '',
        distance: '0',
        vehicle_number: '',
        travel_by: '',
        movementType: '',
        movementPeriod: '',
        reason: '',
        user: {},
      },
      dtfrom: null,
      dtto: null,
      movementStore: null,
      showLoading: null,
      localDate: '',
    }
  },

  async created() {

    this.movementStore = useMovementStore();
    this.showLoading = this.$showLoading;
    this.localDate = this.dtFrom ?? this.movement_apply.date;
    this.movement_apply.date = this.localDate;

  },

  methods: {
    goto_movementview() {
      this.$emit('goto_movementview')
      this.$emit('is-movement-apply')
    },

    async getSave() {
    // console.log("this.localDate:",this.movement_apply.date);
      if (!this.validate()) {
        return
      }

      this.$showConfirm("Are you sure to save this Movement?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = {
              EmpNo: this.empno,
              Date: this.localDate,
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
              Reason: this.movement_apply.reason,
            }
            //console.log(JSON.stringify(this.movement_apply));
            await this.movementStore.setMovement(req, this.showLoading);

            let reqGetViewMovement = {
              fromDate: this.localDate,
              toDate: this.localDate,
              empNo: this.empno,
            }

            await this.movementStore.getViewMovement(reqGetViewMovement, this.showLoading)
            this.$emit('goto_movementview')

          } else {
            console.log("Action canceled");
          }
        });

        this.movement_apply = {};
    },

    movementTypeChanged(selected_item) {
      this.isWFH = (selected_item == 'Work From Home') ? true : false

    },

    movementPeriodChanged(selected_item) {


    },

    clearErrorOnInput(field) {
      this[field] = true; // mark as touched
      if (this.err[field]) {
        this.err[field] = '';
      }
    },


    validate() {
      this.clearErr();

      let validate = true;

      if (!this.isWFH && this.movement_apply.date == '') {
        this.err.date = "Invalid Date";
        validate = false;
      }

      if (!this.isWFH && this.movement_apply.out_time == '') {
        this.err.out_time = "Invalid Out Time";
        validate = false;
      }

      if (this.movement_apply.movementPeriod == '') {
        this.err.movementPeriod = "Invalid Movement Period";
        validate = false;
      }
      if (!this.isWFH && this.movement_apply.in_time == '') {
        this.err.in_time = "Invalid In Time";
        validate = false;
      }

      // if (!this.isWFH && this.movement_apply.out_time > this.movement_apply.in_time) {
      //   this.err.movementPeriod = "Invalid  Mov.  Start Time  and    End Time";
      //   validate = false;
      // }

      if (!this.isWFH && this.movement_apply.start_from == '') {
        this.err.start_from = "Please select an option";
        validate = false;
      }

      if (!this.isWFH && this.movement_apply.movementType == '') {
        this.err.movementType = "Please select a movement type";
        validate = false;
      }

      if (!this.isWFH && this.movement_apply.from_location == '') {
        this.err.from_location = "Invalid From Location";
        validate = false;
      }

      if (!this.isWFH && this.movement_apply.to_location == '') {
        this.err.to_location = "Invalid To Location";
        validate = false;
      }

      if (!this.isWFH && this.movement_apply.reason == '') {
        this.err.reason = "Invalid Reason";
        validate = false;
      }

      return validate
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
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
.cssholidayview {
  min-height: 1500px;
}

.testmargin {
  margin-top: 10px;
}

.cssholidayview>div {
  min-height: 100vh;
}

.cssrows {
  height: 500px;
  scrollbar-width: thin;
}
</style>