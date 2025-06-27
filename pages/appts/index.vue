<template>
  <section>
    <div class="flex flex-col items-center justify-center w-full min-h-[60vh] px-4 mt-8 ">
      <!-- Unified & Responsive Search Bar -->
      <div
        class="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-3 px-0 py-0 mb-8 transition-all duration-200">
      
        <!-- Text Search -->
        <div class="relative flex-1 w-full">
          <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by salon name or service..."
        class="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <span
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
          >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
          </span>
        </div>

        <!-- City Dropdown -->
        <div class="flex-1 w-full max-w-xs">
          <select
        v-model="selectedCity"
        class="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
        <option value="">All Cities</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>

        <!-- District Dropdown -->
        <div class="flex-1 w-full max-w-xs">
          <select
        v-model="selectedDistrict"
        class="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
        <option value="">All Districts</option>
        <option v-for="district in districts" :key="district" :value="district">
          {{ district }}
        </option>
          </select>
        </div>
      </div>

      <!-- Appointment Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        <div
          v-for="appt in filteredAppointments"
          :key="appt.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"
        >
          <img
            :src="appt.image"
            alt="Salon image"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
            {{ appt.name }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-300 mb-1">
            📍 {{ appt.city }}, {{ appt.district }}
          </p>
          <p class="text-sm text-yellow-500 font-semibold mb-2">
            ⭐ {{ appt.rating }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Services: {{ appt.services.join(', ') }}
          </p>
          <NuxtLink :to="`/Appts/${appt.id}`" class="csscmd">Book Appointment</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppointmentsStore } from '~/stores/modules/appts/appointmentsStore'

const searchQuery = ref('')
const selectedDistrict = ref('')
const selectedCity = ref('')

const store = useAppointmentsStore()

const cities = [...new Set(store.appointments.map(appt => appt.city))]
const districts = [...new Set(store.appointments.map(appt => appt.district))]

const filteredAppointments = computed(() => {
  return store.appointments.filter((appt) => {
    const query = searchQuery.value.toLowerCase()

    const matchesSearch =
      appt.name.toLowerCase().includes(query) ||
      appt.services.some(service => service.toLowerCase().includes(query))

    const matchesCity =
      !selectedCity.value || appt.city === selectedCity.value

    const matchesDistrict =
      !selectedDistrict.value || appt.district === selectedDistrict.value

    return matchesSearch && matchesCity && matchesDistrict
  })
})

definePageMeta({
  layout: 'false',
    middleware: 'auth',
});
</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}
</style>
