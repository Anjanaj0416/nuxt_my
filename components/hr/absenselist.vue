<template>
  <section>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad alias reiciendis magni nulla quos hic itaque ea
    possimus molestiae fugiat voluptas perferendis laboriosam, provident, nihil quod error tempora excepturi sit!
  </section>
</template>


<script>
import datediff from '~/components/customcontrol/datediff'
import btnapplyleave from '~/components/hr/btnapplyleave'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    datediff,
    btnapplyleave,
  },
  data() {
    return {
      imageroot: process.env.Assets_83,
      dtfrom: '',
      dtto: '',

    }
  },

  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   absense: (state) => state.hr.absense,
    // }),
    // getAbsenceRowColor() {
    //   return (ab) => {
    //     try {
    //       let rowclass =
    //         ab.approvalStatus.toLowerCase() == 'Pending'
    //           ? 'cssPending'
    //           : ab.approvalStatus.toLowerCase() == 'reject'
    //             ? 'cssReject'
    //             : 'cssDefault'

    //       return rowclass
    //     } catch {
    //       return ''
    //     }
    //   }
    // },
  },
  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   viewAbsence: 'hr/viewAbsence',
    //   deleteAbsence: 'hr/deleteAbsence',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   reset: 'hr/RESET_ABSENCE',
    // }),
    async init() {
      this.reset()
      var date = new Date()
      this.dtfrom = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.dtto = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      )

      await this.viewAbsence({
        fromdate: this.dtfrom,
        todate: this.dtto,
        empno: this.empno,
        user: this.loggeduser,
      })
    },
    async LoadAbsence(req) {
      this.dtfrom = req.dtfrom;
      this.dtto = req.dtto;

      await this.viewAbsence({
        fromdate: req.dtfrom,
        todate: req.dtto,
        empno: this.empno,
        user: this.loggeduser,
      })
    },
    getclose() {
      this.$emit('exit')
    },
    async applyleave() {
      let leaveYear = new Date(this.dtfrom).getFullYear()
      this.$emit('absenseapply', { empNo: this.empno, leaveYear: leaveYear })
    },
    async deleteRecord(id) {
      if (confirm('Sure to delete this Absence?')) {
        let req = { absendce_id: id, user: this.loggeduser }
        await this.deleteAbsence(req)
      }
    },
  },
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