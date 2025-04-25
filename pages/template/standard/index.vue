<template>
  
  <section class="bg-center bg-cover">
    <nav :class="[`fixed top-0 left-0 z-50 w-full bg-${store.pageData.standard.navbar.navbarColor}`,'bg-blue-100']">
      <div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a href="/template/standard/standard" class="flex items-center space-x-3">
          <span class="self-center text-2xl font-semibold text-white">{{ store.pageData.standard.logo || 'Logo' }}</span>
        </a>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="purple" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <!-- Desktop Navbar -->
        <div class="hidden md:block md:w-auto">
          <ul class="flex space-x-8 font-medium">
            <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#service" class="text-white hover:text-gray-300">Services</a></li>
            <li><a href="#product" class="text-white hover:text-gray-300">Product</a></li>
            <li><a href="/template/standard/aboutUs" class="text-white hover:text-gray-300">About</a></li>
            <li><a href="#contact" class="text-white hover:text-gray-300">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Mobile Side Drawer -->
    <div v-if="isMenuOpen" @click="closeMenu" class="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

    <div
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      class="fixed top-0 right-0 z-50 w-64 h-full p-5 transition-transform transform bg-white shadow-lg"
    >
      <button @click="closeMenu" class="absolute text-gray-600 top-4 right-4 hover:text-black">
        ✖
      </button>
      <ul class="mt-10 space-y-4 font-medium">
        <li><a href="#" class="text-gray-800 hover:text-gray-300">Home</a></li>
        <li><a href="#service" class="text-gray-800 hover:text-gray-300">Services</a></li>
        <li><a href="#product" class="text-gray-800 hover:text-gray-300">Product</a></li>
        <li><a href="/template/standard/aboutUs" class="text-gray-800 hover:text-gray-300">About</a></li>
        <li><a href="#contact" class="text-gray-800 hover:text-gray-300">Contact</a></li>
      </ul>
    </div>

    <section>
      <div class="w-full mx-auto mt-16 lg:gap-8 xl:gap-0 lg:mt-16">
        <!-- Responsive Image -->
        <img 
          :src="store.pageData.standard.navbar.navImg1" 
          class="object-cover w-full h-auto" 
          alt="mockup" 
        />
      </div>
    </section>
  </section>

  <section id="service" class="py-8 bg-white">
    <div class="container mx-auto ">
      <h2 class="text-4xl font-bold text-center">{{store.pageData.standard.services.title || 'Title' }}</h2>
      <p class="max-w-lg mx-auto mt-4 text-center text-gray-600">{{store.pageData.standard.services.subTitle}}</p>
      <div class="grid gap-8 mt-8 md:grid-cols-2">
        <div>
          <img :src="store.pageData.standard.services.OurServicesImg" />

        </div>
        <div class="px-4 sm:px-8">
          <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
            {{store.pageData.standard.services.paragraph1 || 'sample' }}
            <br><br>
            {{store.pageData.standard.services.paragraph2 || 'sample' }}
            <br><br>
            {{store.pageData.standard.services.paragraph3 || 'sample'}}
          </p>
          
          <NuxtLink 
            to="/services" 
            :class="[`inline-block px-6 py-2 mt-4 text-white transition-all bg-${store.pageData.standard.btnColor} rounded-lg `,'bg-blue-900']">
            Learn More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <section id="product" class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-xl font-bold text-center text-gray-800 uppercase">
      {{ store.pageData.standard.product.section2Title }}
    </h2>
  
    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">
      
      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl" 
        v-for="(product, index) in store.pageData.standard.product.products"
        :key="index"
      >
        <img :src="product.image" :alt="product.alt" class="object-cover w-full h-48 mb-4 rounded-lg" />
        <p class="text-sm font-medium text-gray-700">{{ product.title }}</p>
        <p class="mt-1 text-sm font-bold text-gray-900">{{ product.price }}</p>
        <button class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop Now</button>
      </div>
  
      
    </div>
    <div class="mt-6 text-2xl font-bold text-center text-gray-800 uppercase">
      <button class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop Other</button>
    </div>
  </section>

  <section id="about" class="py-12 ">
    <div class="container px-6 mx-auto">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
          <div class="p-4 bg-gray-100 rounded-full shadow-md">
            <img class="w-14 h-14" src="/assets/img/digitalTechLabs/contact/Shipping.png" alt="Fast Shipping" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-800">Fast Shipping</h3>
          <p class="mt-2 text-sm text-gray-600">Experience lightning-fast shipping on all orders!</p>
        </div>
        <div class="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
          <div class="p-4 bg-gray-100 rounded-full shadow-md">
            <img class="w-14 h-14" src="/assets/img/digitalTechLabs/contact/QualityProducts.png" alt="Quality Products" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-800">Quality Products</h3>
          <p class="mt-2 text-sm text-gray-600">We believe in offering nothing but the best.</p>
        </div>
        <div class="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
          <div class="p-4 bg-gray-100 rounded-full shadow-md">
            <img class="w-14 h-14" src="/assets/img/digitalTechLabs/contact/OnlineSupport.png" alt="Online Support" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-800">Online Support</h3>
          <p class="mt-2 text-sm text-gray-600">Need assistance? We've got you covered!</p>
        </div>
        <div class="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
          <div class="p-4 bg-gray-100 rounded-full shadow-md">
            <img class="w-14 h-14" src="/assets/img/digitalTechLabs/contact/SecurePayment.png" alt="Secure Payment" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-800">Secure Payment</h3>
          <p class="mt-2 text-sm text-gray-600">Shop with peace of mind knowing your transactions are 100% secure.</p>
        </div>
        <div class="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
          <div class="p-4 bg-gray-100 rounded-full shadow-md">
            <img class="w-14 h-14" src="/assets/img/digitalTechLabs/contact/BestRatings.png" alt="Best Ratings" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-800">Best Ratings</h3>
          <p class="mt-2 text-sm text-gray-600">Join thousands of satisfied customers who have given us their stamp of approval!</p>
        </div>
      </div>
    </div>
  </section>
    
  <section id="contact" class="py-8 antialiased md:py-16">
    <div class="grid max-w-screen-xl grid-cols-2 gap-8 px-4 mx-auto text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6">
      <a
        href="#"
        class="flex items-center justify-center p-4 transition-transform duration-500 ease-in-out transform "
        v-for="(product, index) in store.pageData.standard.brand"
        :key="index"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <img 
          :src="product.image"
          class="object-contain w-20 h-20"
          alt="brand logo" 
        />
      </a>
    </div>
  </section>
  
  <section class="relative flex items-center py-12 text-white bg-center bg-no-repeat bg-cover" style="background-image: url('https://img.freepik.com/premium-photo/fashionable-adult-customer-exploring-boutique-studio-with-modern-wardrobe-display_634278-45040.jpg?w=996');">
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative z-10 grid max-w-screen-xl grid-cols-1 gap-12 px-6 mx-auto md:grid-cols-2">
      <div>
        <h1 class="text-4xl font-extrabold leading-tight md:text-5xl">
          {{store.pageData.standard.contactSection.title}}
        </h1>
        <p class="max-w-lg mt-4 text-lg text-gray-300">
          {{store.pageData.standard.contactSection.Paragraph1}}
        </p>
        
        <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-1">
          <div class="flex items-center gap-4">
              <div class="p-2 bg-white rounded-full shadow-md">
                  <img src="https://img.icons8.com/ios-filled/50/map-marker.png" alt="Address" class="w-4 h-4">
              </div>
              <p class="text-normal">{{store.pageData.standard.contactSection.address}}</p>
          </div>
          <div class="flex items-center gap-4">
              <div class="p-2 bg-white rounded-full shadow-md">
                  <img src="https://img.icons8.com/ios-filled/50/phone.png" alt="Phone" class="w-4 h-4">
              </div>
              <a href="tel:+1234567890" class="text-normal">{{store.pageData.standard.contactSection.phone}}</a>
          </div>
          <div class="flex items-center gap-4">
              <div class="p-2 bg-white rounded-full shadow-md">
                  <img src="https://img.icons8.com/ios-filled/50/email.png" alt="Email" class="w-4 h-4">
              </div>
              <a href="mailto:info@example.com" class="text-normal">{{store.pageData.standard.contactSection.email}}</a>
          </div>
        </div>
      </div>
      <!-- Contact Form -->
      <div class="p-6 ">
          <p class="mb-4 text-sm text-white">{{store.pageData.standard.contactSection.Paragraph2}}</p> 
      </div>
    </div>
  </section>

  <footer :class="[`p-4 mt-16 bg-white border-t-4 border-${store.pageData.standard.btnColor} sm:p-6 `,'bg-blue-900']">
    <div class="max-w-screen-xl mx-auto">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="https://flowbite.com" class="flex items-center">
                    <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" /> -->
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Our Resources</h2>
                  <ul class="text-gray-600 dark:text-gray-400">
                      <li class="mb-4">
                          <a href="https://your-clothing-store.com" class="hover:underline">Our Clothing Collection</a>
                      </li>
                      <li class="mb-4">
                          <a href="https://your-clothing-store.com/blog" class="hover:underline">Fashion Blog</a>
                      </li>
                      <li class="mb-4">
                          <a href="https://your-clothing-store.com/size-guide" class="hover:underline">Size Guide</a>
                      </li>
                      <li>
                          <a href="https://your-clothing-store.com/contact" class="hover:underline">Contact Us</a>
                      </li>
                  </ul>
              </div>

                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Facebook</a>
                        </li>
                        <li>
                            <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Instagram</a>
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
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">DigitalTechLab™</a>. All Rights Reserved.
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
            </div>
        </div>
    </div>
  </footer>

  <whatsappChats />


  
