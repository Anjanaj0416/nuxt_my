<!--
imaportant - Camera Works after hosted with https connection only

Usage :
import imagecomp from "~/components/customcontrol/imagepicker";

 <imagecomp
                  v-model="category.image"
                  caption="Category Image"                  
                     :image_file="'category/'+salesref.image"
                  @ImageChanged="ImageChanged"
                   ref="refImg"
                />

 components: {
    imagecomp,
  },

  Data- 
  ------------------
     imagechanged: false,
      imageroot: process.env.Assets,
      Uploading_image_details: {
        image_file: '',
      },
  }

  mutation 
  -----------------
    getSaveImage: 'category/getSaveImage',

    method -
    ------------------ 
     ImageChanged(ischanged) {
      this.imagechanged = ischanged
    },

    
     async Save() {
      if (this.formValidate() && confirm('Sure to save this record?')) {
        if (this.imagechanged) {
          await this.getSaveImage(this.Uploading_image_details)
        }
        await this.getSave(this.category)
      }
    },

    setNewUser /setEdit - 
	this.$refs.refImg.initImage();
  -->
  

<template>
  <article>
    <div class="container">
      <p class="block text-sm text-gray-00">{{ caption }}</p>
      <div class="flex w-40">
        <div
          class="bg-blue-400 p-2 rounded-l cursor-pointer text-sm"
          @click="InitCamera"
          title="Attach By Camera"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div
          class="bg-green-400 p-2 rounded-r cursor-pointer text-sm"
          @click="cmdFromFile"
          title="Attach Files"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>
      <!-- From File Section -->
      <div
        class="mt-2 rounded border-2 p-2 w-64 h-36 border-blue-800"
        v-if="isFromFile"
      >
        <p class="overflow-hidden mb-2">
          <input
            type="file"
            ref="file"
            accept="image/jpeg,image/gif,image/png,application/pdf,application/PDF"
            class="text-sm"
            @change="InituploadImage"
          />
          <input type="text" id="img64" class="text-white" @blur="bindImage" />
        </p>
      </div>
      <!-- End File Section -->

      <!-- Camera Section -->
      <div
        class="
          absolute
          left-0
          top-0
          w-screen
          h-screen
          bg-white
          text-center
          border-2 border-blue-800
          rounded
          mt-2
        "
        v-if="isCameraOn"
      >
        <div class="h-full rounded p-2 mb-2">
          <video ref="video" id="video" class="mx-auto" autoplay></video>
          <canvas
            ref="canvas"
            id="canvas"
            hidden
            width="640"
            height="480"
          ></canvas>

          <button
            class="
              bg-blue-800
              border-blue-800 border-2
              p-1
              mt-2
              text-sm text-white
              rounded
            "
            @click="capture"
          >
            Capture
          </button>
          <button
            class="
              bg-white
              border-blue-800 border-2
              p-1
              mt-2
              text-sm text-blue-800
              rounded
            "
            @click="isCameraOn = false"
          >
            Cancel
          </button>
        </div>
      </div>
      <!--End Camera Section -->
      <div class="mt-2">
        <!-- <img v-if="image_url.indexOf('blob')==0" class="w-20 h-20" :src="image_url" /> -->
        <!-- <img class="w-20 h-20" :src="image_url" /> -->
        <!-- {{image_url}} -->
        <!-- <img v-show="image_url.indexOf('blob')!=0" class="h-20 h-20" :src="imageroot+'/'+image_file" /> -->
      </div>
    </div>
    <div class="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
      <div v-for="img_url in arr_image_url" :key="img_url" class="relative">        
        <div  class="absolute top-0 -m-4  left-0 cursor-pointer text-white hover:text-red-600" @click="removefile(img_url.filename)" ><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></div>
        <!-- <img  class="w-20 h-20" :src="img_url" />  -->
        <img
          class="w-20 h-20"
          :src="
            img_url.filename.toLowerCase().indexOf('.pdf') > -1
              ? imageroot_83 + '/Resource/sltds/images/pdf.jpg'
              : (img_url.filename.toLowerCase().indexOf('.png') > -1 ||
               img_url.filename.toLowerCase().indexOf('.PNG') > -1 ||
               img_url.filename.toLowerCase().indexOf('.JPG') > -1 ||
               img_url.filename.toLowerCase().indexOf('.jpeg') > -1 ||
                img_url.filename.toLowerCase().indexOf('.jpg') > -1)
              ? img_url.filedata
              : imageroot_83 + '/Resource/sltds/images/file.png'
          "
        />
        <div class="text-sm truncate">{{ img_url.filename }}</div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['caption', 'image_file'],
  data() {
    return {
      image_url: '',
      filename: '',
      arr_image_url: [],
      arr_image_url_Toupload: [],
      isFromFile: false,
      imageByCamera: false,
      isCameraOn: false,

      video: {},
      canvas: {},
      imageroot_83: process.env.Assets_83,
    }
  },

  methods: {
    bindImage() {
      this.image_file = document.getElementById('img64').value
      this.arr_image_url.push({
        filename: this.filename,
        filedata: this.image_url,
      })
      this.arr_image_url_Toupload.push({
        filename: this.filename,
        filedata: this.image_file,
      })

      this.$emit('input', this.arr_image_url_Toupload)
      this.isFromFile = false
    },
    removefile(filename){      
      var index =  this.arr_image_url.findIndex(f=>f.filename==filename);      
      this.arr_image_url.splice(index,1)
    },
    cmdFromFile() {
      this.imageByCamera = false
      this.isCameraOn = false
      this.isFromFile = true
    },
    CaptureImage() {
      //this.isCameraOn = false;
    },
    mounted() {
      
      this.InitCamera()
    },

    refresh() {
      this.arr_image_url = []
      this.arr_image_url_Toupload = []
      this.$emit('ImageChanged', false)
    },

    InitCamera() {
      this.imageByCamera = true
      this.isCameraOn = true
      this.video = this.$refs.video

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
          })
          .then((stream) => {
            video.srcObject = stream
          })
      }
    },

    camera(face) {
      this.stop()
      this.gum(face)
    },
    stop() {
      return video.srcObject && video.srcObject.getTracks().map((t) => t.stop())
    },
    gum(face) {
      this.video = this.$refs.video

      if (face === 'user') {
        return navigator.mediaDevices
          .getUserMedia({ video: { facingMode: face } })
          .then((stream) => {
            video.srcObject = stream
            this.localstream = stream
          })
      }
      if (face === 'environment') {
        return navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: face } } })
          .then((stream) => {
            video.srcObject = stream
            this.localstream = stream
          })
      }
    },
    changeCam(face) {
      this.face = face
      this.camera(this.face)
    },

    capture() {
      this.InitCamera()

      this.canvas = this.$refs.canvas
      var context = this.canvas
        .getContext('2d')
        .drawImage(this.video, 0, 0, 640, 480)
      this.image_file = canvas.toDataURL('image/png')
      //      .replace('data:image/png;base64,', '')
      //    .replace('data:image/jpeg;base64,', '')

      this.image_url = this.image_file
      this.filename = new Date().getTime() + '.png'
      this.arr_image_url.push({
        filename: this.filename,
        filedata: this.image_url,
      })
      this.arr_image_url_Toupload.push({
        filename: this.filename,
        filedata: this.image_file,
      })

      this.$emit('input', this.arr_image_url_Toupload)
      this.$emit('ImageChanged', true)
      this.isCameraOn = false
    },

    InituploadImage(e) {
      this.file = e.target.files[0]
      this.filename = e.target.files[0].name

      this.image_url = URL.createObjectURL(this.file)
      this.$emit('ImageChanged', true)
      var FR = new FileReader()

      FR.addEventListener('load', function (e) {
        var srcData = e.target.result
        // .replace('data:image/png;base64,', '')
        // .replace('data:image/jpeg;base64,', '')
        document.getElementById('img64').value = srcData
        document.getElementById('img64').focus()
        document.getElementById('img64').blur()
        //alert(srcData);
      })
      FR.readAsDataURL(this.file)
    },
  },
}
</script>
<style scoped>
</style>
