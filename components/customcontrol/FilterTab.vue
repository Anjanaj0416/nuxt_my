<!-- usage
-->
<!-- <template>
  <section class="mt-5">
    <div class="flex flex-wrap items-center gap-6">

         <div
        v-for="(filter, index) in arrFilter"
        :key="index"
        class="flex items-center gap-2"
      >
    
        
        <input
          :id="'radio-' + index"
          type="radio"
          name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          @click="onClick(filter)"
        />

        <label
          :for="'radio-' + index"
          class="relative flex items-center text-sm font-medium text-gray-800  cursor-pointer"
        >
          <span>{{ filter.itemName }}</span>

        
          <span
            class="absolute -top-3 -right-6 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white rounded-full shadow-lg"
          >
            {{ filter.itemCount }}
          </span>
        </label>
      </div>

    </div>
  </section>
</template> -->

<template>
  <section class="mt-4">
    <div class="flex flex-wrap items-center gap-3">
    
      <div v-for="(filter, index) in arrFilter" :key="index" class="relative flex items-center gap-1">
        <!-- Hidden radio input -->
        <input :id="'radio-' + index" type="radio" name="filter-radio" class="sr-only" @click="onClick(filter)" />

        <!-- Styled label -->
        <label :for="'radio-' + index" :class="[
          'flex items-center text-sm px-3 py-1.5 rounded-full border transition-colors duration-200 cursor-pointer',
          selectedFilter === filter.itemName
            ? 'bg-blue-600 text-white border-blue-700 shadow'
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
        ]">
          {{ filter.itemName }}

          <!-- Count Badge -->
          <span v-if="filter.itemCount > 0"
            class="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-[0_0_0_1.5px_white]">
            {{ filter.itemCount }}
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
      if (filter.itemCount > 0) {
        this.selectedFilter = filter.itemName;
        this.$emit('selected', filter.itemName)
        this.$emit('click', filter.itemName)
      }
    }
  }
}
</script>

<style scoped>
/* All styles managed via Tailwind CSS */
</style>
