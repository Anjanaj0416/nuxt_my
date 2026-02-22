<template>
  <section>
    <div class="flex flex-col sm:flex-row 
                sm:items-end 
                gap-3 sm:gap-4 w-full">

      <!-- From Date -->
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-[12px] font-semibold text-gray-600 mb-1">
          From
        </label>

        <input
          v-model="dtfrom"
          type="date"
          class="h-8 w-full sm:w-40 px-2 
                rounded-md border border-gray-300 
                focus:border-blue-500 
                focus:ring-1 focus:ring-blue-200
                text-gray-700 text-xs"
        />
      </div>

      <!-- To Date -->
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-[12px] font-semibold text-gray-600 mb-1">
          To
        </label>

        <input
          v-model="dtto"
          type="date"
          class="h-8 w-full sm:w-40 px-2 
                rounded-md border border-gray-300 
                focus:border-blue-500 
                focus:ring-1 focus:ring-blue-200
                text-gray-700 text-xs"
        />
      </div>

      <!-- Load Button -->
      <div class="w-full sm:w-auto">
        <btnhr_load 
          name="Load" 
          @click="load"
          class="w-full sm:w-auto"
        />
      </div>

    </div>
    <!-- <div class="block w-24 mx-auto my-4 bg-white rounded-lg md:hidden">
      <btnhr_load name="Load" @click="load" />
    </div> -->



  </section>
</template>

<script>
// import * as Global from '@/assets/js/Global'
import btnhr_load from '~/components/customcontrol/hr/btn'

export default {
  components: { btnhr_load, },

  data() {
    return {
      dtfrom: '',
      dtto: '',
      showLoading: null,
    }
  },

  async created() {
    var date = new Date();
    this.dtfrom = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    this.showLoading = this.$showLoading;
  },

  methods: {
    async load() {
      this.$emit('date-change', { dtfrom: this.dtfrom, dtto: this.dtto });

    },
  },


}
</script>

<style></style>