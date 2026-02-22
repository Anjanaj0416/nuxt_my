<template>
  <section>
    <div class="flex flex-wrap items-end gap-3 p-3 text-sm">
      
      <!-- In Time -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          In Time
        </label>
        <div v-if="dayatt.inTime !== '00:00' && !isEditing"
             class="px-3 py-1.5 bg-gray-50 border rounded-lg text-gray-700 text-xs font-semibold">
          {{ dayatt.inTime }}
        </div>
        <input v-else
               type="time"
               v-model="rectificationRequest.inTime"
               class="px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg text-xs w-28
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition"/>
        <p v-if="err.inTime" class="mt-2 text-sm text-red-600">
          {{ err.inTime }}
        </p>
      </div>

      <!-- Out Time -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Out Time
        </label>
        <div v-if="dayatt.outTime !== '00:00' && !isEditing"
             class="px-3 py-1.5 bg-gray-50 border rounded-lg text-gray-700 text-xs font-semibold">
          {{ dayatt.outTime }}
        </div>
        <input v-else
               type="time"
               v-model="rectificationRequest.outTime"
               class="px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg text-xs w-28
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition"/>
        <p v-if="err.outTime" class="mt-2 text-sm text-red-600">
          {{ err.outTime }}
        </p>
      </div>

      <!-- Reason -->
      <div class="flex flex-col flex-1 min-w-[160px]">
        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Reason
        </label>
        <input type="text"
               v-model="rectificationRequest.reason"
               placeholder="Enter reason..."
               class="px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition"/>
        <p v-if="err.reason" class="mt-2 text-sm text-red-600">
          {{ err.reason }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 pt-1">
        <button @click="saveRectification(dayatt.id, dayatt.empNo)"
                class="px-4 py-1.5 text-xs font-semibold text-white rounded-lg
                       bg-gradient-to-r from-blue-600 to-blue-700
                       hover:from-blue-700 hover:to-blue-800
                       shadow-sm hover:shadow-md
                       active:scale-95 transition">
          ✔ Apply
        </button>
        <button @click="cancelRectificationClick"
                class="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100
                       rounded-lg hover:bg-gray-200 shadow-sm active:scale-95 transition">
          ✕ Cancel
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

export default {
  props: {
    dayatt: { type: Object, required: true }
  },
  data() {
    return {
      isEditing: false,
      rectificationRequest: { inTime: "00:00", outTime: "00:00", reason: "" },
      err: {}
    };
  },
  created() {
    this.attendanceStore = useAttendanceStore();
    this.showLoading = this.$showLoading;
    // Initialize rectification request from dayatt
    this.rectificationRequest.inTime = this.dayatt.inTime !== "00:00" ? this.dayatt.inTime : "00:00";
    this.rectificationRequest.outTime = this.dayatt.outTime !== "00:00" ? this.dayatt.outTime : "00:00";
  },
  methods: {
    clearErr() {
      this.err = {};
    },

    cancelRectificationClick() {
      this.isEditing = false;
      this.rectificationRequest = {
        inTime: this.dayatt.inTime !== "00:00" ? this.dayatt.inTime : "00:00",
        outTime: this.dayatt.outTime !== "00:00" ? this.dayatt.outTime : "00:00",
        reason: ""
      };
       this.$emit("closePanel")
    },

    async saveRectification(rowId, empNo) {
      if (!this.validateForm()) return;

      const confirmed = await this.$showConfirm(
        "Sure to apply this Rectification??",
        "warning"
      );
      if (!confirmed.isConfirmed) return;

      const fromDate = this.$refs.datediffRef?.dtfrom || "";
      const toDate = this.$refs.datediffRef?.dtto || "";

      const req = {
        attendance_id: rowId,
        intime: this.rectificationRequest.inTime,
        outtime: this.rectificationRequest.outTime,
        comment: this.rectificationRequest.reason,
        EmpNo: empNo,
        FromDate: fromDate,
        ToDate: toDate
      };

      await this.attendanceStore.setRectifyAttendance(req, this.showLoading);
      await this.attendanceStore.fetchAttendances(fromDate, toDate);

      this.$emit("closePanel");

      this.isEditing = false;
      this.rectificationRequest.reason = "";
    },

    validateForm() {
      this.clearErr();
      let isValid = true;

      if (!this.rectificationRequest.inTime || this.rectificationRequest.inTime === "00:00") {
        this.err.inTime = "Please select In Time";
        isValid = false;
      }
      if (!this.rectificationRequest.outTime || this.rectificationRequest.outTime === "00:00") {
        this.err.outTime = "Please select Out Time";
        isValid = false;
      }
      if (!this.rectificationRequest.reason.trim()) {
        this.err.reason = "Please enter reason";
        isValid = false;
      }

      return isValid;
    }
  }
};
</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>