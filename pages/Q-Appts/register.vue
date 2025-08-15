<template>
  <section class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h2 class="text-3xl font-bold text-blue-900 mb-6 text-center">Salon Registration</h2>

    <form @submit.prevent="handleRegister" class="space-y-5">
      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="name">Salon Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Enter salon name"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="contact">Contact Number</label>
        <input
          id="contact"
          v-model="contact"
          type="tel"
          placeholder="Enter 10-digit contact number"
          required
          maxlength="10"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="openingHours">Opening Hours</label>
        <input
          id="openingHours"
          v-model="openingHours"
          type="text"
          placeholder="e.g. 9 AM - 9 PM"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="gender">Gender</label>
        <select
          id="gender"
          v-model="gender"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="address">Address (Select on map)</label>
        <div class="flex space-x-2">
          <input
            id="address"
            v-model="address"
            readonly
            placeholder="Select address from map"
            class="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="openMapPicker"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Pick Location
          </button>
        </div>
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="image">Salon Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          @change="handleImageChange"
          class="w-full"
        />
        <div v-if="imagePreview" class="mt-4 flex justify-center">
          <img
            :src="imagePreview"
            alt="Image Preview"
            class="max-w-xs max-h-40 rounded-md object-contain"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
      >
        Register Salon
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: false,
})

const name = ref('')
const contact = ref('')
const openingHours = ref('')
const gender = ref('')
const address = ref('')
const imageFile = ref(null)
const imagePreview = ref(null)

function openMapPicker() {
  // Simulate map picker with prompt for now
  const dummyAddress = prompt('Enter salon address manually (simulate map pick)')
  if (dummyAddress) address.value = dummyAddress
}

function handleImageChange(event) {
  const file = event.target.files[0]
  if (!file) return
  imageFile.value = file

  const reader = new FileReader()
  reader.onload = e => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function validateContactNumber(number) {
  const regex = /^\d{10}$/
  return regex.test(number)
}

function handleRegister() {
  if (!name.value || !contact.value || !openingHours.value || !gender.value || !address.value) {
    alert('Please fill all fields.')
    return
  }
  if (!validateContactNumber(contact.value)) {
    alert('Please enter a valid 10-digit contact number.')
    return
  }

  alert('Salon registered! You can implement Pinia store update here.')
}
</script>
