<template>
  <section>
    <div
      class="flex items-center justify-center p-1 font-bold border w-auto border-white rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white md:border-0"
      @click="click"
    >
      <div class="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      </div>
      <div class="text-center">{{ name }}</div>
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
