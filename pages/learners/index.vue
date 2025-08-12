<template>
  <div class="">
    <header class="flex items-center justify-between h-20 px-4 sm:px-10 lg:px-44  bg-red-500 w-full">
      <!-- Logo or Brand -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="text-xl sm:text-3xl font-bold text-white tracking-wide whitespace-nowrap">learners.lk</span>
      </NuxtLink>

      <!-- Right Side Content (Registration Button) -->
      <NuxtLink
        to="/learners/registration"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 transition-all duration-300 bg-white rounded-full shadow"
      >
        Registration
      </NuxtLink>
    </header>

    <section class="relative bg-red-500 text-primary-50">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 md:py-12 text-center">
          <h1 class="text-xl sm:text-2xl md:text-4xl lg:text-3xl font-bold mb-2">
            Find Your Perfect  Driving School
          </h1>
          <p class="text-sm md:text-sm mb-2 sm:mb-8 md:mb-2 lg:mb-2 text-primary-100 max-w-3xl mx-auto">
            Connect with trusted driving instructors, compare prices, read reviews, and book lessons online with
            confidence.
          </p>

          <!-- Search Bar -->
          <div className="px-4 mt-5 lg:mt-8 sm:px-8">     
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">   
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <input 
                  type="search" 
                  id="default-search" v-model="searchQuery"
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-full ps-10 bg-gray-50 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-red-500 dark:focus:border-red-500 " 
                  placeholder="Search Learners ...
"
                />
                <button 
                  type="submit" 
                  className="text-white absolute end-2.5 bottom-2.5 bg-red-500 hover:bg-red-400 hover:text-yellow-50 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
      </div>
    </section>

    <!-- Featured Schools Section -->
    <section id="schools" class="py-8 bg-gray-10 ">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Schools
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the highest-rated driving schools in your area with proven track records.
          </p>
        </div> -->

        <!-- Filters -->
        <div class="p-6 mb-8">
          <div class="flex justify-end">
            <div class="w-60">
              <label class="block text-xs font-medium text-gray-600 mb-1">
                Filter Location
              </label>
              <select
                v-model="selectedLocation"
                class="w-full px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-red-500 focus:outline-none transition"
              >
                <option value="">All</option>
                <option value="Downtown">Downtown</option>
                <option value="Westside">Westside</option>
                <option value="City Center">City Center</option>
              </select>
            </div>
          </div>
        </div>




        <!-- Schools Grid -->
        <div v-if="filteredSchools.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="school in filteredSchools" :key="school.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div class="relative overflow-hidden">
              <img :src="school.image" :alt="school.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <!-- Removed rating badge -->
              <div class="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {{ school.distance }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-xl font-semibold text-gray-900">{{ school.name }}</h3>
              </div>

              <p class="text-gray-600 mb-4 text-sm">{{ school.description }}</p>
              <div class="flex items-center space-x-4 mb-4 text-sm">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-500">{{ school.location }}</span>
                </div>

                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-gray-500 ">{{ school.reviewCount }} reviews</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="service in school.services.slice(0, 3)" :key="service"
                  class="px-2 py-1 bg-primary-100 text-primary-920 text-xs rounded-full">
                  {{ service }}
                </span>
              </div>

              <div class="flex space-x-2">
                <button @click="viewSchoolDetails(school)"
                  class="flex-1 bg-red-600  text-white py-2 px-4 rounded-lg font-medium  text-center text-sm">
                  View Details
                </button>
                <!-- <NuxtLink :to="`/learners/register?type=student&school=${school.id}`"
                  class="flex-1 bg-secondary-600 hover:bg-secondary-500 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center text-sm">
                  Register
                </NuxtLink> -->
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
    <!-- <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose DriveLearn?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Certified Schools</h3>
            <p class="text-gray-600 text-sm">All schools are verified and certified for your safety.
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p class="text-gray-600 text-sm">Compare prices and find the best deals in your area.</p>
          </div>

          <div class="text-center group">
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p class="text-gray-600 text-sm">Book lessons online with flexible scheduling options.
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p class="text-gray-600 text-sm">Get help whenever you need it with our support team.</p>
          </div>
        </div>
      </div>
    </section> -->

