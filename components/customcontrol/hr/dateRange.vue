<template>
  <section>
    <div class="flex gap-y-2 gap-x-4 items-end">
      <!-- From Date -->
      <div class="mt-1">
        <label class="block text-[13px] font-bold text-gray-600">
          Employee
        </label>
        <div class="relative w-full">
          <input
            class="p-1 text-sm md:text-base rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-600"
            v-model="dtfrom"
            type="date"
          />
        </div>
      </div>

      <!-- To Date -->
      <div>
        <label class="block text-[13px] font-bold text-gray-600">
          To
        </label>
        <div class="relative w-full">
          <input
            class="p-1 text-sm md:text-base rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-600"
            v-model="dtto"
            type="date"
          />
        </div>
      </div>

      <!-- Creative Load Button -->
      <div class="">
        <button
          @click="load"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg "
        >
          Load
        </button>
      </div>
    </div>
    <!-- <div class="block w-24 mx-auto my-4 bg-white rounded-lg md:hidden">
      <btnhr_load name="Load" @click="load" />
    </div> -->



  </section>
</template>

<script>
// import * as Global from '@/assets/js/Global'
import btnhr_load from '~/components/hr/btnhr_load'

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