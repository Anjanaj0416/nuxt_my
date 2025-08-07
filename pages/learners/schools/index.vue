<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Find Driving Schools
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Discover certified driving schools in your area and start your journey to getting your license.
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Search -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or location..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <!-- Location Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <select
              v-model="selectedLocation"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Locations</option>
              <option value="Downtown">Downtown</option>
              <option value="Westside">Westside</option>
              <option value="City Center">City Center</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="school in filteredSchools"
          :key="school.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
        >
          <div class="relative overflow-hidden">
            <img
              :src="school.image"
              :alt="school.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ school.rating }}</span>
            </div>
            <div class="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {{ school.distance }}
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ school.name }}</h3>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{{ school.description }}</p>
            
            <div class="flex items-center space-x-4 mb-4 text-sm">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-500 dark:text-gray-400">{{ school.location }}</span>
              </div>
              
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-gray-500 dark:text-gray-400">{{ school.reviewCount }} reviews</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="service in school.services.slice(0, 3)"
                :key="service"
                class="px-2 py-1 bg-primary-100 dark:bg-primary-920 text-primary-920 dark:text-primary-200 text-xs rounded-full"
              >
                {{ service }}
              </span>
            </div>
            
            <div class="flex space-x-2">
              <NuxtLink
                :to="`/learners/schools/${school.id}`"
                class="flex-1 bg-primary-500 hover:bg-secondary-970 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center text-sm"
              >
                View Details
              </NuxtLink>
              <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredSchools.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No schools found</h3>
        <p class="text-gray-600 dark:text-gray-300">Try adjusting your search criteria to find more schools.</p>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'learners',
});

import { useSchoolsStore } from '~/stores/modules/learners/school'  // or your correct path
const schoolsStore = useSchoolsStore()
const { searchQuery, selectedLocation, filteredSchools } = storeToRefs(schoolsStore)
import { storeToRefs } from 'pinia'

// SEO
useHead({
  title: 'Find Driving Schools - DriveLearn',
  meta: [
    { name: 'description', content: 'Browse and compare driving schools in your area. Filter by location and services to find the perfect match.' }
  ]
})
</script>
