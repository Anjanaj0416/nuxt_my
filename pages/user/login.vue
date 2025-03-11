<template>
  <section
    class="flex items-center justify-center min-h-screen px-4 bg-gray-100"
  >
    <!-- Sign Up Card -->
    <div
      class="flex flex-col items-center w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row"
    >
      <!-- Left Section -->
      <div class="w-full p-6 text-center md:w-1/2 md:text-left">
        <div class="mt-8 w-full">
          <img
            src="/assets/img/Logo.png"
            alt="AWS Logo"
            class="w-32 rounded-full flex mx-auto"
          />
        </div>
        <h2
          @click="showComp = 'index41'"
          class="text-2xl font-bold text-gray-800 text-center"
        >
          Digital Tech Labs
        </h2>
        <!-- <div @click="showComp='index1'" class="cursor-pointer">Login</div> -->
        <!-- <div @click="showComp='login'" class="cursor-pointer">Login</div> -->
        <p class="mt-1 text-sm text-gray-600 py-4">
          innovative backbone of the organization, where cutting-edge technology
          is researched, developed, and tested to provide digital solutions that
          enhance internal workflows, improve user experiences, and enable the
          business to stay ahead in a fast-evolving digital world.
        </p>
      </div>

      <!-- Right Section -->
      <div class="w-full p-6 md:w-1/2 bg-gray-50">
        <h3 class="mb-6 text-2xl font-semibold text-center text-gray-700">
          Sign up
        </h3>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              v-model="loginDetails.userName"
              placeholder="Enter Email"
              required
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div v-if="!loginDetails.userName" class="text-red-500 text-sm">
              Please enter your username.
            </div>
          </div>
          <!-- Password Input -->
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="loginDetails.password"
                placeholder="Enter Password"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div v-if="!loginDetails.password" class="text-red-500 text-sm">
                Please enter valid password.
              </div>
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
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87"
                    ></path>
                    <path
                      d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"
                    ></path>
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
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87M12.5 1.5l-11 11"
                    ></path>
                    <path
                      d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <!-- Sign In Button -->
          <button
            @click="GetLogin"
            type="button"
            class="w-full px-4 py-2 font-semibold text-white rounded-lg hover:bg-indigo-800 btn"
          >
            Sign in
          </button>
          <div class="flex justify-end">
            <a
              href="/user/changelogin"
              class="text-sm text-indigo-800 hover:underline"
            >
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
          class="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Sign up for a new account
        </button>
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
//import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
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
        password: "1234",
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
          this.$router.push("/");
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
