<template>
  <section>
    <article></article>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  layout: 'mLabsHome',

  computed: {
    ...mapState({
      company: (state) => state.company,
      loggeduser: (state) => state.loggeduser,
    }),
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      resetNoftifications: 'RESET_NOTIFICATION',
    }),
    navigateTo(url) {
      this.$router.push(url)
    },
  },
  mounted() {
    this.resetNoftifications()
  },
  beforeMount() {
    if (!this.loggeduser || this.loggeduser.id === -1) {
      this.$router.push('/user/login')
    }
  },
  head() {
    return {
      title: 'Medical Laboratory Services',
    }
  },
}
</script>

<style>
/* .csssignin {
  @apply text-EF-blue bg-EF-green-200 px-2 py-1 mt-4 w-20 rounded text-center cursor-pointer mx-auto;
}

.csssignin:hover {
} */
</style>
