<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>

import AppHeader from '~/components/learners/AppHeader.vue'
import AppFooter from '~/components/learners/AppFooter.vue'
import { useAuthStore } from '~/stores/modules/learners/auth'  // or your correct path
import { useTheme } from '~/composables/learners/useTheme'  // or your correct path

const { initTheme } = useTheme()
const { initAuth } = useAuthStore()

onMounted(() => {
  initTheme()
  initAuth()
})
</script>