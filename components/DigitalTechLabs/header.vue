<template>
  <header class="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
    <nav class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
          <!-- <img
            src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
            alt="Digital Tech Labs Logo"
            class="px-2 rounded-full w-44"
          /> -->
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="items-center hidden px-4 py-2 space-x-4 text-sm text-white bg-blue-900 rounded-full shadow-lg md:flex">
        <NuxtLink to="/service" class="transition duration-300 hover:text-gray-300">Service</NuxtLink>
        <NuxtLink to="/project" class="transition duration-300 hover:text-gray-300">Project</NuxtLink>
        <NuxtLink to="/aboutUs" class="transition duration-300 hover:text-gray-300">About us</NuxtLink>
        <NuxtLink to="/contactUs" class="transition duration-300 hover:text-gray-300">Contact</NuxtLink>
        <NuxtLink to="/user/login" class="transition duration-300 hover:text-gray-300">Intranet</NuxtLink>
        <!-- Dropdown -->
        <div class="relative">
          <button @click="toggleDropdown" class="transition duration-300 hover:text-gray-300">
            Packages
          </button>
          <div v-if="showDropdown" class="absolute left-0 z-50 w-40 mt-2 text-blue-900 bg-white rounded shadow-md">
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
              class="block px-4 py-2 hover:bg-blue-100">Standard</NuxtLink>
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium" class="block px-4 py-2 hover:bg-blue-100">
              Premium</NuxtLink>
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
              class="block px-4 py-2 hover:bg-blue-100">Enterprise</NuxtLink>
          </div>
        </div>
        <NuxtLink to="careers" class="transition duration-300 hover:text-gray-300">Careers</NuxtLink>
        <a href="tel:+011 222 3 222"
          class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
          Talk to Us
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" @click="toggleMenu">
        <div class="fixed top-0 left-0 w-64 h-full p-6 overflow-y-auto text-white bg-blue-900 shadow-lg" @click.stop>
          <!-- Header Row with Logo Left and Close Button Right -->
          <div class="flex items-center justify-between mb-6">
            <!-- Logo on the Left -->
            <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
              <img src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" alt="Digital Tech Labs Logo"
                class="w-24 px-2 rounded-full" />
            </NuxtLink>

            <!-- Close Button on the Right -->
            <button class="text-xl font-bold text-white transition hover:text-gray-300" @click="toggleMenu">
              ✕
            </button>
          </div>


          <!-- Navigation Links -->
          <nav class="flex flex-col mt-6 space-y-4">
            <a href="/service" class="hover:text-gray-300">Service</a>
            <a href="/project" class="hover:text-gray-300">Projects</a>
            <NuxtLink to="/aboutUs" class="hover:text-gray-300">About us</NuxtLink>
            <NuxtLink to="/contactUs" class="hover:text-gray-300">Contact</NuxtLink>
            <NuxtLink to="/user/login" class="hover:text-gray-300">Intranet</NuxtLink>

            <!-- Dropdown in Sidebar -->
            <div class="relative pl-3">
              <button @click="toggleDropdown" class="w-full text-left transition hover:text-gray-300">
                Packages
              </button>
              <div v-if="showDropdown" class="p-2 mt-2 ml-2 space-y-1 text-blue-900 bg-white rounded shadow">
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Standard</NuxtLink>
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Premium</NuxtLink>
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Enterprise</NuxtLink>
              </div>
            </div>
            <NuxtLink to="/careers" class="transition duration-300 hover:text-gray-300">Careers</NuxtLink>
            <!-- CTA Button -->
            <a href="tel:+011 222 3 222"
              class="px-4 py-2 mt-6 font-semibold text-center text-blue-900 bg-white rounded-full shadow-md hover:bg-blue-100">
              Talk to Us
            </a>
          </nav>
        </div>
      </div>
    </transition>

  </header>
</template>


<script>
  import { ref } from "vue";

  definePageMeta({
    layout: 'bst',
  });

  export default {
    data() {
      return {
        imageroot: process.env.Assets_83,
        showDropdown: false,
        menuOpen: false, 
      };
    },
    mounted() {
      console.log("Component mounted!");
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      closeDropdown() {
        this.showDropdown = false;
      },
      handleClickOutside(event) {
        const dropdown = this.$refs.dropdownRef;
        if (dropdown && !dropdown.contains(event.target)) {
          this.closeDropdown();
        }
      },
      toggleMenu() {
        this.menuOpen = !this.menuOpen; 
      },
      closeMenu() {
        this.menuOpen = false; 
      },
    },
    head() {
      return {
        title: "Intranet - Digital Tech Labs",
      };
    },
  };
</script>


<style scoped>
  /* Utility Classes */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from {
    transform: translateX(-100%);
  }

  .slide-enter-to {
    transform: translateX(0%);
  }

  .slide-leave-from {
    transform: translateX(0%);
  }

  .slide-leave-to {
    transform: translateX(-100%);
  }

  .html {
    scroll-behavior: smooth;
  }

  .csscmd {
    @apply p-2 text-center bg-blue-200 rounded;
  }

  .csscmd:hover {
    @apply bg-blue-300 cursor-pointer;
  }

  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }

  /* Navbar Specific */
  nav a {
    @apply px-3 py-2 rounded-lg transition-colors;
  }

  nav a:hover {
    @apply bg-white text-black;
  }
</style>
