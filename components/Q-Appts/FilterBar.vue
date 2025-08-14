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
import { useShopStore } from '~/stores/modules/Q-Appts/shops'

const shopStore = useShopStore()

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
  get: () => shopStore.selectedDistrict,
  set: (val) => shopStore.setSelectedDistrict(val),
})

const selectedCity = computed({
  get: () => shopStore.selectedCity,
  set: (val) => shopStore.setSelectedCity(val),
})

const citiesForSelectedDistrict = computed(() => {
  return selectedDistrict.value ? districtsCities[selectedDistrict.value] || [] : []
})

function onDistrictChange(event) {
  shopStore.setSelectedDistrict(event.target.value)
  shopStore.setSelectedCity('') // reset city
}

function onCityChange(event) {
  shopStore.setSelectedCity(event.target.value)
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

const selectedDistance = computed(() => shopStore.selectedDistance)
const selectedAvailability = computed(() => shopStore.selectedAvailability)
const selectedGenders = computed(() => shopStore.selectedGenders)
const searchTerm = computed(() => shopStore.searchTerm)

// Computed to check if ALL filters are cleared (means All is selected)
const allSelected = computed(() => {
  return !shopStore.selectedDistance && !shopStore.selectedAvailability && shopStore.selectedGenders.length === 0 && !shopStore.selectedDistrict && !shopStore.selectedCity && !searchTerm.value
})

function selectAll() {
  shopStore.setSelectedDistance('')
  shopStore.setSelectedAvailability('')
  shopStore.setSelectedGenders([])
  shopStore.searchTerm = '' // reset search bar
  shopStore.setSelectedDistrict('')
  shopStore.setSelectedCity('')
  shopStore.loadData() // fetch all shops
  shopStore.resetFilters()
}

function selectDistance(filter) {
  if (shopStore.selectedDistance === filter) {
    shopStore.setSelectedDistance('')
  } else {
    shopStore.setSelectedDistance(filter)
  }
}

function selectAvailability(filter) {
  if (shopStore.selectedAvailability === filter) {
    shopStore.setSelectedAvailability('')
  } else {
    shopStore.setSelectedAvailability(filter)
  }
}

function toggleGender(filter) {
  shopStore.toggleGender(filter)
}
</script>
