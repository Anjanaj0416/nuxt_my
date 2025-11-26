<template>
  <section>
    <div class=" mb-1 w-full p-0 lg:p-1    rounded text-sm">
      <div class="csshritem w-3/4  border-2 border-white p-1 rounded">
        <div class="w-64  text-gray-600">{{ item }}</div>
        <div v-if="item = 'Feature Granting' && Array.isArray(value)">
          <div v-for="feat in value" :key="feat.id" class="w-full pl-6 font-bold text-gray-600">
            {{ feat.value }}
          </div>
        </div>
        <div v-else class="w-full font-bold text-gray-600">{{ value }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['item', 'value'],
}
</script>

<style scoped>
.csshritem {
  min-height: 50px;
}
</style>