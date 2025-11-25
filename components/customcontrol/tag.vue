<!-- Usage:
<tag class="w-16"/>

import tag from '~/components/tailwindcomp/tag'

 components: {
tag
 },

  methods: {
 userclick(){
      
    }
-->


<template>
  <section>
    <div class="csstag relative">
      <div
        class="cssbtn absolute top-0 right-0 border-gray-500 rounded p-2 text-blue-700 hover:bg-red-600 hover:text-white rounded-full -mr-2  -mt-2 cursor-pointer"
        @click="del_tag">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div class="truncate text-gray-600 w-32 " title="">
        <div v-show="!istageditable || !isedit" @click="isedit = 'true'" class="truncate" :title="value"> {{ value }} </div>
        <div v-show="isedit && istageditable"> <input class=" bg-transparent  px-1" :value="value"
            @input="updateValue($event.target.value)" type="text" @blur="isedit = false"></div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: ['value', 'istageditable'],
  components: {},
  data() {
    return {
      isedit: false,
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value.trim())
    },
    del_tag() {

      this.$emit('deletetag', this.value)
    }

  },
}
</script>

<style>
.cssbtn:hover {
  @apply transform scale-125 duration-500;
}

.csstag {
  @apply rounded px-2 h-6 bg-white border-2 border-gray-300;
  min-width: 100px;
}
</style>
