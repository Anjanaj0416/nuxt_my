<template>
  <div>
    <div
      class="relative flex flex-col items-center justify-center p-6 transition border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        multiple
        @change="handleFileChange"
      />

      <!-- Preview all selected images -->
      <div v-if="imagePreviews.length > 0" class="grid grid-cols-3 gap-2 w-full">
        <div
          v-for="(img, index) in imagePreviews"
          :key="index"
          class="relative w-full h-24 rounded-lg overflow-hidden"
        >
          <img :src="img.url" class="object-cover w-full h-full rounded-lg" />
          <button
            class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded top-2 right-2 hover:bg-red-600"
            @click.stop="removeImage(index)"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- Existing images if no new previews -->
      <div v-else-if="existingImages.length > 0" class="grid grid-cols-3 gap-2 w-full">
        <div
          v-for="(img, index) in existingImages"
          :key="index"
          class="relative w-full h-24 rounded-lg overflow-hidden"
        >
          <img :src="img" class="object-cover w-full h-full rounded-lg" />
          <button
            class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded top-2 right-2 hover:bg-red-600"
            @click.stop="deleteExistingImage(index)"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- Placeholder UI -->
      <div v-else class="flex flex-col items-center justify-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l3-3 4 4 8-8 5 5" />
        </svg>
        <p class="text-sm">Click to upload images</p>
      </div>
    </div>

    <p v-if="validationError" class="mt-2 text-sm text-red-600">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits(["GetSelectedImages", "deleteExistingImage"]);

const props = defineProps({
  existingImagePaths: {
    type: Array,
    default: () => [],
  },
  validationError: String,
  label: {
    type: String,
    default: "Upload Images",
  },
});

const fileInput = ref(null);
const imagePreviews = ref([]);
const existingImages = ref([...props.existingImagePaths]);

watch(
  () => props.existingImagePaths,
  (newPaths) => {
    existingImages.value = [...newPaths];
  }
);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(event) {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreviews.value.push({ file, url: reader.result });
    };
    reader.readAsDataURL(file);
  });

  emit("GetSelectedImages", files);
}

function removeImage(index) {
  imagePreviews.value.splice(index, 1);
  emit("GetSelectedImages", imagePreviews.value.map((i) => i.file));
}

function deleteExistingImage(index) {
  existingImages.value.splice(index, 1);
  emit("deleteExistingImage", index);
}
</script>

<style scoped>
img {
  transition: all 0.3s ease-in-out;
}
</style>
