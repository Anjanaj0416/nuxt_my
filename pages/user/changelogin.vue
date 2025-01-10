<template>
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <!-- Sign Up Card -->
    <div class="flex flex-col items-center w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
     

      <!-- Right Section -->
      <div class="w-full p-2 my-6 bg-white mx-14">
        <h3 class="mb-2 text-xl font-semibold text-gray-700 text-start">
          Forgot Password
        </h3>
        <p class="mb-4 text-sm text-gray-600">Enter your account username and password. Enter a new password and then confirm the password.</p>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">User Name</label>
            <input
              type="text"
              v-model="email"
              placeholder="Enter User Name"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Identify Code</label>
            <input
              type="text"
              v-model="code"
              placeholder="Enter Code"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">New Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="newPassword"
                placeholder="Enter New Password"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <!-- Toggle Button -->
              <button
                type="button"
                @click="togglePassword"
                class="absolute text-gray-600 transform -translate-y-1/2 top-1/2 right-3 focus:outline-none"
              >
                <!-- Show Password Icon -->
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                  class="w-4 h-4 mt-3"
                >
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87"></path>
                    <path d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"></path>
                  </g>
                </svg>
                <!-- Hide Password Icon -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                  class="w-4 h-4 mt-3"
                >
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87M12.5 1.5l-11 11"></path>
                    <path d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Confirm Password</label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Enter Confirm Password"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <!-- Toggle Button -->
              <button
                type="button"
                @click="toggleShowConfirmPassword"
                class="absolute text-gray-600 transform -translate-y-1/2 top-1/2 right-3 focus:outline-none"
              >
                <!-- Show Password Icon -->
                <svg
                   v-if="showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                  class="w-4 h-4 mt-3"
                >
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87"></path>
                    <path d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"></path>
                  </g>
                </svg>
                <!-- Hide Password Icon -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                  class="w-4 h-4 mt-3"
                >
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87M12.5 1.5l-11 11"></path>
                    <path d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <!-- Sign In Button -->
          <button
            type="submit"
            class="w-full px-4 py-2 font-semibold text-white rounded-lg hover:bg-indigo-800 btn"
          >
            Send Code
          </button>
        </form>

        <!-- Separator -->
        <div class="flex items-center my-6">
          <hr class="w-full border-gray-300" />
          <span class="mx-2 text-sm text-gray-500">OR</span>
          <hr class="w-full border-gray-300" />
        </div>

        <!-- Sign Up Button -->
        <!-- <div class="flex justify-center">
            <a href="/user/changelogin" class="text-sm text-indigo-800 hover:underline">
              Forgot Password?
            </a>
          </div> -->
          <div class="flex justify-center mb-5">
            <label for="terms" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
              Go Back to 
              <a href="/user/login" class="text-sm text-indigo-800 hover:underline">Sing In</a>
            </label>
          </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //import * as Global from '@/assets/js/Global'
  //import * as myfilter from '@/plugins/myfilter'
 // import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
 definePageMeta({
    layout: 'loginlayout'
   });

  export default {
    // components: {login},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        password: '', 
        showPassword: false, 
        confirmPassword: '', 
        showConfirmPassword: false, 
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
      goToLogin() {
      this.$router.push('/user/login'); // Navigate to /user/login
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword  = !this.showConfirmPassword ;
    },
      //
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
  
  
  