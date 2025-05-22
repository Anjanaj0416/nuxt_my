<template>
  <section class="fixed top-0 z-10 w-full">
    <div class="flex bg-gray-100">
      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

      <!-- Main Content -->
      <div class="flex flex-col flex-1">
        <!-- Header -->
        <header class="flex items-center justify-between h-16 p-4 shadow bg-nav">
          <button @click="isSidebarOpen = !isSidebarOpen" class="absolute z-50 p-2 text-white rounded-md top-4 left-4">
            <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <NuxtLink to="/dashboard">
            <!-- Logo and Name -->
            <div class="flex items-center space-x-2 ml-14">
              <img src="/assets/img/LogoDigitalTechLab.png" alt="Digital Tech Labs Logo"
                class="h-auto rounded-full w-28" />
              <!-- <span class="text-xl font-bold text-white">Digital Tech Labs</span> -->
            </div>
          </NuxtLink>

          <div class="relative flex items-center ml-3">


            <span class="ml-2 text-white uppercase">{{ userStore.loggedUser.name }}<br><span class="text-xs">
                {{ userStore.loggedUser.userName }}</span></span>

            <!-- Profile Image Button -->
            <div>
              <button @click="isDropdownOpen = !isDropdownOpen"
                class="relative flex items-center justify-center w-10 h-10 ml-3 text-white bg-gray-800 rounded-full focus:outline-none">
                <img class="w-8 h-8 rounded-full"
                  :src="userStore.loggedUser.resourceURLRoot + userStore.loggedUser.image" alt="Profile" />
              </button>
              <!-- Dropdown Menu -->
              <div v-if="isDropdownOpen"
                class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5">
                <button @click="GoToProfile" class="px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">
                  Your Profile
                </button>

                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
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



  </section>
</template>

<script>
import Sidebar from "./sidemenu.vue";
import { useUserStore } from '~/stores/modules/userStore';
import profile from "~/pages/user/profile.vue";

export default {
  components: {
    Sidebar,
    profile,
  },
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
    // async GoToProfile(id) {
    //   this.isProfile = true;
    //   this.isDropdownOpen = false;
    // },
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
  mounted() {
    // console.log("Received user ID in profile:", this.userId);
  },
  async created() {
    this.userStore = useUserStore();
  },

  computed: {
    userImageUrl() {
      return (
        this.userStore.loggedUser.resourceURLRoot + this.userStore.loggedUser.image
      );
    }
  }
};
</script>
