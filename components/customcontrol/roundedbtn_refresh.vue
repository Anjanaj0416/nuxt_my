<!-- Usage:

<roundedbtn_refresh class="w-8" title="User"  @onclick="userclick"/>

import roundedbtn_refresh from '~/components/tailwindcomp/roundedbtn_refresh'

 components: {
roundedbtn
 },

  methods: {
 userclick(){
     
    }
-->


<template>
  <section>
     <div class=" w-full border-gray-500 rounded p-2  rounded-full p-1 cursor-pointer flex item-center" :title="title" @click="on_click">
      <div class="cssbtn  mx-auto  ">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-700 hover:text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
         </svg>
       </div>
     </div>
  </section>
</template>

<script>
export default {
    props:['title'],
methods: {
    on_click(){
       this.$emit('onclick');
    }
 }
}
</script>

<style>
.cssbtn:hover{
   @apply    transform  scale-125 duration-500;
}
</style>
