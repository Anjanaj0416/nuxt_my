<template>


  <heder />

  <!-- <div>{{store.pageData}}</div> -->

  <section class="bg-white mt-28 sm:mt-20 md:mt-24 dark:bg-gray-900">
    <Swiper :modules="[Pagination, Autoplay]" :slides-per-view="1" :space-between="30" :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }">
      <SwiperSlide v-for="(slider, index) in store.pageData.enterprise.sliders" :key="index">
        <img :src="slider.img" class="w-full h-auto" />
      </SwiperSlide>
    </Swiper>
  </section>

  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <div class="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 max-w-7xl">

      <!-- Left Column - Popular Right Now -->
      <div data-aos="fade-up" data-aos-delay="100">
        <!-- <p class="mb-2 text-sm tracking-widest text-center text-gray-500 uppercase">Fresh Picks</p> -->
        <h2 class="mb-10 text-2xl font-bold text-center text-gray-800">
          {{ store.pageData.enterprise.first.firstTitle }}
        </h2>


        <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :space-between="10"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :loop="true" :pagination="{ clickable: true }"
          :breakpoints="{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }" class="mx-auto max-w-7xl">
          <SwiperSlide v-for="(product, index) in store.pageData.enterprise.first.firstTitleDataSlider" :key="index"
            class="py-2">
            <div class="text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img :src="product.image" :alt="product.alt" class="object-cover w-full h-48 mb-4 rounded-lg" />
              <div class="p-4">
                <p class="text-sm font-medium text-gray-700">{{ product.title }}</p>
                <p class="mt-1 text-sm font-bold text-gray-900">{{ product.price }}</p>
                <button
                  class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="mt-8 text-center">
          <button
            class="inline-block px-6 py-2 text-sm font-semibold text-gray-600 transition border-2 rounded-full hover:bg-gray-100 hover:scale-105">
            Shop Other
          </button>
        </div>
      </div>

      <!-- Right Column - Banner -->

      <div class="flex items-center justify-center" data-aos="fade-left" data-aos-delay="200">
        <div class="relative w-full h-64 md:h-[420px] rounded-lg shadow-lg overflow-hidden">
          <img :src="store.pageData.enterprise.first.firstTitleImg" alt="Web Banner"
            class="object-cover w-full h-full" />
        </div>
      </div>

    </div>
  </section>

  <section class="min-h-screen px-4 py-10 mx-auto max-w-7xl ">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">{{
      store.pageData.enterprise.second.secondTitle }}</h2>

    <div class="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
      <!-- Viva Banner -->

      <div
        :class="['relative col-span-1 p-6 overflow-hidden shadow-md md:col-span-3 rounded-2xl', store.pageData.enterprise.second.secondTitleLeftSideBgColor]">
        <div class="mb-6">
          <h3 class="mb-1 text-3xl font-bold text-gray-800">{{ store.pageData.enterprise.second.secondTitleLeftSideTitle
            }}</h3>
          <p class="mb-4 text-base text-gray-700">{{ store.pageData.enterprise.second.secondTitleLeftSideSubTitle }}</p>
          <button
            class="px-5 py-2 text-sm font-semibold text-white transition duration-300 bg-black rounded-lg hover:bg-gray-800">
            Shop now
          </button>
        </div>

        <div class="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div v-for="(item, index) in store.pageData.enterprise.second.secondTitleLeftSide" :key="index"
            class="relative p-4 transition duration-300 bg-white shadow rounded-xl group hover:shadow-lg hover:-translate-y-1">
            <!-- Image -->
            <div class="overflow-hidden rounded-lg">
              <img :src="item.image" :alt="item.name"
                class="object-cover w-full transition-transform duration-300 transform h-36 group-hover:scale-105" />
            </div>

            <!-- Content -->
            <div class="mt-3 space-y-1">
              <h3 class="text-sm font-semibold text-gray-800 truncate">{{ item.name }}</h3>
              <div class="text-sm font-bold text-black">
                {{ item.price }}
                <span class="ml-2 text-xs font-normal text-gray-400 line-through">{{ item.oldPrice }}</span>
              </div>
              <div class="text-xs text-yellow-500">{{ item.rating }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-2 sm:grid-cols-2">
        <NuxtLink v-for="(category, index) in store.pageData.enterprise.second.secondTitleRightSide" :key="index"
          :to="`/category/${category.slug}`"
          class="flex flex-col items-center text-center transition bg-white rounded shadow ">
          <img :src="category.image" :alt="category.name" class="object-cover w-full h-full" />
          <!-- <p class="text-sm font-medium text-gray-800">{{ category.name }}</p> -->
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
      Shop for Men
    </h2>

    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">

      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
        v-for="(product, index) in store.pageData.enterprise.third.thirdTitleDataSlider" :key="index">
        <img :src="product.image" :alt="product.alt" class="object-cover w-full h-48 mb-4 rounded-lg" />
        <p class="text-sm font-medium text-gray-700">{{ product.title }}</p>
        <p class="mt-1 text-sm font-bold text-gray-900">{{ product.price }}</p>
        <button
          class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
          Now</button>
      </div>


    </div>
    <div class="mt-6 text-2xl font-bold text-center text-gray-800 uppercase">
      <button
        class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
        Other</button>
    </div>
  </section>

  <section class="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
    <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
      Shop for Men
    </h2>

    <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">

      <!-- Product Card -->
      <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
        v-for="(product, index) in store.pageData.enterprise.third.thirdTitleDataSlider" :key="index">
        <img :src="product.image" :alt="product.alt" class="object-cover w-full h-48 mb-4 rounded-lg" />
        <p class="text-sm font-medium text-gray-700">{{ product.title }}</p>
        <p class="mt-1 text-sm font-bold text-gray-900">{{ product.price }}</p>
        <button
          class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
          Now</button>
      </div>


    </div>
    <div class="mt-6 text-2xl font-bold text-center text-gray-800 uppercase">
      <button
        class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
        Other</button>
    </div>
  </section>

  <section class="py-6 ">
    <div class="grid grid-cols-1 gap-4 px-4 mx-auto text-white max-w-7xl sm:grid-cols-2 lg:grid-cols-4">

      <!-- Feature 1 -->
      <div class="flex items-start gap-3 p-4 border border-gray-700 rounded-md">
        <span class="text-2xl">⭐</span>
        <div>
          <h3 class="text-base font-semibold text-gray-800">Exclusive Collection</h3>
          <p class="text-sm text-gray-500">We cater to the latest trends</p>
        </div>
      </div>

      <!-- Feature 2 -->
      <div class="flex items-start gap-3 p-4 border border-gray-700 rounded-md">
        <span class="text-2xl">💳</span>
        <div>
          <h3 class="text-base font-semibold text-gray-800">Secure Payments</h3>
          <p class="text-sm text-gray-500">We provide instant secure checkouts</p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="flex items-start gap-3 p-4 border border-gray-700 rounded-md">
        <span class="text-2xl">🔁</span>
        <div>
          <h3 class="text-base font-semibold text-gray-800">30 Days Return</h3>
          <p class="text-sm text-gray-500">Money-back guarantee</p>
        </div>
      </div>

      <!-- Feature 4 -->
      <div class="flex items-start gap-3 p-4 border border-gray-700 rounded-md">
        <span class="text-2xl">📦</span>
        <div>
          <h3 class="text-base font-semibold text-gray-800">Islandwide Delivery</h3>
          <p class="text-sm text-gray-500">Free Delivery Above LKR 10,000</p>
        </div>
      </div>

    </div>
  </section>

  <section class="py-12">
    <div
      class="grid grid-cols-1 h-[400px] gap-4 px-4 mx-auto text-white bg-center bg-cover max-w-7xl sm:grid-cols-2 lg:grid-cols-4 rounded-xl"
      style="background-image: url('https://coolplanet.lk/cdn/shop/files/Qman.jpg?v=1668169697&width=2000');">
      <!-- Add your grid content here -->
      <div class="p-6 text-center bg-white bg-opacity-50 rounded-md">
        <button class="px-4 py-2 text-sm font-semibold text-white transition bg-black rounded-full hover:bg-gray-800">
          Shop Now
        </button>
      </div>

    </div>
  </section>

  <section id="" class="px-4 py-12 bg-white ">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
        Customer
      </h2>
      <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="2" :space-between="20"
        :autoplay="{ delay: 2500, disableOnInteraction: false }" :loop="true" :breakpoints="{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 }
        }" class="customer-slider">
        <SwiperSlide v-for="(logo, index) in store.pageData.enterprise.logos" :key="index"
          class="flex items-center justify-center">
          <img :src="logo" class="object-contain h-12 transition duration-300 sm:h-16 grayscale hover:grayscale-0"
            alt="Customer Logo" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <section id="st" class="px-4 py-12 bg-white">
    <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <h2 class="mb-10 text-2xl font-bold text-center text-gray-800 uppercase">
        Store Locations
      </h2>
      <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :space-between="30"
        :autoplay="{ delay: 3000, disableOnInteraction: false }" :loop="true" :breakpoints="{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }" class="customer-slider">
        <SwiperSlide v-for="(branches, index) in store.pageData.enterprise.branches" :key="index"
          class="flex items-center justify-center">
          <a href="#"
            class="group flex flex-col md:flex-row-reverse overflow-hidden rounded-3xl border border-gray-200  transition-all duration-300 hover:scale-[1.02] ">
            <!-- Image on the Right -->
            <div class="relative w-full h-56 md:w-1/2 md:h-52">
              <img :src="branches.img" alt="Branch Image"
                class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105" />
              <div class="absolute inset-0 transition-all bg-black bg-opacity-20 group-hover:bg-opacity-10"></div>
            </div>

            <!-- Text on the Left -->
            <div class="flex flex-col justify-center h-56 p-4 space-y-2 text-center md:h-52 md:w-1/2 md:text-left">
              <h5 class="text-xl font-bold text-gray-700 dark:text-indigo-400">
                {{ branches.location }}
              </h5>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ branches.address }}
              </p>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ branches.email }}
              </p>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {{ branches.contactNumber }}
              </p>

            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <section class="relative flex items-center h-64 py-12 text-white bg-center bg-no-repeat bg-cover"
    :style="{ backgroundImage: `url(${store.pageData.enterprise.lastBanner})` }">
    <div class="absolute inset-0 bg-black/60"></div>
  </section>


  <mainFooter />

  <whatsappChats />

</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { useDtlStore } from '~/stores/modules/dtlStore';
import whatsappChats from '../chat/whatsappChat.vue';
import heder from "./heder.vue";
import mainFooter from "./footer.vue";


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
    this.store = useDtlStore();

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
  @apply px-3 rounded-lg transition-colors;
}
</style>