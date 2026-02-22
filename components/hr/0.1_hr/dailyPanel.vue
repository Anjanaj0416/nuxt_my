<template>
  <div v-if="!hasAnyData"
       class="flex flex-col items-center justify-center bg-white rounded-xl p-8 mt-2 shadow-sm border">

    <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 13h6m-6 4h6M7 3h10a2 2 0 012 2v14l-5-3-5 3V5a2 2 0 012-2z"/>
    </svg>
    <p class="text-gray-500 text-sm font-medium">No records available</p>
    <p class="text-gray-400 text-xs mt-1">No HR activity found for this day</p>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">

    <!-- Movement Card -->
    <div v-if="valid(dayInfo?.movementDetails)" class="bg-white p-4 rounded-lg shadow-sm border">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-700">Movement</h3>
        <span @click="$emit('deleteRecord', { id: dayInfo.movementDetails.id, type: dayInfo.movementDetails.type })"
              class="text-red-500 cursor-pointer text-xs">Delete</span>
      </div>
      <div class="text-sm text-gray-600 space-y-1">
        <div><span class="font-medium">Start Time:</span> {{ formatTime(dayInfo.movementDetails.startTime) }}</div>
        <div><span class="font-medium">End Time:</span> {{ formatTime(dayInfo.movementDetails.endTime) }}</div>
        <div><span class="font-medium">From:</span> {{ dayInfo.movementDetails.fromLocation }}</div>
        <div><span class="font-medium">To:</span> {{ dayInfo.movementDetails.toLocation }}</div>
        <div><span class="font-medium">Vehicle:</span> {{ dayInfo.movementDetails.vehicle }}</div>
        <div><span class="font-medium">Distance:</span> {{ dayInfo.movementDetails.distance }}</div>
      </div>
    </div>

    <!-- OT Card -->
    <div v-if="valid(dayInfo?.otDetails)" class="bg-white p-4 rounded-lg shadow-sm border">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-700">Overtime</h3>
        <span @click="$emit('deleteRecord', { id: dayInfo.otDetails.id, type: dayInfo.otDetails.type })"
              class="text-red-500 cursor-pointer text-xs">Delete</span>
      </div>
      <div class="text-sm text-gray-600 space-y-1">
        <div><span class="font-medium">From:</span> {{ formatTime(dayInfo.otDetails.overTimeStart) }}</div>
        <div><span class="font-medium">To:</span> {{ formatTime(dayInfo.otDetails.overTimeEnd) }}</div>
        <div><span class="font-medium">Hours:</span> {{ dayInfo.otDetails.otRequestedHours }}</div>
        <div><span class="font-medium">Work:</span> {{ dayInfo.otDetails.natureOfWork }}</div>
      </div>
    </div>

    <!-- Leave Card -->
    <div v-if="valid(dayInfo?.leaveDetails)" class="bg-white p-4 rounded-lg shadow-sm border">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-700">Leave</h3>
        <span @click="$emit('deleteRecord', { id: dayInfo.leaveDetails.id, type: dayInfo.leaveDetails.type })"
              class="text-red-500 cursor-pointer text-xs">Delete</span>
      </div>
      <div class="text-sm text-gray-600 space-y-1">
        <div><span class="font-medium">End Date:</span> {{ dayInfo.leaveDetails.endDate }}</div>
        <div><span class="font-medium">Type:</span> {{ dayInfo.leaveDetails.absenceType }}</div>
        <div><span class="font-medium">Days:</span> {{ dayInfo.leaveDetails.durationDays }}</div>
        <div><span class="font-medium">Hours:</span> {{ dayInfo.leaveDetails.durationHours }}</div>
        <div><span class="font-medium">Attachment:</span> {{ dayInfo.leaveDetails.attachment }}</div>
      </div>
    </div>

    <!-- Rectification Card -->
    <div v-if="valid(dayInfo?.rectificationDetails)" class="bg-white p-4 rounded-lg shadow-sm border">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-700">Rectification</h3>
        <span @click="$emit('deleteRecord', { id: dayInfo.rectificationDetails.id, type: dayInfo.rectificationDetails.type })"
              class="text-red-500 cursor-pointer text-xs">Delete</span>
      </div>
      <div class="text-sm text-gray-600 space-y-1">
        <div><span class="font-medium">Before:</span> {{ formatTime(dayInfo.rectificationDetails.beforeRectify) }}</div>
        <div><span class="font-medium">After:</span> {{ formatTime(dayInfo.rectificationDetails.afterRectify) }}</div>
        <div><span class="font-medium">In / Out:</span> {{ dayInfo.rectificationDetails.inorOut }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["dayInfo"],
  computed: {
    hasAnyData() {
      return this.valid(this.dayInfo?.movementDetails)
          || this.valid(this.dayInfo?.otDetails)
          || this.valid(this.dayInfo?.leaveDetails)
          || this.valid(this.dayInfo?.rectificationDetails);
    }
  },
  methods: {
    valid(obj) { return obj && obj.id && obj.id !== "00000000-0000-0000-0000-000000000000"; },
    formatTime(timeString) {
      if (!timeString) return "N/A";
      const [h, m] = timeString.split(":").map(Number);
      if (h > 23 || m > 59) return timeString;
      const ampm = h >= 12 ? "PM" : "AM";
      const hours12 = h % 12 || 12;
      return `${hours12.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')} ${ampm}`;
    },
  },
};
</script>