<template>
  <section class="flex min-h-screen page-container">
    <div>
      <headercomp />
      <main class="px-4 py-8 mt-14 lg:px-24">
        <NuxtPage />
      </main>
      <!-- hide -->
      <!-- <footercomp /> -->
    </div>
  </section>
</template>


<script>
import headercomp from '~/components/Q-Book/Header/index.vue'

useHead({
  title: 'Q-Book',
  link: [
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/dtl/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/dtl/favicon-32x32.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/dtl/apple-touch-icon.png" },
    { rel: "manifest", href: "/favicon_io/dtl/site.webmanifest" }
  ]
})

export default {
  components: { headercomp },
  data() {
    return {
      showLoading: null,
      isLoading: null,
    }
  },
  async created() {
    this.isLoading = useLoading()
    // console.log("isLoading:",this.isLoading);

    // alert('sl')
    // this.showLoading = this.$showLoading;
    //  const loadingAlert = showLoading("");
    // loadingAlert.close();
  },
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex-grow: 1;
  /* Allows the content to take the available space */
}
</style>
