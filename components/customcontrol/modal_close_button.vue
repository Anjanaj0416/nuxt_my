<template>
   <section>
    <div
        @click="closeModal" 
          class="p-2 text-white cursor-pointer rounded-full hover:bg-gray-300 hover:text-blue-700  focus:outline-none"
          aria-label="Close Popup"
        >
          <!-- Close Icon -->
          <svg
            class="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
   </section>
  </template>
  
  <script>
 export default {
    
    components: {},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
      }
    },

    methods: {
        closeModal(){
             
            this.$emit('close')
        },
 
    },

  
  }

  </script>
  
  <style scoped>
  
  </style>
  