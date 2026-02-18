<template>
  <section @click="handleClick" class="cursor-pointer" :title="title">    
     <div
       class="px-4 py-2 text-center bg-EF-green-300 rounded-md text-white font-semibold border-2 border-gray-300"
     >
       {{ text }}
     </div>
  </section>
</template>

<script>
export default {
  name: 'MlabBtn',
  props: {
    text: { type: String, required: true },
    title: { type: String, default: '' },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
/* Optional responsive styling */
@media (min-width: 640px) {
  /* Add styles if needed */
}
</style>
