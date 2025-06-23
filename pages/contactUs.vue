<template>
    <section>

        <!-- header -->
        <header class="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
            <nav class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
            <!-- Logo -->
            <div class="flex items-center">
                <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
                <img
                    src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
                    alt="Digital Tech Labs Logo"
                    class="px-2 rounded-full w-44"
                />
                </NuxtLink>
            </div>

            <!-- Desktop Navigation -->
            <div class="items-center hidden px-4 py-2 space-x-4 text-sm text-white bg-blue-900 rounded-full shadow-lg md:flex">
                <a href="#services" class="transition duration-300 hover:text-gray-300">Service</a>
                <a href="#Product" class="transition duration-300 hover:text-gray-300">Product</a>
                <a href="#" class="transition duration-300 hover:text-gray-300">Projects</a>
                <NuxtLink to="/aboutUs" class="transition duration-300 hover:text-gray-300">About us</NuxtLink>
                <NuxtLink to="/contactUs" class="transition duration-300 hover:text-gray-300">Contact</NuxtLink>
                <NuxtLink to="/user/login" class="transition duration-300 hover:text-gray-300">Intranet</NuxtLink>
                <!-- Dropdown -->
                <div class="relative">
                <button @click="toggleDropdown" class="transition duration-300 hover:text-gray-300">
                    Packages
                </button>
                <div v-if="showDropdown" class="absolute left-0 z-50 w-40 mt-2 text-blue-900 bg-white rounded shadow-md">
                    <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard" class="block px-4 py-2 hover:bg-blue-100">Standard</NuxtLink>
                    <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium" class="block px-4 py-2 hover:bg-blue-100">Premium</NuxtLink>
                    <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise" class="block px-4 py-2 hover:bg-blue-100">Enterprise</NuxtLink>
                </div>
                </div>
                <a href="#" class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
                Talk to Us
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="toggleMenu" class="md:hidden focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
            </button>
            </nav>

            <!-- Mobile Sidebar -->
            <transition name="slide">
            <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" @click="toggleMenu">
                <div
                class="fixed top-0 left-0 w-64 h-full p-6 overflow-y-auto text-white bg-blue-900 shadow-lg"
                @click.stop
                >
                <!-- Header Row with Logo Left and Close Button Right -->
                <div class="flex items-center justify-between mb-6">
                <!-- Logo on the Left -->
                <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
                    <img
                        src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
                        alt="Digital Tech Labs Logo"
                        class="w-24 px-2 rounded-full"
                    />
                </NuxtLink>

                <!-- Close Button on the Right -->
                <button
                    class="text-xl font-bold text-white transition hover:text-gray-300"
                    @click="toggleMenu"
                >
                    ✕
                </button>
                </div>


                <!-- Navigation Links -->
                <nav class="flex flex-col mt-6 space-y-4">
                    <a href="#services" class="hover:text-gray-300">Service</a>
                    <a href="#Product" class="hover:text-gray-300">Product</a>
                    <a href="#" class="hover:text-gray-300">Projects</a>
                    <NuxtLink to="/aboutUs" class="hover:text-gray-300">About us</NuxtLink>
                    <NuxtLink to="/contactUs" class="hover:text-gray-300">Contact</NuxtLink>
                    <NuxtLink to="/user/login" class="hover:text-gray-300">Intranet</NuxtLink>

                    <!-- Dropdown in Sidebar -->
                    <div class="relative pl-3">
                    <button @click="toggleDropdown" class="w-full text-left transition hover:text-gray-300">
                        Packages
                    </button>
                    <div
                        v-if="showDropdown"
                        class="p-2 mt-2 ml-2 space-y-1 text-blue-900 bg-white rounded shadow"
                    >
                        <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard" class="block px-2 py-1 rounded hover:bg-blue-100">Standard</NuxtLink>
                        <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium" class="block px-2 py-1 rounded hover:bg-blue-100">Premium</NuxtLink>
                        <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise" class="block px-2 py-1 rounded hover:bg-blue-100">Enterprise</NuxtLink>
                    </div>
                    </div>

                    <!-- CTA Button -->
                    <a
                    href="#"
                    class="px-4 py-2 mt-6 font-semibold text-center text-blue-900 bg-white rounded-full shadow-md hover:bg-blue-100"
                    >
                    Talk to Us
                    </a>
                </nav>
                </div>
            </div>
            </transition>

        </header>

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
                        <button type="button" class="px-6 py-2 mt-4 text-sm font-medium text-center text-blue-900 bg-white border-2 border-blue-400 rounded-full hover:bg-blue-800 hover:text-white hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
                            011 222 3 222
                        </button>
                    </div>

                </div> 
                <form @submit.prevent="handleSubmit">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.name" type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label for="name" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                            <p v-if="validationErrors.name" class="text-sm text-red-500">{{ validationErrors.name }}</p>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input  v-model="formData.web" type="text" name="web" id="web" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label for="web" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Company website</label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.email" type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label for="email" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                            <p v-if="validationErrors.email" class="text-sm text-red-500">{{ validationErrors.email }}</p>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.phone" type="number" maxlength="10" name="phone" id="phone" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label for="phone" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (Optional)</label>
                            <!-- <p v-if="validationErrors.phone" class="text-sm text-red-500">{{ validationErrors.phone }}</p> -->
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input v-model="formData.message" type="text" name="message" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="message" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What are you planning to build?</label>
                    </div>
                    <div class="grid gap-2 mt-4 mb-8 lg:grid-cols-7 lg:mb-8">
                        <div>
                            <button type="submit" class="px-6 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-800 hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
                                Submit
                            </button>
                        </div>
                    </div> 
                </form>
            </div>
        </section>

        <!-- section 2 -->
        <section class="relative px-6 mx-auto bg-gradient-to-r from-blue-900 to-indigo-900">
            <div class="mx-auto text-center lg:py-16 lg:px-2">
            <h1 class="text-4xl font-semibold text-white sm:text-5xl">We’re Located at</h1>
            <p class="mt-4 text-lg text-white">425, Bambalapitiya, Colombo 3, Sri lanka</p>
            <a
                href="https://www.google.com/maps/place/425+Bambalapitiya,+Colombo"
                target="_blank"
                class="inline-block px-4 py-2 text-sm mt-6 font-medium text-blue-900 bg-white rounded-md shadow hover:bg-blue-100 transition"
                >
                View on Google Maps
            </a>


            </div>
        </section>

        <!-- footer -->
        <footer class="p-4 mt-12 bg-white sm:p-6 dark:bg-gray-800">
        <div class="max-w-screen-xl mx-auto">
            <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="/" class="flex items-center">
                <img
                    src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
                    alt="Digital Tech Labs Logo"
                    class="w-40 px-2 rounded-full"
                />
                </a>
                <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                Digital TechLabs is a forward-thinking tech company providing innovative digital products and business solutions to help you succeed in a rapidly evolving digital world.
                </p>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Products</h2>
                <ul class="text-gray-600 dark:text-gray-400">
                    <li class="mb-4">
                    <a href="" class="hover:underline">B2B.lk</a>
                    </li>
                    <li>
                    <a href="" class="hover:underline">Automobile.lk</a>
                    </li>
                </ul>
                </div>
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                <ul class="text-gray-600 dark:text-gray-400">
                    <li class="mb-4">
                    <a href="/aboutUs" class="hover:underline">About Us</a>
                    </li>
                    <li>
                    <a href="/contact" class="hover:underline">Contact</a>
                    </li>
                </ul>
                </div>
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul class="text-gray-600 dark:text-gray-400">
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
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2025 <a href="/" class="hover:underline">Digital TechLabs™</a>. All rights reserved.
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
  
  <script setup>
  import { ref } from "vue";
