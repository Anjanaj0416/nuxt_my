<template>
  <section class="fixed top-0 z-10 w-full">
    <div class="flex bg-gray-100">
      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

      <!-- Sidebar Toggle -->
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="absolute p-2 text-white rounded-md top-4 left-4 bg-white shadow"
      >
        <svg
          v-if="!isSidebarOpen"
          class="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Main Content -->
      <div class="flex flex-col flex-1">
        <header
          class="flex items-center justify-between h-16 px-4 lg:px-10 bg-white shadow-sm"
        >
          <!-- Logo (hidden on mobile) -->
          <!-- <div class="hidden sm:flex items-center space-x-2 mr-2">
            <img
              src="https://via.placeholder.com/120x40"
              alt="Logo"
              class="h-10 w-auto"
            />
          </div> -->

          <!-- Right Side (Cart + Table) -->
          <div class="flex items-center space-x-4 ml-auto">
            <button
              class="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 0 0 .9 1.5h12.7M7 13L5.4 5M16 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
              <span
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <div
              class="px-3 py-1 rounded-full shadow text-center bg-green-500"
             
            >
              <span class="text-xs font-semibold uppercase text-white"
                >Table</span
              >
              <span class="ml-1 text-lg font-bold text-white">12</span>
            </div>
          </div>
        </header>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "./sidemenu.vue";

export default {
  components: { Sidebar },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
};
</script>
