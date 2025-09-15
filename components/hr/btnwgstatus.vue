<template>
  <section>
    <div
      class="
        relative flex items-center gap-2
        px-4 py-2
        cursor-pointer
        font-semibold
        text-gray-800
        hover: hover:text-gray-500
        transition-all duration-200 ease-in-out
        active:scale-95
      "
      @click="click"
    >
      <!-- Icon -->
      <div class="flex items-center justify-center text-blue-600 group-hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-6 w-6" fill="none" viewBox="0 0 24 24" 
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7
                   m10 0v-2c0-.656-.126-1.283-.356-1.857
                   M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2
                   c0-.656.126-1.283.356-1.857m0 0a5.002
                   5.002 0 019.288 0M15 7a3 3 0 11-6 0 
                   3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 
                   014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <!-- Label -->
      <div class="text-lg tracking-wide">
        {{ name }}
      </div>

      <!-- Badge -->
      <div
        class="
          absolute -top-2 -right-2
          bg-gradient-to-r from-blue-500 to-indigo-600
          rounded-full
          py-1 px-2
          text-xs font-bold
          text-white
          shadow-md
        "
      >
        {{ wgjobcount }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['name', 'wgjobcount'],
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>
