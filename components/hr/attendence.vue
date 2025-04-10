<template>
  <section class="p-2">
    <div class="relative min-h-screen px-4 pt-2 text-sm">
      <div class="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between">
        <div class="flex flex-wrap justify-between gap-2">
          <div class="p-2 text-xs font-semibold uppercase bg-blue-600 rounded-md sm:text-sm text-SID-blue">
            Attendence
          </div>

          <div class="p-2 text-xs font-semibold uppercase bg-blue-600 rounded-md sm:text-sm text-SID-blue">
            <a :href="imageroot + '/Resource/HR/Attendence_Rectify_Form.docx'" target="_blank" class="hover:text-white">
              Rectify Form
            </a>
          </div>
        </div>

        <datediff :empno="empno" ref="datediffRef" @click="getLoadAttendnece" class="mb-2 sm:mb-0" />
        <div class="flex flex-wrap items-center justify-between gap-4 rounded-md sm:justify-start">
          <div
            class="w-full p-2 font-bold text-center text-gray-700 border border-white rounded-md sm:w-auto hover:text-white">
            Normal OT Hrs - {{ hrStore.attendence.tot_normal_overtime }}
          </div>
          <div
            class="w-full p-2 font-bold text-center text-gray-700 border border-white rounded-md sm:w-auto hover:text-white">
            Sunday OT Hrs - {{ hrStore.attendence.tot_sunday_overtime }}
          </div>

          <div class="w-full sm:w-auto">
            <btnhr_print class="w-full sm:w-20" name="Download" @click="getDownload" />
          </div>
          <div class="w-full sm:w-auto">
            <btnhr_print class="w-full sm:w-20" name="Print" @click="getPrint" />
          </div>
          <div class="w-full cursor-pointer sm:w-auto hover:text-SID-blue" title="Exit Absence" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto sm:mx-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>


      <div class="absolute top-0 right-0 hidden px-4 mt-16 sm:hidden md:block">
        <atten_colorbox />
      </div>


      <div class="block md:hidden">
        <atten_colorbox />
      </div>

      <div class="grid w-full grid-cols-1 p-2 text-center text-white bg-blue-800 lg:grid-cols-12 lg:w-5/6 rounded-t-md">
        <div class="hidden lg:block">Emp No</div>
        <div class="hidden lg:block">Date</div>
        <div class="hidden lg:block">In Time</div>
        <div class="hidden lg:block">Out Time</div>
        <div class="hidden lg:block">In Location</div>
        <div class="hidden lg:block">Out Location</div>
        <div class="hidden lg:block">Over Time</div>
        <div class="hidden lg:block">Status</div>

        <div class="hidden lg:block"></div>
        <div class="hidden lg:block"></div>
        <div class="hidden lg:block"></div>
      </div>
      <div v-for="dayatt in hrStore.attendence.alattendences" :key="dayatt">
        <!-- {{dayatt}} <br>
         {{ getDayTypeName(dayatt) }} -->
        <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md lg:w-5/6" v-bind:class="[getAttRowColor(dayatt)]">
          <div class="grid grid-cols-1 text-center lg:grid-cols-12">
            <div>{{ dayatt.empNo }}</div>
            <!-- <div>{{ $options.filters.toReadableDate(dayatt.date) }}</div> -->
            <div class="mx-auto">
              <div class="flex gap-x-2 ">

                <div>
                  <!-- <attnrectify
                  v-model="dayatt.intime"
                  :rowid="dayatt.id"
                  :rectifingrow="rectifingrow"
                /> -->
                  {{ dayatt.date.split('T')[0] }}

                </div>
                <div>
                  <swipes v-show="dayatt.swipesIn.length > 0" :swipes="dayatt.swipesIn" class=""
                    :cssbg="getAttRowColor(dayatt)" />
                </div>
              </div>

            </div>
            <div class="mx-auto">
              <div class="flex gap-x-2">
                <div>
                  <attnrectify v-model="dayatt.outTime" :rowid="dayatt.id" :rectifingrow="rectifingrow" />
                  {{ dayatt.outTime }}
                </div>


                <div>
                  <swipes v-show="dayatt.swipesOut.length > 0" :swipes="dayatt.swipesOut" class=""
                    :cssbg="getAttRowColor(dayatt)" />
                </div>
              </div>
            </div>

            <div>{{ dayatt.outTime }} </div>
            <div>{{ dayatt.inLocation }}</div>
            <div>{{ dayatt.outLocation }}</div>
            <div>{{ getDayTypeName(dayatt.dayType) }}</div>
            <div>test</div>
            <div>
              <span v-show="dayatt.lateMin > 0">
                Late {{ dayatt.weekType }} min</span>
            </div>

            <div class="">
              <btnhr_rectify v-show="dayatt.dayType == 505 && !isOTAppling &&
                (!isrectifing || rectifingrow == dayatt.id)
                " :rowid="dayatt.id" :rectifingrow="rectifingrow" ref="ref_btnrectify"
                @save_rectification="save_rectification" @click="setRectifing(dayatt.id)" @canceledit="cancelRectify" />

              <div v-show="!isrectifing &&
                dayatt.dayType == 505 &&
                !isOTAppling &&
                (!isrectifing || rectifingrow == dayatt.id)
                "
                class="w-1/2 p-2 font-bold text-center border-gray-500  rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white"
                @click="showRectifing(dayatt.id)">
                Rectify
              </div>

              <!-- && loggeduser.granted.indexOf('hradmin')>-1 -->
            </div>
            <div>

              <div v-show="isOTEntitled &&
                !isOTAppling &&
                dayatt.dayType != 100.1 &&
                rectifingrow == -1 &&
                dayatt.inTime != '00:00' &&
                (dayatt.overTime != '' && dayatt.overTime != '0' && dayatt.overTime != '00.00') &&
                !dayatt.isOTApplied
                "
                class="w-4/5 p-1 p-2 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white"
                @click="showOTApplyForm(dayatt.id)">
                Apply OT
              </div>
            </div>
            <div>

              <!-- <div v-show="loggeduser.granted.indexOf('hradmin') > -1 || loggeduser.granted.indexOf('admin') > -1"
                class="w-4/5 p-1 p-2 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white"
                @click="getReCalcOT(dayatt)">
                ReCalc.OT
              </div> -->
            </div>

          </div>

          <div class="w-full p-2 mt-1 bg-gray-400 rounded-md" v-show="isrectifing && rectifingrow == dayatt.id">

            <RectifyForm class="flex text-gray-800 gap-x-4">
              <div>
                <span class="pr-4">In Time</span>
                <input v-model="rectificationRequest.inTime" :disabled="dayatt.inTime != '00:00' ? true : false"
                  type="time" />
              </div>
              <div>
                <span class="pr-4">Out Time </span>
                <input v-model="rectificationRequest.outTime" :disabled="dayatt.outTime != '00:00' ? true : false"
                  type="time" />
              </div>

              <div>
                <span class="pr-4">Rectification Reason</span>
                <input v-model="rectificationRequest.reason" type="text" />
              </div>

              <div
                class="p-2 px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="save_rectification(dayatt.id)">
                Apply
              </div>

              <div
                class="p-2 px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="isrectifing = false, rectifingrow = -1">
                >
                Cancel
              </div>
            </RectifyForm>
          </div>

          <div class="w-full p-2 mt-1 bg-gray-400 rounded-md" v-show="isOTAppling && otApplingRow == dayatt.id">
            <OTApplyForm class="flex text-gray-800 gap-x-4">
              <div>
                <span class="pr-4">From</span>
                <input v-model="oTPreApprovalRequest.OTFrom" @blur="calcOTHours" type="time" />
              </div>
              <div>
                <span class="pr-4">To </span>
                <input v-model="oTPreApprovalRequest.OTTo" @blur="calcOTHours" type="time" />
              </div>
              |
              <!-- <div class="">OT Hrs : {{ OTApllyDetails.ot_hours }}</div> -->
              |
              <div>
                <span class="pr-4">Nature Of Works</span>
                <input v-model="oTPreApprovalRequest.Reason" type="text" />
              </div>

              <div
                class="p-2 px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="setApplyOT(dayatt.date)">
                Apply
              </div>

              <div
                class="p-2 px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="isrectifing = false, rectifingrow = -1">
                Cancel
              </div>
            </OTApplyForm>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import btnhr_print from '~/components/hr/btnhr_print'
