<template>
  <footer class="bg-purple-600">
    <div
      class="w-full max-w-screen-xl mx-auto
             px-4 py-6
             flex flex-col gap-4
             md:flex-row md:items-center md:justify-between"
    >
      <!-- Copyright -->
      <span class="text-sm text-white text-center md:text-left">
        © {{ currentYear }}
        <NuxtLink to="/" class="hover:underline font-medium">
          Digital TechLabs
        </NuxtLink>
        . All Rights Reserved.
      </span>

      <!-- Links -->
      <ul
        class="flex justify-center md:justify-end
               gap-4 text-sm font-medium text-white"
      >
        <li>
          <NuxtLink to="/About_Us" class="hover:underline">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/Contact_Us" class="hover:underline">
            Contact
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
