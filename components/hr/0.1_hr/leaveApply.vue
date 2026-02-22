<template>
  <section class="justify-center mb-12">
    <!-- <div class="text-xl uppercase mb-3">Apply Leave - {{ leaveyear }}</div> -->

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">

      <div class="col-span-2 bg-white ">
        <h2 class="text-lg font-semibold text-gray-700 mb-2 tracking-wide">
            Leave Balance - {{ leaveyear }}
        </h2>
        <leave_entitlement :leaveBalances="leaveStore.absense.arrLeaveBalances" :year="leaveyear" />
      </div>

      <div class="col-span-3 bg-white border shadow-md rounded-2xl px-6 py-3">

        <!-- Header -->
        <div class="mb-3 border-b pb-3">
          <h2 class="text-lg font-semibold text-gray-700 tracking-wide">
            Apply Leave - {{ leaveyear }}
          </h2>
        </div>

        <!-- Form -->
        <div class="space-y-5">

          <!-- Date -->
          <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
            <label class="text-sm font-medium text-gray-600">
              Absence Type
            </label>

            <div class="md:col-span-2">
              <selectinput2 v-model="absense_apply.absence_type" :cur_item="absense_apply.absence_type"
                  :selections="leaveStore.initData.initAbsence.arrAbsenceType" @input="clearErrorOnInput('absence_type')"

              />
              <p v-if="err.absence_type" class="mt-2 text-sm text-red-600">
                {{ err.absence_type }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
            <label class="text-sm font-medium text-gray-600">
              Absence Reason
            </label>

            <div class="md:col-span-2 ">
              <textarea
                type="text"
                @input="clearErrorOnInput('absence_reason')"
                v-model="absense_apply.absence_reason"
                placeholder="Ex: Fever, Family Function, Personal Work, etc."
                class="w-full border rounded-lg px-3 py-2 text-sm
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                      transition"
              />
              <p v-if="err.absence_reason" class="mt-2 text-sm text-red-600">
                {{ err.absence_reason }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
            <label class="text-sm font-medium text-gray-600">
              Leave Type
            </label>

            <div class="md:col-span-2">
              <selectinput2 v-model="absense_apply.leave_type" :cur_item="absense_apply.leave_type"
                @input="clearErrorOnInput('leave_type')"
                  :selections="leaveStore.initData.initAbsence.arrLeaveType" 
              />
              <p v-if="err.leave_type" class="mt-2 text-sm text-red-600">
                {{ err.leave_type }}
              </p>
            </div>
          </div>

          <!-- Date Picker Card -->
          <div class="grid grid-cols-6 my-4 items-center gap-2">
            <div class="text-sm font-medium text-gray-600">Date</div>
            <div class="md:col-span-5">
              <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm hover:shadow-md transition">
                <input 
                  type="date" 
                  v-model="localDate" 
                  @input="clearErrorOnInput('localDate')"
                  class="w-full text-gray-700 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
                <p v-if="err.localDate" class="mt-2 text-sm text-red-600">
                    {{ err.localDate }}
                  </p>
              </div>
            </div>
          </div>

          <!-- Short Leave Times Card -->
          <div v-if="absense_apply.absence_type === 'Short Leave'" class="grid grid-cols-2 my-4 items-center gap-2">
            
            <!-- Start Time -->
            <div class="text-right pr-2 text-sm font-medium text-gray-600">Short Leave Start</div>
            <div>
              <div class="flex items-center gap-2 border border-yellow-400 rounded-lg px-3 py-1.5 shadow-sm hover:shadow-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input 
                  type="time" 
                  v-model="absense_apply.start_time" 
                  @input="clearErrorOnInput('start_time')"
                  class="w-full text-gray-700 text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>
              <p v-if="err.start_time" class="mt-2 text-sm text-red-600">
                {{ err.start_time }}
              </p>
            </div>

            <!-- End Time -->
            <div class="text-right pr-2 text-sm font-medium text-gray-600">Short Leave End</div>
            <div>
              <div class="flex items-center gap-2 border border-red-400 rounded-lg px-3 py-1.5 shadow-sm hover:shadow-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input 
                  type="time" 
                  v-model="absense_apply.end_time" 
                  @input="clearErrorOnInput('end_time')"
                  class="w-full text-gray-700 text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                />
              </div>
              <p v-if="err.end_time" class="mt-2 text-sm text-red-600">
                {{ err.end_time }}
              </p>
            </div>

          </div>
        </div>
          

        <!-- Buttons -->
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

      </div>
    </div>

  </section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import btnhr_Save from '~/components/hr/btnhr_button'
import leave_entitlement from '~/components/hr/0.1_hr/leave_entitlement'
import { useLeaveStore } from '~/stores/modules/hr/leaveStore'
// import imagecomp from '~/components/customcontrol/fupload'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno', 'leaveyear', 'fromDate', 'toDate'],
  components: { selectinput2, btnhr_Save, leave_entitlement },
  data() {
    return {
      absense_apply: {
        empNo: '',
        absence_type: '',
        absence_reason: '',
        leave_type: '',
        start_date: '',
        start_time: '00:00',
        end_date: '',
        end_time: '00:00',
      },
        err: { // <-- Add this
        absence_type: '',
        absence_reason: '',
        leave_type: '',
        localDate: '',
        start_time: '',
        end_time: '',
      },
      touched: {
        absence_type: false,
        absence_reason: false,
        leave_type: false,
        start_date: false,
        start_time: false,
        end_time: false,
      },
      leavedocDetails: {
        imagechanged: false,
        Uploading_file_details: {
          file: '',
          destpath: '\\HR\\medicalreports\\temp.png',
        },
      },
      leave_entitle_year: -1,
      isSaving: false,
      localDate:'',
      showLoading: null,
      leaveStore: null,
    }
  },

  async created() {
    this.leaveStore = useLeaveStore();
    this.showLoading = this.$showLoading;

    this.localDate = this.fromDate ?? this.absense_apply.start_date;
    this.absense_apply.start_date = this.localDate;
  },

  beforeMount() {
    this.leave_entitle_year = new Date().getFullYear();
  },
  methods: {
    async init() { },
    goto_absenceview() {
      this.$emit('goto_absenceview')
      this.$emit('is-leave-apply')
    },
    ImageChanged() {
      this.leavedocDetails.imagechanged = true
    },

    async getSave() {
      if (!this.IsValidate()) return;
      this.$showConfirm("Sure to apply this leave?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            if (this.isSaving) return; // Prevent multiple submissions
            this.isSaving = true;
            try {
              if (this.leavedocDetails.imagechanged) {
                await this.setMedicalDocument(this.leavedocDetails.Uploading_file_details);
              }
              this.absense_apply.empNo = this.empno;
              let reqSetLeave = {
                EmpNo: this.absense_apply.empNo,
                AbsenceType: this.absense_apply.absence_type,
                AbsenceReason: this.absense_apply.absence_reason,
                LeaveType: this.absense_apply.leave_type,
                StartDate: this.absense_apply.start_date,
                StartTime: this.absense_apply.start_time,
                EndDate: this.absense_apply.start_date,
                EndTime: this.absense_apply.end_time,
              };
              await this.leaveStore.setLeave(reqSetLeave, this.showLoading);
              console.log('setLeave:', reqSetLeave);
              await this.leaveStore.getViewAbsences(
                {
                  empNo: this.absense_apply.empNo,
                  fromDate: this.fromDate,
                  toDate: this.toDate ?? this.fromDate,
                },
                this.showLoading
              );
              this.getClear();
              this.$emit('goto_absenceview');
              this.LoadLeaveBalance();
            } finally {
              this.isSaving = false; // Re-enable the button
            }
          }
        });
    },

    async LoadLeaveBalance() {
      await this.leaveStore.getLeaveBalance({ empNo: this.empno, year: this.leave_entitle_year }, this.showLoading)
    },

    async getClear() {
      this.absense_apply.absence_type = ''
      this.absense_apply.absence_reason = ''
      this.absense_apply.leave_type = ''
      this.absense_apply.start_date = ''
      this.absense_apply.start_time = '00:00'
      this.absense_apply.end_date = ''
      this.absense_apply.end_time = '00:00'
      this.absense_apply.medical_report = ''
      this.errors = {}; // clear errors
      // await this.attendanceStore.otCancel();
      await this.$emit('is-leave-apply');
    },


    clearErrorOnInput(field) {
      this.touched[field] = true; // mark as touched
      if (this.err[field]) {
        this.err[field] = '';
      }
    },

    IsValidate() {
      let isValid = true;

      Object.keys(this.touched).forEach(key => this.touched[key] = true);

      if (!this.absense_apply.absence_type) {
        this.err.absence_type = "Please select Absence Type";
        isValid = false;
      }

      if (!this.absense_apply.absence_reason) {
        this.err.absence_reason = "Please enter Absence Reason";
        isValid = false;
      }

      if (!this.absense_apply.leave_type) {
        this.err.leave_type = "Please select Leave Type";
        isValid = false;
      }

      if (!this.absense_apply.start_date) {
        this.err.start_date = "Please select Date";
        isValid = false;
      }

      if (this.absense_apply.absence_type === "Short Leave") {
        if (!this.absense_apply.start_time || this.absense_apply.start_time === "00:00") {
          this.err.start_time = "Please select Start Time";
          isValid = false;
        }
        if (!this.absense_apply.end_time || this.absense_apply.end_time === "00:00") {
          this.err.end_time = "Please select End Time";
          isValid = false;
        }
      }

      return isValid;
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