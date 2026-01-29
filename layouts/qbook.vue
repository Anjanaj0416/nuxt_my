<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  useHead({
    title: 'Q-Book',
    link: [
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/dtl/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/dtl/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/dtl/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon_io/dtl/site.webmanifest" }
    ]
  })
</script>