//   import { useDtlStore } from "~/stores/modules/dtlStore";



  // Mobile Menu Toggle
  const menuOpen = ref(false);
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };


</script>

<script>
definePageMeta({
  layout: 'contactus',
});

export default {
  data() {
    return {
      imageroot: process.env.Assets_83,
      validationErrors: {},
      form: {
        name: '',
        email: '',
        phone: ''
      },
    };
  },
  async mounted() {

     
  },

    async created() {
        // this.dtlStore = useDtlStore();

    },
    watch: {},
    computed: {
    },
    methods: {
      
    },

    
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      };
    },
};
const formData = ref({
  name: "",
  web: "",
  email: "",
  phone: "",
  message: "",
});

const validationErrors = ref({
  name: "",
  email: "",
  phone: "",
});

// Validate Email Format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate Phone Number (10-digit numeric only)
// const isValidPhoneNumber = (phone) => {
//   return /^[0-9]{10}$/.test(phone);
// };

// Compute Validation Errors
const validateForm = () => {
  validationErrors.value = {
    name: !formData.value.name ? "Name is required" : "",
    email: !formData.value.email
      ? "Email is required"
      : !isValidEmail(formData.value.email)
      ? "Invalid email format"
      : "",
  };

  return !validationErrors.value.name && !validationErrors.value.email && !validationErrors.value.phone;
};

// Handle Form Submission
const handleSubmit = () => {
  if (validateForm()) {
    alert("Form submitted successfully!");
    // Send form data to backend
  }
};

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
