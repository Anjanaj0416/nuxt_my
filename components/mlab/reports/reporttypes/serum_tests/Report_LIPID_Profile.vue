<template>
  <article>
    <!-- Lipid Parameters -->
    <div class="grid grid-cols-1 gap-x-2">
      <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
        <parameter_row :reportparameter="report_details.total_cholesterol" @calculate="calculate_lipid" />
        <parameter_row :reportparameter="report_details.triglyserides" @calculate="calculate_lipid"/>
        <parameter_row :reportparameter="report_details.hdl" @calculate="calculate_lipid" />
        <parameter_text_row :reportparameter="report_details.ldl" />
        <parameter_text_row :reportparameter="report_details.vldl" />
        <parameter_text_row :reportparameter="report_details.cholesterol_hdl" />
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
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  props: {
    report_details: { type: Object, required: true }
  },
  components: { parameter_row, parameter_text_row },
  methods: {
    // Lipid calculations
    calculate_lipid() {
      const tc = parseFloat(this.report_details.total_cholesterol.value) || 0
      const tg = parseFloat(this.report_details.triglyserides.value) || 0
      const hdl = parseFloat(this.report_details.hdl.value) || 0

      if (tg > 0) {
        this.report_details.vldl.value = (tg / 5).toFixed(1)
      } else {
        this.report_details.vldl.value = 0
      }

      if (tc > 0 && hdl > 0) {
        const vldlVal = parseFloat(this.report_details.vldl.value) || 0
        this.report_details.cholesterol_hdl.value = (tc / hdl).toFixed(1)
        this.report_details.ldl.value = (tc - hdl - vldlVal).toFixed(1)
      } else {
        this.report_details.cholesterol_hdl.value = 0
        this.report_details.ldl.value = 0
      }
    },

    // Clear all values
    getclearValues() {
      const fields = ['total_cholesterol','triglyserides','hdl','ldl','vldl','cholesterol_hdl']
      fields.forEach(f => this.report_details[f].value = 0.0)
      if (this.report_details.reportcontents) this.report_details.reportcontents.remarks = ''
    }
  }
}
</script>

<style scoped>
/* Optional scoped styles */
</style>
