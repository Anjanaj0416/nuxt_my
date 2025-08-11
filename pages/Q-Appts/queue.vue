<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Queue List</h1>

    <!-- Queue Table for Desktop -->
    <div class="hidden md:block bg-white shadow rounded-lg overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3">Queue No</th>
            <th class="p-3">Customer Name</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in queueList"
            :key="item.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="p-3 font-semibold">#{{ item.number }}</td>
            <td class="p-3">{{ item.name }}</td>
            <td class="p-3">
              <span
                :class="statusClass(item.status)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile View (Cards) -->
    <div class="grid gap-4 md:hidden">
      <div
        v-for="item in queueList"
        :key="item.id"
        class="bg-white shadow rounded-lg p-4 flex justify-between items-center"
      >
        <div>
          <p class="text-lg font-bold">#{{ item.number }}</p>
          <p class="text-gray-600">{{ item.name }}</p>
        </div>
        <span
          :class="statusClass(item.status)"
          class="px-2 py-1 text-xs font-medium rounded-full"
        >
          {{ item.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'appts-shops'
})

const queueList = [
  { id: 1, number: 1, name: "John Doe", status: "served" },
  { id: 2, number: 2, name: "Jane Smith", status: "served" },
  { id: 3, number: 3, name: "Michael Brown", status: "skipped" },
  { id: 4, number: 4, name: "Sarah Lee", status: "ongoing" },
];

const statusClass = (status) => {
  switch (status) {
    case "ongoing":
      return "bg-yellow-100 text-yellow-800";
    case "served":
      return "bg-green-100 text-green-800";
    case "skipped":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<style scoped>
/* Optional: subtle shadow effect for cards */
</style>
