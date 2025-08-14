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

    <!-- District Dropdown -->
<div class="relative">
  <select
    v-model="selectedDistrict"
    @change="onDistrictChange"
    class="appearance-none px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600
      bg-white text-blue-800 border border-blue-300 hover:bg-blue-100 shadow-sm
      w-full pr-8 cursor-pointer "

      
  >
    <option value="" disabled>Select the District</option>
    <option v-for="district in districts" :key="district" :value="district">
      {{ district }}
    </option>
  </select>
  <!-- Custom Chevron -->
  <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

<!-- City Dropdown -->
<div class="relative">
  <select
    v-model="selectedCity"
    :disabled="!selectedDistrict"
    @change="onCityChange"
    class="appearance-none px-4 py-1 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600
      bg-white text-blue-800 border border-blue-300 hover:bg-blue-100 shadow-sm
      w-full pr-8 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
  >
    <option value="" disabled >Select the City</option>
    <option v-for="city in citiesForSelectedDistrict" :key="city" :value="city">
      {{ city }}
    </option>
  </select>
  <!-- Custom Chevron -->
  <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>





  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSalonStore } from '~/stores/modules/Q-Appts/shops'

const salonStore = useSalonStore()

const districtsCities = {
  Colombo: ['Colombo', 'Dehiwala', 'Nugegoda', 'Mount Lavinia'],
  Gampaha: ['Negombo', 'Wattala', 'Katunayake'],
  Kalutara: ['Kalutara', 'Panadura', 'Beruwala'],
  Kandy: ['Kandy', 'Nawalapitiya', 'Gampola'],
  Matale: ['Matale', 'Dambulla', 'Ukuwela'],
  NuwaraEliya: ['Nuwara Eliya', 'Hatton', 'Talawakelle'],
  Galle: ['Galle', 'Hikkaduwa', 'Unawatuna'],
  Matara: ['Matara', 'Weligama', 'Dickwella'],
  Hambantota: ['Hambantota', 'Tangalle', 'Tissamaharama'],
}
const districts = Object.keys(districtsCities)

const selectedDistrict = computed({
  get: () => salonStore.selectedDistrict,
  set: (val) => salonStore.setSelectedDistrict(val),
})

const selectedCity = computed({
  get: () => salonStore.selectedCity,
  set: (val) => salonStore.setSelectedCity(val),
})

const citiesForSelectedDistrict = computed(() => {
  return selectedDistrict.value ? districtsCities[selectedDistrict.value] || [] : []
})

function onDistrictChange(event) {
  salonStore.setSelectedDistrict(event.target.value)
  salonStore.setSelectedCity('') // reset city
}

function onCityChange(event) {
  salonStore.setSelectedCity(event.target.value)
}

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
const searchTerm = computed(() => salonStore.searchTerm)

// Computed to check if ALL filters are cleared (means All is selected)
const allSelected = computed(() => {
  return !salonStore.selectedDistance && !salonStore.selectedAvailability && salonStore.selectedGenders.length === 0 && !salonStore.selectedDistrict && !salonStore.selectedCity && !searchTerm.value
})

function selectAll() {
  salonStore.setSelectedDistance('')
  salonStore.setSelectedAvailability('')
  salonStore.setSelectedGenders([])
  salonStore.searchTerm = '' // reset search bar
  salonStore.setSelectedDistrict('')
  salonStore.setSelectedCity('')
  salonStore.loadData() // fetch all shops
  salonStore.resetFilters()
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
