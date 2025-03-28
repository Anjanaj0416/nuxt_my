<template>
  <section class="relative">
         <div class="font-bold hover:text-gray-700" @click="is_swipe_opened=!is_swipe_opened" >Swipes</div>
         <div class="border-gray-500 rounded p-2   text-white font-bold rounded-b-md p-1 absolute top-0 h-auto z-50 mt-6" :class="cssbg" v-show="is_swipe_opened">
             <div v-for="swipe in swipes" :key="swipe">{{swipe}}</div>


         </div>

  </section>
</template>

<script>
export default {
    props:['cssbg','swipes'],
    data(){
        return {
          is_swipe_opened:false,
        }
    },
}
</script>

<style scoped>
.cssShortLeave {
  @apply bg-green-700;
}
.cssHalfday {
  @apply bg-blue-700;
}
.cssInComplete {
  @apply bg-yellow-700;
}
.cssHoliday {
  @apply bg-indigo-700;
}
.cssMovement {
  @apply bg-gray-600;
}
.cssLeave {
  @apply bg-pink-700;
}
.cssSaturday {
  @apply bg-gray-500;
}
.cssSunday {
  @apply bg-red-700;
}
.cssDefault {
  @apply bg-gray-600;
}
</style>
