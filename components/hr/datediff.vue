<template>
  <section>
    <div class="flex  gap-y-2 gap-x-4">
      <div>
        <div class="flex gap-x-2 ">
          <div>From</div>
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
import { useHrStore } from '~/stores/modules/hrStore';

export default {
  props: ['empno'],
  components: { btnhr_load, },

  data() {
    return {
      dtfrom: '',
      dtto: '',
      showLoading: null,
    }
  },

  async created() {
    this.hrStore = useHrStore();
    var date = new Date();
    this.dtfrom = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    this.showLoading = this.$showLoading;
  },

  methods: {
    async load() {
      this.$emit('date-change', { dtfrom: this.dtfrom, dtto: this.dtto });

      let req = {
        EmpNo: this.empno,
        FromDate: this.dtfrom,
        ToDate: this.dtto,
      }
      const hrStore = useHrStore();
      await hrStore.getAttendenceByEmp(req, this.showLoading);
    },
  },


}
</script>

<style></style>