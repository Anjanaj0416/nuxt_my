<template>
  <section>
    <div class="
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
        "@click="click">

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
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
    click() { this.$emit('click') },
  },
}
</script>

<style></style>
