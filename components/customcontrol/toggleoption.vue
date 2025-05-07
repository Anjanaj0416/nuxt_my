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
      <div
        class="block bg-gray-300 w-14 h-8 rounded-full"
        :class="{ 'bg-blue-500': modelValue }"
      ></div>
      <div
        class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
        :class="{ 'translate-x-6': modelValue }"
      ></div>
    </div>
    <div class="ml-3 text-gray-700 font-medium">
      {{ modelValue ? 'On' : 'Off' }}
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
