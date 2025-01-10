<template>
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <!-- Sign Up Card -->
    <div class="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
      <!-- Left Section -->
      <div class="w-full p-6 text-center md:w-1/2 md:text-left">
        <h2 @click="showComp='index41'" class="text-2xl font-bold text-gray-800">
          Market Place
        </h2>
        <!-- <div @click="showComp='index1'" class="cursor-pointer">Login</div> -->
        <!-- <div @click="showComp='login'" class="cursor-pointer">Login</div> -->
        <p class="mt-4 text-gray-600">
          To learn more, visit
          <a href="assets/img/Login.png" class="text-indigo-600 underline" target="_blank">
            marketplace
          </a>.
        </p>
        <div class="mt-8">
          <!-- <img
            src="img/Login.png"
            alt="AWS Logo"
            class="w-32"
          /> -->
        </div>
      </div>

      <!-- Right Section -->
      <div class="w-full p-6 md:w-1/2 bg-gray-50">
        <h3 class="mb-6 text-2xl font-semibold text-center text-gray-700">
          Sign up
        </h3>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Enter Email"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <!-- Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="Enter Password"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <!-- Sign In Button -->
          <button
            type="submit"
            class="w-full px-4 py-2 font-semibold text-white rounded-lg hover:bg-indigo-800 btn">
            Sign in
          </button>
          <div class="flex justify-end">
            <a href="/user/changelogin" class="text-sm text-indigo-800 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        <!-- Separator -->
        <div class="flex items-center my-6">
          <hr class="w-full border-gray-300" />
          <span class="mx-2 text-sm text-gray-500">OR</span>
          <hr class="w-full border-gray-300" />
        </div>

        <!-- Sign Up Button -->
        <button
          @click="goToRegister"
          class="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Sign up for a new account
        </button>
      </div>
    </div>
  </section>
</template>
  
  <script>
  import changelogin from '~/pages/user/changelogin'
  import register from '~/pages/user/register.vue'
  //import textInput from '~/components/customcontrol/textinput'
  //import * as Global from '@/assets/js/Global'
  //import * as myfilter from '@/plugins/myfilter'
 // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
   definePageMeta({
    layout: 'loginlayout'
   });

  export default {
    components: {changelogin,register},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
      }
    },
    async mounted() {},
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {
      goToChangeLogin() {
        this.$router.push('/user/changelogin'); // Navigate to /user/changelogin
    },
    goToHomePage() {
        this.$router.push('/user/index'); // Navigate to /user/changelogin
    },
    goToRegister() {
        this.$router.push('/user/register'); // Navigate to /user/changelogin
    },
      // ...mapActions({
      //   //  getWGInitData: 'reservedaddetail/getWGInitData',
      // }),
      //   ...mapMutations({
      //   //resetEmail: 'office/RESET_EMAIL',
      //    //showMessage: 'PUSH_NOTIFICATION',
      // }),
      //  this.processing_year = new Date().getFullYear()
       //this.$emit('Load_MonthlyBrakeDown',req)
       //this.$refs.catcomp.initCategoryItem(-1)
       //this.$emit('input', this.selected_item.trim());
    // show_error(msg) {
    //     this.showMessage({
    //       type: 'Failed',
    //       message: msg,
    //     })
    //   },
    //    show_msg(msg) {
    //     this.showMessage({
    //       type: 'success',
    //       message: msg,
    //     })
    //   },
      // async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //     async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //  async downloadReportKotukole(){
      //   if(confirm('Do you want to Download?')){
      //      await this.get_DownloadKotukole({book:this.book});
      //      window.open(this.csv_root+'/reports/'+this.csv_name, '_blank');
      //   }
      // },
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
  
  //Validation
  //-------------------------------------------------
  // async cmdSearchOrg(){
  //       if(this.isAtleasetOneExisitsForSearch()){
  //      await this.getOrganizationData(this.organizationSearch);
  //       }
  //     },
  
  // 	-------------------
  
  
  //  isAtleasetOneExisitsForSearch(){
  //  let isAtleasetOneExisitsForSearch = false;
  
  
  //  if(this.organizationSearch.person.trim()!='' ){
  //         if( this.organizationSearch.person.trim().length  <= 3 ){
  //             this.show_error('Invalid person , More than three Letters Requied for search');
  //         }
  //         else{ isAtleasetOneExisitsForSearch = true;}
  
  //       }
  // 	  return isAtleasetOneExisitsForSearch;
  // 	  }
  </script>
  
  <style scoped>
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }

  .btn{
    background-color: #072556; 
  }
  </style>
  
  
  