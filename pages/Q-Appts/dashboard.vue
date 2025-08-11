<!-- pages/dashboard.vue -->
<template>
  <div>
    <!-- Top Row -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Ongoing -->
      <div class="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
        <p class="text-gray-500 text-sm">On going</p>
        <p class="text-4xl font-bold">#18</p>
        <p class="text-gray-600">Name : Nuskan</p>
        <div class="flex gap-2 mt-2">
          <button class="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900">Mark Finished</button>
          <button class="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Skip</button>
        </div>
      </div>

      <!-- Next -->
      <div class="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <i class="fas fa-user-circle text-4xl text-gray-400"></i>
            <div>
              <p class="font-bold text-lg">Nuskan Nawaz</p>
              <p class="text-gray-500 text-sm">0712922270</p>
            </div>
          </div>
          <p class="text-gray-500 text-sm">Est Time : 3.40</p>
        </div>
        <div class="mt-4">
          <button class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Call</button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-6 mt-6">
      <div class="bg-white shadow rounded-lg p-4 text-center">
        <p class="text-gray-500">People Waiting</p>
        <p class="text-2xl font-bold">06</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 text-center">
        <p class="text-gray-500">People Served</p>
        <p class="text-2xl font-bold">05</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 text-center">
        <p class="text-gray-500">Total Tokens (Today)</p>
        <p class="text-2xl font-bold">11</p>
      </div>
      <div class="bg-blue-500 shadow rounded-lg p-4 flex items-center justify-center">
        <button class="text-white font-bold text-xl">Provide Token</button>
      </div>
      <div class="bg-white shadow rounded-lg p-4 text-center">
        <p class="text-gray-500">Avg. Handling Time</p>
        <p class="text-2xl font-bold">32 min</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 text-center">
        <p class="text-gray-500">Skipped</p>
        <p class="text-2xl font-bold">00</p>
      </div>
    </div>

    <!-- Start/End Button -->
    <div class="flex justify-end mt-6">
      <button
        @click="toggleQueue"
        :class="queueActive ? 'bg-red-500 text-white' : 'bg-white border text-black'"
        class="px-6 py-2 rounded-lg shadow hover:opacity-90"
      >
        {{ queueActive ? 'End the Queue' : 'Start the Queue' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'appts-shops'
})

const queueActive = ref(false)
const toggleQueue = () => {
  queueActive.value = !queueActive.value
}
</script>
