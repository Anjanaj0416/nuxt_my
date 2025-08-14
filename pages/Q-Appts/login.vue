<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-blue-900 mb-6 text-center">Salon Admin Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>

      <p class="mt-6 text-center text-gray-600">
        Don't have an account?
        <NuxtLink to="/salon-register" class="text-blue-600 hover:underline">Register here</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref('')

const router = useRouter()

function handleLogin() {
  if (!email.value || !password.value) {
    alert('Please fill all fields')
    return
  }
  alert(`Logged in with email: ${email.value}`)
  // TODO: add real authentication logic here or Pinia store integration
  router.push('/Q-Appts/dashboard')
}
</script>

<style scoped>
/* You can add scoped styles if needed */
</style>
