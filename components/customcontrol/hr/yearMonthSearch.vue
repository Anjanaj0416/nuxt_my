<template>
  <section class="w-full">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

    <!-- Year -->
    <div>
      <label class="block text-[13px] font-bold text-gray-600">
        Year
      </label>
      <div class="relative w-full mt-2">
        <selectinput2 v-model="year" :selections="arryear" @click.stop />
      </div>
    </div>

    <!-- Month -->
    <div>
      <label class="block text-[13px] font-bold text-gray-600">
        Month
      </label>
      <div class="relative w-full mt-2">
        <selectinput2 v-model="monthname" :selections="arrmonths" @click.stop />
      </div>
    </div>

    <!-- Button (small) -->
    <div class="flex justify-start">
      <btnhr_load
        name="View"
        @click="load"
        class="px-4 text-sm w-auto"
      />
    </div>

  </div>
</section>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import btnhr_load from '~/components/customcontrol/hr/btn'

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
      console.log("load:", this.year, this.arrmonths.indexOf(this.monthname) + 1);

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