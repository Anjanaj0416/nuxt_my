<template>
  <section>
    <button
        @click="clickLoad"
        class="h-8 px-4 rounded-md
                 bg-blue-600 text-white text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow "
          
    >
        {{ name }}
    </button>
    
  </section>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    clickLoad() {

      this.$emit('click')
    },
  },
}
</script>

<style></style>

<!-- <template>
  <section>
    <button
      @click="$emit('click')"
      class="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition duration-200"
    >
      {{ name }}
    </button>
  </section>
</template>

<script>
export default {
  props: ['name'],
  emits: ['click']
}
</script> -->