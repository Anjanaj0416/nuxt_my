<template>
  <div>
    <div
      class="relative flex flex-wrap p-4 border-2 border-dashed rounded-lg gap-2 cursor-pointer hover:bg-gray-50 min-h-[100px] justify-center items-center"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        class="hidden"
        multiple
        @change="handleFileChange"
      />

      <!-- Show placeholder if no files -->
      <div v-if="filePreviews.length === 0" class="flex flex-col items-center justify-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l3-3 4 4 8-8 5 5" />
        </svg>
        <p class="text-sm">Click to upload</p>
      </div>

      <!-- File Previews -->
      <div
        v-for="(file, index) in filePreviews"
        :key="index"
        class="relative w-32 h-20 rounded overflow-hidden border bg-gray-50 flex items-center justify-center"
      >
        <img
          v-if="file.isImage"
          :src="file.url"
          class="object-cover w-full h-full"
        />
        <div
          v-else
          class="flex flex-col items-center justify-center text-gray-600 text-xs text-center px-1"
        >
          <div class="text-2xl">{{ getFilePlaceholder(file.ext) }}</div>
          <div class="truncate w-full">{{ file.name }}</div>
        </div>

        <!-- Delete Button -->
        <button
          class="absolute top-1 right-1 text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          @click.stop="removeFile(index)"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Validation Error -->
    <p v-if="validationError" class="mt-2 text-sm text-red-600">{{ validationError }}</p>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["GetSelectedImages"]); // match parent

const fileInput = ref(null);
const filePreviews = ref([]);
const validationError = ref("");

// Trigger file input click
function triggerFileInput() {
  fileInput.value?.click();
}

// Handle file selection
function handleFileChange(event) {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const isImage = file.type.startsWith("image/");
    const ext = file.name.split(".").pop().toLowerCase();

    const fileObj = {
      file,
      name: file.name,
      ext,
      isImage,
      url: isImage ? URL.createObjectURL(file) : "",
    };

    filePreviews.value.push(fileObj);
  });

  // Emit selected files to parent
  emit("GetSelectedImages", filePreviews.value.map(f => f.file));

  // Clear input so same files can be re-selected
  fileInput.value.value = null;
}

// Remove file
function removeFile(index) {
  filePreviews.value.splice(index, 1);
  emit("GetSelectedImages", filePreviews.value.map(f => f.file));
}

// Map file extensions to emoji placeholders
function getFilePlaceholder(ext) {
  switch (ext) {
    case "pdf": return "📄";
    case "doc":
    case "docx": return "📝";
    case "xls":
    case "xlsx": return "📊";
    default: return "📁";
  }
}
</script>


<style scoped>
/* Hover zoom effect for images */
img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
