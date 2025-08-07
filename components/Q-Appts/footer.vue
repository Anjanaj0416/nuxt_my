<template>
  <footer class="bg-blue-600 text-white py-6 mt-12">
    <div class="max-w-7xl mx-auto px-4 text-center space-y-2">
      <p class="text-lg font-semibold">Q - Appts</p>
      <div class="space-x-4 text-sm">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
      </div>
      <p class="text-xs text-blue-100">&copy; {{ new Date().getFullYear() }} Digital Tech Labs. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  props:[''],
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  async mounted() {},
    watch: {},
    computed: {},
    methods: {},
    async beforeMount() {},
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
}
</script>
      