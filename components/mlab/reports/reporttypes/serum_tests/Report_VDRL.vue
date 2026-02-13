<template>
<article>

  <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
    <div class="grid grid-cols-1 gap-x-2">        
      <parameter_select_row 
        :reportparameter="report_details.vdrl" 
        :arrvalues="initData.arrVDRL" 
      />
    </div>
  </div> 

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
import { mapState } from 'vuex'
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
    getclearValues(){
      // Set to first value in your VDRL options if available, else default to 'Negative'
      if (this.initData.arrVDRL && this.initData.arrVDRL.length > 0) {
        this.report_details.vdrl.value = this.initData.arrVDRL[0]
      } else {
        this.report_details.vdrl.value = 'Negative'
      }

      // Clear remarks too
      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = ''
      }
    },
  },
}
</script>

<style scoped>
</style>
