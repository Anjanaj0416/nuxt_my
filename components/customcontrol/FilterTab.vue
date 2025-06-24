<!-- usage
-->
<template>
  <section class="mt-5">
    <div class="flex flex-wrap items-center gap-6">
          <!-- {{ vendorStore.initVendor.vendorViewItemCount }} -->

   
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
        <!-- <label
          :for="'radio-' + index"
          class="relative flex items-center text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
        >
          <span>{{ filter.itemName }}</span>
            <span v-if="filter.itemCount >0"
                class="absolute -top-3 -right-6 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white rounded-full shadow-lg"
            >
                {{ filter.itemCount }}
            </span>
        </label> -->

        <label
          :for="'radio-' + index"
          class="relative flex items-center text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
        >
          <span>{{ filter.itemName }}</span>

          <!-- Show badge only if selected and itemCount > 0 -->
          <span
            v-if="filter.itemCount > 0 && selectedFilter === filter.itemName"
            class="absolute -top-3 -right-6 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white rounded-full shadow-lg"
          >
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
            if(filter.itemCount>0){
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
