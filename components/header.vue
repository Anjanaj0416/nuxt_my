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
            <img src="/assets/img/LogoDigitalTechLab.png" alt="Digital Tech Labs Logo" class="h-auto rounded-full w-28" />
          </NuxtLink>

              <!-- {{ userStore.loggedUser.resourceURLRoot + userStore.loggedUser.image }} -->


          <!-- User Profile -->
          <div class="relative flex items-center ml-3 space-x-3">

            <div class="relative mr-4">
              <button @click="isNotificationOpen = !isNotificationOpen"
                class="relative flex items-center justify-center w-12 h-12 
                      hover:scale-110 transition-all duration-300">
                <!-- Bell Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                  class="w-7 h-7 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                      a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
                      C7.67 6.165 6 8.388 6 11v3.159
                      c0 .538-.214 1.055-.595 1.436L4 17h5m6 0
                      a3 3 0 11-6 0h6z" />
                </svg>

                <!-- Notification Badge -->
                <span v-if="notifications.length"
                  class="absolute -top-0 -right-1 flex items-center justify-center 
                        w-5 h-5 text-[10px] font-bold text-white bg-red-500 
                        rounded-full shadow-md ">
                  {{ notifications.length }}
                </span>
              </button>


              <!-- Dropdown -->
              <transition >
                <div v-if="isNotificationOpen"
                  class="absolute right-0 mt-3 w-72 bg-white 
                        rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div class="p-4 border-b ">
                    <h3 class="text-sm font-semibold text-gray-700 ">Notifications</h3>
                  </div>
                  <ul class="max-h-60 overflow-y-auto">
                    <li v-for="(note, index) in notifications" :key="index"
                      class="px-4 py-3 hover:bg-gray-100 
                            transition flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <p class="text-sm text-gray-600 ">{{ note }}</p>
                    </li>
                  </ul>
                  <!-- <div class="p-3 text-center">
                    <button class="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 
                                  dark:text-indigo-400 dark:hover:text-indigo-300 transition">
                      View All
                    </button>
                  </div> -->
                </div>
              </transition>
            </div>
            <div class="flex flex-col text-white text-xs sm:text-sm hidden sm:inline md:inline lg:inline">
              <p class="font-semibold truncate">Hi, {{ userStore.loggedUser.name }}</p>
              <p class="text-[10px] sm:text-xs opacity-80 truncate">{{ userStore.loggedUser.userName }}</p>
              <!-- <p class="text-[10px] sm:text-xs opacity-80 truncate">Role: {{ userStore.loggedUser.role || 'N/A' }}</p> -->
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
      isNotificationOpen: false,
      notifications: ["ABS companu visit 2.30pm", "ABS companu visit 2.30pm", "Meeting at 3 PM"],
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
