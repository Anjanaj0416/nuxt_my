<template>
  <ul class="pl-2">
    <li
      v-for="item in items"
      :key="item.id"
      class="relative group"
    >
      <!-- Highlight on selection (optional) -->
      <div
        class="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
        :class="{
          'bg-gray-100 border-l-2 border-blue-500': item.selected,
        }"
        @click="toggle(item)"
      >
        <!-- Icon -->
        <span v-if="item.children?.length" class="text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 7h4l2 2h10a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
          </svg>
        </span>
        <span v-else class="text-gray-500">
          📄
        </span>

        <!-- Name -->
       
       <a target="_blank" v-if="item.url!='#'" :href="item.url">   <span class="text-sm text-gray-800">{{ item.name }}</span></a>
       <span v-else>{{ item.name }}</span>
      </div>

      <!-- Children (recursive) -->
      <TreeView
        v-if="item.children?.length && item._open"
        :items="item.children"
        class="ml-4"
      />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const toggle = (item) => {
  item._open = !item._open;
};
</script>
