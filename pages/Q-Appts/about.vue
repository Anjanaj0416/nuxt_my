<template>
  <div>
    <ApptsNavbar />
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-2">About Us</h1>
      <p class="text-gray-700">SalonQ helps you book queues at salons with ease and avoid long wait times.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
import ApptsNavbar from '~/components/Q-Appts/ApptsNavbar.vue';
</script>