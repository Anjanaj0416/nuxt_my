<template>
  <section>
    <div class=" mb-1 w-full p-0 lg:p-1    rounded text-sm">
      <div class="csshritem w-3/4  border-2 border-white p-1 rounded">
        <div class="w-64  text-blue-300">{{ item }}</div>
        <div class="w-full font-bold text-blue-300">{{ value }}</div>
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