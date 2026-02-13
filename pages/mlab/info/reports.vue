<template>
  <section class="flex justify-center items-center h-screen text-center">
    <p class="text-gray-700 text-lg">Downloading Reports...</p>
  </section>
</template>

<script>
export default {
  layout: 'default',

  async beforeMount() {
    // Example: auto-trigger download
    // window.location.href = "http://easyappts.lk:5001/mgt_reports/payments";

    // Or you can fetch file via API here
    console.log("Ready to download reports");
  },

  head() {
    return {
      title: 'EasyAppts',
    }
  },
}
</script>

<style scoped>
section {
  @apply bg-white;
}
</style>
