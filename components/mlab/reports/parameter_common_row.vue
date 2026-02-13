<template>
  <article>
    <div class="my-1 py-2 bg-gray-300 p-2 rounded-lg">
      <div class="text-sm">
        <!-- Row with parameterName, scale, and value -->
        <div class="flex justify-between gap-x-2 w-full text-xs items-center">
          <!-- Parameter Name -->
          <div class="w-full">
            <input
              class="w-full rounded-md px-1 border-2 bg-EF-green-100 border-EF-green-200"
              type="text"
              v-model="reportparameter.parameterName"
              placeholder="Parameter Name"
            />
          </div>

          <!-- Scale and Value Inputs -->
          <div class="flex gap-x-2">
            <input
              class="w-20 rounded-md text-center px-1 border-2 bg-EF-green-100 border-EF-green-200"
              type="text"
              v-model="reportparameter.scale"
              placeholder="Scale"
            />
            <input
              class="w-20 rounded-md text-right px-1 border-2 bg-EF-green-100 border-EF-green-200"
              type="text"
              v-model="reportparameter.value"
              placeholder="Value"
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
  name: 'ParameterCommonRow',
  props: {
    reportparameter: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
/* Optional: Focus styling */
input:focus {
  outline: none;
  border-color: #22c55e; /* Tailwind green-500 */
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}
</style>
