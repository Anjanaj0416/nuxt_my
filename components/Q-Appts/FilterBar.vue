<template>
  <div class="px-3 py-3 flex flex-wrap gap-3 justify-center bg-blue-50">

    <!-- 'All' button resetting all filters -->
    <div class="flex gap-2">
      <button
        @click="selectAll"
        :class="[
          'px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600',
          allSelected
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-100'
        ]"
      >
        All
      </button>
    </div>

    <!-- Distance Filters -->
    <div class="flex gap-2">
      <button
        v-for="filter in distanceFilters"
        :key="filter"
        @click="selectDistance(filter)"
        :class="[
          'px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600',
          selectedDistance === filter
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-100'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Availability Filters -->
    <div class="flex gap-2">
      <button
        v-for="filter in availabilityFilters"
        :key="filter"
        @click="selectAvailability(filter)"
        :class="[
          'px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600',
          selectedAvailability === filter
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-100'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Gender Filters -->
    <div class="flex gap-2">
      <button
        v-for="filter in genderFilters"
        :key="filter"
        @click="toggleGender(filter)"
        :class="[
          'px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600',
          selectedGenders.includes(filter.toLowerCase())
            ? 'bg-blue-900 text-white shadow-md'
            : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-100'
        ]"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSalonStore } from '~/stores/modules/Q-Appts/shops'

const salonStore = useSalonStore()

const distanceFilters = [
  'Nearby (< 1KM)',
  'Nearby (< 5KM)',
  'Farther (> 5KM)',
]

const availabilityFilters = [
  'Available in 30 min',
  'Available in 1 hour',
  'Available more than 1 hour',
]

const genderFilters = ['Male', 'Female']

const selectedDistance = computed(() => salonStore.selectedDistance)
const selectedAvailability = computed(() => salonStore.selectedAvailability)
const selectedGenders = computed(() => salonStore.selectedGenders)

// Computed to check if ALL filters are cleared (means All is selected)
const allSelected = computed(() => {
  return !salonStore.selectedDistance && !salonStore.selectedAvailability && salonStore.selectedGenders.length === 0
})

function selectAll() {
  salonStore.setSelectedDistance('')
  salonStore.setSelectedAvailability('')
  salonStore.setSelectedGenders([])
}

function selectDistance(filter) {
  if (salonStore.selectedDistance === filter) {
    salonStore.setSelectedDistance('')
  } else {
    salonStore.setSelectedDistance(filter)
  }
}

function selectAvailability(filter) {
  if (salonStore.selectedAvailability === filter) {
    salonStore.setSelectedAvailability('')
  } else {
    salonStore.setSelectedAvailability(filter)
  }
}

function toggleGender(filter) {
  salonStore.toggleGender(filter)
}
</script>
