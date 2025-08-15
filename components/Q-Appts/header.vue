<template>
  <header class="bg-white shadow-sm w-full sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-3xl font-bold text-blue-600">Q - Appts</NuxtLink>

      <nav class="hidden md:flex space-x-6 text-sm2 font-semibold text-gray-700">
        <NuxtLink to="/Q-Appts" class="hover:text-blue-600">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:text-blue-600">About us</NuxtLink>
        <NuxtLink to="/customer" class="hover:text-blue-600">Customer</NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="mobileMenuOpen" class="md:hidden px-4 pb-4">
      <NuxtLink to="/Q-Appts" class="block py-2 text-gray-700 hover:text-blue-600">Home</NuxtLink>
      <NuxtLink to="/about" class="block py-2 text-gray-700 hover:text-blue-600">About us</NuxtLink>
      <NuxtLink to="/customer" class="block py-2 text-gray-700 hover:text-blue-600">Customer</NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const mobileMenuOpen = ref(false)
</script>
