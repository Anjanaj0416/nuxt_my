<template>
    <section>
        <OTApplyForm class="border rounded p-2 flex text-gray-800 gap-x-4">
              <div>
                <span class="pr-4">From</span>
                <input v-model="oTPreApprovalRequest.OTFrom" @blur="calcOTHours" type="time" />
              </div>
              <div>
                <span class="pr-4">To </span>
                <input v-model="oTPreApprovalRequest.OTTo" @blur="calcOTHours" type="time" />
              </div>
              |
              <div class="">OT Hrs : {{ attendanceStore.OTApllyDetails.ot_hours }}</div>
              |
              <div>
                <span class="pr-4">Nature Of Works</span>
                <input v-model="oTPreApprovalRequest.Reason" type="text" />
              </div>

              <div
                class=" px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="setApplyOT(dayatt.date)">
                Apply
              </div>

              <div
                class=" px-1 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="oTApplingCancel()">
                Cancel
              </div>
            </OTApplyForm>
    </section>
</template>

<script>
import btnhr_print from "~/components/hr/btnhr_print";
import btnhr_rectify from "~/components/hr/btnhr_rectify";
import atten_colorbox from "~/components/hr/atten_colorbox";
import attnrectify from "~/components/hr/attnrectify";
import viewMore from "~/components/hr/viewMore";

import swipes from "~/components/hr/swipes";
import datediff from "~/components/hr/datediff";
import { useUserStore } from "~/stores/modules/userStore";
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

