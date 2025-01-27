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
              @click="$emit('close-sidebar')"
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
              to: '/vendor',
              icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z',
          },
          {
              name: 'Invoice',
              to: '/invoicing',
              icon: 'M6.616 21q-.691 0-1.153-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3h7.213q.323 0 .628.13t.522.349L18.52 7.02q.217.218.348.522t.131.628v2.248q0 .218-.134.379q-.133.162-.345.223q-.362.131-.666.32q-.305.19-.586.47l-5.515 5.497q-.217.217-.351.522q-.134.304-.134.628v1.734q0 .348-.23.578t-.577.23zm7.038-.808V19.12q0-.161.056-.3q.055-.14.186-.271l5.09-5.065q.148-.13.308-.19q.16-.062.32-.062q.165 0 .334.064q.17.065.298.194l.925.944q.123.148.188.308q.064.159.064.319t-.061.322t-.19.31l-5.066 5.066q-.131.13-.27.186q-.14.056-.302.056h-1.073q-.348 0-.577-.23q-.23-.23-.23-.578m5.96-4.176l.924-.956l-.925-.944l-.95.95zM14.807 8H18l-4-4l4 4l-4-4v3.192q0 .348.23.578t.578.23',  // Invoice icon
          },
          {
              name: 'Quotation',
              to: '/quotation',
              icon: 'M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z',  // Quotation icon
          },
          {
              name: 'Member',
              to: '/members',
              icon: 'M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z',  // Quotation icon
          },
      ]

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
