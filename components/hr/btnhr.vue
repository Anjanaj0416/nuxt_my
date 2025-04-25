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
      "
      :title="name"
      @click="click"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
          />
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
