<!--


Usage :
import fileuploader from "~/components/customcontrol/fileupload";

  components: {fileuploader},

   <fileuploader
                  v-model="fileProductLinks"
                  caption="Attach Product Links Details"                              
                  @FileChanged="GetFileChangedProductLinks"
                  ref="refFile"
                />

    data() {
      return {     
        fileProductLinks:'',      
      }

    methods: {
     GetFileChangedProductLinks(fileProductLinks){
        this.fileProductLinks = fileProductLinks;
     },


  -->

<template>
  <article>
    <div class="my-2">
      <p class="block text-sm bg-transparent text-gray-600">{{ caption }}</p>
      <div class="flex w-40">
        <!-- From File Section -->
        <div class="mt-2 rounded">
          <div class="overflow-hidden mb-2">
            <input
              type="file"
              ref="reffile"
              :accept="fileType"
              class="text-sm"
              @change="getAttach"
            />
          </div>
        </div>
        <!-- End File Section -->
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ["caption", "fileType"],
  data() {
    return {
      file: "",
      attachedfile: "",
      imageroot: process.env.Assets,
    };
  },
  mounted() {},
  methods: {
    getAttach(event) {
      const file = event.target.files[0];
      if (file) {
        this.$emit("FileChanged", file);
      }
    },
  },
};
</script>
<style scoped></style>
