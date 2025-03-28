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
      <p class="block text-sm text-gray-00">{{caption}}</p>
      <div class="flex w-40">
        
        <div
          class="bg-green-400 p-2 rounded-r cursor-pointer text-sm"
          @click="cmdFromFile"
        >Attach File</div>
      </div>
      <!-- From File Section -->
      <div class="mt-2 rounded border-2 p-2 w-64 h-36 border-blue-800" v-if="isFromFile">
        <p class="overflow-hidden mb-2">
          <input type="file" ref="file" accept="image/*" class="text-sm" @change="InituploadImage" />
          <input type="text" id="img64" class="text-white" @blur="bindImage" />
        </p>
      </div>
      <!-- End File Section -->

     
      <div class="mt-2">
        <img v-if="image_url.indexOf('blob')==0" class="w-20 h-20" :src="image_url" />
        <img v-show="image_url.indexOf('blob')!=0" class="h-20" :src="imageroot+'/'+image_file" />
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

      isFromFile: false,
      imageByCamera: false,
      isCameraOn: false,

      video: {},
      canvas: {},
      imageroot: process.env.Assets_83, 
    }
  },
  methods: {
    bindImage() {
      this.image_file = document.getElementById('img64').value
      this.$emit('input', this.image_file)
      this.isFromFile = false
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
      
    },

    initImage(){     
      this.image_url='';
      this.$emit('ImageChanged',false)
    },

    // InitCamera() {
    //   this.imageByCamera = true
    //   this.isCameraOn = true
    //   this.video = this.$refs.video
    //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true, audio: false })
    //       .then((stream) => {
    
    //         video.srcObject = stream
    //       })
    //   }
    // },
    // capture() {
    //   this.InitCamera()
    //   this.canvas = this.$refs.canvas
    //   var context = this.canvas
    //     .getContext('2d')
    //     .drawImage(this.video, 0, 0, 640, 480)
    //   this.image_file = canvas
    //     .toDataURL('image/png')
    //     .replace('data:image/png;base64,', '')
    //     .replace('data:image/jpeg;base64,', '')
    //   this.image_url = this.image_file
    //   this.$emit('input', this.image_file)
    //   this.$emit('ImageChanged',true)
    //   this.isCameraOn = false
    // },

    InituploadImage(e) {      
      this.file = e.target.files[0]
      this.image_url = URL.createObjectURL(this.file)
      this.$emit('ImageChanged',true)
      var FR = new FileReader()

      FR.addEventListener('load', function (e) {
        
        var srcData = e.target.result
          .replace('data:image/png;base64,', '')
          .replace('data:image/jpeg;base64,', '')
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
