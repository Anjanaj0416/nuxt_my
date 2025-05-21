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
// import headercomp from '~/components/header'
import headercomp from '~/pages/promise/header.vue'
import footercomp from '~/pages/promise/footer.vue'
export default {
  components: {headercomp,footercomp},
  
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
