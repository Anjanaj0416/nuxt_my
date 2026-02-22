<template>
  <section>
    <div class="mb-2 w-full p-0 lg:p-1 text-sm">
      <div class="csshritem ">
        <label class="block text-xs font-semibold tracking-wide text-gray-500 uppercase mb-1">
          {{ item }}
        </label>
        <div v-if="item === 'Feature Granting' && Array.isArray(value)" class="space-y-1">
          <p
            v-for="feat in value"
            :key="feat.id"
            class="font-semibold text-gray-700 pl-3 border-l-4 border-blue-500"
          >
            {{ feat.value }}
          </p>
        </div>
        <p v-else class="font-semibold text-gray-700">
          {{ value || '-' }}
        </p>
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
  min-height: 60px;
}
</style>


<!-- <template>
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
</style> -->