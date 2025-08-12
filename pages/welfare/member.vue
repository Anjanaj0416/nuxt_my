<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section>
    <h1>Member</h1>

  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//// import * as Global from '@/assets/js/Global'
////import * as myfilter from '@/plugins/myfilter'
// import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
definePageMeta({
  layout: 'society'
});
export default {

  components: {},
  props: [''],
  data() {
    return {
      imageroot: process.env.Assets_83,
    }
  },
  async mounted() { },
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
  },
  methods: {

  },
  async beforeMount() {
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }

  },
  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    }
  },
}


</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>