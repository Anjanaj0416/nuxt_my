<template>
<article>
  <!-- Blood Sugar Parameters -->
  <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
    <div class="grid grid-cols-1 gap-x-2">
      <parameter_text_row :reportparameter="report_details.blood_sugar_fasting_blood_glucose" />
      <parameter_text_row :reportparameter="report_details.blood_sugar_1_2_hour_glucose" />
      <parameter_text_row :reportparameter="report_details.blood_sugar_1_hour_glucose" />
      <parameter_text_row :reportparameter="report_details.blood_sugar_1_1_2_hours_glucose" />
      <parameter_text_row :reportparameter="report_details.blood_sugar_2_hours_glucose" />
      <!-- Uncomment if you want to include urine sugar inputs -->
      <!--
      <parameter_text_row :reportparameter="report_details.urine_sugar_Fasting_blood_glucose" />
      <parameter_text_row :reportparameter="report_details.urine_sugar_1_2_hour_glucose" />
      <parameter_text_row :reportparameter="report_details.urine_sugar_1_hour_glucose" />
      <parameter_text_row :reportparameter="report_details.urine_sugar_1_1_2_hours_glucose" />
      <parameter_text_row :reportparameter="report_details.urine_sugar_2_hours_glucose" />
      -->
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
  props: ['report_details'],
  components: { parameter_row, parameter_text_row },
  methods: {
    getclearValues() {
      // List of all blood sugar related fields
      const fields = [
        'blood_sugar_fasting_blood_glucose',
        'blood_sugar_1_2_hour_glucose',
        'blood_sugar_1_hour_glucose',
        'blood_sugar_1_1_2_hours_glucose',
        'blood_sugar_2_hours_glucose',
        'urine_sugar_Fasting_blood_glucose',
        'urine_sugar_1_2_hour_glucose',
        'urine_sugar_1_hour_glucose',
        'urine_sugar_1_1_2_hours_glucose',
        'urine_sugar_2_hours_glucose'
      ]

      // Reset values safely
      fields.forEach(field => {
        if (this.report_details[field]) {
          this.report_details[field].value = 0.0
        }
      })

      // Clear remarks if exists
      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    }
  }
}
</script>

<style scoped>
/* optional scoped styling */
</style>
