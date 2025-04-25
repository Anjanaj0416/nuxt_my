<template>
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-row space-x-4 items-start">
      
      <!-- Left -->
      <div class="flex flex-col items-start space-y-3 w-28 min-w-[8rem]  rounded">
  <span class="bg-yellow-400 text-black text-xs font-semibold px-2.5 py-1 rounded-t w-full text-center">
    Salons
  </span>
  <div class="w-full flex justify-center pb-3">
    <img :src="imgUrl" alt="Lak Agro Logo" class="w-28 h-auto rounded" />
  </div>
</div>

  
      <!-- Right -->
      <div class="flex-1">
        <h2 class="text-xl font-bold text-gray-900">Lak Agro (Pvt) Ltd</h2>
        <div class="mt-1 text-xs text-gray-500 space-y-0.5">
          <p>Registered in Salons.lk</p>
          <p class="text-blue-600 font-semibold">ELIGIBLE FOR BOOKING</p>
        </div>
  
        <div class="mt-3 text-sm text-gray-700 space-y-2">
          <div class="flex items-start">
            <svg class="w-4 h-4 mt-0.5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6c0 5.25 6 10 6 10s6-4.75 6-10a6 6 0 00-6-6zM10 9a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
            <span>138/D/1 Ihala Imbulgoda Imbulgoda Kadawatha</span>
          </div>
          <div class="flex items-start">
            <svg class="w-4 h-4 mt-0.5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zm3.97 1.22a.75.75 0 00-1.04 1.08l1.52 1.46a.75.75 0 001.04 0l1.52-1.46a.75.75 0 00-1.04-1.08L7.5 4.94 5.97 4.72z" />
            </svg>
            <span>0772481381, 0114321280</span>
          </div>
        </div>
  
        <div class="mt-3">
          <NuxtLink to="#" class="text-sm text-blue-600 hover:underline">More</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    layout: 'default',
    props:['imgUrl'],
    data() {
      return {
       
      }
    },
    mounted() {
     
    },
    computed: {
  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    }
  }
  </script>
  
  <style scoped></style>