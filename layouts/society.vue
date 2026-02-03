<template>
  <section class="page-container">
    <!-- Spinner only shows when loading -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Rest of the app shows only after loading is done -->
    <div v-else>
      <headercomp/>
      
      <main class="content">
        <NuxtPage />
      </main>
         <footercomp/>
    </div>
  </section>
</template>


<script>
import headercomp from '~/components/welfare/header.vue';
import footercomp from '~/components/welfare/footer.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue'

export default {
  components: {headercomp,footercomp,LoadingSpinner},
  data() {
    return {
       showLoading: null,
       isLoading:false,
    }
  },
  async created() {
    this.isLoading = useLoading()
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
