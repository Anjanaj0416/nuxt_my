<template>
  <section>
    <div class="w-full lg:w-2/4 flex gap-x-4 mt-2 ">
      <div class="text-right pr-2">Year</div>
      <div>
        <selectinput2 class="w-16" v-model="year" :cur_item="year" :selections="arryear" />
      </div>

      <div class="text-right pr-2">Month</div>
      <div>
        <selectinput2 class="w-24" v-model="monthname" :cur_item="monthname" :selections="arrmonths" />
      </div>
      <div>
        <btnhr_load name="View" @click="load" />
      </div>
    </div>
  </section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import btnhr_load from '~/components/hr/btnhr_load'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: { selectinput2, btnhr_load },
  data() {
    return {
      year: 0,
      monthname: '',
      arrmonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      arryear: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    }
  },
  methods: {
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    // }),
    load() {

      this.$emit('click', { year: this.year, month: this.arrmonths.indexOf(this.monthname) + 1 })
    },
  },
  mounted() {
    var date = new Date();
    this.monthname = this.arrmonths[date.getMonth()];
    this.year = date.getFullYear();
  },
}
</script>

<style scoped></style>