<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
                    
      <div class="flex items-center justify-between p-4">
        <h1 class="text-lg font-semibold text-center">Logo</h1>
        <button
          @click="isSidebarOpen = false"
          class="p-2 text-black rounded-full"
        >
          <!-- Close Icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="p-4">
        <ul>
          <li class="">
            <a href="#" class="flex items-center px-4 py-2 font-semibold text-gray-700 rounded-md hover:bg-gray-200 hover:text-violet-900">
              <!-- Icon (color will change based on parent hover) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-4 text-gray-700 fill-current hover:text-violet-900">
                <path d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"/>
              </svg>
              <!-- Text (color changes on hover) -->
              Dashboard
            </a>
          </li>
          <li class="">
            <a href="#" class="flex items-center px-4 py-2 font-semibold text-gray-700 rounded-md hover:bg-gray-200 hover:text-violet-900">
              <!-- Icon (color will change based on parent hover) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-4 text-gray-700 fill-current hover:text-violet-900">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z"/>
              </svg>
              <!-- Text (color changes on hover) -->
              Profile
            </a>
          </li>
          <li class="">
            <a href="#" class="flex items-center px-4 py-2 font-semibold text-gray-700 rounded-md hover:bg-gray-200 hover:text-violet-900">
              <!-- Icon (color will change based on parent hover) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-4 text-gray-700 fill-current hover:text-violet-900">
                <path d="M12 15.5a3.5 3.5 0 1 1 0-7a3.5 3.5 0 0 1 0 7zM12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z"/>
              </svg>
              <!-- Text (color changes on hover) -->
              Settings
            </a>
          </li>
          <li class="">
            <a href="#" class="flex items-center px-4 py-2 font-semibold text-gray-700 rounded-md hover:bg-gray-200 hover:text-violet-900">
              <!-- Icon (color will change based on parent hover) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-4 text-gray-700 fill-current hover:text-violet-900">
                <path d="M10 17l5-5l-5-5v4H3v2h7v4zM20 2h-6V0h6c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-6v-2h6V2z"/>
              </svg>
              <!-- Text (color changes on hover) -->
              Logout
            </a>
          </li>
        </ul>


      </nav>
    </aside>


    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <!-- <header class="flex items-center justify-between p-4 shadow bg-violet-900">
        <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="absolute z-50 p-2 text-white rounded-md top-4 left-4"
          >
            <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            
        </button>
        <h1 class="mt-1 ml-24 text-lg font-semibold text-white">Logo</h1>
        <div class="relative ml-3">
          <div>
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none"
            >
              <img
                class="rounded-full size-8"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
            </button>
          </div>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Your Profile
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </a>
          </div>
        </div>
      </header> -->

      <!-- Page Content -->
      <main class="flex-grow p-6 overflow-y-auto bg-gray-50">
        <slot />
      </main>

      <!-- Footer -->
      <!-- <footer class="p-4 text-center text-white bg-gray-200">
        <p class="text-gray-700">&copy; 2024 My Nuxt App</p>
      </footer> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      isDropdownOpen: false,
    };
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", this.closeDropdownOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdownOutside);
  },
  methods: {
    closeDropdownOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
