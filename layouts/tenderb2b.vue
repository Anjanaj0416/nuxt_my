<!-- <template>
  <section class="page-container">
    <headercomp />

    <main class="content">
      <NuxtPage />
    </main>
  </section>
</template>

<script setup>
  import headercomp from '~/components/tender/header/loginHeader.vue'
 useHead({
    title: 'TenderB2B.lk',
    link: [
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/tender/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/tender/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/tender/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon_io/tender/site.webmanifest" }
    ]
  })
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}
</style> -->


<template>
  <div class="flex min-h-screen bg-gray-100">
    <input type="checkbox" id="menu-toggle" class="hidden peer" />

    <Sidebar />

    <label
      for="menu-toggle"
      class="fixed inset-0 bg-black/50 z-30 hidden peer-checked:block sm:hidden"
    />

    <!-- MAIN -->
    <div class="flex-1 flex flex-col">
      <!-- HEADER COMPONENT -->
      <Header>
        <!-- <slot name="page-title"></slot> -->
      </Header>

      <!-- PAGE CONTENT -->
      <main class="my-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/tender/header/sidebar.vue'
import Header from '~/components/tender/header/loginHeader.vue'

useHead({
  title: 'TenderB2B.lk',
  link: [
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/tender/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/tender/favicon-32x32.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/tender/apple-touch-icon.png" },
    { rel: "manifest", href: "/favicon_io/tender/site.webmanifest" }
  ]
})

</script>
