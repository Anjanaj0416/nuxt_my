<template>
  <section class="page-container">
    <headercomp/> 
    
    <!-- The page content will be injected here -->
    <main class="content">
      <NuxtPage />
    </main>

    <footercomp/>
  </section>
</template>

<script>
import headercomp from '~/components/header'
import footercomp from '~/components/footer'

export default {
  components: {headercomp,footercomp},
  data() {
    return {
       showLoading: null,
    }
  },
  async created() {
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
  flex-grow: 1; /* Allows the content to take the available space */
}

</style>
