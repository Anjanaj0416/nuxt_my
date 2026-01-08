<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 w-64 bg-green-500 text-white
           transform -translate-x-full peer-checked:translate-x-0
           transition-transform duration-300
           sm:static sm:translate-x-0 rounded-r-3xl"
  >
    <div class="flex flex-col h-full">
      <div class="h-20 flex items-center justify-between px-6 ">
        <!-- <span class="text-xl font-bold">Appts.lk</span> -->
        <img
          src="/assets/img/appts//mLabsLogo.png"
          alt="MiracleSoft Logo"
          class="w-full h-12 rounded-full object-contain bg-white p-1"
        />
        <label for="menu-toggle" class="sm:hidden text-2xl cursor-pointer">✕</label>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 text-sm">
        <dailyTasks  @close-sidebar="$emit('close-sidebar')"/>
        <viewEdit @close-sidebar="$emit('close-sidebar')"/>
        <reports @close-sidebar="$emit('close-sidebar')"/>
        <system @close-sidebar="$emit('close-sidebar')"/>
      </nav>
      <div class="mt-auto px-6 py-4 border-t border-white/20">
    <div class="flex items-center gap-3">
      <img
        src="/assets/img/appts/miracalsoftware.jpg"
        alt="MiracleSoft Logo"
        class="w-16 h-8 rounded-full object-contain bg-white p-1"
      />
      <div class="text-sm">
        <p class="font-semibold">MiracleSoft</p>
        <p class="text-xs text-white/80">Developed by</p>
      </div>
    </div>
    </div>
    </div>
  </aside>
</template>

<script>
// import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/stores/modules/userStore';

import dailyTasks from './sidemanue/dailyTasks.vue';
import viewEdit from './sidemanue/view.vue';
import reports from './sidemanue/reports.vue';
import system from './sidemanue/system.vue';

export default {
  props: ['isOpen'],

  components: {
    dailyTasks,
    viewEdit,
    reports,
    system
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

<style scoped>
.menu-item {
  @apply flex items-center gap-3 px-4 py-2 rounded-lg
         hover:bg-purple-700 transition;
}
</style>
