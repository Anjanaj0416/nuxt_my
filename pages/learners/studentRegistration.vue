<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="min-h-screen flex flex-col md:flex-row bg-red-500">
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
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-4">
          <NuxtLink to="/" class="text-red-600 hover:underline">Home</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-gray-700 font-medium">Sign Up</span>
        </nav>

        <!-- Header -->
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p class="text-gray-500 mb-6 text-sm">Join us and grow your learning community.</p>

        <!-- Form fields wrapper instead of form -->
        <div>
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">User Name</label>
              <input
                type="text"
                v-model="userName"
                placeholder="Enter User Name"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                @input="clearErrorOnInput('userName')"
              />
              <p v-if="err.userName" class="mt-2 text-sm text-red-600">
                {{ err.userName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                v-model="address"
                placeholder="Enter User Address"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                @input="clearErrorOnInput('address')"
              />
              <p v-if="err.address" class="mt-2 text-sm text-red-600">
                {{ err.address }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">District</label>
              <select
                v-model="district"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-red-500 focus:border-red-500"
                @input="clearErrorOnInput('district')"

              >
                <option disabled value="">Choose your district</option>
                <option >Colombo</option>
                <option>Gampaha</option>
                <option>Kandy</option>
              </select>
              <p v-if="err.district" class="mt-2 text-sm text-red-600">
                {{ err.district }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                v-model="email"
                placeholder="Enter User Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                @input="clearErrorOnInput('email')"
              />
              <p v-if="err.email" class="mt-2 text-sm text-red-600">
                {{ err.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                v-model="contact"
                placeholder="Enter User Contact Number"
                maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                @input="clearErrorOnInput('contact')"
              />
              <p v-if="err.contact" class="mt-2 text-sm text-red-600">
                {{ err.contact }}
              </p>
            </div>

            <div>
              <!-- Label & Optional Note -->
              <div class="flex justify-between items-center mb-3">
                <label class="text-sm font-semibold text-gray-700">BR File</label>
                <span class="text-xs text-gray-400">Optional</span>
              </div>

              <!-- Custom Styled Upload Button with File Name Display -->
              <div class="flex items-center space-x-4">
                <label
                  for="file_input"
                  class="flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow hover:bg-red-700 cursor-pointer transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m0-6h6m2 0a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2h2" />
                  </svg>
                  Choose File
                </label>

            
              </div>

              <!-- Hidden Input -->
              <input
                id="file_input"
                type="file"
                @change="handleFileUpload"
                class="hidden"
              />
                <span class="text-sm text-gray-600 truncate max-w-[200px]">
                  {{ selectedFile?.name  }}
                </span>
            </div>

          </div>

          <!-- Submit -->
          <div class="mt-8">
            <button
              type="button"
              @click="SetRegisterSchool"
              class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium shadow-md transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 

import { useSchoolsStore } from '~/stores/modules/learners/school'


 definePageMeta({
    layout: 'learners',   
    middleware: '',
   });
   
  export default {
    
    components: {},
    props:['id'],
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
      this.route = useRoute()
 
      
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
                file:  this.selectedFile,
                id: this.id
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
  
  
  