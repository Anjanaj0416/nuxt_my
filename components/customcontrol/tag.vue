<!-- Usage:
<tag
          :item="item"
          @deletetag="GetDeleteTag"          
        />

import tag from '~/components/customcontrol/tag'

 components: {
   tag
 },

  methods: {
 GetDeleteTag(id) {
      try {
       
        var index = this.arrSelectedIDs.findIndex((o) => o.id === id);
        this.arrSelectedIDs.splice(index, 1);

      } catch (e) {}
      
    },
-->


<template>
  <section>
    <div class=" csstag relative">
      <div
        class="cssbtn absolute top-0 right-0 border-gray-500 rounded p-0.5 text-blue-700 hover:bg-red-600 hover:text-white  -mr-2  -mt-2 cursor-pointer"
        @click="del_tag">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div v-if="existingGrant">
        <div class="truncate text-red w-32" title="">
          {{ item }}
        </div>
      </div>
      <div class="truncate text-red w-32" title="">
        {{ item.value }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['item', 'existingGrant'],
  components: {},
  data() {
    return {

    }
  },
  methods: {

    del_tag() {
      this.$emit('deletetag', this.item.id)
    }

  },
}
</script>

<style>
.cssbtn:hover {
  @apply transform scale-125 duration-500;
}

.csstag {
  @apply rounded px-2 h-6 bg-gray-300;
  min-width: 100px;
}
</style>
