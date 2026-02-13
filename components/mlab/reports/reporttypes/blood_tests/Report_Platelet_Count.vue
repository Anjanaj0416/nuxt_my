<template>
  <article>
    <!-- Platelet Count & PCV Section -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_text_row :reportparameter="report_details.platelet_count" />
        <parameter_text_row :reportparameter="report_details.pcv" />
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
  name: 'PlateletPCVReport',
  components: { parameter_text_row },
  props: {
    report_details: { type: Object, required: true },
  },
  methods: {
    getclearValues() {
      this.report_details.platelet_count.value = 0.0
      this.report_details.pcv.value = 0.0
    },
  },
}
</script>

<style scoped>
/* Optional: add component-specific styles here */
</style>
