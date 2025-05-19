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
        gap-x-1
        hover:bg-blue-500 hover:text-white
        relative
      "
      @click="click"
    >
      <div>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
      </div>
      <div>{{ name }} </div>
      <div class="rounded-full bg-blue-600 py-1 px-2 text-center font-bold absolute right-0 top-0 text-white -m-4"> {{wgjobcount}} </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['name','wgjobcount'],
  methods: {
    click() {this.$emit('click')},
  },
}
</script>

<style>
</style>
