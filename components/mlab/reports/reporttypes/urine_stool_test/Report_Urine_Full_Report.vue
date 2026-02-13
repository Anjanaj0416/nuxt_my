<template>
<article>

  <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
    <div class="grid grid-cols-1 gap-x-2">
      <parameter_select_row :reportparameter="report_details.colour" :arrvalues="initData.arr_color" />
      <parameter_select_row :reportparameter="report_details.appearence" :arrvalues="initData.arr_appearence" />
      <parameter_select_row :reportparameter="report_details.specific_gravity" :arrvalues="initData.arr_specific_gravity"/>
      <parameter_select_row :reportparameter="report_details.reaction"  :arrvalues="initData.arr_reaction"/>
      <parameter_select_row :reportparameter="report_details.protein_albumine" :arrvalues="initData.arr_protein_albumine" />
      <parameter_select_row :reportparameter="report_details.nitrate" :arrvalues="initData.arr_nitrate" />
      <parameter_select_row :reportparameter="report_details.glucose"  :arrvalues="initData.arr_glucose"/>
      <parameter_select_row :reportparameter="report_details.ketones" :arrvalues="initData.arr_ketones" />
      <parameter_select_row :reportparameter="report_details.bilirubin" :arrvalues="initData.arr_bilirubin" />
      <parameter_text_row :reportparameter="report_details.urobilinogen" />
    </div> 
  </div>

  <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
    <div class="font-bold">Centrifuge Deposites</div>
    <div class="grid grid-cols-1 gap-x-2">
      <parameter_text_row :reportparameter="report_details.puscells" />        
      <parameter_text_row :reportparameter="report_details.redcells" />
      <parameter_text_row :reportparameter="report_details.epithelialcells" />
      <parameter_select_row :reportparameter="report_details.casts" :arrvalues="initData.arr_casts" />
      <parameter_select_row :reportparameter="report_details.crystals" :arrvalues="initData.arr_crystals"/>
      <parameter_select_row :reportparameter="report_details.organisms" :arrvalues="initData.arr_organisms" />
      <parameter_select_row :reportparameter="report_details.others" :arrvalues="initData.arr_others" />
      <parameter_select_row :reportparameter="report_details.yeast_cells"  :arrvalues="initData.arr_yeast_cells"/>        
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
    getclearValues() {
      // List all parameters dynamically
      const fields = [
        'colour','appearence','specific_gravity','ph','reaction','protein_albumine','nitrate','glucose','ketones','bilirubin','urobilinogen',
        'puscells','redcells','epithelialcells','casts','crystals','organisms','others','yeast_cells'
      ];

      fields.forEach(field => {
        const param = this.report_details[field];
        if (!param) return;

        // If it's a select array, reset to first option if available
        const arrName = 'arr_' + field;
        if (this.initData[arrName] && this.initData[arrName].length > 0) {
          param.value = this.initData[arrName][0];
        } else {
          // Fallback for text/number inputs
          param.value = 0.0;
        }
      });

      // Clear remarks
      if (this.report_details.reportcontents) {
        this.report_details.reportcontents.remarks = '';
      }
    },
  },
}
</script>

<style scoped>
</style>
