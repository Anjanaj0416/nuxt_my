<!-- Usage
import viewfilelist from '~/components/sendstuff/viewfilelist'

components: {viewfilelist},

<viewfilelist ref="viewfilelist" :files="drapNdropfiles"/>

    dragNdropTriggered(files){
      this.drapNdropfiles = files;
      this.$refs.viewfilelist.getImagePreviews();

    },
-->

<template>
  <section>
    <div v-for="(file, key) in files" :key="key" class="file-listing">
      <img class="preview" v-bind:ref="'preview' + parseInt(key)" />
      {{ file.name }}
      <div class="remove-container">
        <a class="remove" v-on:click="removeFile(key)">Remove</a>
      </div>
    </div>
  </section>

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
    }
  },
  async mounted() {

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
    removeFile(key) {
      this.files.splice(key, 1);
    },
    getImagePreviews() {

      for (let i = 0; i < this.files.length; i++) {

        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {

          let reader = new FileReader();

          reader.addEventListener("load", function () {
            this.$refs['preview' + parseInt(i)][0].src = reader.result;
          }.bind(this), false);


          reader.readAsDataURL(this.files[i]);
        } else {

          this.$nextTick(function () {
            this.$refs['preview' + parseInt(i)][0].src = '/images/file.png';
          });
        }
      }
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
div.file-listing {
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 100px;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}
</style>