<div class="py-10 bg-white text-center">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">
      Partnered Learners Providers
    </h2>

    <Swiper
    :slides-per-view="getSlidesPerView"
    :space-between="30"
    :loop="true"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    class="w-full max-w-6xl mx-auto"
  >
    <SwiperSlide v-for="(logo, index) in logos" :key="index">
      <img
        :src="logo"
        alt="Learner Provider Logo"
        class="h-20 mx-auto object-contain"
      />
    </SwiperSlide>
  </Swiper>

  </div>

    <!-- CTA Section -->
    <footers />

  </div>
</template>

<script >

import { useSchoolsStore } from '~/stores/modules/learners/school'
import { useUserStore } from '~/stores/modules/userStore'
import { storeToRefs } from 'pinia'
import footers from '~/components/learners/common/footer.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

  definePageMeta({
    layout: 'learners',
    // middleware: 'auth',
  });



  export default {
    
    components: {footers, Swiper,
    SwiperSlide,},
    props:[''],
    data() {
      return {
      logos: [
        'https://rathnalearners.com/wp-content/uploads/2020/08/RATHNA-LEARNERS-LOGO-OFFICIAL-2-01-1.png',
        'https://www.bimallearners.com/assets/img/logo.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY589q594_OLfFJn3iEBDsZu9Yqga-EF9iLc8Y9njQz3GvH1VyUkWXMKn_7lJ8E4_0G-M&usqp=CAU',
        'https://www.bimallearners.com/assets/img/logo.png',
        'https://www.bimallearners.com/assets/img/logo.png',
        'https://rathnalearners.com/wp-content/uploads/2020/08/RATHNA-LEARNERS-LOGO-OFFICIAL-2-01-1.png',
        'https://www.bimallearners.com/assets/img/logo.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY589q594_OLfFJn3iEBDsZu9Yqga-EF9iLc8Y9njQz3GvH1VyUkWXMKn_7lJ8E4_0G-M&usqp=CAU',
        'https://www.bimallearners.com/assets/img/logo.png',
        'https://www.bimallearners.com/assets/img/logo.png',
      ],
        imageroot: "",
        showLoading: null,
        userStore: null,
        schoolsStore: null,
        searchQuery: '',
        selectedLocation: '',
        filteredSchools: null
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
       this.schoolsStore = useSchoolsStore();

       
      const { searchQuery, selectedLocation, filteredSchools } = storeToRefs(this.schoolsStore);
      this.searchQuery = searchQuery;
      this.selectedLocation = selectedLocation;
      this.filteredSchools = filteredSchools;


      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      

    },
    watch: {},
    computed: {
      getSlidesPerView() {
          const width = window.innerWidth
          if (width < 640) return 2
          if (width < 1024) return 3
          return 5
        },
    },
    methods: {

      
     
      searchSchools() {
        this.$router.push({
          path: '/learners/schools',
          query: {
            search: this.searchQuery.value,
            location: this.selectedLocation.value,
          }
        });
      },
      viewSchoolDetails(school) {
        this.$router.push(`/learners/schools/${school.id}`);
      }

    },
    async beforeMount() {

  
    },
    head() {
      return {
        title: 'DriveLearn - Find Your Perfect Driving School',
      }
    },
  }

</script>

<!-- 
// import { useSchoolsStore } from '~/stores/modules/learners/school'
// import footer from '~/components/learners/footer.vue';
// import { storeToRefs } from 'pinia'

// const schoolsStore = useSchoolsStore()
// const { searchQuery, selectedLocation, filteredSchools } = storeToRefs(schoolsStore)

// const searchSchools = () => {
//   navigateTo('/learners/schools', {
//     query: {
//       search: searchQuery.value,
//       location: selectedLocation.value,
//     }
//   })
// }

// // Handles the "View Details" button click
// const viewSchoolDetails = (school) => {
//   navigateTo(`/learners/schools/${school.id}`)
// }

// // SEO
// useHead({
//   title: 'DriveLearn - Find Your Perfect Driving School',
//   meta: [
//     { name: 'description', content: 'Connect with trusted driving schools in your area. Compare prices, read reviews, and book lessons online with confidence.' }
//   ]
// })
// </script> -->
