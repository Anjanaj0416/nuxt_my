<template>
  <article>
    <!-- Blood Glucose Parameters -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_text_row :reportparameter="report_details.fasting_blood_glucose" />
        <parameter_text_row :reportparameter="report_details.after_breakfast" />
        <parameter_text_row :reportparameter="report_details.before_lunch" />
        <parameter_text_row :reportparameter="report_details.after_lunch" />
        <parameter_text_row :reportparameter="report_details.before_dinner" />
        <parameter_text_row :reportparameter="report_details.after_dinner" />
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
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  name: 'BloodGlucoseReport',
  components: { parameter_text_row },
  props: {
    report_details: { type: Object, required: true },
  },
  methods: {
    getclearValues() {
      const params = [
        'fasting_blood_glucose',
        'after_breakfast',
        'before_lunch',
        'after_lunch',
        'before_dinner',
        'after_dinner',
      ]
      params.forEach((key) => {
        if (this.report_details[key]) this.report_details[key].value = 0.0
      })

      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    },
  },
}
</script>

<style scoped>
/* Optional component-specific styling */
</style>
