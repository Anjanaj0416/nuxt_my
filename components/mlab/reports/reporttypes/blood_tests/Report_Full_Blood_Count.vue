<template>
  <article>
    <!-- Total WBC -->
    <div class="grid grid-cols-1 gap-x-2">
      <parameter_row :reportparameter="report_details.total_white_blood_cell_count" />

      <!-- Differential Count -->
      <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
        <div class="mt-2 font-bold uppercase">Differential Count</div>
        <parameter_row :reportparameter="report_details.neutrophil" @calculate="calculate_tot100" />
        <parameter_row :reportparameter="report_details.lymphocytes" @calculate="calculate_tot100" />
        <parameter_row :reportparameter="report_details.eosinophils" @calculate="calculate_tot100" />
        <parameter_row :reportparameter="report_details.monocytes" @calculate="calculate_tot100" />
        <parameter_row :reportparameter="report_details.basophils" @calculate="calculate_tot100" />
      </div>

      <!-- RBC and Indices -->
      <div class="bg-EF-green-300 p-4 my-1 rounded-lg">
        <parameter_row :reportparameter="report_details.red_blood_cell_count" @calculate="calculate_eq" />
        <parameter_row :reportparameter="report_details.hb" @calculate="calculate_eq" />
        <parameter_row :reportparameter="report_details.pcv" @calculate="calculate_eq" />
        <parameter_text_row :reportparameter="report_details.mcv" />
        <parameter_text_row :reportparameter="report_details.mch" />
        <parameter_text_row :reportparameter="report_details.mchc" />
      </div>

      <!-- Platelet Count -->
      <parameter_row :reportparameter="report_details.platelet_count" />
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
import parameter_row from '~/components/reports/parameter_row'
import parameter_text_row from '~/components/reports/parameter_text_row'

export default {
  name: 'CBCForm',
  components: { parameter_row, parameter_text_row },
  props: {
    report_details: { type: Object, required: true },
  },
  methods: {
    // Calculate RBC indices
    calculate_eq() {
      const rbc = this.report_details.red_blood_cell_count?.value || 0
      const hb = this.report_details.hb?.value || 0
      const pcv = this.report_details.pcv?.value || 0

      if (rbc > 0) this.report_details.mcv.value = ((pcv * 10) / rbc).toFixed(2)
      if (rbc > 0) this.report_details.mch.value = ((hb * 10) / rbc).toFixed(2)
      if (pcv > 0) this.report_details.mchc.value = ((hb / pcv) * 100).toFixed(2)
    },

    // Check differential count total
    calculate_tot100() {
      const total =
        (this.report_details.neutrophil?.value || 0) +
        (this.report_details.lymphocytes?.value || 0) +
        (this.report_details.eosinophils?.value || 0) +
        (this.report_details.monocytes?.value || 0) +
        (this.report_details.basophils?.value || 0)

      if (total > 100) {
        this.$store.commit('PUSH_NOTIFICATION', {
          type: 'Failed',
          message: 'Differential count total exceeds 100',
        })
      }
    },

    // Reset all values
    getclearValues() {
      const fields = [
        'neutrophil',
        'lymphocytes',
        'eosinophils',
        'monocytes',
        'basophils',
        'red_blood_cell_count',
        'hb',
        'pcv',
        'mcv',
        'mch',
        'mchc',
        'platelet_count',
      ]

      fields.forEach((field) => {
        if (this.report_details[field]) this.report_details[field].value = 0
      })

      if (this.report_details.reportcontents)
        this.report_details.reportcontents.remarks = ''
    },
  },
}
</script>

<style scoped>
/* Optional styling tweaks */
</style>
