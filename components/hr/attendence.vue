<template>
  <section class="p-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cumque illum in, voluptate illo reprehenderit
    consectetur ratione unde corporis aliquid repellat quos tempora architecto veritatis iure facilis consequatur
    dolores molestiae.

  </section>
</template>

<script>
import btnhr_print from '~/components/hr/btnhr_print'
import btnhr_rectify from '~/components/hr/btnhr_rectify'
import atten_colorbox from '~/components/hr/atten_colorbox'
import attnrectify from '~/components/hr/attnrectify'

import swipes from '~/components/hr/swipes'
import datediff from '~/components/customcontrol/datediff'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno', 'empname', 'isOTEntitled'],

  data() {
    return {
      imageroot: process.env.Assets_83,
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

      await this.getAttendence(this.attenViewRequest)

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

    getclose() {
      this.$emit('exit')
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
