<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Driving School
            </span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with trusted driving instructors, compare prices, read reviews, and book lessons online with
            confidence.
          </p>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="bg-white rounded-lg shadow-lg p-2">
              <div class="flex flex-col md:flex-row gap-2">
                <div class="flex-1">
                  <input v-model="searchQuery" type="text" placeholder="Enter your location..."
                    class="w-full px-4 py-3 text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <button @click="searchSchools"
                  class="px-6 py-3 bg-primary-500 hover:bg-secondary-970 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div class="text-blue-100">Certified Schools</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div class="text-blue-100">Happy Students</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div class="text-blue-100">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Getting your driving license has never been easier. Follow these simple steps to start your journey.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Search & Compare</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Find driving schools near you, compare prices, read reviews, and check instructor ratings.
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Book Online</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Choose your preferred time slots and book lessons directly through our secure platform.
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Learn & Pass</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Learn from certified instructors, practice with modern vehicles, and pass your test with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Schools Section -->
    <section v-if="filteredSchools.length > 0" id="schools" class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Top Rated Schools
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the highest-rated driving schools in your area with proven track records.
          </p>
        </div>

        <!-- Filters -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input v-model="searchQuery" type="text" placeholder="Search by name or location..."
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <!-- Location Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <select v-model="selectedLocation"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">All Locations</option>
                <option value="Downtown">Downtown</option>
                <option value="Westside">Westside</option>
                <option value="City Center">City Center</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Schools Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="school in filteredSchools" :key="school.id"
            class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div class="relative overflow-hidden">
              <img :src="school.image" :alt="school.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div
                class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                <div class="text-right">
                  <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ school.price }}$/hr</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">per hour</div>
                </div>
              </div>

              <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{{ school.description }}</p>
              <div class="flex items-center space-x-4 mb-4 text-sm">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-500 dark:text-gray-400">{{ school.location }}</span>
                </div>

                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-gray-500 dark:text-gray-400">{{ school.reviewCount }} reviews</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="service in school.services.slice(0, 3)" :key="service"
                  class="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded-full">
                  {{ service }}
                </span>
              </div>

              <div class="flex space-x-2">
                <button @click="viewSchoolDetails(school)"
                  class="flex-1 bg-primary-500 hover:bg-secondary-970 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center text-sm">
                  View Details
                </button>
                <NuxtLink :to="`/learners/register?type=student&school=${school.id}`"
                  class="flex-1 bg-secondary-600 hover:bg-secondary-500 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center text-sm">
                  Register
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <!-- <div v-else class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No schools found</h3>
      <p class="text-gray-600 dark:text-gray-300">Try adjusting your search criteria to find more schools.</p>
    </div> -->
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose DriveLearn?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We make finding and booking driving lessons simple, secure, and stress-free.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div
              class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Certified Schools</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">All schools are verified and certified for your safety.
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Best Prices</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">Compare prices and find the best deals in your area.</p>
          </div>

          <div class="text-center group">
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Booking</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">Book lessons online with flexible scheduling options.
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">Get help whenever you need it with our support team.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
        <p class="text-xl mb-8 text-blue-100">
          Join thousands of successful students who found their perfect driving school through DriveLearn.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register"
            class="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <span>Get Started Today</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/schools"
            class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-medium transition-colors">
            Browse Schools
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>

definePageMeta({
  layout: 'learners',
  // middleware: 'auth',
});


import { useSchoolsStore } from '~/stores/modules/learners/school'  // or your correct path
const schoolsStore = useSchoolsStore()
const { searchQuery, selectedLocation, priceRange, filteredSchools } = storeToRefs(schoolsStore)
import { storeToRefs } from 'pinia'

const searchSchools = () => {
  navigateTo('/learners/schools', {
    query: {
      search: searchQuery.value,
      location: selectedLocation.value,
      price: priceRange.value
    }
  })
}

// SEO
useHead({
  title: 'DriveLearn - Find Your Perfect Driving School',
  meta: [
    { name: 'description', content: 'Connect with trusted driving schools in your area. Compare prices, read reviews, and book lessons online with confidence.' }
  ]
})
</script>
