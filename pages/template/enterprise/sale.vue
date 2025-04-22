<template>

    <heder/>
    
    <section class="px-4 py-12 mt-12">
      <div class="min-h-screen p-6 text-white ">
        <!-- Breadcrumbs -->
        <div class="mb-4 text-sm text-gray-400">
          <a href="#" class="hover:underline">Home</a> /
          <span class="text-gray-800">Sale</span>
        </div>
  
        <!-- Layout -->
        <div class="flex flex-col gap-6 lg:flex-row">
          <!-- Sidebar Filters -->
          <aside class="w-full p-4 text-gray-800 rounded-lg lg:w-64 bg-gray-50">
    
          </aside>
          
  
          <!-- Product Grid -->
          <section class="w-full px-2 py-8 rounded-lg lg:px-4 bg-gray-50">
            <h1 class="mb-6 text-3xl font-semibold text-gray-800">Sale</h1>
            <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl">          
                <!-- Product Card -->
                <div 
                    v-for="(product, index) in products"
                    :key="index"
                    class="relative p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
                    >
                    <div
                        v-if="product.discount"
                        class="absolute z-10 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-4 left-4"
                    >
                        {{ product.discount }}
                    </div>
                    <img
                        :src="product.image"
                        :alt="product.title"
                        class="object-cover w-full h-48 mb-4 rounded-lg"
                    />
                    <p class="font-medium text-gray-700">{{ product.title }}</p>
                    <p v-if="product.originalPrice" class="mt-1 text-sm text-gray-500 line-through">
                        {{ product.originalPrice }}
                    </p>
                    <p class="mt-1 text-sm font-bold text-gray-900">{{ product.price }}</p>
                    <button class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">
                        Shop Now
                    </button>
                    </div>

  
            </div>
          </section>
        </div>
  
        <!-- Pagination -->
        <div class="flex justify-center mt-8 space-x-2">
          <button class="px-3 py-1 text-gray-500 border-2 rounded hover:bg-gray-50">1</button>
          <button class="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">2</button>
          <button class="px-3 py-1 text-gray-500 border-2 rounded hover:bg-gray-50">3</button>
        </div>
      </div>
    </section>

    <whatsappChats />
    <mainFooter/>

  </template>
    
    <script setup>
      import { ref } from "vue";
      import { Swiper, SwiperSlide } from "swiper/vue";
      import "swiper/css";
      import "swiper/css/pagination";
      import "swiper/css/autoplay";
      import { useStandpageStore } from '~/stores/modules/dtlStore';
      import whatsappChats from '../chat/whatsappChat.vue';
      import heder from "./heder.vue";
      import mainFooter from "./footer.vue";

      import product1 from '../../../assets/img/digitalTechLabs/standard/s1.png'
      import product2 from '../../../assets/img/digitalTechLabs/standard/s2.png'
      import product3 from '../../../assets/img/digitalTechLabs/standard/s3.png'
      import product4 from '../../../assets/img/digitalTechLabs/standard/s4.png'


      const products = ref([
        {
            title: 'Comfort Fit Crew Neck T-shirt – Black',
            price: 'Rs.5,000.00',
            image: product1,
            discount: '15% OFF',
            originalPrice: 'Rs.7,000.00',
        },
        {
            title: 'Comfort Fit Crew Neck T-shirt – Space Blue',
            price: 'Rs.2,000.00',
            image: product2,
            discount: '25% OFF',
            originalPrice: 'Rs.8,000.00',
        },
        {
            title: 'Comfort Fit Crew Neck T-shirt – Sky Blue',
            price: 'Rs.8,000.00',
            image: product3,
            discount: '25% OFF',
            originalPrice: 'Rs.10,000.00',
        },
        {
            title: 'Comfort Fit Crew Neck T-shirt – Muted Green',
            price: 'Rs.10,000.00',
            image: product4,
            discount: '40% OFF',
            originalPrice: 'Rs.16,000.00',
        },
      ]);
    
    
    
    </script>
    
    <script>
      definePageMeta({
        layout: 'bst',
      });
    
      export default {
        data() {
          return {
            imageroot: process.env.Assets_83,
            isMenuOpen: false,
                isSidebarOpen: false,
                isDropdownOpen: false,
          };
        },
        async mounted() {
          
        },
        async created() {
          this.store = useStandpageStore();
      
        },
        watch: {},
        computed: {
          // ...mapState({
          //   //loggeduser: (state) => state.loggeduser,
          // }),
        },
        methods: {
          handleSideButton() {
            this.showChatBox = !this.showChatBox;
            if (this.showChatBox) {
              // Initially, show the welcome message
              this.messages = [{ text: "Hi! Please wait, we're preparing to assist you.", isUser: false }];
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
            title: 'Intranet - Digital Tech Labs',
          };
        },
      };
    </script>
    
    <style scoped>
    /* Utility Classes */
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
    @apply px-3  rounded-lg transition-colors;
  }
  
  
    </style>
    