<template>
  <header class="antialiased">
    <nav class="px-4 py-4 bg-white border-b border-gray-200 lg:px-6 dark:bg-gray-800">
      <div class="flex flex-wrap items-center justify-between">
        <!-- Left logo -->
        <div class="flex justify-start w-1/6">
          <img
            src="https://promise.lk//assets/img/gov_crest.png"
            alt="Sri Lanka Logo"
            class="object-contain h-20"
          />
        </div>

        <!-- Center text -->
        <div class="w-4/6 text-center">
          <h1 class="text-2xl font-bold leading-snug md:text-3xl"  style="color: #3c8dbc;">
            Electronic Government Procurement (eGP) System
          </h1>
          <p class="text-base text-gray-700 md:text-lg">
            Government of Democratic Socialist Republic of Sri Lanka
          </p>
          <p class="text-base text-gray-700 md:text-lg">
            Ministry of Finance, Planning and Economic Development
          </p>
        </div>

        <!-- Right logo -->
        <div class="flex justify-end w-1/6">
          <img
            src="http://www.sltds.lk/wp-content/uploads/2021/05/cropped-logo1.png"
            alt="PROMISe Logo"
            class="object-contain h-16"
          />
        </div>
      </div>
    </nav>
  </header>
</template>


<script>


export default {
  components: {
  
  },

  data() {
    return {

    };

  },

  methods: {

  },
  mounted() {
   // console.log("Received user ID in profile:", this.userId);
  },
  async created() {
  
  },
};
</script>


