<template>
  <div class="">
    
    <header class="flex items-center h-20 px-4 sm:px-10 lg:px-44 bg-purple-600 w-full">
      <div class="flex items-center gap-8">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-xl sm:text-3xl font-bold text-white tracking-wide whitespace-nowrap">
            TenderB2B.lk
          </span>
        </NuxtLink>

        <!-- Menu -->
        <nav class="flex items-center gap-6 mt-3">
          <NuxtLink to="/tender" class="text-md font-medium text-white">
            Tender
          </NuxtLink>

          <NuxtLink to="/contact" class="text-md font-medium text-white">
            Contact Us
          </NuxtLink>

          <NuxtLink to="/" class="text-md font-medium text-white">
            B2B.lk
          </NuxtLink>
        </nav>
      </div>
      <NuxtLink
        to="/learners/registration"
        class="ml-auto px-4 py-2 text-sm font-medium text-purple-800 bg-white rounded-full shadow transition-all duration-300"
      >
        Registration
      </NuxtLink>
    </header>

    <section class="bg-purple-600 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="bg-white rounded-2xl shadow-xl p-5 sm:p-6">

          <!-- Search Input -->
          <div class="relative">
            <input
              type="search"
              placeholder="Search tenders, reference no, keywords..."
              class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                    focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              class="absolute right-2 top-1/2 -translate-y-1/2
                    bg-purple-600 hover:bg-purple-700
                    text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Search
            </button>
          </div>

          <!-- Filters -->
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

            <!-- Category -->
            <select class="filter-select">
              <option>All Categories</option>
              <option>Construction</option>
              <option>IT & Software</option>
              <option>Medical</option>
            </select>

            <!-- Country -->
            <select class="filter-select">
              <option>All Countries</option>
              <option>Sri Lanka</option>
              <option>India</option>
              <option>Bangladesh</option>
            </select>

            <!-- Newspaper -->
            <select class="filter-select">
              <option>All Newspapers</option>
              <option>Daily News</option>
              <option>The Island</option>
              <option>Divaina</option>
            </select>

            <!-- Publish Date -->
            <select class="filter-select">
              <option>Any Date</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>

            <!-- Reset -->
            <button
              class="border border-gray-300 rounded-lg text-sm text-gray-600
                    hover:bg-gray-100 transition"
            >
              Reset
            </button>

          </div>

        </div>
      </div>
    </section>


    

<div class="py-10 bg-white text-center">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">
       Providers
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

      ],

      }
    },
    async mounted() {
     
    },
    async created() {
      this.showLoading = this.$showLoading;
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
    methods: { },
    async beforeMount() {

    },
    head() {
      return {
        title: 'DriveLearn - Find Your Perfect Driving School',
      }
    },
  }

</script>

<style>
  .filter-select {
  @apply w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5
         text-sm text-gray-700
         focus:ring-2 focus:ring-purple-500 focus:outline-none;
}

</style>

