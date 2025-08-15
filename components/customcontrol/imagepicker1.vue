<template>
  <!-- Usercase of imagepicker1

 import imagepicker1 from "../customcontrol/imagepicker1.vue";


 <imagepicker1
                :existingImagePath="imageroot + hrStore.empdetails.imageUrl"
                @deleteExistingImage="hrStore.empdetails.image=null"
                @GetSelectedImage="GetSelectedImageFile"
                ref="refImage"
              /> 


              
                  GetSelectedImageFile(file) {     
                  this.hrStore.empdetails.image = file;                  
                },
              
              this.imageroot = this.userStore.loggedUser.resourceURLRoot;
              
              -->

  <div>
    <!-- <label class="block mb-2 text-sm font-bold text-gray-600">{{ label }}</label> -->

    <div
      class="relative flex flex-col items-center justify-center p-6 transition border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      @click="triggerFileInput">
      <input ref="fileInput" type="file" accept="" class="hidden" @change="handleFileChange" />

      <!-- New image preview -->
      <div v-if="imagePreview" class="relative w-full">
        <img :src="imagePreview" class="object-cover w-full h-24 rounded-lg" />
        <button class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded top-2 right-2 hover:bg-red-600"
          @click.stop="removeImage">
          Delete
        </button>
      </div>

      <!-- Existing image if no preview -->
      <div v-else-if="existingImage" class="relative w-full">
        <img :src="existingImage" class="object-cover w-full h-24 rounded-lg" />
        <button class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded top-2 right-2 hover:bg-red-600"
          @click.stop="deleteExistingImage">
          Delete
        </button>
      </div>

      <!-- Placeholder UI -->
      <div v-else class="flex flex-col items-center justify-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l3-3 4 4 8-8 5 5" />
        </svg>
        <p class="text-sm">Click to upload an image</p>
      </div>
    </div>

    <p v-if="validationError" class="mt-2 text-sm text-red-600">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits(["GetSelectedImage", "deleteExistingImage"]);

const props = defineProps({
  // modelValue: File,
  existingImagePath: String,
  validationError: String,
  label: {
    type: String,
    default: "Upload Image",
  },
});

const fileInput = ref(null);
const imagePreview = ref(null);
const existingImage = ref(props.existingImagePath);

watch(
  () => props.existingImagePath,
  (newPath) => {
    existingImage.value = newPath;
  }
);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(event) {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    // console.log("Selected File:", selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(selectedFile);
    emit("GetSelectedImage", selectedFile);
  }
}

function removeImage() {
  imagePreview.value = null;
  fileInput.value.value = null;
  emit("deleteExistingImage");
}

function deleteExistingImage() {
  existingImage.value = null;
  emit("deleteExistingImage");
}
</script>

<style scoped>
img {
  transition: all 0.3s ease-in-out;
}
</style>

<!-- <div>
    <label class="block text-sm font-bold text-gray-600">Vendor Image</label>
    <div class="relative mt-2">
      <ImagePicker
        :existingImagePath="imageroot + curVendor.vendorImage"
        v-model="selectedVendorImage"
        @file-changed="GetSelectedVendorImage"
        @delete-existing="curVendor.vendorImage = ''"
        :validationError="err.vendorImage"
        label="Vendor Image"
      />
    </div>
  </div>
  
 
  <div>
    <label class="block text-sm font-bold text-gray-600">Shop Logo</label>
    <div class="relative mt-2">
      <ImagePicker
        :existingImagePath="imageroot + curVendor.shopLogo"
        v-model="selectedShopLogo"
        @file-changed="GetSelectedShopImage"
        @delete-existing="curVendor.shopLogo = ''"
        :validationError="err.shopLogo"
        label="Shop Logo"
      />
    </div>
  </div>
  
  
  <div>
    <label class="block text-sm font-bold text-gray-600">Shop Cover Image</label>
    <div class="relative mt-2">
      <ImagePicker
        :existingImagePath="imageroot + curVendor.shopCoverImage"
        v-model="selectedShopCoverImage"
        @file-changed="GetSelectedShopCoverImage"
        @delete-existing="curVendor.shopCoverImage = ''"
        :validationError="err.shopCoverImage"
        label="Shop Cover Image"
      />
    </div>
  </div>
  
 
  <div>
    <label class="block text-sm font-bold text-gray-600">BR</label>
    <div class="relative mt-2">
      <ImagePicker
        :existingImagePath="imageroot + curVendor.brCopy"
        v-model="selectedBRCopy"
        @file-changed="GetSelectedBRCopy"
        @delete-existing="curVendor.brCopy = ''"
        :validationError="err.brCopy"
        label="BR Copy"
      />
    </div>
  </div> -->
