<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  // useHead({
  //   title: 'TenderB2B.lk | Sri Lanka Main B2B Tender Website ',
  //   link: [
  //     { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/tender/favicon-16x16.png" },
  //     { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/tender/favicon-32x32.png" },
  //     { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/tender/apple-touch-icon.png" },
  //     { rel: "manifest", href: "/favicon_io/tender/site.webmanifest" }
  //   ]
  // })
  useHead({
    title: 'TenderB2B.lk | Sri Lanka Main B2B Tender Website',
    link: [
      { rel: "icon", sizes: "16x16", href: "/favicon_io/tender/favicon-16x16.png" },
      { rel: "icon", sizes: "32x32", href: "/favicon_io/tender/favicon-32x32.png" },
      { rel: "apple-touch-icon", href: "/favicon_io/tender/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon_io/tender/site.webmanifest" }
    ]
  })


</script>
