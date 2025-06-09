<!-- usage
-->
<template>
  <section class="mt-5">
    <div class="flex flex-wrap items-center gap-6">
      <div
        v-for="(filter, index) in arrFilter"
        :key="index"
        class="flex items-center gap-2"
      >
        <!-- Radio input -->
        <input
          :id="'radio-' + index"
          type="radio"
          name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          @click="onClick(filter)"
        />

        <!-- Label: relative for absolute badge -->
        <label
          :for="'radio-' + index"
          class="relative flex items-center text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
        >
          <span>{{ filter }}</span>

          <!-- Notification badge: top right -->
            <span
                class="absolute -top-3 -right-6 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white rounded-full shadow-lg"
            >
                20
            </span>
        </label>
      </div>
    </div>
  </section>
</template>




<script>
export default {
    props: ['arrFilter'],
    computed: {

    },
    data() {
        return {
            selectedFilter: '',
        }
    },
    methods: {
        onClick(filter) {
            this.selectedFilter = filter;
            this.$emit('selected', filter)
            this.$emit('click', filter)
        }
    }
}
</script>

<style scoped>
/* All styles managed via Tailwind CSS */
</style>
