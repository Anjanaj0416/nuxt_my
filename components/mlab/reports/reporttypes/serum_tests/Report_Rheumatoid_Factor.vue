<template>
  <article>
    <!-- Rheumatoid & Titer -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_select_row 
          :reportparameter="report_details.rheumatoid" 
          :arrvalues="initData.arrRH_Factor" 
        />  
        <parameter_select_row 
          :reportparameter="report_details.titer" 
          :arrvalues="initData.arrTiter" 
        />  
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
  computed: {
    ...mapState({
      initData: (state) => state.test.initData,
    }),
  },
  methods: {
    getclearValues() {
      // Clear values safely
      if (this.report_details.rheumatoid) {
        this.report_details.rheumatoid.value = 0.0
      }
      if (this.report_details.titer) {
        this.report_details.titer.value = 0.0
      }

      // Optionally clear remarks
      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    },
  },
}
</script>

<style scoped>
/* Scoped styles for this component */
</style>
