<template>
  <footer class="bg-red-500 rounded-none dark:bg-red-500">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
      <!-- Copyright -->
      <span class="text-sm text-white sm:text-center">
        © {{currentYear}} <NuxtLink to="/" class="hover:underline">MIRACLESOFT</NuxtLink>. All Rights Reserved.
      </span>

      <!-- Link Group -->
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
        <li>
          <NuxtLink to="/About_Us" class="hover:underline me-4 md:me-6">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/Contact_Us" class="hover:underline">Contact</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
