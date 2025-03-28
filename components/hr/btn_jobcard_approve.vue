<template>
  <section>
    <div
      class="
        p-1
        border-gray-500 rounded p-2
        rounded-md
        text-center
        cursor-pointer
        font-bold
        flex
        text-sm
        gap-x-1
        bg-blue-500 hover:text-white
      "
      :title="name"
      @click="click"
    >
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>
      </div>
      <div>{{ name }}</div>
    </div>
  </section>
</template>

<script>

export default {
  props: ['name'],
  methods: {
    click() {this.$emit('click')},
  },
}
</script>

<style>
</style>
