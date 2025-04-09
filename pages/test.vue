<template>
  <section class="mt-24">
    <div>
      <p>{{ greeting }}</p>
      <p>10 + 20 = {{ sum }}</p>
      <p>{{ toInputTypeDate }}</p>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      greeting: '',
      sum: 0,
    }
  },
  mounted() {
    // Access plugin through this
    this.greeting = this.$myUtility.greet("Nuxt User")
    this.sum = this.$myUtility.add(10, 20)
    this.toInputTypeDate = this.$myUtility.toInputTypeDate("2025-04-20")
  },
  computed: {

  },
  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    }
  }
}
</script>

<style scoped></style>