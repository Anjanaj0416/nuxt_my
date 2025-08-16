<template>
  <section class="fixed top-0 z-10 w-full">
    <div class="flex bg-gray-100">

      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

      <!-- Sidebar Toggle -->
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="absolute z-50 p-2 text-white rounded-md top-4 left-4 bg-indigo-600 hover:bg-indigo-700"
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
        <!-- Header -->
        <header class="flex items-center justify-between h-16 p-4 shadow bg-indigo-600 text-white">
          
          <!-- Logo -->
          <div class="flex items-center space-x-2 ml-14">
            <img src="https://via.placeholder.com/120x40" alt="Logo" class="h-10 w-auto" />
          </div>

          <!-- User Section -->
          <div class="relative flex items-center ml-3">
            <!-- User Info -->
            <span class="ml-2 uppercase">
              John Doe<br />
              <span class="text-xs lowercase">johndoe</span>
            </span>

            <!-- Avatar -->
            <div>
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="relative flex items-center justify-center w-10 h-10 ml-3 rounded-full focus:outline-none"
              >
                <img
                  class="w-10 h-10 rounded-full border-2 border-white"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
              </button>

              <!-- Dropdown -->
              <div
                v-if="isDropdownOpen"
                class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 text-gray-800"
              >
                <button
                  @click="openProfile"
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Your Profile
                </button>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                <a href="/user/login" class="block px-4 py-2 text-sm hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>

    <!-- Profile Modal -->
    <div
      v-if="isProfile"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 class="text-xl font-bold mb-4">User Profile</h2>
        <div class="flex items-center space-x-4">
          <img
            class="w-16 h-16 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div>
            <p class="font-semibold">John Doe</p>
            <p class="text-sm text-gray-600">johndoe</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-gray-700"><strong>Email:</strong> john@example.com</p>
          <p class="text-gray-700"><strong>Role:</strong> Admin</p>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="isProfile = false"
            class="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
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
    };
  },
  methods: {
    openProfile() {
      this.isProfile = true;
      this.isDropdownOpen = false;
    },
  },
};
</script>
