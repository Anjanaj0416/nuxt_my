<template>
  <nav class="bg-neutral-primary fixed w-full z-50 top-0 border-b border-default">
    <div class="max-w-screen-xl mx-auto px-4">
  <div class="flex md:grid md:grid-cols-3 items-center h-16">

    <!-- LEFT: Mobile Menu + Logo -->
    <div class="flex items-center gap-3 md:gap-0">
      
      <!-- Mobile Menu Button (LEFT START) -->
      <button
        class="md:hidden text-2xl"
        @click="menuOpen = !menuOpen"
      >
        ☰
      </button>

      <!-- Logo -->
      <a
        href="https://flowbite.com"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-7"
          alt="Flowbite Logo"
        />
        <span class="self-center text-xl font-semibold whitespace-nowrap text-heading">
          mLabs
        </span>
      </a>
    </div>

    <!-- CENTER: DESKTOP MENU -->
    <ul class="hidden md:flex items-center justify-center gap-8 font-medium">
      <li><a href="#">Home</a></li>

      <li class="relative">
        <button
          @click.stop="toggleDropdown"
          class="flex items-center gap-1"
        >
          Company
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </li>
    </ul>

<div class="flex items-center justify-start md:justify-end md:order-2">
  <div class="flex items-center space-x-3 rtl:space-x-reverse">
    
    <!-- User avatar button -->
    <button
      type="button"
      class="flex text-sm bg-neutral-primary rounded-full focus:ring-4 focus:ring-neutral-tertiary"
      id="user-menu-button"
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="w-8 h-8 rounded-full"
        src=""
        alt="user photo"
      />
    </button>

    <!-- User info (optional) -->
    <div class="hidden md:block px-4 py-3 text-sm">
      <span class="block text-heading font-medium">Joseph McFall</span>
      <span class="block text-body truncate">name@flowbite.com</span>
    </div>

  </div>
</div>


  </div>
</div>



    <transition name="fade">
      <div
        v-if="dropdownOpen"
        ref="dropdownWrapper"
        class="absolute left-0 top-full w-full bg-white border-t shadow-lg hidden md:block"
        @click.stop
      >
        <div class="max-w-screen-xl mx-auto px-6 py-8">
          <div class="grid gap-6 md:grid-cols-4">

            <div v-for="(group, i) in menuItems" :key="i">
              <h4 class="mb-3 font-semibold">{{ group.title }}</h4>
              <ul class="space-y-1">
                <li v-for="(item, j) in group.items" :key="j">
                  <a href="#" class="block p-3 rounded hover:bg-gray-100">
                    <div class="font-medium">{{ item.name }}</div>
                    <p class="text-sm text-gray-600">{{ item.desc }}</p>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </transition>

      

    <!-- ✅ MOBILE MENU -->
    <div v-if="menuOpen" class="md:hidden bg-white border-t">
      <ul class="px-4 py-3 space-y-2">
        <li><a href="#" class="block py-2">Home</a></li>

        <li>
          <button
            @click="mobileCompanyOpen = !mobileCompanyOpen"
            class="flex w-full justify-between py-2 font-medium"
          >
            Company
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': mobileCompanyOpen }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="mobileCompanyOpen" class="pl-4 space-y-4">
            <div v-for="(group, i) in menuItems" :key="i">
              <h4 class="font-semibold text-sm">{{ group.title }}</h4>
              <ul class="mt-2 space-y-1">
                <li v-for="(item, j) in group.items" :key="j">
                  <a href="#" class="block text-sm text-gray-700">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const menuOpen = ref(false)
const dropdownOpen = ref(false)
const mobileCompanyOpen = ref(false)
const dropdownWrapper = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

/* CLICK OUTSIDE DESKTOP DROPDOWN */
const handleClickOutside = (e) => {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const menuItems = [
  {
    title: 'Daily Tasks',
    items: [
      { name: 'Help Stores', desc: 'E-commerce integrations' },

    ],
  },
  {
    title: 'View/Edit',
    items: [
      { name: 'Test Types', desc: 'Email workflows' },
      { name: 'Patients', desc: 'Design assets' },
      { name: 'Doctors', desc: 'Campaign tracking' },
      { name: 'System Data', desc: 'Campaign tracking' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { name: 'Order Summery Report', desc: 'User targeting' },
      { name: 'Cash Collection', desc: 'Ad integrations' },
      { name: 'My Account', desc: 'Performance tools' },
    ],
  },
   {
    title: 'Help',
    items: [
      { name: 'Audience Management', desc: 'User targeting' },
      { name: 'Advertising', desc: 'Ad integrations' },
      { name: 'Optimization', desc: 'Performance tools' },
    ],
  },
]
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
