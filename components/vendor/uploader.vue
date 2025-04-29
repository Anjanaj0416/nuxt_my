<template>
    <div>
      <label class="block mb-2 text-sm font-bold text-gray-600">Vendor Image</label>
  
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
          id="fattached"
        />
  
        <div v-if="imagePreview" class="w-full">
          <img :src="imagePreview" alt="Uploaded Image" class="object-cover w-full h-48 rounded-lg" />
        </div>
  
        <div v-else class="flex flex-col items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l3-3 4 4 8-8 5 5" />
          </svg>
          <p class="text-sm">Click to upload an image</p>
        </div>
      </div>
  
      <p v-if="validationErrors.vendorImage" class="mt-2 text-sm text-red-600">
        {{ validationErrors.vendorImage }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue'
  
  const fileInput = ref(null)
  const imagePreview = ref(null)
  
  // Props for validation errors
  const props = defineProps({
    validationErrors: {
      type: Object,
      default: () => ({})
    }
  })
  
  const file = ref(null)
  const attachedfile = ref('')
  
  // Trigger file input click event
  function triggerFileInput() {
    fileInput.value.click()
  }
  
  // Handle file change event and show image preview
  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      file.value = selectedFile
      attachedfile.value = selectedFile.name  // Set the file name to attachedfile
  
      const reader = new FileReader()
      reader.onload = () => {
        imagePreview.value = reader.result  // Set the preview image
        emitFileChanged()
      }
      reader.readAsDataURL(file.value)
    }
  }
  
  // Emit file change
  function emitFileChanged() {
    if (attachedfile.value !== '') {
      // Emit the file or image data to the parent component
      this.$emit('input', attachedfile.value)
      this.$emit('FileChanged')
    } else {
      alert('No file selected')
    }
  }
  
  // Clear the uploaded file (if needed)
  function clearfilecomp() {
    imagePreview.value = null
    attachedfile.value = ''
    this.$refs.fileInput.value = null
  }
  </script>
  
  <style scoped>
  /* Optional: Make it a bit smoother */
  img {
    transition: all 0.3s ease-in-out;
  }
  </style>
  