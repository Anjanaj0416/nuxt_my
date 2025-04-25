<template>
  <section>
      <article>
           <div class="absolute top-0 right-0 mr-4 mt-4 cursor-pointer " title="Close" @click="exit" ><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></div>
      </article>
  </section>
</template>

<script>
export default {
methods: {
    exit(){
       
          this.$emit('getclose')
    }
},
}
</script>

<style>

</style>