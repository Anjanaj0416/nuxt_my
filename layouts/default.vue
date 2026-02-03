

<template>
  <section class="page-container">
    <div>
      <headercomp />
      <main class="content">
        <NuxtPage />
      </main>
      <!-- hide -->
      <!-- <footercomp /> -->
    </div>
  </section>
</template>


<script>
import headercomp from '~/components/header'
import footercomp from '~/components/footer'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

useHead({
  title: 'Digital TecLabs',
  link: [
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/dtl/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/dtl/favicon-32x32.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/dtl/apple-touch-icon.png" },
    { rel: "manifest", href: "/favicon_io/dtl/site.webmanifest" }
  ]
})

export default {
  components: { headercomp, footercomp, LoadingSpinner },
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
