<!--


Usage :
import fileupload from "~/components/customcontrol/fileupload";


<a :href="fileroot+'/agreement/'+agreement.scannedcopy" target="_blank">{{agreement.scannedcopy}}</a>   

     <fileupload
                  v-model="Uploading_file_details.file"
                  caption="Scan Doc"
                 :attached_file="agreement.scannedcopy"
                 destfolder = "agreement"
                  @FileChanged="FileChanged"
                  ref="refFile"
                />
 components: {
    fileupload,
  },

  Data- 
  ------------------
     filechanged: false,
      fileroot: process.env.Assets,
      Uploading_file_details: {
        file: '',
      },
  }

  mutation 
  -----------------
    getSaveFile: 'category/getSaveFile',

    method -
    ------------------ 
     FileChanged() {
      this.filechanged = true
    },

    
     async Save() {
      if (this.formValidate() && confirm('Sure to save this record?')) {
        if (this.filechanged) {
          await this.getSaveImage(this.Uploading_file_details)
        }
        await this.getSave(this.category)
      }
    },
  -->  

<template>
  <article>
    <div class="">
      
      <p class="block text-sm bg-transparent text-white"> {{caption}}</p>
      <div class="flex w-40">
        <!-- From File Section -->
        <div class="mt-2 rounded  w-64 h-36 ">
          
          <div class="overflow-hidden mb-2">
            <input type="file" ref="reffile" accept="*" class="text-sm" @change="InituploadImage" />
            
            <!-- <div v-show="attached_file" class="mt-4">
            <a :href="imageroot+'/'+destfolder+'/'+attached_file" target="_blank"> 
            <svg class="w-8"
                xmlns="http://www.w3.org/2000/svg"
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
               </a>
          </div> -->

          <button class="border-2 border-gray-600 px-2 text-sm mt-2 bg-gray-500 rounded font-bold" @click="getAttach">Attach</button>  
            
          <input  type="text" id="fattached"  class="bg-transparent  text-transparent border-collapse" @change="bindFile" />
          <input  type="text" id="fExt"  class="bg-transparent  text-transparent border-collapse" />

          
          </div>
        </div>
        <!-- End File Section -->
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['caption'],
  data() {
    return {
      file: '',
      attachedfile: '',
      imageroot: process.env.Assets,
    }  
  },
    mounted() {},
  methods: {
  
    // bindFile() {      
    //   this.attachedfile = document.getElementById('fattached').value                
    //   this.$emit('input', this.attachedfile)
    //   // alert(this.attachedfile)
    // },

    getAttach(){
       
    this.attachedfile = document.getElementById('fattached').value 
     this.attachedfileExt = document.getElementById('fExt').value 
   
    if(this.attachedfile!='') {              
      this.$emit('input', this.attachedfileExt +'$$'+ this.attachedfile)
        this.$emit('FileChanged')
    }
    else 
     alert('No file seleted')
    },

    clearfilecomp(){     
      alert('clearFileComponent'); 
       //this.$refs.reffile.value='';
       //document.getElementById('fattached').value =''      
    },

    InituploadImage(e) {
    
      this.file = e.target.files[0]
     // this.file_url = URL.createObjectURL(this.file)
    
     document.getElementById('fExt').value = this.file.name

      var FR = new FileReader()
      FR.addEventListener('load', function (e) {        
        var srcData = e.target.result;                
        document.getElementById('fattached').value = srcData
        
      //   document.getElementById('fattached').focus()
      //    document.getElementById('fattached').blur()
        
       // this.$emit('input', srcData)
        
        //alert(this.existsfile)
       })
       FR.readAsDataURL(this.file)
      
      //setTimeout(this.bindFile() , 2000);
    },
  },
}
</script>
<style scoped>
</style>
