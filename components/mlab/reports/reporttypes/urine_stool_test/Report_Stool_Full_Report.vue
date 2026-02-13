<template>
<article >

	<div class="bg-EF-green-300 p-4  my-1 rounded-lg">
 <div class="grid grid-cols-1  gap-x-2">
        <parameter_text_row :reportparameter="report_details.consistency" />
        <parameter_text_row :reportparameter="report_details.colour" />
        <parameter_text_row :reportparameter="report_details.reaction" />
 </div></div>
        <div class="bg-EF-green-300 p-4  my-1 rounded-lg">
 <div class="grid grid-cols-1  gap-x-2">
   <div class="font-bold">  Microscopic Appearence</div>
        <parameter_text_row :reportparameter="report_details.rbc" />
        <parameter_text_row :reportparameter="report_details.pus_cells" />
        <parameter_text_row :reportparameter="report_details.epithelial_cells" />
        <parameter_text_row :reportparameter="report_details.amoeba" />
        <parameter_text_row :reportparameter="report_details.round_worm" />
        <parameter_text_row :reportparameter="report_details.hook_worm" />
        <parameter_text_row :reportparameter="report_details.whip_worm" />
        <parameter_text_row :reportparameter="report_details.pin_worm" />
        <parameter_text_row :reportparameter="report_details.tape_worm" />
        <parameter_text_row :reportparameter="report_details.cysts" />
        <parameter_text_row :reportparameter="report_details.others" />        
                
  </div> 
  </div>

   	    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <div class="flex justify-between gap-x-2 w-full">
          <div class="uppercase w-1/5">Remarks</div>
          <div class="mx-2  w-4/5">
            
              <input
                class="w-full rounded-md p-1  border-2  border-EF-green-200 bg-EF-green-100"
                type="text"
                v-model="report_details.reportcontents.remarks"                 
              />
                      
          </div>
        </div>
        <div></div>
      </div>
    </div>
   <!-- <parameter_select_row :reportparameter="report_details.yeast_cells"  :arrvalues="initData.arr_yeast_cells"/>  
           <parameter_text_row :reportparameter="report_details.epithelialcells" />
           <parameter_common_row :reportparameter="reportparameter" />
 -->
  </article>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import parameter_row from '~/components/reports/parameter_row'
import parameter_select_row from '~/components/reports/parameter_select_row'
import parameter_text_row from '~/components/reports/parameter_text_row'


export default {
  components: {  parameter_row,parameter_select_row,parameter_text_row },
   props: ['report_details'],
  data() {
    return {
      
   
    }
  },

  methods: {
    ...mapActions({}),
    ...mapMutations({}),
  getclearValues(){
      this.report_details.consistency.value =0.0;
      this.report_details.colour.value =0.0;
      this.report_details.reaction.value =0.0;
      this.report_details.rbc.value =0.0;
      this.report_details.pus_cells.value =0.0;
      this.report_details.epithelial_cells.value =0.0;
       this.report_details.amoeba.value =0.0;
      this.report_details.round_worm.value =0.0;
      this.report_details.hook_worm.value =0.0;
      this.report_details.whip_worm.value =0.0;
      this.report_details.pin_worm.value =0.0;
      this.report_details.tape_worm.value =0.0;
      this.report_details.cysts.value =0.0;
      this.report_details.others.value =0.0;
    },
  },
}
</script>

<style>

</style>