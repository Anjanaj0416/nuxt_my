<template>
  <section
    class="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans bg-[#bbd151]"
  >

    <!-- Left Brand Panel -->
    <div class="hidden md:flex flex-col items-center justify-center px-10">
      <h1 class="text-4xl font-bold tracking-wide mb-4 text-gray-900">
        Sri Lanka Q Books
      </h1>

      <p class="text-gray-800 text-center max-w-sm leading-relaxed">
        Trusted financial solutions for professionals and businesses.
      </p>

      <div class="mt-10 flex gap-6 text-sm text-gray-900">
        <span>🔒 Secure</span>
        <span>📑 Accurate</span>
        <span>📊 Smart</span>
      </div>
    </div>

    <!-- Right Login Panel -->
    <div class="flex items-center justify-center px-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h2 class="text-2xl font-bold text-gray-900 text-center mb-1">
          Sign In
        </h2>
        <p class="text-sm text-gray-600 text-center mb-6">
          Access your financial dashboard
        </p>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input type="text" v-model="loginDetails.userName" @input="clearErrorOnInput('userName')" placeholder="Enter your username" 
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            <p v-if="err.userName" class="mt-1 text-sm text-red-600">
              {{ err.userName }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'"
                v-model="loginDetails.password"
                placeholder="Enter your password"
                @input="clearErrorOnInput('password')"
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              <button type="button" @click="togglePassword"
                class="absolute inset-y-0 flex items-center text-black right-3">
                <!-- Icons -->
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.304-3.65M15 12a3 3 0 00-3-3m3 3a3 3 0 01-3 3m0 0l-4.875-4.875M9.879 9.88L4.22 4.22" />
                </svg>
              </button>
            </div>
            <p v-if="err.password" class="mt-1 text-sm text-red-600">
              {{ err.password }}
            </p>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between text-sm">
            <!-- <label class="flex items-center gap-2 text-gray-700">
              <input type="checkbox" class="rounded accent-[#bbd151]" />
              Remember me
            </label> -->

            <a href="#" class="text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <!-- Button -->
          <button
            @click="GetLogin" 
            type="submit"
            class="w-full py-1 bg-gray-900 text-white font-semibold text-sm
                   rounded-lg hover:opacity-90 transition"
          >
            Login Securely
          </button>
        </form>

        <p class="text-xs text-gray-500 text-center mt-6">
          © 2026 Sri Lanka Q Books
        </p>
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
  layout: 'qbook',
});

export default {
  layout: "qbook",
  components: { changelogin, register, logo },
  props: [""],
  data() {
    return {
      imageroot: process.env.Assets_83,
      loginDetails: {
        userName: "",
        password: "",
        RequestedUrl: "",
      },
      err: {
        loginDetails: {
          userName: "",
          password: "",
        },
      },
      showPassword: false,
      showLoading: null,
    };
  },

  async mounted() {
    this.userStore = useUserStore();
    await this.userStore.logoutQbook();
  },
  watch: {},
  created() {
    this.showLoading = this.$showLoading;
  },
  computed: {},
  methods: {

    async GetLogin() {

      if (!this.IsValidate()) return;

      const redirectToCookie = useCookie("redirectTo");

      if (redirectToCookie.value !== undefined) {
        this.loginDetails.RequestedUrl = redirectToCookie.value;
      }

      await this.userStore.login(this.loginDetails, this.showLoading);

      //api Call using pinia
      try {
        var token = this.userStore.token;
        if (token === null) {
          this.$showToast("Login Failed!", "error");
        } else {
          //this.$showToast("Login successful!", "success");
          try {

            const redirectToCookie = useCookie("redirectTo");


            if (redirectToCookie.value === undefined && this.userStore.redirectTo != '') {
              this.$router.push(this.userStore.redirectTo);
            }
            else if (redirectToCookie.value != "") {

              this.$router.push(redirectToCookie.value);
            } else {

              this.$router.push("/dashboard");
            }
          } catch (error) {

            this.$router.push("/dashboard");
          }
        }
      } catch (error) {
        this.$showToast(
          "Login failed. Please check your credentials.",
          "error"
        );
      }
    },

    IsValidate() {
      let isvalid = true;

      if (!this.loginDetails.userName) {
        this.err.userName = "Invalid Username!";
        isvalid = false;
      }

      if (!this.loginDetails.password) {
        this.err.password = "invalid Password!";
        isvalid = false;
      }

      return isvalid;
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },

    clearErr() {
      Object.keys(this.err).forEach(key => {
        this.err[key] = "";
      });
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
    validateLogin() { },
  },
  async beforeMount() { },
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
  },
};
</script>
  
  <style scoped>

  </style>
  
  
  