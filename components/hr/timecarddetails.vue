<template>
  <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam, culpa perspiciatis voluptatibus
    tempore molestias quia? Architecto dolorem consequuntur, excepturi provident distinctio aut magni temporibus placeat
    quo, cupiditate, eligendi necessitatibus?
  </section>
</template>

<script>
// import datediff from '~/components/customcontrol/datediff'
import btnapplyleave from '~/components/hr/btnapplyleave'
import selectinput2 from '~/components/customcontrol/selectinput2'

// // import * as Global from '@/assets/js/Global'
// //import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    // datediff,
    selectinput2,
    btnapplyleave,
  },
  data() {
    return {
      imageroot: process.env.Assets_83,
      year: 2022,
      month: 'Jan',
      month_names: [],
      years: [],
      err: {
        year: '',
        month: '',
      },
    }
  },

  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   timecard: (state) => state.hr.timecard,
    // }),


    getTimeCardRowColor() {
      return (jc) => {
        try {
          let rowclass =
            jc.status.toLowerCase() == 'pending'
              ? 'cssPending'
              : jc.status.toLowerCase() == 'reject'
                ? 'cssReject'
                : 'cssDefault'

          return rowclass
        } catch {
          return ''
        }
      }
    },
  },
  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   //viewAbsence: 'hr/viewAbsence',
    //   getTimeCards: 'hr/getTimeCards',
    //   createTimeCard: 'hr/createTimeCard',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   //reset: 'hr/RESET_ABSENCE',
    // }),
    async init() {
      // this.reset()
      // var date = new Date()
      // this.dtfrom = myfilter.toInputTypeDate(
      //   new Date(date.getFullYear(), date.getMonth(), 1)
      // )
      // this.dtto = myfilter.toInputTypeDate(
      //   new Date(date.getFullYear(), date.getMonth() + 1, 0)
      // )
      // await this.viewAbsence({
      //   fromdate: this.dtfrom,
      //   todate: this.dtto,
      //   empno: this.empno,
      //   user: this.loggeduser,
      // })
    },
    // async LoadAbsence(req) {
    //   await this.viewAbsence({
    //     fromdate: req.dtfrom,
    //     todate: req.dtto,
    //     empno: this.empno,
    //     user: this.loggeduser,
    //   })
    // },
    async getRefresh() {
      let dt = new Date();

      this.year = dt.getFullYear()
      this.month = this.month_names[dt.getMonth() - 1]

      let req = { empno: this.empno, user: this.loggeduser }
      await this.getTimeCards(req)

    },

    getclose() {
      this.$emit('exit')
    },

    async applyTimeCard() {
      if (confirm('Sure to Create this Time Card?')) {

        let year = parseInt(this.year)
        let month = parseInt(this.month_names.indexOf(this.month) + 1);
        let req = { empno: this.empno, month: month, year: year, user: this.loggeduser }

        await this.createTimeCard(req)
        this.getRefresh();
      }
    },

  },

  async beforeMount() {
    // this.month_names = Global.getMonthNames()
    // this.years = Global.getYears()
    // this.getRefresh()


  }
}
</script>

<style scoped>
.cssPending {
  @apply bg-orange-600;
}

.cssDefault {
  @apply bg-green-600;
}

.cssReject {
  @apply bg-red-600;
}
</style>