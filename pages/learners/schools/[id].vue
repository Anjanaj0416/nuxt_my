<template>
    <header class="flex items-center justify-between h-20 px-44 shadow-md bg-red-500">
      <!-- Logo or Brand -->
      <NuxtLink to="/learners" class="flex items-center space-x-2">
        <span class="text-3xl font-bold text-white tracking-wide">learners.lk</span>
      </NuxtLink>

      <!-- Right Side Content (Registration Button) -->
      <div>
 
      </div>
    </header>
    <div v-if="school" class="min-h-screen bg-gray-50  py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="text-gray-500 hover:text-red-600">
                Home
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <NuxtLink to="/schools" class="ml-1 text-gray-500 hover:text-red-600">
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
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden sticky mb-8">
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



        <!-- Rearranged UI: Sidebar first, then main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Sidebar -->
          <div class="space-y-6 order-1 lg:order-none">
            <!-- Booking Card (without price) -->

            <div class="bg-white rounded-lg shadow-sm p-6 top-8">
              <div class="flex flex-row md:flex-col gap-3">
                <button
                  @click="GoToAddNew"
                  class="w-1/2 md:w-full bg-red-600 hover:bg-red-500 text-white py-2 px-3 text-sm rounded-md font-medium transition-colors"
                >
                  Login
                </button>
                <button

                  class="w-1/2 md:w-full border-2 border-red-500 hover:bg-red-500 py-2 px-3 text-sm rounded-md font-medium transition-colors"
                >
                  Registration
                </button>
              </div>
              <div>
              <a href="tel:+94771234567">
                <button
                  class="w-full border-2 border-red-500 hover:bg-red-500 py-2 px-3 text-sm rounded-md font-medium transition-colors mt-4"
                >
                  Contact me
                </button>
              </a>
              </div>
            </div>
            





            <!-- Contact Info -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <div class="font-medium text-gray-900 ">{{ school.instructor }}</div>
                    <div class="text-sm text-gray-500">Lead Instructor</div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div class="text-gray-700">{{ school.phone }}</div>
                </div>
                
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div class="text-gray-700">{{ school.email }}</div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div class="text-gray-700 ">{{ school.address }}</div>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 ">Location</h3>
              <div class="h-48 md:h-64 rounded-lg overflow-hidden shadow">
              <iframe
                class="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.1978260503!2d79.78167805!3d6.927078599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595a56f26463%3A0x1d152725e1a7a517!2sColombo!5e0!3m2!1sen!2slk!4v1664523310061!5m2!1sen!2slk"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8 order-2 lg:order-none">
            <!-- About -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-2xl font-semibold text-gray-900  mb-4">About</h2>
              <p class="text-gray-600 -300 mb-6">{{ school.description }}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Services</h3>
                  <div class="space-y-2">
                    <div
                      v-for="service in school.services"
                      :key="service"
                      class="flex items-center space-x-2"
                    >
                      <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-700">{{ service }}</span>
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
                      <span class="text-gray-700 ">{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Opening Hours UI Only -->
            <div class="bg-white rounded-xl shadow p-4 md:flex md:space-x-6 items-start">
              <!-- Left: Opening Hours -->
              <div class="md:w-1/2 w-full mb-4 md:mb-0">
                <h3 class="text-base font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center justify-between">
                  🕒 Opening Hours
                  <span class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full font-medium">Open</span>
                </h3>
                <ul class="text-sm text-gray-700 divide-y">
                  <li class="flex justify-between py-1">
                    <span>Mon</span><span>08:00–17:00</span>
                  </li>
                  <li class="flex justify-between py-1">
                    <span>Tue</span><span>08:00–17:00</span>
                  </li>
                  <li class="flex justify-between py-1">
                    <span>Wed</span><span>08:00–17:00</span>
                  </li>
                  <li class="flex justify-between py-1">
                    <span>Thu</span><span>08:00–17:00</span>
                  </li>
                  <li class="flex justify-between py-1">
                    <span>Fri</span><span>08:00–15:00</span>
                  </li>
                  <li class="flex justify-between py-1">
                    <span>Sat</span><span>09:00–13:00</span>
                  </li>
                  <li class="flex justify-between py-1 text-gray-400">
                    <span>Sun</span><span>Closed</span>
                  </li>
                </ul>
              </div>

              <!-- Right: YouTube Video -->
              <div class="md:w-1/2 w-full">
                <div class="aspect-w-16 aspect-h-9">
                  <iframe
                    class="rounded-lg w-full h-48 md:h-52"
                    src="https://www.youtube.com/embed/thtz1rVIsUw?si=ORewmo91V7Mo4AMv&amp;start=63"
                    title="YouTube video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>



            <!-- Image Gallery UI Only -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>
              <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <img
                  src="https://st2.depositphotos.com/1011643/5740/i/450/depositphotos_57404965-stock-photo-driving-instructor-writing-on-clipboard.jpg"
                  class="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform duration-200"
                  alt="Gallery image 1"
                />
                <img
                  src="https://images.airtasker.com/v7/https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1729050127080-driving-lessons.jpg"
                  class="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform duration-200"
                  alt="Gallery image 2"
                />
                <img
                  src="https://www.shutterstock.com/image-photo/riding-between-cones-lesson-motorcycle-260nw-2118475535.jpg"
                  class="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform duration-200"
                  alt="Gallery image 3"
                />
                <img
                  src="https://media.istockphoto.com/id/1270058179/photo/female-student-with-helmet-taking-motorcycle-lessons-and-practicing-ride-in-background.jpg?s=612x612&w=0&k=20&c=7eT4Z9MbBbQ5D11eTuuT-_igxdJ6mXNzfLlzeKw8h0M="
                  class="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform duration-200"
                  alt="Gallery image 4"
                />
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
        <NuxtLink to="/schools" class="bg-primary-500 hover:bg-secondary-970 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Browse All Schools
        </NuxtLink>
      </div>
    </div>
    <logingPage v-if="isLogin" @close="isLogin = false" />

</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/modules/learners/auth'
import { useSchoolsStore } from '~/stores/modules/learners/school'
import logingPage from '~/components/learners/login.vue'

definePageMeta({
  layout: 'learners',
})

export default {
  data() {
    return {
      selectedLessonType: 'manual',
      selectedDate: '',
      selectedTime: '09:00',
      school: null,
      isLogin: false
    }
  },

  components: {
    logingPage
    // Add any components you want to import here if needed
  },

  computed: {
    isLoggedIn() {
      const auth = useAuthStore()
      return auth.isLoggedIn
    }
  },

  methods: {

      GoToAddNew() {
        this.isLogin = true;
      },


  },

  async created() {
    this.route = useRoute()
    this.schoolsStore = useSchoolsStore()

    // Get school by id param
    this.school = this.schoolsStore.getSchoolById(this.route.params.id)


    
  }
}
</script>

