<template>
  <section class="flex justify-center items-center h-screen">
    <p class="text-gray-700 text-lg">Redirecting to Payments...</p>
  </section>
</template>

<script>
export default {
  layout: 'default',

  async beforeMount() {
    // Redirect immediately
    window.location.href = "http://easyappts.lk:5001/mgt_reports/payments";
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
