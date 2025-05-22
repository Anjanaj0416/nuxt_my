<template>
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100" v-if="isOpen">
    <!-- Sign Up Card -->
    <div class="flex flex-col items-center w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-3xl md:flex-row">
     

      <!-- Right Section -->
      <div class="w-full p-2 my-6 bg-white mx-14">
        <h3 class="mb-2 text-xl font-semibold text-gray-700 text-start">
          Forgot Password
        </h3>
        <p class="mb-4 text-sm text-gray-600">Enter your account username and password. Enter a new password and then confirm the password.</p>

          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">User Name</label>
            <input
              type="text"
              v-model="user.userName"
              placeholder="Enter User Name"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p v-if="err.userName" class="mt-2 text-sm text-red-600">{{ err.userName }}</p>
          </div>
          <div>
            <label class="block mt-2 text-sm font-medium text-gray-600">Identify Code</label>
            <input
              type="text"
              v-model="user.identificationCode"
              placeholder="Enter Code"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p v-if="err.identificationCode" class="mt-2 text-sm text-red-600">{{ err.identificationCode }}</p>
          </div>
          <div>
            <label class="block mt-2 text-sm font-medium text-gray-600">New Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="user.password"
                placeholder="Enter New Password"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            <p v-if="err.password" class="mt-2 text-sm text-red-600">{{ err.password }}</p>
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
            <label class="block mt-2 text-sm font-medium text-gray-600">Confirm Password</label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="user.confirmPassword"
                placeholder="Enter Confirm Password"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
               <p v-if="err.confirmPassword" class="mt-2 text-sm text-red-600">{{ err.confirmPassword }}</p>

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
           <!-- {{ user }} -->
          <button
            type="submit"
            class="w-full px-4 py-2 mt-8 font-semibold text-white rounded-lg hover:bg-indigo-800 btn"
            @click="GetResetPassword"
          >
            Reset Password
          </button>
        

        <!-- Separator -->
        <div class="flex items-center my-6">
          <hr class="w-full border-gray-300" />
          <span class="mx-2 text-sm text-gray-500">OR</span>
          <hr class="w-full border-gray-300" />
        </div>

        <!-- Sign Up Button -->
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
  import { reactive, computed } from "vue";
  import closebtn from "~/components/customcontrol/modal_close_button";
  import { useVendorStore } from "~/stores/modules/qms/vendorStore";
  import imagecomp from "~/components/customcontrol/imagepicker";
  import ImageLable from "~/components/customcontrol/ImageLable";
  import serach_Input from "~/components/customcontrol/SearchInput";
  import { useUserStore } from "~/stores/modules/userStore";
  import toggleoption from "~/components/customcontrol/toggleoption";

  definePageMeta({
    layout: "",
  });
  export default {
    components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      imageroot: process.env.Assets_83, 
      showPassword: false, 
      confirmPassword: '', 
      showConfirmPassword: false, 
      newPassword: '',
      isOpen:true,
      code: '',
      user: {
        userName: '',
        identificationCode: '',
        confirmPassword: '',
      },
      err: {
        userName: '',
        identificationCode: '',
        confirmPassword: '',
      },
       showLoading: null,
    };
  },

    computed: {
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();
    
  
  },
  mounted() {

  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
      this.goToLogin();
    },

    cancel() {
      this.clearErr();
      this.closeModal();
    },
       goToLogin() {
      this.$router.push('/user/login'); 
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirmPassword() {
      this.showConfirmPassword  = !this.showConfirmPassword ;
    },



    GetResetPassword() {
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure to change the password?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            const req= {
              userName: this.user.userName,
              identificationCode: this.user.identificationCode,
              confirmPassword: this.user.confirmPassword,
            };      
         
             await this.userStore.GetChangePassword( req, this.showLoading );         
            this.closeModal();
          } else {
            console.log("Action canceled");
          }
        });
      }
    },

  IsValidate() {
    this.clearErr();
    let IsValidate = true;

    if (!this.user.userName) {
      this.err.userName = "Please Enter User Name!";
      IsValidate = false;
    }

    if (!this.user.identificationCode) {
      this.err.identificationCode = "Please Enter Identification Code!";
      IsValidate = false;
    }

    if (!this.user.password) {
      this.err.password = "Please Enter New Password!";
      IsValidate = false;
    }

    if (!this.user.confirmPassword) {
      this.err.confirmPassword = "Please Confirm Your Password!";
      IsValidate = false;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.err.confirmPassword = "Passwords do not match!";
      IsValidate = false;
    }

    return IsValidate;
  },

  clearErr() {
    Object.keys(this.err).forEach((key) => {
      this.err[key] = "";
    });
  },

   
  },
};
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
  
  
  