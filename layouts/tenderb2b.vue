
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
import Sidebar from '~/components/mLabs/header/sidebar.vue'
import Header from '~/components/mLabs/header/loginHeader.vue'

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
