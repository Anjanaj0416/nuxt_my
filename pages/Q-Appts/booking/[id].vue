<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="grid md:grid-cols-3 gap-4">
      <!-- Left: Salon Info -->
      <div class="bg-white rounded shadow p-4">
        <img :src="image" alt="salon" class="w-full h-40 object-cover rounded mb-4" />
        <h2 class="text-lg font-semibold mb-2">Nearby Salons</h2>
        <p class="flex items-center gap-2 text-gray-700">
          <i class="fas fa-map-marker-alt text-red-500"></i>
          {{ address }} • {{ distance }} away
        </p>
        <p class="flex items-center gap-2 text-gray-700">
          <i class="fas fa-phone-alt text-green-600"></i>
          Contact {{ contact }}
        </p>
        <p class="flex items-center gap-2 text-gray-700">
          <i class="fas fa-clock text-blue-500"></i>
          Open {{ openingHours }}
        </p>

        <div class="mt-4 p-3 bg-blue-100 rounded text-center">
          <p class="font-medium">Current Queue Status</p>
          <p class="text-2xl font-bold text-blue-700">#{{ ongoingNumber }}</p>
        </div>

        <div class="mt-2 p-3 bg-blue-100 rounded text-center">
          <p class="font-medium">Average time per Service</p>
          <p class="text-lg font-semibold">~ {{ avgtime }}</p>
        </div>
      </div>

      <!-- Right: Queue Form -->
      <div class="bg-white rounded shadow p-4 md:col-span-2">
        <h2 class="text-xl font-bold mb-4">Get Your Queue number</h2>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" placeholder="Enter full name" class="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Phone Number</label>
            <input type="tel" placeholder="Enter phone number" class="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Profile photo (optional)</label>
            <input type="file" class="w-full border rounded px-3 py-2" />
          </div>

          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="bg-gray-50 p-3 rounded shadow-sm">
              <p class="text-sm">Estimated wait</p>
              <p class="font-semibold text-lg">~ 30 min</p>
              <p class="text-xs text-gray-500">Based on current Queue length</p>
            </div>
            <div class="bg-gray-50 p-3 rounded shadow-sm">
              <p class="text-sm">Estimate Start time</p>
              <p class="font-bold text-lg">3.15 PM</p>
              <p class="text-xs text-gray-500">Auto-assigned from last ticket</p>
            </div>
          </div>

          <div class="bg-blue-100 p-3 rounded text-center">
            <p class="text-2xl font-bold text-blue-600">#25</p>
            <p class="text-sm">Service: Salon</p>
            <p class="text-xs text-gray-600 mt-1">Note: Please arrive 5 min before your start time</p>
          </div>

          <button type="submit" class="bg-blue-600 text-white py-2 w-full rounded">
            Confirm & Get Token
          </button>
        </form>

        <!-- Popup only shown after submit -->
        <MessageBox
          v-if="showPopup"
          message="Registered Successfully! Your Token Number is #25"
          @close="showPopup = false"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MessageBox from '@/components/Q-Appts/MessageBox.vue'
const route = useRoute()

definePageMeta({
  name: 'booking-id' , // MUST match the router.push name
  layout: 'appts',
})

//const id = route.params.id
const name = route.query.name
const image = route.query.image
const address = route.query.address
const contact = route.query.contact
const openingHours = route.query.openingHours
const ongoingNumber = route.query.ongoingNumber
const avgtime = route.query.avgtime
const distance = route.query.distance

//const tokenNumber = ref(null)
const showPopup = ref(false)

function handleSubmit() {
  // Here you would save data or call API
  showPopup.value = true
}

</script>