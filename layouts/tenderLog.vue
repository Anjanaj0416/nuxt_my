<template>
  <section class="page-container">
    <div>
      <headercomp />
      <main class="content">
        <NuxtPage />
      </main>
    </div>
  </section>
</template>


<script>
import headercomp from '~/components/tender/header/loginHeader.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue'

export default {
  components: { headercomp, LoadingSpinner },
  data() {
    return {
      showLoading: null,
      isLoading: null,
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
  flex-grow: 1;
  /* Allows the content to take the available space */
}
</style>
