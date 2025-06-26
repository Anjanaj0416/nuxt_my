<template>
  <section class="flex flex-col items-center justify-center px-4 py-8 min-h-screen">
    <div v-if="salon" class="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <img :src="salon.image" alt="Salon" class="w-full h-60 object-cover rounded-md mb-4" />
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ salon.name }}</h1>
      <p class="text-gray-500 dark:text-gray-300 mb-2">📍 {{ salon.city }}, {{ salon.district }}</p>
      <p class="text-sm text-yellow-500 font-semibold mb-2">⭐ {{ salon.rating }}</p>
      <p class="text-gray-700 dark:text-gray-400 mb-4">Services Offered: {{ salon.services.join(', ') }}</p>
      <p class="text-gray-700 dark:text-gray-300 mb-2">📞 Phone: {{ salon.phone }}</p>
      <p class="text-gray-700 dark:text-gray-300 mb-6">🗓️ Current Bookings: {{ salon.bookings }}</p>
      <button class="csscmd">Confirm Booking</button>
    </div>
    <p v-else class="text-gray-500">Salon not found.</p>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAppointmentsStore } from '~/stores/modules/appts/appointmentsStore'

definePageMeta({
  layout: 'false',
});

const route = useRoute()
const store = useAppointmentsStore()

const salon = store.appointments.find(a => a.id === Number(route.params.id))
</script>

<style scoped>
.csscmd {
  @apply px-4 py-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}
</style>
