<template>

  <headers />
  
  <section class="bg-white mt-28 sm:mt-20 md:mt-24 dark:bg-gray-900">
    <Swiper
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
  
    >
  
      <SwiperSlide v-for="(slider, index) in sliders" :key="index">
        <img :src="slider.img"  class="w-full h-auto" />
      </SwiperSlide>
    </Swiper>
  </section>
  
  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
      {{ store.pageData.premium.first.firstTitle }}
    </h2>
  
    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">
      
      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl" 
        v-for="(product, index) in store.pageData.premium.first.firstTitleDataSlider"
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
  
  <div class="grid grid-cols-1 gap-8 p-8 bg-white lg:grid-cols-2">
    <!-- Left Banner -->
    <div class="relative overflow-hidden shadow-lg rounded-3xl">
      <img src="../../../assets/img/digitalTechLabs/standard/girlimage.jpg" alt="Cricket Jersey" class="object-cover w-full h-full" />
      <div class="absolute inset-0 flex flex-col justify-end p-8 text-white bg-black/50">
        <h2 class="text-4xl font-extrabold tracking-tight">{{ store.pageData.premium.second.title }}</h2>
        <p class="mt-2 text-sm">{{ store.pageData.premium.second.subTitle }}</p>
        <button class="px-5 py-2 mt-4 text-sm font-semibold text-black transition-all duration-300 bg-white rounded-lg hover:bg-gray-200 w-fit">
          SHOP ALL
        </button>
      </div>
    </div>
  
    <!-- Right Section -->
    <div class="flex flex-col justify-between">
      <!-- Title and Button -->
      <div>
        <h2 class="text-4xl font-bold text-gray-900">{{ store.pageData.premium.second.title }}</h2>
        <p class="mt-2 text-gray-700">Limited edition merchandise just for this festive season!</p>
        <button class="px-6 py-2 mt-6 font-semibold text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800">
          VIEW PRODUCTS
        </button>
      </div>
  
      <!-- Product Cards -->
      <div class="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-3">
        <div
          v-for="(product, index) in store.pageData.premium.second.secondDataProduct"
          :key="index"
          class="p-4 text-center transition-all duration-300 bg-white border shadow rounded-xl hover:shadow-xl"
        >
          <div class="relative">
            <span
              v-if="product.promo"
              class="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-tr-md rounded-bl-md"
            >
              Hot
            </span>
            <img
              :src="product.image"
              :alt="product.alt"
              class="object-contain mx-auto h-28"
            />
          </div>
          <p class="mt-4 text-sm text-gray-600">{{ product.title }}</p>
          <p class="mt-1 text-base font-bold text-black">{{ product.price }}</p>
          <button class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
      {{ store.pageData.premium.first.firstTitle }}
    </h2>
  
    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">
      
      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl" 
        v-for="(product, index) in store.pageData.premium.first.firstTitleDataSlider"
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
  
  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
      {{ store.pageData.premium.first.firstTitle }}
    </h2>
  
    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">
      
      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl" 
        v-for="(product, index) in store.pageData.premium.first.firstTitleDataSlider"
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
  
  <section class="relative flex items-center py-12 text-white bg-center bg-no-repeat bg-cover" style="background-image: url('https://cdn.shopify.com/s/files/1/0884/9873/3368/files/WEB_1_2873e5f2-a2db-491d-9ee8-927f3b9ba52d.jpg?v=1739188482&width=2000');">
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative z-10 grid max-w-screen-xl grid-cols-1 gap-12 px-6 mx-auto text-center md:grid-cols-1">
      
      <!-- Contact Form -->
      <div class="p-6 ">
          <p class="mb-4 text-sm text-white">{{store.pageData.standard.contactSection.Paragraph2}}</p> 
      </div>
    </div>
  </section>
  
  <section id="" class="px-4 py-12 bg-white ">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
        Customer 
      </h2>
      <Swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="2"
        :space-between="20"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :loop="true"
        :breakpoints="{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 }
        }"
        class="customer-slider"
      >
        <SwiperSlide
          v-for="(logo, index) in logos"
          :key="index"
          class="flex items-center justify-center"
        >
          <img
            :src="logo"
            class="object-contain h-12 transition duration-300 sm:h-16 grayscale hover:grayscale-0"
            alt="Customer Logo"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  
  <section id="st" class="px-4 py-12 bg-white">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
        Store Locations 
      </h2>
      <Swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :space-between="30"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :loop="true"
        :breakpoints="{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }"
        class="customer-slider"
      >
        <SwiperSlide
          v-for="(logo, index) in branches"
          :key="index"
          class="flex items-center justify-center"
        >
          <a
            href="#"
            class="group flex flex-col md:flex-row-reverse overflow-hidden rounded-3xl border border-gray-200  transition-all duration-300 hover:scale-[1.02] "
          >
            <!-- Image on the Right -->
            <div class="relative w-full h-56 md:w-1/2 md:h-52">
              <img
                :src="logo.img"
                alt="Branch Image"
                class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div class="absolute inset-0 transition-all bg-black bg-opacity-20 group-hover:bg-opacity-10"></div>
            </div>
  
            <!-- Text on the Left -->
            <div class="flex flex-col justify-center h-56 p-4 space-y-2 text-center md:h-52 md:w-1/2 md:text-left">
              <h5 class="text-xl font-bold text-gray-700 dark:text-indigo-400">
                {{ logo.location }}
              </h5>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ logo.address }}
              </p>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ logo.email }}
              </p>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ logo.contactNumber }}
              </p>
  
            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  
  <footers />
  
  <whatsappChats />
  
  
  
  </template>
  
  <script setup>
    import { ref } from "vue";
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/css";
    import "swiper/css/pagination";
    import "swiper/css/autoplay";
    import { Pagination, Autoplay } from "swiper/modules";
    import { useStandpageStore } from '~/stores/modules/dtlStore';
    import whatsappChats from '../chat/whatsappChat.vue';
    import headers from "./header.vue";
    import footers from "./footer.vue";
  
    // Mobile Menu Toggle
    const isMenuOpen = ref(false)
    function toggleMenu() {
      isMenuOpen.value = !isMenuOpen.value
    }
    function closeMenu() {
      isMenuOpen.value = false
    }
  
    const sliders = ref([
    {
      img: new URL('@/assets/img/digitalTechLabs/standard/premiumnav.png', import.meta.url).href
    },
    {
      img: new URL('@/assets/img/digitalTechLabs/home.png', import.meta.url).href
    },
    {
      img: new URL('@/assets/img/digitalTechLabs/premiumnav.png', import.meta.url).href
    },
  ]);
  
  const branches = [
    {
      img: 'https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/downloads/Galle-Fort-2.jpg',
      location: 'Matara  ',
      address: '354, Dharmadhasa Mawatha, Matara',
      email: 'matara@gmail.com',
      contactNumber: '123456789',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyF4EZc3XW45Mc6rAz2dONdIhpDwDQJB6uQ&s',
      location: 'Colombo  ',
      address: '354, Dharmadhasa Mawatha, Matara',
      email: 'matara@gmail.com',
      contactNumber: '123456789',
    },
    {
      img: 'https://d1bv4heaa2n05k.cloudfront.net/posts%2FSk4PxXgmKabAJWWzo%2F1462960950058-12485884_505689259610041_4744438127116937100_o_.jpg',
      location: 'Galle',
      address: '354, Dharmadhasa Mawatha, Matara',
      email: 'matara@gmail.com',
      contactNumber: '123456789',
    },
    {
      img: 'https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/downloads/Pedlar-Street-2.jpg',
      location: 'Mirissa',
      address: '354, Dharmadhasa Mawatha, Matara',
      email: 'matara@gmail.com',
      contactNumber: '123456789',
    },
  ];
  
  
  const logos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdbmcwxOGNJpIncH4RuLgWzQjNGnXJgzFzsSyRxFfIUzdgQCwHDbLbfeWlIc_3D70KmE&usqp=CAUg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRUrkrNkGAgreGVdPun-upZiPRcpZzf_oyA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCSXc039TSXrlop1Qlx6XLaTfL7aGz49NzA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzauVhVXcdXcwh82ID82C50vvf1106Sm9Ogg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoGXzWn6B9Wf0Cu0EEXVActiShg8jfG1QaA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnlbQKyeZnutwavifhGkk3NJinRyqzB3BGw&s',
    'https://thilakawardhana.com/cdn/shop/files/bella_370x.png?v=1722712079',
    'https://thilakawardhana.com/cdn/shop/files/Trafford_570x.png?v=1722744665',
    'https://thilakawardhana.com/cdn/shop/files/engage1_370x.png?v=1722711253',
    'https://thilakawardhana.com/cdn/shop/files/Knot2_370x.png?v=1722711253',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoGXzWn6B9Wf0Cu0EEXVActiShg8jfG1QaA&s',
    'https://thilakawardhana.com/cdn/shop/files/Trafford_570x.png?v=1722744665',
  ];
  
  
  </script>
  
  <script>
  definePageMeta({
    layout: 'premium',
  });
  
  export default {
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
  