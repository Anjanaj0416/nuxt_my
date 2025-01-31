

<template>
     <section :title="value" class="flex flex-col items-start p-1 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
     :class="status!='Active'?'cssInactive':''">
        <div class="text-sm font-semibold text-gray-700">{{ title }}</div>
        <div  class="text-lg font-medium text-blue-600 truncate w-full">{{ value }}</div>
       
    </section>
  
  </template>
  
  <script>
 
 definePageMeta({
    layout: 'default'
   });
  export default {
    
    components: {},
    props:['title','value','status'],
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

  .cssInactive{
  @apply bg-red-100 ;
}

.cssInactive div:nth-child(2){
  @apply  text-red-500;
}
  </style>
  
  
  