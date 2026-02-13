<template>
  <article>
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <!-- Parameter Name and Scale -->
        <div class="flex justify-between gap-x-2 w-full text-xs items-center">
          <div class="uppercase">{{ reportparameter.parameterName }}</div>
          <div class="flex gap-x-2 items-center">
            <div class="uppercase">{{ reportparameter.scale }}</div>
            <selectinput2
              class="w-20 rounded-md text-right px-1 border-2 bg-EF-green-100 border-EF-green-200"
              v-model="reportparameter.value"
              :cur_item="reportparameter.value"
              :selections="arrvalues"
              :err="err.value"
              label=""
            />
          </div>
        </div>

        <!-- Range Description -->
        <div class="mt-1 text-xs text-gray-700">{{ reportparameter.rangeDescription }}</div>
      </div>
    </div>
  </article>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2_report'

export default {
  name: 'ParameterSelectRow',
  components: { selectinput2 },
  props: {
    reportparameter: {
      type: Object,
      required: true
    },
    arrvalues: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      err: {
        value: ''
      }
    }
  },
  methods: {
    // Optionally, you can add validation or emit events here
  }
}
</script>

<style scoped>
/* Optional focus styling */
select:focus {
  outline: none;
  border-color: #22c55e; /* Tailwind green-500 */
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}
</style>
