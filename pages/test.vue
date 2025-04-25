
<template >
  <section class="mt-24 mx-4 my-8 md:mx-10 lg:mx-24">
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CompanyCard  imgUrl="https://rainbowpages.lk/uploads/listings/logo/l/lakan1g.jpg"/>
        <CompanyCard imgUrl="https://rainbowpages.lk/uploads/listings/logo/d/deepn1g2.jpg"/>
        <CompanyCard imgUrl="https://rainbowpages.lk/uploads/listings/logo/d/douglassc.jpg"/>
        <CompanyCard  imgUrl="https://rainbowpages.lk/uploads/listings/logo/h/hayleys_agricul.jpg"/>
        <!-- Add more <CompanyCard /> as needed -->
      </div>
    </div>
  </section>
</template>





<script>
import CompanyCard from '@/components/test/vender_listing_card.vue'
export default {
  layout: 'default',
  components: {CompanyCard},
  data() {
    return {
      // greeting: '',
      // sum: 0,
    }
  },
  mounted() {
    // Access plugin through this
   // this.greeting = this.$myUtility.greet("Nuxt User")
  //  this.sum = this.$myUtility.add(10, 20)
   // this.toInputTypeDate = this.$myUtility.toInputTypeDate("2025-04-20")
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