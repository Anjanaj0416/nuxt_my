<template>
  <div v-if="school" class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Home
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <NuxtLink to="/schools" class="ml-1 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                Schools
              </NuxtLink>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-gray-500 dark:text-gray-400">{{ school.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- School Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
        <div class="relative h-64 md:h-80">
          <img
            :src="school.image"
            :alt="school.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="p-6 text-white">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ school.name }}</h1>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-1">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="font-semibold">{{ school.rating }}</span>
                  <span class="text-gray-200">({{ school.reviewCount }} reviews)</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ school.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ school.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Services</h3>
                <div class="space-y-2">
                  <div
                    v-for="service in school.services"
                    :key="service"
                    class="flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ service }}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <div class="space-y-2">
                  <div
                    v-for="feature in school.features"
                    :key="feature"
                    class="flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Student Reviews</h2>
            
            <div class="space-y-6">
              <div
                v-for="review in school.reviews"
                :key="review.id"
                class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
              >
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">{{ review.name.charAt(0) }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h4 class="font-medium text-gray-900 dark:text-white">{{ review.name }}</h4>
                      <div class="flex items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(review.date) }}</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Booking Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
            <div class="text-center mb-6">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                ${{ school.price }}
              </div>
              <div class="text-gray-500 dark:text-gray-400">per hour</div>
            </div>
            
            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lesson Type
                </label>
                <select
                  v-model="selectedLessonType"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="manual">Manual Transmission</option>
                  <option value="automatic">Automatic Transmission</option>
                  <option value="intensive">Intensive Course</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Date
                </label>
                <input
                  v-model="selectedDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Time
                </label>
                <select
                  v-model="selectedTime"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="09:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>
            
            <button
              @click="bookLesson"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
            >
              Book Lesson
            </button>
            
            <button class="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
              Contact School
            </button>
          </div>

          <!-- Contact Info -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ school.instructor }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Lead Instructor</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div class="text-gray-700 dark:text-gray-300">{{ school.phone }}</div>
              </div>
              
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div class="text-gray-700 dark:text-gray-300">{{ school.email }}</div>
              </div>
              
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="text-gray-700 dark:text-gray-300">{{ school.address }}</div>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
            <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Interactive map would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">School Not Found</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-8">The driving school you're looking for doesn't exist.</p>
      <NuxtLink to="/schools" class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Browse All Schools
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'learners',
});

import { useAuthStore } from '~/stores/modules/learners/auth'  // or your correct path
import { useSchoolsStore } from '~/stores/modules/learners/school'  // or your correct path

const route = useRoute()
const { getSchoolById } = useSchoolsStore()
const { isLoggedIn } = useAuthStore()

const school = computed(() => getSchoolById(route.params.id))

const selectedLessonType = ref('manual')
const selectedDate = ref('')
const selectedTime = ref('09:00')

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const bookLesson = () => {
  if (!isLoggedIn.value) {
    navigateTo('/login')
    return
  }
  
  // Simulate booking
  alert('Lesson booked! You will receive a confirmation email shortly.')
}

// Set default date to tomorrow
onMounted(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  selectedDate.value = tomorrow.toISOString().split('T')[0]
})

// SEO
useHead({
  title: school.value ? `${school.value.name} - DriveLearn` : 'School Not Found - DriveLearn',
  meta: [
    { name: 'description', content: school.value ? `Learn more about ${school.value.name}. ${school.value.description}` : 'School not found' }
  ]
})
</script>