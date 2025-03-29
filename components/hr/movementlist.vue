<template>
  <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolor modi, iste repellat molestiae quasi,
    necessitatibus quisquam rerum error nisi voluptate aspernatur est facilis soluta ratione tenetur, assumenda eius
    excepturi.
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
      dtfrom: '',
      dtto: '',
    }
  },

  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   arrmovements: (state) => state.hr.movementdetails.arrmovements,
    // }),
    getMovementRowColor() {
      return (ab) => {
        try {
          let rowclass =
            ab.status.toLowerCase() == 'pending' ? 'cssPending' : (ab.status.toLowerCase() == 'reject') ? 'cssReject' : 'cssDefault'

          return rowclass
        } catch {
          return ''
        }
      }
    },
    getFormatDate() {
      return (dt) => {
        if (dt == '' || dt == undefined) return ''
        return Global.getDateFormat1(new Date(dt))
      }
    },
  },
  methods: {
    // ...mapActions({
    //   // getEmployeeByID: 'hr/getEmployeeByID',
    //   viewMovement: 'hr/viewMovement',
    //   deleteMovement: 'hr/deleteMovement',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   reset: 'hr/RESET_MOVEMENT',
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

      await this.viewMovement({
        fromdate: this.dtfrom,
        todate: this.dtto,
        empNo: this.empno,
        user: this.loggeduser,
      })
    },
    async LoadMovement(req) {
      await this.viewMovement({
        fromdate: req.dtfrom,
        todate: req.dtto,
        empNo: this.empno,
        user: this.loggeduser,
      })
    },
    getclose() {
      this.$emit('exit')
    },
    applymovement() {
      this.$emit('movementapply', this.empno)
    },
    async deleteRecord(id) {
      if (confirm('Sure to delete this record?')) {
        let req = { movement_id: id, user: this.loggeduser }
        await this.deleteMovement(req)
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