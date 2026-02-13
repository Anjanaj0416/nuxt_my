<template>
  <section class="mt-12 px-4">
    <div class="h-screen flex lg:items-center w-screen">
      <div
        class="
          csstile
          grid grid-cols-1
          lg:grid-cols-3
          w-1/2
          h-64
          gap-y-4
          mx-auto
          mt-8
          lg:mt-0
        "
      >
        <!-- Day Tests -->
        <div
          class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer"
          @click="navigate('testsummery')"
        >
          <div class="font-thin text-sm pt-4">Day Tests</div>
          <div class="text-2xl font-thin">{{ dboard.count_day_tests }}</div>
        </div>

        <!-- Day Sales -->
        <div
          class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer"
          @click="navigate('cashcollection')"
        >
          <div class="font-thin text-sm pt-4">Day Sales</div>
          <div class="text-2xl font-thin">
            {{ $options.filters.toLKR(dboard.day_sales) }}
          </div>
        </div>

        <!-- Day Income -->
        <div
          class="bg-gray-400 hover:text-white hover:bg-EF-green-300 cursor-pointer"
          @click="navigate('incomereport')"
        >
          <div class="font-thin text-sm pt-4">Day Income</div>
          <div class="text-2xl font-thin">
            {{ $options.filters.toLKR(dboard.day_income) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      assets_root: process.env.McleAssets,
      dboard: {
        count_day_tests: 34,
        day_sales: 250000,
        day_income: 225000,
      },
    }
  },
  methods: {
    navigate(section) {
      this.$router.push('/mgt_reports/' + section)
    },
  },
}
</script>

<style scoped>
.csstile > div {
  @apply p-4 shadow-outline rounded-md h-32 w-32 text-center flex flex-col justify-center items-center;
}
</style>
