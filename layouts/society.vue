<template>
  <section class="page-container">
    <LoadingSpinner v-if="isLoading" />
    <div v-else>
      <headercomp/>
      <main class="content">
        <NuxtPage />
      </main>
      <footercomp/>
    </div>
  </section>
</template>

<script setup>
import { useHead } from '#app'

// ✅ This is the correct way in Nuxt 3
useHead({
  title: 'Eksath Subasadaka Welfare Society',
  link: [
    { rel: 'icon', type: 'image/jpeg', href: '/walfare/Logo.jpeg' }
  ]
})
</script>

<script>
import headercomp from '~/components/welfare/header.vue';
import footercomp from '~/components/welfare/footer.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue'

export default {
  components: { headercomp, footercomp, LoadingSpinner },
  data() {
    return {
      showLoading: null,
      isLoading: false,
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
}
</style>