<template>
  <header class="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
    <nav class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
          <img
            src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
            alt="Digital Tech Labs Logo"
            class="px-2 rounded-full w-44"
          />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="items-center hidden px-4 py-2 space-x-4 text-sm text-white bg-blue-900 rounded-full shadow-lg md:flex">
        <a href="#services" class="transition duration-300 hover:text-gray-300">Service</a>
        <a href="#Product" class="transition duration-300 hover:text-gray-300">Product</a>
        <a href="#" class="transition duration-300 hover:text-gray-300">Projects</a>
        <NuxtLink to="/aboutUs" class="transition duration-300 hover:text-gray-300">About us</NuxtLink>
        <NuxtLink to="/contactUs" class="transition duration-300 hover:text-gray-300">Contact</NuxtLink>
        <NuxtLink to="/user/login" class="transition duration-300 hover:text-gray-300">Intranet</NuxtLink>

        <!-- Dropdown -->
        <div class="relative">
          <button @click="$emit('toggle-dropdown')" class="transition duration-300 hover:text-gray-300">Packages</button>
          <div v-if="$attrs.showDropdown" class="absolute left-0 z-50 w-40 mt-2 text-blue-900 bg-white rounded shadow-md">
            <NuxtLink @click="$emit('close-dropdown')" to="/portfoliotemplates/standard" class="block px-4 py-2 hover:bg-blue-100">Standard</NuxtLink>
            <NuxtLink @click="$emit('close-dropdown')" to="/portfoliotemplates/premium" class="block px-4 py-2 hover:bg-blue-100">Premium</NuxtLink>
            <NuxtLink @click="$emit('close-dropdown')" to="/portfoliotemplates/enterprise" class="block px-4 py-2 hover:bg-blue-100">Enterprise</NuxtLink>
          </div>
        </div>

        <a href="tel:+011 222 3 222"
           class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
           Talk to Us
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="$emit('toggle-menu')" class="md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  emits: ['toggle-menu', 'toggle-dropdown', 'close-dropdown'],
  inheritAttrs: false
};
</script>

<style scoped>
/* Slide animation for mobile sidebar (optional if using sidebar inside Header) */
.slide-enter-active, .slide-leave-active {
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

/* Navigation hover effects */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}
nav a:hover {
  @apply bg-white text-black;
}
</style>


