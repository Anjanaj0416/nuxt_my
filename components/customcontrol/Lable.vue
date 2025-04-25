

<template>
     <section class="flex flex-col items-start p-1 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
        <div class="text-sm font-semibold text-gray-700">{{ title }}</div>
        <div class="text-lg font-medium text-blue-600 truncate">{{ value }}</div>
    </section>
  
  </template>
  
  <script>
 
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {},
    props:['title','value'],
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
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }
  </style>
  
  
  