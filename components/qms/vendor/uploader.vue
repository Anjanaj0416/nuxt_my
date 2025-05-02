<template>
  <div>
    <label class="block mb-2 text-sm font-bold text-gray-600">{{ label }}</label>
    <div
      class="relative flex flex-col items-center justify-center p-6 transition border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />

      <div v-if="imagePreview" class="relative w-full">
        <img :src="imagePreview" class="object-cover w-full h-24 rounded-lg" />

        <!-- Delete Button -->
        <button
          class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
          @click.stop="removeImage"
        >
          Delete
        </button>
      </div>

      <div v-else class="flex flex-col items-center justify-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l3-3 4 4 8-8 5 5" />
        </svg>
        <p class="text-sm">Click to upload an image</p>
      </div>
    </div>

    <p v-if="validationError" class="mt-2 text-sm text-red-600">{{ validationError }}</p>
  </div>
</template>


  
<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:modelValue', 'file-changed'])

const props = defineProps({
  modelValue: File,
  validationError: String,
  label: {
    type: String,
    default: 'Upload Image'
  }
})

const fileInput = ref(null)
const imagePreview = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileChange(event) {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result
    }
    reader.readAsDataURL(selectedFile)

    emit('update:modelValue', selectedFile)
    emit('file-changed', selectedFile)
  }
}

function removeImage() {
  imagePreview.value = null
  fileInput.value.value = null
  emit('update:modelValue', null)
  emit('file-changed', null)
}
</script>


  
  <style scoped>
  /* Optional: Make it a bit smoother */
  img {
    transition: all 0.3s ease-in-out;
  }
  </style>
  