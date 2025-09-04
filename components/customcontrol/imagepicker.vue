<!--
imaportant - Camera Works after hosted with https connection only

Usage :
import imagecomp from "~/components/customcontrol/imagepicker";

 <imagecomp              
                  :existing_image_path="imageroot+ curVendor.shopLogo"     
                  @deleteExistingImage="curVendor.shopLogo=''"     
                  @GetSelectedImage="GetSelectedShopImage"    
                  ref="refVendorImage"
                />

 components: {
    imagecomp,
  },

  Data- 
  ------------------
    
      imageroot: process.env.Assets,
   
  }
 async created() {   
    this.userStore = useUserStore();    
    this.imageroot =  this.userStore.loggedUser.resourceURLRoot;    
  },
   
    method -
    ------------------ 
    GetSelectedShopImage(image){
      this.curVendor.shopLogo = image;
    }, 
    
   
  -->

<template>
  <article>
    <div class="container">
      <p class="block text-sm text-gray-00">{{ caption }}</p>

      <!-- Selecting Image Section -->
      <div class="w-full p-2 mt-2 border-2 border-blue-800 rounded">
        <p class="mb-2 overflow-hidden">
          <input type="file" ref="fileInput" accept="image/*" class="text-sm" @change="GetSelectImage" />
        </p>
      </div>
      <!-- End  Selecting Image Section-->

      <div v-if="previewImage" class="mt-4">
        <!-- Selected Image -->
        <div class="relative">

          <div class="absolute top-0 right-0 text-red-600 cursor-pointer" @click="removeNewImg" title="remove image">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <img class="w-full h-20" :src="previewImage" />
        </div>
        <!-- End Selected Image -->


        <!-- Exisitng Image -->

        <div class="relative mt-2" v-if="existing_path">

          <div class="absolute top-0 right-0 text-red-600 cursor-pointer" @click="removeExistingImg"
            title="Remove Existing image">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div>
            <a :href="existing_path" target="blank">
              <img class="w-full h-20" :src="existing_path" />
            </a>
          </div>
        </div>
        <!-- End Exisitng Image -->
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ["caption", "existing_image_path"],
  data() {
    return {

      existing_path: this.existing_image_path,
      newSelectedImage: null,
      previewImage: null,
      tempExistingPath: '',

    };
  },
  methods: {
    removeExistingImg() {
      this.tempExistingPath = this.existing_path;
      this.existing_path = null;
      this.$emit("deleteExistingImage");
    },
    removeNewImg() {
      this.newSelectedImage = null;
      this.previewImage = null;
      this.$refs.fileInput.value = '';
      this.existing_path = this.tempExistingPath;
    },
    GetSelectImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.tempExistingPath = this.existing_path;
        this.existing_path = null;
        this.newSelectedImage = file;
        this.previewImage = URL.createObjectURL(file);
        this.$emit("GetSelectedImage", file);
      }
    },

  },
};
</script>
<style scoped></style>
