<template>
  <section class="flex justify-center items-center h-screen">
    <p class="text-gray-700 text-lg">Redirecting to video...</p>
  </section>
</template>

<script>
export default {
  layout: 'default',

  async beforeMount() {
    // Redirect immediately to YouTube
    window.location.href = "https://youtu.be/FpOvAPXUdhI";
  },

  head() {
    return {
      title: 'MLab - Info',
    }
  },
}
</script>

<style scoped>
section {
  @apply bg-white;
}
</style>
