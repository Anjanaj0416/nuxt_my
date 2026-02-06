<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 z-30 bg-black bg-opacity-50" @click="$emit('close-sidebar')"></div>
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-qbook rounded-r-lg text-white overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]" role="navigation" :aria-hidden="!isOpen">
      <!-- Top Navbar -->
      <div class="flex items-center justify-between px-6 py-4 bg-qbook shadow-md">
        <!-- Logo -->
        <router-link to="/dashboard" class="flex items-center space-x-2">
          <!-- hide Img -->
          <img src="/assets/img/qbook/qbook.png" alt="Logo" class="h-auto rounded-full w-28" />
           <!-- <p>QBook</p> -->
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


      <!-- <p>granted: {{ userStore.loggedUser.granted }}</p> -->
      <nav class="p-4">
        <account @close-sidebar="$emit('close-sidebar')"/>
        <invoice @close-sidebar="$emit('close-sidebar')"/>
        <router-link to=""
            
            class="flex items-center px-3 py-2 text-black rounded hover:text-black hover:bg-white transition-all duration-200"
            @click="$emit('close-sidebar')">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7h16M4 12h8m-8 5h16"
              />
            </svg>
            <span>Reports</span>
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>

<script>
// import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/stores/modules/userStore';
import invoice from './sideMeanu/invoice.vue';
import account from './sideMeanu/account.vue';

export default {
  props: ['isOpen'],

  components: {
    invoice,account
  },

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