</template>
  
<script>
  import { ref, computed } from "vue";
  import { useStandpageStore } from '~/stores/modules/dtlStore';
  import whatsappChats from '../chat/whatsappChat.vue';

//  const store = useStandpageStore();




 definePageMeta({
    layout: 'standard',   
   // middleware: 'auth',
   });
   
  export default {
    
    components: {whatsappChats},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        isMenuOpen: false,
        isSidebarOpen: false,
        isDropdownOpen: false,
        showChatBox: false,  // Ensures the chat box starts hidden
        newMessage: '',
        messages: [],
        autoReplied: false,
        backendMessageShown: false, 
      }

    },

    created() {     
      this.store = useStandpageStore();
      //  console.log('color:',store);
     },
    watch: {},
    computed: {

    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      closeMenu() {
        this.isMenuOpen = false;
      },
      closeAll(event) {
        if (
          this.isSidebarOpen &&
          !this.$el.querySelector('aside')?.contains(event.target) &&
          window.innerWidth < 768
        ) {
          this.isSidebarOpen = false;
        }
        if (
          this.isDropdownOpen &&
          !this.$el.querySelector('.relative.ml-3')?.contains(event.target)
        ) {
          this.isDropdownOpen = false;
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.closeAll);
      
    },
    beforeUnmount() {
      document.removeEventListener('click', this.closeAll);

    },

    head() {
      return {
        title: 'Starter Package',
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

  @keyframes slideInFromRight {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
  }

  .chat-box-enter-active {
    animation: slideInFromRight 0.5s ease-in-out;
  }

  .chat-box-leave-active {
    animation: slideInFromRight 0.5s reverse ease-in-out;
  }
  </style>
  
  
  