import btnhr_rectify from '~/components/hr/btnhr_rectify'
import atten_colorbox from '~/components/hr/atten_colorbox'
import attnrectify from '~/components/hr/attnrectify'

import swipes from '~/components/hr/swipes'
import datediff from '~/components/hr/datediff'
import { useHrStore } from '~/stores/modules/hrStore'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno', 'empname', 'isOTEntitled'],

  data() {
    return {
      imageroot: '',
      currow: -1,
      rectifingrow: -1,
      isrectifing: false,
      otApplingRow: -1,
      isOTAppling: false,
      dtfrom: '',
      dtto: '',
      attenViewRequest: {},
      rectificationRequest: {
        inTime: '',
        outTime: '',
        reason: '',
      },
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
      showLoading: null,
    }
  },

  components: {
    btnhr_print,
    btnhr_rectify,
    atten_colorbox,
    datediff,
    swipes,
    attnrectify,
  },
  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   attendence: (state) => state.hr.attendencedetails.attendence,
    //   OTApllyDetails: (state) => state.hr.OTApllyDetails,
    // }),

    getAttRowColor() {
      return (dayatt) => {
        try {
          let rowclass =
            dayatt.daytype == 503 ||
              dayatt.daytype == 503.1 ||
              dayatt.daytype == 503.5 ||
              dayatt.daytype == 503.3
              ? 'cssShortLeave'
              : dayatt.daytype == 504 ||
                dayatt.daytype == 504.1 ||
                dayatt.daytype == 504.5 ||
                dayatt.daytype == 504.3
                ? 'cssHalfday'
                : dayatt.daytype == 505 ||
                  dayatt.daytype == 505.1 ||
                  dayatt.daytype == 505.5 ||
                  dayatt.daytype == 505.3
                  ? 'cssInComplete'
                  : dayatt.daytype == 506
                    ? 'cssHoliday'
                    : (dayatt.daytype == 507 ||
                      dayatt.daytype == 507.1 ||
                      dayatt.daytype == 507.5 ||
                      dayatt.daytype == 507.3)
                      ? 'cssMovement'
                      : dayatt.daytype ==
                        (dayatt.daytype == 508 ||
                          dayatt.daytype == 508.1 ||
                          dayatt.daytype == 508.5 ||
                          dayatt.daytype == 508.3)
                        ? 'cssLeave'
                        : dayatt.weektype == 501
                          ? 'cssSaturday'
                          : dayatt.weektype == 502
                            ? 'cssSunday'
                            : dayatt.daytype == 510
                              ? 'cssSWA'
                              : dayatt.daytype == 511
                                ? 'cssTransport'
                                : 'cssDefault'

          // : dayatt.daytype == 509
          //       ? 'cssNoPay'
          return rowclass
        } catch {
          return ''
        }
      }
    },

    getDayTypeName() {
      return (dayatt) => {
        try {
          // return this.wgInitdata.alusersInUsergroups
          //   .map((usr) => usr.usergroup)
          //   .filter((v, i, a) => a.indexOf(v) === i)
          //   .sort()

          let dayname =

            dayatt.daytype == 503
              ? 'ShortLeave'
              : dayatt.daytype == 504
                ? 'Halfday'
                : dayatt.daytype == 504.1
                  ? 'Halfday-Apprv. Pending'
                  : dayatt.daytype == 504.5
                    ? 'HFA'
                    : dayatt.daytype == 504.3
                      ? 'Halfday-Apprv. Rejected'
                      : dayatt.daytype == 509
                        ? 'No-Pay'
                        : dayatt.daytype == 505.1
                          ? 'Rect. Apprv. Pending'
                          : dayatt.daytype == 505.5
                            ? 'Rect. Approved'
                            : dayatt.daytype == 505.3
                              ? 'Rectt. Apprv. Rejected'
                              : dayatt.daytype == 507
                                ? 'Movement'
                                : dayatt.daytype == 507.1
                                  ? 'Movement-Apprv.Pending'
                                  : dayatt.daytype == 507.5
                                    ? 'MA'
                                    : dayatt.daytype == 507.3
                                      ? 'Movement Apprv. Rejected'
                                      : dayatt.daytype == 508
                                        ? 'Leave'
                                        : dayatt.daytype == 508.1
                                          ? 'Leave Apprv. Pending'
                                          : dayatt.daytype == 508.5
                                            ? 'LA'
                                            : dayatt.daytype == 508.3
                                              ? 'Leave Apprv. Rejected'
                                              : dayatt.weektype == 501
                                                ? 'Saturday'
                                                : dayatt.weektype == 502
                                                  ? 'Sunday'
                                                  : dayatt.daytype == 510
                                                    ? dayatt.comment
                                                    : dayatt.daytype == 511
                                                      ? 'Transport'
                                                      : dayatt.daytype == 100.1
                                                        ? 'OT Apprv. Pending'
                                                        : dayatt.daytype == 100.5
                                                          ? 'OTA'
                                                          : dayatt.daytype == 100.3
                                                            ? 'OT Apprv. Rejected'
                                                            : dayatt.daytype == 506
                                                              ? 'Holiday'
                                                              : dayatt.daytype == 505
                                                                ? 'InComplete'

                                                                : dayatt.comment

          return dayname
        } catch {
          return ''
        }
      }
    },
  },

  async created() {
    this.hrStore = useHrStore();
  },

  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   getAttendence: 'hr/getAttendence',
    //   rectifyAttendance: 'hr/rectifyAttendance',
    //   setOTApproval: 'hr/setOTApproval',
    //   getOTHours: 'hr/getOTHours',
    //   GetRe_calcOT: 'hr/GetRecalcOT',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   reset: 'hr/RESET_ATTENDENCE',
    // }),

    async init() {
      this.reset()
      var date = new Date()
      this.dtfrom = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.dtto = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      )
      await this.getAttendence({
        from_date: this.dtfrom,
        to_date: this.dtto,
        empno: this.empno,
      })
    },

    setRectifing(rowid) {
      this.$refs.ref_btnrectify.canceledit
      this.rectifingrow = rowid
      this.isrectifing = true



    },

    async calcOTHours() {
      if (
        this.oTPreApprovalRequest.OTFrom != '' &&
        this.oTPreApprovalRequest.OTTo != ''
      ) {
        await this.getOTHours({
          empno: this.empno,
          OTFrom: this.oTPreApprovalRequest.OTFrom,
          OTTo: this.oTPreApprovalRequest.OTTo,
          user: this.loggeduser,
        })
        this.oTPreApprovalRequest.otHour = this.OTApllyDetails.ot_hours
      }
    },

    async save_rectification(row_id) {
      if (!confirm('Sure to apply this Rectification?')) {
        return
      }

      let item_attn = this.attendence.alattendences.filter((att) => {
        return att.id == row_id
      })[0]

      if (
        this.validateRectificationApply()
      ) {
        let req = {
          attendance_id: row_id,
          intime: this.rectificationRequest.inTime,
          outtime: this.rectificationRequest.outTime,
          comment: this.rectificationRequest.reason,
          user: this.loggeduser,
        }
        await this.rectifyAttendance(req)

        this.rectifingrow = -1
        this.isrectifing = false
        this.rectificationRequest.reason = ''
        this.rectificationRequest.inTime = '00:00'
        this.rectificationRequest.outTime = '00:00'
      }
    },

    cancelRectify() {
      this.rectifingrow = -1
      this.isrectifing = false
    },

    async getLoadAttendnece(req) {
      this.dtfrom = req.dtfrom
      this.dtto = req.dtto

      this.attenViewRequest = {
        from_date: this.dtfrom,
        to_date: this.dtto,
        empno: this.empno,
      }

      //console.log(JSON.stringify(this.attenViewRequest))

      // await this.getAttendence(this.attenViewRequest)

    },

    async setApplyOT(otDate) {
      this.oTPreApprovalRequest.empno = this.empno
      this.oTPreApprovalRequest.date = otDate
      if (this.validateOTApply()) {
        if (confirm('Sure to apply this OT Pre-Approval?')) {
          let req = {
            oTPreApprovalRequest: this.oTPreApprovalRequest,
            user: this.loggeduser,
          }
          //console.log(req)
          await this.setOTApproval(req)
        }
        this.oTPreApprovalRequest.OTFrom = ''
        this.oTPreApprovalRequest.OTTo = ''
        this.isOTAppling = false
        this.otApplingRow = -1
      }
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },

    validateRectificationApply() {
      if (this.rectificationRequest.inTime == '00:00') {
        this.show_error('Invalid In Time')
        return false
      }
      if (this.rectificationRequest.outTime == '00:00') {
        this.show_error('Invalid Out Time')
        return false
      }
      if (this.rectificationRequest.reason == '') {
        this.show_error('Invalid Rectification Reason')
        return false
      }
      return true
    },

    validateOTApply() {
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

    showOTApplyForm(rowId) {
      this.otApplingRow = rowId
      this.isOTAppling = true
    },

    async getReCalcOT(attn) {
      if (attn.intime == '00:00' || attn.intime == '00:00') {
        this.show_error('Invalid In or Out Time')
      }
      else {
        await this.GetRe_calcOT({ Id: attn.id })
      }
    },

    showRectifing(rowId) {
      this.rectifingrow = rowId
      this.isrectifing = true

      let item_attn = this.attendence.alattendences.filter((att) => {
        return att.id == rowId
      })[0]

      this.rectificationRequest.inTime = item_attn.intime;
      this.rectificationRequest.outTime = item_attn.outtime;
    },

    async getclose() {
      this.$emit('exit')
      await this.hrStore.clearAttendance();
    },

    getDownload() {
      if (this.dtfrom != '' && this.dtto != "") {

        window.open('http://220.247.243.114:2021/api/Attedence/getAttendenceByEmployee?empno=010805&from_date=' + this.dtfrom + '&to_date=' + this.dtto, '_blank');

      }
      else { alert('select the date range') }
    },

    getPrint() {
      //  console.log(this.loggeduser)

      let req = {
        from_date: this.dtfrom,
        to_date: this.dtto,
        empno: this.empno,
        empname: this.empname,
        // granted: this.loggeduser.granted,
      }

      const encodedData = Global.atob(JSON.stringify(req))

      window.open(
        'http://officeapps.sltds.lk:2021/HR/attendence_printview?hr=' +
        encodedData,
        '_blank'
      )
      //  window.open(
      //   'http://localhost:3000/HR/attendence_printview?hr=' + encodedData,
      //   '_blank'
      // )
    },
  },
}
</script>

<style scoped>
.cssNoPay {
  @apply bg-red-700;
}

.cssShortLeave {
  @apply bg-green-700;
}

.cssHalfday {
  @apply bg-blue-700;
}

.cssInComplete {
  @apply bg-orange-500;
}

.cssHoliday {
  @apply bg-indigo-700;
}

.cssMovement {
  @apply bg-yellow-500;
}

.cssLeave {
  @apply bg-pink-700;
}

.cssSaturday {
  @apply bg-gray-800;
}

.cssSunday {
  @apply bg-gray-800;
}

.cssDefault {
  @apply bg-gray-600;
}

.cssSWA {
  @apply bg-green-400;
}

.cssTransport {
  @apply bg-red-400;
}
</style>
