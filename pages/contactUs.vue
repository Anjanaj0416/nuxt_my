<template>
    <section>


        <!-- section 1 -->
        <section class="px-6 py-16 mx-auto max-w-7xl">
            <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
                <div class="mx-auto mb-8 -sm lg:mb-8">
                    <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">Ready to Build Your Digital Future ?</h2>
                    <p class="mt-4 text-lg text-gray-700">At Digital Tech Labs, we bring over two decades of expertise and 200+ successful projects to help businesses scale with top-tier technology solutions. We specialize in assembling dedicated software engineering teams tailored to your unique business needs.</p>
                </div>
                <div class="grid gap-2 mb-8 lg:grid-cols-7 lg:mb-8">
                    <div>
                        <button type="button" class="px-6 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-800 hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
                            Book a meeting
                        </button>
                    </div>
                    <div>
                        <button type="button" class="px-6 py-2 mt-4 text-sm font-medium text-center text-blue-900 bg-white border-2 border-blue-400 rounded-full hover:bg-blue-800 hover:text-white hover:shadow-xl ">
                            011 222 3 222
                        </button>
                    </div>

                </div> 

                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input  
                          type="text"
                          name="FullName" 
                          v-model="formData.fullName"
                          class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                          placeholder=" "  
                        />
                        <label for="FullName" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                        <p v-if="err.FullName" class="text-sm text-red-500">{{ err.FullName }}</p>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input 
                          type="text" 
                          name="WebSite" 
                          v-model="formData.webSite"
                          class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "  
                        />
                        <label for="WebSite" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Company WebSitesite</label>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input 
                          type="email" 
                          name="Email" 
                          v-model="formData.email"
                          class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "  
                        />
                        <label for="Email" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                        <p v-if="err.Email" class="text-sm text-red-500">{{ err.Email }}</p>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input 
                          type="Phone" 
                          name="Phone" 
                          v-model="formData.phone"
                          class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "  
                        />
                        <label for="Phone" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (Optional)</label>
                        <!-- <p v-if="validationErrors.Phone" class="text-sm text-red-500">{{ validationErrors.Phone }}</p> -->
                    </div>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input  
                      type="text" 
                      name="message" 
                      v-model="formData.comment" 
                      class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                      placeholder=" "
                        />
                    <label for="message" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What are you planning to build?</label>
                </div>
                <div class="grid gap-2 mt-4 mb-8 lg:grid-cols-7 lg:mb-8">
                    <div>
                      <button  @click="AddContact"  class="px-6 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-800 hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
                          Submit
                      </button>
                    </div>
                </div> 
            </div>
        </section>

   

    </section>
  </template>
  
<script>
  // import { useDtlStore } from "~/stores/modules/dtlStore";
  import { useStandpageStore } from '~/stores/modules/dtlStore';

  definePageMeta({
    layout: 'contactus',
  });

  export default {
      data() {
        return {

          imageroot: process.env.Assets_83,
          formData: {
            fullName: '',
            email: '',
            phone: '',
            webSite: '',
            comment: ''
          },
          err: {},
          menuOpen: false,
          showDropdown: false,
        };
      },

      async mounted() {

      },

      async created() {
        this.dtlStore = useStandpageStore();
      },

      watch: {},
      computed: {
      },
      methods: {
        AddContact() {
          if (this.validateForm()) {
          const req = {
            fullName: this.formData.fullName,
            email: this.formData.email,
            phone: this.formData.phone,
            webSite: this.formData.webSite,
            comment: this.formData.comment,
          };
          console.log("Submitted:", req);
          this.dtlStore.GetContactUs(this.req, this.showLoading);
          this.resetForm();
        } else {
          }
        },

        validateForm() {
          this.err = {};
          let isValid = true;

          if (!this.formData.fullName) {
            this.err.FullName = "Please enter your FullName.";
            isValid = false;
          }

          if (!this.formData.email) {
            this.err.Email = "Please enter an Email address.";
            isValid = false;
          } else {
            const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!EmailRegex.test(this.formData.email)) {
              this.err.Email = "Please enter a valid Email address.";
              isValid = false;
            }
          }

          return isValid;
        },


        resetForm() {
          this.formData = {
            FullName: '',
            Email: '',
            Phone: '',
            WebSite: '',
            Comment: ''
          };
          this.err = {};
        },

        toggleMenu() {
          this.menuOpen = !this.menuOpen;
        }
      },
      
    

      
      head() {
        return {
          title: 'Intranet - Digital Tech Labs',
        };
      },
  };

// Mobile Menu Toggle
// const menuOpen = ref(false);
// const toggleMenu = () => {
//   menuOpen.value = !menuOpen.value;
// };


</script>

<style scoped>
/* Utility Classes */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.html {
  scroll-behavior: smooth;
}
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}
nav a:hover {
  @apply bg-white text-black;
}
</style>
