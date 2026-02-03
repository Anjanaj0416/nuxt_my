<template>

      <header class="bg-purple-600 shadow-md h-20 flex items-center px-4 sm:px-6 text-white z-20">
        <label for="menu-toggle" class="sm:hidden mr-4 cursor-pointer text-2xl">☰</label>
        <h1 class="text-lg font-semibold flex-1"><slot name="page-title">Dashboard</slot></h1>

        <div class="relative flex items-center ml-auto space-x-3">
          <div class="relative mr-2">
            <div class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white cursor-pointer">
              🔔
            </div>
          </div>

          <div class="hidden sm:flex flex-col text-white text-xs sm:text-sm leading-tight">
            <p class="font-semibold truncate">Hi, John Doe</p>
            <p class="text-[10px] sm:text-xs opacity-80 truncate">john.doe@company.com</p>
          </div>

          <div class="relative">
            <button @click="isDropdownOpen = !isDropdownOpen" class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-105 transition">
              <img src="https://i.pravatar.cc/100" alt="Profile" class="w-10 h-10 rounded-full object-cover" />
            </button>

            <div v-if="isDropdownOpen" class="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
              <button class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-left">Your Profile</button>
              <button class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-left">Settings</button>
              <button class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 text-left">Sign out</button>
            </div>
          </div>
        </div>
      </header>

    
</template>

<script setup>
import { ref } from 'vue';
const isDropdownOpen = ref(false);
</script>
