<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center w-80">
      <p class="mb-4 text-lg font-semibold">{{ message }}</p>
      <button
        @click="goHome"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  message: {
    type: String,
    default: 'Action completed successfully!'
  }
})

const router = useRouter()

const goHome = () => {
  router.push('/Q-Appts') // Navigates to Home page
}
</script>
