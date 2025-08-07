<!-- <template>
  <section class="page-container">
    <LoadingSpinner v-if="isLoading" />
    <headercomp/> 
    
    The page content will be injected here
    <main class="content">
      <NuxtPage />
    </main>

    <footercomp/>
  </section>
</template> -->

<template>
  <section class="page-container bg-blue-50">
    <!-- Spinner only shows when loading -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Rest of the app shows only after loading is done -->
    <div v-else>
      <Headercomp />
      <main class="content">
        <NuxtPage />
      </main>
      <!-- hide -->
      <Footercomp />
    </div>
  </section>
</template>


<script>
import Headercomp from '~/components/Q-Appts/header'
import Footercomp from '~/components/Q-Appts/footer'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

export default {
  components: { Headercomp, Footercomp, LoadingSpinner },
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
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  /* Allows the content to take the available space */
}
</style>
