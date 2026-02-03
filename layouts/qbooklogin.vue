<template>
  <section class="flex min-h-screen page-container">
    <div>
      <headercomp />
      <main class="px-4 py-8 mt-14 lg:px-24">
        <NuxtPage />
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import headercomp from '~/components/Q-Book/Header/index.vue'
import { useLoading } from '~/composables/useLoading'

/* head */
useHead({
  title: 'Q-Book',
  link: [
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/qbook/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/qbook/favicon-32x32.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/qbook/apple-touch-icon.png" },
    { rel: "manifest", href: "/favicon_io/qbook/site.webmanifest" }
  ]
})

/* state */
const showLoading = ref(null)
const isLoading = useLoading() // same as created()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex-grow: 1;
}
</style>
