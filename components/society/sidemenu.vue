<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 z-30 bg-black bg-opacity-50" @click="$emit('close-sidebar')"></div>
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-64  bg-[#232B37]  text-white overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]" role="navigation" :aria-hidden="!isOpen">
      <!-- Top Navbar -->
      <div class="flex items-center justify-between px-6 py-4 bg-[#232B37] shadow-md">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-2">
          <!-- hide Img -->
          <img src="/assets/img/LogoDigitalTechLab.png" alt="Logo" class="h-auto rounded-full w-28" />
        </router-link>
        <!-- Close Button -->
        <button @click="$emit('close-sidebar')"
          class="p-2 text-white transition duration-200 rounded-full hover:bg-gray-700 focus:outline-none"
          aria-label="Close Sidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Subheader -->
      <!-- <div class="flex items-center justify-between px-6 py-3 text-white bg-gradient-to-r from-orange-600 to-gray-700">
        <h1 class="text-xl font-semibold tracking-wide">Welfare</h1>
      </div> -->

      <!-- {{ userStore.loggedUser.granted }} -->
      <nav class="p-4">
        <router-link to="/welfare"    
          class="block px-3 py-2 text-gray-300 rounded hover:text-gray-800 hover:bg-white"
          @click="$emit('close-sidebar')">
          <span> {{ t('dashboard') }}</span>
        </router-link>
        <router-link to="/welfare/payment"    
          class="block px-3 py-2 text-gray-300 rounded hover:text-gray-800 hover:bg-white"
          @click="$emit('close-sidebar')">
          <span>{{ t('payments') }}</span>
        </router-link>
        <router-link to="/welfare/member"    
          class="block px-3 py-2 text-gray-300 rounded hover:text-gray-800 hover:bg-white"
          @click="$emit('close-sidebar')">
          <span>{{ t('members') }}</span>
        </router-link>
        <router-link to="/welfare/payments/collactionDetails"    
          class="block px-3 py-2 text-gray-300 rounded hover:text-gray-800 hover:bg-white"
          @click="$emit('close-sidebar')">
          <span>{{ t('collactionDetails') }}</span>
        </router-link>
        <router-link to=""    
          class="block px-3 py-2 text-gray-300 rounded hover:text-gray-800 hover:bg-white"
          @click="$emit('close-sidebar')">
          <span>{{ t('profile') }}</span>
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>

<script>
  import { useUserStore } from '~/stores/modules/userStore';
  export default {
    props: ['isOpen'],
    components: {},
    setup() {
      const userStore = useUserStore();
      const granted = computed(() => userStore?.loggedUser?.granted || []);
      return { userStore, granted };
    },
    async created() {
      this.userStore = useUserStore();
    },
  }
</script>

<style scoped>
  .rotate-90 {
    transform: rotate(90deg);
  }
</style>
