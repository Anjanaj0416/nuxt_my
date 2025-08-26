<template>
  
    <!-- Live Queue (like Instagram Stories) -->
    <div class="flex space-x-4">
    <div
      v-for="(item, index) in liveQueue"
      :key="index"
      :class="[
        'w-20 h-20 rounded-full p-1 bg-blue-950 text-white shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition',
        item.status === 'ongoing' ? 'ring-4 ring-yellow-500' :
        item.status === 'served' ? 'ring-4 ring-gray-400' :
        item.status === 'skipped' ? 'ring-4 ring-red-500' :
        'ring-4 ring-blue-500' // default waiting
      ]"
    >
      <span class="text-lg font-bold">#{{ item.token }}</span>
      <span
        :class="[
          'mt-2 text-sm font-medium',
          item.status === 'ongoing' ? 'text-yellow-600' :
          item.status === 'served' ? 'text-gray-500' :
          item.status === 'skipped' ? 'text-red-600' :
          'text-blue-500'
        ]"
      >
        {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
      </span>
    </div>
  </div>
    <!-- Middle Content -->
    <div class="flex flex-1 gap-4">
      <!-- Current Token Section -->
      <div class="flex-1 bg-white rounded-xl shadow-md p-6 space-y-4 flex flex-col justify-between">
        <div>
          <p class="text-gray-500">On going</p>
          <h2 class="text-4xl font-bold text-blue-600">#{{ current.token }}</h2>
          <p class="text-lg font-medium">Name: {{ current.name }}</p>
        </div>
        <div class="flex space-x-3">
          <button class="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Mark Finished
          </button>
          <button class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
            Skip
          </button>
        </div>
      </div>

      <!-- Customer Info -->
      <div class="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-semibold">{{ current.name }}</h3>
          <p class="text-gray-500">{{ current.phone }}</p>
          <p class="text-gray-400 text-sm">Est Time: {{ current.estTime }} min</p>
        </div>
        <button class="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Call
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="bg-white rounded-xl shadow-md p-4 text-center"
      >
        <h4 class="text-2xl font-bold text-blue-600">{{ stat.value }}</h4>
        <p class="text-gray-500">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex justify-between items-center">
      <button class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
        Provide Token
      </button>
      <button
        :class="[
          'px-6 py-2 rounded-lg transition',
          isQueueActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        ]"
        @click="toggleQueue"
      >
        {{ isQueueActive ? 'End the Queue' : 'Start the Queue' }}
      </button>
    </div>

</template>

<script setup>
import { ref } from 'vue'

const liveQueue = [
  { token: 19, name: "A19", status: "served" },
  { token: 21, name: "A21", status: "ongoing" },
  { token: 22, name: "A22", status: "skipped" },
  { token: 23, name: "A23", status: "waiting" },
  { token: 24, name: "A24", status: "waiting" }
]

const current = {
  token: 18,
  name: "Nuskan Nawaz",
  phone: "0712922270",
  estTime: 3.4
}

const stats = [
  { label: "People Waiting", value: "06" },
  { label: "People Served", value: "05" },
  { label: "Total Tokens (Today)", value: "11" },
  { label: "Avg. Handling Time", value: "32 min" },
  { label: "Skipped", value: "00" }
]

const isQueueActive = ref(false)

const toggleQueue = () => {
  isQueueActive.value = !isQueueActive.value
}

definePageMeta({
  layout: 'appts-shops'
})
</script>
