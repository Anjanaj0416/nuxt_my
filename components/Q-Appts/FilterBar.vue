<template>
  <div class="px-4 py-6 flex flex-col gap-4 items-center bg-blue-50">
    <!-- Search Bar -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search by salon name.........."
      class="w-full max-w-6xl p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring- focus:ring-blue-500"
    />

    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-3 justify-center">
      <button
        v-for="filter in filters"
        :key="filter"
        class="bg-blue-100 text-blue-800 px-5 py-3 rounded-md text-base font-semibold hover:bg-blue-200 transition"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const searchTerm = ref('');
const filters = [
  'All',
  'Nearby (< 1KM)',
  'Nearby (< 5KM)',
  'Farther (> 5KM)',
  'Available in 30 min',
  'Available in 1 hour',
  'Available more than 1 hour',
  'Male',
  'Female'
];
</script>
<style scoped></style>