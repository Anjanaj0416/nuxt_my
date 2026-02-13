<template>
  <article>
    <!-- HB and PCV/HCT -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_text_row :reportparameter="report_details.hb" />
        <parameter_text_row :reportparameter="report_details.pcv_hct" />
      </div>
    </div>

    <!-- Remarks Section -->
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm flex justify-between gap-x-2 w-full">
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
  </article>
</template>

<script>
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  name: 'HbPcvForm',
  components: { parameter_text_row },
  props: {
    report_details: { type: Object, required: true },
  },
  methods: {
    // Reset HB and PCV/HCT values
    getclearValues() {
      if (this.report_details.hb) this.report_details.hb.value = 0.0
      if (this.report_details.pcv_hct) this.report_details.pcv_hct.value = 0.0
      if (this.report_details.reportcontents) this.report_details.reportcontents.remarks = ''
    },
  },
}
</script>

<style scoped>
/* Optional styling */
</style>
