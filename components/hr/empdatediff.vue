<template>
  <section>
    <div class="flex gap-x-4">
      <div>
        <div class="flex gap-x-2 ">
          <div>Employee</div>
          <div>
            <serachInput :arrItems="alEmps" ref="emp" label="" v-model="empno" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex gap-x-2 ">
          <div>From</div>
          <div><input class="text-gray-600  rounded-md p-1" v-model="dtfrom" type="date" width="35"></div>
        </div>
      </div>
      <div>
        <div class="flex gap-x-2 ">
          <div>To</div>
          <div><input class="text-gray-600 rounded-md p-1" v-model="dtto" type="date" width="35"></div>
        </div>
      </div>
      <div>
        <btnhr_load name="View" @click="load" />
      </div>
    </div>




  </section>
</template>

<script>
import serachInput from '~/components/customcontrol/SearchInput'

//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
import btnhr_load from '~/components/hr/btnhr_load'
export default {
  components: { btnhr_load, serachInput },
  props: ['alEmps'],
  data() {
    return {
      dtfrom: '',
      dtto: '',
      empno: '',
    }
  },
  methods: {
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
      // setpage: 'hr/SET_PAGE',
      // setorganizedlistdata: 'hr/SET_ORGANIZEDLISTDATA',
    }),
    load() {
      if (this.empno == '') this.showMessage({ type: 'Failed', message: 'Invalid Emp Number' });
      else if (this.dtfrom == '') this.showMessage({ type: 'Failed', message: 'Invalid From Date' });
      else if (this.dtto == '') this.showMessage({ type: 'Failed', message: 'Invalid To Date' });
      else {
        this.$emit('click', { dtfrom: this.dtfrom, dtto: this.dtto, empno: this.empno })
      }

    },
  },
  beforeMount() {
    var date = new Date();
    this.dtfrom = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  },

}
</script>

<style></style>