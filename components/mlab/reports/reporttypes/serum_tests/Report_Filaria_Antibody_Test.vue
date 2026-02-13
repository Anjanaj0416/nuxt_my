<template>
  <article>
    <!-- Fat Report -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_select_row 
          :reportparameter="report_details.fat" 
          :arrvalues="initData.arrFAT" 
        />
      </div>
    </div>

    <!-- Remarks Section -->
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm flex justify-between gap-x-2 w-full">
        <div class="uppercase w-1/5">Remarks</div>
        <div class="mx-2 w-4/5">
          <input
            type="text"
            class="w-full rounded-md p-1 border-2 border-EF-green-200 bg-EF-green-100"
            v-model="report_details.reportcontents.remarks"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import parameter_select_row from '~/components/reports/parameter_select_row'

export default {
  name: 'FatReport',
  components: { parameter_select_row },
  props: {
    report_details: { type: Object, required: true },
  },
  computed: {
    ...mapState({
      initData: state => state.test.initData,
    }),
  },
  methods: {
    getclearValues() {
      if (this.report_details.fat) {
        this.report_details.fat.value = 'Negative'
      }
      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    },
  },
}
</script>

<style scoped>
/* Optional component-specific styles */
</style>
