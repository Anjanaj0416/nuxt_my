<template>
  <section>
    <!-- header -->
    <header class="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <nav class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
            <!-- hide Img -->
            <img src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" alt="Digital Tech Labs Logo"
              class="px-2 rounded-full w-44" />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div
          class="items-center hidden px-4 py-2 space-x-4 text-sm text-white bg-blue-900 rounded-full shadow-lg md:flex">
          <NuxtLink to="/service" class="transition duration-300 hover:text-gray-300">Service</NuxtLink>
          <NuxtLink to="/project" class="transition duration-300 hover:text-gray-300">Project</NuxtLink>
          <NuxtLink to="/aboutUs" class="transition duration-300 hover:text-gray-300">About us</NuxtLink>
          <NuxtLink to="/contactUs" class="transition duration-300 hover:text-gray-300">Contact</NuxtLink>
          <NuxtLink to="/user/login" class="transition duration-300 hover:text-gray-300">Intranet</NuxtLink>
          <!-- Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown" class="transition duration-300 hover:text-gray-300">
              Packages
            </button>
            <div v-if="showDropdown" class="absolute left-0 z-50 w-40 mt-2 text-blue-900 bg-white rounded shadow-md">
              <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
                class="block px-4 py-2 hover:bg-blue-100">Standard</NuxtLink>
              <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium"
                class="block px-4 py-2 hover:bg-blue-100">
                Premium</NuxtLink>
              <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
                class="block px-4 py-2 hover:bg-blue-100">Enterprise</NuxtLink>
            </div>
          </div>
          <NuxtLink to="careers" class="transition duration-300 hover:text-gray-300">Careers</NuxtLink>
          <a href="tel:+011 222 3 222"
            class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
            Talk to Us
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Sidebar -->
      <transition name="slide">
        <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" @click="toggleMenu">
          <div class="fixed top-0 left-0 w-64 h-full p-6 overflow-y-auto text-white bg-blue-900 shadow-lg" @click.stop>
            <!-- Header Row with Logo Left and Close Button Right -->
            <div class="flex items-center justify-between mb-6">
              <!-- Logo on the Left -->
              <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
                <img src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" alt="Digital Tech Labs Logo"
                  class="w-24 px-2 rounded-full" />
              </NuxtLink>

              <!-- Close Button on the Right -->
              <button class="text-xl font-bold text-white transition hover:text-gray-300" @click="toggleMenu">
                ✕
              </button>
            </div>


            <!-- Navigation Links -->
            <nav class="flex flex-col mt-6 space-y-4">
              <a href="/service" class="hover:text-gray-300">Service</a>
              <a href="/project" class="hover:text-gray-300">Projects</a>
              <NuxtLink to="/aboutUs" class="hover:text-gray-300">About us</NuxtLink>
              <NuxtLink to="/contactUs" class="hover:text-gray-300">Contact</NuxtLink>
              <NuxtLink to="/user/login" class="hover:text-gray-300">Intranet</NuxtLink>

              <!-- Dropdown in Sidebar -->
              <div class="relative pl-3">
                <button @click="toggleDropdown" class="w-full text-left transition hover:text-gray-300">
                  Packages
                </button>
                <div v-if="showDropdown" class="p-2 mt-2 ml-2 space-y-1 text-blue-900 bg-white rounded shadow">
                  <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
                    class="block px-2 py-1 rounded hover:bg-blue-100">Standard</NuxtLink>
                  <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium"
                    class="block px-2 py-1 rounded hover:bg-blue-100">Premium</NuxtLink>
                  <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
                    class="block px-2 py-1 rounded hover:bg-blue-100">Enterprise</NuxtLink>
                </div>
              </div>
              <NuxtLink to="/careers" class="transition duration-300 hover:text-gray-300">Careers</NuxtLink>
              <!-- CTA Button -->
              <a href="tel:+011 222 3 222"
                class="px-4 py-2 mt-6 font-semibold text-center text-blue-900 bg-white rounded-full shadow-md hover:bg-blue-100">
                Talk to Us
              </a>
            </nav>
          </div>
        </div>
      </transition>

    </header>
    <!-- section 1 -->
    <section class="px-6 mt-16 mx-auto max-w-7xl">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div class="mt-8 flex items-center justify-center ">
          <div class="container mx-auto p-6 lg:flex lg:gap-12">
            <!-- Left Side: Sample Text -->
            <div class="lg:w-1/2 mb-10 lg:mb-0 flex flex-col justify-center space-y-4">
              <h1 class="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
              <p class="text-gray-600 text-normal">
                We’d love to hear from you! Reach out for inquiries, quotes, or support.
              </p>
              <div class="text-gray-700 space-y-2">
                <p><strong>Email:</strong> <a href="mailto:digitaltechlabs@dtl.lk"
                    class="text-blue-600 hover:underline">digitaltechlabs@dtl.lk</a></p>
                <p><strong>Phone:</strong> <a href="tel:0112223222" class="text-blue-600 hover:underline">011 222 3
                    222</a></p>
                <p><strong>Address:</strong> No.35/2, Joseph’s Lane, Colombo 4.</p>
              </div>
              <div class="mt-6">
                <h2 class="text-normal font-semibold text-gray-800 mb-3">Follow Us:</h2>
                <div class="flex items-center gap-3">

                  <!-- LinkedIn -->
                  <a href="https://www.linkedin.com/company/digitaltechlabs2025/" target="_blank"
                    class="p-2 rounded-full bg-gray-100 hover:bg-blue-800 hover:text-white shadow-sm hover:shadow-lg transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23h4V7h-4v16zM8.5 7v16h4v-8.4c0-2.2 3-2.4 3 0V23h4V14c0-6.1-7-5.9-7-2.8V7h-4z" />
                    </svg>
                  </a>

                  <!-- Facebook -->
                  <a href="https://www.facebook.com/profile.php?id=61577660262893" target="_blank"
                    class="p-2 rounded-full bg-gray-100 hover:bg-blue-800 hover:text-white shadow-sm hover:shadow-lg transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3h4V0h-4c-3.3 0-6 2.7-6 6v3H4v4h3v11h4V13h3l1-4h-4V6c0-1.1.9-2 2-2z" />
                    </svg>
                  </a>

                  <!-- Instagram -->
                  <a href="https://www.instagram.com/digitaltechlabs/" target="_blank"
                    class="p-2 rounded-full bg-gray-100 hover:bg-blue-800 hover:text-white shadow-sm hover:shadow-lg transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                  </a>

                </div>
              </div>
            </div>
            <!-- Right Side: Form -->
            <div class="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
              <!-- <h1 class="text-4xl font-bold text-gray-800 mb-4">Let's talk</h1> -->
              <div class="grid md:grid-cols-2 md:gap-6">
                <!-- Full Name -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="FullName" v-model="formData.fullName"
                    class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="FullName"
                    class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Full
                    Name</label>
                  <p v-if="err.FullName" class="text-sm text-red-500">{{ err.FullName }}</p>
                </div>

                <!-- Company Website -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="WebSite" v-model="formData.webSite"
                    class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="WebSite"
                    class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Your
                    Company Website</label>
                </div>
              </div>

              <div class="grid md:grid-cols-2 md:gap-6">
                <!-- Email -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="email" name="Email" v-model="formData.email"
                    class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="Email"
                    class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">E-mail</label>
                  <p v-if="err.Email" class="text-sm text-red-500">{{ err.Email }}</p>
                </div>

                <!-- Phone -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="Phone" v-model="formData.phone"
                    class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="Phone"
                    class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Phone
                    number (Optional)</label>
                </div>
              </div>

              <!-- Message -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="message" v-model="formData.comment"
                  class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="message"
                  class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">What
                  are you planning to build?</label>
              </div>

              <!-- Submit Button -->
              <div class="mt-8">
                <button @click="AddContact"
                  class="w-full py-3 px-6 font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-600 rounded-full shadow-lg ">
                  Send Message 🚀
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-8">
      <div class="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
        <!-- Google Map -->
        <div class="relative">
          <iframe src="https://www.google.com/maps?q=No.35/2,+Joseph’s+Lane,+Colombo+4&output=embed" width="100%"
            height="300" style="border:0;" allowfullscreen="" loading="lazy" class="w-full rounded-b-2xl"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>

    <!-- footer -->
    <footer class="p-4 mt-12 bg-white sm:p-6 ">
      <div class="max-w-screen-xl mx-auto">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="/" class="flex items-center">
              <!-- hide Img -->
              <img src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" alt="Digital Tech Labs Logo"
                class="w-40 px-2 rounded-full" />
            </a>
            <p class="mt-4 text-sm text-gray-600  max-w-sm">
              Digital TechLabs is a forward-thinking tech company providing innovative digital products and business
              solutions to help you succeed in a rapidly evolving digital world.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Products</h2>
              <ul class="text-gray-600">
                <li class="mb-4">
                  <!-- hide Img -->
                  <a href="https://www.btob.lk/" target="_blank" class="hover:underline">B2B.lk</a>
                </li>
                <li>
                  <!-- <a href="" class="hover:underline">Automobile.lk</a> -->
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Company</h2>
              <ul class="text-gray-600 ">
                <li class="mb-4">
                  <a href="/aboutUs" class="hover:underline">About Us</a>
                </li>
                <li>
                  <a href="/contact" class="hover:underline">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
              <ul class="text-gray-600 ">
                <li class="mb-4">
                  <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" class="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center">
            © 2025 <a href="/" class="hover:underline">SLTDS™</a>. All rights reserved.
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <!-- Existing social icons remain unchanged -->
            <!-- Add links to your actual social media profiles -->
            <!-- Facebook / Instagram / LinkedIn / etc. -->
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import { useDtlStore } from '~/stores/modules/dtlStore';
import { useUserStore } from '~/stores/modules/userStore';


