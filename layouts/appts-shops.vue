<!-- layouts/appts-dashboard.vue -->
<template>
  <div class="flex min-h-screen bg-blue-50">
    <!-- Sidebar -->
    <aside class="w-60 bg-white shadow-lg flex flex-col justify-between">
      <div>
        <!-- Brand -->
        <div class="p-6 text-2xl font-bold text-blue-600">Q-Appts</div>

        <!-- Menu -->
        <nav class="flex flex-col gap-2 mt-4">
          <NuxtLink
            to="/Q-Appts/dashboard"
            class="flex items-center gap-3 px-6 py-3 rounded-lg font-medium"
            exact-active-class="bg-blue-100 text-blue-600"
          >
            <i class="fas fa-home"></i> Dashboard
          </NuxtLink>

          <NuxtLink
            to="/Q-Appts/queue"
            class="flex items-center gap-3 px-6 py-3 rounded-lg font-medium"
            exact-active-class="bg-blue-100 text-blue-600"
          >
            <i class="fas fa-user"></i> Queue
          </NuxtLink>

          <NuxtLink
            to="/Q-Appts/report"
            class="flex items-center gap-3 px-6 py-3 rounded-lg font-medium"
            exact-active-class="bg-blue-100 text-blue-600"
          >
            <i class="fas fa-chart-bar"></i> Report
          </NuxtLink>

          <NuxtLink
            to="/Q-Appts/page"
            class="flex items-center gap-3 px-6 py-3 rounded-lg font-medium"
            exact-active-class="bg-blue-100 text-blue-600"
          >
            <i class="fas fa-file-alt"></i> Page
          </NuxtLink>
        </nav>
      </div>

      <!-- Logout -->
      <div class="p-4">
        <button
          class="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
        >
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col p-6 space-y-6">
      <slot />
    </main>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
