<!-- Usage
https://serversideup.net/drag-and-drop-file-uploads-with-vuejs-and-axios/

import dragNdrop from '~/components/sendstuff/dragNdrop'

<dragNdrop ref="refdragNdrop" :files="drapNdropfiles" @dragNdropTriggered="dragNdropTriggered"/>

components: {dragNdrop},

  dragNdropTriggered(files){
      this.drapNdropfiles = files;
      this.$refs.viewfilelist.getImagePreviews();

    },

-->
<template>
  <section>
    <div id="file-drag-drop">
      <form ref="fileform">
        <span class="drop-files">Drop the files here!</span>
      </form>
    </div>

  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  components: {},
  props: ['files'],
  data() {
    return {
      imageroot: process.env.McleAssets,
      dragAndDropCapable: false,

    }
  },
  async mounted() {

    this.dragAndDropCapable = this.determineDragAndDropCapable();


    if (this.dragAndDropCapable) {

      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {

        this.$refs.fileform.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));


      this.$refs.fileform.addEventListener('drop', function (e) {

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
        }
        this.$emit('dragNdropTriggered', this.files)
      }.bind(this));

    }
  },
  watch: {},
  computed: {
    // ...mapState({

    // }),
  },
  methods: {
    // ...mapActions({

    // }),
    // ...mapMutations({

    // }),

    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
    determineDragAndDropCapable() {

      var div = document.createElement('div');


      return (('draggable' in div)
        || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window
        && 'FileReader' in window;
    },


  },
  async beforeMount() {


  },
  head() {
    return {
      title: 'Digital Services - SLTDS',
    }
  },
}
</script>

<style scoped>
form {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}
</style>
