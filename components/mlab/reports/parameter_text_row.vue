<template>
  <article>
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <div class="flex justify-between gap-x-2 w-full text-xs items-center">
          <!-- Parameter Name -->
          <div v-if="!isCommon" class="uppercase">{{ parameter.parameterName }}</div>
          <input
            v-else
            type="text"
            class="w-64 rounded-md px-1 border-2 bg-EF-green-100 border-EF-green-200"
            v-model="parameter.parameterName"
            placeholder="Parameter Name"
          />

          <!-- Scale -->
          <div class="flex gap-x-2 items-center">
            <div v-if="!isCommon" class="uppercase">{{ parameter.scale }}</div>
            <input
              v-if="isCommon"
              type="text"
              class="w-16 rounded-md px-1 border-2 bg-EF-green-100 border-EF-green-200"
              v-model="parameter.scale"
              placeholder="Scale"
            />

            <!-- Value -->
            <component
              :is="inputType"
              v-model="parameter.value"
              :selections="arrValues"
              @input="onInput"
              class="w-20 rounded-md px-1 border-2 bg-EF-green-100 border-EF-green-200 text-right"
              placeholder="Value"
            />
          </div>
        </div>

        <!-- Range Description -->
        <div class="mt-1 text-xs text-gray-700">{{ parameter.rangeDescription }}</div>
      </div>
    </div>
  </article>
</template>

<script>
import selectinput2 from '~/components/customcontrol/selectinput2_report'

export default {
  name: 'ParameterRow',
  components: { selectinput2 },
  props: {
    parameter: { type: Object, required: true },
    isCommon: { type: Boolean, default: false },
    type: { type: String, default: 'text' }, // 'text', 'number', 'select'
    arrValues: { type: Array, default: () => [] },
  },
  computed: {
    inputType() {
      if (this.type === 'select') return 'selectinput2'
      return 'input'
    },
  },
  methods: {
    onInput(event) {
      // Only allow numbers if type is number
      if (this.type === 'number') {
        let val = event.target.value
        val = val.replace(/[^0-9.]/g, '')
        if (val.includes('.')) {
          const parts = val.split('.')
          val = parts[0] + '.' + parts[1].slice(0, 2) // optional: limit decimal places
        }
        this.parameter.value = val
      }
      this.$emit('update', this.parameter.value)
    },
  },
}
</script>

<style scoped>
input:focus,
select:focus {
  outline: none;
  border-color: #22c55e; /* Tailwind green-500 */
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}
</style>
