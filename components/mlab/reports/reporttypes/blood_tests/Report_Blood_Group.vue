<template>
  <article>
    <!-- Select Parameters -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_select_row
          v-for="(param, index) in selectParameters"
          :key="index"
          :reportparameter="param"
          :arrvalues="initData[param.arrKey]"
        />
      </div>
    </div>

    <!-- Remarks -->
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
import parameter_select_row from '~/components/reports/parameter_select_row'

export default {
  name: 'Report_BloodGroup',
  components: { parameter_select_row },
  props: ['report_details'],
  computed: {
    selectParameters() {
      // Dynamic mapping of parameters to their initData arrays
      return [
        { field: 'blood_group', arrKey: 'arrBlood_Group', value: this.report_details.blood_group },
        { field: 'rhesus', arrKey: 'arrRH', value: this.report_details.rhesus },
      ]
    },
    initData() {
      return this.$store.state.test.initData
    },
  },
  methods: {
    getclearValues() {
      this.selectParameters.forEach(param => {
        this.report_details[param.field].value = 0.0
      })
    },
  },
}
</script>

<style scoped></style>
