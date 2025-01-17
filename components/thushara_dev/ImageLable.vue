

<template>
  <section class="flex flex-col items-start p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
    <div class="text-sm font-semibold text-gray-700">{{ title }}</div>
    <div class="text-lg font-medium text-blue-600 truncate">{{ value }}</div>
    
    <!-- Image with Caption and Link -->
    <div class="mt-4">
      <a :href="imageLink" target="_blank">
        <img :src="imageUrl" alt="Image Caption" class="w-full h-auto rounded-lg shadow-sm"/>
      </a>
      <p class="text-xs text-center text-gray-500 mt-2">{{ imageCaption }}</p>
    </div>
  </section>
</template>

  
  <script>
 
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {},
    props: ['title', 'value', 'imageUrl', 'imageCaption', 'imageLink'],
    data() {
      return {
        imageroot: process.env.Assets_83,
      }
    },
    async mounted() {},
    watch: {},
    computed: {
    
    },
    methods: {
      
    },
    async beforeMount() {
      
  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }
  
  
  </script>
  

  <style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  @apply border-gray-500 border p-2 rounded;
}

img {
  @apply rounded-lg shadow-sm;
}

p {
  @apply text-xs text-center text-gray-500 mt-2;
}
</style>

  
  
  