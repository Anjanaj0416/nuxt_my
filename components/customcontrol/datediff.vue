<!-- import datediff from '~/components/customcontrol/datediff' 
 components: {
    datediff,
    },

    <datediff @click="LoadAbsence" />

       async LoadAbsence(req) {
         }

-->

<template>
  <section>
    <div class="flex flex-col gap-y-2 gap-x-4 md:flex-row">
      <div>
        <div class="flex gap-x-2">
          <div>From</div>
          <div>
            <input class="p-1 rounded-md text-blue-300" v-model="dtfrom" type="date" width="35" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex gap-x-2">
          <div>To</div>
          <div>
            <input class="p-1 rounded-md text-blue-300" v-model="dtto" type="date" width="35" />
          </div>
        </div>
      </div>
      <div>
        <btnhr_load name="View" @click="load" />
      </div>
    </div>
  </section>
</template>

<script>
// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
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
  beforeMount() {
    var date = new Date();
    this.dtfrom = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = myfilter.toInputTypeDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  },
}
</script>

<style></style>