<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useShopStore } from '~/stores/modules/Q-Appts/shops'

const route = useRoute()
const shopStore = useShopStore()

// get shop id from route
const id = Number(route.params.id)
const shop = shopStore.shops.find(s => s.id === id)

definePageMeta({
  //name: 'booking-id' , // MUST match the router.push name
  layout: 'appts',
})


// fallback if shop not found
if (!shop) {
  throw createError({ statusCode: 404, statusMessage: 'Shop not found' })
}
</script>

<template>
  <div class="bg-blue-50 max-w-6xl mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="flex items-center text-sm text-gray-500 mb-4 gap-2">
      <NuxtLink to="/" class="text-blue-600 hover:underline">← Back to salons</NuxtLink>
      <span>/</span>
      <span class="font-medium text-gray-700">{{ shop.name }}</span>
    </div>

    <!-- Header card -->
    <div
      class="bg-white rounded-2xl shadow p-4 md:p-6 flex flex-col md:flex-row gap-6"
    >
      <!-- Shop image -->
      <div class="w-28 h-28 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-gray-100 mx-auto md:mx-0">
        <img :src="shop.image" alt="logo" class="w-full h-full object-cover" />
      </div>

      <!-- Details -->
      <div class="flex-1 grid md:grid-cols-2 gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold">{{ shop.name }}</h1>
            <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Open now</span>
          </div>
          <div class="flex flex-wrap gap-2 text-gray-600 mt-1 text-sm">
            <div class="flex items-center gap-1">⭐ {{ shop.rating }}</div>
            <span>·</span>
            <span>{{ shop.gender === 'unisex' ? 'Unisex Salon' : shop.gender === 'male' ? 'Men only' : 'Women only' }}</span>
            <span>·</span>
            <span>{{ shop.distance }} away</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">Open hours: {{ shop.openingHours }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <button class="flex-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm">
              📞 Call
            </button>
            <button class="flex-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm">
              🧭 Directions
            </button>
          </div>
          <button class="w-full px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold">
            Get Queue Number
          </button>
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid md:grid-cols-3 gap-6 mt-6">
      <!-- Left content -->
      <div class="md:col-span-2 space-y-6">
        <!-- Services -->
        <div class="bg-white rounded-2xl shadow p-4">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold text-gray-800">Select Service</h2>
            <p class="text-sm text-gray-500">Customize before joining queue</p>
          </div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div
              v-for="srv in [{name:'Haircut',duration:30,price:15},{name:'Shave',duration:20,price:10}]"
              :key="srv.name"
              class="p-4 border rounded-xl hover:border-blue-500 cursor-pointer transition"
            >
              <div class="font-medium">{{ srv.name }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ srv.duration }} min · ${{ srv.price }}</div>
            </div>
          </div>
        </div>

        <!-- Queue -->
        <div class="bg-white rounded-2xl shadow p-4 grid sm:grid-cols-2 gap-4">
          <div>
            <h2 class="font-semibold text-gray-800 mb-2">Queue Status</h2>
            <div class="p-4 border rounded-lg bg-gray-50">
              <div class="flex justify-between">
                <div>
                  <p class="text-xs text-gray-500">Now Serving</p>
                  <p class="text-2xl font-bold">#{{ shop.ongoingNumber }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Your Wait</p>
                  <p class="text-2xl font-bold">~{{ shop.wait }} min</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-2">Estimated start: <span class="font-medium">3:15 PM</span></p>
            </div>
          </div>
          <div>
            <h2 class="font-semibold text-gray-800 mb-2">Ahead in line</h2>
            <div class="p-4 border rounded-lg bg-gray-50 text-sm">
              <p class="text-gray-600">2 waiting for Haircut</p>
              <p class="text-gray-600">1 waiting for Shave</p>
              <div class="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <input type="checkbox" class="rounded border-gray-300" />
                Notify me when I'm next
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="bg-white rounded-2xl shadow p-4">
          <div class="flex justify-between items-center mb-3">
            <h2 class="font-semibold">Reviews</h2>
            <div class="flex gap-2">
              <button class="p-1 rounded-full border bg-gray-100">‹</button>
              <button class="p-1 rounded-full border bg-gray-100">›</button>
            </div>
          </div>
          <div class="p-4 border rounded-lg text-sm">
            <p class="font-semibold">Maria</p>
            <p class="text-yellow-500">★★★★★</p>
            <p class="text-gray-600 mt-1">Best cut I've had in years!</p>
            <p class="text-xs text-gray-400 mt-1">July 30, 2025</p>
          </div>
        </div>

        <!-- Gallery -->
        <div class="bg-white rounded-2xl shadow p-4">
          <h2 class="font-semibold mb-3">Gallery</h2>
          <div class="grid grid-cols-3 gap-2">
            <img v-for="n in 3" :key="n"
              :src="`https://via.placeholder.com/200x150?text=${n}`"
              class="rounded-lg object-cover w-full h-24 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="space-y-6">
        <!-- Customer Info -->
        <div class="bg-white rounded-2xl shadow p-4">
          <h2 class="font-semibold mb-2">Your Info</h2>
          <form class="space-y-3 text-sm">
            <div>
              <label class="block text-xs font-medium">Name *</label>
              <input type="text" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Full name"/>
            </div>
            <div>
              <label class="block text-xs font-medium">Phone *</label>
              <input type="tel" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="+94 77 1234567"/>
            </div>
            <div>
              <label class="block text-xs font-medium">Profile (optional)</label>
              <input type="file" class="w-full text-xs"/>
            </div>
          </form>
        </div>

        <!-- Summary -->
        <div class="bg-white rounded-2xl shadow p-4 text-sm">
          <h2 class="font-semibold mb-2">Summary</h2>
          <p><strong>Service:</strong> Haircut</p>
          <p><strong>Duration:</strong> 30 min</p>
          <p><strong>Price:</strong> $15</p>
          <p><strong>Wait:</strong> ~{{ shop.wait }} min</p>
          <p><strong>Start:</strong> 3:15 PM</p>
          <p class="text-xs text-gray-500 mt-2">You will receive a confirmation after booking. No-shows may lose spot.</p>
        </div>
      </div>
    </div>
  </div>
</template>
