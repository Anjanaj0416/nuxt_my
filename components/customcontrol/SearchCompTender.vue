<!-- usage
-->
<template>

  <section >
    <div class="flex items-center justify-center w-full sm:max-w-3xl mx-auto">
      <div class="relative w-full">
        
        <!-- Input -->
        <input
          type="text"
          id="simple-search"
          class="w-full pl-4 pr-14 py-3 text-gray-700 placeholder-gray-400 
                 border border-gray-300 rounded-full focus:outline-none 
                 focus:ring-2 focus:ring-purple-800"
          placeholder="What are you looking for?"
          v-model="selectedVal"
        />

        <!-- Search Button (overlaps inside input on the right) -->
        <button
          type="button"
          class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center 
                 w-10 h-10 bg-purple-900 rounded-full hover:bg-purple-800 transition duration-200"
          @click="GetSearch"
        >
          <svg
            class="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>

   <!-- <section>
    <div class="flex items-center justify-center w-full  sm:max-w-sm mx-auto relative">
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          class="border border-btn text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm block w-full ps-10 p-2.5"
          placeholder="Search..."
          required
          v-model="selectedVal"
        />
      </div>
  
      <button
        type="button"
        class="p-2.5 ms-2 text-sm font-medium text-white bg-btn rounded-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-red-300"
      @click="GetSearch"
        >              
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </div>
  </section> -->
</template>

<script>
export default {
    props: [ ], 
    computed: {
       
    },
    data() {
        return {
            selectedVal:'',
        }
    },
    methods: {
        GetSearch() {        
            this.$emit('DoSearch',this.selectedVal)
            this.selectedVal = ''
        }
    }
}
</script>

<style scoped>
/* All styles managed via Tailwind CSS */
</style>
