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
            <button   @click="isPayment = true" type="button" class="relative mx-8 inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 0 0 .9 1.5h12.7M7 13L5.4 5M16 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
              <span class="sr-only">Notifications</span>
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">20</div>
            </button>
            
            <!-- User Info -->
            <span class="ml-2 uppercase">
              {{ userStore.loggedUser.name }}<br />
              <!-- <span class="text-xs lowercase">johndoe</span> -->
            </span>

            <!-- Avatar -->
            <div>
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="relative flex items-center justify-center w-10 h-10 ml-3 rounded-full focus:outline-none"
              >
                <img class="w-8 h-8 rounded-full"
                  v-if="userStore.loggedUser.resourceURLRoot && userStore.loggedUser.image"
                  :src="userStore.loggedUser.resourceURLRoot + userStore.loggedUser.image" alt="Profile" />
              </button>

              <!-- Dropdown -->
              <div
                v-if="isDropdownOpen"
                class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 text-gray-800"
              >
                <button
                  @click="GoToProfile"
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Your Profile
                </button>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                <a href="/user/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>

    <profile v-if="isProfile" :profile="profileData" @close="isProfile = !isProfile" />

    <HoldPayment v-if="isPayment" @close="isPayment = !isPayment" />

  </section>
</template>

<script>
import Sidebar from './sidemenu.vue';
import { useUserStore } from "~/stores/modules/userStore";
import profile from "~/pages/user/profile.vue";
import HoldPayment from './holdPayment.vue';


export default {
  components: { Sidebar,profile,HoldPayment },
  data() {
    return {
      isSidebarOpen: false,
      isDropdownOpen: false,
      isProfile: false,
      isPayment: false,
      userStore: null,
      profileData: null,
    };
  },
  async created() {
    this.userStore = useUserStore();    
    this.showLoading = this.$showLoading;


  },
  methods: {
    async GoToProfile() {
      try {
        const response = await this.userStore.fetchProfileData(this.userStore.loggedUser.id, this.$showLoading);
        if (response && response.data) {
          this.profileData = response.data.data;
          this.profileData.loggedUserId = this.userStore.loggedUser.id;
          this.isProfile = true;
          this.isDropdownOpen = false;
        }
        console.log('profileData:', this.profileData);
      } catch (err) {
        console.error("Error in GoToProfile:", err);
      }
    }
  },
};
</script>
