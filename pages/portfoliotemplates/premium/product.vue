<template>

  <headers />

  <section class="px-4 py-12 mt-12">
    <div class="min-h-screen p-6 text-white ">
      <!-- Breadcrumbs -->
      <div class="mb-4 text-sm text-gray-400">
        <a href="#" class="hover:underline">Home</a> /
        <a href="#" class="hover:underline">Products</a> /
        <span class="text-gray-800">Electronics</span>
      </div>

      <!-- Layout -->
      <div class="flex flex-col gap-6 lg:flex-row">
        <!-- Sidebar Filters -->
        <aside class="w-full p-4 text-gray-800 rounded-lg lg:w-64 bg-gray-50">
          <h2 class="mb-4 text-lg font-semibold">Categories</h2>
          <ul class="space-y-2 text-sm">
            <li><input type="checkbox" class="mr-2" /> TOPS</li>
            <li><input type="checkbox" class="mr-2" /> T SHIRT</li>
            <li><input type="checkbox" class="mr-2" /> SHORTS</li>
            <li><input type="checkbox" class="mr-2" /> JUMPSUITS</li>
            <li><input type="checkbox" class="mr-2" /> JEANS</li>
          </ul>
        </aside>

        <!-- Product Grid -->
        <section class="w-full px-2 py-8 rounded-lg lg:px-4 bg-gray-50">
          <h1 class="mb-6 text-3xl font-semibold text-gray-800">Women</h1>
          <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl">

            <!-- Product Card -->
            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s1.png" alt="Black T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Black</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s2.png" alt="Space Blue T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Space Blue</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s3.png" alt="Sky Blue T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Sky Blue</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s1.png" alt="Muted Green T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Muted Green</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s1.png" alt="Sapphire Blue T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Sapphire Blue</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s1.png" alt="Black T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Black</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s2.png" alt="Space Blue T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Space Blue</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
            </div>

            <div class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
              <img src="../../../assets/img/digitalTechLabs/standard/s3.png" alt="Sky Blue T-shirt"
                class="object-cover w-full h-48 mb-4 rounded-lg" />
              <p class="font-medium text-gray-700">Comfort Fit Crew Neck T-shirt – Sky Blue</p>
              <p class="mt-1 text-lg font-bold text-gray-900">Rs.990.00</p>
              <button
                class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop
                Now</button>
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
import { useDtlStore } from '~/stores/modules/dtlStore';
import whatsappChats from '../chat/whatsappChat.vue';
import headers from "./header.vue";
import footers from "./footer.vue";


const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}



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
    this.store = useDtlStore();

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
  @apply px-3 rounded-lg transition-colors;
}
</style>