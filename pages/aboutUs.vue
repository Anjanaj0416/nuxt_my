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
                <a href="tel:+011 222 3 222"
                        class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
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
                    <a href="tel:+011 222 3 222"
                        class="px-4 py-2 mt-6 font-semibold text-center text-blue-900 bg-white rounded-full shadow-md hover:bg-blue-100">
                        Talk to Us
                    </a>
                </nav>
                </div>
            </div>
            </transition>

        </header>

        <section class="px-6 py-16 mx-auto max-w-7xl">
            <div class="max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                
                <div class="mt-4 md:mt-0">
                    <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Welcome to Digital Tech Labs</h2>
                    
                    <p class="mt-4 text-lg text-gray-700">
                        At Digital Tech Labs, we are a team of passionate innovators, problem solvers, and creators focused on delivering cutting-edge technology solutions. Our mission is to empower businesses through digital transformation by offering high-quality software development, digital marketing, and IT services. We strive to help businesses leverage technology to enhance their operational efficiency, drive growth, and stay ahead in a fast-paced, ever-evolving digital world.
                    </p>
                    <h2 class="mt-4">Who We Are</h2>
                    <p class="mt-4 text-lg text-gray-700">
                        We are a dynamic and agile team with a diverse skill set, ranging from software engineers and web developers to digital marketers and strategic consultants. Our team is dedicated to creating innovative, reliable, and scalable technology solutions tailored to meet the unique needs of each client.
                    </p>
                    <h2 class="mt-4">What We Do</h2>
                    <p class="mt-4 text-lg text-gray-700">
                        We specialize in providing a wide array of services including:
                    </p>

                    <ul class="mt-4 text-lg text-gray-700 list-disc list-inside">
                        <li>Custom Software Development</li>
                        <li>Web and Mobile Application Development</li>
                        <li>Digital Marketing & SEO</li>
                        <li>Cloud Solutions & IT Infrastructure</li>
                        <li>IT Consulting & Business Strategy</li>
                    </ul>
                </div>

                <img class="w-full dark:hidden" src="https://img.freepik.com/free-photo/medium-shot-colleagues-standing-together_23-2149345239.jpg?t=st=1743157114~exp=1743160714~hmac=f1bcc85bff38ffab31f80526fd55508e44741149a29b890c4ebf2061104d11ef&w=740" alt="dashboard image">
                <img class="hidden w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image">
            </div>
        </section>

        <section class="px-6 py-16 mx-auto bg-gray-100">
            <aside aria-label="Related articles" class="py-8 lg:py-8 dark:bg-gray-800">
            <div class="max-w-screen-xl px-4 mx-auto">
                <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
                <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mb-5 rounded-lg" alt="Image 1">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first office</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 2 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" class="mb-5 rounded-lg" alt="Image 2">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Enterprise design tips</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 12 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" class="mb-5 rounded-lg" alt="Image 3">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">We partnered with Google</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 8 minutes
                        </a>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" class="mb-5 rounded-lg" alt="Image 4">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first project with React</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                        <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                            Read in 4 minutes
                        </a>
                    </article>
                </div>
            </div>
            </aside>
        </section>

        <!-- footer -->
    <footer class="p-4 mt-12 bg-white sm:p-6 ">
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
              <p class="mt-4 text-sm text-gray-600  max-w-sm">
              Digital TechLabs is a forward-thinking tech company providing innovative digital products and business solutions to help you succeed in a rapidly evolving digital world.
              </p>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Products</h2>
              <ul class="text-gray-600">
                  <li class="mb-4">
                   <a href="https://prep.btob.lk" target="_blank" class="hover:underline">B2B.lk</a>
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
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/autoplay";



  // Mobile Menu Toggle
  const menuOpen = ref(false);
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };


</script>

<script>
definePageMeta({
  layout: 'bst',
});

export default {
  data() {
    return {
      imageroot: process.env.Assets_83,
    };
  },
  async mounted() {
     
  },

    async created() {
      //this.sampleStore = useSampleStore();
    },
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {},
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      };
    },
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
