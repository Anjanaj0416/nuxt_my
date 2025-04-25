<template>
  <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem minima consectetur earum omnis magni ducimus
    at quia distinctio ipsam? Cupiditate veritatis porro saepe sapiente, quam ipsa! Alias non temporibus consectetur.
  </section>
</template>


<script>
import datediff from '~/components/customcontrol/datediff'
import btnhr from '~/components/hr/btnhr'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['empno'],
  components: {
    datediff,
    btnhr,
  },
  data() {
    return {
      dtfrom: '',
      dtto: '',
      oTPreApprovalRequest: {
        empno: '',
        date: '',
        inTime: '00:00',
        outTime: '00:00',
        OTFrom: '',
        OTTo: '',
        otHour: '',
        Reason: '',
      },
      Tot_OT_Hours: '0.00',
    }
  },

  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   OTApllyDetails: (state) => state.hr.OTApllyDetails,
    // }),
    getOTApplyRowColor() {
      return (ot) => {
        try {
          let rowclass =
            ot.approvalStatus.toLowerCase() == 'pending'
              ? 'cssPending'
              : ot.approvalStatus.toLowerCase() == 'reject'
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
    //   getOTApprovals: 'hr/getOTApprovals',
    //   setDeleteOTApproval: 'hr/setDeleteOTApproval',
    //   setOTApproval: 'hr/setOTApproval',
    //   getOTHours: 'hr/getOTHours',
    // }),

    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   //reset: 'hr/RESET_MOVEMENT',
    // }),

    async calcOTHours() {
      if (
        this.oTPreApprovalRequest.OTFrom != '' &&
        this.oTPreApprovalRequest.OTTo != ''
      ) {
        await this.getOTHours({
          empno: this.empno,
          OTFrom: this.oTPreApprovalRequest.OTFrom,
          OTTo: this.oTPreApprovalRequest.OTTo,
          user: this.loggeduser,
        })
        this.oTPreApprovalRequest.otHour = this.OTApllyDetails.ot_hours
      }
    },

    async LoadOTApplied(datediff) {
      await this.getOTApprovals({
        empno: this.empno,
        dt_from: datediff.dtfrom,
        dt_to: datediff.dtto,
        user: this.loggeduser,
      })
      this.getTot_OT_Hours()
    },

    async init() {
      //this.reset()
      var date = new Date()
      this.dtfrom = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.dtto = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0)
      )

      await this.getOTApprovals({
        empno: this.empno,
        dt_from: this.dtfrom,
        dt_to: this.dtto,
        user: this.loggeduser,
      })
      this.getTot_OT_Hours()
    },

    validate() {
      if (this.oTPreApprovalRequest.date == '') {
        this.show_error('Invalid Date')
        return false
      }

      if (this.oTPreApprovalRequest.OTFrom == '') {
        this.show_error('Invalid OT From Time')
        return false
      }

      if (this.oTPreApprovalRequest.OTTo == '') {
        this.show_error('Invalid OT To Time')
        return false
      }

      if (this.oTPreApprovalRequest.Reason == '') {
        this.show_error('Invalid Nature Of Work')
        return false
      }

      return true
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },

    async setApplyOT() {
      this.oTPreApprovalRequest.empno = this.empno
      if (this.validate()) {
        if (confirm('Sure to apply this OT Pre-Approval?')) {
          let req = {
            oTPreApprovalRequest: this.oTPreApprovalRequest,
            user: this.loggeduser,
          }
          await this.setOTApproval(req)
        }
        this.oTPreApprovalRequest.OTFrom = ''
        this.oTPreApprovalRequest.OTTo = ''
      }
    },

    async deleteRecord(ot_id) {
      if (confirm('Sure to delete this OT Pre-Approval?')) {
        await this.setDeleteOTApproval({ id: ot_id, user: this.loggeduser })
      }
    },

    getclose() {
      this.$emit('exit')
    },

    getTot_OT_Hours() {
      try {
        let Ots = this.OTApllyDetails.arrOTApply.filter(
          (ot) => ot.approvalStatus == 'Approved'
        )

        let tot = 0.0;
        Ots.forEach(function (detot) {

          tot += detot.otHours;
        });
        this.Tot_OT_Hours = tot
      } catch {
        this.Tot_OT_Hours = 0.00
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

.cssOTApplyForm {
  @apply font-bold;
}

.cssOTApplyForm input {
  @apply rounded-md p-1;
}
</style>