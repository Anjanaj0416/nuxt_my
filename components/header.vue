<template>
  <section class="fixed top-0 z-10 w-full">
    <div class="flex bg-gray-100">
      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" :loggedUser="userStore.loggedUser" @close-sidebar="isSidebarOpen = false" />

      <!-- Main Content -->
      <div class="flex flex-col flex-1">
        <!-- Header -->
        <header class="flex items-center justify-between h-16 px-6 shadow-md 
          bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 
          backdrop-blur-md">
          <!-- Sidebar Toggle -->
          <button @click="isSidebarOpen = !isSidebarOpen" class="absolute z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 
            transition-all duration-300 top-4 left-4">
            <svg v-if="!isSidebarOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Logo -->
          <NuxtLink to="/dashboard" class="flex items-center space-x-2 ml-14">
            <!-- hide Img -->
            <!-- <img src="/assets/img/LogoDigitalTechLab.png" alt="Digital Tech Labs Logo" class="h-auto rounded-full w-28" /> -->
          </NuxtLink>

          <!-- User Profile -->
          <div class="relative flex items-center ml-3 space-x-3">
            <div class="text-white text-sm">
              <p class="font-semibold">Hi, {{ userStore.loggedUser.name }}</p>
              <p class="text-xs opacity-80">{{ userStore.loggedUser.userName }}</p>
            </div>

            <!-- Profile Button -->
            <div>
              <button @click="isDropdownOpen = !isDropdownOpen" class="relative flex items-center justify-center w-10 h-10 rounded-full 
                border-2 border-white shadow-md hover:scale-105 transition-all duration-300">
                <img v-if="userStore.loggedUser.resourceURLRoot && userStore.loggedUser.image"
                  :src="userStore.loggedUser.resourceURLRoot + userStore.loggedUser.image" alt="Profile"
                  class="w-10 h-10 rounded-full object-cover" />
              </button>

              <!-- Dropdown Menu -->
              <transition name="fade-scale">
                <div v-if="isDropdownOpen"
                  class="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                  <button @click="GoToProfile"
                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition text-left">
                    Your Profile
                  </button>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Settings
                  </a>
                  <a href="/user/login"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                    Sign out
                  </a>
                </div>
              </transition>
            </div>
          </div>
        </header>
      </div>
    </div>

    <!-- Profile Modal -->
    <profile v-if="isProfile" :profile="profileData" @close="isProfile = !isProfile" />
  </section>
</template>

<script>
import Sidebar from "./sidemenu.vue";
import { useUserStore } from '~/stores/modules/userStore';
import profile from "~/pages/user/profile.vue";

export default {
  components: { Sidebar, profile },
  data() {
    return {
      userStore: null,
      isSidebarOpen: false,
      isDropdownOpen: false,
      isProfile: false,
      profileData: null,
    };
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
      } catch (err) {
        console.error("Error in GoToProfile:", err);
      }
    }
  },
  async created() {
    try {
      this.userStore = useUserStore();
    } catch { }
  },
};
</script>

<style>
/* Smooth dropdown animation */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
