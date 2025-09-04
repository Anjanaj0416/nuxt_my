<template>
  <section class="fixed top-0 z-10 w-full">
    <div class="flex bg-gray-100">

      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

      <!-- Sidebar Toggle -->
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="absolute  p-2 text-white rounded-md top-4 left-4 "
        style="background-color: #C2B280";
      >
        <svg
          v-if="!isSidebarOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Main Content -->
      <div class="flex flex-col flex-1">
        <header class="flex items-center justify-between h-16 p-4 shadow text-white" style="background-color: #E8D8B0;">
          <div class="flex items-center space-x-2 ml-14">
            <img src="https://via.placeholder.com/120x40" alt="Logo" class="h-10 w-auto" />
          </div>
          <div class="flex items-center space-x-6 mr-14">
            <div class="flex flex-col items-end">
              <span class="text-sm font-semibold uppercase" style="color: #7B5B3A;">Table</span>
              <span class="text-xl font-bold" style="color: #7B5B3A">12</span>
            </div>
            <button class="p-2 rounded-full hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9" />
              </svg>
            </button>
          </div>

        </header>

      </div>
    </div>


  </section>
</template>

<script>
import Sidebar from './sidemenu.vue';



export default {
  components: { Sidebar },
  data() {
    return {
      isSidebarOpen: false,
      isDropdownOpen: false,
      isProfile: false,
      isPayment: false,
    };
  },
  async created() {   
    this.showLoading = this.$showLoading;


  },
  methods: {
    
  },
};
</script>
