<template>
  <section>
    <h2 class="text-lg font-semibold text-gray-700 mb-2 tracking-wide">
        Apply OT 
    </h2>
    <div class="flex flex-wrap items-end gap-3 text-sm">
      <!-- In Time -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          In Time
        </label>
        <input 
               type="time"
               v-model="oTPreApprovalRequest.OTFrom"
               @blur="calcOTHours"
               @input="clearErrorOnInput('OTFrom')"
               class="px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg text-xs w-28
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition"/>
        <p v-if="errors.OTFrom" class="mt-2 text-sm text-red-600">
          {{ errors.OTFrom }}
        </p>
      </div>

      <!-- Out Time -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Out Time
        </label>
        <input
               type="time"
               v-model="oTPreApprovalRequest.OTTo"
               @blur="calcOTHours"
               @input="clearErrorOnInput('OTTo')"
               class="px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg text-xs w-28
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition"/>
        <p v-if="errors.OTTo" class="mt-2 text-sm text-red-600">
          {{ errors.OTTo }}
        </p>
      </div>

      <!-- OT Hours -->

      <div class="flex flex-col justify-end">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          OT Hours
        </label>
        <div class="px-4 py-1.5 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
          {{ attendanceStore.OTApllyDetails.ot_hours }}
        </div>
      </div>

      <!-- Reason -->
      <div class="flex flex-col flex-1 min-w-[160px]">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Nature Of Works
        </label>
        <input v-model="oTPreApprovalRequest.Reason" type="text" class="px-3 py-1.5 border border-gray-300 rounded-lg text-xs" />
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 pt-1">
        <button @click="validateAndApplyOT()"
                class="px-4 py-1.5 text-xs font-semibold text-white rounded-lg
                       bg-gradient-to-r from-blue-600 to-blue-700
                       hover:from-blue-700 hover:to-blue-800
                       shadow-sm hover:shadow-md
                       active:scale-95 transition">
          ✔ Apply
        </button>
        <button @click="oTApplingCancel"
                class="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100
                       rounded-lg hover:bg-gray-200 shadow-sm active:scale-95 transition">
          Cancel
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

export default {
  props: ["empno","dtFrom","rowId"],

  data() {
    return {
      oTPreApprovalRequest: {
        EmpNo: "",
        Date: "",
        OTFrom: "",
        OTTo: "",
        OTHour: "",
        Reason: "",
      },
      errors: {},
      attendanceStore: null,
      showLoading: null,
    };
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

    async validateAndApplyOT() {
      if (!this.validateOT()) return;

      const confirmed = await this.$showConfirm(
        " Are you sure to apply this OT ?",
        "warning"
      );
      if (!confirmed.isConfirmed) return;

      const req = {
        EmpNo: this.empno,
        Date: this.dtFrom,
        OTFrom: this.oTPreApprovalRequest.OTFrom,
        OTTo: this.oTPreApprovalRequest.OTTo,
        OTHour: this.attendanceStore.OTApllyDetails.ot_hours,
        Reason: this.oTPreApprovalRequest.Reason,
      };

      await this.attendanceStore.setOTApproval(req, this.showLoading);

      // reset form
      this.oTPreApprovalRequest = {
        EmpNo: "",
        Date: "",
        OTFrom: "",
        OTTo: "",
        OTHour: "",
        Reason: "",
      };

      await this.attendanceStore.otCancel();
      await this.$emit('is-ot-apply');
    },

    async oTApplingCancel() {
      this.oTPreApprovalRequest.OTFrom = "";
      this.oTPreApprovalRequest.OTTo = "";
      this.errors = {}; // clear errors
      await this.attendanceStore.otCancel();
      await this.$emit('is-ot-apply');
    },

        clearErrorOnInput(field) {
      if (this.errors[field]) {
        this.errors[field] = "";
      }
    },

    clearErr() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = "";
      });
    },

    validateOT() {
      this.clearErr();
      this.errors = {};
      let valid = true;

      if (!this.oTPreApprovalRequest.OTFrom) {
        this.errors.OTFrom = "In Time is required";
        valid = false;
      }
      if (!this.oTPreApprovalRequest.OTTo) {
        this.errors.OTTo = "Out Time is required";
        valid = false;
      }
      // optional: check OTFrom < OTTo
      if (this.oTPreApprovalRequest.OTFrom && this.oTPreApprovalRequest.OTTo &&
          this.oTPreApprovalRequest.OTFrom >= this.oTPreApprovalRequest.OTTo) {
        this.errors.OTTo = "Out Time must be after In Time";
        valid = false;
      }

      return valid;
    }
  }
};
</script>