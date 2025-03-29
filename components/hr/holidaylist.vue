<template>
  <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nobis veritatis nihil ipsam voluptas necessitatibus
    non voluptates ullam in nesciunt beatae dignissimos, illo, doloribus facilis numquam consequuntur repudiandae
    tempore ipsa?
  </section>
</template>

<script>
import holidayloader from '~/components/hr/holidayloader'
import btnhr_Save from '~/components/hr/btnhr_button'

// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { holidayloader, btnhr_Save },
  data() {
    return {
      holiday: {
        id: 0,
        date: '',
        description: '',
      },
    }
  },
  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   holidaydetails: (state) => state.hr.holidaydetails,
    // }),
  },
  methods: {
    // ...mapActions({
    //   getAssignedHolidays: 'hr/getAssignedHolidays',
    //   setAssignedHolidays: 'hr/setAssignedHolidays',


    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',

    // }),
    getclose() {
      this.$emit('exitpopup')
    },
    async loadholidays(param) {

      let req = { month: param.month, year: param.year, user: this.loggeduser };
      await this.getAssignedHolidays(req);
    },
    async init() {
      var date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let req = { month: month, year: year, user: this.loggeduser };
      await this.getAssignedHolidays(req);
    },
    async deleteRecord(id) {
      if (confirm('Sure to delete this record?')) {
        let req = { id: id, user: this.loggeduser }
        await this.deleteHoliday(req)
      }
    },
    async getSave() {
      if (!this.validate()) { return }

      let req = {
        holiday: this.holiday,
        user: this.loggeduser
      }


      if (confirm('Sure to add this day as holiday?')) {
        await this.setAssignedHolidays(req);
      }
    },

    getClear() {
      this.holiday.id = 0
      this.holiday.date = ''
      this.holiday.description = ''
    },

    validate() {

      if (this.holiday.date == '') {
        this.show_error('Invalid Date');
        return false;
      }
      if (this.holiday.description == '') {
        this.show_error('Invalid Description');
        return false;
      }
      return true;
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
  },
  mounted() { },
}
</script>

<style scoped>
.cssholidayview {
  min-height: 1500px;
}

.cssholidayview>div {
  min-height: 100vh;
}

.cssrows {
  height: 500px;
  scrollbar-width: thin;
}
</style>