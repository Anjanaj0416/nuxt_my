<template>
  <section>
    <div class="flex  gap-y-2 gap-x-4">
      <div>
        <div class="flex gap-x-2 ">
          <div>From</div> {{ dtfrom }}
          <div><input class="p-1 text-sm rounded-md text-gray-600 md:text-base" v-model="dtfrom" type="date" width="35">
          </div>
        </div>
      </div>
      <div>
        <div class="flex gap-x-2 ">
          <div>To</div>
          <div><input class="p-1 text-xs rounded-md text-gray-600 md:text-base" v-model="dtto" type="date" width="35">
          </div>
        </div>
      </div>
      <div class="hidden bg-white rounded-lg md:block">
        <btnhr_load name="Load" @click="load" />
      </div>
    </div>
    <div class="block w-24 mx-auto my-4 bg-white rounded-lg md:hidden">
      <btnhr_load name="Load" @click="load" />
    </div>



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

    }
  },
  methods: {
    load() {
      this.$emit('click', { dtfrom: this.dtfrom, dtto: this.dtto })
    },
  },

  async created() {
    var date = new Date();
    this.dtfrom = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  },
}
</script>

<style></style>