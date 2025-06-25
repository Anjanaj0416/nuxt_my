<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/learners" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">DriveLearn</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink to="/learners" class="nav-link">Home</NuxtLink>
            <NuxtLink to="/learners/schools" class="nav-link">Find Schools</NuxtLink>
            <NuxtLink to="/how-it-works" class="nav-link">How It Works</NuxtLink>
            <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- Auth Buttons -->
          <div v-if="!userStore.token" class="hidden md:flex items-center space-x-2">
            <NuxtLink to="/learners/login" class="btn-secondary">Login</NuxtLink>
            <NuxtLink to="/learners/register" class="btn-primary">Driving School</NuxtLink>
          </div>

          <!-- User Menu -->
          <div v-else class="relative">
            <button
              @click="userDropdownOpen = !userDropdownOpen"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userStore.loggedUser?.name?.charAt(0) || 'U' }}</span>
              </div>
              <span class="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ userStore.loggedUser?.name || 'User' }}
              </span>
            </button>

            <div
              v-show="userDropdownOpen"
              id="user-dropdown"
              class="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div class="font-medium">{{ userStore.loggedUser?.name }}</div>
                <div class="truncate">{{ userStore.loggedUser?.email }}</div>
              </div>
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <NuxtLink to="/dashboard" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</NuxtLink>
                </li>
              </ul>
              <div class="py-2">
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="showMobileMenu" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col space-y-2">
          <NuxtLink to="/" class="mobile-nav-link">Home</NuxtLink>
          <NuxtLink to="/school" class="mobile-nav-link">Find Schools</NuxtLink>
          <NuxtLink to="/how-it-works" class="mobile-nav-link">How It Works</NuxtLink>
          <NuxtLink to="/contact" class="mobile-nav-link">Contact</NuxtLink>
          <div v-if="!userStore.token" class="flex flex-col space-y-2 mt-4">
            <NuxtLink to="/learners/login" class="btn-secondary">Login</NuxtLink>
            <NuxtLink to="/learners/register" class="btn-primary">Sign Up</NuxtLink>
          </div>
          <div v-else class="flex flex-col space-y-2 mt-4">
            <button @click="logout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '~/composables/learners/useTheme'
import { useUserStore } from '~/stores/modules/userStore'

const { isDark, toggleTheme } = useTheme()
const userStore = useUserStore()
const showMobileMenu = ref(false)
const userDropdownOpen = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const logout = () => {
  userStore.logout()
  // Optionally: navigateTo('/learners/login')
}
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
}

.nav-link.router-link-active {
  @apply text-primary-500 dark:text-primary-500 bg-primary-50 dark:bg-primary-900/20;
}

.mobile-nav-link {
  @apply block px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors;
}

.mobile-nav-link.router-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20;
}

.btn-primary {
  @apply bg-primary-500 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors;
}

.btn-secondary {
  @apply text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-primary-600 dark:hover:border-primary-400 transition-colors;
}
</style>
