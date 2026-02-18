<template>
  <div :class="cssStatus">
    <p class="text-xs font-bold">{{ label }}</p>
    <p class="truncate" :title="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    text: { type: String, required: true },
    cssStatus: { type: String, default: 'cssPending' },
  },
}
</script>

<style scoped>
.cssPending {
  @apply text-EF-blue;
}

.cssCompleted {
  @apply text-white;
}
</style>
