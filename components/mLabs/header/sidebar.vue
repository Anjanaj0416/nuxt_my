<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 w-64 bg-purple-800 text-white
           border-r border-purple-700
           transform -translate-x-full peer-checked:translate-x-0
           transition-transform duration-300
           sm:static sm:translate-x-0"
  >
    <div class="flex flex-col h-full">
      <div class="h-20 flex items-center justify-between px-6 border-b border-purple-700">
        <span class="text-xl font-bold">TenderB2B.lk</span>
        <label for="menu-toggle" class="sm:hidden text-2xl cursor-pointer">✕</label>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 text-sm">
        <NuxtLink to="/Tender/dashboard" class="menu-item">📊 Dashboard</NuxtLink>
        <NuxtLink to="/Tender/allTender" class="menu-item">📄 Tenders</NuxtLink>
        <NuxtLink class="menu-item">🏢 Companies</NuxtLink>
        <NuxtLink class="menu-item">⭐ Favorites</NuxtLink>
        <NuxtLink class="menu-item">⚙️ Settings</NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.menu-item {
  @apply flex items-center gap-3 px-4 py-2 rounded-lg
         hover:bg-purple-700 transition;
}
</style>
