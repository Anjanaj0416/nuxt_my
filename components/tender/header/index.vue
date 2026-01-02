<template>
    <header class="bg-purple-600 w-full h-20 py-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center
              px-4 sm:px-10 lg:px-44 py-3 sm:py-0"
      >
        <!-- Top row -->
        <div class="flex items-center gap-8 w-full">
          <!-- Logo -->
          <NuxtLink to="/Tender" class="flex items-center">
            <span
              class="text-xl sm:text-3xl font-bold text-white tracking-wide whitespace-nowrap"
            >
              TenderB2B.lk
            </span>
          </NuxtLink>

          <!-- Desktop menu -->
          <nav class="hidden sm:flex items-center mt-2 gap-6">
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

          <!-- Registration -->
          <!-- <NuxtLink
            to="/learners/registration"
            class="ml-auto px-4 py-2 text-sm font-medium
                  text-purple-800 bg-white rounded-full shadow transition-all duration-300"
          >
            Registration
          </NuxtLink> -->
        </div>

        <!-- Mobile menu (UNDER logo) -->
        <nav class="flex gap-6  sm:hidden">
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
    </header>
</template>

<script >


  definePageMeta({
    layout: 'tender',
    // middleware: 'auth',
  });



  export default {
    
    components: {},
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
    },
    methods: { },
    async beforeMount() {

    },
    head() {
      return {
        title: 'TenderB2B.lk',
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

