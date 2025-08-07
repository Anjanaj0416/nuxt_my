<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <!-- <span class="inline-block text-sm font-semibold text-gray-800">
      {{ selectedItem?.value || 'N/A' }}
    </span> -->
    <span 
    class="inline-block text-sm" 
    :class="selectedItem && selectedItem.value ? 'font-semibold text-gray-800' : 'italic text-gray-500'"
    >
    {{ selectedItem && selectedItem.value ? selectedItem.value : 'NO data' }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    arrItems: Array,
    label: String,
    id: [String, Number]  // Pass the ID you want to display
  },
  computed: {
    selectedItem() {
      return this.arrItems.find(item => item.id == this.id);
    }
  }
};
</script>
