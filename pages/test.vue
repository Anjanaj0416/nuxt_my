
<template >
  <section class="mt-24 mx-4 my-8 md:mx-10 lg:mx-24">
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <img src="https://drive.google.com/thumbnail?id=14ukBKtgUk2TpNRJ1HMJ-NzXeyiD50KCc&sz=w1000" 
     alt="Drive Image" width="400">

     <img 
    :src="`/api/image/14ukBKtgUk2TpNRJ1HMJ-NzXeyiD50KCc`" 
    alt="Drive Image" 
    width="400" 
  />

   <ClientOnly>
    <img
      src="https://lh3.googleusercontent.com/d/14ukBKtgUk2TpNRJ1HMJ-NzXeyiD50KCc=w1000?authuser=0"
      alt="Drive Image"
      width="400"
    />
     <img
      :src="imgurl"
      alt="Drive Image"
      width="400"
    />
  </ClientOnly>
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
      imgurl : 'https://drive.google.com/thumbnail?id=14ukBKtgUk2TpNRJ1HMJ-NzXeyiD50KCc&sz=w1000'
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