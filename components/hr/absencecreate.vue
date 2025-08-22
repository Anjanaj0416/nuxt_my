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
            Applying Leave - {{ leaveyear }}
          </div>
        </div>
        <div class="cursor-pointer hover:text-gray-600" title="Exit Leave Apply" @click="goto_absenceview">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 mt-2 w-full lg:w-4/5">
        <div class="my-4 bg-gray-600 px-4 py-8 text-white rounded">
          <div class="grid grid-cols-2 gap-y-2">
            <div class="">Absence Type</div>
            <div class="">
              <selectinput2 v-model="absense_apply.absence_type" :cur_item="absense_apply.absence_type"
                :selections="hrStore.initData.initAbsence.arrAbsenceType" />
            </div>

            <div class="">Absence Reason</div>
            <div class="">
              <!-- <selectinput2 v-model="absense_apply.absence_reason" :cur_item="absense_apply.absence_reason"
                :selections="hrStore.initData.initAbsence.arrAbsenceTeason" />
              <br /> -->
              <input type="text" v-model="absense_apply.absence_reason"
                class="text-black w-full rounded p-1 border-gray-500 rounded p-2" />
            </div>

            <div class="" v-show="absense_apply.absence_type !== 'Short Leave'">
              Leave Type
            </div>
            <div class="" v-show="absense_apply.absence_type !== 'Short Leave'">
              <selectinput2 v-model="absense_apply.leave_type" :cur_item="absense_apply.leave_type"
                :selections="hrStore.initData.initAbsence.arrLeaveType" />
            </div>



            <div class="">Related Document</div>
            <div class="">
              <!-- <imagecomp v-model="leavedocDetails.Uploading_file_details.file" caption=""
                :image_file="'medicalreports/' + absense_apply.medical_report" @ImageChanged="ImageChanged"
                ref="refImg" /> -->
            </div>
          </div>

          <div class="mt-2">
            <div class="font-bold"></div>
            <div class="grid grid-cols-6 my-4">
              <div>Date</div>
              <div>
                <input class="text-gray-600 rounded p-1" type="date" v-model="absense_apply.start_date" />
                <!-- @change="LoadLeaveBalance" -->
              </div>
              <div class="text-right pr-2" v-show="absense_apply.absence_type === 'Short Leave'">
                Short Leave Start
              </div>
              <div v-show="absense_apply.absence_type === 'Short Leave'">
                <input class="text-gray-600 rounded p-1" v-model="absense_apply.start_time" type="time" />
              </div>

              <div v-show="absense_apply.absence_type === 'Short Leave'" class="text-right pr-2">
                Short Leave End
              </div>
              <div v-show="absense_apply.absence_type === 'Short Leave'">
                <input class="text-gray-600 rounded p-1" type="time" v-model="absense_apply.end_time" />
              </div>
            </div>

            <!-- <div class="grid grid-cols-4 mt-2 w-1/2">
              <div>
                <div v-show="absense_apply.absence_type != 'Short Leave'">
                  To Date
                </div>
              </div>
              <div>
                <input v-show="absense_apply.absence_type != 'Short Leave'" class="text-gray-600 rounded p-1"
                  type="date" v-model="absense_apply.end_date" />
              </div>
            </div> -->

            <div class="mt-8 w-full flex justify-end gap-x-4">
              <btnhr_Save class="w-20" name="Clear" @click="getClear" :disabled="isSaving" />
              <btnhr_Save class="w-20" name="Save" @click="getSave" :disabled="isSaving" />
            </div>
          </div>
        </div>

        <div class="my-4">
          <leave_entitlement :leaveBalances="hrStore.absense.arrLeaveBalances" :year="leaveyear" />
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
      leavedocDetails: {
        imagechanged: false,
        Uploading_file_details: {
          file: '',
          destpath: '\\HR\\medicalreports\\temp.png',
        },
      },
      leave_entitle_year: -1,
      isSaving: false,
      showLoading: null,
      hrStore: null,
    }
  },

  async created() {
    this.hrStore = useHrStore();
    this.showLoading = this.$showLoading;
  },

  beforeMount() {
    this.leave_entitle_year = new Date().getFullYear();
  },
  methods: {
    async init() { },
    goto_absenceview() {
      this.$emit('goto_absenceview')
    },
    ImageChanged() {
      this.leavedocDetails.imagechanged = true
    },

    async getSave() {
      this.$showConfirm("Sure to apply this leave?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            if (this.isSaving) return; // Prevent multiple submissions
            this.isSaving = true;
            try {
              if (!this.validate()) return;
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
              await this.hrStore.setLeave(reqSetLeave, this.showLoading);
              console.log('setLeave:', reqSetLeave);
              await this.hrStore.getViewAbsences(
                {
                  empNo: this.absense_apply.empNo,
                  fromDate: this.fromDate,
                  toDate: this.toDate,
                },
                this.showLoading
              );
              this.getClear();
              this.$emit('goto_absenceview');
            } finally {
              this.isSaving = false; // Re-enable the button
            }
          }
        });
    },

    // async LoadLeaveBalance() {
    //   this.leave_entitle_year = new Date(this.absense_apply.start_date).getFullYear();
    //   await this.hrStore.getLeaveBalance({ empNo: this.empno, year: this.leave_entitle_year }, this.showLoading)
    // },

    validate() {
      if (this.absense_apply.absence_type == '') {
        this.show_error('Invalid Absence Type')
        return false
      }
      if (this.absense_apply.absence_reason == '') {
        this.show_error('Invalid Absence Reason')
        return false
      }
      if (
        this.absense_apply.absence_type != 'Short Leave' &&
        this.absense_apply.leave_type == ''
      ) {
        this.show_error('Invalid Leave Type')
        return false
      }
      if (this.absense_apply.start_date == '') {
        this.show_error('Invalid  Date')
        return false
      }

      // if (
      //   this.absense_apply.absence_type != 'Short Leave' &&
      //   this.absense_apply.end_date == ''
      // ) {
      //   this.show_error('Invalid End Date')
      //   return false
      // }

      if (
        this.absense_apply.start_time == '00:00' &&
        this.absense_apply.absence_type == 'Short Leave'
      ) {
        this.show_error('Invalid Start Time')
        return false
      }

      if (
        this.absense_apply.end_time == '00:00' &&
        this.absense_apply.absence_type == 'Short Leave'
      ) {
        this.show_error('Invalid End Time')
        return false
      }

      if (this.absense_apply.absence_type == 'Short Leave') {
        this.absense_apply.end_date = this.absense_apply.start_date
      }

      // if (this.absense_apply.leave_type === 'full day') {
      //   const diffTime =
      //     new Date(this.absense_apply.end_date) -
      //     new Date(this.absense_apply.start_date)

      //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      //   if (diffDays <= 0) {
      //     this.showMessage({
      //       type: 'Failed',
      //       message: 'Start and End Date Invalid',
      //     })
      //     return false
      //   }
      // }
      return true
    },

    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },

    getClear() {
      this.absense_apply.absence_type = ''
      this.absense_apply.absence_reason = ''
      this.absense_apply.leave_type = ''
      this.absense_apply.start_date = ''
      this.absense_apply.start_time = '00:00'
      this.absense_apply.end_date = ''
      this.absense_apply.end_time = '00:00'
      this.absense_apply.medical_report = ''
    },
  },
}
</script>

<style scoped></style>
