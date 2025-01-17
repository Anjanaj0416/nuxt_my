<template>
  <section class="page-container">
    <headercomp/> 
    
    <!-- The page content will be injected here -->
    <main class="content">
      <slot />
    </main>

    <footercomp/>
  </section>
</template>

<script>
import headercomp from '~/components/header'
import footercomp from '~/components/footer'
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
  flex-grow: 1; /* Allows the content to take the available space */
}

</style>
