<!-- components/Q-Appts/SalonCard.vue -->
 <!-- <section class="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="salon in salonStore.salons" :key="salon.id" class="bg-white rounded shadow p-2">
        <img :src="salon.image" alt="salon" class="rounded w-full h-36 object-cover" />
        <div class="p-2">
          <h3 class="font-semibold">{{ salon.name }}</h3>
          <p class="text-sm text-gray-500">📍 {{ salon.distance }} away</p>
          <p class="text-sm text-yellow-500">⭐ {{ salon.rating }}</p>
          <p class="text-sm text-blue-500">🕒 {{ salon.wait }} wait</p>
          <div class="mt-2 flex gap-2">
            <button class="bg-gray-800 text-white px-3 py-1 text-sm rounded">View</button>
            <button class="bg-blue-500 text-white px-3 py-1 text-sm rounded">Join</button>
          </div>
        </div>
      </div>
    </section> -->
<template>
  <section class="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="salon in salonStore.salons" :key="salon.id" class="bg-white rounded shadow p-2">
        <img :src="salon.image" alt="salon" class="rounded w-full h-36 object-cover" />
        <div class="p-2">
          <h3 class="font-semibold">{{ salon.name }}</h3>
          <p class="text-sm text-gray-500">📍 {{ salon.distance }} away</p>
          <p class="text-sm text-yellow-500">⭐ {{ salon.rating }}</p>
          <p class="text-sm text-blue-500">🕒 {{ salon.wait }} wait</p>
          <div class="mt-2 flex gap-2">
            <button class="bg-gray-800 text-white px-3 py-1 text-sm rounded">View</button>
            <button class="bg-blue-500 text-white px-3 py-1 text-sm rounded">Join</button>
          </div>
        </div>
      </div>
    </section>
  <!-- div class="bg-white rounded-xl shadow p-4">

    <img :src="salon.image" alt="salon" class="rounded-lg w-full h-48 object-cover" />
    <h2 class="text-xl font-bold mt-3">{{ salon.name }}</h2>
    <p class="text-base text-gray-700 mt-1">⭐ {{ salon.rating }} | ⏱️ {{ salon.wait }}</p>
    <p class="text-sm text-gray-500 mt-1">📍 {{ salon.distance }}</p>
    <div class="flex gap-3 mt-5">
      <NuxtLink
        :to="`/salon/${salon.id}`"
        class="bg-blue-500 text-white px-5 py-2 text-base font-medium rounded hover:bg-blue-600 transition"
      >
        View
      </NuxtLink>
      <button
        class="bg-green-500 text-white px-5 py-2 text-base font-medium rounded hover:bg-green-600 transition"
      >
        Book
      </button>
    </div>
  </div> -->
</template>

<script setup>
defineProps({
  salon: Object
})
</script>
