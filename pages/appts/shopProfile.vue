<template>
  <section class="flex flex-col items-center justify-start w-full min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl">
      <!-- Salon Header -->
      <div class="flex items-center space-x-6">
        <img
          :src="salon.image"
          alt="Salon Logo"
          class="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">{{ salon.name }}</h2>
          <p class="text-gray-500 dark:text-gray-300">📍 {{ salon.city }}, {{ salon.district }}</p>
          <p class="text-gray-500 dark:text-gray-300">📞 {{ salon.phone }}</p>
        </div>
      </div>

      <!-- Booking Management -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Ongoing Bookings</h3>

        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-3">
          <p class="text-lg font-medium text-gray-800 dark:text-white">Current Booking : {{ currentBooking }}</p>
          <div class="flex gap-3 mt-3">
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              @click="handleNext"
            >
              Next
            </button>
            <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
              @click="handleSkip"
            >
              Skip
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              @click="handleCancel"
            >
              Cancel
            </button>
          </div>
        </div>

        <div v-if="nextBooking" class="text-sm text-gray-600 dark:text-gray-300">
          <p>Upcoming Booking : {{ nextBooking }}</p>
        </div>
        <div v-else class="text-sm text-gray-400 dark:text-gray-400 italic">
          No next booking available.
        </div>
      </div>

      <!-- Other Salon Info -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Details</h3>
        <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300">
          <li>Working hours: {{ salon.hours }}</li>
          <li>Services: {{ salon.services.join(', ') }}</li>
          <li>Ratings: ⭐ {{ salon.rating }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>

definePageMeta({
  layout: 'false',
});

import { ref } from 'vue'

const salon = {
  name: 'Urban Cuts',
  city: 'Colombo',
  district: 'Colombo',
  phone: '+94 77 456 7890',
  image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
  hours: '9:00 AM - 8:00 PM',
  services: ['Haircut', 'Beard Trim', 'Facial'],
  rating: 4.8,
}

const currentBooking = ref(7)
const nextBooking = ref(8)

function handleNext() {
  if (nextBooking.value) {
    currentBooking.value = nextBooking.value
    nextBooking.value = null
  } else {
    alert('No next booking available')
  }
}

function handleSkip() {
  currentBooking.value = 'No active booking'
  nextBooking.value = null
}

function handleCancel() {
  alert(`Booking #${currentBooking.value} has been cancelled.`)
  currentBooking.value = 'No active booking'
  nextBooking.value = null
}
</script>

<style scoped>
button {
  @apply transition duration-200;
}
</style>
