<template>
  <section>
    <div
      class="
        flex items-center gap-1
        px-2 py-1
        text-xs
        font-semibold
        text-gray-700
        bg-white
        border border-gray-300
        rounded-md
        shadow-sm
        cursor-pointer
        select-none
        transition
        duration-200
        hover:bg-blue-800
        hover:text-white
        hover:shadow
      "
      :title="name"
      @click="click"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
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
      <!-- Label -->
      <div>{{ name }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    click() {
      this.$emit('click');
    },
  },
}
</script>
