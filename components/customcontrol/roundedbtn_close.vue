<!-- Usage:

<roundedbtn_close class="w-8" title="User"  @onclick="userclick"/>

import roundedbtn_close from '~/components/tailwindcomp/roundedbtn_close'

 components: {
roundedbtn_close
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
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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

<style scoped>
.cssbtn:hover{
   @apply    transform  scale-125 duration-500 ;
}

</style>
