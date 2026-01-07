<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  useHead({
    title: 'BtoB | Largest Business-to-business Marketplace in Sri Lanka BtoB.lk',
    link: [
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/b2b/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/b2b/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/b2b/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon_io/b2b/site.webmanifest" }
    ]
  })
</script>
