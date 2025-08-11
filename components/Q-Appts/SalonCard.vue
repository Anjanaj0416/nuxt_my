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
  <div class="bg-white rounded shadow p-2">
    <img :src="salon.image" alt="salon" class="rounded w-full h-36 object-cover" />
    <div class="p-2">
      <h3 class="font-semibold">{{ salon.name }}</h3>
      <p class="text-sm text-gray-500">📍 {{ salon.distance }} away</p>
      <p class="text-sm text-yellow-500">⭐ {{ salon.rating }}</p>
      <p class="text-sm text-blue-500">🕒 {{ salon.wait }} wait</p>
      <div class="mt-2 flex gap-2">
        <button class="bg-gray-800 text-white px-3 py-1 text-sm rounded">View</button>
        <button @click="bookSalon" class="bg-blue-500 text-white px-3 py-1 text-sm rounded">Book</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  salon: Object
})

const bookSalon = () => {
  router.push({
    name: 'booking-id', // route name defined in pages/booking/[id].vue
    params: { id: props.salon.id },
    query: { name: props.salon.name, 
      image: props.salon.image,
      address: props.salon.address,
      contact: props.salon.contact,
      openingHours: props.salon.openingHours,
      ongoingNumber: props.salon.ongoingNumber,
      avgtime: props.salon.avgtime,
      distance: props.salon.distance,
      
    }
  })
}

</script>
