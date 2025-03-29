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
        hover:bg-blue-500 hover:text-white
      "
      @click="click"
    >
     {{ name }}
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
