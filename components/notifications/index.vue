<template>
  <div class="relative">
    <!-- Notification Button -->
    <button
      @click="toggleDropdown"
      class="relative flex items-center justify-center w-12 h-12 
             hover:scale-110 transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-7 h-7 text-white">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
            a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
            C7.67 6.165 6 8.388 6 11v3.159
            c0 .538-.214 1.055-.595 1.436L4 17h5m6 0
            a3 3 0 11-6 0h6z" />
      </svg>

      <!-- Notification Badge -->
      <span
        v-if="orderStore.notifications && orderStore.notifications.length"
        class="absolute -top-0 -right-1 flex items-center justify-center 
              w-5 h-5 text-[12px] font-bold text-white bg-red-500 
              rounded-full shadow-md">
        {{ orderStore.notifications.length }}
      </span>

    </button>

    <!-- Dropdown -->
    <transition name="fade-scale">
      <div v-if="isOpen"
        class="absolute right-0 mt-3 w-96 bg-white 
               rounded-2xl shadow-2xl overflow-hidden z-50">
        <div class="p-4 border-b">
          <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
        </div>

        <!-- {{ userName }} -->

        <!-- <a class="underline" href="/qms/vendor/leads?id=cb5eaaa8-1113-4699-4de2-08de0ad24517">Lead Link</a><br></br> -->
        <!-- <a class="underline" href="/workFlow?id=wf001">KPI Link</a> -->
        <!-- {{ orderStore.notifications }} -->
        <ul class="max-h-60 overflow-y-auto">
          <li 
            v-for="note in orderStore.notifications" 
            :key="note.Id"
            @click="handleClick(note)"
            class="px-4 py-3 hover:bg-gray-100 transition flex items-start gap-3 border-b last:border-none cursor-pointer"
          >

            <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            <div>
              <p class="text-sm font-semibold text-gray-800">
                {{ note.notificationType }}
              </p>
              <p class="text-sm text-gray-600">
                {{ note.message }}
              </p>
              <p v-if="note.comment" class="text-xs text-gray-500 italic">
                {{ note.comment }}
              </p>
              <p v-if="note.dayPending" class="text-xs text-gray-700">
                Pending:
                <span 
                  :class="[ 
                    'ml-1 px-2 py-0.5 rounded-full font-semibold', 
                    note.dayPending > 3 ? 'bg-red-500 text-white' : 'bg-yellow-200 text-yellow-900' 
                  ]">
                  {{ note.dayPending }} day<span v-if="note.dayPending > 1">s</span>
                </span>
              </p>
            </div>
          </li>
          <li 
            v-if="!orderStore.notifications.length"
            class="px-4 py-5 text-center text-sm text-gray-500"
          >
            No notifications
          </li>
        </ul>

        <!-- <div class="p-3 text-center">
          <button 
            @click="$emit('viewAll')"
            class="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
            View All
          </button>
        </div> -->
      </div>
    </transition>
  </div>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore'
import { useOrderStore } from '~/stores/modules/orderStore'

export default {
  props: { userName: String },
  data() {
    return {
      userStore: null,
      orderStore: null,
      isOpen: false,
      notifications: [],
    }
  },

  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();
    await this.orderStore.GetNotifications(this.userName, this.showLoading);

  

  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },

    handleClick(note) {
      this.isOpen = false;
      if (!note.link) return;
      window.open(note.link, "_blank");
    }

  },

}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
