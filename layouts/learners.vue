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
  <section class="page-container">
    <!-- Spinner only shows when loading -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Rest of the app shows only after loading is done -->
    <div v-else>
      <!-- <headercomp/> -->
      <main class="content">
        <NuxtPage />
      </main>
      
    </div>
  </section>
</template>


<script>

import footercomp from '~/components/footer'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

export default {
  components: {headercomp,footercomp,LoadingSpinner},
  data() {
    return {
       showLoading: null,
       isLoading:null,
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
  flex-grow: 1; /* Allows the content to take the available space */
}

</style>
