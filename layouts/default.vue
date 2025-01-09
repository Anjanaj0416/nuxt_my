<template>
  <section>
    <headercomp/> 
    
    <!-- The page content will be injected here -->
    <main class="">
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
</style>
