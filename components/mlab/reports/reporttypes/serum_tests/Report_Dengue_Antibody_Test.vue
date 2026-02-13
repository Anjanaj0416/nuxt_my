<template>
  <article>
    <!-- Dengue IgM / IgG -->
    <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
      <div class="grid grid-cols-1 gap-x-2">
        <parameter_select_row
          :reportparameter="report_details.lgM"
          :arrvalues="initData.arrDengu"
        />
        <parameter_select_row
          :reportparameter="report_details.lgG"
          :arrvalues="initData.arrDengu"
        />
      </div>
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
import { mapState, mapActions, mapMutations } from 'vuex'
import parameter_select_row from '~/components/reports/parameter_select_row'

export default {
  name: 'DengueReport',
  components: { parameter_select_row },
  props: {
    report_details: { type: Object, required: true },
  },
  computed: {
    ...mapState({
      initData: (state) => state.test.initData,
    }),
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),

    getclearValues() {
      if (this.report_details.lgM) this.report_details.lgM.value = 0.0
      if (this.report_details.lgG) this.report_details.lgG.value = 0.0
      if (this.report_details.reportcontents)
        this.report_details.reportcontents.remarks = ''
    },
  },
}
</script>

<style scoped>
/* Optional: Add component-specific styles here */
</style>
