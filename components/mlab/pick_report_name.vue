<template>
  <article class="w-screen min-h-full h-auto absolute top-0 left-0 z-30">
    <div class="w-full flex justify-center flex-wrap">
      <div class="csscard mx-auto rounded mt-16 w-full lg:w-2/3 h-auto p-4">
        <div class="relative bg-EF-blue p-2 rounded-xl">
          <!-- Close Button -->
          <div
            class="hover:text-red-700 cursor-pointer absolute top-0 right-0 p-2"
            title="Close"
            @click="getClose"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Report Selection -->
          <div class="flex-none lg:flex w-full gap-x-2 p-2 mt-4 pb-4">
            <!-- Report Type -->
            <div class="w-full lg:w-1/5">
              <selectinput2
                cssclass="cssPickReportname"
                v-model="orderitem.testtype"
                :cur_item="orderitem.testtype"
                :selections="available_reports.altesttypes"
                :err="err.testtype"
                label="Report Type"
              />
            </div>

            <!-- Report Name -->
            <div class="w-full lg:w-3/5">
              <selectinput2
                cssclass="cssPickReportname"
                v-model="orderitem.testname"
                :cur_item="orderitem.testname"
                :selections="getTests(orderitem.testtype)"
                :err="err.testname"
                label="Report Name"
              />
            </div>

            <!-- Add Button -->
            <div class="w-full lg:w-1/5 pt-5">
              <button_mlab
                text="ADD"
                title="ADD"
                @click="addTest"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2'
import button_mlab from '~/components/mlab/mlab_btn'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'pick_report_name',
  components: { button_mlab, selectinput2 },
  props: ['appt_id'],
  data() {
    return {
      err: {
        testtype: '',
        testname: '',
      },
      orderitem: {
        testtype: '',
        testname: '',
        testid: -1,
        charge: '',
        status: 1,
        id: 0,
        comment: '',
      },
    }
  },
  computed: {
    ...mapState({
      available_reports: (state) => state.test.available_reports,
    }),
    getTests() {
      return (type) => {
        try {
          return this.available_reports.altests
            .filter((t) => t.testtype === type)
            .map(
              (test) => `${test.id}. ${test.testname} | Rs.${test.price}`
            )
        } catch {
          return []
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
    }),

    getClose() {
      this.orderitem.testid = -1
      this.$emit('getexitform')
    },

    addTest() {
      if (!this.orderitem.testname) {
        this.showMessage({ type: 'Failed', message: 'Invalid Test..' })
        return
      }

      // Extract test id from selection string
      this.orderitem.testid = parseInt(
        this.orderitem.testname.split('.')[0]
      )

      // Clone orderitem
      const item = JSON.parse(JSON.stringify(this.orderitem))

      // Fetch actual test details
      const selectedTest = this.available_reports.altests.find(
        (t) => t.id === item.testid
      )
      if (selectedTest) {
        item.testname = selectedTest.testname
        item.charge = selectedTest.price
        this.$emit('setOrder', { appt_id: this.appt_id, orderitem: item })
      }
    },
  },
}
</script>

<style scoped>
</style>