export default {
  props: ["empno", "empname", "isOTEntitled"],

  data() {
    return {
      imageroot: "",
      currow: -1,

      rectifingrow: -1,
      isrectifing: false,

      otManualRow: -1,
      isOtManual: false,

      otApplingRow: -1,
      isOTAppling: false,

      viewRow: -1,
      isView: false,

      commentRow: -1,
      isCommentView: false,

      rowDate: "",

      dtfrom: "",
      dtto: "",
      attenViewRequest: {},
      rectificationRequest: {
        inTime: "",
        outTime: "",
        reason: "",
      },
      oTPreApprovalRequest: {
        EmpNo: "",
        Date: "",
        OTFrom: "",
        OTTo: "",
        OTHour: "",
        Reason: "",
      },
      oTManualRequest: {
        otHour: "",
        comment: "",
      },
      showLoading: null,
      isLoading: false,
      userStore: null,
      attendanceStore: null,
    };
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
    getAttRowColor() {
      return (dayatt) => {
        try {
          let rowclass =
            dayatt.dayType == 503 ||
              dayatt.dayType == 503.1 ||
              dayatt.dayType == 503.5 ||
              dayatt.dayType == 503.3
              ? "cssShortLeave"
              : dayatt.dayType == 504 ||
                dayatt.dayType == 504.1 ||
                dayatt.dayType == 504.5 ||
                dayatt.dayType == 504.3
                ? "cssHalfday"
                : dayatt.dayType == 505 ||
                  dayatt.dayType == 505.1 ||
                  dayatt.dayType == 505.5 ||
                  dayatt.dayType == 505.3
                  ? "cssInComplete"
                  : dayatt.dayType == 506
                    ? "cssHoliday"
                    : dayatt.dayType == 507 ||
                      dayatt.dayType == 507.1 ||
                      dayatt.dayType == 507.5 ||
                      dayatt.dayType == 507.3
                      ? "cssMovement"
                      : dayatt.dayType ==
                        (dayatt.dayType == 508 ||
                          dayatt.dayType == 508.1 ||
                          dayatt.dayType == 508.5 ||
                          dayatt.dayType == 508.3)
                        ? "cssLeave"
                        : dayatt.weekType == 501
                          ? "cssSaturday"
                          : dayatt.weekType == 502
                            ? "cssSunday"
                            : dayatt.dayType == 510
                              ? "cssSWA"
                              : dayatt.dayType == 511
                                ? "cssTransport"
                                : "cssDefault";

          // : dayatt.dayType == 509
          //       ? 'cssNoPay'
          return rowclass;
        } catch {
          return "";
        }
      };
    },

    getDayTypeName() {
      return (dayatt) => {
        try {
          // return this.wgInitdata.alusersInUsergroups
          //   .map((usr) => usr.usergroup)
          //   .filter((v, i, a) => a.indexOf(v) === i)
          //   .sort()

          let dayname =
            dayatt.dayType == 503
              ? "ShortLeave"
              : dayatt.dayType == 504
                ? "Halfday"
                : dayatt.dayType == 504.1
                  ? "Halfday-Apprv. Pending"
                  : dayatt.dayType == 504.5
                    ? "HFA"
                    : dayatt.dayType == 504.3
                      ? "Halfday-Apprv. Rejected"
                      : dayatt.dayType == 509
                        ? "No-Pay"
                        : dayatt.dayType == 505.1
                          ? "Rect. Apprv. Pending"
                          : dayatt.dayType == 505.5
                            ? "Rect. Approved"
                            : dayatt.dayType == 505.3
                              ? "Rectt. Apprv. Rejected"
                              : dayatt.dayType == 507
                                ? "Movement"
                                : dayatt.dayType == 507.1
                                  ? "Movement-Apprv.Pending"
                                  : dayatt.dayType == 507.5
                                    ? "MA"
                                    : dayatt.dayType == 507.3
                                      ? "Movement Apprv. Rejected"
                                      : dayatt.dayType == 508
                                        ? "Leave"
                                        : dayatt.dayType == 508.1
                                          ? "Leave Apprv. Pending"
                                          : dayatt.dayType == 508.5
                                            ? "LA"
                                            : dayatt.dayType == 508.3
                                              ? "Leave Apprv. Rejected"
                                              : dayatt.weekType == 501
                                                ? "Saturday"
                                                : dayatt.weekType == 502
                                                  ? "Sunday"
                                                  : dayatt.dayType == 510
                                                    ? dayatt.comment
                                                    : dayatt.dayType == 511
                                                      ? "Transport"
                                                      : dayatt.dayType == 100.1
                                                        ? "OT Apprv. Pending"
                                                        : dayatt.dayType == 100.5
                                                          ? "OTA"
                                                          : dayatt.dayType == 100.3
                                                            ? "OT Apprv. Rejected"
                                                            : dayatt.dayType == 506
                                                              ? "Holiday"
                                                              : dayatt.dayType == 505
                                                                ? "InComplete"
                                                                : ""

          return dayname;
        } catch {
          return "";
        }
      };
    },
  },

  async created() {
    this.attendanceStore = useAttendanceStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;

    const firstDate = new Date();
    firstDate.setDate(1); // Set to first day of the month
    this.dtfrom = firstDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Calculate today's date
    this.dtto = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    await this.init();
  },

  methods: {
    async init() {
      var date = new Date();
      this.dtfrom = this.$myUtility.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      );
      this.dtto = this.$myUtility.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      );

    },

    setRectifing(rowid) {
      this.$refs.ref_btnrectify.canceledit;
      this.rectifingrow = rowid;
      this.isrectifing = true;
    },

    async calcOTHours() {
      if (
        this.oTPreApprovalRequest.OTFrom != "" &&
        this.oTPreApprovalRequest.OTTo != ""
      ) {
        await this.attendanceStore.getOTHours({
          EmpNo: this.empno,
          OTFrom: this.oTPreApprovalRequest.OTFrom,
          OTTo: this.oTPreApprovalRequest.OTTo,
        });
      }
    },

    async changeView(rowid) {
      this.viewRow = rowid;
      this.isView = true;//!this.isView
    },

    async getClose() {
      this.viewRow = -1;
      this.isView = !this.isView;
    },

    async changeCommentView(rowid) {
      this.commentRow = rowid;
      this.isCommentView = !this.isCommentView;
    },

    async handleDateChange(reqFromDateDiff) {
      this.dtfrom = reqFromDateDiff.dtfrom;
      this.dtto = reqFromDateDiff.dtto;
      let req = {
        EmpNo: this.empno,
        FromDate: this.dtfrom,
        ToDate: this.dtto,
      };

      // await this.getLoadAttendnece(req);
      await this.attendanceStore.getAttendenceByEmp(req, this.showLoading)
    },

    async getDayAppliedRecords(date) {
      this.rowDate = date.split("T")[0];
      let req = {
        EmpNo: this.empno,
        Date: this.rowDate
      }
      console.log("getDayAppliedRecords:", req);

      await this.attendanceStore.getDayAppliedRecords(req, this.showLoading)
    },

    async oTApplingCancel() {
      this.oTPreApprovalRequest.OTFrom = "";
      this.oTPreApprovalRequest.OTTo = "";
      this.isOTAppling = false;
      this.otApplingRow = -1;
      await this.attendanceStore.otCancel();
      await this.$emit('is-ot-apply');
    },

    async manualOTApplingCancel() {
      this.oTManualRequest.otHour = "";
      this.isOtManual = false;
      this.otManualRow = -1;
      await this.attendanceStore.otCancel();
    },

    async save_rectification(row_id, empNo) {
      this.$showConfirm("Sure to apply this Rectification?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let item_attn = this.attendanceStore.attendence.alattendences.filter((att) => {
              return att.id == row_id;
            })[0];

            if (this.validateRectificationApply()) {
              const fromDate = this.$refs.datediffRef.dtfrom;
              const toDate = this.$refs.datediffRef.dtto;

              let req = {
                attendance_id: row_id,
                intime: this.rectificationRequest.inTime,
                outtime: this.rectificationRequest.outTime,
                comment: this.rectificationRequest.reason,
                EmpNo: empNo,
                FromDate: fromDate,
                ToDate: toDate,
              };

              await this.attendanceStore.setRectifyAttendance(req, this.showLoading);

              this.rectifingrow = -1;
              this.isrectifing = false;
              this.rectificationRequest.reason = "";
              this.rectificationRequest.inTime = "00:00";
              this.rectificationRequest.outTime = "00:00";
            }
          }
        });
    },

    cancelRectify() {
      this.rectifingrow = -1;
      this.isrectifing = false;
    },

    async setApplyOT(otDate) {
      this.oTPreApprovalRequest.EmpNo = this.empno;
      this.oTPreApprovalRequest.date = otDate;

      const fromDate = this.$refs.datediffRef.dtfrom;
      const toDate = this.$refs.datediffRef.dtto;

      if (this.validateOTApply()) {
        if (confirm("Sure to apply this OT Pre-Approval?")) {
          let req = {
            EmpNo: this.oTPreApprovalRequest.EmpNo,
            Date: this.oTPreApprovalRequest.Date,
            OTFrom: this.oTPreApprovalRequest.OTFrom,
            OTTo: this.oTPreApprovalRequest.OTTo,
            OTHour: this.oTPreApprovalRequest.OTHour,
            Reason: this.oTPreApprovalRequest.Reason,
            FromDate: fromDate,
            ToDate: toDate,
          };

          await this.attendanceStore.setOTApproval(req, this.showLoading);
        }
        this.oTPreApprovalRequest.OTFrom = "";
        this.oTPreApprovalRequest.OTTo = "";
        this.oTPreApprovalRequest.OTHour = "";
        this.oTPreApprovalRequest.Reason = "";
        this.isOTAppling = false;
        this.otApplingRow = -1;
        await this.attendanceStore.otCancel();
      }
    },

    async applyOTManual(rowId) {
      const fromDate = this.$refs.datediffRef.dtfrom;
      const toDate = this.$refs.datediffRef.dtto;

      if (this.validateManualOTApply()) {
        if (confirm("Sure to apply this OT Manual?")) {
          let req = {
            id: rowId,
            otHours: this.oTManualRequest.otHour,
            comment: this.oTManualRequest.comment,
            FromDate: fromDate,
            ToDate: toDate,
            EmpNo: this.empno,
          };
          await this.attendanceStore.setOTManual(req, this.showLoading);
        }
        this.oTManualRequest.otHour = "";
        this.oTManualRequest.comment = "";
        this.isOTManualAppling = false;
        this.otApplingRow = -1;
        await this.attendanceStore.otCancel();
      }
    },

    handleInTimeChange(e, dayatt) {
      if (!dayatt.id || dayatt.id === "00000000-0000-0000-0000-000000000000")
        return;



      if (dayatt.inTime !== "00:00") {
        this.rectificationRequest.inTime = dayatt.inTime;
      } else {
        this.rectificationRequest.inTime = e.target.value;
      }
    },

    handleOutTimeChange(e, dayatt) {

      if (dayatt.outTime !== "00:00") {
        this.rectificationRequest.outTime = dayatt.outTime;
      } else {
        this.rectificationRequest.outTime = e.target.value;
      }
    },

    formatComment(html) {
      if (!html) return '';
      // Replace <br> with newline, remove other HTML tags
      return html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
    },

    validateRectificationApply() {
      if (this.rectificationRequest.inTime == "00:00") {
        this.show_error("Invalid In Time");
        return false;
      }
      if (this.rectificationRequest.outTime == "00:00") {
        this.show_error("Invalid Out Time");
        return false;
      }
      if (this.rectificationRequest.reason == "") {
        this.show_error("Invalid Rectification Reason");
        return false;
      }
      return true;
    },

    validateOTApply() {
      if (this.oTPreApprovalRequest.date == "") {
        this.show_error("Invalid Date");
        return false;
      }

      if (this.oTPreApprovalRequest.OTFrom == "") {
        this.show_error("Invalid OT From Time");
        return false;
      }

      if (this.oTPreApprovalRequest.OTTo == "") {
        this.show_error("Invalid OT To Time");
        return false;
      }

      if (this.oTPreApprovalRequest.Reason == "") {
        this.show_error("Invalid Nature Of Work");
        return false;
      }
      return true;
    },

    validateManualOTApply() {
      if (this.oTManualRequest.otHour == "") {
        this.show_error("Invalid OT Hours");
        return false;
      }

      if (this.oTManualRequest.comment == "") {
        this.show_error("Invalid Comment");
        return false;
      }
      return true;
    },

    showOTApplyForm(rowId) {
      this.otApplingRow = rowId;
      this.isOTAppling = true;
    },

    showOTManualApplyForm(rowId) {
      this.otManualRow = rowId;
      this.isOTManualAppling = true;
    },

    async getReCalcOT(attn) {
      if (attn.intime == "00:00" || attn.intime == "00:00") {
        this.show_error("Invalid In or Out Time");
      } else {
        let req = {
          Id: attn.id,
        };
        await this.attendanceStore.getReCalcOT(req, this.showLoading);
      }
    },

    showRectifing(rowId) {
      this.rectifingrow = rowId;
      this.isrectifing = true;

      let item_attn = this.attendanceStore.attendence.alattendences.filter((att) => {
        return att.id == rowId;
      })[0];

      if (item_attn.inTime !== "00:00") {
        this.rectificationRequest.inTime = item_attn.inTime;
      }

      if (item_attn.outTime !== "00:00") {
        this.rectificationRequest.outTime = item_attn.outTime;
      }
    },

    async deleteRecord(recordId, type) {
      console.log("deleteRecord:", recordId, type);

      this.$showConfirm("Sure to delete this record?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = {
              id: recordId
            }
            if (type === "OT Approval") {
              await this.attendanceStore.setDeleteOTApproval(req, this.showLoading);
            }

            if (type === "Leave") {
              await this.attendanceStore.getDeleteAbsence(req, this.showLoading);
            }

            if (type === "Movement") {
              await this.attendanceStore.getDeleteMovement(req, this.showLoading);
            }

            if (type === "Rectify") {
              await this.attendanceStore.setDeleteOTApproval(req, this.showLoading);
            }

            let getDayAppliedRecordsReq = {
              EmpNo: this.empno,
              Date: this.rowDate
            }
            await this.attendanceStore.getDayAppliedRecords(getDayAppliedRecordsReq, this.showLoading);

            let getAttendenceByEmpReq = {
              EmpNo: this.empno,
              FromDate: this.dtfrom,
              ToDate: this.dtto,
            }
            await this.attendanceStore.getAttendenceByEmp(getAttendenceByEmpReq, this.showLoading)

          }
        });
    },

    async getclose() {
      this.$emit("exit");
    },

    // getDownload() {
    //   if (this.dtfrom != '' && this.dtto != "") {

    //     window.open('http://220.247.243.114:2021/api/Attedence/getAttendenceByEmployee?empno=010805&from_date=' + this.dtfrom + '&to_date=' + this.dtto, '_blank');

    //   }
    //   else { alert('select the date range') }
    // },

    showMessage({ type, message }) {
      alert(`${type}: ${message}`); // or use a toast/snackbar
    },

    show_error(msg) {
      this.showMessage({
        type: "Failed",
        message: msg,
      });
    },

    async getPrint() {
      console.log("dtfrom:", this.dtfrom, this.dtto);

      if (this.dtfrom === '' || this.dtto === '') {

        this.$showCustomToast(
          "Select the Dates!",
          "error",
          3000
        );
        return;
      }
      let req = {
        dateFrom: this.dtfrom,
        dateTo: this.dtto,
        empNo: this.empno
      };

      await this.attendanceStore.GetPrintAttendanceSheet(req, this.showLoading);
      // const encodedData = Global.atob(JSON.stringify(req))

      // window.open(
      //   'http://officeapps.sltds.lk:2021/HR/attendence_printview?hr=' +
      //   encodedData,
      //   '_blank'
      // )
      //  window.open(
      //   'http://localhost:3000/HR/attendence_printview?hr=' + encodedData,
      //   '_blank'
      // )
    },
  },
};
</script>

