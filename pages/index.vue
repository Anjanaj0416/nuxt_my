<template>
  <section>
    <!--   <div @click="showComp='login'" class="cursor-pointer">Login</div>
  <div @click="showComp='changelogin'" class="cursor-pointer">changelogin</div>
    <hr class="mt-12">
   <login v-if="showComp=='login'"/>
   <changelogin v-if="showComp=='changelogin'"/> -->
    
  </section>
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
import changelogin from '~/components/auth/changelogin'
import login from '~/components/auth/login'
//import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
//import { useSampleControllerStore } from '~/store/index';
definePageMeta({
    layout: 'default'
   });
export default {
 
  components: {login,changelogin},
  props:[''],
  data() {
    return {
      email: "",
      accountName: "",
    };
  },
  methods: {
    handleSignup() {
      // Simulate signup logic
      if (this.email && this.accountName) {
        alert(`Signup successful for ${this.accountName}`);
      } else {
        alert("Please fill in all fields!");
      }
    },
    goToSignin() {
      this.$router.push("/signin");
    },
  },
  head() {
    return {
      title: "Sign Up - AWS",
    };
  },
};
</script>

<style scoped>
/* Custom Styles */
</style>