definePageMeta({
  layout: '',
});

export default {
  components: {},
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
      showLoading: null,
    };
  },

  async mounted() {

  },

  async created() {
    this.dtlStore = useDtlStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
  },

  watch: {},
  computed: {
  },
  methods: {
    // async AddContact() {
    //   if (this.validateForm()) {
    //     this.$showConfirm(
    //       "Are you sure to submit this contact?",
    //       "warning"
    //     ).then(async (result) => {
    //       if (result.isConfirmed) {
    //         const req = {
    //           fullName: this.formData.fullName,
    //           email: this.formData.email,
    //           phone: this.formData.phone,
    //           webSite: this.formData.webSite,
    //           comment: this.formData.comment,
    //         };
    //         console.log("Submitted:", req);

    //         const secretCode = 'w5jzxd02';
    //         const formData = new FormData();
    //         formData.append('secretCode', secretCode);
    //         await this.userStore.AppLogin(formData, this.showLoading);

    //         await this.dtlStore.SetContactUs(req, this.showLoading);
    //       } else {
    //         console.log("Action canceled");
    //       }
    //       this.resetForm();
    //     });
    //   } else {
    //   }
    // },



    async AddContact() {
      if (this.validateForm()) {
        this.$swal.fire({
          title: "Confirm Submission",
          text: "Are you sure you want to submit this contact?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#2563eb", // Tailwind blue-600
          cancelButtonColor: "#6b7280",  // Tailwind gray-500
          confirmButtonText: "Submit",
          cancelButtonText: "Cancel",
          focusConfirm: true,
          reverseButtons: false,
          customClass: {
            popup: "rounded-xl shadow-lg",
            title: "text-xl font-semibold text-gray-800",
            htmlContainer: "text-gray-600",
            confirmButton: "px-6 py-2 font-medium rounded-lg",
            cancelButton: "px-6 py-2 font-medium rounded-lg",
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const req = {
              fullName: this.formData.fullName,
              email: this.formData.email,
              phone: this.formData.phone,
              webSite: this.formData.webSite,
              comment: this.formData.comment,
            };
            console.log("Submitted:", req);

            const secretCode = "w5jzxd02";
            const formData = new FormData();
            formData.append("secretCode", secretCode);
            await this.userStore.AppLogin(formData, this.showLoading);

            await this.dtlStore.SetContactUs(req, this.showLoading);

            this.$swal.fire({
              title: "Submitted Successfully",
              text: "Your contact details have been sent.",
              icon: "success",
              confirmButtonColor: "#2563eb",
            });
          } else {
            console.log("Action canceled");
          }
          this.resetForm();
        });
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
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};


</script>

<style scoped>
/* Utility Classes */
.slide-enter-active,
.slide-leave-active {
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
