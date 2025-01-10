<template>
  <div>
    <!-- Backdrop Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-30 bg-black bg-opacity-50"
      @click="$emit('close-sidebar')"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      role="navigation"
      :aria-hidden="!isOpen"
    >
      <div class="flex items-center justify-between p-4">
        <h1 class="text-lg font-semibold">Logo</h1>
        <button
          @click="$emit('close-sidebar')"
          class="p-2 text-black rounded-full"
          aria-label="Close Sidebar"
        >
          <!-- Close Icon -->
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="p-4">
        <ul>
          <li v-for="link in links" :key="link.name">
            <router-link
              :to="link.to"
              :class="[
                'flex items-center px-4 py-2 font-semibold text-gray-700 rounded-md hover:bg-gray-200 hover:text-violet-900',
                { 'bg-gray-200 text-violet-900': isActive(link.to) }
              ]"
            >
              <svg
                v-if="link.icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="mr-4 text-gray-700 fill-current"
              >
                <path :d="link.icon" />
              </svg>
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      links: [
        {
          name: 'Vendor',
          to: '/vendor/vendor',
          icon: 'M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75',
        },
        {
          name: 'Profile',
          to: '/user/profile',
          icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z',
        },
      ],
    };
  },
  methods: {
    isActive(route) {
      return window.location.pathname === route;
    },
  },
};
</script>

<style scoped>
/* Add sidebar-specific styles here */
</style>
