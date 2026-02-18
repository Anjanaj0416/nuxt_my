<template>
  <article>
    <!-- Hourly Observations -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_text_row :reportparameter="report_details.first_hour" />
        <parameter_text_row :reportparameter="report_details.second_hour" />
      </div>
    </div>

    <!-- Remarks Section -->
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <div class="flex justify-between gap-x-2 w-full">
          <div class="uppercase w-1/5">Remarks</div>
          <div class="mx-2 w-4/5">
            <input
              class="w-full rounded-md p-1 border-2 border-EF-green-200 bg-EF-green-100"
              type="text"
              v-model="report_details.reportcontents.remarks"
            />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  name: 'TwoHourObservation',
  components: { parameter_text_row },
  props: {
    report_details: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * Reset first and second hour values to 0
     */
    getclearValues() {
      if (this.report_details.first_hour) this.report_details.first_hour.value = 0.0
      if (this.report_details.second_hour) this.report_details.second_hour.value = 0.0
      if (this.report_details.reportcontents) this.report_details.reportcontents.remarks = ''
    },
  },
}
</script>

<style scoped>
/* Optional styling tweaks */
</style>
