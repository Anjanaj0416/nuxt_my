<!-- 
 <appbutton_2 text="New" title="Add New Category" @click="setNewCategory" />

 import appbutton_2 from '~/components/customcontrol/button_type2'

 components: {appbutton_2}

 methods: {
   setNewCategory(){

   },
   },


-->
<template>
  <section @click="click" class="cursor-pointer">
    <button :title="title"
      class="px-3 py-1 text-white font-bold tracking-wider bg-gray-100 border-2 border-green-600 rounded" type="button">
      <!-- <label v-if="label.indexOf('#')!=-1" class="block text-sm text-gray-00">{{label.substring(0,label.indexOf('#'))}}<span class="underline font-bold text-gray-600">{{label.charAt(label.indexOf('#')+1)}}</span>{{label.substring(label.indexOf('#')+2,label.length)}}</label> -->
      <label v-if="text.indexOf('#') != -1" class="text-sm text-gray-00 flex cursor-pointer" @click="click">
        <span>{{ text.substring(0, text.indexOf('#')).trim() }}</span>
        <span class="inline-block underline text-gray-600">{{ text.charAt(text.indexOf('#') + 1).trim() }}</span>
        <span>{{ text.substring(text.indexOf('#') + 2, text.length).trim() }}</span>
      </label>
      <label v-show="text.indexOf('#') == -1" class="text-sm text-gray-00 cursor-pointer" @click="click">{{ text
      }}</label>
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