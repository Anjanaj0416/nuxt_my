<template>
<section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
  <div class="flex flex-col items-center w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-3xl md:flex-row">
    <div class="w-full p-10 text-center bg-white md:w-1/2">
      <a href="/">
        <img
          src="/assets/img/LogoDigitalTechLab.png"
          alt="Logo"
          class="mx-auto w-36"
        />
      </a>
      <!-- <h2 @click="showComp = 'index41'" class="mt-4 text-3xl font-bold text-indigo-800 transition cursor-pointer hover:text-indigo-600">
        Digital Tech Labs
      </h2> -->
      <p class="mt-4 text-sm leading-relaxed text-gray-600">
        Innovative backbone of the organization, where cutting-edge tech is crafted to enhance workflows, elevate user experience, and drive the digital future.
      </p>
    </div>

    <!-- Right Panel -->
    <div class="w-full p-10 bg-white md:w-1/2">
      <h3 class="mb-6 text-3xl font-semibold text-center text-indigo-900">Sign In</h3>
      
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="loginDetails.userName"
            placeholder="Enter your email"
            required
            class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <div v-if="!loginDetails.userName" class="mt-1 text-sm text-red-500">
            Please enter your username.
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="loginDetails.password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 flex items-center text-black right-3"
            >
              <!-- Icons -->
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.304-3.65M15 12a3 3 0 00-3-3m3 3a3 3 0 01-3 3m0 0l-4.875-4.875M9.879 9.88L4.22 4.22"/>
              </svg>
            </button>
          </div>
          <div v-if="!loginDetails.password" class="mt-1 text-sm text-red-500">
            Please enter valid password.
          </div>
        </div>

        <!-- Sign In Button -->
        <button
          @click="GetLogin"
          type="button"
          class="w-full py-2 text-white transition bg-blue-900 rounded-lg hover:bg-indigo-800"
        >
          Sign In
        </button>

        <div class="flex justify-end">
          <a href="/user/changelogin" class="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <!-- Separator -->
        <div class="flex items-center justify-center gap-2 my-6 text-sm text-gray-400">
          <hr class="w-1/4 border-gray-300" />
          OR
          <hr class="w-1/4 border-gray-300" />
        </div>

        <!-- Sign Up -->
        <button
          @click="goToRegister"
          class="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Sign up for a new account
        </button>
      </form>
    </div>
  </div>
</section>

</template>

<script>
import changelogin from "~/pages/user/changelogin";
import register from "~/pages/user/register.vue";
import logo from "~/assets/img/Logo.png";
import { useUserStore } from "~/stores/modules/userStore";
// import { ref } from "vue";
// import Swal from "sweetalert2";

//import textInput from '~/components/customcontrol/textinput'
//// import * as Global from '@/assets/js/Global'
////import * as myfilter from '@/plugins/myfilter'
// import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
definePageMeta({
  layout: "loginlayout",
});

export default {
  components: { changelogin, register, logo },
  props: [""],
  data() {
    return {
      imageroot: process.env.Assets_83,
      loginDetails: {
        userName: "thushara",
        password: "",
      },
      showPassword: false,
  
    };
  },

  async mounted() {
    this.userStore = useUserStore();
    await this.userStore.logout();

    
  },
  watch: {},
  computed: {
 
  },
  methods: {
    async GetLogin() {
      await this.userStore.login(this.loginDetails);
      //api Call using pinia
      try {
        var token = this.userStore.token;
        if (token === null) {
          this.$showToast("Login Failed!", "error");
        } else {
          this.$showToast("Login successful!", "success");
          this.$router.push("/dashboard");
        }
      } catch (error) {
        this.$showToast(
          "Login failed. Please check your credentials.",
          "error"
        );
      }
    },

    goToChangeLogin() {
      this.$router.push("/user/changelogin"); // Navigate to /user/changelogin
    },
    goToHomePage() {
      this.$router.push("/user/index"); // Navigate to /user/changelogin
    },
    goToRegister() {
      this.$router.push("/user/register"); // Navigate to /user/changelogin
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateLogin() {},
  },
  async beforeMount() {},
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
  },
};
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

.btn {
  background-color: #072556;
}
</style>
