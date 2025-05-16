<!-- components/ToggleSwitch.vue -->
<!-- Usage 
<toggleoption v-model="curVendor.isActive" />   -->


<template>
  <label class="flex items-center cursor-pointer">
    <div class="relative">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="onToggle"
        class="sr-only"
      />
      <!-- Background -->
      <div
        class="block w-10 h-5 transition-colors duration-300 rounded-full"
        :class="modelValue ? 'bg-blue-900' : 'bg-gray-300'"
      ></div>
      <!-- Toggle Dot -->
      <div
        class="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300"
        :class="{ 'translate-x-5': modelValue }"
      ></div>
    </div>
    <div class="ml-2 text-sm font-medium text-gray-600">
      {{ modelValue ? 'Active' : 'Inactive' }}
    </div>
  </label>

</template>

<script setup>
const props = defineProps({
  modelValue: {   
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const onToggle = (event) => {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped>
.dot {
  transition: transform 0.3s ease-in-out;
}
.translate-x-6 {
  transform: translateX(1.5rem);
}
</style>
