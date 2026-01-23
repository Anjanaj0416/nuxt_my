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
                @click="setApplyOT()">
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

import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

export default {
  props: ["empno","dtFrom"],

  data() {
    return {
     
      otManualRow: -1,
      isOtManual: false,

      // otApplingRow: -1,
      // isOTAppling: false,

      dtfrom: "",
      dtto: "",
      
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

  
  computed: {
    
  },

  async created() {
    this.attendanceStore = useAttendanceStore();
    this.showLoading = this.$showLoading;
  },

  methods: {
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


    async oTApplingCancel() {
      this.oTPreApprovalRequest.OTFrom = "";
      this.oTPreApprovalRequest.OTTo = "";
      // this.isOTAppling = false;
      // this.otApplingRow = -1;
      await this.attendanceStore.otCancel();
      await this.$emit('is-ot-apply');
    },

    async setApplyOT() {

      this.$showConfirm("Are you sure to apply this OT?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = {
            EmpNo: this.empno,
            Date: this.dtFrom,
            OTFrom: this.oTPreApprovalRequest.OTFrom,
            OTTo: this.oTPreApprovalRequest.OTTo,
            OTHour: this.attendanceStore.OTApllyDetails.ot_hours,
            Reason: this.oTPreApprovalRequest.Reason,
          };

          await this.attendanceStore.setOTApproval(req, this.showLoading);

          this.oTPreApprovalRequest.OTFrom = "";
          this.oTPreApprovalRequest.OTTo = "";
          this.oTPreApprovalRequest.OTHour = "";
          this.oTPreApprovalRequest.Reason = "";
          // this.isOTAppling = false;
          // this.otApplingRow = -1;
          await this.attendanceStore.otCancel();

          } else {
            console.log("Action canceled");
          }
        });
    },

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

