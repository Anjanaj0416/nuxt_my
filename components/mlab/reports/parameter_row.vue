<template>
  <article>
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <!-- Parameter Name and Scale -->
        <div class="flex justify-between gap-x-2 w-full text-xs items-center">
          <div class="uppercase">{{ reportparameter.parameterName }}</div>
          <div class="flex gap-x-2 items-center">
            <div class="uppercase">{{ reportparameter.scale }}</div>
            <input
              class="w-20 rounded-md text-right px-1 border-2 bg-EF-green-100 border-EF-green-200"
              type="text"
              v-model="reportparameter.value"
              @input="onValueChange($event.target.value)"
              placeholder="0"
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
export default {
  name: 'ParameterRow',
  props: {
    reportparameter: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onValueChange(val) {
      try {
        // Only allow numbers and decimal points
        let cleaned = val.replace(/[^0-9.]/g, '');

        // Prevent multiple decimals
        const parts = cleaned.split('.');
        if (parts.length > 2) {
          cleaned = parts[0] + '.' + parts[1];
        }

        // Update the model
        this.reportparameter.value = cleaned;

        // Emit calculated number if valid
        const numVal = parseFloat(cleaned);
        if (!isNaN(numVal)) {
          this.$emit('calculate', numVal);
        }
      } catch (err) {
        // fail silently
      }
    },
  },
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #22c55e; /* Tailwind green-500 */
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}
</style>
