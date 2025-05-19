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
                            011 5842369
                        </button>
                    </div>

                </div> 
                <form @submit.prevent="handleSubmit">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input v-model="formData.name" type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label for="name" class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
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
        <section class="px-6 py-2 mx-auto bg-blue-900">
            <div class="mx-auto text-center lg:py-16 lg:px-2">
            <h1 class="text-4xl font-semibold text-white sm:text-5xl">We’re Located at</h1>
            <p class="mt-4 text-lg text-white">425, Bambalapitiya, Colombo 3, Sri lanka</p>

            </div>
        </section>

        <!-- footer -->
        <footer class="p-4 mt-12 bg-white sm:p-6 dark:bg-gray-800">
            <div class="max-w-screen-xl mx-auto">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <a href="https://flowbite.com" class="flex items-center">
                        <img
                            src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" 
                            alt="Digital Tech Labs Logo"
                            class="w-40 px-2 rounded-full"
                        />
                        </a>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul class="text-gray-600 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="https://flowbite.com" class="hover:underline">Flowbite</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul class="text-gray-600 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul class="text-gray-600 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com" class="hover:underline"> Digital TechLab™</a>. All Rights Reserved.
                    </span>
                    <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                        </a>
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
