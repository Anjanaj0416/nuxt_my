<template>
  <div>
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-30 bg-black bg-opacity-50" 
      @click="$emit('close-sidebar')">
    </div>

    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ]" 
      role="navigation" 
      :aria-hidden="!isOpen"
    >
      <!-- Top Navbar -->
      <div class="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-2">
          <img src="" alt="Logo" class="h-auto rounded-full w-28" />
        </router-link>
        <!-- Close Button -->
        <button 
          @click="$emit('close-sidebar')"
          class="p-2 text-white transition duration-200 rounded-full hover:bg-gray-700 focus:outline-none"
          aria-label="Close Sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Subheader -->
      <div class="flex items-center justify-between px-6 py-3 text-white bg-gradient-to-r from-gray-800 to-gray-700">
        <h1 class="text-xl font-semibold tracking-wide">INTRANET</h1>
      </div>

      <!-- Simplified Navigation -->
      <nav class="p-4 space-y-1">
        <div v-for="link in filteredLinks" :key="link.name">
          <router-link 
            v-if="!link.submenu" 
            :to="link.to || '#'" 
            class="flex items-center px-4 py-2 rounded hover:bg-blue-800"
            @click.native="$emit('close-sidebar')"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path :d="link.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <span>{{ link.name }}</span>
          </router-link>

          <!-- If it has submenu, just show the parent link (ignore children) -->
          <div v-else class="flex items-center px-4 py-2 rounded hover:bg-blue-800 cursor-pointer">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path :d="link.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <span>{{ link.name }}</span>
          </div>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from '~/stores/modules/userStore';





const props = defineProps({
  isOpen: Boolean,

});

const emit = defineEmits(["close-sidebar"]);

const links = [
  { name: "CRM", to: "/qms/vendor/leads", icon: "M12 12c2.21..." },
  { name: "HR System", to: "/hr", icon: "M7.732 16.5..." },
  { name: "Settings", to: "/settings", icon: "M12 12c2.21..." },
  { name: "Document Registry", to: "/forms", icon: "M7.732 16.5..." },
];

const filteredLinks = computed(() => links);
</script>
