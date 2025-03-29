<!-- 
 <appbutton_1 text="New" title="Add New Category" @click="setNewCategory" />

 import appbutton_1 from '~/components/customcontrol/button_type1'

 components: {appbutton_1}

 methods: {
   setNewCategory(){

   },
   },


-->

<template>
  <section @click="click" class="cursor-pointer">
    <button :title="title"
      class="px-3 py-1 text-white font-bold tracking-wider bg-green-300 border-2 border-green-300 rounded"
      type="button">
      <label v-if="text.indexOf('#') != -1" class="text-sm text-gray-00 flex cursor-pointer">
        <span>{{ text.substring(0, text.indexOf('#')).trim() }}</span>
        <span class="inline-block underline text-blue-300">{{ text.charAt(text.indexOf('#') + 1).trim() }}</span>
        <span>{{ text.substring(text.indexOf('#') + 2, text.length).trim() }}</span>
      </label>
      <label v-show="text.indexOf('#') == -1" class="text-sm text-gray-00 cursor-pointer">{{ text }}</label>
    </button>
  </section>
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: '',
  props: ['text', 'title'],
  //components: { textInput, toggleoption, imagepicker },
  data() {
    return {
      name: '',
    }
  },
  mounted() {
    //this.getAll()
  },
  watch: {
    // search_val(val) {}
  },
  computed: {
    // ...mapState({
    //   //alcategorys: (state) => state.category.alcategorys,
    // }),
  },
  methods: {
    // ...mapActions({
    //   //getInitData: 'category/getInitData',
    // }),
    // ...mapMutations({
    //   // setEditMode: 'category/SET_EDITMODE',
    // }),
    click() {
      this.$emit('click')
    },
  },
  beforeMount() {
    // this.getInitData()
  },

  head() {
    return {
      title: '',
    }
  },
}
</script>

<style scoped>
@media (min-width: 640px) {}
</style>