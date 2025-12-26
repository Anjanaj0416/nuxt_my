<template>
  <section class="min-h-screen flex flex-col md:flex-row bg-green-500">
    <div class="hidden md:flex w-full md:w-1/2 items-center justify-center p-10 text-white">
      <div class="text-center">
        <NuxtLink to="/">
          <h1 class="text-5xl font-bold mb-6 drop-shadow-md">Welcome to</h1>
        </NuxtLink>
        <!-- Replace with your image -->
        <!-- <img src="" alt="Mockup" class="w-2/3 mx-auto" /> -->
      </div>
    </div>

    <!-- Right Panel -->
    <div class="flex w-full md:w-1/2 items-center justify-center bg-white rounded-l-3xl md:rounded-none p-8 md:p-16 shadow-xl">
      <div class="w-full max-w-xl">


        <!-- Header -->
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Wellcom to mLab</h2>
        <p class="text-gray-500 mb-6 text-sm">Join us and grow your learning community.</p>

        <!-- Form fields wrapper instead of form -->
        <div>
          <div class="grid gap-5 md:grid-cols-1">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">User Name</label>
              <input
                type="text"
                v-model="userName"
                placeholder="Enter User Name"
                 class="w-full p-2 mt-2 text-sm border rounded-lg focus:ring-green-500 focus:border-green-500"
                @input="clearErrorOnInput('userName')"
              />
              <p v-if="err.userName" class="mt-2 text-sm text-red-600">
                {{ err.userName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="text"
                v-model="address"
                placeholder="Enter Password"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-green-500 focus:border-green-500"
                @input="clearErrorOnInput('address')"
              />
              <p v-if="err.address" class="mt-2 text-sm text-red-600">
                {{ err.address }}
              </p>
            </div>

          </div>

          <!-- Submit -->
          <div class="mt-8">
            <button
              type="button"
              @click="SetRegisterSchool"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium shadow-md transition"
            >
              Submit
            </button>
          </div>
        </div>
        <div class="flex justify-between mt-4">
            <a href="/" class="text-sm text-green-800 hover:underline">
             
            </a>

            <a href="/user/changelogin" class="text-sm text-green-800 hover:underline">
              Forgot Password?
            </a>
          </div>
      </div>
    </div>
  </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'mLabsHome',   
    middleware: '',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        userName: '',
        address: '',
        district: '',
        email: '',
        contact: '',
        err: {
          userName: '',
          address: '',
          district: '',
          email: '',
          contact: '',
        },
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      
    },
    watch: {},
    computed: {
  
    },
    methods: {

      clearErrorOnInput(field) {
        if (this.err[field]) {
          this.err[field] = "";
        }
      },

      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
        // console.log('Selected file:', this.selectedFile);
      },
     
      async SetRegisterSchool() {
        if (this.IsValidate()) {
          try {
            const confirmed = await this.$showConfirm(
              "Are you sure to Save this Lead?",
              "warning"
            );

            if (confirmed) {
              const req = {
                userName: this.userName,
                email: this.email,
                contactNumber: this.contact,
                address: this.address,
                district: this.district,
                file:  this.selectedFile
              };
              console.log("Submitting Data:", req);
              // Add your actual API call or store action here
              // await this.userStore.RegisterUser(req, this.showLoading, this.showAlert);
            } else {
              console.log("Action canceled");
            }
          } catch (err) {
            console.error("Confirmation error:", err);
          }
        }
      },

      IsValidate() {
          this.err = {
            userName: "",
            address: "",
            district: "",
            email: "",
            contact: "",
          };

          let isValid = true;

          if (!this.userName) {
            this.err.userName = "Please enter your name.";
            isValid = false;
          }

          if (!this.address) {
            this.err.address = "Please enter your address.";
            isValid = false;
          }

          if (!this.district ) {
            this.err.district = "Please select a district.";
            isValid = false;
          }

          if (!this.email) {
            this.err.email = "Please Enter an Email!";
            isValid = false;  
          } else {
            const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!EmailRegex.test(this.email)) {
              this.err.email = "Please Enter a valid Email address!";
              isValid = false; 
            }
          }

          if (!this.contact) {
            this.err.contact = "Please Enter Contact Number!";
            isValid = false;  
          } else {
            const contactNoRegex = /^[0-9]{10}$/;
            if (!contactNoRegex.test(this.contact)) {
              this.err.contact = "Please Enter a valid 10-digit contact number!";
              isValid = false;  
            }
          }

          return isValid;
        },



   
    },
    async beforeMount() {

  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

   
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
  </style>
  
  
  