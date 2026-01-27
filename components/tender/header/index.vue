<template>
    <!-- <header class="sticky bg-purple-600 w-full py-0 lg:py-7 "> -->
    <header class="sticky top-0 z-50 bg-purple-600 w-full py-0 lg:py-2">
      <div
        class="flex flex-col sm:flex-row sm:items-center
              px-4 sm:px-10 lg:px-44 py-3 sm:py-0"
      >
        <!-- Top row -->
        <div class="flex items-start gap-2 w-full">
          <div class="flex flex-col">
            <a href="/Tender">
              <span
                class="text-xl sm:text-3xl font-bold text-white tracking-wide whitespace-nowrap"
              >
                TenderB2B.lk
              </span>
            </a>

            <!-- Menu UNDER the logo/text -->
            <nav class="flex items-center gap-6 mt-2 ml-1 lg:ml:0">
              <NuxtLink
                to="/tender"
                class="text-md font-medium text-white"
              >
                 Home
              </NuxtLink>

              <NuxtLink
                to="https://btob.lk/"
                class="text-md font-medium text-white"
              >
                BtoB.lk
              </NuxtLink>
            </nav>
          </div>
        </div>


        <!-- Mobile menu (UNDER logo) -->
        <!-- <nav class="flex gap-6  sm:hidden">
          <NuxtLink to="/tender" class="text-md font-medium text-white">
            Tender
          </NuxtLink>
          <NuxtLink to="https://btob.lk/" class="text-md font-medium text-white">
            B2B.lk
          </NuxtLink>
        </nav> -->
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

