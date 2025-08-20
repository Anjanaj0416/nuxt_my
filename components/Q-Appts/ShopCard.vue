<!-- components/Q-Appts/ShopCard.vue -->

<template>
  <div class="bg-white rounded shadow p-2">
    <img :src="shop.image" alt="shop" class="rounded w-full h-36 object-cover" />
    <div class="p-2">
      <h3 class="font-semibold">{{ shop.name }}</h3>
      <p class="text-sm text-gray-500">📍 {{ shop.district}},{{ shop.city }}</p>
      <p class="text-sm text-gray-500">👣 {{shop.distance}} away</p>
      <p class="text-sm text-yellow-500">⭐ {{ shop.rating }}</p>
      <p class="text-sm text-blue-500">🕒 {{ shop.wait }} wait</p>
      
      <div class="mt-2 flex gap-2">
        <button class="bg-gray-800 text-white px-3 py-1 text-sm rounded">View</button>
        <button @click="bookShop" class="bg-blue-500 text-white px-3 py-1 text-sm rounded">Book</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  shop: Object
})

const bookShop = () => {
  router.push({
    name: 'booking-id', // route name defined in pages/booking/[id].vue
    params: { id: props.shop.id },
    query: { name: props.shop.name, 
      image: props.shop.image,
      address: props.shop.address,
      contact: props.shop.contact,
      openingHours: props.shop.openingHours,
      ongoingNumber: props.shop.ongoingNumber,
      avgtime: props.shop.avgtime,
      distance: props.shop.distance,
      
    }
  })
}

</script>
