<template>
  <article>
    <!-- Total White Blood Cell Count -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
      <parameter_text_row :reportparameter="report_details.total_white_blood_cell_count" />
    </div>

    <!-- Remarks Section -->
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm flex justify-between gap-x-2 w-full">
        <div class="uppercase w-1/3">Remarks</div>
        <div class="mx-2 w-2/3">
          <input
            type="text"
            class="w-full rounded-md p-1 border-2 border-EF-blue"
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
  name: 'TotalWBCReport',
  components: { parameter_text_row },
  props: {
    report_details: { type: Object, required: true },
  },
}
</script>

<style scoped>
/* Optional: Add component-specific styling here */
</style>
