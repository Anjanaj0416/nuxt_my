<template>
  <article>
    <!-- Dynamic Parameters -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <div v-for="(reportparameter, index) in report_details.alreportparameter" :key="index">
          <parameter_text_row :reportparameter="reportparameter" :isCommon="true" />
        </div>
      </div>
    </div>

    <!-- Remarks -->
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
import parameter_row from '~/components/reports/parameter_row'
import parameter_select_row from '~/components/reports/parameter_select_row'
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  components: { parameter_row, parameter_select_row, parameter_text_row },
  props: ['report_details'],
  methods: {
    // Clears all parameter values and remarks dynamically
    getclearValues() {
      if (this.report_details.alreportparameter) {
        this.report_details.alreportparameter.forEach(param => {
          if (param && 'value' in param) {
            param.value = param.valueType === 'number' ? 0.0 : ''  // reset numbers to 0, others to empty string
          }
        })
      }

      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    },
  },
}
</script>

<style scoped>
/* Optional scoped styles for this component */
</style>
