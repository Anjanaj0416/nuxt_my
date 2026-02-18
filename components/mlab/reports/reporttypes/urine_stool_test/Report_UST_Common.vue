<template>
<article>

  <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
    <div class="grid grid-cols-1 gap-x-2">
      <div v-for="reportparameter in report_details.alreportparameter" :key="reportparameter.id">
        <parameter_text_row :reportparameter="reportparameter" :isCommon="true" />
      </div>
    </div>
  </div>

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
import { mapActions, mapMutations } from 'vuex'
import parameter_row from '~/components/reports/parameter_row'
import parameter_select_row from '~/components/reports/parameter_select_row'
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  components: { parameter_row, parameter_select_row, parameter_text_row },
  props: ['report_details'],

  methods: {
    ...mapActions({}),
    ...mapMutations({}),

    // Clear all text row values and remarks
    getclearValues() {
      if (Array.isArray(this.report_details.alreportparameter)) {
        this.report_details.alreportparameter.forEach(param => {
          param.value = ''  // reset text field
        })
      }

      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    }
  }
}
</script>

<style scoped>
</style>
