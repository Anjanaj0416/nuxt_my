<template>
  <ul class="pl-2 space-y-1">
    <li v-for="item in items" :key="item.id" class="relative group">
      <!-- Row -->
      <div
        class="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all duration-200
               hover:bg-gray-100 active:bg-gray-200"
        :class="{
          'bg-blue-50 border-l-4 border-blue-500': item.selected,
        }"
        @click="toggle(item)"
      >
        <!-- Expand/Collapse Icon -->
        <span v-if="item.children?.length" class="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-300"
            :class="{ 'rotate-90': item._open }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </span>

        <!-- File Icon -->
        <span v-else class="text-gray-400">📄</span>

        <!-- Name with link -->
        <a
          v-if="item.url && item.url !== '#'"
          :href="item.url"
          target="_blank"
          class="text-sm font-medium text-gray-700 hover:text-blue-600 underline-offset-2 hover:underline"
          @click.stop
        >
          {{ item.name }}
        </a>
        <span v-else class="text-sm font-medium text-gray-700">
          {{ item.name }}
        </span>
      </div>

      <!-- Children (recursive) -->
      <transition name="slide-fade">
        <TreeView
          v-if="item.children?.length && item._open"
          :items="item.children"
          class="ml-5 border-l border-gray-200 pl-3 mt-1"
        />
      </transition>
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

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
