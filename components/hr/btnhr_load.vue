<template>
  <section>
    <div
      class="flex items-center justify-center p-1 font-bold text-center border text-black border-white rounded cursor-pointer gap-x-2 hover:bg-blue-500 hover:text-white"
      @click="clickLoad">
      <div class="flex-shrink-0"> <!-- Prevents icon from shrinking -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
    clickLoad() {
     
       this.$emit('click_Load')
       },
  },
}
</script>

<style></style>
